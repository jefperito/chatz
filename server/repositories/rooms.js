var rooms = (function() {
    'use strict';

    var Room = require('./../models/room');
    var config = require('./../config');
    var roomsMap = {};

    function get(id) {
        return roomsMap[id];
    }

    function createDefault() {
        roomsMap['1'] = new Room('1');
    }

    return {
        get: get,
        createDefault: createDefault
    };
})();

module.exports = rooms;