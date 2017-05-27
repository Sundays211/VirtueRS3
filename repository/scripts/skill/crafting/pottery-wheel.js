/**
 * @author Greco
 * @since 01/06/2017
 */
/* globals EventType */
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../core/widget');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 66848 ], function (ctx) {
			selectPotteryWheelProduct(ctx.player);
		});
	}
	
	function selectPotteryWheelProduct (player) {
		makex.selectProduct(player, 7004, 7005, 7014);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				//TODO: Check message
				var text = "You make an item.";
				makex.startCrafting(player, amount, 883, text);
			}
		});
	}
})();