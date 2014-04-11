var rooms = (function() {
    var Room = require('./../models/room');
    var roomsMap = {};

    function getByMessage(message) {
        // TODO precisa de uma magica aqui (hash)
        var key = [message.getSender().id, message.getTarget().id].sort().join('_');
        var room = roomsMap[key];

        if (!room) {
            roomsMap[key] = new Room(key, message.getSender().id, message.getTarget().id);
        }

        return roomsMap[key];
    }

    return {
        getByMessage: getByMessage
    };
})();

module.exports = rooms;