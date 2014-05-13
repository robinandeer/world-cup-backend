# -*- coding: utf-8 -*-

from flask import render_template, url_for, jsonify, request, redirect, \
  flash, session
from flask.ext.login import LoginManager, login_user, current_user, \
  fresh_login_required, login_required, confirm_login, logout_user

from . import app
from .core import mongo, login_manager
from .cors import crossdomain
from .models import User
from .utils import get_groups, get_matchups

all_methods = ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']


@login_manager.user_loader
def load_user(email):
  # 1. Fetch against the database a user by `email` 
  # 2. Create a new object of `User` class and return it.
  data = {
    'name': session.get('name'),
    'email': session.get('email')
  }
  if data.get('email'):
    user = User(name=data['name'], email=data['email'])
  else:
    user = None

  return user

login_manager.init_app(app)

@app.route('/')
@fresh_login_required
def index():
  return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'POST' and 'email' in request.form:
    email = request.form.get('email')
    name_parts = email.split('@')[0].split('.')
    username = ' '.join([part.capitalize() for part in name_parts])

    user = User(username, email)

    if login_user(user, remember=True):
      # For the timeout/session lifetime config to work we need
      # to make the sessions permanent. It's false by default
      # +INFO: http://flask.pocoo.org/docs/api/#flask.session.permanent
      session.permanent = True
      session['logged_in'] = True
      session['name'] = username
      session['email'] = email
      flash('Logged in!')
      return redirect(request.args.get('next') or url_for('index'))

    else:
      flash('Sorry, but you could not log in.')

  return render_template('login.html')


@app.route('/reauth', methods=['GET', 'POST'])
@login_required
def reauth():
  if request.method == 'POST':
    confirm_login()
    flash('Reauthenticated.')
    return redirect(request.args.get('next') or url_for('index'))

  return render_template('reauth.html')


@app.route('/logout')
@login_required
def logout():
  logout_user()
  session['logged_in'] = False
  del session['name']
  del session['email']
  flash('Logged out.')
  return redirect(url_for('login'))


@app.route('/api/v1/users', methods=all_methods)
@app.route('/api/v1/users/<user_id>', methods=all_methods)
def user(user_id=None):
  if request.method == 'PUT':
    print(request.json)

  return jsonify(name='Robin Andeer')


@app.route('/api/v1/groups', methods=all_methods)
def groups():
  return jsonify(groups=get_groups())


@app.route('/api/v1/rounds/<int:round_id>', methods=all_methods)
def rounds(round_id):
  winners = ['fra', 'bra', 'ita', 'spa', 'usa', 'por', 'dan', 'nor']
  runner_ups = ['swe', 'alg', 'arg', 'aus', 'kor', 'ecu', 'urg', 'pol']

  return jsonify(
    id=round_id,
    name='Round of %d' % round_id,
    matchups=get_matchups(round_id, winners, runner_ups)
  )
