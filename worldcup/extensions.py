# -*- coding: utf-8 -*-

from flask.ext.assets import Bundle
from flask.ext.login import LoginManager
from flask_oauthlib.client import OAuth
from flask.ext.pymongo import PyMongo

from .filters import EmberPrecompile


# +--------------------------------------------------------------------+
# | Flask-PyMongo
# +--------------------------------------------------------------------+
mongo = PyMongo()

# +--------------------------------------------------------------------+
# | Flask-OAuthlib
# +--------------------------------------------------------------------+
oauth = OAuth()

# Use Google as remote application
# You must configure 3 values from Google APIs console
# https://code.google.com/apis/console
google = oauth.remote_app('google', app_key='GOOGLE')


# +--------------------------------------------------------------------+
# | Flask-Login
# +--------------------------------------------------------------------+
login_manager = LoginManager()

login_manager.login_view = 'frontend.login'
login_manager.login_message = 'Please log in to access this page.'
login_manager.refresh_view = 'frontend.reauth'


# +--------------------------------------------------------------------+
# | Flask-Assets
# +--------------------------------------------------------------------+
js = Bundle(
  'jquery/dist/jquery.js',
  'handlebars/handlebars.runtime.js',
  'ember/ember.js',
  'ember-data/ember-data.js',
  output='js/main.js'
)

js_app = Bundle(
  '**/*.coffee',
  filters='coffeescript',
  output='js/app.js'
)

ember_templates = Bundle(
  '*.hbs',
  filters=(EmberPrecompile, ),
  output='js/templates.js'
)

scss = Bundle('app.scss', filters='scss', output='app.css')
