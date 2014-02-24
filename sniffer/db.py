import rethinkdb as r
from config import Config


class DBException(Exception):
    pass


class DB(object):
    TABLE_USER = 'users'
    DATABASE = 'chatz'

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
        r.db_create(self.DATABASE).run()
        response = r.table_create(self.TABLE_USER).run()

        if response['created'] != 1:
            raise DBException('Nao foi possivel criar o banco de dados: '
                              + str(response))

    def registerUser(self, user):
        response = r.table(self.TABLE_USER).insert(user).run()

        if response.errors > 0:
            raise DBException('Houve um erro ao armazenar o usuario')
