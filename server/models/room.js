function Room(id) {
    this.id = id;
    this.messages = [];
}

Room.prototype.addMessage = function(message) {
    this.messages.push(message);
};

Room.prototype.getMessages = function() {
    return this.messages;
};

Room.prototype.getId = function() {
    return this.id;
};

Room.prototype.toDTO = function() {
    return {
        id: this.id,
        messages: this.messages
    };
};

module.exports = Room;