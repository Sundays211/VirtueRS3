/**
 * @author Kayla
 */

var EventListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		switch (syntax) {
		case "yell":
			if (args.length < 1) {
				sendCommandResponse(player, "<col=0099CC>ERROR! Message is to short or needs a space</col>", scriptArgs.console);
				return;
			}
			var message = args[0];
			for (var i = 1; i < args.length; i++) {
				message += (i == 0 ? (args[i].substring(0, 1).toUpperCase() + args[i].substring(1)) : args[i]) + (i == args.length - 1 ? "" : " ");
			}
			World.getInstance().sendYellBroadcast("<col=66CCFF><img=9>[" + api.getFormattedName(player) + "]:</col> " + message);
			return;
		case "duel":
		case "challenge":
			player.test(player);
			return;
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "yell", "duel", "challenge" ];
	var listener = new EventListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND, commands[i], listener);
	}	
};