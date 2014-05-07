var assert = require('assert');

suite('users', function() {
    var users = require('./../server/repositories/users');
    var User = require('./../server/models/user');

    setup(function() {
        users.setMap({});
    });

    suite('list', function() {
        test('should to have empty list', function() {
            assert.deepEqual({}, users.getMap());
        });

        test('should permits add a user to the list', function() {
            var user = new User();

            user.setId(1);
            user.setName('Jeferson Viana Perito');

            users.add(user);

            assert.equal(1, Object.keys(users.getMap()).length);
            assert.equal(1, user.getId());
        });

        test('should permits remove an user from the list', function() {
            var user = new User({
                id: 1,
                name: 'Jeferson Viana Perito'
            });

            users.add(user);
            users.remove(user);

            assert.equal(0, users.getOnlineDTO().length);
        });

        test('should permits update an user from the list', function() {
            var user = new User();

            user.setId(1);
            user.setName('Martin Lutherking');
            users.add(user);

            user.setName('Martin Fowler');
            assert.deepEqual(user, users.getByKey(1));
        });

        test('should permits convert map to DTOusers', function() {
            var user1Data = {
                id: 1,
                name: 'Jeferson Viana Perito'
            };
            var user2Data = {
                id: 2,
                name: 'Mahatma Gandhi'
            };

            var user1 = new User(user1Data);
            var user2 = new User(user2Data);
            users.add(user1);
            users.add(user2);

            assert.deepEqual([{
                id: 0,
                name: 'Jeferson Viana Perito'
            }, {
                id: 1,
                name: 'Mahatma Gandhi'
            }], users.getOnlineDTO());
        });
    });
});