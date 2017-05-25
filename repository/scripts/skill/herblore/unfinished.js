/**
 * @author Greco
 * @since 12/20/2016
 */
/* globals EventType, ENGINE */
var makex = require('../makex');
var config = require('../../core/config');
var util = require('../../core/util');
var common = require('./common.js');
var UNFINISHED_POTIONS = 6842;

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELDU, 249, function (ctx) {
			cleanHerbUse(ctx, 91);//Guam
		});
		
		scriptManager.bind(EventType.OPHELDU, 251, function (ctx) {
			cleanHerbUse(ctx, 93);//Marrentill
		});
		
		scriptManager.bind(EventType.OPHELDU, 253, function (ctx) {
			cleanHerbUse(ctx, 95);//Tarromin
		});
		
		scriptManager.bind(EventType.OPHELDU, 255, function (ctx) {
			cleanHerbUse(ctx, 97);//Harralander
		});
		
		scriptManager.bind(EventType.OPHELDU, 257, function (ctx) {
			cleanHerbUse(ctx, 99);//Ranarr
		});
		
		scriptManager.bind(EventType.OPHELDU, 259, function (ctx) {
			cleanHerbUse(ctx, 101);//Irit
		});
		
		scriptManager.bind(EventType.OPHELDU, 261, function (ctx) {
			cleanHerbUse(ctx, 103);//Avantoe
		});
		
		scriptManager.bind(EventType.OPHELDU, 263, function (ctx) {
			cleanHerbUse(ctx, 105);//Kwuarm
		});
		
		scriptManager.bind(EventType.OPHELDU, 265, function (ctx) {
			cleanHerbUse(ctx, 107);//Cadantine
		});
		
		scriptManager.bind(EventType.OPHELDU, 267, function (ctx) {
			cleanHerbUse(ctx, 109);//Dwarf weed
		});
		
		scriptManager.bind(EventType.OPHELDU, 269, function (ctx) {
			cleanHerbUse(ctx, 111);//Torstol
		});
		
		scriptManager.bind(EventType.OPHELDU, 2481, function (ctx) {
			cleanHerbUse(ctx, 2483);//Lantadyme
		});
		
		scriptManager.bind(EventType.OPHELDU, 2998, function (ctx) {
			cleanHerbUse(ctx, 3002);//Toadflax
		});
		
		scriptManager.bind(EventType.OPHELDU, 3000, function (ctx) {
			cleanHerbUse(ctx, 3004);//Snapdragon
		});
		
		scriptManager.bind(EventType.OPHELDU, 12172, function (ctx) {
			cleanHerbUse(ctx, 12181);//Spirit weed
		});
		
		scriptManager.bind(EventType.OPHELDU, 14854, function (ctx) {
			cleanHerbUse(ctx, 14856);//Wergali
		});
		
		scriptManager.bind(EventType.OPHELDU, 21624, function (ctx) {
			cleanHerbUse(ctx, 21628);//Fellstalk
		});
		
		scriptManager.bind(EventType.OPHELDU, 227, function (ctx) {
			//Vial of water
			switch (ctx.useitem) {
			case 249://Guam
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 91);
				return;
			case 251://Marrentill
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 93);
				return;
			case 253://Tarromin
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 95);
				return;
			case 255://Harralander
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 97);
				return;
			case 257://Ranarr
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 99);
				return;
			case 259://Irit
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 101);
				return;
			case 261://Avantoe
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 103);
				return;
			case 263://Kwuarm
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 105);
				return;
			case 265://Cadantine
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 107);
				return;
			case 267://Dwarf weed
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 109);
				return;
			case 269://Torstol
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 111);
				return;
			case 2481://Lantadyme
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 2483);
				return;
			case 2998://Toadflax
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 3002);
				return;
			case 3000://Snapdragon
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 3004);
				return;
			case 12172://Spirit weed
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 12181);
				return;
			case 14854://Wergali
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 14856);
				return;
			case 21624://Fellstalk
				common.startHerblore(ctx.player, UNFINISHED_POTIONS, 21628);
				return;
			default:
				util.defaultHandler(ctx);
				return;
			}
		});
		
		common.registerProcessHandler(UNFINISHED_POTIONS, mixUnfinished);
	}
	
	function cleanHerbUse(ctx, productId) {
		if (ctx.useObjId !== 227) {
			util.defaultHandler(ctx);
		} else {
			common.startHerblore(ctx.player, UNFINISHED_POTIONS, productId);
		}
	}
	
	function mixUnfinished (player, unfinishedId, amount) {
		ENGINE.setVarp(player, 1175, unfinishedId);
		var text = "You mix the "+config.objName(unfinishedId);
		makex.startCrafting(player, amount, 24896, text);
	}
})();