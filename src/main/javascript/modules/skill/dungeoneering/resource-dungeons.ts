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
import { EventType, Stat } from 'engine/enums';
import _events from 'engine/events';
import _entity from 'engine/entity';

import { teleport } from 'shared/map';
import { getStatLevel } from 'shared/stat';
import _coords from 'shared/map/coords';
import { sendMessage } from 'shared/chat';

_events.bindEventListener(EventType.OPLOC1, 52855, (ctx) => {//Mysterious entrance dwarven mine hidden mine
	if (getStatLevel(ctx.player, Stat.DUNGEONEERING) >= 15) {
       teleport(ctx.player, _coords(0,16,71,17,31),13288,2516,13285,2517);
	}else{
		sendMessage(ctx.player, "<col=ae0000>You need a Dungeoneering level of 15 to venture in there.");
    }
});
		
_events.bindEventListener(EventType.OPLOC1, 52864, (ctx) => {//Mysterious door dwarven mine hidden mine
	 _entity.setCoords(ctx.player, _coords(0,47,152,26,44));
});

_events.bindEventListener(EventType.OPLOC1, 52853, (ctx) => {//Mysterious entrance edgeville dungeon hill giant
	if (getStatLevel(ctx.player, Stat.DUNGEONEERING) >= 20) {
        teleport(ctx.player, _coords(0,17,71,46,45),13288,2516,13285,2517);
	}else{
		sendMessage(ctx.player, "<col=ae0000>You need a Dungeoneering level of 20 to venture in there.");
    }
});
		
_events.bindEventListener(EventType.OPLOC1, 52868, (ctx) => {//Mysterious door edgeville dungeon hill giant
	 _entity.setCoords(ctx.player, _coords(0,48,153,32,34));
});
		
_events.bindEventListener(EventType.OPLOC1, 52856, (ctx) => {//Mysterious entrance mining guild hidden mine
	if (getStatLevel(ctx.player, Stat.DUNGEONEERING) >= 45) {
        teleport(ctx.player, _coords(0,16,70,29,41),13288,2516,13285,2517);
	}else{
		sendMessage(ctx.player, "<col=ae0000>You need a Dungeoneering level of 45 to venture in there.");
    }
});
		
_events.bindEventListener(EventType.OPLOC1, 52866, (ctx) => {//Mysterious door mining guild hidden mine
	_entity.setCoords(ctx.player, _coords(0,47,152,14,13));
});