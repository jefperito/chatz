var rooms = (function() {
    var Room = require('./../models/room');
    var config = require('./../config');
    var roomsMap = {};

    function getByMessage(message) {
        var bar = [message.getSender().id, message.getTarget().id].sort().join('_');
        var key = require('crypto').createHash('sha512').update(bar + config.TOKEN).digest('hex');
        var room = roomsMap[key];

        if (!room) {
            roomsMap[key] = new Room(key, message.getSender().id, message.getTarget().id);
        }

        return roomsMap[key];
    }

    function get(id) {
        return roomsMap[id];
    }

    return {
        get: get,
        getByMessage: getByMessage
    };
})();

module.exports = rooms;