var assert = require('assert');
var sinon = require('sinon');

suite('controller', function () {
    test('should execute callback passing a new user', function (done) {
        var controller = require('./../server/controller');

        var socketFake = {};
        var userDTO = {
            id: 1,
            name: 'Jeferson Viana Perito'
        };
        var emitterFake = {
            newUser: function (socket) {
                assert.equal(userDTO.id, socket._user.id);
                assert.equal(userDTO.name, socket._user.name);
            }
        };

        sinon.spy(emitterFake, 'newUser');

        controller.emitter = emitterFake;
        controller.login(socketFake, userDTO, function (error, user) {
            assert.ifError(error);
            assert.equal(userDTO.id, user.id);
            assert.equal(userDTO.name, user.name);
            assert(emitterFake.newUser.calledOnce);
            done();
        });
    });

    test('should get user contfrom repository when user always exist', function (done) {
        var controller = require('./../server/controller');
        var socketFake = {};
        var userDTO = {
            id: 1,
            name: 'Jeferson Viana Perito'
        };
        var emitterFake = {
            newUser: function (socket) {}
        };

        sinon.spy(emitterFake, 'newUser');

        controller.emitter = emitterFake;
        controller.login(socketFake, userDTO, function (error, user) {
            assert.ifError(error);
            assert.equal(userDTO.id, user.id);
            assert.equal(userDTO.name, user.name);
            assert(emitterFake.newUser.notCalled);
            done();
        });
    });

    test('should get a message when the client send it', function (done) {
        var controller = require('./../server/controller');
        var userFake1 = {
            id: 1,
            name: 'Jeferson Viana Perito'
        };
        var socketFake = {
            _user: userFake1
        };
        var messageDTO = {
            target_id: 1,
            sender_id: 2,
            body: 'hello world'
        };
        var userFake2 = {
            id: 2,
            name: 'Anderson Silva'
        };

        var emitterFake = {
            newUser: function (socket) {},
            message: function (message, user, targetUser) {
                assert.deepEqual(messageDTO, message);
                // TODO Corrigir problemas com referencia circular
                // assert.deepEqual(userFake1, user);
                // assert.deepEqual(userFake2, targetUser);
            }
        };

        sinon.spy(emitterFake, 'message');

        controller.emitter = emitterFake;
        controller.login(socketFake, userFake2, function () {});
        controller.sendMessage(socketFake, messageDTO, function () {
            assert(emitterFake.message.calledOnce);
            done();
        });
    });

    test('should get the users', function () {
        var controller = require('./../server/controller');

        var userFake1 = {
            id: 1,
            name: 'Jeferson Viana Perito'
        };
        var userFake2 = {
            id: 2,
            name: 'Anderson Silva'
        };

        controller.getUsers({}, function (error, users) {
            assert.ifError(error);
            assert.deepEqual(userFake1, users[1]);
            assert.deepEqual(userFake2, users[2]);
        });
    });
});