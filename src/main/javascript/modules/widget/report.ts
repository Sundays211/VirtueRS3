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
import _config from "engine/config";
import { setVarc, varbit, setVarBit } from 'engine/var';

import { runClientScript, defaultHandler } from 'shared/util';
import { sendMessage } from 'shared/chat';
import { setWidgetEvents, hideWidget, openCentralWidget, closeAllWidgets } from 'shared/widget';

_events.bindEventListener(EventType.IF_BUTTON, 1405, (ctx) => {//Bug report
	switch (ctx.component) {
		case 47://Selected main category
			setVarBit(ctx.player, 18336, ctx.slot * 10);
			var subCats = _config.enumValue(7427, ctx.slot) as number;
			if (subCats == -1) {
				setVarBit(ctx.player, 18337, ctx.slot * 10);
			} else {
				var size = _config.enumSize(subCats);
				setWidgetEvents(ctx.player, 1405, 61, 0, size, 2);
				setVarBit(ctx.player, 18337, 0);
			}
			return;
		case 61://Select sub category
			if (ctx.slot !== 0) {
				setVarBit(ctx.player, 18337, varbit(ctx.player, 18336) + ctx.slot);
			}
			return;
		case 91://Submit button.
			return;
		default:
			defaultHandler(ctx, "report");
			return;
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1406, (ctx) => {
	switch (ctx.component) {
		case 16://Report player
			sendMessage(ctx.player, "Player reporting is not yet available.");
			closeAllWidgets(ctx.player);
			//widget.openCentral(ctx.player, 594, false);
			return;
		case 24://Report bug
			openCentralWidget(ctx.player, 1405, false);
			return;
		default:
			defaultHandler(ctx, "report");
			return;
	}
});

_events.bindEventListener(EventType.IF_CLOSE, 1405, (ctx) => {//Bug report
	setVarBit(ctx.player, 18336, 0);
	setVarBit(ctx.player, 18337, 0);
});

_events.bindEventListener(EventType.IF_OPEN, 594, (ctx) => {//Player report
	setVarc(ctx.player, 2578, "");
	hideWidget(ctx.player, 594, 18, false);//Set interface hidden: if=594, comp=18, hidden=0
	setVarc(ctx.player, 790, 1);//Received varc: key=790, value=1
	setVarc(ctx.player, 2579, "[My name]");
	hideWidget(ctx.player, 594, 38, false);//Mute option on first screen
	hideWidget(ctx.player, 594, 9, false);//Mute option on second screen
	hideWidget(ctx.player, 594, 28, false);//Another mute option
	runClientScript(ctx.player, 7674, []);
});

_events.bindEventListener(EventType.IF_OPEN, 1405, (ctx) => {//Bug report
	setVarc(ctx.player, 2911, -1);
	runClientScript(ctx.player, 187, [1, 4]);
	runClientScript(ctx.player, 7657, []);
	setWidgetEvents(ctx.player, 1405, 47, 0, 10, 2);//Category select
});
