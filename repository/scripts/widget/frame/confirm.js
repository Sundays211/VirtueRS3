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
/* globals EventType, ENGINE, Java */
var varbit = require('engine/var/bit');
var varp = require('engine/var/player');
var varc = require('engine/var/client');

var widget = require('shared/widget');
var util = require('shared/util');

var CombatMode = Java.type('org.virtue.game.entity.combat.CombatMode');
/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 11, 2014
 */
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 26, function (ctx) {
			widget.setEvents(ctx.player, 26, 22, -1, -1, 2);
		});

		scriptManager.bind(EventType.IF_BUTTON, 26, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 11:
				switch (varp(player, 3813)) {
				case 6://Logout
					ENGINE.kickPlayer(player, false);
					return;
				case 9://Switch between eoc and legacy combat mode
					if (varbit(player, 27168) == 1) {//Legacy mode
						setEoCCombatMode(player);
					} else {//EoC Mode
						setLegacyCombatMode(player);
					}
					widget.closeSub(player, 1477, 871);
					return;
				case 10://Switch between eoc and legacy interface mode
					if (varbit(player, 27169) == 1) {//Legacy mode
						setEocInterfaceMode(player);
					} else {//EoC Mode
						setLegacyInterfaceMode(player);
					}
					widget.closeSub(player, 1477, 871);
					return;
				case 7://Reset keybinds
				case 8://Delete friend
				}
				util.defaultHandler(ctx, "confirm widget");
				return;
			case 18:
				switch (varp(player, 3813)) {
				case 6://Logout
					ENGINE.kickPlayer(player, true);
					return;
				case 7://Reset keybinds
				case 8://Delete friend
				case 9://Switch between eoc and legacy mode
				}
				util.defaultHandler(ctx, "confirm widget");
				return;
			default:
				util.defaultHandler(ctx, "confirm widget");
				return;
			}
		});
	}

	function setLegacyInterfaceMode (player) {
		varbit(player, 27169, 1);//Legacy mode enabled
		varp(player, 3813, 0);
		varbit(player, 22872, 1);
		varbit(player, 19925, 1);//Force lock interfaces
		//api.setVarp(player, 3680, 2305);
		varbit(player, 22875, 1);//Interface background colours
		varbit(player, 22874, 1);//Map icons
		varbit(player, 19928, 1);//Interface header bars
		//api.setVarp(player, 3814, 50);
		//api.setVarp(player, 3814, 54);
		//api.setVarp(player, 3814, 62);
		//api.setVarp(player, 1775, 8); - Always-on chat
		//api.setVarp(player, 3680, 2309);
		//api.setVarp(player, 3680, 3333);
		var onlineStatus = player.getChat().getFriendsList().getOnlineStatus().getSerialID();
		var on = false;
		var friends = false;
		if (onlineStatus === 0) {//On
			on = true;
		} else if (onlineStatus === 1) {//Friends
			friends = true;
			on = true;
		}
		varbit(player, 18801, on ? 1 : 0);
		varbit(player, 18809, friends ? 1 : 0);
		//api.setVarp(player, 1772, 753727); - Chat filters
		//api.setVarp(player, 1772, 753791);
		//api.setVarp(player, 1772, 753919);
		//api.setVarp(player, 4739, 4227073);
		//api.setVarp(player, 1772, 758015);
		varp(player, 4332, -2147483648);
		varp(player, 627, 8449);
		varp(player, 627, 8465);
		varp(player, 627, 8529);
		varp(player, 3711, 1024);
		varp(player, 3711, 3072);
		varp(player, 3711, 11264);
		varp(player, 895, 0);
		//api.setVarp(player, 659, 65538000);
		varp(player, 4012, 0);
		varp(player, 260, 0);
		varp(player, 260, 0);
		varp(player, 4012, 528982);
		varp(player, 260, 0);
		varc(player, 779, 124);
		widget.openOverlaySub(player, 6, 1503, true);
	}

	function setEocInterfaceMode (player) {
		varbit(player, 27169, 0);//Legacy mode disabled
		varp(player, 3813, 0);
		varbit(player, 22872, 0);
		//api.setVarp(player, 3680, 3077);
		varbit(player, 22875, 0);//Interface background colours
		varbit(player, 22874, 0);//Map icons
		varbit(player, 19928, 0);//Interface header bars
		//api.setVarp(player, 3814, 30);
		//api.setVarp(player, 3814, 26);
		//api.setVarp(player, 3814, 18);
		//api.setVarp(player, 3680, 3073);
		//api.setVarp(player, 3680, 2049);
		//api.setVarp(player, 1772, 757983); - Chat filters
		//api.setVarp(player, 1772, 757919);
		//api.setVarp(player, 1772, 757791);
		//api.setVarp(player, 4739, 4194305);
		//api.setVarp(player, 1772, 753695);
		//api.setVarp(player, 1775, 0); -Always-on chat
		varp(player, 4332, 0);
		varp(player, 627, 8528);
		varp(player, 627, 8512);
		varp(player, 627, 8448);
		varp(player, 3711, 10240);
		varp(player, 3711, 8192);
		varp(player, 3711, 0);
		varp(player, 4012, 0);
		varp(player, 260, 0);
		varp(player, 260, 0);
		varp(player, 4012, 528832);
		varp(player, 260, 0);
		varc(player, 779, 2704);

		widget.openOverlaySub(player, 6, 1460, true);
		widget.openOverlaySub(player, 7, 1452, true);
		widget.openOverlaySub(player, 8, 1449, true);
		util.runClientScript(player, 8862, [5, 1]);
	}

	function setLegacyCombatMode (player) {
		//TODO: Figure out what needs to be sent here
		varbit(player, 27168, 1);//Legacy combat mode enabled
		/*api.openWidget(player, 1477, 187, 1461, true);
		api.setWidgetEvents(player, 1461, 1, 0, 171, 97350);
		api.setWidgetEvents(player, 1461, 7, 6, 14, 2);
		api.openWidget(player, 1477, 165, 1503, true);
		api.setWidgetEvents(player, 1430, 55, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 60, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 68, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 73, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 81, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 86, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 94, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 99, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 107, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 112, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 120, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 125, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 133, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 138, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 146, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 151, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 159, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 164, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 172, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 177, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 185, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 190, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 198, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 203, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 211, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 216, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 224, -1, -1, 2098176);
		api.setWidgetEvents(player, 1430, 229, -1, -1, 2098176);
		api.setWidgetEvents(player, 1458, 31, 0, 28, 2);
		api.setWidgetEvents(player, 1430, 13, -1, -1, 0);
		api.setWidgetEvents(player, 1465, 19, -1, -1, 0);
		api.setWidgetEvents(player, 1430, 0, -1, -1, 262150);
		api.setWidgetEvents(player, 1430, 18, -1, -1, 0);
		api.setWidgetEvents(player, 1461, 1, 0, 171, 97350);
		api.setWidgetEvents(player, 590, 8, 0, 177, 6);*/
		player.setMode(CombatMode.LEGACY);
		ENGINE.refreshModel(player);
	}

	function setEoCCombatMode (player) {
		//TODO: Figure out what needs to be sent here
		varbit(player, 27168, 0);//Legacy combat mode disabled
		/*api.openWidget(player, 1477, 187, 1461, true);
		api.setWidgetEvents(player, 1461, 1, 0, 171, 97350);
		api.setWidgetEvents(player, 1461, 7, 6, 14, 2);
		api.openWidget(player, 1477, 165, 1460, true);
		api.openWidget(player, 1477, 176, 1452, true);
		api.openWidget(player, 1477, 198, 1449, true);
		api.setWidgetEvents(player, 1460, 1, 0, 171, 97286);
		api.setWidgetEvents(player, 1452, 1, 0, 171, 97286);
		api.setWidgetEvents(player, 1449, 1, 0, 171, 97286);
		api.setWidgetEvents(player, 1460, 4, 6, 14, 2);
		api.setWidgetEvents(player, 1452, 7, 6, 14, 2);
		api.setWidgetEvents(player, 1449, 7, 6, 14, 2);*/
		player.getCombatSchedule().getActionBar().refresh();
		player.setMode(CombatMode.EOC);
		ENGINE.refreshModel(player);
	}
})();
