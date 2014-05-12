# -*- coding: utf-8 -*-
from datetime import timedelta

from flask.ext.login import LoginManager
from flask.ext.pymongo import PyMongo
from pymongo.errors import DuplicateKeyError

from worldcup import app

# Set the timeout for our session to 30 days
# The session will be lost after 30 days with no interaction
# form the user.
# +INFO: http://flask.pocoo.org/docs/api/#flask.Flask.permanent_session_lifetime
app.permanent_session_lifetime = timedelta(days=30)

# +--------------------------------------------------------------------+
# | MongoEngine
# +--------------------------------------------------------------------+
mongo = PyMongo(app)


# +--------------------------------------------------------------------+
# | Flask-Login
# +--------------------------------------------------------------------+
login_manager = LoginManager()

login_manager.login_view = 'login'
login_manager.login_message = 'Please log in to access this page.'
login_manager.refresh_view = 'reauth'
