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
import { EventType, Inv } from 'engine/enums';
import { EventContext, Player } from 'engine/models';
import _events from 'engine/events';
import _entity from 'engine/entity';
import _map from 'engine/map';

import { sendMessage, sendCommandResponse } from 'shared/chat';
import { playerDialog } from 'shared/dialog';
import { lookupPlayerName, getUserHash } from 'shared/util';
import { runAnim } from 'shared/anim';
import _coords from 'shared/map/coords';
import { locationAnim } from 'shared/map/location';



_events.bindEventListener(EventType.COMMAND_ADMIN, "sound", (ctx) => {
	var args = ctx.cmdArgs;
	var player = ctx.player;
		player.getDispatcher().sendSound(parseInt(args[0]), 255);
});



 _events.bindEventListener(EventType.COMMAND_ADMIN, "test", (ctx) => {
	var args = ctx.cmdArgs;
	var player = ctx.player;
	if (args.length < 1) {
		sendCommandResponse(player, "Usage: test <type>", ctx.console);
	}
	switch (args[0]) {
		case "icons":
			testHeadIcons(player, args, ctx);
		return;
		case "name":
			testNameChange(player);
		return;
		case "locanim":
			testLocAnim(player, args, ctx);
		return;
		case "mestype":
			testMessageType(player, args, ctx);
		return;
		case "move":
			testDelayedMovement(player, args, ctx);
		return;
	}
});

function testHeadIcons(player: Player, args: string[], ctx: EventContext) {
	if (args.length >= 4) {
			player.getHeadIcons().setIcon(parseInt(args[3]), parseInt(args[1]), parseInt(args[2]));
			player.getHeadIcons().refresh();
	} else {
		sendCommandResponse(player, "Usage: test icons <main_sprite> <sub_sprite> <slot>", ctx.console);
	}
}

async function testNameChange (player: Player) {
	const name = await playerDialog(player, "Please enter your desired display name: ");
	    var userHash = getUserHash(player);
	    var oldName = lookupPlayerName(userHash);
		var success = ENGINE.setDisplayName(player, userHash, name);
		if (success) {
			sendMessage(player, "Your display name has been changed from "+oldName+" to "+name+".");
			sendMessage(player, "You might need to log out for the change to take effect.");
			sendMessage(player, "NOTE: This change has no effect on the name you use to log in.");
		} else {
			sendMessage(player, "Sorry, "+name+" is not available.");
		}
}

function testLocAnim(player: Player, args: string[], ctx: EventContext) {
	if (args.length < 2 || isNaN(parseInt(args[1]))) {
		sendCommandResponse(player, "Usage: test locanim <anim_id>", ctx.console);
	return;
	}
	var animId = parseInt(args[1]);
	var locCoords = _coords(2551, 3550, 0);
	var shape = 10;
	var loc = _map.getLoc(locCoords, shape);
	 locationAnim(loc, animId);
}

function testMessageType(player: Player, args: string[], ctx: EventContext) {
	if (args.length < 2 || isNaN(parseInt(args[1]))) {
		sendCommandResponse(player, "Usage: test mestype <channel_id>", ctx.console);
	return;
	}
	var mesType = parseInt(args[1]);
	    sendMessage(player, "Test", mesType);
	}

function testDelayedMovement(player: Player, args: string[], ctx: EventContext) {
	runAnim(player, 751);
	var currentCoords = _entity.getCoords(player);
	var targetCoords = _coords(currentCoords, 0, -5, 0);
	sendCommandResponse(player, "Running foce move to: "+targetCoords, ctx.console);
	_entity.forceMove(player, targetCoords, 105);
}