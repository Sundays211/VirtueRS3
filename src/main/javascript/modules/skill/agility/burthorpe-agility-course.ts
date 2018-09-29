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
import { EventType, Stat } from 'engine/enums';
import _events from 'engine/events';
import _entity from 'engine/entity';
import _map from 'engine/map';

import _coords from 'shared/map/coords';
import { sendMessage } from 'shared/chat';
import { giveXp } from 'shared/stat';
import { runAnim } from 'shared/anim';
import { locationAnim } from 'shared/map/location';


_events.bindEventListener(EventType.OPLOC1, 66894, (ctx) => {//log beam
//fail anim 15861
//sendMessage(ctx.player, "You lost your balance!");
    runAnim(ctx.player, 9908);
	_entity.forceMove(ctx.player, _entity.getCoords(ctx.player), 6, _coords(0,45,55,39,38), 160);
	sendMessage(ctx.player, "You walk carefully across the slippery log...");
	giveXp(ctx.player, Stat.AGILITY, 5.6);	
});

_events.bindEventListener(EventType.OPLOC1, 66912, (ctx) => {//wall
   // _entity.moveTo(ctx.player, _coords(0,45,55,39,41), () => {
        runAnim(ctx.player, 15765, () => {
	        _entity.setCoords(ctx.player, _coords(2919, 3562, 1));
	        runAnim(ctx.player, -1);
	        //giveXp(ctx.player, Stat.AGILITY, 5.6);	
	    });
	//});
});

_events.bindEventListener(EventType.OPLOC1, 66909, (ctx) => {//balancing ledge
    if (_map.getCoordX(ctx.player) === 2916 && _map.getCoordY(ctx.player) === 3564) {
		//_entity.setBas(ctx.player, 156);
	    //runAnim(ctx.player, 758, () => {
	        _entity.setCoords(ctx.player, _coords(2912, 3564, 1));
	    //    runAnim(ctx.player, -1);
	   // });	
	} else {
		sendMessage(ctx.player, "There's no going back now! Carry on to complete the course.");
	}	
});

_events.bindEventListener(EventType.OPLOC1, 66902, (ctx) => {// obstacle low wall
//fail anim 15862
//sendMessage(ctx.player, "You lost your footing!");
    if (_map.getCoordX(ctx.location) === 2911 && _map.getCoordY(ctx.location) === 3561 && _map.getCoordX(ctx.player) === 2910 && _map.getCoordY(ctx.player) === 3561) {
	    runAnim(ctx.player, 15782, () => {
	        _entity.setCoords(ctx.player, _coords(2912, 3562, 1));
		});	
    } else {
	    sendMessage(ctx.player, "There's no going back now! Carry on to complete the course.");
    }
});

_events.bindEventListener(EventType.OPLOC1, 66904, (ctx) => {//rope swing
    runAnim(ctx.player, 751);
	locationAnim(ctx.location, 15824);
	var currentCoords = _entity.getCoords(ctx.player);
	var targetCoords = _coords(currentCoords, 4, 0, 0);
	_entity.forceMove(ctx.player, targetCoords, 100);
});

_events.bindEventListener(EventType.OPLOC1, 66897, (ctx) => {//monkey bars
    runAnim(ctx.player, 16069);
	_entity.setBas(ctx.player, 2405);
    _entity.forceMove(ctx.player, _entity.getCoords(ctx.player), 6, _coords(1,45,55,37,34), 160);
    runAnim(ctx.player, 16070);
	_entity.setBas(ctx.player, -1);
});

_events.bindEventListener(EventType.OPLOC1, 66910, (ctx) => {//ledg 
    runAnim(ctx.player, 2586, () => {
	    _entity.setCoords(ctx.player, _coords(2916, 3552, 0));
		runAnim(ctx.player, 2588);
	});	
});