function User(userDTO) {
    if (userDTO) {
        var validator = require('./../validator');
        validator.user(userDTO);

        this.name = userDTO.name;
        this.id = userDTO.id;
    }

    this.sockets = [];
    this.rooms = [];
}

User.prototype.setName = function(name) {
    this.name = name;
};

User.prototype.setId = function(id) {
    this.id = id;
};

User.prototype.getName = function() {
    if (this.hasOwnProperty('name')) {
        return this.name;
    }
};

User.prototype.addSocket = function(socket) {
    this.sockets.push(socket);
    this.rooms.forEach(function(room) {
        socket.join(room);
    });
};

User.prototype.removeSocket = function(socket) {
    this.sockets = this.sockets.filter(function(_socket) {
        return socket.id !== _socket.id;
    });
};

User.prototype.getSockets = function() {
    return this.sockets;
};

User.prototype.getId = function() {
    if (this.hasOwnProperty('id')) {
        return this.id;
    }
};

User.prototype.toDTO = function() {
    return {
        id: this.id,
        name: this.name
    };
};

User.prototype.addRoom = function(room) {
    this.sockets.forEach(function(socket) {
        socket.join(room);
    });

    this.rooms.push(room);
};

User.prototype.getRooms = function() {
    return this.rooms;
};

module.exports = User;