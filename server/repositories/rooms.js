var rooms = (function() {
    'use strict';

    var Room = require('./../models/room');
    var config = require('./../config');
    var roomsMap = {};

    function getByMessage(message) {
        var bar = [message.getSender().id, message.getTarget().id].sort().join('_');
        var key = require('crypto').createHash('sha512').update(bar + config.TOKEN).digest('hex');
        var room = roomsMap[key];

        if (!room) {
            roomsMap[key] = new Room(key);
        }

        return roomsMap[key];
    }

    function get(id) {
        return roomsMap[id];
    }

    function createDefault() {
        roomsMap['1'] = new Room('1');
    }

    return {
        get: get,
        getByMessage: getByMessage,
        createDefault: createDefault
    };
})();

module.exports = rooms;