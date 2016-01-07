/**
 * @Author Kayla
 * @Date 11/14/2015
 */

var CommandListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (syntax.toLowerCase() == "freeze") {
				if (value.length > 0) {
					var hash = api.getUserHash(value);
					if (hash != null) {
						var targetPlayer = api.getWorldPlayerByHash(hash);
						if (targetPlayer != null) {
							api.sendMessage(player, "You have frozen the player named: " + targetPlayer)
							api.runAnimation(player, 1979);
							api.setSpotAnim(player, 1, 366);
							api.setSpotAnim(targetPlayer, 1, 369);
							targetPlayer.lock();
							api.sendMessage(targetPlayer, "You have been frozen.")
						} else {
							api.sendMessage(player, value+" is not currently in the game world.")
						}
					} else {
						api.sendMessage(player, value+" is not registered on this server.")
					}
				}
			}  else if (syntax.toLowerCase() == "unfreeze") {
				if (value.length > 0) {
					var hash = api.getUserHash(value);
					if (hash != null) {
						var targetPlayer = api.getWorldPlayerByHash(hash);
						if (targetPlayer != null) {
							api.sendMessage(player, "You have unfrozen the player. ")
							targetPlayer.unlock();
							api.sendMessage(targetPlayer, "You can now move again!")
						} else {
							api.sendMessage(player, value+" is not currently in the game world.")
						}
					} else {
						api.sendMessage(player, value+" is not registered on this server.")
					}
				}
			}
			}
		});
		
		player.getDialogs().requestString("Please enter the display name of the player you wish to unfreeze:", new Handler());
		return true;
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerListener(EventType.COMMAND_ADMIN, "freeze", listener);
	scriptManager.registerListener(EventType.COMMAND_ADMIN, "unfreeze", listener);
};

