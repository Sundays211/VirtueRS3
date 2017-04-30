/* globals EventType, Inv, ENGINE */
var widget = require('../core/widget');

/**
 * Aubury - Varrock Rune Shop
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.OPNPC4, 5913, function (ctx) {
		ENGINE.setVarp(ctx.player, 304, Inv.AUBURYS_RUNE_SHOP);
		ENGINE.setVarp(ctx.player, 305, Inv.AUBURYS_FREE_STOCK);
		ENGINE.setVarc(ctx.player, 2360, "Aubury's Rune Shop");
		widget.openCentral(ctx.player, 1265);
	});
};