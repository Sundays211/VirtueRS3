/**
 * @author Greco
 * @since 01/04/2017
 */
/* globals EventType, ENGINE */
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../core/widget');
var config = require('../../core/config');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 1741, function (ctx) {
			selectProduct(ctx.player, 6991, 25594);//Leather
		});
		
		scriptManager.bind(EventType.OPHELD1, 1743, function (ctx) {
			selectProduct(ctx.player, 6991, 25594);//Hard leather
		});
		
		scriptManager.bind(EventType.OPHELD1, 25545, function (ctx) {
			selectProduct(ctx.player, 7002, 25594);//Imphide
		});
		
		scriptManager.bind(EventType.OPHELD1, 25547, function (ctx) {
			selectProduct(ctx.player, 7001, 25594);//Spider silk
		});
		
		scriptManager.bind(EventType.OPHELD1, 25551, function (ctx) {
			selectProduct(ctx.player, 7003, 25594);//Carapace
		});
		
		scriptManager.bind(EventType.OPHELD1, 25549, function (ctx) {
			selectProduct(ctx.player, 7000, 25594);//Batwing
		});
		
		scriptManager.bind(EventType.OPHELD1, 6289, function (ctx) {
			selectProduct(ctx.player, 6992, 25594);//Snakeskin
		});
		
		scriptManager.bind(EventType.OPHELD1, 1745, function (ctx) {
			selectProduct(ctx.player, 6993, 25594);//Green Dragonhide
		});
		
		scriptManager.bind(EventType.OPHELD1, 2505, function (ctx) {
			selectProduct(ctx.player, 6994, 25594);//Blue Dragonhide
		});
		
		scriptManager.bind(EventType.OPHELD1, 2507, function (ctx) {
			selectProduct(ctx.player, 6995, 25594);//Red Dragonhide
		});
		
		scriptManager.bind(EventType.OPHELD1, 2509, function (ctx) {
			selectProduct(ctx.player, 6996, 25594);//Black Dragonhide
		});
		
		scriptManager.bind(EventType.OPHELD1, 24374, function (ctx) {
			selectProduct(ctx.player, 6997, 25594);//Royal Dragonhide
		});
	}
	
	function selectProduct (player, category, animationId) {
		makex.selectProduct(player, 6987, 6988, category);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				//TODO: Check message
				var text = "You craft the hide into "+config.objName(productId);
				makex.startCrafting(player, amount, animationId, text);
			}
		});
	}
})();