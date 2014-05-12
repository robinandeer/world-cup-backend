# coding: utf-8
from collections import namedtuple

# Secret key for session management. You can generate random strings here:
# http://clsc.net/tools-old/random-string-generator.php
SECRET_KEY = 'temporary_secret_key'

# MongoLab
Mongo = namedtuple('MongoLab', 'username password host port db')
mongo_auth = Mongo(
  'robinandeer', 'Pensum747.', 'ds043037.mongolab.com', 43037, 'worldcup'
)
mongo_uri = 'mongodb://robinandeer:Pensum747.@ds043037.mongolab.com:43037/worldcup'
