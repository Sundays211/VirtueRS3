/**
 * Copyright (c) 2014 Virtue Studios
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
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import _config from 'engine/config';
import { varbit, setVarBit, setVarp, setVarc } from 'engine/var';

import { defaultHandler } from 'shared/util';
import { setWidgetEvents, openWidget } from 'shared/widget';
import { sendDebugMessage } from 'shared/chat';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 19/11/2014
 */
_events.bindEventListener(EventType.IF_OPEN, 1442, (ctx) => {
	setWidgetEvents(ctx.player, 1442, 133, 0, _config.enumSize(9616), 2);
});

_events.bindEventListener(EventType.IF_BUTTON, 1442, (ctx) => {
	var player = ctx.player;
	var enabled;
	switch (ctx.component) {
		case 9://Toggle slim headers
			var slim = varbit(player, 19924) == 1;
			setVarBit(player, 19924, slim ? 0 : 1);
			return;
		case 15://Hide title bars when locked
			var hide = varbit(player, 19928) == 1;
			setVarBit(player, 19928, hide ? 0 : 1);
			return;
		case 21://Lock interfaces
			var locked = varbit(player, 19925) == 1;
			setVarBit(player, 19925, locked ? 0 : 1);
			return;
		case 61://Show target information
			enabled = varbit(player, 19927) == 1;
			setVarBit(player, 19927, enabled ? 0 : 1);
			return;
		case 67://Show target reticules
			enabled = varbit(player, 19929) == 1;
			setVarBit(player, 19929, enabled ? 0 : 1);
			return;
		case 73://Task complete pop-ups
			//possibly varc 1429?
			sendDebugMessage(player, "Unhandled task complete pop-ups toggle");
			return;
		case 79://Task information windows
			enabled = varbit(player, 3568) == 1;
			setVarBit(player, 3568, enabled ? 0 : 1);
			return;
		case 84://Xp popups
			enabled = varbit(player, 228) == 1;
			setVarBit(player, 228, enabled ? 0 : 1);
			return;
		case 90://Make-x progress window
			enabled = varbit(player, 3034) == 1;
			setVarBit(player, 3034, enabled ? 0 : 1);
			return;
		case 97://Ability cooldown timer
			enabled = varbit(player, 25401) == 1;
			setVarBit(player, 25401, enabled ? 0 : 1);
			return;
		case 110://Skill target based xp pop-ups
			enabled = varbit(player, 26632) == 1;
			setVarBit(player, 26632, enabled ? 0 : 1);
			return;
		case 122://Reset timers on game clock
			enabled = varbit(player, 27160) == 1;
			setVarBit(player, 27160, enabled ? 0 : 1);
			return;
		case 133://Open edit mode
			setVarc(player, 2911, -1);
			//api.runClientScript(player, 187, [5, 1]);
			setVarp(player, 659, 65537790);
			openWidget(player, 1477, 506, 1475, false);
			setWidgetEvents(player, 1475, 68, 2, 7, 2);
			return;
		case 146://Favourites clock alarm
			enabled = varbit(player, 27171) == 1;
			setVarBit(player, 27171, enabled ? 0 : 1);
			return;
		case 155://Slayer counter
			enabled = varbit(player, 28385) == 1;
			setVarBit(player, 28385, enabled ? 0 : 1);
			return;
		/*case 30://Reduce transparency
		case 46://Increase transparency
		case 114://Utc clock settings
		case 160://Upper-left mouseover text
		case 165://Mouseover text*/
		default:
			defaultHandler(ctx, "interface settings");
			return;
	}
});
