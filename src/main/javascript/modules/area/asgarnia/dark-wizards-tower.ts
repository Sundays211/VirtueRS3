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
import { varp } from 'engine/var';
import _map from 'engine/map';

import { sendMessage } from 'shared/chat';
import { addLocation, getLocShape, getLocRotation } from 'shared/map/location';
import _coords from 'shared/map/coords';
import { runAnim } from 'shared/anim';
import { mapMembers } from 'shared/util';
import { giveItem, hasItem } from 'shared/inv';
import { mesbox, chatplayer } from 'shared/dialog';
import { hasStarted } from '../../quest';

_events.bindEventListener(EventType.OPLOC1, 34246, (ctx) => {//Wardrobe in Witch's House
    addLocation(34247, _map.getCoords(ctx.location), getLocShape(ctx.location), getLocRotation(ctx.location));
});
    
_events.bindEventListener(EventType.OPLOC2, 34247, (ctx) => {//Wardrobe in Witch's House
    sendMessage(ctx.player, "The wardobe is empty.");
});

_events.bindEventListener(EventType.OPLOC3, 34247, (ctx) => {//Wardrobe in Witch's House
    addLocation(34246, _map.getCoords(ctx.location), getLocShape(ctx.location), getLocRotation(ctx.location));
});

_events.bindEventListener(EventType.OPLOC1, 24670, (ctx) => {//Wardrobe in Witch's House
    addLocation(24671, _map.getCoords(ctx.location), getLocShape(ctx.location), getLocRotation(ctx.location));
});

_events.bindEventListener(EventType.OPLOC2, 24671, (ctx) => {//Wardrobe in Witch's House
    sendMessage(ctx.player, "The wardobe is empty.");
});

_events.bindEventListener(EventType.OPLOC3, 24671, (ctx) => {//Wardrobe in Witch's House
    addLocation(24670, _map.getCoords(ctx.location), getLocShape(ctx.location), getLocRotation(ctx.location));
});

_events.bindEventListener(EventType.OPLOC1, 24672, (ctx) => {//Staircase in Witch's House
     _entity.setCoords(ctx.player, _coords(1, 45, 52, 18, 44));
});

_events.bindEventListener(EventType.OPLOC1, 24673, (ctx) => {//Staircase in Witch's House
    _entity.setCoords(ctx.player, _coords(0, 45, 52, 18, 40));
});

_events.bindEventListener(EventType.OPLOC1, 24681, (ctx) => {//Drawers in Witch's House
    addLocation(24682, _map.getCoords(ctx.location), getLocShape(ctx.location), getLocRotation(ctx.location));
});

_events.bindEventListener(EventType.OPLOC2, 24682, (ctx) => {//Drawers in Witch's House
    sendMessage(ctx.player, "The drawers are empty.");
});

_events.bindEventListener(EventType.OPLOC3, 24682, (ctx) => {//Drawers in Witch's House
    addLocation(24681, _map.getCoords(ctx.location), getLocShape(ctx.location), getLocRotation(ctx.location));
	sendMessage(ctx.player, "You shut the drawers.");
});

_events.bindEventListener(EventType.OPLOC1, 24718, (ctx) => {//Ladder in Witch's House
    runAnim(ctx.player, 828, function () {
		_entity.setCoords(ctx.player, _coords(2774, 9759, 0));
	});
});

_events.bindEventListener(EventType.OPLOC1, 24882, (ctx) => {//Gramophone in Witch's House
    sendMessage(ctx.player, "The gramophone doesn't have a record on it.");
});

_events.bindEventListener(EventType.OPLOC1, 24842, (ctx) => {//Manhole (Quest Witch's House)
	if (mapMembers()){
	    sendMessage(ctx.player, "The cover won't budge. It seems to be locked.");
    } else {
        sendMessage(ctx.player, "You need to be on a member's world to use this feature.");
    }
});

_events.bindEventListener(EventType.OPLOC1, 2867, async (ctx) => {//Potted plant (Quest Witch's House)
	if (mapMembers()){
	    if (hasItem(ctx.player, 2409)) {
	        sendMessage(ctx.player, "You don't find anything interesting.");
	    } else {
	        giveItem(ctx.player, 2409, 1);
	         await mesbox(ctx.player, "You find a key hidden under the flower pot.");
	    }
    } else {
        sendMessage(ctx.player, "You need to be on a member's world to use this feature.");
    }
});

_events.bindEventListener(EventType.OPLOC1, 2861, async (ctx) => {//Door (Quest Witch's House)
	if (mapMembers()){
	    if (hasItem(ctx.player, 2409)) {
	        if(hasStarted(ctx.player, 7)) {
		        sendMessage(ctx.player, "todo add doors that work");
		    } else {
	            await chatplayer(ctx.player, "It would be rude to break into this house.");
		    }
	    } else {
	        sendMessage(ctx.player, "This door is locked.");
	    }
    } else {
        sendMessage(ctx.player, "You need to be on a member's world to use this feature.");
    }
});

_events.bindEventListener(EventType.OPLOC1, 2862, async (ctx) => {//door to garden(Quest Witch's House)
	if (varp(ctx.player, 2276) == 3) {
		sendMessage(ctx.player, "todo add door ");
    } else {
	    await mesbox(ctx.player, "This door is locked.");
        await chatplayer(ctx.player, "Strange... I can't see any kind of lock or handle to open<br> this door...");
	}
});

_events.bindEventListener(EventType.OPLOCU, 2861, async (ctx) => {//door (Quest Witch's House)
	switch (ctx.useObjId) {
	    case 2409:
	        if(hasStarted(ctx.player, 7)) {
		        sendMessage(ctx.player, "todo add doors that work");
		    } else {
	            await chatplayer(ctx.player, "It would be rude to break into this house.");
		    }
	    return;
	}
});

_events.bindEventListener(EventType.OPLOCU, 2870, (ctx) => {//mouse hole(Quest Witch's House)
	switch (ctx.useObjId) {
	    case 1985:
	        if (varp(ctx.player, 2276) == 1) {
		        sendMessage(ctx.player, "todo add the npc 901");
		    } else {
	            sendMessage(ctx.player, "varp not right");
		    }
	    return;
	}
});