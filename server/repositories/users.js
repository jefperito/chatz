var users = (function() {
    'use strict';

    var usersMap = {};

    function getMap() {
        return usersMap;
    }

    function setMap(map) {
        usersMap = map;
    }

    function getByIndex(index) {
        var keys = Object.keys(usersMap);
        return usersMap[keys[index]];
    }

    function getByKey(key) {
        return usersMap[key];
    }

    function add(user) {
        user.setPublicID(Object.keys(usersMap).length);
        usersMap[user.getId()] = user;
    }

    function remove(user) {
        usersMap[user.getId()].toggleOnline();
    }

    function getOnlineDTO() {
        var usersDTO = [];
        var keys = Object.keys(usersMap);

        keys.forEach(function(key) {
            if (usersMap[key].isOnline()) {
                usersDTO.push(usersMap[key].toDTO());
            }
        });

        return usersDTO;
    }

    return {
        getMap: getMap,
        setMap: setMap,
        add: add,
        getByIndex: getByIndex,
        getByKey: getByKey,
        remove: remove,
        getOnlineDTO: getOnlineDTO
    };
})();

module.exports = users;