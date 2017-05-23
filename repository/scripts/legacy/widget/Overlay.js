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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */

var OverlayListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		switch (args.component) {
		case 39://Lock/unlock interfaces
			var locked = api.getVarBit(player, 19925) == 1;
			api.setVarBit(player, 19925, locked ? 0 : 1)
			return;
		case 45://Sheathing (TODO: Find which varp/varbit controls this)
			player.switchSheathing();
			break;
		case 71://Logout
			api.setVarp(player, 3813, 6);
			api.openWidget(player, 1477, 853, 26, true);
			return;
		case 496://Overlay tab switch
			switch (args.slot) {
			case 3:
				Overlay.setTab(player, 1);
				return;
			case 7:
				Overlay.setTab(player, 2);
				return;
			case 11:
				Overlay.setTab(player, 3);
				return;
			case 15:
				Overlay.setTab(player, 4);
				return;
			case 19:
				Overlay.setTab(player, 5);
				return;
			case 23:
				Overlay.setTab(player, 6);
				return;
			}
			return;
		case 499://Overlay close button
			Overlay.closeOverlay(player)
			return;
		default:
			api.sendMessage(player, "Unhandled overlay button: comp="+args.component+", slot="+args.slot+", button="+args.button)
			return;
		}		
	}
});

var OverlayDragListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		
	}
});


/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new OverlayListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1477, listener);
	
	listener = new OverlayDragListener();
	for (var comp=0;comp<1000;comp++) {//Suppress all drag actions for the top-level overlay
		scriptManager.registerCompListener(EventType.IF_DRAG, 1477, comp, listener);
	}
	
};

var Overlay = {
		openOverlay : function (player, overlay) {
			api.setVarc(player, 2911, -1);
			api.hideWidget(player, 1477, 479, false);
			api.setWidgetEvents(player, 1477, 496, 0, 24, 2);
			api.setWidgetEvents(player, 1477, 499, 1, 1, 2);
			api.setWidgetEvents(player, 1477, 498, 1, 1, 2);
			api.setVarc(player, 2911, overlay);
			api.setVarBit(player, 18994, overlay);
			var selectedTab = this.getSelectedTab(player);
			if (this.tabLocked(player, overlay, selectedTab)) {
				for (selectedTab=0;selectedTab<7;selectedTab++) {
					if (!this.tabLocked(player, overlay, selectedTab)) {
						break;
					}
				}
				this.setTab(player, selectedTab);
			}
			var tabStruct = this.getStructForTab(player, selectedTab);
			
			this.openOverlayTab(player, tabStruct);
		},
		getSelectedTab : function (player) {
			//See clientscript 441 for tab varbits
			switch (api.getVarBit(player, 18994)) {
			case 0://Hero
				return api.getVarBit(player, 18995);
			case 1://Customisations
				return api.getVarBit(player, 29607);
			case 2://Powers
				return api.getVarBit(player, 18997);
			case 3://Adventures
				return api.getVarBit(player, 18998);
			case 4://Community
				return api.getVarBit(player, 18999);
			case 5://Grand exchange
				return api.getVarBit(player, 19000);
			case 6://Grouping system
				return api.getVarBit(player, 19002);
			case 7://Upgrades & Extras
				return api.getVarBit(player, 19003);
			case 8://RuneMetrics
				return api.getVarBit(player, 30609);
			case 9://Settings
				return api.getVarBit(player, 19001);
			case 10:
				return api.getVarBit(player, 29931);
			case 1001://Lobby
				break;
			}
			return 1;//Default to tab 1
		},
		setTab : function (player, tab) {
			switch (api.getVarBit(player, 18994)) {
			case 0://Hero
				api.setVarBit(player, 18995, tab);
				break;
			case 1://Customisations
				api.setVarBit(player, 29607, tab);
				break;
			case 2://Powers
				api.setVarBit(player, 18997, tab);
				break;
			case 3://Adventures
				api.setVarBit(player, 18998, tab);
				break;
			case 4://Community
				api.setVarBit(player, 18999, tab);
				break;
			case 5://Grand exchange
				api.setVarBit(player, 19000, tab);
				break;
			case 6://Grouping system
				api.setVarBit(player, 19002, tab);
				break;
			case 7://Upgrades & Extras
				api.setVarBit(player, 19003, tab);
				break;
			case 8://RuneMetrics
				api.setVarBit(player, 30609, tab);
				break;
			case 9://Settings
				api.setVarBit(player, 19001, tab);
				break;
			case 1001://Lobby
				break;
			}
			var tabStruct = this.getStructForTab(player, tab);
			
			this.openOverlayTab(player, tabStruct);
		},
		tabLocked : function (player, overlay, tab) {
			//See clientscript 8284 for varbits
			switch (overlay) {
			case 0://Hero
				switch (tab) {
				case 1:
					return api.getVarBit(player, 19005) == 1;
				case 2:
					return api.getVarBit(player, 19006) == 1;
				case 3:
					return api.getVarBit(player, 29609) == 1;
				case 4:
					return api.getVarBit(player, 29614) == 1;
				case 5:
					return api.getVarBit(player, 19008) == 1;
				case 6:
					return api.getVarBit(player, 29615) == 1;
				default:
					return true;
				}
			case 1://Customisations
				switch (tab) {
				case 1:
					return api.getVarBit(player, 29610) == 1;
				case 2:
					return api.getVarBit(player, 29616) == 1;
				case 3:
					return api.getVarBit(player, 29612) == 1;
				case 4:
					return api.getVarBit(player, 29613) == 1;
				case 5:
					return api.getVarBit(player, 29611) == 1;
				case 6:
					return api.getVarBit(player, 29608) == 1;
				default:
					return true;
				}
			case 2://Powers
				switch (tab) {
				case 1:
					return api.getVarBit(player, 19014) == 1;
				case 2:
					return api.getVarBit(player, 19015) == 1;
				case 3:
					return api.getVarBit(player, 19016) == 1;
				case 4:
					return api.getVarBit(player, 19017) == 1;
				case 5:
					return api.getVarBit(player, 19018) == 1;
				case 6:
					return api.getVarBit(player, 21689) == 1;
				default:
					return true;
				}
			case 3://Adventures
				switch (tab) {
				case 1:
					return api.getVarBit(player, 19019) == 1;
				case 2:
					return api.getVarBit(player, 19020) == 1;
				case 3:
					return api.getVarBit(player, 19021) == 1;
				case 4:
					return api.getVarBit(player, 19022) == 1;
				case 5:
					return api.getVarBit(player, 19023) == 1;
				default:
					return true;
				}
			case 4://Community
			case 6://Grouping system
				switch (tab) {
				case 2:
					return api.getVarBit(player, 19027) == 1;
				case 3:
					return api.getVarBit(player, 19028) == 1;
				case 5:
					return api.getVarBit(player, 23083) == 1;
				case 4:
					return api.getVarBit(player, 24594) == 1;
				default:
					return true;
				}
			case 5://Grand exchange
				switch (tab) {
				case 1://Grand Exchange
					return api.getVarBit(player, 14173) == 1 || api.getVarBit(player, 29044) == 1 || api.getVarBit(player, 444) == 0;
				case 2://Sale History
					return api.getVarBit(player, 29045) == 1;
				case 3://
					return api.getVarBit(player, 30493) == 1;
				default:
					return true;
				}
			case 7://Upgrades & Extras
				switch (tab) {
				case 1://Overview
					return api.getVarBit(player, 30610) == 1;
				default:
					return true;
				}
			case 8://
				switch (tab) {
				case 1:
					return api.getVarBit(player, 30611) == 1;
				case 2:
					return api.getVarBit(player, 30612) == 1;
				case 3:
					return api.getVarBit(player, 30613) == 1;
				case 4:
					return api.getVarBit(player, 30614) == 1;
				default:
					return true;
				}
			}
		},
		getStructForTab : function (player, tab) {
			var overlayStruct = api.getEnumValue(7699, api.getVarBit(player, 18994));
			switch (tab) {
			case 1:
				return api.getStructParam(overlayStruct, 3448);
			case 2:
				return api.getStructParam(overlayStruct, 3449);
			case 3:
				return api.getStructParam(overlayStruct, 3450);
			case 4:
				return api.getStructParam(overlayStruct, 3451);
			case 5:
				return api.getStructParam(overlayStruct, 3452);
			case 6:
				return api.getStructParam(overlayStruct, 3453);
			case 7:
				return api.getStructParam(overlayStruct, 3454);
			}
		},
		openOverlayTab : function (player, tabStruct) {
			var ifaceId = api.getStructParam(tabStruct, 3456);
			if (ifaceId == -1) {
				api.hideWidget(player, 1448, 3, true);		
			} else {
				api.hideWidget(player, 1448, 3, false);
				api.openWidget(player, 1448, 3, ifaceId, true);
			}
			api.hideWidget(player, 1448, 4, true);
			
			ifaceId = api.getStructParam(tabStruct, 3461);
			if (ifaceId == -1) {
				api.hideWidget(player, 1448, 5, true);		
			} else {
				api.hideWidget(player, 1448, 5, false);
				api.openWidget(player, 1448, 5, ifaceId, true);
			}			
			api.hideWidget(player, 1448, 6, true);
			
			ifaceId = api.getStructParam(tabStruct, 3466);
			if (ifaceId == -1) {
				api.hideWidget(player, 1448, 7, true);		
			} else {
				api.hideWidget(player, 1448, 7, false);
				api.openWidget(player, 1448, 7, ifaceId, true);
			}			
			api.hideWidget(player, 1448, 8, true);
			
			ifaceId = api.getStructParam(tabStruct, 3471);
			if (ifaceId == -1) {
				api.hideWidget(player, 1448, 9, true);		
			} else {
				api.hideWidget(player, 1448, 9, false);
				api.openWidget(player, 1448, 9, ifaceId, true);
			}			
			api.hideWidget(player, 1448, 10, true);

			
			ifaceId = api.getStructParam(tabStruct, 3476);
			if (ifaceId == -1) {
				api.hideWidget(player, 1448, 11, true);		
			} else {
				api.hideWidget(player, 1448, 11, false);
				api.openWidget(player, 1448, 11, ifaceId, true);
			}	
			api.hideWidget(player, 1448, 12, true);
			
			api.hideWidget(player, 1448, 1, true);//Close loading overlay
		},
		closeOverlay : function (player) {
			var overlay = api.getVarBit(player, 18994);
			var tab = this.getSelectedTab(player);
			api.setVarc(player, 2911, -1);
			api.runClientScript(player, 187, [overlay, tab]);
			api.closeWidget(player, 1448, 3);
			api.closeWidget(player, 1448, 5);
			api.closeWidget(player, 1448, 7);
			api.closeWidget(player, 1448, 9);
			api.closeWidget(player, 1448, 11);
		}
}