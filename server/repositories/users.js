var users = (function() {
	'use strict';

	var usersMap = {};

	function getMap() {
		return usersMap;
	}

	function setMap(map) {
		usersMap = map;
	}

	function get(id) {
		return usersMap[id];
	}

	function add(user) {
		usersMap[user.getId()] = user;
	}

	function remove(user) {
		delete usersMap[user.getId()];
	}

	function toDTO() {
		var usersDTO = {};
		var keys = Object.keys(usersMap);

		keys.forEach(function(key) {
			usersDTO[key] = usersMap[key].toDTO();
		});

		return usersDTO;
	}

	return {
		getMap: getMap,
		setMap: setMap,
		add: add,
		get: get,
		remove: remove,
		toDTO: toDTO
	};
})();

module.exports = users;
