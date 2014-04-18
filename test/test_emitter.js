var assert = require('assert');

suite('emitter', function() {
    var emitter = require('./../server/communication/emitter');
    var User = require('./../server/models/user');

    suite('user', function() {
        test('should permits to send broadcast to others users when an user is added', function() {
            var dataUser = {
                id: 1,
                name: 'Jeferson Viana Perito'
            };

            var fakeUser = new User(dataUser);

            var socketFake = {
                broadcast: {
                    emit: function(protocolName, newUser) {
                        assert.equal('newUser', protocolName);
                        assert.deepEqual(dataUser, newUser);
                    }
                },
                _user: fakeUser
            };

            emitter.newUser(socketFake);
        });

        test('should permits remove an user', function() {
            var dataUser = {
                id: 1,
                name: 'Jeferson Viana Perito'
            };

            var fakeUser = new User(dataUser);

            var socketDummy = {
                broadcast: {
                    emit: function() {}
                },
                _user: fakeUser
            };

            var socketFake = {
                broadcast: {
                    emit: function(protocolName, user) {
                        assert.equal('removeUser', protocolName);
                        assert.deepEqual(dataUser, user);
                    }
                },
                _user: fakeUser
            };

            emitter.newUser(socketDummy);
            emitter.logoutUser(socketFake);
        });

        test('should permits send a message', function() {
            var message = {
                room_id: 1,
                body: 'Ola mundo'
            };

            var fakeUser1 = new User({
                id: 1,
                name: 'Jeferson Viana Perito'
            });

            var fakeUser2 = new User({
                id: 2,
                name: 'Jean Claude Van Damme'
            });

            var fakeSocket1 = {
                broadcast: {
                    to: function(roomId) {
                        return {
                            emit: function(protocolName, msg) {
                                assert.equal('receiveMsg', protocolName, 'Wrong protocol name.');
                                assert.deepEqual(message, msg, 'Wrong message.');
                            }
                        }
                    }
                },
                _user: fakeUser1
            };

            var fakeSocket2 = {
                broadcast: {
                    emit: function() {}
                },
                emit: function(protocolName, msg) {
                    assert.equal('receiveMsg', protocolName, 'Wrong protocol name.');
                    assert.deepEqual(message, msg, 'Wrong message.');
                },
                _user: fakeUser2
            };

            var roomFake = {
                getId: function() {
                    return '1_2';
                }
            };

            fakeUser1.addSocket(fakeSocket1);

            emitter.message(roomFake, message, fakeSocket1);
        });
    });
});