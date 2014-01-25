var db = (function() {
	'use strict';
	
	var mongoose = require('mongoose');

	var collections = {};
	var connection;

	function init() {
		establishesConnection();
	}

	function establishesConnection() {
		connection = mongoose.connection;
		connection.on('error', console.error);
		connection.once('open', createSchema);

		mongoose.connect('mongodb://localhost/chatz');
	}

	function createSchema() {
		var messageSchema = new mongoose.Schema({
		  body: { type: String },
		  target_id: String,
		  sender_id: Number,
		  date: {type: Date, default: Date.now}
		});

		collections['messages'] = mongoose.model('Movie', messageSchema);
	}

	return {
		init: init
	};
})();

module.exports = db;
