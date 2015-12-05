/**
 * @Author Kayla
 * @Date 11/14/2015
 */
var api;

var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The commands to bind to */
	getPossibleSyntaxes: function() {
		return [ "teleto", "teletome", "setname" ];
	},

	/* The first option on an object */
	handle: function(player, syntax, args, clientCommand) {
	if (syntax.toLowerCase() == "teleto") {
		var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.InputEnteredHandler'), {
			handle : function (value) {
				if (value.length > 0) {
					var hash = api.getUserHash(value);
					if (hash != null) {
						var targetPlayer = api.getWorldPlayerByHash(hash);
						if (targetPlayer != null) {
							player.stopAll();
							player.getMovement().teleportTo(targetPlayer.getCurrentTile());
						} else {
							api.sendMessage(player, value+" is not currently in the game world.")
						}
					} else {
						api.sendMessage(player, value+" is not registered on this server.")
					}
				}
			}
		});
		
		player.getDialogs().requestString("Please enter the display name of the player you wish to teleport too:", new Handler());
		return true;
		
	} else if (syntax.toLowerCase() == "teletome") {
			var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.InputEnteredHandler'), {
				handle : function (value) {
					if (value.length > 0) {
						var hash = api.getUserHash(value);
						if (hash != null) {
							var targetPlayer = api.getWorldPlayerByHash(hash);
							if (targetPlayer != null) {
								targetPlayer.stopAll();
								targetPlayer.getMovement().teleportTo(player.getCurrentTile());
							} else {
								api.sendMessage(player, value+" is not currently in the game world.")
							}
						} else {
							api.sendMessage(player, value+" is not registered on this server.")
						}
					}
				}
			});
			
			player.getDialogs().requestString("Please enter the display name of the player you wish to teleport to you:", new Handler());
			return true;
			
		}  else if (syntax.toLowerCase() == "setname") {
			var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.InputEnteredHandler'), {
				handle : function (value) {
					if (value.length > 0) {
						var hash = api.getUserHash(value);
						if (hash != null) {
							var targetPlayer = api.getWorldPlayerByHash(hash);
							if (targetPlayer != null) {
								api.setDisplayName(targetPlayer, hash, "Kayla");
							} else {
								api.sendMessage(player, value+" is not currently in the game world.")
							}
						} else {
							api.sendMessage(player, value+" is not registered on this server.")
						}
					}
				}
			});
			
			player.getDialogs().requestString("Please enter the display name of the player you wish to teleport to you:", new Handler());
			return true;
		}
		
	},
	
		
	adminCommand : function () {
		return true;
	}

});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var listener = new CommandListener();
	scriptManager.registerCommandListener(listener, listener.getPossibleSyntaxes());
};