var rooms = (function() {
    var Room = require('./../models/room');
    var roomsMap = {};

    function getByMessage(message) {
        var key = [message.getSenderId(), message.getTargetId()].sort().join('_');
        var room = roomsMap[key];

        if (!room) {
            roomsMap[key] = new Room(key, message.getSenderId(), message.getTargetId());
        }

        return roomsMap[key];
    }

    return {
        getByMessage: getByMessage
    };
})();

module.exports = rooms;