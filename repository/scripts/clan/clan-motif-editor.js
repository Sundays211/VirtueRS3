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
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var util = require('util');
var widget = require('widget');
var dialog = require('dialog');
var chat = require('chat');

var broadcasts = require('./logic/broadcasts');
var clan = require('./logic/core');

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 24/01/2015
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 1105, function (ctx) {
		//if_opensub: parent=1477, parentSlot=412, if=1105, closable=0
		widget.setEvents(ctx.player, 1105, 66, 0, 118, 2);
		widget.setEvents(ctx.player, 1105, 63, 0, 118, 2);
		util.runClientScript(ctx.player, 4399, [72417446]);
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 1105, function (ctx) {
		switch (ctx.component) {
		case 148://Close button
			return;
		case 120://Save changes
			saveChanges(ctx.player);
			return;
		case 35://Change symbol 1 colour
			selectColour(ctx.player, 1);
			return;
		case 80://Change symbol 2 colour
			selectColour(ctx.player, 2);
			return;
		case 92://Change primary colour
			selectColour(ctx.player, 3);
			return;
		case 104://Change secondary colour
			selectColour(ctx.player, 4);
			return;
		case 66://Select logo 1
			selectLogo(ctx.player, 1, ctx.slot);
			return;
		case 63://Select logo 2
			selectLogo(ctx.player, 2, ctx.slot);
			return;
		case 15://Change sym1 col to sym2 col
			copyColour(ctx.player, 2, 1);
			return;
		case 17://Change sym1 col to primary col
			copyColour(ctx.player, 3, 1);
			return;
		case 19://Change sym1 col to secondary col
			copyColour(ctx.player, 4, 1);
			return;
		case 196://Change sym2 col to sym1 col
			copyColour(ctx.player, 1, 2);
			return;
		case 198://Change sym2 col to primary col
			copyColour(ctx.player, 3, 2);
			return;
		case 200://Change sym2 col to secondary col
			copyColour(ctx.player, 4, 2);
			return;
		case 210://Change primary col to sym1 col
			copyColour(ctx.player, 1, 3);
			return;
		case 212://Change primary col to sym2 col
			copyColour(ctx.player, 2, 3);
			return;
		case 214://Change primary col to secondary col
			copyColour(ctx.player, 4, 3);
			return;
		case 224://Change secondary col to sym1 col
			copyColour(ctx.player, 1, 4);
			return;
		case 226://Change secondary col to sym2 col
			copyColour(ctx.player, 2, 4);
			return;
		case 228://Change secondary col to primary col
			copyColour(ctx.player, 3, 4);
			return;
		default:
			util.defaultHandler(ctx, "clan motif editor");
			return;
		}
	});
	
	function saveChanges  (player) {
		varbit(player, 8815, varbit(player, 8965));//Update logo 1
		varbit(player, 8816, varbit(player, 8966));//Update logo 2
		ENGINE.setVarClanSetting(player, 16, varp(player, 2067));//Update logo 1 colour
		ENGINE.setVarClanSetting(player, 17, varp(player, 2068));//Update logo 2 colour
		ENGINE.setVarClanSetting(player, 18, varp(player, 2069));//Update primary colour
		ENGINE.setVarClanSetting(player, 19, varp(player, 2070));//Update secondary colour
		chat.sendMessage(player, "Clan motif updated. Changes will take effect in the next few minutes.");
		broadcasts.send(clan.getHash(player), 24, ["[Player A]"], [util.getName(player)]);
		widget.closeAll(player);
	}
	
	function selectLogo (player, type, slot) {
		switch (type) {
		case 1:
			varbit(player, 8965, slot+1);
			return;
		case 2:
			varbit(player, 8966, slot+1);
			return;
		}
	}
	
	function selectColour (player, type) {
		var prevColour;
		switch (type) {
		case 1:
			prevColour = varp(player, 2067);
			break;
		case 2:
			prevColour = varp(player, 2068);
			break;
		case 3:
			prevColour = varp(player, 2069);
			break;
		case 4:
			prevColour = varp(player, 2070);
			break;
		}
		varp(player, 1111, prevColour);
		widget.openCentral(player, 1106);
		dialog.setResumeHandler(player, function (value) {
			widget.closeAll(player);
			if (value !== 0) {
				switch (type) {
				case 1:
					varp(player, 2067, value);
					break;
				case 2:
					varp(player, 2068, value);
					break;
				case 3:
					varp(player, 2069, value);
					break;
				case 4:
					varp(player, 2070, value);
					break;
				}
			}
			widget.openCentral(player, 1105);
			util.runClientScript(player, 4399, [72417469]);
		});
	}
	
	function copyColour (player, fromType, toType) {
		var colour;
		switch (fromType) {
		case 1:
			colour = varp(player, 2067);
			break;
		case 2:
			colour = varp(player, 2068);
			break;
		case 3:
			colour = varp(player, 2069);
			break;
		case 4:
			colour = varp(player, 2070);
			break;
		}
		switch (toType) {
		case 1:
			varp(player, 2067, colour);
			break;
		case 2:
			varp(player, 2068, colour);
			break;
		case 3:
			varp(player, 2069, colour);
			break;
		case 4:
			varp(player, 2070, colour);
			break;
		}
	}
};