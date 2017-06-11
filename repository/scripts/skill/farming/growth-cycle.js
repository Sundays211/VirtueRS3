/**
 * 
 */
/* globals EventType */
var chat = require('../../chat');

var plantPots = require('./plant-pots');

module.exports = (function () {
	
	var patches = [
		require('./flower-patch'),
		require('./herb-patch'),
		require('./allotment')
	];
	
	return {
		init : init
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
	
	function process(player, serverCycle) {
		plantPots.process(player);
		for (var i in patches) {
			var patch = patches[i];
			if (patch.canProcess && patch.canProcess(serverCycle)) {
				patch.processAll(player);
			}
		}
	}
})();