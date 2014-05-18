#!/usr/bin/env python
# encoding: utf-8
"""
get_groups.py

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

from .misc import resources_dir


def get_groups():
  """Return each group with a list of the teams.
  """
  f = open(os.path.join(resources_dir,'groups.yaml'))
  groups = yaml.safe_load(f)
  f.close()
  pp(groups)
  
  # Generate each of the groups
  # groups = [{
  #   'id': group_id,
  #   'name': group_id.upper(),
  #   'teams': teams
  # } for group_id in group_ids]
  # 
  # return groups


def main():
    # parser = argparse.ArgumentParser(description="Parse different kind of ped files.")
    # parser.add_argument('groups_file', 
    #                     type=str, nargs=1, 
    #                     help='A yaml file with groups'
    # )
    # parser.add_argument('country_codes', 
    #                     type=str, nargs=1, 
    #                     help="A ';'-separated file file with country codes"
    # )
    # parser.add_argument('-o', '--outfile', 
    #                     type=str, nargs=1, 
    #                     default=[None], 
    #                     help='Specify the path to output.')
    #                     
    # args = parser.parse_args()
    
    get_groups()
    
    # country_to_code = {}
    # code_to_country = {}
    # with open(args.country_codes[0], mode='r', encoding='utf-8', errors='replace') as g:
    #     for line in g:
    #         if not line.startswith('#'):
    #             line = line.rstrip().split(';')
    #             country_to_code[line[0]] = line[1]
    #             code_to_country[line[1]] = line[0]
    #             
    # 
    # pp(country_to_code)
    
    # # These are the World Cup group Ids
    # group_ids = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    # # One fake example of a typical group
    # teams = [{
    #   'id': 'fra',
    #   'name': 'France'
    # }, {
    #   'id': 'bra',
    #   'name': 'Brazil'
    # }, {
    #   'id': 'ita',
    #   'name': 'Italy'
    # }, {
    #   'id': 'usa',
    #   'name': 'United States'
    # }]
    

if __name__ == '__main__':
    main()

