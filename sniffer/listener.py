#!/usr/bin/env python
import redis

rc = redis.Redis('localhost')
ps = rc.pubsub()
ps.subscribe(['login'])

for item in ps.listen():
    if item['type'] == 'message':
        print item
