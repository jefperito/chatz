var db = (function() {
    'use strict';

    function init() {
        establishesConnection();
    }

    function establishesConnection() {}

    return {
        init: init
    };
})();

module.exports = db;