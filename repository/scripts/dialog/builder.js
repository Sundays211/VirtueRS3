/**
 * Module for chatbox dialog-related functions
 */
/* globals Java, ENGINE */
var widget = require('../widget');
var config = require('../core/config');
var util = require('../core/util');

var common = require('./common');

module.exports = function (player) {
	var dialog = {
		chatplayer : chatplayer,
		chatnpc : chatnpc,
		mesbox : mesbox,
		objbox : objbox,
		then : then,
		finish : finish,
		requestCount : requestCount,
		requestName : requestName,
		requestString : requestString,
		requestItem : requestItem,
		confirm : requestConfirm,
		multi2 : multi2,
		multi3 : multi3,
		multi4 : multi4,
		multi5 : multi5
	};
	
	var flow = [];
	
	var nextHandler;

	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (nextHandler) {
				nextHandler(value);
				nextHandler = null;
			}
			var callback = flow.pop();
			while (callback) {
				//Run the callback. If it returns true, reset the resume handler.
				//If false, process the next callback.
				callback = callback(value) ? undefined : flow.pop();
			}
			if (flow.length > 0) {
				//If there are remaining items, set the handler for the next ones
				ENGINE.setInputHandler(player, new Handler());
			}
		}
	});
	
	var futureStep = false;
	
	function pushStep (step) {
		if (!futureStep) {
			if (step()) {
				futureStep = true;
				ENGINE.setInputHandler(player, new Handler());
			}
		} else {
			flow.push(step);
		}
	}
	
	return dialog;
	
	function chatplayer (message) {
		pushStep(function () {
			//TODO: Remove this from the game engine & replace here
			player.getDialogs().sendPlayerChat(message);
			return true;
		});
		return dialog;
	}

	function chatnpc (npc, message) {
		npc = typeof(npc) !== "number" ? util.getId(npc) : npc;
		pushStep(function () {
			//TODO: Remove this from the game engine & replace here
			player.getDialogs().sendNpcChat(message, npc);
			return true;
		});
		return dialog;
	}

	function mesbox (message) {
		pushStep(function () {
			widget.setText(player, 1186, 2, message);
			widget.hide(player, 1186, 3, false);
			widget.openOverlaySub(player, 1006, 1186, false);
			util.runClientScript(player, 8178, []);
			return true;
		});
		return dialog;
	}

	function objbox (obj, message) {
		obj = typeof(obj) !== "number" ? util.getId(obj) : obj;
		pushStep(function () {
			widget.setText(player, 1184, 11, config.objName(obj));
			widget.setObject(player, 1184, 2, obj, 1);
			widget.setText(player, 1184, 9, message);
			widget.openOverlaySub(player, 1006, 1184);
			return true;
		});
		return dialog;
	}
	
	/**
	 * Add a custom callback to the dialog flow.
	 * If the proceeding dialog frame returned a value, it will be provided to the callback.
	 * If the callback returns true, the dialog will wait for a response from the player
	 * If it returns false, the dialog will continue to run the next function in the flow immediately
	 * @param callback The function to run. 
	 * @return A continuing dialog segment
	 */
	function then (callback) {
		pushStep(callback);
		return dialog;
	}

	/**
	 * Finishes the dialog, closing all dialog windows (and any other open windows)
	 */
	function finish() {
		pushStep(closeDialog);
	}

	/**
	 * Asks the player to enter a number.
	 * The number they enter will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	function requestCount (message) {
		pushStep(function () {
			common.openModalBase(player);
			util.runClientScript(player, 108, [message]);
			nextHandler = checkForCancel;
			return true;
		});
		return dialog;
	}

	/**
	 * Asks the player to enter a name.
	 * The name they enter will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	function requestName (message) {
		pushStep(function () {
			common.openModalBase(player);
			util.runClientScript(player, 109, [message]);
			nextHandler = checkForCancel;
			return true;
		});
		return dialog;
	}

	/**
	 * Asks the player to enter a string
	 * The string they enter will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	function requestString (message) {
		pushStep(function () {
			common.openModalBase(player);
			util.runClientScript(player, 110, [message]);
			nextHandler = checkForCancel;
			return true;
		});
		return dialog;
	}

	/**
	 * Asks the player to select an item
	 * The item they choose will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	function requestItem (message) {
		pushStep(function () {
			widget.open(player, 1477, 521, 1418, true);
			widget.open(player, 1418, 1, 389, true);
			util.runClientScript(player, 8178, []);
			util.runClientScript(player, 570, [message]);
			nextHandler = checkForCancel;
			return true;
		});
		return dialog;
	}

	/**
	 * Sends a Yes/No question dialog to the player. 
	 * If they select "Yes", continue to the next dialog segment.
	 * If they select "No", finish the dialog
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	function requestConfirm (message) {
		pushStep(function () {
			ENGINE.requestMulti(player, message, ["Yes", "No"], [0, 1], new Handler());
			nextHandler = checkForCancel;
			return true;
		});
		return dialog;
	}
	
	function multi2 (message, op1, op1callback, op2, op2callback) {
		pushStep(function () {
			ENGINE.requestMulti(player, message, [op1, op2], [1, 2], new Handler());
			nextHandler = multiChoiceHandler(op1callback, op2callback);
			return true;
		});
	}

	function multi3 (message, op1, op1callback, op2, op2callback, op3, op3callback) {
		pushStep(function () {
			ENGINE.requestMulti(player, message, [op1, op2, op3], [1, 2, 3], new Handler());
			nextHandler = multiChoiceHandler(op1callback, op2callback, op3callback);
			return true;
		});
	}

	function multi4 (message, op1, op1callback, op2, op2callback, op3, op3callback, op4, op4callback) {
		pushStep(function () {
			ENGINE.requestMulti(player, message, [op1, op2, op3, op4], [1, 2, 3, 4], new Handler());
			nextHandler = multiChoiceHandler(op1callback, op2callback, op3callback, op4callback);
			return true;
		});
	}

	function multi5 (player, message, op1, op1callback, op2, op2callback, op3, op3callback, op4, op4callback, op5, op5callback) {
		pushStep(function () {
			ENGINE.requestMulti(player, message, [op1, op2, op3, op4, op5], [1, 2, 3, 4, 5], new Handler());
			nextHandler = multiChoiceHandler(op1callback, op2callback, op3callback, op4callback, op5callback);
			return true;
		});
	}
	
	function closeDialog () {
		widget.closeAll(player);
	}

	/**
	 * Checks if the provided value is falsy (0 or an empty string)
	 * If so, close the dialog
	 */
	function checkForCancel (value) {
		if (!value) {
			//Clear the remaining queue and close the dialog
			flow.length = 0;
			closeDialog();
		}
	}
	
	function multiChoiceHandler (op1callback, op2callback, op3callback, op4callback, op5callback) {
		return function (value) {
			if (value == 1 && op1callback) {
				op1callback();
			} else if (value == 2 && op2callback) {
				op2callback();
			} else if (value == 3 && op3callback) {
				op3callback();
			} else if (value == 4 && op4callback) {
				op4callback();
			} else if (value == 5 && op5callback) {
				op5callback();
			}
		};
	}
};
