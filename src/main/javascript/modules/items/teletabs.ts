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
import { CoordGrid, Player} from 'engine/models';

import { runAnim, addSpotAnim } from "shared/anim";
import { takeItem } from 'shared/inv';
import _coords from 'shared/map/coords';

_events.bindEventListener(EventType.OPHELD1, 8007, (ctx) => {//VarrockTele
     teletab(ctx.player, ctx.objId, _coords(3212, 3424, 0));
});

_events.bindEventListener(EventType.OPHELD1, 8008, (ctx) => {//LumbridgeTele
     teletab(ctx.player, ctx.objId, _coords(3222, 3218, 0));
});

_events.bindEventListener(EventType.OPHELD1, 8009, (ctx) => {//FaladorTele
     teletab(ctx.player, ctx.objId, _coords(2965, 3379, 0));
});

_events.bindEventListener(EventType.OPHELD1, 8010, (ctx) => {//CamelotTele
     teletab(ctx.player, ctx.objId, _coords(2757, 3477, 0));
});

_events.bindEventListener(EventType.OPHELD1, 8011, (ctx) => {//ArdougneTele
     teletab(ctx.player, ctx.objId, _coords(2661, 3303, 0));
});

_events.bindEventListener(EventType.OPHELD1, 8012, (ctx) => {//WatchtowerTele
     teletab(ctx.player, ctx.objId, _coords(2549, 3112, 0));
});

_events.bindEventListener(EventType.OPHELD1, 8013, (ctx) => {//HouseTele
     teletab(ctx.player, ctx.objId, _coords(2955, 3224, 0));
});

_events.bindEventListener(EventType.OPHELD1, 31665, (ctx) => {//GodwarsTele
     teletab(ctx.player, ctx.objId, _coords(2886, 5309, 0));
});		

function teletab(player: Player, item: number, coords: CoordGrid) {
    takeItem(player, item, 1);
	ENGINE.freezeEntity(player, 7);
	addSpotAnim(player, 1680);
	runAnim(player, 9597, function () {
		runAnim(player, 4731, function () {
			_entity.setCoords(player, coords);
			runAnim(player, 9598);
		});
	});
}