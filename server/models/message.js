function Message(messageDTO) {
	if (messageDTO) {
		var validator = require('./../validator');
		validator.message(messageDTO);

		this.target_id = messageDTO.target_id;
		this.sender_id = messageDTO.sender_id;
		this.body      = messageDTO.body;
	}
}

Message.prototype.setTargetId = function(target_id) {
	this.target_id = target_id;
};

Message.prototype.setSenderId = function(sender_id) {
	this.sender_id = sender_id;
};

Message.prototype.setBody = function(body) {
	this.body = body;
};

Message.prototype.getTargetId = function() {
	return this.target_id;
};

Message.prototype.getSenderId = function() {
	return this.sender_id;
};

Message.prototype.getBody = function() {
	return this.body;
};

module.exports = Message;
