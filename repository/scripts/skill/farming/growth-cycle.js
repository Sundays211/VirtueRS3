/**
 * 
 */
/* globals EventType */
var chat = require('../../chat');

var plantPots = require('./plant-pots');
var flowerPatch = require('./flower-patch');

module.exports = (function () {
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
					process(ctx.player);
				}
			} else {
				//chat.sendMessage(ctx.player, "Running growth cycle...");
				process(ctx.player);
			}
			var end = new Date().getTime();
			chat.sendMessage(ctx.player, "Finshed "+cycleCount+" growth cycles in "+(end-start)+" milliseconds");
		});
	}
	
	function process(player) {
		plantPots.process(player);
		flowerPatch.processAll(player);
	}
})();