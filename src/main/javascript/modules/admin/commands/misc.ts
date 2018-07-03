/**
 * Copyright (c) 2015 Virtue Studios
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
import _map from 'engine/map';
import { setVarc } from 'engine/var';

import { sendMessage, sendCommandResponse } from 'shared/chat';
import { lookupPlayerName, toFormattedTime } from 'shared/util';
import { openCentralWidget, openWidget } from 'shared/widget';
import _coords from 'shared/map/coords';
import { runAnim } from 'shared/anim';
import { teleport } from 'shared/map';

var Virtue = Java.type('org.virtue.Virtue');
var World = Java.type('org.virtue.game.World');

_events.bindEventListener(EventType.COMMAND_ADMIN, "root", (ctx) => {
	var parent = parseInt(ctx.cmdArgs[0]);
	ctx.player.getDispatcher().sendRootWidget(parent);
});

_events.bindEventListener(EventType.COMMAND_ADMIN, ["coords","pos","mypos"], (ctx) => {
    sendCommandResponse(ctx.player, lookupPlayerName(ctx.player) +" "+ _map.getCoords(ctx.player) +" or "+ _map.getCoordX(ctx.player)+" "+ _map.getCoordY(ctx.player), ctx.console);
});

_events.bindEventListener(EventType.COMMAND_ADMIN, [ "inter", "if", "widget" ], (ctx) => {
	var player = ctx.player;
	var args = ctx.cmdArgs;
	if (args.length < 1 || isNaN(parseInt(args[0]))) {
		sendCommandResponse(player, "Usage: "+ctx.syntax+" [id]", ctx.console);
	return;
	}
	if (args.length >= 3) {
	    var parent = parseInt(args[0]);
		var slot = parseInt(args[1]);
		var sub = parseInt(args[2]);
		openWidget(player, parent, slot, sub, false);
	} else {
		openCentralWidget(player, parseInt(args[0]), false);
	}
});

_events.bindEventListener(EventType.COMMAND_ADMIN, "uptime", (ctx) => {
	var ticks = ENGINE.getServerCycle();
	var time = toFormattedTime(ticks);
	sendCommandResponse(ctx.player, "Server has been online for "+time+".", ctx.console);
});

_events.bindEventListener(EventType.COMMAND_ADMIN, "setKey", (ctx) => {
	var player = ctx.player;
	var args = ctx.cmdArgs;
	var amount = parseInt(args[0]);
	player.setKeys(amount);
	setVarc(player, 1800, player.getKeys() - 1);
	sendMessage(player, "You now have "+(player.getKeys())+" for Treasure Hunter.");
});

_events.bindEventListener(EventType.COMMAND_ADMIN, ["priceReload", "reloadPrice"], (ctx) => {
	Virtue.getInstance().getExchange().loadPrices();
});

_events.bindEventListener(EventType.COMMAND_ADMIN, "adr", (ctx) => {
	ctx.player.getCombatSchedule().updateAdrenaline(100);
});

_events.bindEventListener(EventType.COMMAND_ADMIN, "adminroom", (ctx) => {
	teleport(ctx.player, _coords(2845, 5154, 0), 18007);
});

_events.bindEventListener(EventType.COMMAND_ADMIN, "forcetalk", (ctx) => {
	var player = ctx.player;
	var args = ctx.cmdArgs;
	var message = "";
	for (var i = 0; i < args.length; i++) {
		message += (i === 0 ? (args[i].substring(0, 1).toUpperCase() + args[i].substring(1)) : args[i]) + (i == args.length - 1 ? "" : " ");
	}
	var iterate = World.getInstance().getPlayers().iterator();
	var players = null;
	while (iterate.hasNext()) {
		players = iterate.next();
		ENGINE.playerForceSay(player, message, false);
	}
});

_events.bindEventListener(EventType.COMMAND_ADMIN, "forcedance", (ctx) => {
	var iterate = ENGINE.getPlayerIterator(ENGINE.getWorld());
	var p2 = null;
	while (iterate.hasNext()) {
	    p2 = iterate.next();
		p2.getAppearance().setRenderAnimation(3171);
		p2.getAppearance().refresh();
		runAnim(p2, 7071);//7071
	}
});