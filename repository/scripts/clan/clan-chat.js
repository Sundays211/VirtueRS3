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
/* globals EventType */
var util = require('../core/util');
var widget = require('../widget');
var chat = require('../chat');
var clan = require('./logic/core');

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/12/2014
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 1110, function (ctx) {
		widget.setEvents(ctx.player, 1110, 34, 0, 200, 2);
		widget.setEvents(ctx.player, 1110, 72, 0, 600, 2);//Clan members list
		widget.setEvents(ctx.player, 1110, 70, 0, 600, 1040);
		widget.setEvents(ctx.player, 1110, 42, 0, 600, 1040);
	});
	scriptManager.bind(EventType.IF_BUTTON, 1110, function (ctx) {
		switch (ctx.component) {
		case 109://Expand clan actions
			widget.open(ctx.player, 1477, 542, 234, true);
			util.runClientScript(ctx.player, 8787, [-6, -24, 2, -1, 72745069, 40, 160]);
			return;
		case 168://Clan chat
		case 170://Visited clan chat
		case 166://Clan ban list
			return;//Prevents swapping chat tabs from triggering a debug message
		case 159://Leave clan
			clan.leave(ctx.player);
			return;
		case 142://Clan settings
			if (!clan.inClan(ctx.player)) {
				chat.sendMessage(ctx.player, "You're not in a clan.");				
			} else {
				widget.openCentral(ctx.player, 1096);
			}
			return;
		case 20://Add ban
			clan.addBan(ctx.player);
			return;
		case 28://Remove ban
			clan.removeBan(ctx.player, -1);
			return;
		case 34://Clan ban list interaction
			clan.removeBan(ctx.player, ctx.slot);
			return;
		case 118://Leave clan channel
		case 126://Clan details
		case 134://Clan noticeboard
			//You do not have sufficient rank in your clan to do this.
		case 59://Join clan as guest
		case 72://Show clanmate options
		case 101://Close clanmate options
		case 83://Temp ban clan member
		case 97://Show clanmate resources
			util.defaultHandler(ctx, "clan chat");
			return;
		default:
			util.defaultHandler(ctx, "clan chat");
			return;
		}
	});
	scriptManager.bind(EventType.IF_BUTTON, 234, function (ctx) {
		switch (ctx.component) {
		case 4://Leave clan
			clan.leave(ctx.player);
			return;
		case 16://Clan settings
			if (!clan.inClan(ctx.player)) {
				chat.sendMessage(ctx.player, "You're not in a clan.");
			} else {
				widget.openCentral(ctx.player, 1096, false);
			}
			return;
		case 34://Leave clan channel
		case 28://Clan details
		case 22://Clan noticeboard
			util.defaultHandler(ctx, "clan action button");
			return;
		default:
			util.defaultHandler(ctx, "clan action button");
			return;
		}
	});
};



