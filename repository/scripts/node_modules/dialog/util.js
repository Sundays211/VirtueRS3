/**
 * 
 */
var util = require('../util');
var input = require('./input');
var chat = require('../chat');
var entityMap = require('../map/entity');

module.exports = (function () {
	return {
		requestPlayer : requestPlayer
	};
	
	function requestPlayer (player, message, onSuccess) {
		input.requestName(player, message).then(function (name) {
			var hash = util.getUserHash(name);
			if (hash) {
				var targetPlayer = entityMap.getPlayer(hash);
				if (targetPlayer) {
					onSuccess(targetPlayer);
				} else {
					chat.sendMessage(player, name+" is not currently in the game world.");
				}
			} else {
				chat.sendMessage(player, name+" is not registered on this server.");
			}
		});
	}
})();