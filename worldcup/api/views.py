# -*- coding: utf-8 -*-

from datetime import datetime
from itertools import chain
import urllib

from bson import ObjectId
from bson.son import SON
from flask import Blueprint, Response, request, jsonify, abort
from flask.ext.login import current_user, login_required
from pymongo.errors import DuplicateKeyError

from ..extensions import mongo
from ..utils import HTTP_METHODS, get_current_time, jsonify_mongo, get_matchups


api = Blueprint('api', __name__, url_prefix='/api/v1')

TEAMS = {
  'ENG': 'D',
  'COL': 'C',
  'CMR': 'A',
  'ITA': 'D',
  'GHA': 'G',
  'USA': 'G',
  'ESP': 'B',
  'CHL': 'B',
  'BIH': 'F',
  'GRC': 'C',
  'KOR': 'H',
  'ARG': 'F',
  'IRN': 'F',
  'CIV': 'C',
  'HRV': 'A',
  'HND': 'E',
  'JPN': 'C',
  'BRA': 'A',
  'MEX': 'A',
  'CRI': 'D',
  'FRA': 'E',
  'NLD': 'B',
  'PRT': 'G',
  'DZA': 'H',
  'BEL': 'H',
  'RUS': 'H',
  'AUS': 'B',
  'NGA': 'F',
  'CHE': 'E',
  'URY': 'D',
  'DEU': 'G',
  'ECU': 'E'
}


@api.route('/groups', methods=HTTP_METHODS[:3])
@api.route('/groups/<document_id>', methods=HTTP_METHODS)
@login_required
def groups(document_id=None):
  # Store the submitted query options
  payload = {}
  team_ids = []

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
      payload['groups'] = list(mongo.db.group.find().sort('group_id', 1))
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
      return jsonify_mongo(teams=list(mongo.db.team.find(
        {'betfair': {'$exists': True}}).sort('name', 1)))

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

  if round_id == 1:
    # Sort in group-wise order after group stage
    winners.sort(key=lambda team_code: TEAMS[team_code])
    runner_ups.sort(key=lambda team_code: TEAMS[team_code])

  matchups = get_matchups(round_id, winners, runner_ups)

  team_ids = chain.from_iterable(
    [[home_team, away_team] for home_team, away_team in matchups])
  teams = list(mongo.db.team.find({'code': { '$in': list(team_ids) } }))

  mapper = {}
  for team in teams:
    mapper[team['code']] = team['_id']

  payload = [{
    '_id': '%d|%s-%s' % (count, home_team, away_team),
    'homeTeam': mapper[home_team],
    'awayTeam': mapper[away_team]
  } for count, (home_team, away_team) in enumerate(matchups)]

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


def extract_user_team_ids(user):
  """Extracts team ids as ``ObjectId`` from a user JSON object."""
  team_categories = ['groupWinners', 'groupRunnerUps', 'round1Winners',
                     'round2Winners', 'round3Winners', 'round3Losers']

  for category in team_categories:
    for team_id in user.get(category, []):
      yield ObjectId(team_id)

  finalTeams = (user.get('finalWinner'), user.get('thirdPlaceWinner'))
  for team_id in finalTeams:
    if team_id:
      yield ObjectId(team_id)


@api.route('/users', methods=HTTP_METHODS[:3])
@api.route('/users/<user_id>', methods=HTTP_METHODS)
@login_required
def users(user_id=None):
  # Store the submitted query options
  query_args = request.args.to_dict()
  if query_args.get('finalWinner'):
    query_args['finalWinner'] = ObjectId(query_args['finalWinner'])

  data = (request.json or {}).get('user', {})
  payload = {
    'teams': []
  }

  if user_id:
    if user_id == 'current':
      user_id = current_user['user_id']

    if '@' in user_id:
      doc = mongo.db.user.find_one({'email': user_id})

    else:
      doc = mongo.db.user.find_one({'_id': ObjectId(user_id)})

    if doc is None:
      return abort(404)
    else:
      payload['user'] = doc
      docs = (doc,)

  elif request.method == 'GET':
    # Request is to get all users
    payload['users'] = docs = list(
      mongo.db.user.find(query_args).sort('created_at', -1).limit(20))

  if request.method == 'GET':

    # Find out which teams to sideload
    team_ids = set()
    for doc in docs:
      for team_id in extract_user_team_ids(doc):
        team_ids.add(team_id)

    payload['teams'] = list(
      mongo.db.team.find({
        '_id': {
          '$in': list(team_ids)
        }
      }))

  if request.method == 'PUT':
    # Update a specific document
    # Start by updating the changed fields
    for key, value in data.items():
      if isinstance(value, list):
        value = [ObjectId(document_id) for document_id in value]

      if key in ('finalWinner', 'thirdPlaceWinner'):
        value = ObjectId(value)

      doc[key] = value

    mongo.db.user.save(doc)

  # Return json object for the logged in user
  return jsonify_mongo(**payload)


@api.route('/stats/<winner_id>', methods=HTTP_METHODS)
@login_required
def stats(winner_id=None):
  winnerCount = None
  if winner_id != 'unknown':
    winnerCount = mongo.db.user.find({'finalWinner': winner_id}).count()

  payload = {
    '_id': 'space',
    'userCount': mongo.db.user.count(),
    'completeCount': mongo.db.user.find(
      {'finalWinner': {'$exists': True}}).count(),
    'winnerCount': winnerCount
  }

  return jsonify(stat=payload)


@api.route('/trees/<user_id>', methods=['GET'])
@login_required
def trees(user_id):
  # Define all stages for which there are 
  stages = [('groupWinners', 8), ('groupRunnerUps', 8), ('round1Winners', 8),
            ('round2Winners', 4), ('round3Winners', 2)]

  team_ids = set()
  consensus = {'_id': user_id}
  for stage, count in stages:
    query = mongo.db.user.aggregate([
      {'$unwind': '$%s' % stage},
      {'$group': {'_id': '$%s' % stage, 'count': {'$sum': 1}}},
      {'$sort': SON([('count', -1), ('_id', -1)])}
    ])

    consensus[stage] = [team['_id'] for team in query['result'][:count]]

    team_ids.update(consensus[stage])

  for medalist in ['thirdPlaceWinner', 'finalWinner']:
    query = mongo.db.user.aggregate([
      {'$group': {'_id': '$%s' % medalist, 'count': {'$sum': 1}}},
      {'$sort': SON([('count', -1), ('_id', -1)])}
    ])

    top_id = query['result'][0]['_id']
    if top_id is None:
      top_id = query['result'][1]['_id']

    consensus[medalist] = top_id

    team_ids.add(top_id)

  teams = list(mongo.db.team.find({'_id': { '$in': list(team_ids) }}))

  return jsonify_mongo(tree=consensus, teams=teams)
