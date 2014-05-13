#!/usr/bin/env python
# encoding: utf-8
"""
get_matcups.py

return the groups in json format

Created by Måns Magnusson on 2013-04-09.
Copyright (c) 2013 __MyCompanyName__. All rights reserved.
"""

import sys
import os
import argparse
import yaml
from codecs import open, getreader
from pprint import pprint as pp


def get_matchups(round_id, winners, runner_ups=None):
  """Return a list of the matchups in a round of the playoffs. Input will
  be a simple list of the teams that has advanced to this round.
  """
  # Determine matchups for a round in the playoffs
  match_count = round_id / 2

  combo = zip(winners[:match_count], runner_ups[:match_count])
  return [(winner, runner_up) for winner, runner_up in combo]


def main():
    parser = argparse.ArgumentParser(description="Parse different kind of ped files.")
    parser.add_argument('groups_file', 
                        type=str, nargs=1, 
                        help='A yaml file with groups'
    )
    parser.add_argument('country_codes', 
                        type=str, nargs=1, 
                        help="A ';'-separated file file with country codes"
    )
    parser.add_argument('-o', '--outfile', 
                        type=str, nargs=1, 
                        default=[None], 
                        help='Specify the path to output.')
                        
    args = parser.parse_args()
    
    

if __name__ == '__main__':
    main()

