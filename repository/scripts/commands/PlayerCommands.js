/**
 * @author Kayla
 */

var EventListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		switch (syntax) {
		case "yell":
			if (args.length < 1) {
				sendCommandResponse(player, "<col=0099CC>ERROR! Message is to short or needs a space</col>", scriptArgs.console);
				return;
			}
			var message = args[0].charAt(0).toUpperCase() + args[0].substr(1).toLowerCase();
			for (var i = 1; i < args.length; i++) {
				message += " "+ args[i];
			}
			World.getInstance().sendYellBroadcast("<col=66CCFF><img=9>[" + api.getFormattedName(player) + "]:</col> " + message);
			return;
		case "duel":
		case "challenge":
			player.test(player);
			return;
		case "prayer":
			if (args.length < 1) {
				sendCommandResponse(player, "Use either 'prayer regular' or 'prayer curses'.", scriptArgs.console);
			} else if (args[0] == "regular") {
				api.setVarBit(player, 16789, 0);
				sendCommandResponse(player, "Regular Prayer book enabled.", scriptArgs.console);
			} else if (args[0] == "curses") {
				api.setVarBit(player, 16789, 1);
				sendCommandResponse(player, "Curses Prayers book enabled.", scriptArgs.console);
			} else {
				sendCommandResponse(player, "Use either 'prayer regular' or 'prayer curses.", scriptArgs.console);
			}
			return;
		case "spellbook":
			if (args.length < 1) {
				sendCommandResponse(player, "Use either 'spellbook standard', 'spellbook ancient' or 'spellbook lunar'.", scriptArgs.console);
			} else if (args[0] == "standard") {
				api.setVarBit(player, 0, 0);
				sendCommandResponse(player, "Standard spells enabled.", scriptArgs.console);
			} else if (args[0] == "ancient") {
				api.setVarBit(player, 0, 1);
				sendCommandResponse(player, "Ancient spells enabled.", scriptArgs.console);
			} else if (args[0] == "lunar") {
				api.setVarBit(player, 0, 2);
				sendCommandResponse(player, "Lunar spells enabled.", scriptArgs.console);
			} else {
				sendCommandResponse(player, "Use either 'spellbook standard', 'spellbook ancient' or 'spellbook lunar'.", scriptArgs.console);
			}
			return;
		case "finishtut":
			api.setVarp(player, 1295, 1000);
			sendCommandResponse(player, "The tutorial has been successfully marked as finished.", scriptArgs.console);
			return;
		case "removetitle":
		case "cleartitle":
			player.getAppearance().setPrefixTitle("");
			player.getAppearance().setSuffixTitle("");
			player.getAppearance().refresh();
			sendCommandResponse(player, "You have deleted your title.", scriptArgs.console);
			return;
		case "coords":
		case "pos":
		case "mypos":
			sendCommandResponse(player, api.getName(player)+": "+api.getCoords(player), scriptArgs.console);
			return;
		case "edge":
			api.teleportEntity(player, 3087, 3502, 0);
			return;
		case "godwars":
			api.sendMessage(player, "<col=#333333>Welcome to God Wars Dungeon.</col>");
			api.teleportEntity(player, 2882, 5311, 0);
			return;
		case "home":
			api.teleportEntity(player, 3210, 3256, 0);
			return;
		case "meeting":
			api.teleportEntity(player, 5504, 4152, 0);
			api.sendMessage(player, "<col=ff0000>Welcome to the Administration Room. ");
			api.sendMessage(player, "<col=ff0000>---------Rules------- ");
			api.sendMessage(player, "<col=ff0000>Please do not talk while meeting is going on.");			
			return;
		case "vorago":
			api.sendMessage(player, "<col=#333333>Welcome to vorago.</col>");
			api.teleportEntity(player, 3106, 6112, 0);			
			return;
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "removetitle", "cleartitle", "finishtut", "yell", "duel", "challenge", "spellbook", "prayer",
	                 "coords", "pos", "mypos", "edge", "godwars", "home", "meeting", "vorago" ];
	var listener = new EventListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND, commands[i], listener);
	}	
};