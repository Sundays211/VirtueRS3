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

var OverlayTabSwap = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
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
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new OverlayTabSwap();
	scriptManager.registerCompListener(EventType.IF_BUTTON1, 1477, 478, listener);
};

var Overlay = {
		openOverlay : function (player, overlay) {
			api.setVarc(player, 2911, -1);
			api.hideWidget(player, 1477, 479, false);
			api.setWidgetEvents(player, 1477, 478, 0, 24, 2);
			api.setWidgetEvents(player, 1477, 481, 1, 1, 2);
			api.setWidgetEvents(player, 1477, 480, 1, 1, 2);
			api.setVarc(player, 2911, overlay);
			api.setVarBit(player, 18994, overlay);
			var tabStruct = this.getStructForTab(player, this.getSelectedTab(player));
			
			this.openOverlayTab(player, tabStruct);
		},
		getSelectedTab : function (player) {
			switch (api.getVarBit(player, 18994)) {
			case 0://Hero
				return api.getVarBit(player, 18995);
			case 1://Customisations
				return api.getVarBit(player, 18996);
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
			case 8://Settings
				return api.getVarBit(player, 19001);
			case 9://Christmas 2015
				return api.getVarBit(player, 29931);
			case 1001://Lobby
				break;
			}
			return 1;//Default to tab 1
		},
		setTab : function (player, tab) {	
			api.sendMessage(player, "Clicked tab: "+tab);
			switch (api.getVarBit(player, 18994)) {
			case 0://Hero
				api.setVarBit(player, 18995, tab);
				break;
			case 1://Customisations
				api.setVarBit(player, 18996, tab);
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
			case 8://Settings
				api.setVarBit(player, 19001, tab);
				break;
			case 9://Christmas 2015
				api.setVarBit(player, 29931, tab);
				break;
			case 1001://Lobby
				break;
			}
			var tabStruct = this.getStructForTab(player, tab);
			
			this.openOverlayTab(player, tabStruct);
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
		}
}