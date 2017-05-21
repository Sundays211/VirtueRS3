/**
 * Common functionality for herblore
 */
/* globals ENGINE */
var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../core/widget');

module.exports = (function () {
	var _handlers = {};
	
	return {
		registerProcessHandler : registerProcessHandler,
		startHerblore : startHerblore
	};
	
	function startHerblore (player, category, productId) {
		makex.selectProduct(player, 6838, 6839, category, productId);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var category = ENGINE.getVarp(player, 1169).toString();
			var productId = ENGINE.getVarp(player, 1170);
			var amount = ENGINE.getVarBit(player, 1003);
			invokeProcessHandler(player, category, productId, amount);
		});
	}
	
	function invokeProcessHandler (player, category, productId, amount) {
		if (amount) {
			if (typeof(_handlers[category]) !== "undefined") {
				_handlers[category](player, productId, amount);
			} else {
				throw "Handler not registered for category "+category;
			}
		}
	}
	
	function registerProcessHandler (category, handler) {
		_handlers[category] = handler;
	}
})();