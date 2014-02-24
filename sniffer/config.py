import json


class Config(object):
    CONFIG_FILENAME = 'config.json'
    REDIS_HOST = None

    @staticmethod
    def load():
        with open(Config.CONFIG_FILENAME) as config_data:
            data = json.load(config_data)

        Config.REDIS_HOST = data.REDIS_HOST
