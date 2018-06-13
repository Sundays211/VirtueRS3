/**
 * @author Greco
 * @since 06/12/2018
 */

var varp = require('engine/var/player');

var config = require('engine/config');

var makex = require('../makex');
var common = require('./common.js');
var HERBLORE_INGREDIENTS = 6834;
var COOKING_INGREDIENTS = 6835;
var SALAMANDER = 6837;
var OTHER_GRINDING = 6836;

module.exports = (function () {
	return {
		init : init
		grind_cooking_igredients : grind_cooking_igredients
		grind_other : grind_other
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 237, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 235);//Unicorn Horn
		});
		
		scriptManager.bind(EventType.OPHELD1, 243, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 241);//Blue Dragon Scale
		});
		
		scriptManager.bind(EventType.OPHELD1, 5075, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 6693);//Crushed Birds Nest
		});
		
		scriptManager.bind(EventType.OPHELD1, 10109, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 10111);//Kebbit Teeth
		});
		
		scriptManager.bind(EventType.OPHELD1, 9735, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 9736);//Desert Goat Horn
		});
		
		scriptManager.bind(EventType.OPHELD1, 4698, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 9594);//Ground Mud Rune
		});
		
		scriptManager.bind(EventType.OPHELD1, 321, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 11266);//Anchovy Paste
		});
		
		scriptManager.bind(EventType.OPHELD1, 9016, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 9018);//Gorak Claw Powder
		});
		
		scriptManager.bind(EventType.OPHELD1, 9016, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 9018);//Gorak Claw Powder
		});
		
		scriptManager.bind(EventType.OPHELD1, 35271, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 35724);//Small Crystal Urchin -> Harmony Dust 
		});
		
		scriptManager.bind(EventType.OPHELD1, 35272, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 35725);//Medium Crystal Urchin -> Harmony Dust 
		});
		
		scriptManager.bind(EventType.OPHELD1, 35273, function (ctx) {
			common.startHerblore(ctx.player, HERBLORE_INGREDIENTS, 35726);//Large Crystal Urchin -> Harmony Dust 
		});
		
		common.registerProcessHandler(HERBLORE_INGREDIENTS, grindItems);
	}
	
	function grind_cooking_igredients (scriptManager) {
		scriptManager.bind(EventType.OPHELD2, 1973, function (ctx) {
			common.startHerblore(ctx.player, COOKING_INGREDIENTS, 1975);//Chocolate Bar
		});
		scriptManager.bind(EventType.OPHELD2, 249, function (ctx) {
			common.startHerblore(ctx.player, COOKING_INGREDIENTS, 6681);//Ground Guam
		});
		scriptManager.bind(EventType.OPHELD2, 401, function (ctx) {
			common.startHerblore(ctx.player, COOKING_INGREDIENTS, 6683);//Ground Seaweed
		});
		scriptManager.bind(EventType.OPHELD2, 7518, function (ctx) {
			common.startHerblore(ctx.player, COOKING_INGREDIENTS, 7527);//Ground Crab Meat
		});
		scriptManager.bind(EventType.OPHELD2, 339, function (ctx) {
			common.startHerblore(ctx.player, COOKING_INGREDIENTS, 7528);//Ground Cod
		});
		scriptManager.bind(EventType.OPHELD2, 7516, function (ctx) {
			common.startHerblore(ctx.player, COOKING_INGREDIENTS, 7517);//Ground Kelp
		});
		scriptManager.bind(EventType.OPHELD2, 2309, function (ctx) {
			common.startHerblore(ctx.player, COOKING_INGREDIENTS, 7515);//Ground Breadcrumbs
		});
		
		common.registerProcessHandler(COOKING_INGREDIENTS, grindItems);
	}
	
	function grind_other (scriptManager) {
		scriptManager.bind(EventType.OPHELD2, 592, function (ctx) {
			common.startHerblore(ctx.player, OTHER_GRINDING, 8865);//Ground Ashes
		});
		scriptManager.bind(EventType.OPHELD1, 9079, function (ctx) {
			common.startHerblore(ctx.player, OTHER_GRINDING, 9082);//Ground Tooth
		});
		scriptManager.bind(EventType.OPHELD2, 21773, function (ctx) {
			common.startHerblore(ctx.player, OTHER_GRINDING, 21774);//Dust of Armadyl
		});
		
		common.registerProcessHandler(OTHER_GRINDING, grindItems);
	}
	
	function grindItems (player, groundItemId, amount) {
		varp(player, 1175, groundItemId);
		var text = "You make an item";
		makex.startCrafting(player, amount, 22756, text);
	}
})();