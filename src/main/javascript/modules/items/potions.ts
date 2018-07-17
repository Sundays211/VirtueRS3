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
import _config from 'engine/config';

import { takeItem } from 'shared/inv';
import { sendMessage } from 'shared/chat';
import { runAnim } from 'shared/anim';
 
_events.bindEventListener(EventType.OPHELD1, 23531, function(ctx) {//OVERLOAD_FLASK
	ENGINE.freezeEntity(ctx.player, 2);
		sendMessage(ctx.player, "You drink the " + _config.objName(ctx.objId) + ".");
	if (ctx.player.getImpactHandler().inCombat()) {
		runAnim(ctx.player, 18002);
	} else {
		runAnim(ctx.player, 18001);
	}
	//To get the current level, use api.getStatLevel(player, stat)
	//To set the current level, use api.setStatLevel(player, stat, level)
	ENGINE.boostStat(ctx.player, Stat.STRENGTH, 16);
	ENGINE.boostStat(ctx.player, Stat.ATTACK, 16);
	ENGINE.boostStat(ctx.player, Stat.MAGIC, 16);
	ENGINE.boostStat(ctx.player, Stat.RANGED, 16);
	takeItem(ctx.player, ctx.objId, 1);
}); 