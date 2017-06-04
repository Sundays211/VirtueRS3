/**
 * 
 */
var common = require('./common');
var builder = require('./builder');

module.exports = (function () {
	return {
		chatplayer : chatplayer,
		chatnpc : chatnpc,
		mesbox : mesbox,
		objbox : objbox
	};

	function chatplayer (player, message) {
		return builder(player).chatplayer(message);
	}

	function chatnpc (player, npc, message) {
		return builder(player).chatnpc(npc, message);
	}

	function mesbox (player, message) {
		return builder(player).mesbox(message);
	}

	function objbox (player, obj, message) {
		return builder(player).objbox(obj, message);
	}
})();