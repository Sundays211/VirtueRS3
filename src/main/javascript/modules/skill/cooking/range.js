/**
 * @author Greco
 * @since 01/07/2017
 */
/* globals EventType */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var dialog = require('shared/dialog');
var widget = require('shared/widget');
var config = require('engine/config');

var makex = require('../makex');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1,
				[ 114, 5275, 24283, 34546, 61333, 63209, 66892, 76295, 94064 ], function (ctx) {
			startCooking(ctx.player);
		});
	}

	function startCooking (player) {
		makex.selectProduct(player, 6794, 6795, 6797);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				var text = "You cook the "+config.objName(productId);
				makex.startCrafting(player, amount, 25650, text);
			}
		});
	}
})();
