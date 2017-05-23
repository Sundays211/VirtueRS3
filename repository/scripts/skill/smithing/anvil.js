/**
 * @author Greco
 * @since 12/23/2016
 */
/* globals EventType, ENGINE */
var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../core/widget');
var config = require('../../core/config');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 2783, 12692, 67468 ], function (ctx) {
			startSmithing(ctx.player);
		});
	}
	
	function startSmithing (player) {
		makex.selectProduct(player, 7081, 7082, 7085);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = ENGINE.getVarp(player, 1170);
			var amount = ENGINE.getVarBit(player, 1003);
			if (amount) {
				ENGINE.setVarp(player, 1175, productId);
				//TODO: Use correct message
				var text = "You smith the "+config.objName(productId);
				makex.startCrafting(player, amount, 22143, text);
			}
		});
	}
})();