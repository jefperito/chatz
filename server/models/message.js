function Message(messageDTO) {
	if (messageDTO) {
		var validator = require('./../validator');
		validator.message(messageDTO);

		this.target = messageDTO.target;
		this.sender = messageDTO.sender;
		this.body = messageDTO.body;
	}
}

Message.prototype.setTarget = function(target) {
	this.target = target;
};

Message.prototype.setSender = function(sender) {
	this.sender = sender;
};

Message.prototype.setBody = function(body) {
	this.body = body;
};

Message.prototype.getTarget = function() {
	return this.target;
};

Message.prototype.getSender = function() {
	return this.sender;
};

Message.prototype.getBody = function() {
	return this.body;
};

module.exports = Message;
