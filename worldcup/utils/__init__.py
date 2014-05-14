# -*- coding: utf-8 -*-


def get_groups():
  """Return each group with a list of the teams.
  """
  # These are the World Cup group Ids
  group_ids = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  # One fake example of a typical group
  teams = [{
    'id': 'fra',
    'name': 'France'
  }, {
    'id': 'bra',
    'name': 'Brazil'
  }, {
    'id': 'ita',
    'name': 'Italy'
  }, {
    'id': 'usa',
    'name': 'United States'
  }]

  # Generate each of the groups
  groups = [{
    'id': group_id,
    'name': group_id.upper(),
    'teams': teams
  } for group_id in group_ids]

  return groups


def get_matchups(round_id, winners, runner_ups=None):
  """Return a list of the matchups in a round of the playoffs. Input will
  be a simple list of the teams that has advanced to this round.
  """
  # Determine matchups for a round in the playoffs
  match_count = int(round_id / 2)

  combo = zip(winners[:match_count], runner_ups[:match_count])
  return [(winner, runner_up) for winner, runner_up in combo]
