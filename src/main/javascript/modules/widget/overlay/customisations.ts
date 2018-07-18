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
import _config from 'engine/config';
import _player from 'engine/player';
import { varbit, setVarp, setVarc, setVarBit } from 'engine/var';
import { Player } from 'engine/models';
import { setWidgetEvents, hideWidget } from 'shared/widget';
import { runClientScript, defaultHandler } from 'shared/util';
import { sendDebugMessage } from 'shared/chat';

_events.bindEventListener(EventType.IF_OPEN, 1311, (ctx) => {
	var player = ctx.player;
	ENGINE.startStyleEdit(player);
	setVarc(player, 2017, _player.getBaseColour(player, 0));//Primary hair colour
	setVarc(player, 2018, 0);//Secondary hair colour
	setVarp(player, 261, _player.getBaseKit(player, 0));//Current hair style
	setVarp(player, 262, _player.getBaseKit(player, 1));//Current facial hair style
	setVarp(player, 779, 1426);
	setVarc(player, 2699, -1);
	setWidgetEvents(player, 1311, 83, 0, 3030, 14);
	setWidgetEvents(player, 1311, 138, 0, 3030, 14);
	setWidgetEvents(player, 1311, 139, 0, 3030, 14);
	setWidgetEvents(player, 1311, 140, 0, 3030, 14);
	setWidgetEvents(player, 1311, 141, 0, 3030, 14);
	setWidgetEvents(player, 1311, 142, 0, 3030, 14);
	setWidgetEvents(player, 1311, 143, 0, 3030, 14);
	setWidgetEvents(player, 1311, 144, 0, 3030, 14);
	setWidgetEvents(player, 1311, 145, 0, 3030, 14);
	setWidgetEvents(player, 1311, 146, 0, 3030, 14);
	setWidgetEvents(player, 1311, 147, 0, 3030, 14);
	setWidgetEvents(player, 1311, 148, 0, 3030, 14);
	setWidgetEvents(player, 1311, 149, 0, 3030, 14);
	setWidgetEvents(player, 1311, 150, 0, 3030, 14);
	setWidgetEvents(player, 1311, 151, 0, 3030, 14);
	setWidgetEvents(player, 1311, 152, 0, 3030, 14);
	setWidgetEvents(player, 1311, 153, 0, 3030, 14);
	setWidgetEvents(player, 1311, 154, 0, 3030, 14);
	setWidgetEvents(player, 1311, 155, 0, 3030, 14);
	setWidgetEvents(player, 1311, 156, 0, 3030, 14);
	setWidgetEvents(player, 1311, 157, 0, 3030, 14);
	setWidgetEvents(player, 1311, 158, 0, 3030, 14);
	setWidgetEvents(player, 1311, 233, 0, 3, 2);
	setWidgetEvents(player, 1311, 216, 0, 204, 6);//Colours?
	setWidgetEvents(player, 1311, 455, 0, 127, 2);//Pet name
	setWidgetEvents(player, 1311, 525, 0, 4, 2);
	runClientScript(player, 6874, []);
	hideWidget(player, 1311, 190, true);
});

_events.bindEventListener(EventType.IF_BUTTON, 1311, (ctx) => {
	var player = ctx.player;
	switch (ctx.component) {
		case 515://Show all items/Show owned items
			const enabled = varbit(ctx.player, 678) === 1;
			setVarBit(ctx.player, 678, enabled ? 0 : 1);
			return;
		case 92://Apply
			applyCustomStyles(player);
			return;
		case 1:
		case 2:
		case 4:
		case 5:
			defaultHandler(ctx, "customisations");
			return;
		case 216://Set colour
			return setHairColour(player, ctx.slot);
		default:
			var handled = processOption(player, ctx.component, ctx.slot, ctx.button);
			if (!handled) {
				defaultHandler(ctx, "customisations");
			}
			return;
	}
});

_events.bindEventListener(EventType.IF_CLOSE, 1311, (ctx) => {
	ENGINE.clearStyleEdit(ctx.player);
});

function processOption(player: Player, component: number, slot: number, button: number) {
	var optionType = -1;
	for (var i = 0; i < _config.enumSize(5961); i++) {
		if (component === ((_config.enumValue(5961, i) as number) & 0xffff)) {
			optionType = i;
			break;
		}
	}
	if (optionType == -1) {
		return false;
	}
	switch (varbit(player, 673)) {
		case 1:
			return handleHairstyleOption(player, optionType, slot / 3, button);
		default:
			return false;
	}
}

function handleHairstyleOption(player: Player, type: number, slot: number, button: number) {
	switch (type) {
		case 1://Set hairstyle
			var enumID = ENGINE.isFemale(player) ? 2341 : 2338;
			var hairstyleStructId = _config.enumValue(enumID, slot);
			setHairstyle(player, ENGINE.getStructParam(hairstyleStructId, 788), button !== 2, false);
			return true;
		//case 2://Set beard
		//case 4://Set premium hairstyle
		//case 5://Set premium beard
		default:
			sendDebugMessage(player, "Selected hairstyle option: type=" + type + ", slot=" + slot + ", option=" + button);
			return true;
	}
}

function setHairstyle(player: Player, style: number, isPreview: boolean, isBeard: boolean) {
	ENGINE.setPlayerKit(player, isBeard ? 1 : 0, style);
	if (!isPreview) {
		applyCustomStyles(player);
	} else {
		runClientScript(player, 6453, [-1, ""]);
		runClientScript(player, 6874, []);
		setVarc(player, 1968, 1);
		setVarc(player, 1969, 0);
		hideWidget(player, 1311, 59, false);//440
		hideWidget(player, 1311, 58, true);//Received if hidden: if=1311, comp=396, hide=1
		hideWidget(player, 1311, 155, false);
		runClientScript(player, 6462, []);
	}
}

function setHairColour(player: Player, slot: number) {
	if (varbit(player, 673) !== 1) {
		return false;
	}
	var newColour = _config.enumValue(2345, slot / 2);
	if (newColour !== -1) {
		ENGINE.setPlayerColour(player, 0, newColour);
		setVarc(player, 2017, newColour);
		hideWidget(player, 1311, 59, false);//440
		hideWidget(player, 1311, 58, true);//Received if hidden: if=1311, comp=396, hide=1
		//widget.hide(player, 1311, 155, false);
		runClientScript(player, 6462, []);
	}
	return true;
}

function applyCustomStyles(player: Player) {
	ENGINE.applyPlayerStyles(player);
	setVarp(player, 261, _player.getBaseKit(player, 0));
	setVarp(player, 262, _player.getBaseKit(player, 1));
	setVarp(player, 265, 0);
	runClientScript(player, 6874, []);
	setVarc(player, 1968, 1);
	setVarc(player, 1969, 0);
	runClientScript(player, 2716, [-1]);
	runClientScript(player, 6453, [-1, ""]);
	setVarc(player, 2017, _player.getBaseColour(player, 0));
	setVarc(player, 2018, 0);//Secondary hair colour
	setVarc(player, 779, 2699);
	hideWidget(player, 1311, 155, true);//171
	hideWidget(player, 1311, 59, true);//440
	//Received if hidden: if=1311, comp=415, hide=1
	hideWidget(player, 1311, 58, true);//396
	//Received if hidden: if=1311, comp=347, hide=1
	runClientScript(player, 6462, []);//Refresh the selected option. TODO: Fix this so it works
}
