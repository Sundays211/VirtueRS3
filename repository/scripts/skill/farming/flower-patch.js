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
var anim = require('../../core/anim');
var inv = require('../../inv');
var chat = require('../../chat');
var dialog = require('../../dialog');
var stat = require('../common/stat');

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
	//Run tick once every 5 mins
	var Flower = {
		MARIGOLD : {
			level : 2,
			plantxp : 8.5,
			harvestxp : 47,
			seed : 5096,
			produce : 6010
		}
	};
	
	return {
		init : init,
		process : process,
		values : Flower
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 7847, 7848, 7849, 7850 ], function (ctx) {
			var player = ctx.player;
			var patchId = ctx.locTypeId;
			switch(variables.getStatus(player, patchId)) {
			case 0://Rake (3)
			case 1://Rake (2)
			case 2://Rake (1)
				common.rake(player, patchId);
				return;
			case 8://Water Marigolds (1)
				common.water(player, patchId, 72);
				return;
			case 9://Water Marigolds (2)
				common.water(player, patchId, 73);
				return;
			case 10://Water Marigolds (3)
				common.water(player, patchId, 74);
				return;
			case 11://Water Marigolds (4)
				common.water(player, patchId, 75);
				return;
			case 12://Harvest Marigolds
				harvest(player, patchId, Flower.MARIGOLD);
				return;
			default:
				chat.sendMessage(player, "Unhandled status for patch "+patchId+": "+variables.getStatus(player, patchId));
				return;
			}
		});
		
		scriptManager.bind(EventType.OPLOCU, [ 7847, 7848, 7849, 7850 ], function (ctx) {
			var player = ctx.player;
			var patchId = ctx.locTypeId;
			switch (ctx.useObjId) {//Items which work regardless of current status
			case 5733://Rotten Potato
				if (util.isAdmin(player)) {
					processPatch(player, patchId);
					chat.sendMessage(player, "Advanced farming patch to status "+variables.getStatus(player, patchId));
				} else {
					util.defaultHandler(ctx, "flower patch");
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
		
		scriptManager.bind(EventType.OPLOC2, [ 7847, 7848, 7849, 7850 ], function (ctx) {
			var player = ctx.player;			
			var status = variables.getStatus(player, ctx.locTypeId);
			var compost = variables.getCompost(player, ctx.locTypeId);
			
			chat.sendMessage(player, "This is a Flower Patch. status = "+status+", compost = "+compost);
			if (util.isAdmin(player)) {
				chat.sendMessage(player, "id="+ctx.locTypeId+", status = "+status+", compost = "+compost);
			}
		});
	}
	
	function handleEmptyPatch(player, patchId, seedId, ctx) {
		switch(seedId) {
		case 5096://Marigold seed
			plantSeed(player, patchId, Flower.MARIGOLD, 8);
			return;
		case 6032://Compost
			common.applyCompost(player, patchId, 1);
			return;
		case 6034://Supercompost
			common.applyCompost(player, patchId, 2);
			return;
		default:
			util.defaultHandler(ctx, "flower patch");
			return;
		}
	}
	
	function process (player) {
		processPatch(player, 7847);
		processPatch(player, 7848);
		processPatch(player, 7849);
		processPatch(player, 7850);
	}
	
	function processPatch (player, patchId) {
		common.processWeeds(player, patchId);
		processGrowth(player, patchId);
	}
	
	function processGrowth (player, patchId) {
		switch(variables.getStatus(player, patchId)) {			
		/* Regular growth */
		case 8://Marigolds (1)
			variables.setStatus(player, patchId, 9);
			break;
		case 9://Marigolds (2)
			common.processGrowthStage(player, patchId, 10, 137);
			break;
		case 10://Marigolds (3)
			common.processGrowthStage(player, patchId, 11, 138);
			break;
		case 11://Marigolds (4)
			common.processGrowthStage(player, patchId, 12, 139);
			break;
			
		/* Watered patches */
		case 72://Watered Marigolds (1)
			variables.setStatus(player, patchId, 9);
			break;
		case 73://Watered Marigolds (2)
			variables.setStatus(player, patchId, 10);
			break;
		case 74://Watered Marigolds (3)
			variables.setStatus(player, patchId, 11);
			break;
		case 75://Watered Marigolds (4)
			variables.setStatus(player, patchId, 12);
			break;
			
		/* Diseased patches */
		case 137://Diseased Marigolds (2)
			common.processDiseasedStage(player, patchId, 201);
			break;
		case 138://Diseased Marigolds (3)
			common.processDiseasedStage(player, patchId, 202);
			break;
		case 139://Diseased Marigolds (4)
			common.processDiseasedStage(player, patchId, 203);
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
	
	function harvest (player, patchId, crop) {
		if (!inv.hasSpace(player)) {
			chat.sendMessage(player, "You need free space!");
			return;
		}
		//24910?
		anim.run(player, 22705, function () {
			//Probably not the right animation, but at least it shows us doing something...
			inv.give(player, crop.produce, 1);
			stat.giveXp(player, Stat.FARMING, crop.harvestxp);
			variables.setStatus(player, patchId, 3);
			variables.setCompost(player, patchId, 0);
		});
	}
})();