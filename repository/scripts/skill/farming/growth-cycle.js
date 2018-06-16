/**
 *
 */
/* globals EventType */
var chat = require('shared/chat');
var CONST = require('shared/const');
var util = require('shared/util');

module.exports = (function () {

	var patches = [
		require('./flower-patch'),
		require('./herb-patch'),
		require('./allotment'),
		require('./tree-patch'),
		require('./plant-pots')
	];

	return {
		init : init,
		processLogin : processLogin
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, "farmtick", function (ctx) {
			var args = ctx.cmdArgs;
			var cycleCount = 1;
			if (args.length >= 1 && !isNaN(args[0])) {
				cycleCount = parseInt(args[0]);
			}
			var start = new Date().getTime();
			if (cycleCount > 1) {
				for (var i=1; i<=cycleCount; i++) {
					//chat.sendMessage(ctx.player, "Running growth cycle "+i);
					process(ctx.player, 0);
				}
			} else {
				//chat.sendMessage(ctx.player, "Running growth cycle...");
				process(ctx.player, 0);
			}
			var end = new Date().getTime();
			chat.sendMessage(ctx.player, "Finshed "+cycleCount+" growth cycles in "+(end-start)+" milliseconds");
		});
	}

	function processLogin(ctx) {
		var player = ctx.player;
		var tickDifference = ctx.tickDifference;

		chat.sendDebugMessage(player, "Running farming login tasks.");

		var currentTick = util.getServerCycle();
		var start;
		var end = currentTick;
		if (tickDifference <= currentTick) {
			start = currentTick - tickDifference;
		} else {
			var daysDifference = Math.min((tickDifference - currentTick) | 0, 3 * CONST.CYCLES_PER_DAY);
			start = CONST.CYCLES_PER_DAY - (tickDifference - daysDifference - currentTick);
			end = start + tickDifference;
		}
		var count = 0;
		for (var serverCycle = start; serverCycle < end; serverCycle+= CONST.FARMING_CYCLE_LENGTH) {
			process(player, serverCycle);
			count++;
			if (count > 864) {
				break;//Maximum of 3 days worth of cycles
			}
		}
		chat.sendDebugMessage(player, "Finished "+count+" farming cycles.");
		queueFarmingCycle(player, 1);
	}

	function queueFarmingCycle (player, cycleId) {
		util.delayFunction(player, CONST.FARMING_CYCLE_LENGTH, function () {
			var serverCycle = util.getServerCycle();
			chat.sendDebugMessage(player, "Running farming tick "+cycleId+" (cycle="+serverCycle+")");
			process(player, serverCycle);
			queueFarmingCycle(player, ++cycleId);
		}, false);
	}

	function process(player, serverCycle) {
		for (var i in patches) {
			patches[i].process(player, serverCycle);
		}
	}
})();
