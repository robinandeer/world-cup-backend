# -*- coding: utf-8 -*-
"""
  Utils has nothing to do with models and views.
"""

from datetime import datetime
import json
import os
import random
import string

from bson import ObjectId
from flask import Response


# Instance folder path, make it independent.
INSTANCE_FOLDER_PATH = os.path.join('/tmp', 'instance')

resources_dir = os.path.join(os.path.dirname(__file__), 'resources')

HTTP_METHODS = ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']


def get_current_time():
  return datetime.utcnow()


def pretty_date(dt, default=None):
  """
  Returns string representing "time since" e.g.
  3 days ago, 5 hours ago etc.
  Ref: https://bitbucket.org/danjac/newsmeme/src/a281babb9ca3/newsmeme/
  """

  if default is None:
      default = 'just now'

  now = datetime.utcnow()
  diff = now - dt

  periods = (
    (diff.days / 365, 'year', 'years'),
    (diff.days / 30, 'month', 'months'),
    (diff.days / 7, 'week', 'weeks'),
    (diff.days, 'day', 'days'),
    (diff.seconds / 3600, 'hour', 'hours'),
    (diff.seconds / 60, 'minute', 'minutes'),
    (diff.seconds, 'second', 'seconds'),
  )

  for period, singular, plural in periods:

    if not period:
      continue

    if period == 1:
      return u'%d %s ago' % (period, singular)
    else:
      return u'%d %s ago' % (period, plural)

  return default


def id_generator(size=10, chars=string.ascii_letters + string.digits):
  #return base64.urlsafe_b64encode(os.urandom(size))
  return ''.join(random.choice(chars) for x in range(size))


def make_dir(dir_path):
  try:
    if not os.path.exists(dir_path):
      os.mkdir(dir_path)
  except Exception as e:
    raise e


# +--------------------------------------------------------------------+
# | JSON related
# +--------------------------------------------------------------------+
class MongoDocumentEncoder(json.JSONEncoder):
  def default(self, o):
    if isinstance(o, datetime):
      return str(o)

    elif isinstance(o, ObjectId):
      return str(o)

    return json.JSONEncoder(self, o)


def jsonify_mongo(*args, **kwargs):
  payload = json.dumps(dict(*args, **kwargs), cls=MongoDocumentEncoder,
                       separators=(',', ':'), ensure_ascii=False)

  return Response(payload, mimetype='application/json; charset=utf-8')
