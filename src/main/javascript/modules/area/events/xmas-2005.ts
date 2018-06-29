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
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events'; 
import _entity from 'engine/entity';

import { runAnim } from 'shared/anim';
import { giveItem } from 'shared/inv';
import { openCentralWidget } from 'shared/widget';
import { mesbox, objbox, multi2 } from 'shared/dialog';
import _coords from 'shared/map/coords';

_events.bindEventListener(EventType.OPLOC1, [10673,10674,10675], (ctx) => {//Paintcans
	openCentralWidget(ctx.player, 383, false);
});

_events.bindEventListener(EventType.OPLOC1, 10687, async (ctx) => {//puppet torsos blue
	//if varbit or varp TODO find varbit
	    //dialog.builder(ctx.player).chatplayer("NEUTRAL", "I should speak to Rosie befor I touch these.", function () {
	//});
	//else
	runAnim(ctx.player, 832, function () {
		giveItem(ctx.player, 6875, 1);
	});
	await objbox(ctx.player, 6875, "You take a blue marionette torso from the box.");
});

_events.bindEventListener(EventType.OPLOC1, 10699, async (ctx) => {//Trapdoor steps
	await mesbox(ctx.player, "If you leave Diango's workshop, any marionette parts, bits of bauble or<br> boxes will be removed from your inventory.")
	multi2(ctx.player, "LEAVE DIANGO'S WORKSHOP?", "Yes", function () {
	    runAnim(ctx.player, 828, function () {
		    _entity.setCoords(ctx.player, _coords(2007, 4427, 1));
	    });
	}, "No", function () {
	});
});