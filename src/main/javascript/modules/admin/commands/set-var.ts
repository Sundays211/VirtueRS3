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
import { setVarp, setVarc, setVarBit } from 'engine/var';

_events.bindEventListener(EventType.COMMAND_ADMIN, ["varp", "setvarp"], (ctx) => {
	//if (checkArgs(ctx)) {
	var key = parseInt(ctx.cmdArgs[0]);
	var value = parseInt(ctx.cmdArgs[1]);
	setVarp(ctx.player, key, value);
	sendCommandResponse(ctx.player, "Setting varp "+key+" to "+value, ctx.console);
	//}
});

_events.bindEventListener(EventType.COMMAND_ADMIN, ["varbit", "setvarbit"], (ctx) => {
	//if (checkArgs(ctx)) {
		var key = parseInt(ctx.cmdArgs[0]);
		var value = parseInt(ctx.cmdArgs[1]);
		try {
			setVarBit(ctx.player, key, value);
			sendCommandResponse(ctx.player, "Setting varbit "+key+" to "+value, ctx.console);
		} catch (e) {
			sendCommandResponse(ctx.player, "Failed to set varbit "+key, ctx.console);
		}
	//}
});

_events.bindEventListener(EventType.COMMAND_ADMIN, ["varc", "setvarc"], (ctx) => {
	//if (checkArgs(ctx)) {
		var key = parseInt(ctx.cmdArgs[0]);
		var value = parseInt(ctx.cmdArgs[1]);
		setVarc(ctx.player, key, value);
		sendCommandResponse(ctx.player, "Setting varc "+key+" to "+value, ctx.console);
	//}
});

_events.bindEventListener(EventType.COMMAND_ADMIN, ["varcstr", "setvarcstr"], (ctx) => {
	//if (checkArgs(ctx)) {
	    var key = parseInt(ctx.cmdArgs[0]);
	    var value = ctx.cmdArgs[1];
		setVarc(ctx.player, key, value);
		sendCommandResponse(ctx.player, "Setting varcstr "+key+" to "+value, ctx.console);
	//}
});
	
//function checkArgs (ctx) {
	//if (ctx.cmdArgs.length < 2) {
	    //sendCommandResponse(ctx.player, "Usage: "+ctx.syntax+" [id] [value]", ctx.console);
	//return false;
	//} else {
	//return true;
	//}
//}