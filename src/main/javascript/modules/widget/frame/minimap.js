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
/* globals EventType */
var varbit = require('engine/var/bit');
var varp = require('engine/var/player');
var varc = require('engine/var/client');

var anim = require('shared/anim');
var chat = require('shared/chat');
var widget = require('shared/widget');
var util = require('shared/util');

var moneyPouch = require('shared/inv/money-pouch');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/03/2016
 */
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
	scriptManager.bind(EventType.IF_BUTTON, 1465, function (ctx) {
	var player = ctx.player;
	switch (ctx.component) {
	case 9://Logout
	varp(player, 3813, 6);
	widget.open(player, 1477, 871, 26, true);
	return;
	case 22://Money pouch options
	switch (ctx.button) {
	case 1://Toggle money pouch
	var wasOpen = varbit(player, 1192) == 1;
	varbit(player, 1192, wasOpen ? 0 : 1);
	return;
	case 2://Open Price Checker
	widget.openCentral(player, 206, false);
	return;
    case 3://Examine money pouch
	moneyPouch.examineMoneyPouch(player);
	return;
	case 4://Withdraw money pouch
	moneyPouch.requestWithdrawCoins(player);
	return;
	//case 5://Wealth evaluator
	//player.getWidgets().openWidget(1477, 380, 566, false);
	case 6://Bond pouch
	return;//This is client-sided
	case 7://Invention materials
	widget.openCentral(player, 1709, false);
	return;
	}
	util.defaultHandler(ctx, "minimap");
	return;
	case 44://World map
	if (ctx.button == 3) {
	varp(player, 2250, 1073741824);
	varc(player, 2771, 53038235);
	widget.openCentral(player, 1587, false);
	} else {
	varp(player, 3926, 0);
	varp(player, 3928, -1);
	varp(player, 3929, -1);
	widget.open(player, 1477, 496, 669, true);
	varc(player, 3838, 0);
	varc(player, 3840, 0);
	widget.hide(player, 1477, 20, true);
	widget.hide(player, 1477, 21, true);
	widget.hide(player, 1477, 22, true);
	widget.hide(player, 1477, 506, true);
	widget.hide(player, 1477, 388, true);
	//TODO: Find out the right varp for these
	//varp(player, 622, api.getCoordHash(api.getCoords(player)));
	//varp(player, 674, api.getCoordHash(api.getCoords(player)));
	 widget.open(player, 1477, 16, 1421, true);
	widget.open(player, 1477, 15, 1422, false);
	widget.open(player, 1422, 107, 698, true);
	/*player.getDispatcher().sendWidgetSettings(1422, 38, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 39, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 40, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 41, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 42, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 43, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 44, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 45, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 46, 2, 2, 2);
	player.getDispatcher().sendWidgetSettings(1422, 47, 2, 2, 2);
	player.getVars().setVarp(622, player.getCurrentTile().getTileHash());
	player.getDispatcher().sendWidgetSettings(1422, 86, 0, 19, 2);
	player.getDispatcher().sendHideWidget(1422, 49, true);
	player.getDispatcher().sendVarc(4197, -1);
	player.getVars().setVarp(674, player.getCurrentTile().getTileHash());*/
	}
	return;
	case 46://Toggle run
	if (ctx.button == 1) {
	var running = varp(player, 463) == 1;
	if (running) {
	varp(player, 463, 0);
	//TODO: Create an engine method for this
	player.getMovement().setRunning(false);
	} else {
	varp(player, 463, 1);
	player.getMovement().setRunning(true);
	}
    } else if (ctx.button == 2) {
	anim.run(player, 5713);
	chat.sendDebugMessage(player, "Unhandled rest action...");
	}
	return;
	case 57://Open lodestone interface
	widget.openCentral(player, 1092, false);
	return;
    /*case 14://Legacy XP counter button
	case 27://Open notes
	case 30://Open group system
	case 33://Open metrics
	case 55://Reset camera*/
	default:
	util.defaultHandler(ctx, "minimap");
	return;
	}
	});
	}
})();

/*case 37:
	player.getVars().setVarValueInt(3708, 137110532);
	player.getVars().setVarValueInt(3708, 137110532);
	player.getVars().setVarValueInt(4719, -1);
	player.getVars().setVarValueInt(4722, -1);
	player.getVars().setVarValueInt(4723, -1);
	player.getVars().setVarValueInt(4724, -1);
	player.getVars().setVarValueInt(4725, -1);
	player.getVars().setVarValueInt(4726, -1);
	player.getVars().setVarValueInt(4727, -1);
	player.getVars().setVarValueInt(4728, -1);
	player.getVars().setVarValueInt(4729, -1);
	player.getVars().setVarValueInt(4730, -1);
	player.getVars().setVarValueInt(4731, -1);
	player.getVars().setVarValueInt(4732, -1);
	player.getVars().setVarValueInt(4733, -1);
	player.getVars().setVarValueInt(4697, 3);
	player.getVars().setVarValueInt(4698, 84);
	player.getVars().setVarValueInt(4721, 3);
	player.getVars().setVarValueInt(4722, 4);
	player.getVars().setVarValueInt(4723, 6);
	player.getVars().setVarValueInt(4725, 3);
	player.getVars().setVarValueInt(4726, 0);
	player.getVars().setVarValueInt(4720, -1);
	player.getDispatcher().sendHideWidget(1477, 377, false);
	player.getDispatcher().sendWidgetEvents(1477, 376, 0, 24, 2);
	player.getDispatcher().sendWidgetEvents(1477, 379, 1, 1, 2);
	player.getDispatcher().sendWidgetEvents(1477, 378, 1, 1, 2);
	player.getDispatcher().sendVarc(2911, 4);
	player.getDispatcher().sendHideWidget(1448, 3, false);
	player.getWidgets().openWidget(1448, 3, 1524, true);
	player.getDispatcher().sendHideWidget(1448, 3, false);
	player.getDispatcher().sendHideWidget(1448, 4, true);
	player.getDispatcher().sendWidgetEvents(1524, 24, 0, 6, 2);
	player.getDispatcher().sendWidgetEvents(1524, 26, 0, 39, 2);
	player.getDispatcher().sendWidgetEvents(1524, 16, 0, 5, 2);
	player.getDispatcher().sendWidgetEvents(1524, 16, 0, 5, 2);
	player.getDispatcher().sendWidgetEvents(1524, 29, 0, 137, 2359296);
	player.getDispatcher().sendWidgetEvents(1524, 66, 0, 137, 2);
	player.getDispatcher().sendHideWidget(1448, 5, false);
	player.getWidgets().openWidget(1448, 5, 1528, true);
	player.getDispatcher().sendHideWidget(1448, 5, false);
	player.getDispatcher().sendHideWidget(1448, 6, true);
	player.getDispatcher().sendHideWidget(1448, 7, true);
	player.getDispatcher().sendHideWidget(1448, 8, true);
	player.getDispatcher().sendHideWidget(1448, 9, true);
	player.getDispatcher().sendHideWidget(1448, 10, true);
	player.getDispatcher().sendHideWidget(1448, 11, true);
	player.getDispatcher().sendHideWidget(1448, 12, true);
	player.getDispatcher().sendHideWidget(1448, 1, true);
	player.getVars().setVarValueInt(4695, 0);
	player.getVars().setVarValueInt(4699, 0);
	break;
			*/
