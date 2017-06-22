/**
 * Copyright (c) 2016 Virtue Studios
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
var varbit = require('engine/var/bit');
var varp = require('engine/var/player');
var varc = require('engine/var/client');

var widget = require('widget');
var util = require('util');

var overlay = require('widget/overlay');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_BUTTON, 1433, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 67://Logout to lobby
				ENGINE.kickPlayer(player, true);
				return;
			case 75://Logout
				ENGINE.kickPlayer(player, false);
				return;
			case 35://Edit mode
				//IF open sub: parentId=1477, parentComp=381, id=1215, mode=1
				//IF hide: if=1477, comp=381, hidden=0
				//IF hide: if=745, comp=5, hidden=1
				//IF open sub: parentId=1477, parentComp=506, id=1475, mode=0
				//IF events: if=1475, comp=68, from=0, to=7, events=2
				//api.setVarp(player, 659, 65537790);
				widget.open(player, 1477, 524, 1475, false);
				widget.setEvents(player, 1475, 68, 2, 7, 2);
				return;
			case 43://Game Settings
				varbit(player, 19001, 1);
				overlay.open(player, 9);
				return;
			case 83://Interface Settings
				varbit(player, 19001, 2);
				overlay.open(player, 9);
				return;
			case 91://Controls
				varbit(player, 19001, 3);
				overlay.open(player, 9);
				return;
			case 51://Graphics
				varbit(player, 19001, 4);
				overlay.open(player, 9);
				return;
			case 59://Audio
				varbit(player, 19001, 5);
				overlay.open(player, 9);
				return;
			case 25://Hero
				overlay.open(player, 0);
				return;
			case 136://Customisations
				overlay.open(player, 1);
				return;
			case 137://Adventures
				overlay.open(player, 3);
				return;
			case 138://Powers
				overlay.open(player, 2);
				return;
			case 139://Community
				overlay.open(player, 4);
				return;
			case 140://Extras
				overlay.open(player, 7);
				return;
			case 145://Hop Worlds
				varp(player, 2250, 1073741824);
				varc(player, 2771, 53038235);
				widget.openCentral(player, 1587, false);
				return;
			default:
				util.defaultHandler(ctx, "options");
				return;
			}
		});
	}
})();

/*
case 43://Game Settings
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 8);
player.getVars().setVarValueInt(3709, 16);
player.getVars().setVarValueInt(3708, 38585352);
player.getVars().setVarValueInt(97, 0);
player.getVars().setVarValueInt(98, -1);
player.getVars().setVarValueInt(97, 1);
player.getVars().setVarValueInt(99, 0);
player.getVars().setVarValueInt(100, 0);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 34, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendWidgetSettings(34, 16, 0, 29, 2621470);
player.getDispatcher().sendHideWidget(34, 20, false);
player.getDispatcher().sendHideWidget(34, 7, false);
player.getDispatcher().sendHideWidget(1417, 6, false);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getWidgets().openWidget(1448, 5, 1443, true);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendVarc(944, 7);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);

case 83://Interface Settings
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 8);
player.getVars().setVarValueInt(3709, 32);
player.getVars().setVarValueInt(3708, 38585352);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 1442, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getWidgets().openWidget(1448, 5, 1214, true);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);

case 91:// Controls
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 8);
player.getVars().setVarValueInt(3709, 48);
player.getVars().setVarValueInt(3708, 38585352);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 1444, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendHideWidget(1448, 5, true);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);

case 51:// Graphics
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 8);
player.getVars().setVarValueInt(3709, 64);
player.getVars().setVarValueInt(3708, 38585352);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 1426, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getWidgets().openWidget(1426, 0, 742, true);
player.getDispatcher().sendHideWidget(1448, 5, true);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);

case 59:// Audio
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 8);
player.getVars().setVarValueInt(3709, 80);
player.getVars().setVarValueInt(3708, 38585352);
player.getVars().setVarValueInt(83, 0);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 187, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendWidgetSettings(187, 1, 0, 2479, 30);
player.getDispatcher().sendWidgetSettings(187, 9, 0, 11, 2359302);
player.getDispatcher().sendWidgetSettings(187, 9, 12, 23, 4);
player.getDispatcher().sendWidgetSettings(187, 9, 24, 24, 2097152);
player.getDispatcher().sendVarc(3497, 0);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getWidgets().openWidget(1448, 5, 429, true);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);

case 25:// Hero
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 0);
player.getVars().setVarValueInt(3708, 38585352);
player.getVars().setVarValueInt(3708, 38585344);
player.getVars().setVarValueInt(1228, 1551892544);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 1218, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendVarc(1753, 8);
player.getDispatcher().sendCS2Script(5682, [8]);
player.getDispatcher().sendHideWidget(1448, 5, true);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);
player.getWidgets().openWidget(1218, 58, 1217, true);
player.getDispatcher().sendWidgetSettings(1218, 57, 0, 0, 2);

case 136:// Gear
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 1);
player.getVars().setVarValueInt(3708, 38544385);
player.getVars().setVarValueInt(3708, 38544385);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 1474, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendWidgetSettings(1474, 15, -1, -1, 2097152);
player.getDispatcher().sendWidgetSettings(1474, 15, 0, 27, 15302030);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getWidgets().openWidget(1448, 5, 1463, true);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendHideWidget(1448, 7, false);
player.getWidgets().openWidget(1448, 7, 1462, true);
player.getDispatcher().sendHideWidget(1448, 7, false);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendWidgetSettings(1462, 14, 0, 18, 15302654);
player.getDispatcher().sendWidgetSettings(1462, 20, 2, 12, 2);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);

case 137:// Adventures
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 3);
player.getVars().setVarValueInt(101, 0);
player.getVars().setVarValueInt(101, 1);
player.getVars().setVarValueInt(101, 2);
player.getVars().setVarValueInt(101, 3);
player.getVars().setVarValueInt(101, 4);
player.getVars().setVarValueInt(101, 5);
player.getVars().setVarValueInt(101, 6);
player.getVars().setVarValueInt(101, 7);
player.getVars().setVarValueInt(101, 8);
player.getVars().setVarValueInt(101, 9);
player.getVars().setVarValueInt(101, 10);
player.getVars().setVarValueInt(101, 11);
player.getVars().setVarValueInt(101, 12);
player.getDispatcher().sendHideWidget(1500, 325, false);
player.getDispatcher().sendVarc(695, 0);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 190, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendWidgetSettings(190, 17, 0, 300, 14);
player.getDispatcher().sendWidgetSettings(190, 40, 0, 11, 2);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getWidgets().openWidget(1448, 5, 1500, true);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);
player.getDispatcher().sendHideWidget(1500, 4, false);
player.getDispatcher().sendHideWidget(1500, 5, true);
player.getDispatcher().sendCS2Script(4021, ["Cook's Assistant"]);
plyer.getDispatcher().sendCS2Script(4017, [12, 0]);

case 138://Powers
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 2);
player.getVars().setVarValueInt(1757, 0);
player.getVars().setVarValueInt(1762, -1);
player.getVars().setVarValueInt(3708, 46973955);
player.getVars().setVarValueInt(3708, 46973954);
player.getDispatcher().sendVarc(1951, -1);
player.getDispatcher().sendVarc(1952, -1);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 327, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getWidgets().openWidget(1448, 5, 1436, true);
player.getDispatcher().sendHideWidget(1448, 5, false);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendWidgetSettings(1430, 55, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 60, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 68, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 73, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 81, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 86, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 94, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 99, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 107, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 112, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 120, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 125, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 133, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 138, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 146, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 151, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 159, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 164, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 172, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 177, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 185, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 190, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 198, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 203, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 211, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 216, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 224, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1430, 229, -1, -1, 2195454);
player.getDispatcher().sendWidgetSettings(1436, 25, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 30, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 38, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 43, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 51, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 56, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 64, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 69, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 77, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 82, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 90, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 95, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 103, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 108, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 116, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 121, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 129, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 134, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 142, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 147, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 155, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 160, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 168, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 173, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 181, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 186, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 194, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1436, 199, -1, -1, 11108350);
player.getDispatcher().sendWidgetSettings(1458, 31, 0, 28, 2);
player.getDispatcher().sendWidgetSettings(1430, 13, -1, -1, 0);
player.getDispatcher().sendWidgetSettings(1465, 19, -1, -1, 0);
player.getDispatcher().sendWidgetSettings(1430, 6, -1, -1, 262150);
player.getDispatcher().sendWidgetSettings(1430, 18, -1, -1, 0);
player.getDispatcher().sendWidgetSettings(1461, 1, 0, 171, 97350);
player.getDispatcher().sendWidgetSettings(590, 8, 0, 177, 6);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);

case 139://Community
player.getVars().setVarBitValue(VarKey.Bit.SELECTED_OVERLAY, 4);
player.getVars().setVarValueInt(3708, 46973954);
player.getVars().setVarValueInt(3708, 46973956);
player.getVars().setVarValueInt(4041, 0);
player.getVars().setVarValueInt(4041, 0);
player.getVars().setVarValueInt(4041, 0);
player.getVars().setVarValueInt(4041, 0);
player.getVars().setVarValueInt(4041, 4096);
player.getVars().setVarValueInt(4041, 12288);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getWidgets().openWidget(1448, 3, 1029, true);
player.getDispatcher().sendHideWidget(1448, 3, false);
player.getDispatcher().sendHideWidget(1448, 4, true);
player.getDispatcher().sendCS2Script(9602, [67436633, 2, 23558940]);
player.getDispatcher().sendWidgetSettings(1029, 29, 0, 5, 2);
player.getDispatcher().sendWidgetSettings(1029, 22, 0, 5, 2);
player.getDispatcher().sendHideWidget(1029, 39, true);
player.getDispatcher().sendHideWidget(1029, 103, true);
player.getDispatcher().sendHideWidget(1029, 136, true);
player.getDispatcher().sendHideWidget(1029, 38, true);
player.getDispatcher().sendHideWidget(1029, 102, true);
player.getDispatcher().sendHideWidget(1029, 134, true);
player.getDispatcher().sendHideWidget(1029, 39, false);
player.getDispatcher().sendHideWidget(1029, 48, true);
player.getDispatcher().sendHideWidget(1029, 81, false);
player.getDispatcher().sendHideWidget(1029, 52, true);
player.getDispatcher().sendHideWidget(1029, 53, true);
player.getDispatcher().sendHideWidget(1029, 50, true);
player.getDispatcher().sendHideWidget(1029, 51, true);
player.getDispatcher().sendCS2Script(1664, [0]);
player.getDispatcher().sendHideWidget(1029, 44, true);
player.getDispatcher().sendHideWidget(1029, 86, false);
player.getDispatcher().sendHideWidget(1029, 58, true);
player.getDispatcher().sendHideWidget(1029, 59, true);
player.getDispatcher().sendHideWidget(1029, 57, true);
player.getDispatcher().sendHideWidget(1029, 55, true);
player.getDispatcher().sendCS2Script(1664, [1]);
player.getDispatcher().sendHideWidget(1029, 66, false);
player.getDispatcher().sendHideWidget(1029, 62, true);
player.getDispatcher().sendHideWidget(1029, 19, false);
player.getDispatcher().sendHideWidget(1029, 149, true);
player.getDispatcher().sendCS2Script(9755, [2]);
player.getDispatcher().sendHideWidget(1029, 67, false);
player.getDispatcher().sendHideWidget(1029, 68, true);
player.getDispatcher().sendHideWidget(1029, 37, false);
player.getDispatcher().sendHideWidget(1029, 97, false);
player.getDispatcher().sendHideWidget(1029, 102, false);
player.getDispatcher().sendHideWidget(1029, 98, false);
player.getDispatcher().sendHideWidget(1029, 99, true);
player.getDispatcher().sendCS2Script(9598, [0]);
player.getDispatcher().sendHideWidget(1448, 5, true);
player.getDispatcher().sendHideWidget(1448, 6, true);
player.getDispatcher().sendHideWidget(1448, 7, true);
player.getDispatcher().sendHideWidget(1448, 8, true);
player.getDispatcher().sendHideWidget(1448, 9, true);
player.getDispatcher().sendHideWidget(1448, 10, true);
player.getDispatcher().sendHideWidget(1448, 11, true);
player.getDispatcher().sendHideWidget(1448, 12, true);
player.getDispatcher().sendHideWidget(1448, 1, true);

case 140://Extras
player.getDispatcher().sendVarc(2911, -1);
player.getDispatcher().sendVarc(199, -1);
player.getDispatcher().sendVarc(3678, 0);
api.openCentralWidget(player, 1139, false);
api.setVarp(player, 4082, 210);
*/
