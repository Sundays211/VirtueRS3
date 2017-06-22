/**
 * Common functionality for herblore
 */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var dialog = require('dialog');
var widget = require('widget');
var makex = require('../makex');

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
			var selectedCategory = varp(player, 1169).toString();
			var selectedProduct = varp(player, 1170);
			var amount = varbit(player, 1003);
			invokeProcessHandler(player, selectedCategory, selectedProduct, amount);
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