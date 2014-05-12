# -*- coding: utf-8 -*-
from flask.ext.login import UserMixin


class User(UserMixin):
  def __init__(self, name, email, active=True):
    self.name = name
    self.email = email
    self.active = active

  def get_id(self):
    return self.email

  def is_active(self):
    # Here you should write whatever the code is
    # that checks the database if your user is active
    return self.active

  def is_anonymous(self):
    return False

  def is_authenticated(self):
    return True
