function Room(id, sender_id, target_id) {
    // Mudar sender e target para uma lista de participantes
    this.id = id;
    this.sender_id = sender_id;
    this.target_id = target_id;
    this.messages = [];
    this.new = true;
}

Room.prototype.addMessage = function(message) { this.messages.push(message); };

Room.prototype.getMessages = function() { return this.messages; };

Room.prototype.getId = function() { return this.id; };

Room.prototype.isNew = function() { return this.new; };

Room.prototype.ok = function() { this.new = false; };

Room.prototype.toDTO = function() {
    return {
        id: this.id,
        messages: this.messages
    };
};

module.exports = Room;