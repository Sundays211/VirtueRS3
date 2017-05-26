/* globals EventType, Inv, ENGINE */
var varp = require('../core/var/player');
var varc = require('../core/var/client');
var widget = require('../core/widget');

/**
 * Aubury - Varrock Rune Shop
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.OPNPC4, 5913, function (ctx) {
		varp(ctx.player, 304, Inv.AUBURYS_RUNE_SHOP);
		varp(ctx.player, 305, Inv.AUBURYS_FREE_STOCK);
		varc(ctx.player, 2360, "Aubury's Rune Shop");
		widget.openCentral(ctx.player, 1265);
	});
};