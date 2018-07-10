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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _entity from 'engine/entity';
import { varp, setVarc } from 'engine/var';

import { runAnim, addSpotAnim } from 'shared/anim';
import { openCentralWidget, openOverlaySub } from 'shared/widget';
import { sendMessage } from 'shared/chat';
import { takeItem } from 'shared/inv';

_events.bindEventListener(EventType.OPHELD1, 36093, (ctx) => {//Large dungeoneering token box
	sendMessage(ctx.player, "<col=00ff00>You gain 3,970 dungeoneering tokens. You now have "+ varp(ctx.player, 1097) +" tokens.");
});

_events.bindEventListener(EventType.OPHELD1, 19832, (ctx) => {//Bone brooch
	addSpotAnim(ctx.player, 2838);
	runAnim(ctx.player, 14870, function () {
		ctx.player.getModel().setRender(Render.NPC);
		ctx.player.getModel().setNPCId(12373);
		ctx.player.getModel().refresh();
		runAnim(ctx.player, 520);
	});
	setVarc(ctx.player, 1727, 1);
	openOverlaySub(ctx.player, 1008, 375, false);
});

_events.bindEventListener(EventType.OPHELD1, 20722, (ctx) => {//Firecracker
	runAnim(ctx.player, 12529);
	//addSpotAnim(ctx.player, 3953);find gfx
	takeItem(ctx.player, 20722, 1);
});

_events.bindEventListener(EventType.OPHELD1, 20718, (ctx) => {//Confetti
	runAnim(ctx.player, 10952);
});

_events.bindEventListener(EventType.OPHELD1, 4613, (ctx) => {//Spinning plate
	runAnim(ctx.player, 1902);
});

_events.bindEventListener(EventType.OPHELD1, 12844, (ctx) => {//Toy kite
	runAnim(ctx.player, 8990);
});

_events.bindEventListener(EventType.OPHELD1, 2520, (ctx) => {//Toy horsy brown
	runAnim(ctx.player, 918);
	_entity.say(ctx.player, "Just say neigh to gambling!");
});

_events.bindEventListener(EventType.OPHELD1, 2522, (ctx) => {//Toy horsy white
	runAnim(ctx.player, 919);
	_entity.say(ctx.player, "Just say neigh to gambling!");
});
		
_events.bindEventListener(EventType.OPHELD1, 2524, (ctx) => {//Toy horsy black
	runAnim(ctx.player, 920);
	_entity.say(ctx.player, "Just say neigh to gambling!");
});

_events.bindEventListener(EventType.OPHELD1, 2526, (ctx) => {//Toy horsy grey
	runAnim(ctx.player, 921);
	_entity.say(ctx.player, "Just say neigh to gambling!");
});

_events.bindEventListener(EventType.OPHELD1, 20725, (ctx) => {//Souvenir mug
	runAnim(ctx.player, 10942);
});

_events.bindEventListener(EventType.OPHELD1, 11950, (ctx) => {//Snow globe
	openCentralWidget(ctx.player, 659, false);
});

_events.bindEventListener(EventType.OPHELD1, 22325, (ctx) => {//Dance floor manual (haloween 2011)
	openCentralWidget(ctx.player, 1150, false);
});

_events.bindEventListener(EventType.OPHELD1, 20078, (ctx) => {//Heimland games souvenir
	runAnim(ctx.player, 12913);
	runAnim(ctx.player, 15105);
});

_events.bindEventListener(EventType.OPHELD1, 28134, (ctx) => {//sparkler
	runAnim(ctx.player, 20139);
	addSpotAnim(ctx.player, 3953);
	takeItem(ctx.player, 28134, 1);
});

_events.bindEventListener(EventType.OPHELD1, 6865, (ctx) => {//blue marionette jump
	runAnim(ctx.player, 3003);
	addSpotAnim(ctx.player, 511);
});

_events.bindEventListener(EventType.OPHELD1, 6866, (ctx) => {//green marionette jump
	runAnim(ctx.player, 3003);
	addSpotAnim(ctx.player, 515);
});

_events.bindEventListener(EventType.OPHELD1, 6867, (ctx) => {//red marionette jump
	runAnim(ctx.player, 3003);
	addSpotAnim(ctx.player, 507);
});

_events.bindEventListener(EventType.OPHELD1, 4079, (ctx) => {//Yo-yo play
	runAnim(ctx.player, 1457);
});

_events.bindEventListener(EventType.OPHELD1, 6722, (ctx) => {//Zombie head talk at
	_entity.say(ctx.player, (ctx.player, "Alas!");
	runAnim(ctx.player, 2840);
});

_events.bindEventListener(EventType.OPHELD2, 4565, (ctx) => {//basket of eggs
	_entity.setBas(ctx.player, 594);
});

_events.bindEventListener(EventType.OPHELD2, 6865, (ctx) => {//blue marionette walk
	runAnim(ctx.player, 3004);
	addSpotAnim(ctx.player, 512);
});

_events.bindEventListener(EventType.OPHELD2, 6866, (ctx) => {//green marionette walk
	runAnim(ctx.player, 3004);
	addSpotAnim(ctx.player, 516);
});

_events.bindEventListener(EventType.OPHELD2, 6867, (ctx) => {//red marionette walk
	runAnim(ctx.player, 3004);
	addSpotAnim(ctx.player, 508);
});

_events.bindEventListener(EventType.OPHELD2, 4079, (ctx) => {//Yo-yo loop
	runAnim(ctx.player, 1458);
});

_events.bindEventListener(EventType.OPHELD2, 6722, (ctx) => {//Zombie head Display
	_entity.say(ctx.player, "Mwuhahahaha!");
	runAnim(ctx.player, 2844);
});

_events.bindEventListener(EventType.OPHELD3, 20720, (ctx) => {//Firework
	runAnim(ctx.player, 733);//find gfx
});

_events.bindEventListener(EventType.OPHELD3, 14742, (ctx) => {//Lily of the valley
	runAnim(ctx.player, 11622);
});

_events.bindEventListener(EventType.OPHELD3, 6865, (ctx) => {//blue marionette bow
	runAnim(ctx.player, 3005);
	addSpotAnim(ctx.player, 513);
});

_events.bindEventListener(EventType.OPHELD3, 6866, (ctx) => {//green marionette bow
	runAnim(ctx.player, 3005);
	addSpotAnim(ctx.player, 517);
});

_events.bindEventListener(EventType.OPHELD3, 6867, (ctx) => {//red marionette bow
	runAnim(ctx.player, 3005);
	addSpotAnim(ctx.player, 509);
});

_events.bindEventListener(EventType.OPHELD3, 4079, (ctx) => {//Yo-yo walk
	runAnim(ctx.player, 1459);
});

_events.bindEventListener(EventType.OPHELD3, 15353, (ctx) => {//eek play
	runAnim(ctx.player, 12490);
	addSpotAnim(ctx.player, 2178);
});

_events.bindEventListener(EventType.OPHELD4, 6865, (ctx) => {//blue marionette dance
	runAnim(ctx.player, 3006);
	addSpotAnim(ctx.player, 514);
});

_events.bindEventListener(EventType.OPHELD4, 6866, (ctx) => {//green marionette dance
	runAnim(ctx.player, 3006);
	addSpotAnim(ctx.player, 518);
});

_events.bindEventListener(EventType.OPHELD4, 6867, (ctx) => {//red marionette dance
	runAnim(ctx.player, 3006);
	addSpotAnim(ctx.player, 510);
});

_events.bindEventListener(EventType.OPHELD4, 4079, (ctx) => {//Yo-yo crazy
	runAnim(ctx.player, 1460);
});

_events.bindEventListener(EventType.OPHELD4, 4566, (ctx) => {//Rubber chicken dance
	runAnim(ctx.player, 1835);
});

_events.bindEventListener(EventType.OPWORN1, 4566, (ctx) => {//Golden hammer
	runAnim(ctx.player, 15150);
});

_events.bindEventListener(EventType.OPWORN1, 20077, (ctx) => {//Salty claws hat
	runAnim(ctx.player, 329);
});

_events.bindEventListener(EventType.OPWORN1, 15426, (ctx) => {//Candy cane
	runAnim(ctx.player, 12664);
});

_events.bindEventListener(EventType.OPWORN1, 14742, (ctx) => {//Lily of the valley
	runAnim(ctx.player, 11622);
});

_events.bindEventListener(EventType.OPWORN1, 12645, (ctx) => {//Chocatrice cape
	runAnim(ctx.player, 8903);
	addSpotAnim(ctx.player, 1566);
});

_events.bindEventListener(EventType.OPWORN1, 10507, (ctx) => {//Reindeer hat prance
	runAnim(ctx.player, 5059);
	addSpotAnim(ctx.player, 263);
});

_events.bindEventListener(EventType.OPWORN1, 12844, (ctx) => {//Toy kite
	runAnim(ctx.player, 8990);
});

_events.bindEventListener(EventType.OPWORN1, 24412, (ctx) => {//Diamond jubilee souvenir flag white
	runAnim(ctx.player, 16917);
});

_events.bindEventListener(EventType.OPWORN1, 24414, (ctx) => {//Diamond jubilee souvenir flag red
	runAnim(ctx.player, 16917);
});

_events.bindEventListener(EventType.OPWORN1, 24416, (ctx) => {//Diamond jubilee souvenir flag blue
	runAnim(ctx.player, 16917);
});

_events.bindEventListener(EventType.OPWORN2, 20084, (ctx) => {//Golden hammer
	runAnim(ctx.player, 15149);
	addSpotAnim(ctx.player, 2953);
});

_events.bindEventListener(EventType.OPWORN2, 5673, (ctx) => {//Squirrel Ears juggle
	runAnim(ctx.player, 12265);
	addSpotAnim(ctx.player, 2145);
});