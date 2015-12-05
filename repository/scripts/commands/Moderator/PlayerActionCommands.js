/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */

var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		var args = scriptArgs.cmdArgs;
		
		var action;
		switch (syntax) {
		case "kick":
		case "kickplayer":
			PlayerAction.requestKick(player);
			return;
		case "mute":
		case "muteplayer":
			action = "mute";
			break;
		case "unmute":
		case "unmuteplayer":
			action = "unmute";
			break;
		case "playertype":
			if (!api.isAdmin(player)) {
				sendCommandResponse(player, "Only administrators may change the account types of other players.", scriptArgs.console);
				return;
			}
			PlayerAction.requestSetAccountType(player);
			return;
		}
		
		var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.InputEnteredHandler'), {
			handle : function (value) {
				if (value.length > 0) {
					var hash = api.getUserHash(value);
					if (hash != null) {
						var targetPlayer = api.getWorldPlayerByHash(hash);
						if (targetPlayer != null) {
							if (action == "mute") {
								api.sendMessage(player, "Applying mute to "+api.getName(targetPlayer)+".")
								targetPlayer.getChat().setMuted(true);
							} else if (action == "unmute") {
								api.sendMessage(player, "Removing mute on player "+api.getName(targetPlayer)+".")
								targetPlayer.getChat().setMuted(false);
							}
						} else {
							api.sendMessage(player, value+" is not currently in the game world.")
						}
					} else {
						api.sendMessage(player, value+" is not registered on this server.")
					}
				}
			}
		});
		
		player.getDialogs().requestString("Please enter the display name of the player you wish to "+action+":", new Handler());
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var commands = [ "kick", "kickplayer", "mute", "muteplayer", "unmute", "unmuteplayer", "playertype" ];
	var listener = new CommandListener();
	for (var i in commands) {
		scriptManager.registerListener(EventType.COMMAND_ADMIN, commands[i], listener);
	}	
};

var ACCOUNT_TYPES = {0:"Normal Player",1:"Moderator",2:"Administrator",
		3:"Local Moderator", 4:"Premier Club Member", 5:"Premier Club Player Moderator",
		6:"Ironman", 7:"Hardcore", 8:"Hardcore Ironman"};

var PlayerAction = {
		requestKick : function (player) {
			var callback = function (player, userHash) {
				var targetPlayer = api.getWorldPlayerByHash(userHash);
				if (targetPlayer != null) {
					api.sendMessage(player, "Kicking "+api.getName(targetPlayer)+" from this server.")
					api.kickPlayer(targetPlayer);
				} else {
					api.sendMessage(player, "The specified player is not currently in the game world.")
				}
			};
			this.requestAccountHash(player, "Please enter the display name of the player to kick from the server:", callback);
		},
		requestAccountHash : function (player, message, callback) {
			requestName(player, message, function (value) {
				var hash = api.getUserHash(value);
				if (hash != null) {
					callback(player, hash);
				} else {
					api.sendMessage(player, value+" is not registered on this server.");
				}
			});
		},
		requestSetAccountType : function (player) {
			var message = "Please enter the display name of the player to change the account type of:";
			this.requestAccountHash(player, message, this.setAccountType);
		},
		setAccountType : function (player, userHash) {
			var curType = api.getAccountType(userHash);
			var curTypeName = ACCOUNT_TYPES[curType];
			var name = api.getName(userHash);
			if (curTypeName === undefined) {
				return;
			}
			/*if (api.getRights(curType) >= 2) {
				api.sendMessage(player, "You cannot change the account type of another administrator.");
				return;
			}*/
			
			var message = "New account type for "+name+" (current="+curTypeName+"):";
			var responses = [0, 1, 2, 3, 4];
			var options = ["null", "null", "null", "null", "null"];
			for (var pos in responses) {
				options[pos] = ACCOUNT_TYPES[responses[pos]];
			}
			requestMulti(player, message, options, responses, function (newType) {
				if (api.getRights(newType) >= 2) {
					//Double check first for higher rights
					var message = "Are you sure you want to make "+name+" a(n) "+ACCOUNT_TYPES[newType]+"?";
					requestConfirm(player, message, function () {
						api.sendMessage(player, name+" is now a(n) "+ACCOUNT_TYPES[newType]);
						api.setAccountType(player, userHash, newType);
					});
					return;
				} else {
					//Just apply it anyways, as it's really easy to change back
					api.sendMessage(player, name+" is now a(n) "+ACCOUNT_TYPES[newType]);
					api.setAccountType(player, userHash, newType);

					api.sendMessage(player, "New Type: "+ACCOUNT_TYPES[api.getAccountType(userHash)]);
				}
			});
		}
}