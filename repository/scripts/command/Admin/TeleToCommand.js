/**
 * @Author Kayla
 * @Date 11/14/2015
 */

var CommandListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		
		if (syntax.toLowerCase() == "teleto") {
			var message = "Please enter the display name of the player you wish to teleport to:";
			requestName(player, message, function (name) {
				var hash = api.getUserHash(name);
				if (hash != null) {
					var targetPlayer = api.getWorldPlayerByHash(hash);
					if (targetPlayer != null) {
						api.teleportEntity(player, api.getCoords(targetPlayer));
					} else {
						api.sendMessage(player, name+" is not currently in the game world.")
					}
				} else {
					api.sendMessage(player, name+" is not registered on this server.")
				}
			});
			
		} else if (syntax.toLowerCase() == "teletome") {
			var message = "Please enter the display name of the player you wish to teleport to you:";
			requestName(player, message, function (name) {
				var hash = api.getUserHash(name);
				if (hash != null) {
					var targetPlayer = api.getWorldPlayerByHash(hash);
					if (targetPlayer != null) {
						api.teleportEntity(targetPlayer, api.getCoords(player));
					} else {
						api.sendMessage(player, name+" is not currently in the game world.")
					}
				} else {
					api.sendMessage(player, name+" is not registered on this server.")
				}
			});			
		}
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "teleto", "teletome" ];
	var listener = new CommandListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND_ADMIN, commands[i], listener);
	}
};