/**
 * @author Greco
 * @since 12/23/2016
 */
/* globals EventType */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var dialog = require('shared/dialog');
var widget = require('shared/widget');
var config = require('engine/config');
var quest = require('../../quest');
var makex = require('shared/makex');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 2783, 12692, 67468 ], function (ctx) {
			startSmithing(ctx.player);
		});
		//find out when you can use them
		//26822 coords 0 39 52 2 3
		//49036 coords 0 41 53 16 27
		//4306 coords 0 40 57 59 17
		scriptManager.bind(EventType.OPLOC1, 78040, function (ctx) {//Doric's anvil
		    if(quest.hasFinished(ctx.player, 207)) {
			    startSmithing(ctx.player);
			} else {
			    dialog.builder(ctx.player).mesbox("You can't use the anvil until you finish helping Doric.");
			}
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
