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
/* globals EventType, ENGINE, Inv */
var dialog = require('../core/dialog');
var inv = require('../core/inv');
var clan = require('./logic/core');
var util = require('../core/util');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/01/2015
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.OPNPC1, 5915, function (ctx) {
		dialog.chatnpc(ctx.player, ctx.npc, "Hey "+util.getName(ctx.player)+", I am giving away free clan vex. If you right click me and click get vex.");
	});
	
	scriptManager.bind(EventType.OPNPC3, 5915, function (ctx) {
		startClanVexGiver(ctx.player, ctx.npc);//Get vexillum from
	});
	
	scriptManager.bind(EventType.OPNPC1, 13633, function (ctx) {
		dialog.chatnpc(ctx.player, ctx.npc, "Hey "+util.getName(ctx.player)+", You can get a clan cape from me.");
	});
	
	scriptManager.bind(EventType.OPNPC3, 13633, function (ctx) {
		startClanCloakGiver(ctx.player, ctx.npc);
	});

	function startClanVexGiver (player, npc) {
		if (!inv.hasSpace(player)) {
			ENGINE.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		if (!clan.inClan(player)) {
			ENGINE.sendMessage(player, "You must be in a clan to get a clan vex.");
			return;
		}
		if (inv.has(player, 20709) || inv.has(player, 20709, 1, Inv.BANK) > 0) {
			ENGINE.sendMessage(player, "You already own a clan vexillum.");
			return;
		}
		inv.give(player, 20709, 1);
		dialog.chatnpc(player, npc, "Here you go "+util.getName(player)+".");
	}

	function startClanCloakGiver (player, npc) {
		if (!inv.hasSpace(player)) {
			ENGINE.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		if (!clan.inClan(player)) {
			ENGINE.sendMessage(player, "You must be in a clan to get a clan cloak.");
			return;
		}
		if (inv.has(player, 20708) || inv.has(player, 20709, 1, Inv.BANK)) {
			ENGINE.sendMessage(player, "You already own a clan cloak.");
			return;
		}
		inv.give(player, 20708, 1);
		dialog.chatnpc(player, npc, "Here you go "+util.getName(player)+".");
	}
};