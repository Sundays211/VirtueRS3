/**
 * @author Greco
 * @since 06/12/2018
 */

var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var makex = require('../makex');
var dialog = require('dialog');
var widget = require('widget');

var SIRENIC_MASK = 29854;
var SIRENIC_HAUBERK = 29857;
var SIRENIC_CHAPS = 29860;
var SIRENIC_SCALE = 29863;
var ALGARUM_THREAD = 29864;

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, SIRENIC_SCALE, function (ctx) {
			selectSirenicProduct(cxt.player);
		});
	}
	
	function selectSirenicProduct (player) {
		makex.selectProduct(player, -1, -1, 8002, -1, "Sirenic");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				var text = "You create a sirenic item.";
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