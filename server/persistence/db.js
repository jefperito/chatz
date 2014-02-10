var db = (function() {
	'use strict';

	var connection;

	function init() {
		establishesConnection();
	}

	function establishesConnection() {}

	return {
		init: init
	};
})();

module.exports = db;
