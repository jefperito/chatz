
var users = (function() {
	'use strict';

	var validator = require('./validator');

	var _usersList = [];

	function getList() {
		return _usersList;
	}

	function setList(usersList) {
		_usersList = usersList;
	}

	function add(user) {
		validator.user(user);
		_usersList.push(user);
	}

	function remove(user) {
		for (var index in _usersList) {
			var userInList = _usersList[index];

			if (userInList.id == user.id) {
				_usersList.splice(index, 1);

				return ;
			}
		}

		throw new TypeError('User not found');
	}

	return {
		getList: getList,
		setList: setList,
		add: add,
		remove: remove
	};
})();

module.exports = users;
