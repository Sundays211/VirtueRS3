/**
 * @author Greco
 * @since 03/01/2017
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
		scriptManager.bind(EventType.OPLOC1, [ 66849 ], function (ctx) {
			selectLoomProduct(ctx.player);
		});
		
		scriptManager.bind(EventType.OPLOC2, [ 85047 ], function (ctx) {
			selectLoomProduct(ctx.player);
		});
	}
	
	function selectLoomProduct (player) {
		makex.selectProduct(player, 7042, 7043, 7044);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = ENGINE.getVarp(player, 1170);
			var amount = ENGINE.getVarBit(player, 1003);
			if (amount) {
				ENGINE.setVarp(player, 1175, productId);
				//TODO: Check message
				var text = "You weave the materials together.";
				makex.startCrafting(player, amount, 2270, text);
			}
		});
	}
})();