/**
 * Common functionality for herblore
 */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var dialog = require('shared/dialog');
var widget = require('shared/widget');
var makex = require('../makex');

module.exports = (function () {
	var _handlers = {};

	return {
		registerProcessHandler : registerProcessHandler,
		startStringing : startStringing,
		startFeathering : startFeathering,
		setSelectionHandler : setSelectionHandler
	};

	function startStringing (player, category, productId) {
		makex.selectProduct(player, 6941, 6942, category, productId);
		setSelectionHandler(player);
	}

	function startFeathering(player, category, productId) {
		makex.selectProduct(player, 6943, 6944, category, productId);
		setSelectionHandler(player);
	}

	function setSelectionHandler (player) {
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var category = varp(player, 1169).toString();
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
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
		if (typeof(_handlers[category]) !== "undefined") {
			throw "Handler "+category+" is already registered!";
		} else {
			_handlers[category] = handler;
		}
	}
})();
