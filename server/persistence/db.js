var db = (function() {
	'use strict';

	var rethinkDB = require('rethinkdb');
	
	var connection;

	function init() {
		establishesConnection();
	}

	function establishesConnection() {
		rethinkDB.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
			if(err) throw err;

			rethinkDB.db('test').tableCreate('tv_shows').run(conn, function(err, res) {
				if(err) throw err;
				
				console.log(res);
				rethinkDB.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res) {
				    if(err) throw err;
				    console.log(res);
				});
			});
		});
	}

	return {
		init: init
	};
})();

module.exports = db;
