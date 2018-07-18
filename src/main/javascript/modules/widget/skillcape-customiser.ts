/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { varbit, setVarBit, setVarp } from 'engine/var';
import { Player } from 'engine/models';

import { closeAllWidgets, openCentralWidget } from 'shared/widget';
import { defaultHandler } from 'shared/util';
import { sendDebugMessage } from 'shared/chat';
import { setResumeHandler } from 'shared/dialog';

_events.bindEventListener(EventType.IF_BUTTON, 20, (ctx) => {
	var player = ctx.player;
	switch (ctx.component) {
		case 10://Colour 1
			selectCapeColour(player, 1);
			return;
		case 7://Colour 2
			selectCapeColour(player, 2);
			return;
		case 4://Colour 3
			selectCapeColour(player, 3);
			return;
		case 1://Colour 4
			selectCapeColour(player, 4);
			return;
		case 33://Change col1 to col2
			copyCapeColour(player, 2, 1);
			return;
		case 35://Change col1 to col3
			copyCapeColour(player, 3, 1);
			return;
		case 37://Change col1 to col4
			copyCapeColour(player, 4, 1);
			return;
		case 53://Change col2 to col1
			copyCapeColour(player, 1, 2);
			return;
		case 55://Change col2 to col3
			copyCapeColour(player, 3, 2);
			return;
		case 57://Change col2 to col4
			copyCapeColour(player, 4, 2);
			return;
		case 67://Change col3 to col1
			copyCapeColour(player, 1, 3);
			return;
		case 69://Change col3 to col2
			copyCapeColour(player, 2, 3);
			return;
		case 71://Change col3 to col4
			copyCapeColour(player, 4, 3);
			return;
		case 81://Change col4 to col1
			copyCapeColour(player, 1, 4);
			return;
		case 83://Change col4 to col2
			copyCapeColour(player, 2, 4);
			return;
		case 85://Change col4 to col3
			copyCapeColour(player, 3, 4);
			return;
		case 111://Done
			closeAllWidgets(player);
			return;
		case 101://Close button
			return;
		case 153://Save as preset 1
			handlePreset(player, 1, true);
			return;
		case 160://Save as preset 2
			handlePreset(player, 2, true);
			return;
		case 167://Save as preset 3
			handlePreset(player, 3, true);
			return;
		case 174://Load preset 1
			handlePreset(player, 1, false);
			return;
		case 181://Load preset 2
			handlePreset(player, 2, false);
			return;
		case 188://Load preset 3
			handlePreset(player, 3, false);
			return;
		default:
			defaultHandler(ctx, "skillcape-customiser");
	}
	return;
});

_events.bindEventListener(EventType.IF_CLOSE, 20, (ctx) => {
	ENGINE.refreshEquipment(ctx.player);
});

function selectCapeColour(player: Player, type: number) {
	var prevColour;
	switch (type) {
		case 1:
			prevColour = varbit(player, 1039);
			break;
		case 2:
			prevColour = varbit(player, 1040);
			break;
		case 3:
			prevColour = varbit(player, 1041);
			break;
		case 4:
			prevColour = varbit(player, 1042);
			break;
	}
	setVarp(player, 426, prevColour);
	openCentralWidget(player, 19, false);
	setResumeHandler(player, (value) => {
		closeAllWidgets(player);
		//print(value+"\n");
		if (value != 65535) {
			switch (type) {
				case 1:
					setVarBit(player, 1039, value as number);
					break;
				case 2:
					setVarBit(player, 1040, value as number);
					break;
				case 3:
					setVarBit(player, 1041, value as number);
					break;
				case 4:
					setVarBit(player, 1042, value as number);
					break;
			}
		}
		player.getEquipment().refresh(true);
		openCentralWidget(player, 20, false);
	});
}

function copyCapeColour(player: Player, fromType: number, toType: number) {
	var colour;
	switch (fromType) {
		case 1:
			colour = varbit(player, 1039);
			break;
		case 2:
			colour = varbit(player, 1040);
			break;
		case 3:
			colour = varbit(player, 1041);
			break;
		case 4:
			colour = varbit(player, 1042);
			break;
	}
	switch (toType) {
		case 1:
			setVarBit(player, 1039, colour);
			break;
		case 2:
			setVarBit(player, 1040, colour);
			break;
		case 3:
			setVarBit(player, 1041, colour);
			break;
		case 4:
			setVarBit(player, 1042, colour);
			break;
	}
}

function handlePreset(player: Player, preset: number, isSave: boolean) {
	setResumeHandler(player, (value) => {
		if (((value as number) & 0xffff) === 211) {//Confirm
			if (isSave) {
				savePreset(player, preset);
			} else {
				loadPreset(player, preset);
			}
		}
		openCentralWidget(player, 20, false);
	});
}

function savePreset(player: Player, preset: number) {
	sendDebugMessage(player, "Saving preset " + preset);
	var col1 = varbit(player, 1039);
	var col2 = varbit(player, 1040);
	var col3 = varbit(player, 1041);
	var col4 = varbit(player, 1042);
	switch (preset) {
		case 1:
			setVarBit(player, 25814, col1);
			setVarBit(player, 25815, col2);
			setVarBit(player, 25816, col3);
			setVarBit(player, 25817, col4);
			break;
		case 2:
			setVarBit(player, 25818, col1);
			setVarBit(player, 25819, col2);
			setVarBit(player, 25820, col3);
			setVarBit(player, 25821, col4);
			break;
		case 3:
			setVarBit(player, 25822, col1);
			setVarBit(player, 25823, col2);
			setVarBit(player, 25824, col3);
			setVarBit(player, 25825, col4);
			break;
	}
}

function loadPreset(player: Player, preset: number) {
	sendDebugMessage(player, "Loading preset " + preset);
	var col1, col2, col3, col4;
	switch (preset) {
		case 1:
			col1 = varbit(player, 25814);
			col2 = varbit(player, 25815);
			col3 = varbit(player, 25816);
			col4 = varbit(player, 25817);
			break;
		case 2:
			col1 = varbit(player, 25818);
			col2 = varbit(player, 25819);
			col3 = varbit(player, 25820);
			col4 = varbit(player, 25821);
			break;
		case 3:
			col1 = varbit(player, 25822);
			col2 = varbit(player, 25823);
			col3 = varbit(player, 25824);
			col4 = varbit(player, 25825);
			break;
		default:
			return;
	}
	setVarBit(player, 1039, col1);
	setVarBit(player, 1040, col2);
	setVarBit(player, 1041, col3);
	setVarBit(player, 1042, col4);
}
