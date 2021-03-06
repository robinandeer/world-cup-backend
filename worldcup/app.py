# -*- coding: utf-8 -*-
"""
Central app setup related functions.
"""

from datetime import timedelta
import os

from flask import Flask, render_template, session
from flask.ext.assets import Environment
import newrelic.agent

from .api import api
from .config import DefaultConfig
from .extensions import login_manager, oauth, mongo, js, scss, js_app, \
  ember_templates
from .frontend import frontend
from .frontend.models import User
from .utils import INSTANCE_FOLDER_PATH

# Common blueprints
DEFAULT_BLUEPRINTS = (frontend, api)


def create_app(config=None, app_name=None, blueprints=None):
  """Create and initialize a Flask app"""
  if app_name is None:
    app_name = DefaultConfig.PROJECT

  if blueprints is None:
    blueprints = DEFAULT_BLUEPRINTS

  app = Flask(app_name, instance_path=INSTANCE_FOLDER_PATH,
              instance_relative_config=True)

  configure_app(app, config)
  configure_blueprints(app, blueprints)
  configure_extensions(app)
  configure_logging(app)
  configure_error_handlers(app)

  return app


def configure_app(app, config=None):
  """Different ways of configuring the app."""

  # http://flask.pocoo.org/docs/api/#configuration
  app.config.from_object(DefaultConfig)

  # http://flask.pocoo.org/docs/config/#instance-folders
  #app.config.from_pyfile('production.cfg', silent=True)

  if config:
    app.config.from_object(config)

  # Set the timeout for our session to 30 days.
  # The session will be lost after 30 days with no interaction form
  # the user.
  # +INFO: http://flask.pocoo.org/docs/api/#flask.Flask.permanent_session_lifetime
  app.permanent_session_lifetime = timedelta(days=30)


def configure_extensions(app):
  # Flask-PyMongo
  mongo.init_app(app)

  # Flask-OAuthlib
  oauth.init_app(app)

  # Flask-Login
  @login_manager.user_loader
  def load_user(user_id):
    """Returns the currently active user as an object.

    Since this app doesn't handle passwords etc. there isn't as much
    incentive to keep pinging the database for every request protected
    by 'login_required'.

    Instead I set the expiration for the session cookie to expire at
    regular intervals.
    """
    # 1. Retrive user data from the session
    # 2. Create new User object based of that (potential) data
    data = {
      'user_id': session.get('user_id'),
      'name': session.get('name'),
      'email': session.get('email')
    }

    if data.get('email'):
      user = User(**data)
    else:
      user = None

    return user

  login_manager.init_app(app)

  # Flask-Assets
  # Doing setup here to avoid RuntimeError: assets instance not bound...
  assets = Environment(app)
  assets.auto_build = app.config.get('DEBUG')
  assets.load_path = [
    os.path.join(os.path.dirname(__file__), 'scss'),
    os.path.join(os.path.dirname(__file__), 'coffee'),
    os.path.join(os.path.dirname(__file__), 'handlebars'),
    os.path.join(os.path.dirname(__file__), 'vendor'),
  ]
  assets.url = app.static_url_path

  assets.register('js_all', js)
  assets.register('js_app', js_app)
  assets.register('ember_templates', ember_templates)
  assets.register('scss_all', scss)

  # New Relic Python Agent
  newrelic.agent.initialize('newrelic.ini')


def configure_blueprints(app, blueprints):
  """Configure blueprints in views."""

  for blueprint in blueprints:
    app.register_blueprint(blueprint)


def configure_logging(app):
  """Configure file(info) and email(error) logging."""

  if app.debug or app.testing:
    # Skip debug and test mode. Just check standard output.
    return

  import logging
  from logging.handlers import SMTPHandler

  # Set info level on logger, which might be overwritten by handers.
  # Suppress DEBUG messages.
  app.logger.setLevel(logging.INFO)

  info_log = os.path.join(app.config['LOG_FOLDER'], 'info.log')
  info_file_handler = logging.handlers.RotatingFileHandler(
    info_log, maxBytes=100000, backupCount=10)
  info_file_handler.setLevel(logging.INFO)
  info_file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]')
  )
  app.logger.addHandler(info_file_handler)

  mail_handler = SMTPHandler(
    app.config['MAIL_SERVER'],
    app.config['MAIL_USERNAME'],
    app.config['ADMINS'],
    'O_ops... %s failed!' % app.config['PROJECT'],
    (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
  )
  mail_handler.setLevel(logging.ERROR)
  mail_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]')
  )
  app.logger.addHandler(mail_handler)


def configure_error_handlers(app):

  @app.errorhandler(403)
  def forbidden_page(error):
    return render_template('errors/forbidden_page.html'), 403

  @app.errorhandler(404)
  def page_not_found(error):
    return render_template('errors/page_not_found.html'), 404

  @app.errorhandler(500)
  def server_error_page(error):
    return render_template('errors/server_error.html'), 500
