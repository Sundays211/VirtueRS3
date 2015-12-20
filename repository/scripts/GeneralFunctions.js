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
 * This file is used for general functions, which may be used across multiple scripts.
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 29/11/2015
 */

function getItemName (itemId) {
	return api.getItemType(itemId).name;
}

function requestCount (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value > 0) {
				callback(value);
			}
		}
	});	
	api.requestCount(player, message, new Handler());
}

function requestName (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value.length > 0) {
				callback(value);
			}
		}
	});	
	api.requestName(player, message, new Handler());
}

function requestString (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value.length > 0) {
				callback(value);
			}
		}
	});	
	api.requestString(player, message, new Handler());
}

function requestTool (player, message, tools, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.ToolSelectHandler'), {
		onToolSelected : function (toolID) {
			callback(toolID);
		}
	});
	player.getDialogs().requestTool(message, new Handler(), tools);
}

function sendCommandResponse (player, message, console) {
	api.sendMessage(player, message, console ? MesType.CONSOLE : MesType.GAME);
}

function requestConfirm (player, message, onConfirm) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value == 1) {
				onConfirm();
			}
		}
	});	
	api.requestMulti(player, message, ["Yes", "No"], [0, 1], new Handler());	
}

function requestMulti (player, message, options, responses, onSelect) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			var response = value;
			if (responses !== undefined) {
				response = responses[value-1];
			}
			onSelect(response);
		}
	});
	
	api.requestMulti(player, message, options, responses, new Handler());
}

function defaultOpHeldUseHandler (player, args) {
	if (api.isAdmin(player)) {
		api.sendMessage(player, "Unhandled item use: item="+args.item+", slot="+args.slot+", useitem="+args.useitem+", useslot="+args.useslot)
	} else {
		api.sendMessage(player, "Nothing interesting happens.");
	}	
}

function addBonusExperience (player, skill, xpToAdd) {
	xpToAdd *= 10;//Make the decimal fit
	switch (skill) {
	case Stat.ATTACK:
		api.incrementVarp(player, 3304, xpToAdd);
		return;
	case Stat.DEFENCE:
		api.incrementVarp(player, 3306, xpToAdd);
		return;
	case Stat.STRENGTH:
		api.incrementVarp(player, 3305, xpToAdd);
		return;
	case Stat.CONSTITUTION:
		api.incrementVarp(player, 3324, xpToAdd);
		return;
	case Stat.RANGED:
		api.incrementVarp(player, 3308, xpToAdd);
		return;
	case Stat.PRAYER:
		api.incrementVarp(player, 2850, xpToAdd);
		return;
	case Stat.MAGIC:
		api.incrementVarp(player, 3307, xpToAdd);
		return;
	case Stat.COOKING:
		api.incrementVarp(player, 3317, xpToAdd);
		return;
	case Stat.WOODCUTTING:
		api.incrementVarp(player, 3313, xpToAdd);
		return;
	case Stat.FLETCHING:
		api.incrementVarp(player, 3326, xpToAdd);
		return;
	case Stat.FISHING:
		api.incrementVarp(player, 3316, xpToAdd);
		return;
	case Stat.FIREMAKING:
		api.incrementVarp(player, 3315, xpToAdd);
		return;
	case Stat.CRAFTING:
		api.incrementVarp(player, 3312, xpToAdd);
		return;
	case Stat.SMITHING:
		api.incrementVarp(player, 3311, xpToAdd);
		return;
	case Stat.MINING:
		api.incrementVarp(player, 3310, xpToAdd);
		return;
	case Stat.HERBLORE:
		api.incrementVarp(player, 3327, xpToAdd);
		return;
	case Stat.AGILITY:
		api.incrementVarp(player, 3325, xpToAdd);
		return;
	case Stat.THIEVING:
		api.incrementVarp(player, 3322, xpToAdd);
		return;
	case Stat.SLAYER:
		api.incrementVarp(player, 3319, xpToAdd);
		return;
	case Stat.FARMING:
		api.incrementVarp(player, 3314, xpToAdd);
		return;
	case Stat.RUNECRAFTING:
		api.incrementVarp(player, 3320, xpToAdd);
		return;
	case Stat.HUNTER:
		api.incrementVarp(player, 3321, xpToAdd);
		return;
	case Stat.CONSTRUCTION:
		api.incrementVarp(player, 3323, xpToAdd);
		return;
	case Stat.SUMMONING:
		api.incrementVarp(player, 3309, xpToAdd);
		return;
	case Stat.DUNGEONEERING:
		api.incrementVarp(player, 3318, xpToAdd);
		return;
	case Stat.DIVINATION:
		api.incrementVarp(player, 3836, xpToAdd);
		return;
	}
}