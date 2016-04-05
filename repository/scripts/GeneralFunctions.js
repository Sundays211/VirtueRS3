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

var INTEGER_MAX = 2147483647;

var COINS = 995;

function runAnimation (entity, animId, callback) {
	if (callback == undefined) {
		return api.runAnimation(entity, animId);
	} else {
		var Handler = Java.extend(Java.type('java.lang.Runnable'), {
			run : function () {
				callback();
			}
		});	
		return api.runAnimation(entity, animId, new Handler());
	}
}

/**
 * Runs a function after a delay. This delay is attached to the entity and is interrupted if the entity is stopped
 * @param entity The entity to link the task to
 * @param cycles The number of server cycles before the task is run
 * @param callback The function to run when the specified number of cycles passes
 * @param interruptable True if the task can be interrupted before it's run (such as if the player moves). Defaults to true if not specified
 * @param onInterrupt The function to run if the task is interrupted
 */
function delayFunction (entity, cycles, callback, interruptable, onInterrupt) {
	var Handler = Java.extend(Java.type('java.lang.Runnable'), {
		run : function () {
			callback();
		}
	});	
	if (interruptable === undefined) {
		api.delay(entity, new Handler(), cycles);
	} else {
		var handler = null;
		if (onInterrupt !== undefined) {
			var InterruptHandler = Java.extend(Java.type('java.lang.Runnable'), {
				run : function () {
					onInterrupt();
				}
			});
			handler = new InterruptHandler();
		}		
		api.delay(entity, new Handler(), cycles, interruptable, handler);
	}
}

function inframeInput(player, ifaceId, comp, callback, type, maxlen) {
	api.setVarc(player, 2235, getCompHash(ifaceId, comp));
	api.setVarc(player, 2236, type);
	api.setVarc(player, 2237, maxlen);
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			callback(value);
		}
	});
	api.setInputHandler(player, new Handler());	
}

function openModalBase (player) {
	api.openWidget(player, 1477, 521, 1418, true);
	api.openWidget(player, 1418, 1, 1469, true);
}

function requestCount (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value > 0) {
				callback(value);
			}
		}
	});	
	openModalBase(player);
	api.runClientScript(player, 108, [message]);
	api.setInputHandler(player, new Handler());
}

/**
 * Sends a dialog for the player to enter a name
 * @param player The player
 * @param message The dialog message
 * @param callback The callback to run when the input has been entered
 */
function requestName (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value.length > 0) {
				callback(value);
			}
		}
	});	
	openModalBase(player);
	api.runClientScript(player, 109, [message]);
	api.setInputHandler(player, new Handler());
}

/**
 * Sends a dialog for the player to enter a string
 * @param player The player
 * @param message The dialog message
 * @param callback The callback to run when the input has been entered
 */
function requestString (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value.length > 0) {
				callback(value);
			}
		}
	});	
	openModalBase(player);
	api.runClientScript(player, 110, [message]);
	api.setInputHandler(player, new Handler());
}

/**
 * Sends a dialog for the player to choose an item
 * @param player The player
 * @param message The dialog message
 * @param callback The callback to run when the item has been chosen
 */
function requestItem (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			callback(value);
		}
	});
	api.openWidget(player, 1477, 521, 1418, true);
	api.openWidget(player, 1418, 1, 389, true);
	api.runClientScript(player, 8178, []);
	api.runClientScript(player, 570, [message]);
	api.setInputHandler(player, new Handler());	
}

/**
 * Sends a dialog for the player to select a tool to use
 * @param player The player
 * @param message The message on the dialog
 * @param tools A series of item IDs representing the tools available
 * @param callback The function to run when a tool has been selected
 */
function requestTool (player, message, tools, callback) {
	var toolForSlot = function (slot) {
		return slot < tools.length ? tools[slot] : -1;
	}	
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (valueHash) {
			var toolSlot = -1;
			var comp = valueHash & 0xffff;
			switch (comp) {
			case 17://First tool ID
				toolSlot = 0;
				break;
			case 34://Second tool ID
				toolSlot = 1;
				break;
			case 37://Third tool ID
				toolSlot = 2;
				break;
			case 40://Fourth tool ID
				toolSlot = 3;
				break;
			case 43://Fifth tool ID
				toolSlot = 4;
				break;
			case 46://Sixth tool ID
				toolSlot = 5;
				break;
			case 49://Seventh tool ID
				toolSlot = 6;
				break;
			case 52://Eighth tool ID
				toolSlot = 7;
				break;
			case 55://Ninth tool ID
				toolSlot = 8;
				break;
			case 58://Tenth tool ID
				toolSlot = 9;
				break;
			case 61://Eleventh tool ID
				toolSlot = 10;
				break;
			default:
				api.sendMessage(player, "Invalid component: "+comp);
				return;
			}
			var toolID = toolForSlot(toolSlot);
			api.sendMessage(player, "Selected tool: "+toolID);
			callback(toolID);
		}
	});
	api.setVarp(player, 1104, 1511);//TODO: Find out what these four varps are for...
	api.setVarp(player, 1106, -1);
	api.setVarp(player, 1105, 19);
	api.setVarp(player, 1106, -1);
	api.setWidgetText(player, 1179, 0, message);
	api.setVarc(player, 1703, toolForSlot(0));
	api.setVarc(player, 1704, toolForSlot(1));
	api.setVarc(player, 1705, toolForSlot(2));
	api.setVarc(player, 1706, toolForSlot(3));
	api.setVarc(player, 1707, toolForSlot(4));
	api.setVarc(player, 1708, toolForSlot(5));
	api.setVarc(player, 1709, toolForSlot(6));
	api.setVarc(player, 1710, toolForSlot(7));
	api.setVarc(player, 1711, toolForSlot(8));
	api.setVarc(player, 1712, toolForSlot(9));
	api.setVarc(player, 1713, toolForSlot(10));
	api.runClientScript(player, 8178, []);
	api.openCentralWidget(player, 1179, false);
	api.setInputHandler(player, new Handler());
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

function mesbox (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (callback !== undefined) {
				callback();
			}
		}
	});
	api.setWidgetText(player, 1186, 2, message);
	api.hideWidget(player, 1186, 3, false);
	api.openOverlaySub(player, 1006, 1186, false);
	api.runClientScript(player, 8178, []);
	api.setInputHandler(player, new Handler());
}

function chatplayer (player, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (callback !== undefined) {
				callback();
			}
		}
	});
	player.getDialogs().sendPlayerChat(message);
	api.setInputHandler(player, new Handler());
}

function chatnpc (player, npc, message, callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (callback !== undefined) {
				callback();
			}			
		}
	});
	if (typeof(npc) !== "number") {
		npc = api.getId(npc);
	}
	player.getDialogs().sendNpcChat(message, npc);
	api.setInputHandler(player, new Handler());
}

function multi2 (player, message, op1, op1callback, op2, op2callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value == 1 && op1callback !== undefined) {
				op1callback();
			} else if (value == 2 && op2callback !== undefined) {
				op2callback();
			}
		}
	});
	
	api.requestMulti(player, message, [op1, op2], [1, 2], new Handler());
}

function multi3 (player, message, op1, op1callback, op2, op2callback, op3, op3callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value == 1 && op1callback !== undefined) {
				op1callback();
			} else if (value == 2 && op2callback !== undefined) {
				op2callback();
			} else if (value == 3 && op3callback !== undefined) {
				op3callback();
			}
		}
	});
	
	api.requestMulti(player, message, [op1, op2, op3], [1, 2, 3], new Handler());
}

function multi4 (player, message, op1, op1callback, op2, op2callback, op3, op3callback, op4, op4callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value == 1 && op1callback !== undefined) {
				op1callback();
			} else if (value == 2 && op2callback !== undefined) {
				op2callback();
			} else if (value == 3 && op3callback !== undefined) {
				op3callback();
			} else if (value == 4 && op4callback !== undefined) {
				op4callback();
			}
		}
	});
	
	api.requestMulti(player, message, [op1, op2, op3, op4], [1, 2, 3, 4], new Handler());
}

function multi5 (player, message, op1, op1callback, op2, op2callback, op3, op3callback, op4, op4callback, op5, op5callback) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value == 1 && op1callback !== undefined) {
				op1callback();
			} else if (value == 2 && op2callback !== undefined) {
				op2callback();
			} else if (value == 3 && op3callback !== undefined) {
				op3callback();
			} else if (value == 4 && op4callback !== undefined) {
				op4callback();
			} else if (value == 5 && op5callback !== undefined) {
				op5callback();
			}
		}
	});
	
	api.requestMulti(player, message, [op1, op2, op3, op4, op5], [1, 2, 3, 4, 5], new Handler());
}

function sendCommandResponse (player, message, console) {
	api.sendMessage(player, message, console ? MesType.CONSOLE : MesType.GAME);
}

function getCompHash (iface, comp) {
	return (iface << 16) | comp;
}

function defaultOpHeldUseHandler (player, args) {
	if (api.isAdmin(player)) {
		api.sendMessage(player, "Unhandled item use: item="+args.item+", slot="+args.slot+", useitem="+args.useitem+", useslot="+args.useslot)
	} else {
		api.sendMessage(player, "Nothing interesting happens.");
	}	
}

function testBit (value, bit) {
	return (value & 1 << bit) != 0;
}

function setBit (value, bit) {
	return value | 1 << bit;
}

function unsetBit (value, bit) {
	return value & -1 - (1 << bit);
}

/**
 * Checks whether the addedValue would cause a Java integer overflow if added to currentValue
 * @param currentValue The currently held value
 * @param addedValue The value to add
 * @returns True if an overflow would occur, false otherwise
 */
function checkOverflow (currentValue, addedValue) {
	return (INTEGER_MAX-currentValue)<addedValue;
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
