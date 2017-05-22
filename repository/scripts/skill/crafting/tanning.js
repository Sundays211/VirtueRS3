/**
 * @author Greco
 * @since 01/07/2017
 */
/* globals EventType, ENGINE */
var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../core/widget');
var anim = require('../../core/anim');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPNPC3, 2824, function (ctx) {
			selectHides(ctx.player);
		});
		
		scriptManager.bind(EventType.OPNPC4, 14877, function (ctx) {
			selectHides(ctx.player);
		});
	}
	
	function selectHides (player) {
		makex.selectProduct(player, -1, -1, 6989, -1, "Tanner");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = ENGINE.getVarp(player, 1170);
			var amount = ENGINE.getVarBit(player, 1003);
			if (amount) {
				tanHides(player, productId, amount);
			}
		});
	}
	
	function tanHides (player, productId, amount) {
		makex.makeItem(player, productId, amount);
	}
})();