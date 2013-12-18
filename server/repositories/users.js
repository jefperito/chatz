
var users = (function() {
	'use strict';

	var _usersList = [];

	function getList() {
		return _usersList;
	}

	function setList(usersList) {
		_usersList = usersList;
	}

	function add(user) {
		_usersList.push(user);
	}

	function remove(user) {
		for (var index in _usersList) {
			var userInList = _usersList[index];

			if (userInList.getId() == user.getId()) {
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
