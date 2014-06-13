#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from bson import ObjectId
from pymongo import MongoClient


def get_advancing_teams():
  # Brazil and Mexico
  return [ObjectId('537736d3f747f10de13b0dc3'),
          ObjectId('537736c3f747f10de13b0d55')]


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


def main():
  db = setup_db_connection()
  advancing_teams = get_advancing_teams()

  for user in fetch_documents(db, 'user'):
    predict_teams = user_teams(user)
    user['points'] = match_teams(advancing_teams, predict_teams)

    print('Awarding points to %s: %d' % (user['name'], user['points']))
    db.user.save(user)


if __name__ == '__main__':
  main()
