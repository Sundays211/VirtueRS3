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
import _map from 'engine/map';

import { runAnim } from 'shared/anim';
import _coords from 'shared/map/coords';
import { defaultHandler } from 'shared/util';
import { locationAnim } from 'shared/map/location';

	//halloween 2007   0,25,75,42,25
_events.bindEventListener(EventType.OPLOC1, 27211, (ctx) => {//ramp
	runAnim(ctx.player, 7273);
	_entity.forceMove(ctx.player, _entity.getCoords(ctx.player), 6, _coords(0,25,75,23,45), 160);
	_entity.setBas(ctx.player, -1);
});

_events.bindEventListener(EventType.OPLOC1, 27218, (ctx) => {//Slide
	var currentCoords = _entity.getCoords(ctx.player);
	var targetCoords = _coords(0,25,75,42,19);
	runAnim(ctx.player, 7274);
	_entity.forceMove(ctx.player, currentCoords, 220, targetCoords, 300);
});

_events.bindEventListener(EventType.OPLOC1, 27278, (ctx) => {//Springboard
	if (_map.getCoordX(ctx.location) == 1637 && _map.getCoordY(ctx.location) == 4817) {
	    locationAnim(ctx.location, 7296);
	    runAnim(ctx.player, 7268);
		 _entity.forceMove(ctx.player, _entity.getCoords(ctx.player), 5, _coords(0,25,75,37,20), 30);
	} else if (_map.getCoordX(ctx.location) == 1633 && _map.getCoordY(ctx.location) == 4824) {
	    locationAnim(ctx.location, 7296);
	    runAnim(ctx.player, 7268);
		_entity.forceMove(ctx.player, _entity.getCoords(ctx.player), 5, _coords(0,25,75,30,24), 30);
	} else if (_map.getCoordX(ctx.location) == 1630 && _map.getCoordY(ctx.location) == 4819) {
	    locationAnim(ctx.location, 7296);
	    runAnim(ctx.player, 7268);
	    _entity.forceMove(ctx.player, _entity.getCoords(ctx.player), 5, _coords(0,25,75,27,19), 30);
	} else if (_map.getCoordX(ctx.location) == 1624 && _map.getCoordY(ctx.location) == 4822) {
	    locationAnim(ctx.location, 7296);
	    runAnim(ctx.player, 7269);
		_entity.forceMove(ctx.player, _entity.getCoords(ctx.player), 5, _coords(0,25,75,24,28), 30);
		_entity.setBas(ctx.player, 616);
	} else {
		defaultHandler(ctx, "halloween 2007 Springboard");
	}
});