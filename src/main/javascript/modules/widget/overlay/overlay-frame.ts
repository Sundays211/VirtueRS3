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
import _events from 'engine/events';
import { EventType } from 'engine/enums';
import { varbit, setVarBit, setVarp } from 'engine/var';

import _component from 'shared/widget/component';
import { defaultHandler } from 'shared/util';
import { openWidget, closeOverlay, setOverlayTab } from 'shared/widget';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
_events.bindEventListener(EventType.IF_BUTTON, 1477, (ctx) => {
	var player = ctx.player;
	switch (ctx.component) {
		case 39://Lock/unlock interfaces
			var locked = varbit(player, 19925) === 1;
			setVarBit(player, 19925, locked ? 0 : 1);
			return;
		case 45://Sheathing (TODO: Find which varp/varbit controls this)
			player.switchSheathing();
			break;
		case 71://Logout
			setVarp(player, 3813, 6);
			openWidget(player, 1477, 853, 26, true);
			return;
		case 496://Overlay tab switch
			switch (ctx.slot) {
				case 3:
					setOverlayTab(player, 1);
					return;
				case 7:
					setOverlayTab(player, 2);
					return;
				case 11:
					setOverlayTab(player, 3);
					return;
				case 15:
					setOverlayTab(player, 4);
					return;
				case 19:
					setOverlayTab(player, 5);
					return;
				case 23:
					setOverlayTab(player, 6);
					return;
			}
			return;
		case 499://Overlay close button
			closeOverlay(player);
			return;
		default:
			defaultHandler(ctx, "overlay");
			return;
	}
});

_events.bindEventListener(EventType.IF_DRAG, [_component(1477, 251), _component(1477, 89),
_component(1477, 295), _component(1477, 164), _component(1477, 186), _component(1477, 328),
_component(1477, 118), _component(1477, 100), _component(1477, 127), _component(1477, 136),
_component(1477, 78), _component(1477, 154), _component(1477, 145), _component(1477, 262),
_component(1477, 306), _component(1477, 219), _component(1477, 197), _component(1477, 208),
_component(1477, 230)], () => {
	//Do nothing as this is handled on the client side
});
