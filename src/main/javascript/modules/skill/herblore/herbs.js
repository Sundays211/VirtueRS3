/**
 * @author Greco
 * @since 12/20/2016
 */
/* globals EventType */
var varp = require('engine/var/player');

var config = require('engine/config');

var makex = require('shared/makex');
var common = require('./common.js');
var CLEAN_HERBS = 6841;

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 199, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 249);//Guam
		});

		scriptManager.bind(EventType.OPHELD1, 201, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 251);//Marrentill
		});

		scriptManager.bind(EventType.OPHELD1, 203, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 253);//Tarromin
		});

		scriptManager.bind(EventType.OPHELD1, 205, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 255);//Harralander
		});

		scriptManager.bind(EventType.OPHELD1, 207, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 257);//Ranarr
		});

		scriptManager.bind(EventType.OPHELD1, 209, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 259);//Irit
		});

		scriptManager.bind(EventType.OPHELD1, 211, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 261);//Avantoe
		});

		scriptManager.bind(EventType.OPHELD1, 213, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 263);//Kwuarm
		});

		scriptManager.bind(EventType.OPHELD1, 215, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 265);//Cadantine
		});

		scriptManager.bind(EventType.OPHELD1, 217, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 267);//Dwarf weed
		});

		scriptManager.bind(EventType.OPHELD1, 219, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 269);//Torstol
		});

		scriptManager.bind(EventType.OPHELD1, 2485, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 2481);//Lantadyme
		});

		scriptManager.bind(EventType.OPHELD1, 3049, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 2998);//Toadflax
		});

		scriptManager.bind(EventType.OPHELD1, 3051, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 3000);//Snapdragon
		});

		scriptManager.bind(EventType.OPHELD1, 12174, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 12172);//Spirit weed
		});

		scriptManager.bind(EventType.OPHELD1, 14836, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 14854);//Wergali
		});

		scriptManager.bind(EventType.OPHELD1, 21626, function (ctx) {
			common.startHerblore(ctx.player, CLEAN_HERBS, 21624);//Fellstalk
		});

		common.registerProcessHandler(CLEAN_HERBS, cleanHerbs);
	}

	function cleanHerbs (player, cleanHerbId, amount) {
		varp(player, 1175, cleanHerbId);
		var text = "You clean the dirt from the "+config.objName(config.objParam(cleanHerbId, 2655));
		makex.startCrafting(player, amount, 22756, text);
	}
})();
