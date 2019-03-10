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
import { EventType, Inv } from 'engine/enums';
import _events from 'engine/events';
import _entity from 'engine/entity';
import { varbit, setVarBit } from 'engine/var';

import { mesbox, objbox } from 'shared/dialog'; 
import { giveItem, hasItem } from 'shared/inv';
import _coords from 'shared/map/coords';
import { openCentralWidget, setWidgetText } from 'shared/widget';
import { mapMembers } from 'shared/util';
import { runAnim } from 'shared/anim';
import { sendMessage } from 'shared/chat';

 _events.bindEventListener(EventType.OPLOC1, 15468, async (ctx) => {
	if(hasItem(ctx.player, 2347, Inv.BACKPACK)) {
		await mesbox(ctx.player, "You already have a hammer.");
	} else {
		giveItem(ctx.player, 2347,1);
		await objbox(ctx.player, 2347, "You take a hammer from the crate.");
	}
});

 _events.bindEventListener(EventType.OPLOC1, 55301, (ctx) => {
	openCentralWidget(ctx.player, 205, false);
	setWidgetText(ctx.player, 205, 49, "Combat Winners");
	setWidgetText(ctx.player, 205, 48, "EoC p2p Fullout - Wicked Fury<br>EoC p2p 20v20 - Wicked Fury<br>EoC f2p Fullout - Wicked Fury<br>EoC f2p 20v20 - Wicked Fury<br>Legacy p2p Fullout - Wicked Fury<br>Legacy p2p 20v20 - Wicked Fury<br>Legacy f2p Fullout - Titan's Revolution<br>Legacy f2p 20v20 - Wicked Fury<br>");
	setWidgetText(ctx.player, 205, 53, "Skilling Winners");
	setWidgetText(ctx.player, 205, 50, "2015 - Summit<br>2015 (Iron) - Ceecs Clan<br>2014 - Hola Amigos<br>2013 - Venimus<br>2012 - Skill Shock<br>2011 - Divination<br>2010 - Divination<br>2009 - Divination");
	setWidgetText(ctx.player, 205, 54, "Combined Winners");
	setWidgetText(ctx.player, 205, 51, "2013 - Venimus<br>2012 - Basedin2minutes<br>2011 - Family Unity Network<br>2010 - Basedin2minutes<br>2009 - Wicked Fury");
	setWidgetText(ctx.player, 205, 55, "Current Winners");
	setWidgetText(ctx.player, 205, 52, "The Victorious Winners of<br>the 2015 jagex Clan Cup<br> <br> Combat - Wicked Fury<br>Skilling - Summit<br>Iron Skilling - Ceecs Clan");
});

 _events.bindEventListener(EventType.OPLOC1, 47713, async (ctx) => {//Rocks (Quest The Restless Ghost)
    await mesbox(ctx.player, "There's nothing there of any use to you.");
});

 _events.bindEventListener(EventType.OPLOC1, 86431, async (ctx) => {//Old mine entrance(Ham hidout)
	if(mapMembers()){	
		if (varbit(ctx.player, 303) == 1) { 
		    sendMessage(ctx.player, "You climb down into the mine...");
			_entity.setCoords(ctx.player, _coords(3149, 9652, 0));
			sendMessage(ctx.player, "... and enter a dimly lit cavern area.");
		} else {
		    sendMessage(ctx.player, "You try to open the mine entrance, but it is locked!");
		}
    } else {
        await mesbox(ctx.player, "You need to be on a member's world to use this feature.");
    }
});


_events.bindEventListener(EventType.OPLOC1, 91021, async (ctx) => {//dark hole under tree
	if(mapMembers()){
	    sendMessage(ctx.player, "not yet implemented.");
    } else {
        await mesbox(ctx.player, "You need to be on a member's world to use this feature.");
    }
});

_events.bindEventListener(EventType.OPLOC1, 36687, (ctx) => {//Trapdoor to lumbridge celler
	runAnim(ctx.player, 827, function () {
        _entity.setCoords(ctx.player, _coords(3208, 9616, 0));
    });
});