var cache = (function() {
    'use strict';

    var redis = require('redis');
    var client = redis.createClient();

    function setUser(users, callback) {
        client.set('chatz:users', function(error, result) {
            if (error) {
                console.log('Redis: Nao foi possivel fixar os usuarios');
            }

            callback(error, result);
        });
    }

    function getUsers(callback) {
        client.get('chatz:users', function(error, result) {
            if (error) {
                console.error('Redis: Nao foi possivel obter os usuarios');
            }

            callback(error, result);
        });
    }

    return {
        getUsers: getUsers,
        setUser: setUser
    };
})();

module.exports = cache;