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
 * @since 11/02/2015
 */

var api;

var BACKPACK = 93;
var LOAN_RETURN = 540;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [ 109 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		api.sendContainer(player, LOAN_RETURN);
	},

	/* Pressed a button on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 20://Reclaim item
			if (option == 1) {
				if (api.getVarp(player, 431) > 0) {
					return false;
				} else if (api.getVarp(player, 429) != -1) {
					//Forcefully return
					//[Name] wants [his/her] item returned now. The item [he/she] lent to you has been returned to [his/her] Returned Items box.
					return false;
				} else {
					if (api.freeSpaceTotal(player, "backpack") < 1) {
						api.sendMessage(player, "Not enough space.");
						return true;
					}
					var item = api.getItem(player, "loan_return", 0);
					if (item != null) {
						api.delItem(player, LOAN_RETURN, item.getID(), 1);
						api.addCarriedItem(player, item.getID(), 1);
						return true;
					}					
				}				
				return false;
			} else if (option == 10) {				
				var text = api.getItemType(itemID).getExamineText();
				api.sendMessage(player, text);
				return true;
			} else {
				return false;
			}			
		default:
			return false;
		}
		//Check script 654
		//Container 540 for loaned items?
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