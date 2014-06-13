#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from pymongo import MongoClient

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


def main():
  db = setup_db_connection()

  for user in fetch_documents(db, 'user'):
    groupWinners = set(user['groupWinners'])
    groupRunnerUps = set(user['groupRunnerUps'])

    user['groupWinners'] = list(groupWinners - groupRunnerUps)

    print('Fixing to %s' % user['name'])
    db.user.save(user)


if __name__ == '__main__':
  main()
