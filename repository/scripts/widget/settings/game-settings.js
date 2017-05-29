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
/* globals EventType */
var varbit = require('../../core/var/bit');

var util = require('../../core/util');
var widget = require('../common');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 08/01/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1443, function (ctx) {
			openTab(ctx.player);
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1443, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 9://Gameplay settings
				varbit(player, 29043, 0);
				openTab(player);
				return;
			case 18://Loot settings
				varbit(player, 29043, 1);
				openTab(player);				
				return;
			case 27://Death store settings
				varbit(player, 29043, 2);
				openTab(player);
				return;
			case 36://Player owned house settings
				varbit(player, 29043, 3);
				openTab(player);
				return;
			case 45://Action bar settings
				varbit(player, 29043, 4);
				openTab(player);
				return;
			case 57://Doomsayer warning settings
				varbit(player, 29043, 5);
				openTab(player);
				return;
			case 65://Misc settings
				varbit(player, 29043, 6);
				openTab(player);				
				return;
			case 74://Aid settings
				varbit(player, 29043, 7);
				openTab(player);
				return;
			case 82://Chat settings
				varbit(player, 29043, 8);
				openTab(player);
				return;
			default:
				util.defaultHandler(ctx, "game settings");
				return;
			}
		});
	}
	
	function openTab (player) {
		widget.hide(player, 1443, 10, true);
		widget.hide(player, 1443, 19, true);
		widget.hide(player, 1443, 28, true);
		widget.hide(player, 1443, 37, true);
		widget.hide(player, 1443, 46, true);
		widget.hide(player, 1443, 58, true);
		widget.hide(player, 1443, 66, true);
		widget.hide(player, 1443, 75, true);
		widget.hide(player, 1443, 83, true);
		switch (varbit(player, 29043)) {
		case 0://Gameplay
			widget.open(player, 1443, 69, 1663, true);
			widget.hide(player, 1443, 10, false);
			return;
		case 1://Loot
			widget.open(player, 1443, 69, 1623, true);
			widget.hide(player, 1443, 19, false);
			return;
		case 2://Death store
			widget.open(player, 1443, 69, 1662, true);
			widget.hide(player, 1443, 28, false);
			return;
		case 3://Player owned house
			widget.open(player, 1443, 69, 1664, true);
			widget.hide(player, 1443, 37, false);
			return;
		case 4://Action bar
			widget.open(player, 1443, 69, 970, true);
			widget.hide(player, 1443, 46, false);
			return;
		case 5://Doomsayer warnings
			widget.open(player, 1443, 69, 583, true);
			widget.hide(player, 1443, 58, false);
			return;
		case 6://Misc
			widget.open(player, 1443, 69, 1674, true);
			widget.hide(player, 1443, 66, false);
			return;
		case 7://Aid
			widget.open(player, 1443, 69, 1690, true);
			widget.hide(player, 1443, 75, false);
			return;
		case 8://Chat
			widget.open(player, 1443, 69, 1702, true);
			widget.hide(player, 1443, 83, false);
			return;
		}
	}
})();
