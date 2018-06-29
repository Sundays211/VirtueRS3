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
import { EventType, Inv } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import _inv from 'engine/inv';
import { varp } from 'engine/var';

import { defaultHandler } from 'shared/util';
import { sendMessage } from 'shared/chat';
import { takeItem, giveItem, invHasSpace } from 'shared/inv';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 11/02/2015
 */
_events.bindEventListener(EventType.IF_OPEN, 109, (ctx) => {
	ENGINE.sendInv(ctx.player, Inv.LOAN_RETURN);
});

_events.bindEventListener(EventType.IF_BUTTON, 109, (ctx) => {
	var player = ctx.player;
	//Check script 654
	//Container 540 for loaned items?
	switch (ctx.component) {
		case 19://Reclaim item
			if (ctx.button === 1) {
				if (varp(player, 431) > 0) {
					defaultHandler(ctx, "collection box");
					return;
				} else if (varp(player, 429) != -1) {
					//Forcefully return
					//[Name] wants [his/her] item returned now. The item [he/she] lent to you has been returned to [his/her] Returned Items box.
					defaultHandler(ctx, "collection box");
					return;
				} else {
					if (!invHasSpace(player)) {
						sendMessage(player, "Not enough space.");
						return;
					}
					var objId = _inv.getObject(player, Inv.LOAN_RETURN, 0);
					if (objId !== -1) {
						takeItem(player, objId, 1, Inv.LOAN_RETURN);
						giveItem(player, objId, 1, Inv.BACKPACK);
						return;
					}
				}
				defaultHandler(ctx, "collection box");
				return;
			} else if (ctx.button === 10) {
				var desc = _config.objDesc(ctx.objId);
				sendMessage(player, desc);
				return;
			}
			defaultHandler(ctx, "collection box");
			return;
		default:
			defaultHandler(ctx, "collection box");
			return;
	}
});
