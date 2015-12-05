/**
 * Copyright (c) 2014 Virtue Studios
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

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 20/12/2014
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [982];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		
	},

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 7:
			var mode = api.getVarBit(player, 24562);
			switch (mode) {
			case 0://Friend chat
				api.setVarBit(player, 1190, slot);
				return true;
			case 1://Private chat
				api.setVarp(player, 457, slot);
				return true;
			case 2://Clan chat
				api.setVarBit(player, 1188, slot);
				return true;
			case 3://Guest clan chat
				api.setVarBit(player, 1191, slot);
				return true;
			case 4://Group chat
				api.setVarBit(player, 24560, slot);
				return true;
			case 5://Team Group chat
				api.incrementVarBit(player, 24560, 0);//Work-around, since the interface does not watch varp 4737
				api.setVarBit(player, 24561, slot);
				return true;
			case 6://Twitch chat
				api.setVarBit(player, 21371, slot);
				return true;
			default:
				return false;
			}
		case 9://Friend chat colour
			api.setVarBit(player, 24562, 0);
			return true;
		case 10://Private chat colour
			api.setVarBit(player, 24562, 1);
			return true;
		case 24://Clan chat colour
			api.setVarBit(player, 24562, 2);
			return true;
		case 25://Guest clan chat colour
			api.setVarBit(player, 24562, 3);
			return true;
		case 26://Group chat colour
			api.setVarBit(player, 24562, 4);
			return true;
		case 27://Group team chat
			api.setVarBit(player, 24562, 5);
			return true;
		case 28://Twitch chat
			api.setVarBit(player, 24562, 6);
			return true;
		case 35://Chat effects
			var enabled = api.getVarp(player, 456) == 0;
			api.setVarp(player, 456, enabled ? 1 : 0);
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
var listen = function(scriptLoader) {
	api = scriptLoader.getApi();
	var widgetListener = new WidgetListener();
	scriptLoader.registerWidgetListener(widgetListener, widgetListener.getIDs());
};