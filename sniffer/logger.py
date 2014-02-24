from db import DB


class Logger(object):

    def __init__(self):
        self.db = DB()

    def registerUser(self, user):
        print 'User received'
        print user
