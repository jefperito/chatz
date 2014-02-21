import redis
from logger import Logger


class Listener(object):

    def __init__(self):
        self.logger = Logger()
        self.__configureRedis()

    def __configureRedis(self):
        self.rc = redis.Redis('localhost')
        self.ps = self.rc.pubsub()
        self.ps.subscribe(['login'])

    def run(self):
        for item in self.ps.listen():
            if item['type'] == 'message' and item['channel'] == 'login':
                self.logger.registerUser(item['data'])
