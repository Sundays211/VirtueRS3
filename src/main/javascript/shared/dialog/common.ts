/**
 * Module for chatbox dialog-related functions
 */
 import { Player } from 'engine/models';
import { setVarp, setVarc } from 'engine/var';

import { openWidget, openCentralWidget, closeAllWidgets, setWidgetText } from 'shared/widget';
import { runClientScript } from 'shared/util';

export function openModalBase (player: Player) {
	openWidget(player, 1477, 521, 1418, true);
	openWidget(player, 1418, 1, 1469, true);
}

export function setResumeHandler (player: Player, onSelect: (value: number | string) => void) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value: number | string) {
			onSelect(value);
		}
	});
	ENGINE.setInputHandler(player, new Handler());
}

export function closeModal (player: Player) {
	closeAllWidgets(player);
}

/**
 * Sends a dialog for the player to select a tool to use
 * @param player The player
 * @param message The message on the dialog
 * @param tools A series of item IDs representing the tools available
 * @param callback The function to run when a tool has been selected
 */
export function requestTool (
	player: Player,
	message: string,
	tools: number[],
	callback: (toolId: number) => void
) {
	var toolForSlot = (slot: number) => {
		return slot < tools.length ? tools[slot] : -1;
	};
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (valueHash: number) {
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
				throw "Invalid component: "+comp;
			}
			var toolID = toolForSlot(toolSlot);
			callback(toolID);
		}
	});
	setVarp(player, 1104, 1511);//TODO: Find out what these four varps are for...
	setVarp(player, 1106, -1);
	setVarp(player, 1105, 19);
	setVarp(player, 1106, -1);
	setWidgetText(player, 1179, 0, message);
	setVarc(player, 1703, toolForSlot(0));
	setVarc(player, 1704, toolForSlot(1));
	setVarc(player, 1705, toolForSlot(2));
	setVarc(player, 1706, toolForSlot(3));
	setVarc(player, 1707, toolForSlot(4));
	setVarc(player, 1708, toolForSlot(5));
	setVarc(player, 1709, toolForSlot(6));
	setVarc(player, 1710, toolForSlot(7));
	setVarc(player, 1711, toolForSlot(8));
	setVarc(player, 1712, toolForSlot(9));
	setVarc(player, 1713, toolForSlot(10));
	runClientScript(player, 8178, []);
	openCentralWidget(player, 1179, false);
	ENGINE.setInputHandler(player, new Handler());
}
