/**
 * Copyright (c) 2016 Virtue Studios
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
var varbit = require('engine/var/bit');
var varc = require('engine/var/client');
var widget = require('./common');
var config = require('engine/config');
var util = require('../util');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
module.exports = (function () {
	return {
		open : openOverlay,
		close : closeOverlay,
		setTab : setTab,
		tabLocked : tabLocked
	};

	function openOverlay (player, overlay) {
		varc(player, 2911, -1);
		widget.hide(player, 1477, 479, false);
		widget.setEvents(player, 1477, 496, 0, 24, 2);
		widget.setEvents(player, 1477, 499, 1, 1, 2);
		widget.setEvents(player, 1477, 498, 1, 1, 2);
		varc(player, 2911, overlay);
		varbit(player, 18994, overlay);
		var selectedTab = getSelectedTab(player);
		if (tabLocked(player, overlay, selectedTab)) {
			for (selectedTab=0;selectedTab<7;selectedTab++) {
				if (!tabLocked(player, overlay, selectedTab)) {
					break;
				}
			}
			setTab(player, selectedTab);
		}
		var tabStruct = getStructForTab(player, selectedTab);

		openOverlayTab(player, tabStruct);
	}

	function getSelectedTab (player) {
		//See clientscript 441 for tab varbits
		switch (varbit(player, 18994)) {
		case 0://Hero
			return varbit(player, 18995);
		case 1://Customisations
			return varbit(player, 29607);
		case 2://Powers
			return varbit(player, 18997);
		case 3://Adventures
			return varbit(player, 18998);
		case 4://Community
			return varbit(player, 18999);
		case 5://Grand exchange
			return varbit(player, 19000);
		case 6://Grouping system
			return varbit(player, 19002);
		case 7://Upgrades & Extras
			return varbit(player, 19003);
		case 8://RuneMetrics
			return varbit(player, 30609);
		case 9://Settings
			return varbit(player, 19001);
		case 10:
			return varbit(player, 29931);
		case 1001://Lobby
			break;
		}
		return 1;//Default to tab 1
	}

	function setTab (player, tab) {
		switch (varbit(player, 18994)) {
		case 0://Hero
			varbit(player, 18995, tab);
			break;
		case 1://Customisations
			switch (tab) {
				case 1://Wardrobe
				varbit(player, 673, 2);
				break;
                case 3://Animations
				varbit(player, 673, 4);
				break;
                case 4://Appearance
				varbit(player, 673, 1);;
				break;
                case 5://Titles
				varbit(player, 673, 3);
				break;
                case 6://Pets
				varbit(player, 673, 5);
				break;
			    }
			break;
		case 2://Powers
			varbit(player, 18997, tab);
			break;
		case 3://Adventures
			varbit(player, 18998, tab);
			break;
		case 4://Community
			varbit(player, 18999, tab);
			break;
		case 5://Grand exchange
			varbit(player, 19000, tab);
			break;
		case 6://Grouping system
			varbit(player, 19002, tab);
			break;
		case 7://Upgrades & Extras
			varbit(player, 19003, tab);
			break;
		case 8://RuneMetrics
			varbit(player, 30609, tab);
			break;
		case 9://Settings
			varbit(player, 19001, tab);
			break;
		case 1001://Lobby
			break;
		}
		var tabStruct = getStructForTab(player, tab);

		openOverlayTab(player, tabStruct);
	}

	function tabLocked (player, overlay, tab) {
		//See clientscript 8284 for varbits
		switch (overlay) {
		case 0://Hero
			switch (tab) {
			case 1:
				return varbit(player, 19005) == 1;
			case 2:
				return varbit(player, 19006) == 1;
			case 3:
				return varbit(player, 29609) == 1;
			case 4:
				return varbit(player, 29614) == 1;
			case 5:
				return varbit(player, 19008) == 1;
			case 6:
				return varbit(player, 29615) == 1;
			}
			return true;
		case 1://Customisations
			switch (tab) {
			case 1:
				return varbit(player, 29610) == 1;
			case 2:
				return varbit(player, 29616) == 1;
			case 3:
				return varbit(player, 29612) == 1;
			case 4:
				return varbit(player, 29613) == 1;
			case 5:
				return varbit(player, 29611) == 1;
			case 6:
				return varbit(player, 29608) == 1;
			}
			return true;
		case 2://Powers
			switch (tab) {
			case 1:
				return varbit(player, 19014) == 1;
			case 2:
				return varbit(player, 19015) == 1;
			case 3:
				return varbit(player, 19016) == 1;
			case 4:
				return varbit(player, 19017) == 1;
			case 5:
				return varbit(player, 19018) == 1;
			case 6:
				return varbit(player, 21689) == 1;
			}
			return true;
		case 3://Adventures
			switch (tab) {
			case 1:
				return varbit(player, 19019) == 1;
			case 2:
				return varbit(player, 19020) == 1;
			case 3:
				return varbit(player, 19021) == 1;
			case 4:
				return varbit(player, 19022) == 1;
			case 5:
				return varbit(player, 19023) == 1;
			}
			return true;
		case 4://Community
		case 6://Grouping system
			switch (tab) {
			case 2:
				return varbit(player, 19027) === 1;
			case 3:
				return varbit(player, 19028) === 1;
			case 5:
				return varbit(player, 23083) === 1;
			case 4:
				return varbit(player, 24594) === 1;
			}
			return true;
		case 5://Grand exchange
			switch (tab) {
			case 1://Grand Exchange
				return varbit(player, 14173) === 1 || varbit(player, 29044) === 1 || varbit(player, 444) === 0;
			case 2://Sale History
				return varbit(player, 29045) === 1;
			case 3://
				return varbit(player, 30493) === 1;
			}
			return true;
		case 7://Upgrades & Extras
			switch (tab) {
			case 1://Overview
				return varbit(player, 30610) === 1;
			}
			return true;
		case 8://
			switch (tab) {
			case 1:
				return varbit(player, 30611) === 1;
			case 2:
				return varbit(player, 30612) === 1;
			case 3:
				return varbit(player, 30613) === 1;
			case 4:
				return varbit(player, 30614) === 1;
			}
			return true;
		}
	}

	function getStructForTab (player, tab) {
		var overlayStruct = config.enumValue(7699, varbit(player, 18994));
		switch (tab) {
		case 1:
			return config.structParam(overlayStruct, 3448);
		case 2:
			return config.structParam(overlayStruct, 3449);
		case 3:
			return config.structParam(overlayStruct, 3450);
		case 4:
			return config.structParam(overlayStruct, 3451);
		case 5:
			return config.structParam(overlayStruct, 3452);
		case 6:
			return config.structParam(overlayStruct, 3453);
		case 7:
			return config.structParam(overlayStruct, 3454);
		}
	}

	function openOverlayTab (player, tabStruct) {
		var ifaceId = config.structParam(tabStruct, 3456);
		if (ifaceId == -1) {
			widget.hide(player, 1448, 3, true);
		} else {
			widget.hide(player, 1448, 3, false);
			widget.open(player, 1448, 3, ifaceId, true);
		}
		widget.hide(player, 1448, 4, true);

		ifaceId = config.structParam(tabStruct, 3461);
		if (ifaceId == -1) {
			widget.hide(player, 1448, 5, true);
		} else {
			widget.hide(player, 1448, 5, false);
			widget.open(player, 1448, 5, ifaceId, true);
		}
		widget.hide(player, 1448, 6, true);

		ifaceId = config.structParam(tabStruct, 3466);
		if (ifaceId == -1) {
			widget.hide(player, 1448, 7, true);
		} else {
			widget.hide(player, 1448, 7, false);
			widget.open(player, 1448, 7, ifaceId, true);
		}
		widget.hide(player, 1448, 8, true);

		ifaceId = config.structParam(tabStruct, 3471);
		if (ifaceId == -1) {
			widget.hide(player, 1448, 9, true);
		} else {
			widget.hide(player, 1448, 9, false);
			widget.open(player, 1448, 9, ifaceId, true);
		}
		widget.hide(player, 1448, 10, true);


		ifaceId = config.structParam(tabStruct, 3476);
		if (ifaceId == -1) {
			widget.hide(player, 1448, 11, true);
		} else {
			widget.hide(player, 1448, 11, false);
			widget.open(player, 1448, 11, ifaceId, true);
		}
		widget.hide(player, 1448, 12, true);

		widget.hide(player, 1448, 1, true);//Close loading overlay
	}

	function closeOverlay (player) {
		var overlay = varbit(player, 18994);
		var tab = getSelectedTab(player);
		varc(player, 2911, -1);
		util.runClientScript(player, 187, [overlay, tab]);
		widget.closeSub(player, 1448, 3);
		widget.closeSub(player, 1448, 5);
		widget.closeSub(player, 1448, 7);
		widget.closeSub(player, 1448, 9);
		widget.closeSub(player, 1448, 11);
	}
})();
