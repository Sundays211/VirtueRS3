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
/* globals EventType, ChatListType */
var widget = require('../core/widget');
var util = require('../core/util');
var dialog = require('../core/dialog');
var chat = require('./core');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 9/11/2014
 */

module.exports = function(scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 550, function (ctx) {
		widget.setEvents(ctx.player, 550, 7, 0, 500, 1022);
		widget.setEvents(ctx.player, 550, 57, 0, 500, 6);
	});
	
	scriptManager.bind(EventType.IF_PLAYER, ChatListType.FRIEND, function (ctx) {
		var player = ctx.player;
		if (ctx.interface == 550) {
			switch (ctx.button) {
			case 7:
				widget.openOverlaySub(player, 1006, 451, false);
				util.runClientScript(player, 8178, []);
				util.runClientScript(player, 9206, [ctx.slot, 0, 29556758, 29556742, 29556743]);
				return;
			}
		}
		util.defaultHandler(ctx, "friend list");
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 550, function (ctx) {
		var player = ctx.player;
		
		switch (ctx.component) {
		case 7://Friends list pane
			if (ctx.button == 7) {
				widget.openOverlaySub(player, 1006, 451, false);
				util.runClientScript(player, 8178, []);
				util.runClientScript(player, 9206, [ctx.slot, 0, 29556758, 29556742, 29556743]);
				return;
			}
			util.defaultHandler(ctx, "friend list");
			return;
		case 25://Add friend
			dialog.openModalBase(player);
			util.runClientScript(player, 8178, []);
			util.runClientScript(player, 103, []);
			return;
		case 33://Remove friend
			dialog.openModalBase(player);
			util.runClientScript(player, 8178, []);
			util.runClientScript(player, 104, []);
			return;
		case 42://Recruit friend
			chat.sendDebugMessage(player, "Recruit friend has not been implemented");
			return;
		case 57://Add/set ignore note 
			if (ctx.button == 1) {
				widget.openOverlaySub(player, 1006, 451, false);
				util.runClientScript(player, 8178, []);
				util.runClientScript(player, 9206, [ctx.slot/2, 1, 29556758, 29556742, 29556743]);
				return;
			}
			util.defaultHandler(ctx, "ignore list");
			return;
		case 74://Add ignore
			dialog.openModalBase(player);
			util.runClientScript(player, 8178, []);
			util.runClientScript(player, 105, []);
			return;
		case 82://Remove ignore
			dialog.openModalBase(player);
			util.runClientScript(player, 8178, []);
			util.runClientScript(player, 1419, []);
			return;
		case 49://Reorder friends list
		case 90://Reorder ignore list
		case 98:
		case 100://Switching between friend and ignore tabs. We'll send this as handled so it doesn't spam the chatbox
			return;
		default:
			util.defaultHandler(ctx, "friend list");
			return;
		}
	});
};