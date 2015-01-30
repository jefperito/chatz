var assert = require('assert');
var sinon = require('sinon');

suite('controller', function() {
    test('should execute callback passing a new user', function(done) {
        var controller = require('./../server/controller');

        var socketFake = {
            join: function(room) {}
        };
        var userDTO = {
            id: 'my_private_id',
            name: 'Jeferson Viana Perito'
        };
        var emitterFake = {
            newUser: function(socket) {
                assert.equal('my_private_id', socket._user.id);
                assert.equal(userDTO.name, socket._user.name);
            }
        };

        sinon.spy(emitterFake, 'newUser');

        controller.emitter = emitterFake;
        controller.login(socketFake, userDTO, function(error, user) {
            assert.ifError(error);
            assert.equal(0, user.id); // public id
            assert.equal(userDTO.name, user.name);
            assert(emitterFake.newUser.calledOnce);
            done();
        });
    });

    test('should get user contfrom repository when user always exist', function(done) {
        var controller = require('./../server/controller');
        var socketFake = {
            join: function(room) {}
        };
        var userDTO = {
            id: 'my_private_id',
            name: 'Jeferson Viana Perito',
        };
        var emitterFake = {
            newUser: function(socket) {}
        };

        sinon.spy(emitterFake, 'newUser');

        controller.emitter = emitterFake;
        controller.login(socketFake, userDTO, function(error, user) {
            assert.ifError(error);
            assert.equal(0, user.id);
            assert.equal(userDTO.name, user.name);
            assert(emitterFake.newUser.notCalled);
            done();
        });
    });

    test('should get a message when the client send it', function(done) {
        var controller = require('./../server/controller');

        var userFake1 = {
            id: 'my_private_key',
            name: 'Jeferson Viana Perito'
        };
        var socketFake1 = {
            _user: userFake1,
            join: function(room) {}
        };
        var messageDTO = {
            room_id: 1,
            body: 'hello world'
        };
        var userFake2 = {
            id: 2,
            name: 'Anderson Silva'
        };
        var socketFake2 = {
            _user: userFake2,
            join: function(room) {}
        };
        var emitterFake = {
            newUser: function(socket) {},
            message: function(room, message, user) {
                assert.deepEqual({
                    sender: {
                        id: 2,
                        name: 'Jeferson Viana Perito'
                    },
                    body: 'hello world'
                }, message);
                // TODO Corrigir problemas com referencia circular
                // assert.deepEqual(userFake1, user);
                // assert.deepEqual(userFake2, targetUser);
            }
        };

        sinon.spy(emitterFake, 'message');

        controller.emitter = emitterFake;
        controller.login(socketFake2, userFake2, function() {});
        controller.login(socketFake1, userFake1, function() {});
        controller.sendMessage(socketFake1, messageDTO, function() {
            done();
        });
    });

    test('should get the users', function() {
        var controller = require('./../server/controller');

        var userFake1 = {
            id: 0,
            name: 'Jeferson Viana Perito'
        };
        var userFake2 = {
            id: 1,
            name: 'Anderson Silva'
        };

        controller.getUsers({}, function(error, users) {
            assert.ifError(error);
            assert.deepEqual(userFake1, users[1]);
            assert.deepEqual(userFake2, users[0]);
        });
    });

    test('should get the rooms', function() {
        var controller = require('./../server/controller');

        var roomsFake = {
            get: function(id) {
                return {
                    toDTO: function() {
                        return {
                            id: id
                        };
                    }
                };
            }
        };

        var userFake1 = {
            id: 1,
            name: 'Jeferson Viana Perito',
            getRooms: function() {
                return ['1_2', '1_3'];
            }
        };
        var socketFake1 = {
            _user: userFake1,
            join: function(room) {}
        };

        controller.rooms = roomsFake;
        assert.deepEqual([{
            id: '1_2'
        }, {
            id: '1_3'
        }], controller.getRooms(socketFake1));

        var userFake2 = {
            id: 1,
            name: 'Jeferson Viana Perito',
            getRooms: function() {
                return [];
            }
        };
        var socketFake2 = {
            _user: userFake2,
            join: function(room) {}
        };

        assert.deepEqual([], controller.getRooms(socketFake2));
    });

    test('should kill an user when disconnected after 10 seconds', function(done) {
        var controller = require('./../server/controller');
        var clock = sinon.useFakeTimers();
        var userFake = {
            id: 'my_private_id',
            name: 'Jeferson Viana Perito',
            getRooms: function() {
                return ['1_2', '1_3'];
            },
            removeSocket: function(socket) {},
            getId: function() {
                return 'my_private_id';
            },
            getSockets: function() {
                return [];
            }
        };
        var socketFake = {
            _user: userFake,
            join: function(room) {}
        };
        var emitterFake = {
            logoutUser: function(socket) {
                assert(emitterFake.logoutUser.calledOnce);
                done();
            }
        };


        sinon.spy(emitterFake, 'logoutUser');
        controller.emitter = emitterFake;
        controller.disconnect(socketFake);
        clock.tick(10010);
    });
});