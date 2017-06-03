/**
 * Module for chatbox dialog-related functions
 */
/* globals Java, ENGINE */
var varp = require('./var/player');
var varc = require('./var/client');

var widget = require('../widget');
var config = require('./config');
var util = require('./util');

module.exports = (function () {
	return {
		openModalBase : openModalBase,
		requestTool : requestTool,
		setResumeHandler : setResumeHandler
	};

	function openModalBase (player) {
		widget.open(player, 1477, 521, 1418, true);
		widget.open(player, 1418, 1, 1469, true);
	}
	
	function setResumeHandler (player, onSelect) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				onSelect(value);
			}
		});
		ENGINE.setInputHandler(player, new Handler());
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
	
})();
