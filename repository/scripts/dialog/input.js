/**
 * 
 */
var common = require('./common');
var builder = require('./builder');

module.exports = (function () {
	return {
		requestCount : requestCount,
		requestName : requestName,
		requestString : requestString,
		requestItem : requestItem
	};

	function requestCount (player, message) {
		return builder(player).requestCount(message);
	}

	function requestName (player, message) {
		return builder(player).requestName(message);
	}

	function requestString (player, message) {
		return builder(player).requestString(message);
	}

	function requestItem (player, message) {
		return builder(player).requestItem(message);
	}
})();