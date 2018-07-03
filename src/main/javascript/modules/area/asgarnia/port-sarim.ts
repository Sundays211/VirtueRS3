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
import { varbit, setVarBit } from 'engine/var';
 
import _coords from 'shared/map/coords';
import { chatplayer, chatnpc } from 'shared/dialog';
import { hasStarted } from '../../quest';
 
_events.bindEventListener(EventType.OPLOC1, 9472, (ctx) => {//trapdoor to Asgarnian ice dungeon
	_entity.setCoords(ctx.player, _coords(3007, 9550, 0));
});

_events.bindEventListener(EventType.OPLOC1, 39442, async (ctx) => {//trapdoor betty's basement quest (swept away)
	if(hasStarted(ctx.player, 20) && varbit(ctx.player, 9868) == 0) {
		setVarBit(ctx.player, 9868, 1); //open trapdoor
	} else if (varbit(ctx.player, 9868) == 1){
		_entity.setCoords(ctx.player, _coords(3221, 4522, 0));
	} else {
        await chatnpc(ctx.player, 583, "Excuse me, my cellar isn't open to the public.");
		await chatplayer(ctx.player, "Oh, sorry.");
	}
});

_events.bindEventListener(EventType.OPLOC2, 39442, (ctx) => {//trapdoor betty's basement quest (swept away)
	setVarBit(ctx.player, 9868, 0);
});