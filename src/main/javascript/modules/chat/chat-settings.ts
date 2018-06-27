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
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import { varp, varbit, setVarp, setVarBit } from 'engine/var';

import { setWidgetEvents } from 'shared/widget';
import { defaultHandler } from 'shared/util';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 20/12/2014
 */
_events.bindEventListener(EventType.IF_BUTTON, 1702, (ctx) => {
	var player = ctx.player;
	var enabled, disabled;
	switch (ctx.component) {
		case 32://Click-through chatboxes
			enabled = varbit(player, 20188) === 1;
			setVarBit(player, 20188, enabled ? 0 : 1);
			return;
		case 36://Timestamps in chatbox
			enabled = varbit(player, 27452) === 1;
			setVarBit(player, 27452, enabled ? 0 : 1);
			return;
		case 40://Split private chat
			enabled = varbit(player, 20187) === 1;
			setVarBit(player, 20187, enabled ? 0 : 1);
			return;
		case 44://Show/hide login/logout notifications
			enabled = varbit(player, 24940) === 1;
			setVarBit(player, 24940, enabled ? 0 : 1);
			return;
		case 48://Hide public chat effects
			enabled = varp(player, 456) === 0;
			setVarp(player, 456, enabled ? 1 : 0);
			return;
		case 58://Public chat colour
			setVarBit(player, 24562, 7);
			setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 62://Friend chat colour
			setVarBit(player, 24562, 0);
			setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 66://Private chat colour
			setVarBit(player, 24562, 1);
			setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 70://Clan chat colour
			setVarBit(player, 24562, 2);
			setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 74://Guest clan chat colour
			setVarBit(player, 24562, 3);
			setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 78://Group chat colour
			setVarBit(player, 24562, 4);
			setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 82://Group team chat colour
			setVarBit(player, 24562, 5);
			setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 86://Twitch chat colour
			setVarBit(player, 24562, 6);
			setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 96:
			var mode = varbit(player, 24562);
			switch (mode) {
				case 0://Friend chat
					setVarBit(player, 1190, ctx.slot);
					return;
				case 1://Private chat
					setVarp(player, 457, ctx.slot);
					return;
				case 2://Clan chat
					setVarBit(player, 1188, ctx.slot);
					return;
				case 3://Guest clan chat
					setVarBit(player, 1191, ctx.slot);
					return;
				case 4://Group chat
					setVarBit(player, 24560, ctx.slot);
					return;
				case 5://Team Group chat
					setVarBit(player, 24561, ctx.slot);
					return;
				case 6://Twitch chat
					setVarBit(player, 21371, ctx.slot);
					return;
				case 7://Public chat
					setVarBit(player, 30165, ctx.slot);
					return;
				default:
					defaultHandler(ctx, "chat mode");
					return;
			}
		case 106://Enable friends chat window
			disabled = varbit(player, 30167) === 1;
			setVarBit(player, 30167, disabled ? 0 : 1);
			return;
		case 111://Enable private chat window
			if (varbit(player, 20187) !== 1) {
				disabled = varbit(player, 30166) === 1;
				setVarBit(player, 30166, disabled ? 0 : 1);
			}
			return;
		case 116://Enable clan chat window
			disabled = varbit(player, 30168) === 1;
			setVarBit(player, 30168, disabled ? 0 : 1);
			return;
		case 121://Enable guest clan chat window
			disabled = varbit(player, 30169) === 1;
			setVarBit(player, 30169, disabled ? 0 : 1);
			return;
		case 126://Enable group chat window
			disabled = varbit(player, 30171) === 1;
			setVarBit(player, 30171, disabled ? 0 : 1);
			return;
		case 131://Enable trade/assist chat window
			disabled = varbit(player, 30170) === 1;
			setVarBit(player, 30170, disabled ? 0 : 1);
			return;
		case 137://Use fullname prefix
			setVarBit(player, 30172, 0);
			return;
		case 141://Use short prefix
			setVarBit(player, 30172, 1);
			return;
		case 145://Use no prefix
			setVarBit(player, 30172, 2);
			return;
		default:
			defaultHandler(ctx, "chat settings");
			return;
	}
});
