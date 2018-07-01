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

import { sendCommandResponse } from 'shared/chat';
import { runClientScript } from 'shared/util';

_events.bindEventListener(EventType.COMMAND_ADMIN, ["cs2", "cscript"], (ctx) => {
	var player = ctx.player;
	var args = ctx.cmdArgs;
	if (ctx.length < 1 || isNaN(parseInt(args[0]))) {
		sendCommandResponse(player, "Usage: "+ctx.syntax+" [id] [args]", ctx.console);
	return;
	}
	var scriptId = parseInt(args[0]);
	var params = [];
	for (var i = 1; i<args.length;i++) {
		if (!args[i].trim()) {
		continue;
		}
	try {
		params[i-1] = parseInt(args[i]);
		if (isNaN(params[i-1]as number)) {
		    params[i-1] = args[i];
	    }
	} catch (e) {
		params[i-1] = args[i];
	}
	}
	sendCommandResponse(player, "Running client script "+scriptId+" with params "+JSON.stringify(params), ctx.console);
	runClientScript(player, scriptId, params);
});