from db import DB


class Logger(object):

    def __init__(self):
        self.db = DB()

    def login(self, user):
        print 'Login received'
        print user
