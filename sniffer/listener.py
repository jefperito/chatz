import redis
from logger import Logger
from config import Config


class Listener(object):

    def __init__(self):
        self.logger = Logger()
        self.__configureRedis()

    def __configureRedis(self):
        self.rc = redis.Redis(host=Config.REDIS_HOST, port=Config.REDIS_PORT)

        self.ps = self.rc.pubsub()
        self.ps.subscribe(['login'])

    def run(self):
        for item in self.ps.listen():
            if item['type'] == 'message' and item['channel'] == 'login':
                self.logger.registerUser(item['data'])

            if item['type'] == 'message' and item['channel'] == 'message':
                self.logger.registerMessage(item['data'])
