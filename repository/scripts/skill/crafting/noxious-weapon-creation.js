/**
 * @author Greco
 * @since 06/12/2018
 */

var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var makex = require('../makex');
var dialog = require('dialog');
var widget = require('widget');

var SPIDER_LEG_TOP = 31718;
var SPIDER_LEG_MIDDLE = 31719;
var SPIDER_LEG_BOTTOM = 31720;
var SPIDER_LEG = 31721;
var ARAXXIS_FANG = 31722;
var ARAXXIS_EYE = 31723;
var ARAXXIS_WEB = 31724;
var NOXIOUS_SCYTHE = 31725;
var NOXIOUS_STAFF = 31729;
var NOXIOUS_LONGBOW = 31733;

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
	/*	scriptManager.bind(EventType.OPHELD1, [ 31718, 31719, 31720, 31722, 31723, 31724 ], function (ctx) {
			selectNoxiousWeaponProduct(cxt.player);
		});*/
		
		scriptManager.bind(EventType.OPHELD1, 31718, function (ctx) {
			selectNoxiousWeaponProduct(cxt.player);
		});
		scriptManager.bind(EventType.OPHELD1, 31719, function (ctx) {
			selectNoxiousWeaponProduct(cxt.player);
		});
		scriptManager.bind(EventType.OPHELD1, 31720, function (ctx) {
			selectNoxiousWeaponProduct(cxt.player);
		});
		scriptManager.bind(EventType.OPHELD1, 31722, function (ctx) {
			selectNoxiousWeaponProduct(cxt.player);
		});
		scriptManager.bind(EventType.OPHELD1, 31723, function (ctx) {
			selectNoxiousWeaponProduct(cxt.player);
		});
		scriptManager.bind(EventType.OPHELD1, 31724, function (ctx) {
			selectNoxiousWeaponProduct(cxt.player);
		});
	}
	
	function selectNoxiousWeaponProduct (player) {
		makex.selectProduct(player, -1, -1, 9056, -1, "Noxious");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				var text = "You create a noxious item.";
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