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
import { Player } from 'engine/models';
import _events from 'engine/events';
import _config from 'engine/config';

import { takeItem } from 'shared/inv';
import { sendMessage } from 'shared/chat';
import { runAnim } from 'shared/anim';
 
_events.bindEventListener(EventType.OPHELD1, 319, function(ctx) {//ANCHOVIES
	foodheal(ctx.player, ctx.objId, 200, null);
}); 
 
_events.bindEventListener(EventType.OPHELD1, 1965, function(ctx) {//CABBAGE
	let healmsg = "You eat the Cabbage. Yuck!";
	foodheal(ctx.player, ctx.objId, 210, healmsg);
}); 

_events.bindEventListener(EventType.OPHELD1, 1967, function(ctx) {//DRAYNOR_CABBAGE
	let healmsg = "You eat the Cabbage.<br> It seems to taste nicer then normal.";
	foodheal(ctx.player, ctx.objId, 200, healmsg);
});
 
_events.bindEventListener(EventType.OPHELD1, 1957, function(ctx) {//ONION
	let healmsg = "You eat the onion.<br>It's always sad to see a grown man cry.";
	foodheal(ctx.player, ctx.objId, 200, healmsg);
});

_events.bindEventListener(EventType.OPHELD1, 2309, function(ctx) {//BREAD
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 13433, function(ctx) {//CRAYFISH
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 2140, function(ctx) {//CHICKEN
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 2142, function(ctx) {//MEAT
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 315, function(ctx) {//SHRIMP
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 325, function(ctx) {//SARDINE
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 347, function(ctx) {//HERRING
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 355, function(ctx) {//MACKEREL
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 333, function(ctx) {//TROUT
	foodheal(ctx.player, ctx.objId, 375, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 339, function(ctx) {//COD
	foodheal(ctx.player, ctx.objId, 450, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 351, function(ctx) {//PIKE
	foodheal(ctx.player, ctx.objId, 500, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 329, function(ctx) {//SALMON
	foodheal(ctx.player, ctx.objId, 625, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 361, function(ctx) {//TUNA
	foodheal(ctx.player, ctx.objId, 750, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 365, function(ctx) {//BASS
	foodheal(ctx.player, ctx.objId, 1300, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 379, function(ctx) {//LOBSTER
	foodheal(ctx.player, ctx.objId, 1200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 373, function(ctx) {//SWORDFISH
	foodheal(ctx.player, ctx.objId, 1400, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 7946, function(ctx) {//MONKFISH
	foodheal(ctx.player, ctx.objId, 1600, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 385, function(ctx) {//SHARK
	foodheal(ctx.player, ctx.objId, 2000, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 397, function(ctx) {//SEA_TURTLE
	foodheal(ctx.player, ctx.objId, 2050, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 15266, function(ctx) {//CAVEFISH
	foodheal(ctx.player, ctx.objId, 2200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 391, function(ctx) {//MANTA_RAY
	foodheal(ctx.player, ctx.objId, 2275, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 15272, function(ctx) {//ROCKTAIL
	foodheal(ctx.player, ctx.objId, 2300, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 1891, function(ctx) {//CAKE
	foodheal(ctx.player, ctx.objId, 999, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 1897, function(ctx) {//CHOCOLATE_CAKE
	foodheal(ctx.player, ctx.objId, 1248, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 1973, function(ctx) {//CHOCOLATE_BAR
	foodheal(ctx.player, ctx.objId, 200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 2289, function(ctx) {//PLAIN_PIZZA
	foodheal(ctx.player, ctx.objId, 875, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 2293, function(ctx) {//MEAT_PIZZA
	foodheal(ctx.player, ctx.objId, 1125, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 2297, function(ctx) {//ANCHOVY_PIZZA
	foodheal(ctx.player, ctx.objId, 1375, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 2301, function(ctx) {//PINEAPPLE_PIZZA
	foodheal(ctx.player, ctx.objId, 1625, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 7178, function(ctx) {//GARDEN_PIE
	foodheal(ctx.player, ctx.objId, 850, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 6705, function(ctx) {//POTATO_WITH_CHEESE
	foodheal(ctx.player, ctx.objId, 1175, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 7056, function(ctx) {//EGG_POTATO
	foodheal(ctx.player, ctx.objId, 1375, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 7060, function(ctx) {//TUNA_POTATO
	foodheal(ctx.player, ctx.objId, 2125, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 7208, function(ctx) {//WILD_PIE
	foodheal(ctx.player, ctx.objId, 2125, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 7218, function(ctx) {//SUMMER_PIE
	foodheal(ctx.player, ctx.objId, 2375, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 21521, function(ctx) {//TIGER_SHARK
	foodheal(ctx.player, ctx.objId, 1900, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 19948, function(ctx) {//BARON_SHARK
	foodheal(ctx.player, ctx.objId, 2000, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 19949, function(ctx) {//JUJU_GUMBO
	foodheal(ctx.player, ctx.objId, 2300, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 26313, function(ctx) {//ROCKTAIL_SOUP
	foodheal(ctx.player, ctx.objId, 2400, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 6685, function(ctx) {//SARADOMIN_BREW
	foodheal(ctx.player, ctx.objId, 4000, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 23351, function(ctx) {//SARADOMIN_BREW_FLASK
	foodheal(ctx.player, ctx.objId, 6000, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 28191, function(ctx) {//SUPER_SARADOMIN_BREW
	foodheal(ctx.player, ctx.objId, 5200, null);
}); 

_events.bindEventListener(EventType.OPHELD1, 28227, function(ctx) {//SUPER_SARADOMIN_BREW_FLASK
	foodheal(ctx.player, ctx.objId, 7800, null);
}); 


function foodheal(player: Player, item: number, healAmount: number, healText: string) {
	ENGINE.freezeEntity(player, 2);
	if (healText !== null) {
		sendMessage(player, healText);
	} else {
		sendMessage(player, "You eat the " + _config.objName(item) + ".");
	}
	if(player.getImpactHandler().inCombat()) {
		runAnim(player, 18002);
	} else {
		runAnim(player, 18001);
	}
	player.getImpactHandler().heal(healAmount, true);
	takeItem(player, item, 1);
} 