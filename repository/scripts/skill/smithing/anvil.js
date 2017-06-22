/**
 * @author Greco
 * @since 12/23/2016
 */
/* globals EventType */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var dialog = require('dialog');
var widget = require('widget');
var config = require('engine/config');

var makex = require('../makex');

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
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				//TODO: Use correct message
				var text = "You smith the "+config.objName(productId);
				makex.startCrafting(player, amount, 22143, text);
			}
		});
	}
})();
