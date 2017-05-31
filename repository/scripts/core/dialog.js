/**
 * Module for chatbox dialog-related functions
 */
/* globals Java, ENGINE */
var varp = require('./var/player');
var varc = require('./var/client');

var widget = require('../widget');
var config = require('./config');
var util = require('./util');

module.exports = init();

function init () {
	var dialog = {
		requestCount : requestCount,
		requestName : requestName,
		requestString : requestString,
		requestItem : requestItem,
		requestConfirm : requestConfirm,
		requestMulti : requestMulti,
		requestTool : requestTool,
		mesbox : mesbox,
		chatplayer : chatplayer,
		chatnpc : chatnpc,
		chatobj : chatobj,
		multi2 : multi2,
		multi3 : multi3,
		multi4 : multi4,
		multi5 : multi5,
		setResumeHandler : setResumeHandler,
		finish : finishDialog,
		openModalBase : openModalBase
	};
	
	return dialog;

	function requestCount (player, message, callback) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (value > 0) {
					callback(value);
				}
			}
		});	
		openModalBase(player);
		util.runClientScript(player, 108, [message]);
		ENGINE.setInputHandler(player, new Handler());
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
		util.runClientScript(player, 109, [message]);
		ENGINE.setInputHandler(player, new Handler());
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
		util.runClientScript(player, 110, [message]);
		ENGINE.setInputHandler(player, new Handler());
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
		widget.open(player, 1477, 521, 1418, true);
		widget.open(player, 1418, 1, 389, true);
		util.runClientScript(player, 8178, []);
		util.runClientScript(player, 570, [message]);
		ENGINE.setInputHandler(player, new Handler());
	}

	function requestConfirm (player, message, onConfirm) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (value == 1) {
					onConfirm();
				}
			}
		});	
		ENGINE.requestMulti(player, message, ["Yes", "No"], [0, 1], new Handler());	
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
		
		ENGINE.requestMulti(player, message, options, responses, new Handler());
	}

	function mesbox (player, message, callback) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (callback !== undefined) {
					callback();
				}
			}
		});
		widget.setText(player, 1186, 2, message);
		widget.hide(player, 1186, 3, false);
		widget.openOverlaySub(player, 1006, 1186, false);
		util.runClientScript(player, 8178, []);
		ENGINE.setInputHandler(player, new Handler());
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
		ENGINE.setInputHandler(player, new Handler());
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
			npc = util.getId(npc);
		}
		player.getDialogs().sendNpcChat(message, npc);
		ENGINE.setInputHandler(player, new Handler());
	}

	function chatobj (player, obj, message, callback) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (callback !== undefined) {
					callback();
				}			
			}
		});
		if (typeof(npc) !== "number") {
			obj = util.getId(obj);
		}
		widget.setText(player, 1184, 11, config.objName(obj));
		widget.setObject(player, 1184, 2, obj, 1);
		widget.setText(player, 1184, 9, message);
		widget.openOverlaySub(player, 1006, 1184);
		ENGINE.setInputHandler(player, new Handler());
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
		
		ENGINE.requestMulti(player, message, [op1, op2], [1, 2], new Handler());
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
		
		ENGINE.requestMulti(player, message, [op1, op2, op3], [1, 2, 3], new Handler());
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
		
		ENGINE.requestMulti(player, message, [op1, op2, op3, op4], [1, 2, 3, 4], new Handler());
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
		
		ENGINE.requestMulti(player, message, [op1, op2, op3, op4, op5], [1, 2, 3, 4, 5], new Handler());
	}
	
	function setResumeHandler (player, onSelect) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				onSelect(value);
			}
		});
		ENGINE.setInputHandler(player, new Handler());
	}

	function finishDialog(player) {
		widget.closeAll(player);
	}

	function openModalBase (player) {
		widget.open(player, 1477, 521, 1418, true);
		widget.open(player, 1418, 1, 1469, true);
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
		};
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
					ENGINE.sendMessage(player, "Invalid component: "+comp);
					return;
				}
				var toolID = toolForSlot(toolSlot);
				ENGINE.sendMessage(player, "Selected tool: "+toolID);
				callback(toolID);
			}
		});
		varp(player, 1104, 1511);//TODO: Find out what these four varps are for...
		varp(player, 1106, -1);
		varp(player, 1105, 19);
		varp(player, 1106, -1);
		widget.setText(player, 1179, 0, message);
		varc(player, 1703, toolForSlot(0));
		varc(player, 1704, toolForSlot(1));
		varc(player, 1705, toolForSlot(2));
		varc(player, 1706, toolForSlot(3));
		varc(player, 1707, toolForSlot(4));
		varc(player, 1708, toolForSlot(5));
		varc(player, 1709, toolForSlot(6));
		varc(player, 1710, toolForSlot(7));
		varc(player, 1711, toolForSlot(8));
		varc(player, 1712, toolForSlot(9));
		varc(player, 1713, toolForSlot(10));
		util.runClientScript(player, 8178, []);
		widget.openCentral(player, 1179, false);
		ENGINE.setInputHandler(player, new Handler());
	}
}