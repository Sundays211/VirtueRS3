/**
 * @author Greco
 * @since 01/04/2017
 */
/* globals EventType */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var makex = require('shared/makex');
var dialog = require('shared/dialog');
var widget = require('shared/widget');
var config = require('engine/config');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 1625, function (ctx) {
			selectGem(ctx.player, 6983, 1609);//Opal
		});

		scriptManager.bind(EventType.OPHELD1, 1627, function (ctx) {
			selectGem(ctx.player, 6983, 1611);//Jade
		});

		scriptManager.bind(EventType.OPHELD1, 1629, function (ctx) {
			selectGem(ctx.player, 6983, 1613);//Red topaz
		});

		scriptManager.bind(EventType.OPHELD1, 1623, function (ctx) {
			selectGem(ctx.player, 6983, 1607);//Sapphire
		});

		scriptManager.bind(EventType.OPHELD1, 1621, function (ctx) {
			selectGem(ctx.player, 6983, 1605);//Emerald
		});

		scriptManager.bind(EventType.OPHELD1, 1619, function (ctx) {
			selectGem(ctx.player, 6983, 1603);//Ruby
		});

		scriptManager.bind(EventType.OPHELD1, 1617, function (ctx) {
			selectGem(ctx.player, 6983, 1601);//Diamond
		});

		scriptManager.bind(EventType.OPHELD1, 1631, function (ctx) {
			selectGem(ctx.player, 6983, 1615);//Dragonstone
		});

		scriptManager.bind(EventType.OPHELD1, 1631, function (ctx) {
			selectGem(ctx.player, 6983, 1615);//Dragonstone
		});

		scriptManager.bind(EventType.OPHELD1, 6571, function (ctx) {
			selectGem(ctx.player, 6983, 6573);//Onyx
		});

		scriptManager.bind(EventType.OPHELD1, 31853, function (ctx) {
			selectGem(ctx.player, 6983, 31855);//Hydrix
		});

		scriptManager.bind(EventType.OPHELD2, 2859, function (ctx) {
			selectGem(ctx.player, 6961, 2861);//Wolf bone arrowheads
		});

		scriptManager.bind(EventType.OPHELD1, 1609, function (ctx) {
			selectGem(ctx.player, 6961, 45);//Opal bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 1611, function (ctx) {
			selectGem(ctx.player, 6961, 9187);//Jade bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 411, function (ctx) {
			selectGem(ctx.player, 6961, 46);//Pearl bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 413, function (ctx) {
			selectGem(ctx.player, 6961, 25480);//Pearl bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 1613, function (ctx) {
			selectGem(ctx.player, 6961, 9188);//Topaz bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 1607, function (ctx) {
			selectGem(ctx.player, 6961, 9189);//Sapphire bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 1605, function (ctx) {
			selectGem(ctx.player, 6961, 9190);//Emerald bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 1603, function (ctx) {
			selectGem(ctx.player, 6961, 9191);//Ruby bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 1601, function (ctx) {
			selectGem(ctx.player, 6961, 9192);//Diamond bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 1615, function (ctx) {
			selectGem(ctx.player, 6961, 9193);//Dragon bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 6573, function (ctx) {
			selectGem(ctx.player, 6961, 9194);//Onyx bolt tips
		});

		scriptManager.bind(EventType.OPHELD1, 31855, function (ctx) {
			selectGem(ctx.player, 6961, 31867);//Hydrix bolt tips
		});
	}

	function selectGem (player, category, productId) {
		makex.selectProduct(player, 6981, 6982, category, productId);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var selectedCategory = varp(player, 1169);
			var selectedProduct = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				switch (selectedCategory) {
					case 6983:
						cutGem(player, selectedProduct, amount);
						return;
					case 6961:
						makeTips(player, selectedProduct, amount);
						return;
					default:
						throw "Unsupported category: "+selectedCategory;
				}
			}
		});
	}

	function cutGem (player, gemId, amount) {
		varp(player, 1175, gemId);
		var animId = getAnimId(gemId);
		var text = "You cut the "+config.objName(config.objParam(gemId, 2655));
		makex.startCrafting(player, amount, animId, text);
	}


	function makeTips (player, tipId, amount) {
		varp(player, 1175, tipId);
		var animId = getAnimId(config.objParam(tipId, 2655));
		var text = "You cut the "+config.objName(tipId);
		makex.startCrafting(player, amount, animId, text);
	}

	function getAnimId (gemId) {
		switch (gemId) {
			case 1607://Sapphire
				return 22774;
			case 1605://Emerald
				return 22775;
			case 1603://Ruby
				return 22776;
			case 1601://Diamond
				return 22777;
			case 1609://Opal
				return 22778;
			case 1611://Jade
				return 22779;
			case 1613://Red topaz
				return 22780;
			case 1615://Dragonstone
				return 22781;
			case 6573://Onyx
				return 22782;
			case 31855://Hydrix
				return 24309;
			default:
				return 22784;
		}
	}
})();
