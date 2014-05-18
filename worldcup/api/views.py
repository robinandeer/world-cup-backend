# -*- coding: utf-8 -*-

from datetime import datetime
from itertools import chain

from bson import ObjectId
from flask import Blueprint, Response, request, jsonify
from flask.ext.login import current_user, login_required
from pymongo.errors import DuplicateKeyError

from ..extensions import mongo
from ..utils import HTTP_METHODS, get_current_time, jsonify_mongo, get_matchups


api = Blueprint('api', __name__, url_prefix='/api/v1')


@api.route('/groups', methods=HTTP_METHODS[:3])
@api.route('/groups/<document_id>', methods=HTTP_METHODS)
@login_required
def groups(document_id=None):
  # Store the submitted query options
  query_args = request.args.to_dict()
  payload = {}

  if document_id:
    # Well, at least we know we should try to fetch a document
    payload['group'] = mongo.db.group.find_one({'_id': ObjectId(document_id)})

    if payload.get('group') is None:
      return Response('Group not found'), 404

    team_ids = payload['group']['teams']

  if request.method == 'POST':
    return Response('Adding groups not supported'), 404

  elif request.method == 'GET':
    if document_id is None:
      payload['groups'] = list(mongo.db.group.find())
      team_ids = chain.from_iterable(
        [group.get('teams', []) for group in payload['groups']])

  elif request.method == 'PUT':
    return Response('Updating groups not supported'), 404

  elif request.method == 'DELETE':
    return Response('Deleting groups not supported'), 404

  payload['teams'] = list(
    mongo.db.team.find({'_id': { '$in': list(team_ids) } }))
  return jsonify_mongo(payload)


@api.route('/teams', methods=HTTP_METHODS[:3])
@api.route('/teams/<document_id>', methods=HTTP_METHODS)
@login_required
def teams(document_id=None):
  # Store the submitted query options
  query_args = request.args.to_dict()

  if document_id:
    # Well, at least we know we should try to fetch a document
    if len(document_id) == 3:
      document = mongo.db.team.find_one({'code': document_id.upper()})
    else:
      document = mongo.db.team.find_one({'_id': ObjectId(document_id)})

  if request.method == 'POST':
    return Response('Adding teams not supported'), 404

  elif request.method == 'GET':
    if document_id is None:
      return jsonify_mongo(teams=mongo.db.team.find())

  elif request.method == 'PUT':
    return Response('Updating teams not supported'), 404

  elif request.method == 'DELETE':
    return Response('Deleting teams not supported'), 404

  if document is None:
    return Response('Team not found'), 404

  return jsonify_mongo(document)


@api.route('/rounds/<int:round_id>', methods=HTTP_METHODS)
def rounds(round_id):
  winners = ['fra', 'bra', 'ita', 'spa', 'usa', 'por', 'dan', 'nor']
  runner_ups = ['swe', 'alg', 'arg', 'aus', 'kor', 'ecu', 'urg', 'pol']

  return jsonify(
    id=round_id,
    name='Round of %d' % round_id,
    matchups=get_matchups(round_id, winners, runner_ups)
  )


@api.route('/activities', methods=HTTP_METHODS[:3])
@api.route('/activities/<document_id>', methods=HTTP_METHODS)
@login_required
def activities(document_id=None):
  # Store the submitted query options
  query_args = request.args.to_dict()
  data = request.json

  if document_id:
    # Well, at least we know we should try to fetch a document
    document = mongo.db.activity.find_one({'_id': ObjectId(document_id)})

  if request.method == 'POST':
    # Update data before inserting a new document
    data['created_at'] = get_current_time()
    data['user_id'] = ObjectId(data['user_id'])

    # Add a new activity to the collection
    try:
      document_id = mongo.db.activity.insert(data)
      document = data
      document['_id'] = document_id
    except DuplicateKeyError:
      return Response('Document already exists'), 500

  elif request.method == 'GET':
    if document_id is None:
      return jsonify_mongo(activities=list(mongo.db.activity.find(query_args)))

  elif request.method == 'PUT':
    # Update a specific document
    # Start by updating the changed fields
    for key, value in data.items():
      if key == 'user_id':
        value = ObjectId(value)
      elif key in ('created_at', 'updated_at'):
        value = datetime(value)

      document[key] = value

      mongo.db.activity.save(document)

  elif request.method == 'DELETE':
    # Remove a document from the collection
    effect = mongo.db.activity.remove(ObjectId(document_id))

    if effect['err']:
      # There was an error while deleting the record
      return Response(effect['err']), 500

  return jsonify_mongo(document)


@api.route('/users', methods=HTTP_METHODS[:3])
@api.route('/users/<user_id>', methods=HTTP_METHODS)
@login_required
def users(user_id=None):
  data = (request.json or {}).get('user', {})

  if user_id:
    if user_id == 'current':
      user_id = current_user['user_id']

    document = mongo.db.user.find_one({'_id': ObjectId(user_id)})

  if request.method == 'PUT':
    # Update a specific document
    # Start by updating the changed fields
    print(data)
    for key, value in data.items():
      if key == 'group_winners':
        value = [ObjectId(document_id) for document_id in value]

      document[key] = value

      mongo.db.activity.save(document)

  # Return json object for the logged in user
  return jsonify_mongo({'user': document})
