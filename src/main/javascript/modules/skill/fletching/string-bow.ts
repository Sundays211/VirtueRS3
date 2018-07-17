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

import { setSelectionHandler } from './logic';
import { selectProduct } from 'shared/makex';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
_events.bindEventListener(EventType.OPHELD1, 48, function(ctx) {
	selectBow(ctx.player, 839);//Shieldbow
});

_events.bindEventListener(EventType.OPHELD1, 50, function(ctx) {
	selectBow(ctx.player, 841);//Shortbow
});

_events.bindEventListener(EventType.OPHELD1, 56, function(ctx) {
	selectBow(ctx.player, 845);//Oak shieldbow
});

_events.bindEventListener(EventType.OPHELD1, 54, function(ctx) {
	selectBow(ctx.player, 843);//Oak shortbow
});

_events.bindEventListener(EventType.OPHELD1, 58, function(ctx) {
	selectBow(ctx.player, 847);//Willow shieldbow
});

_events.bindEventListener(EventType.OPHELD1, 60, function(ctx) {
	selectBow(ctx.player, 849);//Willow shortbow
});

_events.bindEventListener(EventType.OPHELD1, 62, function(ctx) {
	selectBow(ctx.player, 851);//Maple shieldbow
});

_events.bindEventListener(EventType.OPHELD1, 64, function(ctx) {
	selectBow(ctx.player, 853);//Maple shortbow
});

_events.bindEventListener(EventType.OPHELD1, 66, function(ctx) {
	selectBow(ctx.player, 855);//Yew shieldbow
});

_events.bindEventListener(EventType.OPHELD1, 68, function(ctx) {
	selectBow(ctx.player, 857);//Yew shortbow
});

_events.bindEventListener(EventType.OPHELD1, 70, function(ctx) {
	selectBow(ctx.player, 859);//Magic shieldbow
});

_events.bindEventListener(EventType.OPHELD1, 72, function(ctx) {
	selectBow(ctx.player, 861);//Magic shortbow
});

_events.bindEventListener(EventType.OPHELD1, 29734, function(ctx) {
	selectBow(ctx.player, 29611);//Elder shieldbow
});

_events.bindEventListener(EventType.OPHELD1, 29736, function(ctx) {
	selectBow(ctx.player, 29614);//Elder shortbow
});

_events.bindEventListener(EventType.OPHELD1, 1777, function(ctx) {
	selectBow(ctx.player, -1);//Bowstring
});

function selectBow(player: Player, productId: number) {
	selectProduct(player, 6941, 6942, 6958, productId);
	setSelectionHandler(player);
}
