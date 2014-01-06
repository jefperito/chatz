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
		if (user.isNew()) {
			var id = Object.keys(usersMap).length + 1;
			user.setId(id);
		}

		usersMap[user.getId()] = user;
	}

	function remove(user) {
		delete usersMap[user.getId()];
	}

	function toDTO() {
		var usersDTOList = [];
		var keys = Object.keys(usersMap);

		keys.forEach(function(key) {
			usersDTOList.push(usersMap[key].toDTO());
		});

		return usersDTOList;
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
