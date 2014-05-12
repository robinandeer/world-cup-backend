# -*- coding: utf-8 -*-

from __future__ import print_function, division, absolute_import

from flask import Flask

__version__ = '0.0.1'
__title__ = 'World Cup Predictor'

app = Flask(__name__, static_url_path='/static')
app.config.from_object('worldcup.settings')

from . import views
