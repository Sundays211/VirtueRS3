/**
 * @author Greco
 * @since 01/04/2017
 */
/* globals EventType */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var makex = require('../makex');
var dialog = require('shared/dialog');
var widget = require('shared/widget');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 573, function (ctx) {
			selectBattlestaff(ctx.player, 1397);//Air battlestaff
		});

		scriptManager.bind(EventType.OPHELD1, 571, function (ctx) {
			selectBattlestaff(ctx.player, 1395);//Water battlestaff
		});

		scriptManager.bind(EventType.OPHELD1, 575, function (ctx) {
			selectBattlestaff(ctx.player, 1399);//Earth battlestaff
		});

		scriptManager.bind(EventType.OPHELD1, 569, function (ctx) {
			selectBattlestaff(ctx.player, 1393);//Fire battlestaff
		});

		scriptManager.bind(EventType.OPHELD1, 21775, function (ctx) {
			selectBattlestaff(ctx.player, 21777);//Armadyl battlestaff
		});
	}

	function selectBattlestaff (player, productId) {
		makex.selectProduct(player, -1, -1, 6974, productId, "Battlestaves");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var staffId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				craftBattlestaves(player, staffId, amount);
			}
		});
	}

	function craftBattlestaves (player, staffId, amount) {
		varp(player, 1175, staffId);
		var text, animationId;
		switch (staffId) {
		case 1397:
			text = "You make an Air battlestaff.";
			animationId = 16446;
			break;
		case 1395:
			text = "You make a Water battlestaff.";
			animationId = 16448;
			break;
		case 1399:
			text = "You make an Earth battlestaff.";
			animationId = 16448;
			break;
		case 1393:
			text = "You make a Fire battlestaff.";
			animationId = 16449;
			break;
		case 21777:
			text = "You make an Armadyl battlestaff.";
			animationId = 16450;
			break;
		}
		makex.startCrafting(player, amount, animationId, text);
	}
})();
