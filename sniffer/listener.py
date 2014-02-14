#!/usr/bin/env python
import redis


class Listener(object):

    def __init__(self):
        self.rc = redis.Redis('localhost')
        self.ps = self.rc.pubsub()
        self.ps.subscribe(['login'])

    def run(self):
        for item in self.ps.listen():
            if item['type'] == 'message':
                print item
