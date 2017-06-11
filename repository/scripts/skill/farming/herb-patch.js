/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/* globals EventType, Stat */
var util = require('../../core/util');
var chat = require('../../chat');
var dialog = require('../../dialog');
var stat = require('../logic/stat');

var common = require('./common');
var variables = require('./variables');
var plantPots = require('./plant-pots');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 22/02/2015
 */
module.exports = (function () {
	//Run tick once every 20 mins
	var Herb = {
		GUAM : {
			level : 9,
			plantxp : 11,
			harvestxp : 12.5,
			seed : 5291,
			produce : 199
		},
		MARRENTILL : {
			level : 14,
			plantxp : 13.5,
			harvestxp : 15,
			seed : 5292,
			produce : 201
		},
		TARROMIN : {
			level : 19,
			plantxp : 16,
			harvestxp : 18,
			seed : 5293,
			produce : 203
		},
		HARRALANDER : {
			level : 26,
			plantxp : 21.5,
			harvestxp : 24,
			seed : 5294,
			produce : 205
		}
	};
	
	return {
		init : init,
		canProcess : canProcess,
		process : process,
		processAll : processAll,
		values : Herb
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 8150, 8151, 8152, 8153 ], function (ctx) {
			var player = ctx.player;
			var patchId = ctx.locTypeId;
			switch(variables.getStatus(player, patchId)) {
			case 0://Rake (3)
			case 1://Rake (2)
			case 2://Rake (1)
				common.rake(player, patchId);
				return;
				
			case 8://Harvest Guam (3)
				common.harvest(player, patchId, Herb.GUAM, [9, 10]);
				return;
			case 9://Harvest Guam (2)
				common.harvest(player, patchId, Herb.GUAM, [10]);
				return;
			case 10://Harvest Guam (1)
				common.harvest(player, patchId, Herb.GUAM);
				return;
				
			case 15://Harvest Marrentill (3)
				common.harvest(player, patchId, Herb.MARRENTILL, [16, 17]);
				return;
			case 16://Harvest Marrentill (2)
				common.harvest(player, patchId, Herb.MARRENTILL, [17]);
				return;
			case 17://Harvest Marrentill (1)
				common.harvest(player, patchId, Herb.MARRENTILL);
				return;
				
			case 22://Harvest Tarromin (3)
				common.harvest(player, patchId, Herb.TARROMIN, [23, 24]);
				return;
			case 23://Harvest Tarromin (2)
				common.harvest(player, patchId, Herb.TARROMIN, [24]);
				return;
			case 24://Harvest Tarromin (1)
				common.harvest(player, patchId, Herb.TARROMIN);
				return;
				
			case 29://Harvest Harralander (3)
				common.harvest(player, patchId, Herb.HARRALANDER, [30, 31]);
				return;
			case 30://Harvest Harralander (2)
				common.harvest(player, patchId, Herb.HARRALANDER, [31]);
				return;
			case 31://Harvest Harralander (1)
				common.harvest(player, patchId, Herb.HARRALANDER);
				return;
				
			case 170://Dead herbs (2)
			case 171://Dead herbs (3)
			case 172://Dead herbs (4)
				common.clear(player, patchId);
				return;
			default:
				chat.sendMessage(player, "Unhandled status for patch "+patchId+": "+variables.getStatus(player, patchId));
				return;
			}
		});
		
		scriptManager.bind(EventType.OPLOCU, [ 8150, 8151, 8152, 8153 ], function (ctx) {
			var player = ctx.player;
			var patchId = ctx.locTypeId;
			switch (ctx.useObjId) {//Items which work regardless of current status
			case 5733://Rotten Potato
				if (util.isAdmin(player)) {
					process(player, patchId);
					chat.sendMessage(player, "Advanced farming patch to status "+variables.getStatus(player, patchId));
				} else {
					util.defaultHandler(ctx, "herb patch");
				}
				return;
			case 5350://Empty plant pot
				plantPots.fill(player);
				return;
			}
			switch(variables.getStatus(player, patchId)) {
			case 3://Empty patch
				handleEmptyPatch(player, patchId, ctx.useObjId, ctx);
				return;
			default:
				chat.sendMessage(player, "Unhandled status for patch "+patchId+": "+variables.getStatus(player, patchId));
				return;
			}
		});
		
		scriptManager.bind(EventType.OPLOC2, [ 8150, 8151, 8152, 8153 ], function (ctx) {
			var player = ctx.player;			
			var status = variables.getStatus(player, ctx.locTypeId);
			var compost = variables.getCompost(player, ctx.locTypeId);
			
			chat.sendMessage(player, "This is a Herb Patch. status = "+status+", compost = "+compost);
			if (util.isAdmin(player)) {
				chat.sendMessage(player, "id="+ctx.locTypeId+", status = "+status+", compost = "+compost);
			}
		});
	}
	
	function handleEmptyPatch(player, patchId, seedId, ctx) {
		switch(seedId) {
		case 5291://Guam seed
			plantSeed(player, patchId, Herb.GUAM, 4);
			return;
		case 5292://Marrentill seed
			plantSeed(player, patchId, Herb.MARRENTILL, 11);
			return;
		case 5293://Tarromin seed
			plantSeed(player, patchId, Herb.TARROMIN, 18);
			return;
		case 5294://Harralander seed
			plantSeed(player, patchId, Herb.HARRALANDER, 25);
			return;
		case 6032://Compost
			common.applyCompost(player, patchId, 1);
			return;
		case 6034://Supercompost
			common.applyCompost(player, patchId, 2);
			return;
		default:
			util.defaultHandler(ctx, "herb patch");
			return;
		}
	}
	
	function canProcess (serverCycle) {
		return common.canRunCycle(serverCycle, 4);
	}
	
	function processAll (player) {
		process(player, 8150);
		process(player, 8151);
		process(player, 8152);
		process(player, 8153);
	}
	
	function process (player, patchId) {
		switch(variables.getStatus(player, patchId)) {
		case 1://Weeds (2)
			variables.setStatus(player, patchId, 0);
			break;
		case 2://Weeds (1)
			variables.setStatus(player, patchId, 1);
			break;
		case 3://Empty
			variables.setStatus(player, patchId, 2);
			break;
			
		/* Regular growth */
		case 4://Guam (1)
			variables.setStatus(player, patchId, 5);
			break;
		case 5://Guam (2)
			common.processGrowthStage(player, patchId, 6, 128);
			break;
		case 6://Guam (3)
			common.processGrowthStage(player, patchId, 7, 129);
			break;
		case 7://Guam (4)
			common.processGrowthStage(player, patchId, 8, 130);
			break;
		case 11://Marrentill (1)
			variables.setStatus(player, patchId, 12);
			break;
		case 12://Marrentill (2)
			common.processGrowthStage(player, patchId, 13, 131);
			break;
		case 13://Marrentill (3)
			common.processGrowthStage(player, patchId, 14, 132);
			break;
		case 14://Marrentill (4)
			common.processGrowthStage(player, patchId, 15, 133);
			break;
		case 18://Tarromin (1)
			variables.setStatus(player, patchId, 19);
			break;
		case 19://Tarromin (2)
			common.processGrowthStage(player, patchId, 20, 134);
			break;
		case 20://Tarromin (3)
			common.processGrowthStage(player, patchId, 21, 135);
			break;
		case 21://Tarromin (4)
			common.processGrowthStage(player, patchId, 22, 136);
			break;
		case 25://Harralander (1)
			variables.setStatus(player, patchId, 26);
			break;
		case 26://Harralander (2)
			common.processGrowthStage(player, patchId, 27, 137);
			break;
		case 27://Harralander (3)
			common.processGrowthStage(player, patchId, 28, 138);
			break;
		case 28://Harralander (4)
			common.processGrowthStage(player, patchId, 29, 139);
			break;
			
		/* Diseased patches */
		case 128://Diseased Guam (2)
		case 131://Diseased Marrentill (2)
		case 134://Diseased Tarromin (2)
		case 137://Diseased Harralander (2)
			common.processDiseasedStage(player, patchId, 170);
			break;
		case 129://Diseased Guam (3)
		case 132://Diseased Marrentill (3)
		case 135://Diseased Tarromin (3)
		case 138://Diseased Harralander (3)
			common.processDiseasedStage(player, patchId, 171);
			break;
		case 130://Diseased Guam (4)
		case 133://Diseased Marrentill (4)
		case 136://Diseased Tarromin (4)
		case 139://Diseased Harralander (4)
			common.processDiseasedStage(player, patchId, 172);
			break;
		}
	}
	
	function plantSeed (player, patchId, crop, plantStatus) {
		if (stat.getLevel(player, Stat.FARMING) < crop.level) {
			dialog.mesbox(player, "You need a farming level of "+crop.level+" to plant those seeds");
			return;
		}
		common.plantSeed(player, crop.seed, function () {
			stat.giveXp(player, Stat.FARMING, crop.plantxp);
			variables.setStatus(player, patchId, plantStatus);
		});
	}
})();