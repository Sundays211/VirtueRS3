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
/* globals EventType */
var util = require('../../core/util');
var chat = require('../../chat');

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
	//Run tick once every 40 mins
	var Tree = {
		OAK : {
			level : 15,
			plantxp : 14,
			checkxp : 467.3,
			sapling : 5370
		},
		WILLOW : {
			level : 30,
			plantxp : 25,
			checkxp : 1456.5,
			sapling : 5371
		}
	};
	
	return {
		init : init,
		process : process,
		values : Tree
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 8388, 8389, 8390, 8391 ], function (ctx) {
			var player = ctx.player;
			var patchId = ctx.locTypeId;
			switch(variables.getStatus(player, patchId)) {
			case 0://Rake (3)
			case 1://Rake (2)
			case 2://Rake (1)
				common.rake(player, patchId);
				return;
			case 12://Check health Oak
				common.checkHealth(player, patchId, Tree.OAK, 13);
				return;
			case 21://Check health Willow
				common.checkHealth(player, patchId, Tree.WILLOW, 22);
				return;
				
			case 73://Prune Oak (2)
				common.prune(player, patchId, 9);
				break;
			case 74://Prune Oak (3)
				common.prune(player, patchId, 10);
				break;
			case 75://Prune Oak (4)
				common.prune(player, patchId, 11);
				break;
			case 80://Prune Willow (2)
				common.prune(player, patchId, 16);
				break;
			case 81://Prune Willow (3)
				common.prune(player, patchId, 17);
				break;
			case 82://Prune Willow (4)
				common.prune(player, patchId, 18);
				break;
			case 83://Prune Willow (5)
				common.prune(player, patchId, 19);
				break;
			case 84://Prune Willow (6)
				common.prune(player, patchId, 20);
				break;
				
			case 201://Dead Oak (2)
			case 202://Dead Oak (3)
			case 203://Dead Oak (4)
				common.clear(player, patchId);
				return;
			default:
				chat.sendMessage(player, "Unhandled status for patch "+patchId+": "+variables.getStatus(player, patchId));
				return;
			}
		});
		
		scriptManager.bind(EventType.OPLOCU, [ 8388, 8389, 8390, 8391 ], function (ctx) {
			var player = ctx.player;
			var patchId = ctx.locTypeId;
			switch (ctx.useObjId) {//Items which work regardless of current status
			case 5733://Rotten Potato
				if (util.isAdmin(player)) {
					processPatch(player, patchId);
					chat.sendMessage(player, "Advanced farming patch to status "+variables.getStatus(player, patchId));
				} else {
					util.defaultHandler(ctx, "tree patch");
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
		
		scriptManager.bind(EventType.OPLOC2, [ 8388, 8389, 8390, 8391 ], function (ctx) {
			var player = ctx.player;			
			var status = variables.getStatus(player, ctx.locTypeId);
			var compost = variables.getCompost(player, ctx.locTypeId);
			
			var message = common.getInspectMessage(player, ctx.locTypeId, "This is a tree patch.");			
			chat.sendMessage(player, message);
			
			if (util.isAdmin(player)) {
				chat.sendMessage(player, "id="+ctx.locTypeId+", status = "+status+", compost = "+compost);
			}
		});
	}
	
	function handleEmptyPatch(player, patchId, seedId, ctx) {
		switch(seedId) {
		case 5370://Oak sapling
			common.plantSapling(player, patchId, Tree.OAK, 8);
			return;
		case 5371://Willow sapling
			common.plantSapling(player, patchId, Tree.WILLOW, 15);
			return;
		case 6032://Compost
			common.applyCompost(player, patchId, 1);
			return;
		case 6034://Supercompost
			common.applyCompost(player, patchId, 2);
			return;
		default:
			util.defaultHandler(ctx, "tree patch");
			return;
		}
	}
	
	function process (player, serverCycle) {
		processPatch(player, 8388, serverCycle);
		processPatch(player, 8389, serverCycle);
		processPatch(player, 8390, serverCycle);
		processPatch(player, 8391, serverCycle);
	}
	
	function processPatch (player, patchId, serverCycle) {
		common.processWeeds(player, patchId);
		if (common.canRunCycle(serverCycle, 8)) {
			processGrowth(player, patchId);
		}
	}
	
	function processGrowth (player, patchId) {
		switch(variables.getStatus(player, patchId)) {			
		/* Regular growth */
		case 8://Oak (1)
			variables.setStatus(player, patchId, 9);
			break;
		case 9://Oak (2)
			common.processGrowthStage(player, patchId, 10, 73);
			break;
		case 10://Oak (3)
			common.processGrowthStage(player, patchId, 11, 74);
			break;
		case 11://Oak (4)
			common.processGrowthStage(player, patchId, 12, 75);
			break;
			
		case 15://Willow (1)
			variables.setStatus(player, patchId, 16);
			break;
		case 16://Willow (2)
			common.processGrowthStage(player, patchId, 17, 80);
			break;
		case 17://Willow (3)
			common.processGrowthStage(player, patchId, 18, 81);
			break;
		case 18://Willow (4)
			common.processGrowthStage(player, patchId, 19, 82);
			break;
		case 19://Willow (5)
			common.processGrowthStage(player, patchId, 20, 83);
			break;
		case 20://Willow (6)
			common.processGrowthStage(player, patchId, 21, 84);
			break;
			
		/* Diseased patches */
		case 73://Diseased Oak (2)
			common.processDiseasedStage(player, patchId, 201);
			break;
		case 74://Diseased Oak (3)
			common.processDiseasedStage(player, patchId, 202);
			break;
		case 75://Diseased Oak (4)
			common.processDiseasedStage(player, patchId, 203);
			break;
		case 80://Diseased Willow (2)
		case 81://Diseased Willow (3)
		case 82://Diseased Willow (4)
		case 83://Diseased Willow (5)
		case 84://Diseased Willow (6)
		}
	}
})();