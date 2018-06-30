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
import _map from 'engine/map';
import _entity from 'engine/entity';

import _coords from 'shared/map/coords';
import { defaultHandler } from 'shared/util';
import { giveXp } from 'shared/stat';
import { runAnim } from 'shared/anim';


/**
 * @author Kayla
 * @since 5/03/2015
 */
_events.bindEventListener(EventType.OPLOC1, 10857, (ctx) => {
	if (_map.getCoordX(ctx.location) === 3354 && _map.getCoordY(ctx.location) == 2831) {
		_entity.setCoords(ctx.player, _coords(3355, 2833, 1));
	} else if (_map.getCoordX(ctx.location) === 3200 && _map.getCoordY(ctx.location) == 3243) {
		_entity.setCoords(ctx.player, _coords(3200, 3242, 1));
	} else {
		defaultHandler(ctx, "agility pyramid");
	}
});

_events.bindEventListener(EventType.OPLOC1, 10860, (ctx) => {
	if (_map.getCoordX(ctx.location) === 3364 && _map.getCoordY(ctx.location) === 2851) {
		_entity.setCoords(ctx.player, _coords(3368, 2851, 1));
		runAnim(ctx.player, 756);
		giveXp(ctx.player, Stat.AGILITY, 15);
	} else if (_map.getCoordX(ctx.location) === 3200 && _map.getCoordY(ctx.location) === 3243) {
		_entity.setCoords(ctx.player, _coords(3200, 3242, 1));
	} else {
		defaultHandler(ctx, "agility pyramid");
	}
});

_events.bindEventListener(EventType.OPLOC1, 10865, (ctx) => {
	if (_map.getCoordX(ctx.location) === 3354 && _map.getCoordY(ctx.location) === 2849) {
		_entity.setCoords(ctx.player, _coords(3354, 2850, 1));
		runAnim(ctx.player, 769);
		giveXp(ctx.player, Stat.AGILITY, 15);
	} else if (_map.getCoordX(ctx.location) === 3200 && _map.getCoordY(ctx.location) === 3243) {
		_entity.setCoords(ctx.player, _coords(3200, 3245, 0));
	} else {
		defaultHandler(ctx, "agility pyramid");
	}
});

_events.bindEventListener(EventType.OPLOC1, 10868, (ctx) => {
	if (_map.getCoordX(ctx.location) === 3375 && _map.getCoordY(ctx.location) === 2845) {
		_entity.setCoords(ctx.player, _coords(3375, 2840, 1));
		runAnim(ctx.player, 762);
		giveXp(ctx.player, Stat.AGILITY, 15);
	} else if (_map.getCoordX(ctx.location) === 3200 && _map.getCoordY(ctx.location) === 3243) {
		_entity.setCoords(ctx.player, _coords(3200, 3242, 1));
	} else {
		defaultHandler(ctx, "agility pyramid");
	}
});
