# -*- coding: utf-8 -*-

from __future__ import print_function, division, absolute_import
from os import path

__version__ = '0.0.1'
__title__ = 'World Cup Predictor'
__licence__ = 'MIT'

# Expose centralized app setup function
from .app import create_app

resources_dir = path.join(path.dirname(__file__), 'resources')
