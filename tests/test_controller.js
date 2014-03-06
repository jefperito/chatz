var assert = require('assert');
var sinon = require('sinon');

suite('controller', function () {
    var controller = require('./../server/controller');

    test('should execute callback passing a new user', function (done) {
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
            done();
        });

        assert(emitterFake.newUser.calledOnce);
    });
});