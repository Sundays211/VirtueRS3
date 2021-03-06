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
import _coords from 'shared/map/coords';
import { mesbox} from 'shared/dialog';
 
_events.bindEventListener(EventType.OPLOC1, 3507, async (ctx) => {//gate
	await mesbox(ctx.player, "There's a message attached to this gate, it reads:-<br><col=0000ff>~ Mort Myre is a dangerous Ghast infested swamp. ~<br><col=0000ff> ~ Do not enter if you value your life. ~<br><col=0000ff> ~ All persons wishing to enter must see Drezel. ~");
});

_events.bindEventListener(EventType.OPLOC1, 91557, (ctx) => {//cave to araxyte lair
    _entity.setCoords(ctx.player, _coords(1,70,98,32,17));
	runAnim(ctx.player, 15459);
});

_events.bindEventListener(EventType.OPLOC2, 91557, (ctx) => {//cave to araxyte graveyard
    _entity.setCoords(ctx.player, _coords(1,73,97,32,30));
	runAnim(ctx.player, 15459);
});