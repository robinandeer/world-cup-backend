# -*- coding: utf-8 -*-

from datetime import datetime

from flask import abort, Blueprint, flash, redirect, request, session, \
  url_for, current_app
from flask.ext.login import login_required, confirm_login, logout_user, \
  login_user, current_user

from .models import User
from ..decorators import templated
from ..extensions import google, mongo


frontend = Blueprint('frontend', __name__)


# Return a tuple of Google tokens, if they exist
@google.tokengetter
def get_google_token():
  return session.get('google_token')


@frontend.route('/')
@templated('index.html')
def index():
  if current_user.is_authenticated():
    return dict()
  else:
    return redirect(url_for('frontend.connect'))


@frontend.route('/connect')
@templated('login.html')
def connect():
  return dict()


@frontend.route('/unsupported')
@templated('errors/unsupported_browser.html')
def unsupported_browser():
  return dict()


@frontend.route('/login')
def login():
  callback_url = url_for('frontend.authorized', _external=True)
  return google.authorize(callback=callback_url)


@frontend.route('/reauth')
@login_required
def reauth():
  if confirm_login():
    flash('Reauthenticated', 'success')

  return redirect(
    request.args.get('next') or request.referer or url_for('frontend.index'))



@frontend.route('/logout')
def logout():
  logout_user()
  session.pop('google_token', None)
  flash('Logged out', 'success')

  return redirect(url_for('frontend.index'))


@frontend.route('/authorized')
@google.authorized_handler
def authorized(oauth_response):

  if oauth_response is None:
    flash('Access denied: reason=%s error=%s' % (
      request.args['error_reason'],
      request.args['error_description']
    ))

    return abort(403)

  # Add token to session
  session['google_token'] = (oauth_response['access_token'], '')

  # Get more user info with the access token
  google_user = google.get('userinfo')
  google_data = google_user.data


  trusted = google_data['email'] in current_app.config.get('EXTERNAL_USERS')
  if (google_data.get('hd') != 'scilifelab.se') or trusted:
    flash("You tried to login with %s." % google_data['email'])
    flash("You need to login with a '@scilifelab.se' account.")
    return abort(403)

  # Check if user is already in the database
  user_data = mongo.db.user.find_one({'email': google_data['email']})
  if user_data is None:

    # OK, let's store the NEW user in the datastore
    user_data = dict(
      google_id = google_data['id'],
      email = google_data['email'],
      access_token = oauth_response['access_token'],
      given_name = google_data['given_name'],
      family_name = google_data['family_name'],
      name = google_data['name'],
      locale = google_data['locale'],
      created_at = datetime.utcnow()
    )

    user_data['_id'] = mongo.db.user.insert(user_data)

  else:
    # In any case we need to keep the user object up to date
    user_data['access_token'] = oauth_response['access_token']
    # Update user with latest values from ref database + logged_in_at
    user_data['logged_in_at'] = datetime.utcnow()

    mongo.db.user.save(user_data)

  # Convert to Flask-Login User object
  user = User(**user_data)
  if login_user(user, remember=True):
    session['user_id'] = str(user['_id'])
    session['name'] = user['name']
    session['email'] = user['email']
    flash('Logged in', 'success')

    return redirect(request.args.get('next') or request.referrer or
                    url_for('frontend.index'))

  flash('Sorry, you could not log in.', 'warning')
  return redirect('frontend.index')
