/**
 * Copyright (c) 2017 Virtue Studios
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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _inv from 'engine/inv';
import { Inv } from 'engine/enums/inventory';

import { takeItem } from 'shared/inv';
import { sendMessage } from 'shared/chat';

_events.bindEventListener(EventType.OPHELDU, 28617, (ctx) => {
	if (ctx.useObjId == 33296) {
		_inv.setSlot(ctx.player, Inv.BACKPACK, ctx.slot, 33390, 1);
		takeItem(ctx.player, 33296, 1);
		sendMessage(ctx.player, "You successfully place dye over the seismic wand.");
	    return;
	}
});