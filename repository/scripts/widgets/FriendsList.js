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
 * @author Sundays211
 * @since 9/11/2014
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interface ids to bind to */
	getIDs: function() {
		return [550];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		api.setWidgetEvents(player, 550, 7, 0, 500, 1022);
		api.setWidgetEvents(player, 550, 57, 0, 500, 6);
	},

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 7://Friends list pane
			if (option == 7) {
				api.openOverlaySub(player, 1006, 451, false);
				api.runClientScript(player, 8178, []);
				api.runClientScript(player, 9206, [slot, 0, 29556758, 29556742, 29556743]);
				return true;
			}
			return false;
		case 25://Add friend
			api.openWidget(player, 1477, 437, 1418, true);
			api.openWidget(player, 1418, 0, 1469, true);
			api.runClientScript(player, 8178, []);//8178
			api.runClientScript(player, 103, []);//103
			return true;
		case 33://Remove friend
			api.openWidget(player, 1477, 437, 1418, true);
			api.openWidget(player, 1418, 0, 1469, true);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 104, []);
			return true;
		case 43://Recruit friend
			return false;
		case 57://Add/set ignore note 
			if (option == 1) {
				api.openOverlaySub(player, 1006, 451, false);
				api.runClientScript(player, 8178, []);
				api.runClientScript(player, 9206, [slot/2, 1, 29556758, 29556742, 29556743]);
				return true;
			}
			return false;
		case 67://Add ignore
			api.openWidget(player, 1477, 437, 1418, true);
			api.openWidget(player, 1418, 0, 1469, true);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 105, []);
			return true;
		case 75://Remove ignore
			api.openWidget(player, 1477, 437, 1418, true);
			api.openWidget(player, 1418, 0, 1469, true);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 1419, []);
			return true;
		case 83:
		case 85://Switching between friend and ignore tabs. We'll send this as handled so it doesn't spam the chatbox
			return true;
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