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
var util = require('shared/util');
var chat = require('shared/chat');
var dialog = require('shared/dialog');
var stat = require('shared/stat');

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
	//Run tick once every 10 mins
	var Produce = {
		POTATOES : {
			level : 1,
			plantxp : 8,
			harvestxp : 9,
			seed : 5318,
			produce : 1942
		},
		ONIONS : {
			level : 5,
			plantxp : 9.5,
			harvestxp : 10.5,
			seed : 5319,
			produce : 1957
		},
		CABBAGES : {
			level : 7,
			plantxp : 10,
			harvestxp : 11.5,
			seed : 5324,
			produce : 1965
		},
		TOMATOES : {
			level : 12,
			plantxp : 12.5,
			harvestxp : 14,
			seed : 5322,
			produce : 1982
		},
		SWEETCORN : {
			level : 20,
			plantxp : 17,
			harvestxp : 19,
			seed : 5320,
			produce : 5986
		}
	};

	return {
		init : init,
		process : process,
		values : Produce
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 8550, 8551, 8552, 8553, 8554, 8555, 8556, 8557 ], function (ctx) {
			var player = ctx.player;
			var patchId = ctx.locTypeId;
			switch(variables.getStatus(player, patchId)) {
			case 0://Rake (3)
			case 1://Rake (2)
			case 2://Rake (1)
				common.rake(player, patchId);
				return;

			/* Water crops */
			case 6://Water Potatoes (1)
				common.water(player, patchId, 70);
				return;
			case 7://Water Potatoes (2)
				common.water(player, patchId, 71);
				return;
			case 8://Water Potatoes (3)
				common.water(player, patchId, 72);
				return;
			case 9://Water Potatoes (4)
				common.water(player, patchId, 73);
				return;

			case 13://Water Onions (1)
				common.water(player, patchId, 77);
				return;
			case 14://Water Onions (2)
				common.water(player, patchId, 78);
				return;
			case 15://Water Onions (3)
				common.water(player, patchId, 79);
				return;
			case 16://Water Onions (4)
				common.water(player, patchId, 80);
				return;

			case 20://Water Cabbages (1)
				common.water(player, patchId, 84);
				return;
			case 21://Water Cabbages (2)
				common.water(player, patchId, 85);
				return;
			case 22://Water Cabbages (3)
				common.water(player, patchId, 86);
				return;
			case 23://Water Cabbages (4)
				common.water(player, patchId, 87);
				return;

			case 27://Water Tomatoes (1)
				common.water(player, patchId, 91);
				return;
			case 28://Water Tomatoes (2)
				common.water(player, patchId, 92);
				return;
			case 29://Water Tomatoes (3)
				common.water(player, patchId, 93);
				return;
			case 30://Water Tomatoes (4)
				common.water(player, patchId, 94);
				return;

			case 34://Water Sweetcorn (1)
				common.water(player, patchId, 98);
				return;
			case 35://Water Sweetcorn (2)
				common.water(player, patchId, 99);
				return;
			case 36://Water Sweetcorn (3)
				common.water(player, patchId, 100);
				return;
			case 37://Water Sweetcorn (4)
				common.water(player, patchId, 101);
				return;
			case 38://Water Sweetcorn (5)
				common.water(player, patchId, 102);
				return;
			case 39://Water Sweetcorn (6)
				common.water(player, patchId, 103);
				return;

			/* Harvest crops */
			case 10://Harvest Potatoes (3)
				common.harvest(player, patchId, Produce.POTATOES, [11, 12]);
				return;
			case 11://Harvest Potatoes (2)
				common.harvest(player, patchId, Produce.POTATOES, [12]);
				return;
			case 12://Harvest Potatoes (1)
				common.harvest(player, patchId, Produce.POTATOES);
				return;

			case 17://Harvest Onions (3)
				common.harvest(player, patchId, Produce.ONIONS, [18, 19]);
				return;
			case 18://Harvest Onions (2)
				common.harvest(player, patchId, Produce.ONIONS, [19]);
				return;
			case 19://Harvest Onions (1)
				common.harvest(player, patchId, Produce.ONIONS);
				return;

			case 24://Harvest Cabbages (3)
				common.harvest(player, patchId, Produce.CABBAGES, [25, 26]);
				return;
			case 25://Harvest Cabbages (2)
				common.harvest(player, patchId, Produce.CABBAGES, [26]);
				return;
			case 26://Harvest Cabbages (1)
				common.harvest(player, patchId, Produce.CABBAGES);
				return;

			case 31://Harvest Tomatoes (3)
				common.harvest(player, patchId, Produce.TOMATOES, [32, 33]);
				return;
			case 32://Harvest Tomatoes (2)
				common.harvest(player, patchId, Produce.TOMATOES, [33]);
				return;
			case 33://Harvest Tomatoes (1)
				common.harvest(player, patchId, Produce.TOMATOES);
				return;

			case 40://Harvest Sweetcorn (3)
				common.harvest(player, patchId, Produce.SWEETCORN, [41, 42]);
				return;
			case 41://Harvest Sweetcorn (2)
				common.harvest(player, patchId, Produce.SWEETCORN, [42]);
				return;
			case 42://Harvest Sweetcorn (1)
				common.harvest(player, patchId, Produce.SWEETCORN);
				return;

			/* Clear dead crops */
			case 199://Dead potatoes (2)
			case 200://Dead potatoes (3)
			case 201://Dead potatoes (4)
			case 206://Dead onions (2)
			case 207://Dead onions (3)
			case 208://Dead onions (4)
			case 213://Dead cabbages (2)
			case 214://Dead cabbages (3)
			case 215://Dead cabbages (4)
			case 220://Dead tomatoes (2)
			case 221://Dead tomatoes (3)
			case 222://Dead tomatoes (4)
			case 227://Dead sweetcorn (2)
			case 228://Dead sweetcorn (3)
			case 229://Dead sweetcorn (4)
			case 230://Dead sweetcorn (5)
			case 231://Dead sweetcorn (6)
				common.clear(player, patchId);
				return;
			default:
				chat.sendMessage(player, "Unhandled status for patch "+patchId+": "+variables.getStatus(player, patchId));
				return;
			}
		});

		scriptManager.bind(EventType.OPLOCU, [ 8550, 8551, 8552, 8553, 8554, 8555, 8556, 8557 ], function (ctx) {
			var player = ctx.player;
			var patchId = ctx.locTypeId;
			switch (ctx.useObjId) {//Items which work regardless of current status
			case 5733://Rotten Potato
				if (util.isAdmin(player)) {
					processPatch(player, patchId);
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

		scriptManager.bind(EventType.OPLOC2, [ 8550, 8551, 8552, 8553, 8554, 8555, 8556, 8557 ], function (ctx) {
			var player = ctx.player;
			var status = variables.getStatus(player, ctx.locTypeId);
			var compost = variables.getCompost(player, ctx.locTypeId);

			var message = common.getInspectMessage(player, ctx.locTypeId, "This is an allotment.");

			chat.sendMessage(player, message);
			if (util.isAdmin(player)) {
				chat.sendMessage(player, "id="+ctx.locTypeId+", status = "+status+", compost = "+compost);
			}
		});
	}

	function handleEmptyPatch(player, patchId, seedId, ctx) {
		switch(seedId) {
		case 5318://Potato seed
			plantSeed(player, patchId, Produce.POTATOES, 6);
			return;
		case 5319://Onion seed
			plantSeed(player, patchId, Produce.ONIONS, 13);
			return;
		case 5324://Cabbage seed
			plantSeed(player, patchId, Produce.CABBAGES, 20);
			return;
		case 5322://Tomato seed
			plantSeed(player, patchId, Produce.TOMATOES, 27);
			return;
		case 5320://Sweetcorn seed
			plantSeed(player, patchId, Produce.SWEETCORN, 34);
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

	function process (player, serverCycle) {
		processPatch(player, 8550, serverCycle);
		processPatch(player, 8551, serverCycle);
		processPatch(player, 8552, serverCycle);
		processPatch(player, 8553, serverCycle);
		processPatch(player, 8554, serverCycle);
		processPatch(player, 8555, serverCycle);
		processPatch(player, 8556, serverCycle);
		processPatch(player, 8557, serverCycle);
	}

	function processPatch (player, patchId, serverCycle) {
		common.processWeeds(player, patchId);
		if (common.canRunCycle(serverCycle, 2)) {
			processGrowth(player, patchId);
		}
	}

	function processGrowth (player, patchId) {
		switch(variables.getStatus(player, patchId)) {
		/* Regular growth */
		case 6://Potatoes (1)
			variables.setStatus(player, patchId, 7);
			break;
		case 7://Potatoes (2)
			common.processGrowthStage(player, patchId, 8, 135);
			break;
		case 8://Potatoes (3)
			common.processGrowthStage(player, patchId, 9, 136);
			break;
		case 9://Potatoes (4)
			common.processGrowthStage(player, patchId, 10, 137);
			break;

		case 13://Onions (1)
			variables.setStatus(player, patchId, 14);
			break;
		case 14://Onions (2)
			common.processGrowthStage(player, patchId, 15, 142);
			break;
		case 15://Onions (3)
			common.processGrowthStage(player, patchId, 16, 143);
			break;
		case 16://Onions (4)
			common.processGrowthStage(player, patchId, 17, 144);
			break;

		case 20://Cabbages (1)
			variables.setStatus(player, patchId, 21);
			break;
		case 21://Cabbages (2)
			common.processGrowthStage(player, patchId, 22, 149);
			break;
		case 22://Cabbages (3)
			common.processGrowthStage(player, patchId, 23, 150);
			break;
		case 23://Cabbages (4)
			common.processGrowthStage(player, patchId, 24, 151);
			break;

		case 27://Tomatoes (1)
			variables.setStatus(player, patchId, 28);
			break;
		case 28://Tomatoes (2)
			common.processGrowthStage(player, patchId, 29, 156);
			break;
		case 29://Tomatoes (3)
			common.processGrowthStage(player, patchId, 30, 157);
			break;
		case 30://Tomatoes (4)
			common.processGrowthStage(player, patchId, 31, 158);
			break;

		case 34://Sweetcorn (1)
			variables.setStatus(player, patchId, 35);
			break;
		case 35://Sweetcorn (2)
			common.processGrowthStage(player, patchId, 36, 163);
			break;
		case 36://Sweetcorn (3)
			common.processGrowthStage(player, patchId, 37, 164);
			break;
		case 37://Sweetcorn (4)
			common.processGrowthStage(player, patchId, 38, 165);
			break;
		case 38://Sweetcorn (5)
			common.processGrowthStage(player, patchId, 39, 166);
			break;
		case 39://Sweetcorn (6)
			common.processGrowthStage(player, patchId, 40, 167);
			break;

		/* Watered patches */
		case 71://Watered Potatoes (1)
			variables.setStatus(player, patchId, 7);
			break;
		case 72://Watered Potatoes (2)
			variables.setStatus(player, patchId, 8);
			break;
		case 73://Watered Potatoes (3)
			variables.setStatus(player, patchId, 9);
			break;
		case 75://Watered Potatoes (4)
			variables.setStatus(player, patchId, 10);
			break;

		case 77://Watered Onions (1)
			variables.setStatus(player, patchId, 14);
			break;
		case 78://Watered Onions (2)
			variables.setStatus(player, patchId, 15);
			break;
		case 79://Watered Onions (3)
			variables.setStatus(player, patchId, 16);
			break;
		case 80://Watered Onions (4)
			variables.setStatus(player, patchId, 17);
			break;

		case 84://Watered Cabbages (1)
			variables.setStatus(player, patchId, 21);
			break;
		case 85://Watered Cabbages (2)
			variables.setStatus(player, patchId, 22);
			break;
		case 86://Watered Cabbages (3)
			variables.setStatus(player, patchId, 23);
			break;
		case 87://Watered Cabbages (4)
			variables.setStatus(player, patchId, 24);
			break;

		case 91://Watered Tomatoes (1)
			variables.setStatus(player, patchId, 28);
			break;
		case 92://Watered Tomatoes (2)
			variables.setStatus(player, patchId, 29);
			break;
		case 93://Watered Tomatoes (3)
			variables.setStatus(player, patchId, 30);
			break;
		case 94://Watered Tomatoes (4)
			variables.setStatus(player, patchId, 31);
			break;

		case 98://Watered Sweetcorn (1)
			variables.setStatus(player, patchId, 35);
			break;
		case 99://Watered Sweetcorn (2)
			variables.setStatus(player, patchId, 36);
			break;
		case 100://Watered Sweetcorn (3)
			variables.setStatus(player, patchId, 37);
			break;
		case 101://Watered Sweetcorn (4)
			variables.setStatus(player, patchId, 38);
			break;
		case 102://Watered Sweetcorn (4)
			variables.setStatus(player, patchId, 39);
			break;
		case 103://Watered Sweetcorn (4)
			variables.setStatus(player, patchId, 40);
			break;

		/* Diseased patches */
		case 135://Diseased Potatoes (2)
			common.processDiseasedStage(player, patchId, 199);
			break;
		case 136://Diseased Potatoes (3)
			common.processDiseasedStage(player, patchId, 200);
			break;
		case 137://Diseased Potatoes (4)
			common.processDiseasedStage(player, patchId, 201);
			break;

		case 142://Diseased Onions (2)
			common.processDiseasedStage(player, patchId, 206);
			break;
		case 143://Diseased Onions (3)
			common.processDiseasedStage(player, patchId, 207);
			break;
		case 144://Diseased Onions (4)
			common.processDiseasedStage(player, patchId, 208);
			break;

		case 149://Diseased Cabbages (2)
			common.processDiseasedStage(player, patchId, 213);
			break;
		case 150://Diseased Cabbages (3)
			common.processDiseasedStage(player, patchId, 214);
			break;
		case 151://Diseased Cabbages (4)
			common.processDiseasedStage(player, patchId, 215);
			break;

		case 156://Diseased Tomatoes (2)
			common.processDiseasedStage(player, patchId, 220);
			break;
		case 157://Diseased Tomatoes (3)
			common.processDiseasedStage(player, patchId, 221);
			break;
		case 158://Diseased Tomatoes (4)
			common.processDiseasedStage(player, patchId, 222);
			break;

		case 163://Diseased Sweetcorn (2)
			common.processDiseasedStage(player, patchId, 227);
			break;
		case 164://Diseased Sweetcorn (3)
			common.processDiseasedStage(player, patchId, 228);
			break;
		case 165://Diseased Sweetcorn (4)
			common.processDiseasedStage(player, patchId, 229);
			break;
		case 166://Diseased Sweetcorn (5)
			common.processDiseasedStage(player, patchId, 230);
			break;
		case 167://Diseased Sweetcorn (6)
			common.processDiseasedStage(player, patchId, 231);
			break;
		}
	}

	function plantSeed (player, patchId, crop, plantStatus) {
		if (stat.getLevel(player, Stat.FARMING) < crop.level) {
			dialog.builder(player).mesbox("You need a farming level of "+crop.level+" to plant those seeds");
			return;
		}
		common.plantSeed(player, crop.seed, function () {
			stat.giveXp(player, Stat.FARMING, crop.plantxp);
			variables.setStatus(player, patchId, plantStatus);
		}, 3);
	}
})();
