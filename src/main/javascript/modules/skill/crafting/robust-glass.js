/**
 * @author Greco
 * @since 06/12/2018
 */

var varp = require('engine/var/player');
var varbit = require('engine/var/bit');
var map = require('shared/map');
var makex = require('../makex');
var dialog = require('shared/dialog');
var widget = require('shared/widget');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 94067 ], function (ctx) {
			selectRobustGlassProduct(ctx.player, ctx.location);
		});
		
		scriptManager.bind(EventType.OPLOC1, [ 2331,67968 ], function (ctx) {
			selectRobustGlassProduct(ctx.player, ctx.location);
		});
	}
	
	function selectRobustGlassProduct (player, location) {
		makex.selectProduct(player, -1, -1, 6979, -1, "Robust Glass");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				var text = "You make an item.";
				makex.startCrafting(player, amount, 25120, text);
				map.locAnim(location, 25041);
			}
		});
	}
	
	function selectRobustGlassProduct_Two (player) {
		makex.selectProduct(player, -1, -1, 9467, -1, "Robust Glass");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				//TODO: Check message
				var text = "You make an item.";
				makex.startCrafting(player, amount, 25041, text);
			}
		});
	}
	
})();