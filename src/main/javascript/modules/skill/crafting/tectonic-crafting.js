/**
 * @author Greco
 * @since 06/12/2018
 */

var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var makex = require('../makex');
var dialog = require('shared/dialog');
var widget = require('shared/widget');

var TECTONIC_ENERGY = 28627;
var STONE_OF_BINDING = 28628;
var TECTONIC_MASK = 28608;
var TECTONIC_ROBE_TOP = 28611;
var TECTONIC_ROBE_BOTTOM = 28614;


module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, TECTONIC_ENERGY, function (ctx) {
			selectTectonicProduct(ctx.player);
		});
	}
	
	function selectTectonicProduct (player) {
		makex.selectProduct(player, -1, -1, 7512, -1, "Tectonic");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				var text = "You create a tectonic item.";
				makex.startCrafting(player, amount, 25594, text);
			}
		});
	}
	
	function createWeapon (player, itemId, amount) {
		varp(player, 1175, itemId);
		var text = "You create a weapon";
		makex.startCrafting(player, amount, 25594, text);
	}
	
})();