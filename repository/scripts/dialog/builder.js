/**
 * Module for chatbox dialog-related functions
 */
/* globals Java, ENGINE */
var varp = require('./var/player');
var varc = require('./var/client');

var widget = require('../widget');
var config = require('./config');
var util = require('./util');

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
		confirm : requestConfirm
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
	
	return dialog;
	
	function chatplayer (message) {
		flow.push(function () {
			//TODO: Remove this from the game engine & replace here
			player.getDialogs().sendPlayerChat(message);
			return true;
		});
		return dialog;
	}

	function chatnpc (npc, message) {
		npc = typeof(npc) !== "number" ? util.getId(npc) : npc;
		flow.push(function () {
			//TODO: Remove this from the game engine & replace here
			player.getDialogs().sendNpcChat(message, npc);
			return true;
		});
		return dialog;
	}

	function mesbox (message) {
		flow.push(function () {
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
		flow.push(function () {
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
		flow.push(callback);
		return dialog;
	}

	/**
	 * Finishes the dialog, closing all dialog windows (and any other open windows)
	 */
	function finish() {
		flow.push(closeDialog);
	}

	/**
	 * Asks the player to enter a number.
	 * The number they enter will be provided to the next dialog segment
	 * @param message The message to ask
	 * @return A continuing dialog segment
	 */
	function requestCount (message) {
		flow.push(function () {
			openModalBase(player);
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
		flow.push(function () {
			openModalBase(player);
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
		flow.push(function () {
			openModalBase(player);
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
		flow.push(function () {
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
		flow.push(function () {
			ENGINE.requestMulti(player, message, ["Yes", "No"], [0, 1], new Handler());
			nextHandler = checkForCancel;
			return true;
		});
	}

	function openModalBase (player) {
		widget.open(player, 1477, 521, 1418, true);
		widget.open(player, 1418, 1, 1469, true);
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
};
