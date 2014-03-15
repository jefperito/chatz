#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json


class Config(object):
    CONFIG_FILENAME = 'config.json'
    REDIS_HOST = None
    REDIS_PORT = None
    RETHINKDB_HOST = None
    RETHINKDB_PORT = None

    @staticmethod
    def load():
        with open(Config.CONFIG_FILENAME) as config_data:
            data = json.load(config_data)

        Config.REDIS_HOST = data['REDIS_HOST']
        Config.REDIS_PORT = int(data['REDIS_PORT'])
        Config.RETHINKDB_HOST = data['RETHINKDB_HOST']
        Config.RETHINKDB_PORT = int(data['RETHINKDB_PORT'])
