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
/* globals EventType, ENGINE */
var util = require('../core/util');
var widget = require('../core/widget');

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 20/12/2014
 */

module.exports = function(scriptManager) {
	scriptManager.bind(EventType.IF_BUTTON, 1702, function (ctx) {
		var player = ctx.player;
		var enabled, disabled;
		switch (ctx.component) {
		case 32://Click-through chatboxes
			enabled = ENGINE.getVarBit(player, 20188) === 1;
			ENGINE.setVarBit(player, 20188, enabled ? 0 : 1);
			return;
		case 36://Timestamps in chatbox
			enabled = ENGINE.getVarBit(player, 27452) === 1;
			ENGINE.setVarBit(player, 27452, enabled ? 0 : 1);
			return;
		case 40://Split private chat
			enabled = ENGINE.getVarBit(player, 20187) === 1;
			ENGINE.setVarBit(player, 20187, enabled ? 0 : 1);
			return;
		case 44://Show/hide login/logout notifications
			enabled = ENGINE.getVarBit(player, 24940) === 1;
			ENGINE.setVarBit(player, 24940, enabled ? 0 : 1);
			return;
		case 48://Hide public chat effects
			enabled = ENGINE.getVarp(player, 456) === 0;
			ENGINE.setVarp(player, 456, enabled ? 1 : 0);
			return;
		case 58://Public chat colour
			ENGINE.setVarBit(player, 24562, 7);
			widget.setEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 62://Friend chat colour
			ENGINE.setVarBit(player, 24562, 0);
			widget.setEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 66://Private chat colour
			ENGINE.setVarBit(player, 24562, 1);
			widget.setEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 70://Clan chat colour
			ENGINE.setVarBit(player, 24562, 2);
			widget.setEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 74://Guest clan chat colour
			ENGINE.setVarBit(player, 24562, 3);
			widget.setEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 78://Group chat colour
			ENGINE.setVarBit(player, 24562, 4);
			widget.setEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 82://Group team chat colour
			ENGINE.setVarBit(player, 24562, 5);
			widget.setEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 86://Twitch chat colour
			ENGINE.setVarBit(player, 24562, 6);
			widget.setEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 96:
			var mode = ENGINE.getVarBit(player, 24562);
			switch (mode) {
			case 0://Friend chat
				ENGINE.setVarBit(player, 1190, ctx.slot);
				return;
			case 1://Private chat
				ENGINE.setVarp(player, 457, ctx.slot);
				return;
			case 2://Clan chat
				ENGINE.setVarBit(player, 1188, ctx.slot);
				return;
			case 3://Guest clan chat
				ENGINE.setVarBit(player, 1191, ctx.slot);
				return;
			case 4://Group chat
				ENGINE.setVarBit(player, 24560, ctx.slot);
				return;
			case 5://Team Group chat
				ENGINE.setVarBit(player, 24561, ctx.slot);
				return;
			case 6://Twitch chat
				ENGINE.setVarBit(player, 21371, ctx.slot);
				return;
			case 7://Public chat
				ENGINE.setVarBit(player, 30165, ctx.slot);
				return;
			default:
				util.defaultHandler(ctx, "chat mode");
				return;
			}
			return;
		case 106://Enable friends chat window
			disabled = ENGINE.getVarBit(player, 30167) == 1;
			ENGINE.setVarBit(player, 30167, disabled ? 0 : 1);
			return;
		case 111://Enable private chat window
			if (ENGINE.getVarBit(player, 20187) != 1) {
				disabled = ENGINE.getVarBit(player, 30166) == 1;
				ENGINE.setVarBit(player, 30166, disabled ? 0 : 1);
			}
			return;
		case 116://Enable clan chat window
			disabled = ENGINE.getVarBit(player, 30168) == 1;
			ENGINE.setVarBit(player, 30168, disabled ? 0 : 1);
			return;
		case 121://Enable guest clan chat window
			disabled = ENGINE.getVarBit(player, 30169) == 1;
			ENGINE.setVarBit(player, 30169, disabled ? 0 : 1);
			return;
		case 126://Enable group chat window
			disabled = ENGINE.getVarBit(player, 30171) == 1;
			ENGINE.setVarBit(player, 30171, disabled ? 0 : 1);
			return;
		case 131://Enable trade/assist chat window
			disabled = ENGINE.getVarBit(player, 30170) == 1;
			ENGINE.setVarBit(player, 30170, disabled ? 0 : 1);
			return;
		case 137://Use fullname prefix
			ENGINE.setVarBit(player, 30172, 0);
			return;
		case 141://Use short prefix
			ENGINE.setVarBit(player, 30172, 1);
			return;
		case 145://Use no prefix
			ENGINE.setVarBit(player, 30172, 2);
			return;
		default:
			util.defaultHandler(ctx, "chat settings");
			return;
		}
	});
};