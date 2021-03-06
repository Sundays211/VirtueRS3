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

import { sendMessage } from 'shared/chat';
import { playerDialog } from 'shared/dialog';
import { lookupPlayerName } from 'shared/util';
import { runAnim, addSpotAnim } from 'shared/anim';

 _events.bindEventListener(EventType.COMMAND_ADMIN, "freeze", async (ctx) => {
	var player = ctx.player;
	const targetPlayer = await playerDialog(player, "Please enter the display name of the player you wish to freeze:");
		sendMessage(player, "You have frozen the player named: " + lookupPlayerName(targetPlayer));
		runAnim(player, 1979);
		addSpotAnim(player, 366);
		addSpotAnim(targetPlayer, 369);
		targetPlayer.lock();
		sendMessage(targetPlayer, "You have been frozen.");

});
		
 _events.bindEventListener(EventType.COMMAND_ADMIN, "unfreeze", async (ctx) => {
	var player = ctx.player;
	const targetPlayer = await playerDialog(player, "Please enter the display name of the player you wish to unfreeze:");
		sendMessage(player, "You have unfrozen the player: "+ lookupPlayerName(targetPlayer));
		targetPlayer.unlock();
		sendMessage(targetPlayer, "You can now move again!");
});