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

var WidgetListener = Java.extend(Java.type('org.virtue.script.listeners.WidgetListener'), {

	/* The interface ids to bind to */
	getIDs: function() {
		return [1427];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		var name = api.getName(player.getSavedChannelOwner());
		api.setVarc(player, 2508, name != null ? name : api.getName(player));//Last friend chat joined
		api.setVarc(player, 1027, 1);
		api.setVarc(player, 1034, 2);
		api.setWidgetEvents(player, 1427, 29, 0, 600, 1024);
	},

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 10://Join/leave
			if (player.getChat().getFriendChatOwner() != 0) {
				api.runClientScript(player, 194, [1]);
				//player.getDispatcher().sendCS2Script(194, [1]);
				return true;
			}
			api.openWidget(player, 1477, 437, 1418, true);
			api.openWidget(player, 1418, 0, 1469, true);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 8537, []);
			api.runClientScript(player, 194, [1]);
			return true;
		case 37://Manual kick/ban
			api.openWidget(player, 1477, 437, 1418, true);
			api.openWidget(player, 1418, 0, 1469, true);
			api.runClientScript(player, 8178, []);
			api.runClientScript(player, 2688, []);
			return true;
		case 4://Settings
			api.openCentralWidget(player, 1108, false);
			return true;
		case 35://Loot share
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
var listen = function(scriptLoader) {
	api = scriptLoader.getApi();
	var widgetListener = new WidgetListener();
	scriptLoader.registerWidgetListener(widgetListener, widgetListener.getIDs());
};