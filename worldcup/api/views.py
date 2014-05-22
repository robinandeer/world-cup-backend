# -*- coding: utf-8 -*-

from datetime import datetime
from itertools import chain
import urllib

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
    query_string = str(request.query_string, 'utf-8')

    if query_string.startswith('ids%5B%5D'):
      team_ids = urllib.parse.parse_qs(query_string)['ids[]']
      team_object_ids = [ObjectId(team_id) for team_id in team_ids]
      teams = list(mongo.db.team.find({'_id': { '$in': team_object_ids }}))
      return jsonify_mongo(teams=teams)

    if document_id is None:
      return jsonify_mongo(teams=list(mongo.db.team.find(query_args)))

  elif request.method == 'PUT':
    return Response('Updating teams not supported'), 404

  elif request.method == 'DELETE':
    return Response('Deleting teams not supported'), 404

  if document is None:
    return Response('Team not found'), 404

  return jsonify_mongo(document)


@api.route('/rounds', methods=HTTP_METHODS)
def rounds():
  round_id = int(request.args.get('round', '-1'))
  winners = request.args.get('winners', '').split(',')
  runner_ups = request.args.get('runner_ups', '').split(',')

  return jsonify(
    round=dict(
      id=round_id,
      name='Round of %d' % round_id,
      matchups=get_matchups(round_id, winners, runner_ups)
    )
  )


@api.route('/matchups', methods=HTTP_METHODS)
def matchups():
  round_id = int(request.args.get('round', '-1'))
  winners = request.args.get('winners', '').split(',')
  runner_ups = request.args.get('runner_ups', '').split(',')

  if len(winners) < 4:
    winners = ['BRA', 'ESP', 'COL', 'URY', 'CHE', 'DEU', 'ARG', 'BEL']
    runner_ups = ['HRV', 'NLD', 'GRC', 'CRI', 'ECU', 'PRT', 'NGA', 'DZA']

  matchups = get_matchups(round_id, winners, runner_ups)

  team_ids = chain.from_iterable(
    [[home_team, away_team] for home_team, away_team in matchups])
  teams = list(mongo.db.team.find({'code': { '$in': list(team_ids) } }))

  mapper = {}
  for team in teams:
    mapper[team['code']] = team['_id']

  payload = [{
    '_id': '%s-%s' % (home_team, away_team),
    'homeTeam': mapper[home_team],
    'awayTeam': mapper[away_team]
  } for home_team, away_team in matchups]

  return jsonify_mongo(
    matchups=payload,
    teams=teams
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

    team_categories = ['groupWinners', 'groupRunnerUps', 'round1Winners',
                       'round2Winners', 'round3Winners', 'round4Winners',
                       'round4RunnerUps']

    team_ids = []
    for category in team_categories:
      for team_id in document.get(category, []):
        team_ids.append(ObjectId(team_id))

    teams = list(mongo.db.team.find({'_id': { '$in': team_ids }}))

  if request.method == 'PUT':
    # Update a specific document
    # Start by updating the changed fields
    for key, value in data.items():
      if isinstance(value, list):
        value = [ObjectId(document_id) for document_id in value]

      document[key] = value

      mongo.db.user.save(document)

  # Return json object for the logged in user
  return jsonify_mongo(user=document, teams=teams)
