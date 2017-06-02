/**
 * @author Greco
 * @since 01/07/2017
 */
/* globals EventType */
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../widget');
var config = require('../../core/config');

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