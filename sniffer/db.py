#!/usr/bin/env python
# -*- coding: utf-8 -*-

import rethinkdb as r
from config import Config


class DBException(Exception):
    pass


class DB(object):
    TABLE_USER = 'users'
    TABLE_MESSAGES = 'messages'
    DATABASE = 'chatz'
    TABLES = [TABLE_MESSAGES, TABLE_USER]

    def __init__(self):
        self.__connect()
        if not self.__existsDB():
            self.__createDB()

    def __connect(self):
        r.connect(
            host=Config.RETHINKDB_HOST,
            port=Config.RETHINKDB_PORT,
            db=self.DATABASE
        ).repl()

    def __existsDB(self):
        return self.DATABASE in r.db_list().run()

    def __createDB(self):
        response = r.db_create(self.DATABASE).run()

        if response['created'] != 1:
            raise DBException('Nao foi possivel criar o banco de dados: '
                              + str(response))

        for table in self.TABLES:
            response = r.table_create(table).run()

            if response['created'] != 1:
                raise DBException('Nao foi possivel criar a tabela {0}: {1}'.format(table, str(response)))

    def registerUser(self, user):
        response = r.table(self.TABLE_USER).insert(user).run()

        if response['errors'] > 0:
            raise DBException('Houve um erro ao armazenar o usuario {0}'.format(str(response)))

    def registerMessage(self, message):
        response = r.table(self.TABLE_MESSAGES).insert(message).run()

        if response['errors'] > 0:
            raise DBException('Houve um erro ao armazenar o usuario {0}'.format(str(response)))
