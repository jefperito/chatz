
var logger = (function() {
	'use strict';

	var _facadeLogger;

	function message(msg) {

	}

	function setFacadeLogger(facadeLogger) {
		_facadeLogger = facadeLogger;
	}

	return {
		message: message,
		setFacadeLogger: setFacadeLogger
	};
})();

module.exports = logger;