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
import { Player } from 'engine/models';
import { EventType } from 'engine/enums';
import _events from 'engine/events';

import { hasPossibleIngredient, selectProduct } from 'shared/makex';
import { defaultHandler } from 'shared/util';

import { setSelectionHandler } from './logic';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
_events.bindEventListener(EventType.OPHELD1, 52, (ctx) => {
	selectArrows(ctx.player, 53);//Arrow shaft
});

_events.bindEventListener(EventType.OPHELDU, [52, 12539], (ctx) => {
	//Arrow shaft, Grenwall spikes
	if (hasPossibleIngredient(14981, ctx.useObjId)) {
		selectArrows(ctx.player, 53);
	} else {
		defaultHandler(ctx, "arrow shaft use");
	}
});

_events.bindEventListener(EventType.OPHELDU, [314, 10087, 10088, 10089,
	10090, 10091, 11525], (ctx) => {
		//Feather, Stripy feather, Red feather, Blue feather, Yellow feather
		//Orange feather, Wimpy feather
		if (hasPossibleIngredient(14983, ctx.useObjId)) {
			selectArrows(ctx.player, 53);
		} else {
			defaultHandler(ctx, "feather use");
		}
	});

function selectArrows(player: Player, productId: number) {
	selectProduct(player, 6943, 6944, 6966, productId);
	setSelectionHandler(player);
}
