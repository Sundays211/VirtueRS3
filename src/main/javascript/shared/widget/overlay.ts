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
import { Player } from 'engine/models';
import { varbit, setVarBit, setVarc } from 'engine/var';
import _config from 'engine/config';
import { openWidget, hideWidget, setWidgetEvents, closeWidgetSub } from './common';
import { runClientScript } from '../util';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */

export function openOverlay(player: Player, overlay: number) {
	setVarc(player, 2911, -1);
	hideWidget(player, 1477, 479, false);
	setWidgetEvents(player, 1477, 496, 0, 24, 2);
	setWidgetEvents(player, 1477, 499, 1, 1, 2);
	setWidgetEvents(player, 1477, 498, 1, 1, 2);
	setVarc(player, 2911, overlay);
	setVarBit(player, 18994, overlay);
	var selectedTab = getSelectedTab(player);
	if (overlayTabLocked(player, overlay, selectedTab)) {
		for (selectedTab = 0; selectedTab < 7; selectedTab++) {
			if (!overlayTabLocked(player, overlay, selectedTab)) {
				break;
			}
		}
		setOverlayTab(player, selectedTab);
	}
	var tabStruct = getStructForTab(player, selectedTab);

	openOverlayTab(player, tabStruct);
}

export function closeOverlay(player: Player) {
	var overlay = varbit(player, 18994);
	var tab = getSelectedTab(player);
	setVarc(player, 2911, -1);
	runClientScript(player, 187, [overlay, tab]);
	closeWidgetSub(player, 1448, 3);
	closeWidgetSub(player, 1448, 5);
	closeWidgetSub(player, 1448, 7);
	closeWidgetSub(player, 1448, 9);
	closeWidgetSub(player, 1448, 11);
}

export function setOverlayTab(player: Player, tab: number) {
	switch (varbit(player, 18994)) {
		case 0://Hero
			setVarBit(player, 18995, tab);
			break;
		case 1://Customisations
			switch (tab) {
				case 1://Wardrobe
					setVarBit(player, 673, 2);
					break;
				case 3://Animations
					setVarBit(player, 673, 4);
					break;
				case 4://Appearance
					setVarBit(player, 673, 1);;
					break;
				case 5://Titles
					setVarBit(player, 673, 3);
					break;
				case 6://Pets
					setVarBit(player, 673, 5);
					break;
			}
			break;
		case 2://Powers
			setVarBit(player, 18997, tab);
			break;
		case 3://Adventures
			setVarBit(player, 18998, tab);
			break;
		case 4://Community
			setVarBit(player, 18999, tab);
			break;
		case 5://Grand exchange
			setVarBit(player, 19000, tab);
			break;
		case 6://Grouping system
			setVarBit(player, 19002, tab);
			break;
		case 7://Upgrades & Extras
			setVarBit(player, 19003, tab);
			break;
		case 8://RuneMetrics
			setVarBit(player, 30609, tab);
			break;
		case 9://Settings
			setVarBit(player, 19001, tab);
			break;
		case 1001://Lobby
			break;
	}
	var tabStruct = getStructForTab(player, tab);

	openOverlayTab(player, tabStruct);
}

export function overlayTabLocked(player: Player, overlay: number, tab: number): boolean {
	//See clientscript 8284 for varbits
	switch (overlay) {
		case 0://Hero
			switch (tab) {
				case 1:
					return varbit(player, 19005) === 1;
				case 2:
					return varbit(player, 19006) === 1;
				case 3:
					return varbit(player, 29609) === 1;
				case 4:
					return varbit(player, 29614) === 1;
				case 5:
					return varbit(player, 19008) === 1;
				case 6:
					return varbit(player, 29615) === 1;
			}
			return true;
		case 1://Customisations
			switch (tab) {
				case 1:
					return varbit(player, 29610) === 1;
				case 2:
					return varbit(player, 29616) === 1;
				case 3:
					return varbit(player, 29612) === 1;
				case 4:
					return varbit(player, 29613) === 1;
				case 5:
					return varbit(player, 29611) === 1;
				case 6:
					return varbit(player, 29608) === 1;
			}
			return true;
		case 2://Powers
			switch (tab) {
				case 1:
					return varbit(player, 19014) === 1;
				case 2:
					return varbit(player, 19015) === 1;
				case 3:
					return varbit(player, 19016) === 1;
				case 4:
					return varbit(player, 19017) === 1;
				case 5:
					return varbit(player, 19018) === 1;
				case 6:
					return varbit(player, 21689) === 1;
			}
			return true;
		case 3://Adventures
			switch (tab) {
				case 1:
					return varbit(player, 19019) === 1;
				case 2:
					return varbit(player, 19020) === 1;
				case 3:
					return varbit(player, 19021) === 1;
				case 4:
					return varbit(player, 19022) === 1;
				case 5:
					return varbit(player, 19023) === 1;
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

function getSelectedTab(player: Player): number {
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

function getStructForTab(player: Player, tab: number): number {
	var overlayStruct = _config.enumValue(7699, varbit(player, 18994)) as number;
	switch (tab) {
		case 1:
			return _config.structParam(overlayStruct, 3448) as number;
		case 2:
			return _config.structParam(overlayStruct, 3449) as number;
		case 3:
			return _config.structParam(overlayStruct, 3450) as number;
		case 4:
			return _config.structParam(overlayStruct, 3451) as number;
		case 5:
			return _config.structParam(overlayStruct, 3452) as number;
		case 6:
			return _config.structParam(overlayStruct, 3453) as number;
		case 7:
			return _config.structParam(overlayStruct, 3454) as number;
	}
}

function openOverlayTab(player: Player, tabStruct: number) {
	var ifaceId = _config.structParam(tabStruct, 3456) as number;
	if (ifaceId === -1) {
		hideWidget(player, 1448, 3, true);
	} else {
		hideWidget(player, 1448, 3, false);
		openWidget(player, 1448, 3, ifaceId, true);
	}
	hideWidget(player, 1448, 4, true);

	ifaceId = _config.structParam(tabStruct, 3461) as number;
	if (ifaceId == -1) {
		hideWidget(player, 1448, 5, true);
	} else {
		hideWidget(player, 1448, 5, false);
		openWidget(player, 1448, 5, ifaceId, true);
	}
	hideWidget(player, 1448, 6, true);

	ifaceId = _config.structParam(tabStruct, 3466) as number;
	if (ifaceId == -1) {
		hideWidget(player, 1448, 7, true);
	} else {
		hideWidget(player, 1448, 7, false);
		openWidget(player, 1448, 7, ifaceId, true);
	}
	hideWidget(player, 1448, 8, true);

	ifaceId = _config.structParam(tabStruct, 3471) as number;
	if (ifaceId == -1) {
		hideWidget(player, 1448, 9, true);
	} else {
		hideWidget(player, 1448, 9, false);
		openWidget(player, 1448, 9, ifaceId, true);
	}
	hideWidget(player, 1448, 10, true);


	ifaceId = _config.structParam(tabStruct, 3476) as number;
	if (ifaceId == -1) {
		hideWidget(player, 1448, 11, true);
	} else {
		hideWidget(player, 1448, 11, false);
		openWidget(player, 1448, 11, ifaceId, true);
	}
	hideWidget(player, 1448, 12, true);

	hideWidget(player, 1448, 1, true);//Close loading overlay
}

//TODO: These are legacy exports to support old modules. Remove once the modules have been updated
export const open = openOverlay;
export const close =  closeOverlay;
export const setTab = setOverlayTab;
export const tabLocked = overlayTabLocked;
