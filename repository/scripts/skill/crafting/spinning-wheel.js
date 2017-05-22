/**
 * @author Greco
 * @since 01/07/2017
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
		scriptManager.bind(EventType.OPLOC2, [ 66850 ], function (ctx) {
			selectSpinningWheelProduct(ctx.player);
		});
	}
	
	function selectSpinningWheelProduct (player) {
		makex.selectProduct(player, -1, -1, 7046, -1, "");//TODO: Find category name
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = ENGINE.getVarp(player, 1170);
			var amount = ENGINE.getVarBit(player, 1003);
			if (amount) {
				ENGINE.setVarp(player, 1175, productId);
				//TODO: Check message
				var text = "You spin the item.";
				makex.startCrafting(player, amount, 1563, text);
			}
		});
	}
})();