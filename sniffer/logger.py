from db import DB
import json


class Logger(object):

    def __init__(self):
        self.db = DB()

    def registerUser(self, user):
        self.db.registerUser(json.loads(user))
