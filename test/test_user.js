var assert = require('assert');

suite('user', function() {
    var User = require('./../server/models/user');

    suite('attributes', function() {
        test('should set attributes when the User is initialized', function() {
            var user = new User({
                id: 1,
                name: 'Jeferson Viana Perito'
            });

            assert.equal('Jeferson Viana Perito', user.getName());
            assert.equal(1, user.getId());
        });

        test('should get undefined attributes from empty User', function() {
            var user = new User();

            assert.equal(undefined, user.getId());
            assert.equal(undefined, user.getName());
        });

        test('should hold attributes when set them', function() {
            var user = new User();

            user.setId(2);
            user.setName('Liu Kang');

            assert.equal(2, user.getId());
            assert.equal('Liu Kang', user.getName());
        });

        test('should set sockets on user object', function() {
            var user = new User({
                id: 1,
                name: 'Jeferson Viana Perito'
            });

            var socketDummy = {
                emit: function() {},
                on: function() {}
            };

            user.addSocket(socketDummy);

            assert.equal(1, user.getSockets().length);
            assert.deepEqual([socketDummy], user.getSockets());
        });

        test('should get the DTO from an user object', function() {
            var userData = {
                id: 1,
                name: 'Jeferson Viana Perito'
            };

            var user = new User(userData);
            user.setPublicID(1);

            assert.deepEqual(userData, user.toDTO());
        });

        test('should add one room to the user', function() {
            var userData = {
                id: 1,
                name: 'Jeferson Viana Perito'
            };
            var roomFake = {};
            var user = new User(userData);
            user.addRoom('123456');

            assert.deepEqual([
                '123456'
            ], user.getRooms());
        });
    });
});