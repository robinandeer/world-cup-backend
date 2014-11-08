#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from pymongo import MongoClient
import requests

KIMONO_API_KEY = os.environ.get('KIMONO_API_KEY')

CONVERT_NAMES = {
  "Côte d'Ivoire": 'Ivory Coast',
  'Bosnia-Herzegovina': 'Bosnia and Herzegovina',
  'Korea Republic': 'South Korea'
}


def setup_db_connection():
  mongo = MongoClient(os.environ.get('MONGO_URI'))
  return mongo.worldcup


def fetch_documents(db, document_type, document_ids=None, field='code'):
  if document_ids:
    query = {field: {'$in': document_ids}}

  elif document_type == 'user':
    query = {'finalWinner': {'$exists': True}}

  else:
    query = {}

  return db[document_type].find(query)


def user_teams(user):
  # Copy the list of group winners
  predict_teams = list(user['groupWinners'])

  # Combine group winners and runnerups
  predict_teams.extend(user['groupRunnerUps'])

  return predict_teams


def match_teams(result_teams, predict_teams):
  """Returns the number of predicted teams that match actual advancing
  teams.
  """
  # Intersect with results
  return len(set(predict_teams)& set(result_teams))


def get_advancing_teams():
  # Brazil, Mexico, Chile, Netherlands
  kimono_root = 'http://worldcup.kimonolabs.com/api/teams'
  url = ('%s?apikey=%s&groupRank=1&groupRank=2&fields=name'
         % (kimono_root, KIMONO_API_KEY))
  res = requests.get(url)

  team_names = []
  for team in res.json():
    team_name = team['name']

    # Convert names if you have to
    if team_name in CONVERT_NAMES:
      team_name = CONVERT_NAMES[team_name]

    team_names.append(team_name)

  db = setup_db_connection()
  return [team['_id'] for team in db.team.find({'name': {'$in': team_names}})]


def main():
  db = setup_db_connection()
  advancing_teams = get_advancing_teams()

  for user in fetch_documents(db, 'user'):
    predict_teams = user_teams(user)
    user['groupScore'] = match_teams(advancing_teams, predict_teams)

    print('Awarding points to %s: %d' % (user['name'], user['groupScore']))
    db.user.save(user)


if __name__ == '__main__':
  main()
