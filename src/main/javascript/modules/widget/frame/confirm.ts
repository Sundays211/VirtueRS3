/**
 * Copyright (c) 2014 Virtue Studios
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
import { varp, varbit, setVarBit, setVarp, setVarc } from 'engine/var';

import { defaultHandler, runClientScript } from 'shared/util';
import { Player } from 'engine/models';
import { openOverlaySub, setWidgetEvents, closeWidgetSub } from 'shared/widget';

var CombatMode = Java.type('org.virtue.game.entity.combat.CombatMode');
/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 11, 2014
 */
_events.bindEventListener(EventType.IF_OPEN, 26, (ctx) => {
	setWidgetEvents(ctx.player, 26, 22, -1, -1, 2);
});

_events.bindEventListener(EventType.IF_BUTTON, 26, (ctx) => {
	var player = ctx.player;
	switch (ctx.component) {
		case 11:
			switch (varp(player, 3813)) {
				case 6://Logout
					ENGINE.kickPlayer(player, false);
					return;
				case 9://Switch between eoc and legacy combat mode
					if (varbit(player, 27168) === 1) {//Legacy mode
						setEoCCombatMode(player);
					} else {//EoC Mode
						setLegacyCombatMode(player);
					}
					closeWidgetSub(player, 1477, 871);
					return;
				case 10://Switch between eoc and legacy interface mode
					if (varbit(player, 27169) === 1) {//Legacy mode
						setEocInterfaceMode(player);
					} else {//EoC Mode
						setLegacyInterfaceMode(player);
					}
					closeWidgetSub(player, 1477, 871);
					return;
				case 7://Reset keybinds
				case 8://Delete friend
			}
			defaultHandler(ctx, "confirm widget");
			return;
		case 18:
			switch (varp(player, 3813)) {
				case 6://Logout
					ENGINE.kickPlayer(player, true);
					return;
				case 7://Reset keybinds
				case 8://Delete friend
				case 9://Switch between eoc and legacy mode
			}
			defaultHandler(ctx, "confirm widget");
			return;
		default:
			defaultHandler(ctx, "confirm widget");
			return;
	}
});

function setLegacyInterfaceMode(player: Player) {
	setVarBit(player, 27169, 1);//Legacy mode enabled
	setVarp(player, 3813, 0);
	setVarBit(player, 22872, 1);
	setVarBit(player, 19925, 1);//Force lock interfaces
	//api.setVarp(player, 3680, 2305);
	setVarBit(player, 22875, 1);//Interface background colours
	setVarBit(player, 22874, 1);//Map icons
	setVarBit(player, 19928, 1);//Interface header bars
	//api.setVarp(player, 3814, 50);
	//api.setVarp(player, 3814, 54);
	//api.setVarp(player, 3814, 62);
	//api.setVarp(player, 1775, 8); - Always-on chat
	//api.setVarp(player, 3680, 2309);
	//api.setVarp(player, 3680, 3333);
	var onlineStatus = player.getChat().getFriendsList().getOnlineStatus().getSerialID();
	var on = false;
	var friends = false;
	if (onlineStatus === 0) {//On
		on = true;
	} else if (onlineStatus === 1) {//Friends
		friends = true;
		on = true;
	}
	setVarBit(player, 18801, on ? 1 : 0);
	setVarBit(player, 18809, friends ? 1 : 0);
	//api.setVarp(player, 1772, 753727); - Chat filters
	//api.setVarp(player, 1772, 753791);
	//api.setVarp(player, 1772, 753919);
	//api.setVarp(player, 4739, 4227073);
	//api.setVarp(player, 1772, 758015);
	setVarp(player, 4332, -2147483648);
	setVarp(player, 627, 8449);
	setVarp(player, 627, 8465);
	setVarp(player, 627, 8529);
	setVarp(player, 3711, 1024);
	setVarp(player, 3711, 3072);
	setVarp(player, 3711, 11264);
	setVarp(player, 895, 0);
	//api.setVarp(player, 659, 65538000);
	setVarp(player, 4012, 0);
	setVarp(player, 260, 0);
	setVarp(player, 260, 0);
	setVarp(player, 4012, 528982);
	setVarp(player, 260, 0);
	setVarc(player, 779, 124);
	openOverlaySub(player, 6, 1503, true);
}

function setEocInterfaceMode(player: Player) {
	setVarBit(player, 27169, 0);//Legacy mode disabled
	setVarp(player, 3813, 0);
	setVarBit(player, 22872, 0);
	//api.setVarp(player, 3680, 3077);
	setVarBit(player, 22875, 0);//Interface background colours
	setVarBit(player, 22874, 0);//Map icons
	setVarBit(player, 19928, 0);//Interface header bars
	//api.setVarp(player, 3814, 30);
	//api.setVarp(player, 3814, 26);
	//api.setVarp(player, 3814, 18);
	//api.setVarp(player, 3680, 3073);
	//api.setVarp(player, 3680, 2049);
	//api.setVarp(player, 1772, 757983); - Chat filters
	//api.setVarp(player, 1772, 757919);
	//api.setVarp(player, 1772, 757791);
	//api.setVarp(player, 4739, 4194305);
	//api.setVarp(player, 1772, 753695);
	//api.setVarp(player, 1775, 0); -Always-on chat
	setVarp(player, 4332, 0);
	setVarp(player, 627, 8528);
	setVarp(player, 627, 8512);
	setVarp(player, 627, 8448);
	setVarp(player, 3711, 10240);
	setVarp(player, 3711, 8192);
	setVarp(player, 3711, 0);
	setVarp(player, 4012, 0);
	setVarp(player, 260, 0);
	setVarp(player, 260, 0);
	setVarp(player, 4012, 528832);
	setVarp(player, 260, 0);
	setVarc(player, 779, 2704);

	openOverlaySub(player, 6, 1460, true);
	openOverlaySub(player, 7, 1452, true);
	openOverlaySub(player, 8, 1449, true);
	runClientScript(player, 8862, [5, 1]);
}

function setLegacyCombatMode(player: Player) {
	//TODO: Figure out what needs to be sent here
	setVarBit(player, 27168, 1);//Legacy combat mode enabled
	/*api.openWidget(player, 1477, 187, 1461, true);
	api.setWidgetEvents(player, 1461, 1, 0, 171, 97350);
	api.setWidgetEvents(player, 1461, 7, 6, 14, 2);
	api.openWidget(player, 1477, 165, 1503, true);
	api.setWidgetEvents(player, 1430, 55, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 60, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 68, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 73, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 81, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 86, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 94, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 99, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 107, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 112, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 120, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 125, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 133, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 138, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 146, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 151, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 159, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 164, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 172, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 177, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 185, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 190, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 198, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 203, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 211, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 216, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 224, -1, -1, 2098176);
	api.setWidgetEvents(player, 1430, 229, -1, -1, 2098176);
	api.setWidgetEvents(player, 1458, 31, 0, 28, 2);
	api.setWidgetEvents(player, 1430, 13, -1, -1, 0);
	api.setWidgetEvents(player, 1465, 19, -1, -1, 0);
	api.setWidgetEvents(player, 1430, 0, -1, -1, 262150);
	api.setWidgetEvents(player, 1430, 18, -1, -1, 0);
	api.setWidgetEvents(player, 1461, 1, 0, 171, 97350);
	api.setWidgetEvents(player, 590, 8, 0, 177, 6);*/
	player.setMode(CombatMode.LEGACY);
	ENGINE.refreshModel(player);
}

function setEoCCombatMode(player: Player) {
	//TODO: Figure out what needs to be sent here
	setVarBit(player, 27168, 0);//Legacy combat mode disabled
	/*api.openWidget(player, 1477, 187, 1461, true);
	api.setWidgetEvents(player, 1461, 1, 0, 171, 97350);
	api.setWidgetEvents(player, 1461, 7, 6, 14, 2);
	api.openWidget(player, 1477, 165, 1460, true);
	api.openWidget(player, 1477, 176, 1452, true);
	api.openWidget(player, 1477, 198, 1449, true);
	api.setWidgetEvents(player, 1460, 1, 0, 171, 97286);
	api.setWidgetEvents(player, 1452, 1, 0, 171, 97286);
	api.setWidgetEvents(player, 1449, 1, 0, 171, 97286);
	api.setWidgetEvents(player, 1460, 4, 6, 14, 2);
	api.setWidgetEvents(player, 1452, 7, 6, 14, 2);
	api.setWidgetEvents(player, 1449, 7, 6, 14, 2);*/
	player.getCombatSchedule().getActionBar().refresh();
	player.setMode(CombatMode.EOC);
	ENGINE.refreshModel(player);
}
