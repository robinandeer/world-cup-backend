#!/usr/bin/env python
# encoding: utf-8
"""
get_matcups.py

return the proper matches in json format

In the first round, send a round id (1 for first round) and two lists with winners and 
runner ups.

In the second round, send round id 2 and one list with eight winners.

In the third round, send round id 3 and one list with four winners.

In the fourth round, send round id 4 and one list with two winners and one list with two loosers.

return list of tuples with matches.




Created by Måns Magnusson on 2013-04-09.
Copyright (c) 2013 __MyCompanyName__. All rights reserved.
"""
from __future__ import division
import sys
import os
import argparse
import yaml
from codecs import open, getreader
from pprint import pprint as pp

from worldcup import resources_dir


def get_matchups(round_id, winners, runner_ups=None):
    """Return a list of the matchups in a round of the playoffs. Input will
      be a simple list of the teams that has advanced to this round.
    """
    # Determine matchups for a round in the playoffs
    # Wounder if we should have match id:s...
    end_games = {'end_games': 
                    {1: ['A1', 'B2'],
                    2: ['C1', 'D2'],
                    3: ['E1', 'F2'],
                    4: ['G1', 'H2'],
                    5: ['B1', 'A2'],
                    6: ['D1', 'C2'],
                    7: ['F1', 'E2'],
                    8: ['H1', 'G2']}}
    group_winners = ['A1','B1','C1','D1','E1','F1','G1','H1']
    group_runner_ups = ['A2','B2','C2','D2','E2','F2','G2','H2']
    matches_to_return = []
    
    if round_id == 1:
        winners = dict(zip(group_winners, winners))
        runner_ups = dict(zip(group_runner_ups, runner_ups))
        for game in end_games['end_games']:
            teams = end_games['end_games'][game]
            matches_to_return.append((winners[teams[0]],runner_ups[teams[1]]))
    elif round_id == 4:
        matches_to_return = [(winners[0], winners[1]), (runner_ups[0], runner_ups[1])]
    else:
        i = 1
        while i < len(winners):
            matches_to_return.append((winners[i-1], winners[i]))
            i += 2
    return matches_to_return

  # combo = zip(winners, runner_ups)
  # return [(winner, runner_up) for winner, runner_up in combo]


def main():
    parser = argparse.ArgumentParser(description="Return matches according to scedule.")
    parser.add_argument('end_games', 
                        type=str, nargs=1, 
                        help='A yaml file with end games'
    )
    parser.add_argument('-o', '--outfile', 
                        type=str, nargs=1, 
                        default=[None], 
                        help='Specify the path to output.')
                        
    args = parser.parse_args()
    print(get_matchups(1, ['FRA','USA','SWE','BOS','RUS','GRB','GER','ARG'],
                     ['BRA','CIV','NIG','JAP','AUS','AUT','MAK','KRO']))
    print(get_matchups(2, ['FRA','USA','SWE','BOS','AUS','AUT','MAK','KRO']))
    print(get_matchups(3, ['FRA','SWE','AUS','MAK']))
    print(get_matchups(4, ['SWE','AUS'],['FRA','MAK']))
    print(resources_dir)
    # winners = ['Fra', 'USA']
    # runner_ups = ['GBR', 'SWE']
    # print(get_matchups(4,winners,runner_ups))
    # f = open(args.end_games[0])
    # data_map = yaml.safe_load(f)
    # f.close()
    # pp(data_map)
    

if __name__ == '__main__':
    main()

