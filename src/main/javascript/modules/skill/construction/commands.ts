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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _map from 'engine/map';
import _config from 'engine/config';

import { sendCommandResponse } from 'shared/chat';
import { varbit } from 'engine/var';

import { removeRoom, addRoom } from './house-builder';
import { enterHouse } from './house-portal';
import { loadRoom } from './room-data';

_events.bindEventListener(EventType.COMMAND, "house", (ctx) => {
 	enterHouse(ctx.player);
 });

_events.bindEventListener(EventType.COMMAND, "addroom", (ctx) => {
 	var args = ctx.cmdArgs;

 	if (args.length < 1) {
 		sendCommandResponse(ctx.player, "Usage: room {room_id}", ctx.console);
 		return;
 	}
 	var roomObjId = parseInt(args[0]);
 	if (!roomObjId) {
 		sendCommandResponse(ctx.player, "Usage: room {room_id} [{rotation}]", ctx.console);
 		return;
 	}

 	var rotation = 0;
 	if (args.length >= 2) {
 		rotation = parseInt(args[1]) & 0x3;
 	}
 	var zoneX = Math.floor(_map.getLocalX(ctx.player) / 8);
 	var zoneY = Math.floor(_map.getLocalY(ctx.player) / 8);
 	var level = _map.getLevel(ctx.player);

 	addRoom(ctx.player, roomObjId, zoneX, zoneY, level, rotation);
 	sendCommandResponse(ctx.player, `"Added ${_config.objName(roomObjId)} at ${zoneX}, ${zoneY}`, ctx.console);
 });

_events.bindEventListener(EventType.COMMAND, "delroom", (ctx) => {
 	var zoneX = Math.floor(_map.getLocalX(ctx.player) / 8);
 	var zoneY = Math.floor(_map.getLocalY(ctx.player) / 8);
 	var level = _map.getLevel(ctx.player);

 	var roomId = loadRoom(ctx.player, zoneX, zoneY, level);
 	if (roomId === -1 || varbit(ctx.player, 1528) === 0) {
 		sendCommandResponse(ctx.player, "No room exists at "+zoneX+", "+zoneY+", "+level, ctx.console);
 	} else {
 		removeRoom(ctx.player, roomId, zoneX, zoneY, level);
 		sendCommandResponse(ctx.player, "Removed room at "+zoneX+", "+zoneY+", "+level, ctx.console);
 	}
 });
