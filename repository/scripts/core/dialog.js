/**
 * Module for chatbox dialog-related functions
 */
/* globals Java, ENGINE, api*/
var widget = require('./widget');
var config = require('./config');

module.exports = init();

function init () {
	var dialog = {
		requestCount : requestCount,
		requestName : requestName,
		requestString : requestString,
		requestItem : requestItem,
		requestConfirm : requestConfirm,
		requestMulti : requestMulti,
		mesbox : mesbox,
		chatplayer : chatplayer,
		chatnpc : chatnpc,
		chatobj : chatobj,
		multi2 : multi2,
		multi3 : multi3,
		multi4 : multi4,
		multi5 : multi5,
		setHslHandler : setHslHandler,
		finish : finishDialog
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
		ENGINE.runClientScript(player, 108, [message]);
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
		ENGINE.runClientScript(player, 109, [message]);
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
		ENGINE.runClientScript(player, 110, [message]);
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
		ENGINE.runClientScript(player, 8178, []);
		ENGINE.runClientScript(player, 570, [message]);
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
		widget.setText(player, 1186, 2, message);
		widget.hide(player, 1186, 3, false);
		widget.openOverlaySub(player, 1006, 1186, false);
		ENGINE.runClientScript(player, 8178, []);
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
			npc = api.getId(npc);
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
			obj = api.getId(obj);
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
	
	function setHslHandler (player, onSelect) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				onSelect(value);
			}
		});
		api.setInputHandler(player, new Handler());
	}

	function finishDialog(player) {
		widget.closeAll(player);
	}

	function openModalBase (player) {
		widget.open(player, 1477, 521, 1418, true);
		widget.open(player, 1418, 1, 1469, true);
	}
}