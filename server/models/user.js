function User(userDTO) {
	if (userDTO) {
		var validator = require('./../validator');
		validator.user(userDTO);

		this.name = userDTO.name;
		this.id   = userDTO.id;
	}

	this.sockets = [];
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
};

User.prototype.getSockets = function() {
	return this.sockets;
}

User.prototype.getId = function() {
	if (this.hasOwnProperty('id')) {
		return this.id;
	}
};

module.exports = User;