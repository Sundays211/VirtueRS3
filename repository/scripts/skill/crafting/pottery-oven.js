/**
 * @author Greco
 * @since 01/06/2017
 */
/* globals EventType, ENGINE */
var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../core/widget');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 66847 ], function (ctx) {
			selectPotteryWheelProduct(ctx.player);
		});
	}
	
	function selectPotteryWheelProduct (player) {
		makex.selectProduct(player, 7006, 7007, 7015);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = ENGINE.getVarp(player, 1170);
			var amount = ENGINE.getVarBit(player, 1003);
			if (amount) {
				ENGINE.setVarp(player, 1175, productId);
				//TODO: Check message
				var text = "You make an item.";
				makex.startCrafting(player, amount, 24975, text);
			}
		});
	}
})();
