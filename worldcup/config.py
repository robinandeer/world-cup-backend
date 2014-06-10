# -*- coding: utf-8 -*-

import os

from .utils import make_dir, INSTANCE_FOLDER_PATH


class BaseConfig(object):

  PROJECT = 'worldcup'

  # Get app root path, also can use flask.root_path.
  # ../../config.py
  PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

  DEBUG = False
  TESTING = False

  # http://flask.pocoo.org/docs/quickstart/#sessions
  SECRET_KEY = 'secret key'

  LOG_FOLDER = os.path.join(INSTANCE_FOLDER_PATH, 'logs')
  #make_dir(LOG_FOLDER)

  ADMINS = ['robin.andeer@scilifelab.se']


class DefaultConfig(BaseConfig):

  DEBUG = os.environ.get('DEBUG', True)

  GOOGLE = dict(
    consumer_key=os.environ.get('GOOGLE_CONSUMER_KEY'),
    consumer_secret=os.environ.get('GOOGLE_CONSUMER_SECRET'),
    # Prepend to all (non-absolute) request URLs
    base_url='https://www.googleapis.com/oauth2/v1/',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    request_token_url=None,
    request_token_params={
      'scope': "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
    },
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_method='POST'
  )

  # Flask-mail: http://pythonhosted.org/flask-mail/
  # https://bitbucket.org/danjac/flask-mail/issue/3/problem-with-gmails-smtp-server
  MAIL_DEBUG = DEBUG
  MAIL_SERVER = 'smtp.gmail.com'
  # MAIL_PORT = 465
  # MAIL_USE_SSL = True
  MAIL_PORT = 587
  MAIL_USE_TLS = True
  MAIL_USE_SSL = False

  MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
  MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
  MAIL_DEFAULT_SENDER = MAIL_USERNAME

  MONGO_URI = os.environ.get('MONGO_URI')

  SECRET_KEY = os.environ.get('SECRET_KEY')

  EXTERNAL_USERS = ['keyvan.elhami@gmail.com', 'robin.andeer@gmail.com']


class TestConfig(BaseConfig):

  TESTING = True
