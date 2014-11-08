#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import absolute_import
import arrow
import requests
import sys

from .award_group_points import (
  setup_db_connection, fetch_documents, match_teams
)


def get_matches():
  url = 'http://worldcup.sfg.io/matches'
  res = requests.get(url)

  return res.json()


def filter_playoff(matches, start_date):
  playoff_start = arrow.get(start_date)

  for match in matches:
    match_date = arrow.get(match['datetime'])
    if (match_date > playoff_start) and match['status'] == 'completed':
      yield match


def user_teams(user, field):
  # Copy the list of advancing teams
  return list(user[field])


def main(start_date, field, points, points_field):
  db = setup_db_connection()

  # Get all matches via API
  matches = get_matches()

  # Filter to only include completed playoff matches
  playoff_matches = filter_playoff(matches, start_date)  # 2014-06-28

  # Extract names of advancing teams
  winner_names = [match['winner'] for match in playoff_matches]

  # Convert names to database ids
  query = db.team.find({'name': {'$in': winner_names}})
  winner_ids = [team['_id'] for team in query]

  # Award points to each user
  for user in fetch_documents(db, 'user'):
    predicted_teams = user_teams(user, field)

    # Award some points in a custom field
    correct_guesses = match_teams(winner_ids, predicted_teams)
    user[points_field] = correct_guesses * points

    # Combine all points
    point_fields = ['round1Score', 'round2Score', 'round3Score']
    user_points = user['groupScore']
    for point_field in point_fields:
      user_points += user.get(point_field, 0)

    user['points'] = user_points

    print('Awarding points to %s: %d' % (user['name'], user['points']))
    db.user.save(user)


if __name__ == '__main__':
  # 1. date of first game in round
  # 2. field with advancing teams
  # 3. points to multiply with each correct guess
  # 4. field to store score in
  main(sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4])

  # Note: open ipython, import "scripts.award_playoff_points.main",
  # and execute that function with the options needed.
