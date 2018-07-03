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
/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _entity from 'engine/entity';
import _map from 'engine/map';

import _coords from 'shared/map/coords';
import { sendMessage, sendCommandResponse } from 'shared/chat';
import { playerDialog } from 'shared/dialog';

_events.bindEventListener(EventType.COMMAND_ADMIN, "home" , (ctx) => {
    _entity.setCoords(ctx.player, _coords(0, 50, 50, 21, 19));	
});

_events.bindEventListener(EventType.COMMAND_ADMIN, [ "tele", "goto", "move" ], (ctx) => {
	var args = ctx.cmdArgs;
	var x, y, level;
	var currentCoords = _map.getCoords(ctx.player);
	var targetCoords;
	if (args.length < 2) {
		sendCommandResponse(ctx.player, "Usage: "+ctx.syntax+" [x-coord] [y-coord]", ctx.console);
	return;
	}
	if (args.length >= 5) {
		level = parseInt(args[0]);
		var squareX = parseInt(args[1]);
		var squareY = parseInt(args[2]);
		var localX = parseInt(args[3]);
		var localY = parseInt(args[4]);
		targetCoords = _coords(level, squareX, squareY, localX, localY);
	} else	if (args.length == 2) {
		x = parseInt(args[0]);
		y = parseInt(args[1]);
		level = _map.getLevel(currentCoords);
		targetCoords = _coords(x, y, level);
	} else {
		x = parseInt(args[0]);
		y = parseInt(args[1]);
		level = parseInt(args[2]);
		targetCoords = _coords(x, y, level);
	}
	_entity.setCoords(ctx.player, targetCoords);
});

 _events.bindEventListener(EventType.COMMAND_ADMIN, "up", (ctx) => {
	var currentCoords = _map.getCoords(ctx.player);
	var x = _map.getCoordX(currentCoords);
	var y = _map.getCoordY(currentCoords);
	var level = Math.min(_map.getLevel(currentCoords)+1, 3);
	_entity.setCoords(ctx.player, _coords(x, y, level));
	sendMessage(ctx.player, "You can use ctrl+shift scroll to change levels");
});

 _events.bindEventListener(EventType.COMMAND_ADMIN, "down", (ctx) => {
	var currentCoords = _map.getCoords(ctx.player);
	var x = _map.getCoordX(currentCoords);
	var y = _map.getCoordY(currentCoords);
	var level = Math.max(_map.getLevel(currentCoords)-1, 0);
	_entity.setCoords(ctx.player, _coords(x, y, level));
	sendMessage(ctx.player, "You can use ctrl+shift scroll to change levels");
});

 _events.bindEventListener(EventType.COMMAND_ADMIN, "teleto", async (ctx) => {
    const targetPlayer = await playerDialog(ctx.player, "Please enter the display name of the player you wish to teleport to:");
	_entity.setCoords(ctx.player, _map.getCoords(targetPlayer));
});

 _events.bindEventListener(EventType.COMMAND_ADMIN, "teletome", async (ctx) => {
	const targetPlayer = await playerDialog(ctx.player, "Please enter the display name of the player you wish to teleport to you:");
	_entity.setCoords(targetPlayer, _map.getCoords(ctx.player));
});