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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 19/11/2014
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {
	
	/* The interface ids to bind to */
	getIDs: function() {
		return [1442];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		
	},

	/* A button clicked on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 9://Toggle slim headers
			var slim = api.getVarBit(player, 19924) == 1;
			api.setVarBit(player, 19924, slim ? 0 : 1);
			return true;
		case 67://Show target information
			var enabled = api.getVarBit(player, 19927) == 1;
			api.setVarBit(player, 19927, enabled ? 0 : 1);
			return true;
		case 27://Lock interfaces
			var locked = api.getVarBit(player, 19925) == 1;
			api.setVarBit(player, 19925, locked ? 0 : 1);
			return true;
		case 21://Hide title bars when locked
			var hide = api.getVarBit(player, 19928) == 1;
			api.setVarBit(player, 19928, hide ? 0 : 1);
			return true;
		case 90://Task information windows
			var enabled = api.getVarBit(player, 3568) == 1;
			api.setVarBit(player, 3568, enabled ? 0 : 1);
			return true;
		case 96://Xp popups
			var enabled = api.getVarBit(player, 228) == 1;
			api.setVarBit(player, 228, enabled ? 0 : 1);
			return true;
		case 102://Make-x progress window
			var enabled = api.getVarBit(player, 3034) == 1;
			api.setVarBit(player, 3034, enabled ? 0 : 1);
			return true;
		case 73://Show target reticules
			var enabled = api.getVarBit(player, 19929) == 1;
			api.setVarBit(player, 19929, enabled ? 0 : 1);
			return true;
		case 15://Click-through chat box
			var enabled = api.getVarBit(player, 20188) == 1;
			api.setVarBit(player, 20188, enabled ? 0 : 1);
			return true;
		case 108://Split private chat
			var enabled = api.getVarBit(player, 20187) == 1;
			api.setVarBit(player, 20187, enabled ? 0 : 1);
			return true;
		case 114://Player login/out notifications notifications
			var enabled = api.getVarBit(player, 24940) == 1;
			api.setVarBit(player, 24940, enabled ? 0 : 1);
			return true;
		case 84://Task complete pop-ups
			//possibly varc 1429?
		default:
			return false;
		}		
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var widgetListener = new WidgetListener();
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
};