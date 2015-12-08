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
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since Oct 10, 2014
 */
var api;

var SWAP_SKILLS = [0, 1, 4, 2, 3, 5, 6, 7, 8, 9, 10, 18, 12, 13, 14, 15, 16, 17, 11, 19, 20, 21, 22, 23, 24, 25, 29, 30];

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {
	
	/* The interface ids to bind to */
	getIDs: function() {
		return [1215, 1214];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		
	},

	/* A button clicked on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (interfaceID == 1214) {//Settings
			var counter = api.getVarp(player, 96);
			switch (component) {
			case 2://Show/hide tracker
				var wasEnabled = api.getVarBit(player, 19964) == 1;
				api.setVarBit(player, 19964, wasEnabled ? 0 : 1);
				return true;
			case 13://Settings for counter 1
				api.setVarp(player, 96, 1);
				return true;
			case 22://Settings for counter 2
				api.setVarp(player, 96, 2);
				return true;
			case 31://Settings for counter 3
				api.setVarp(player, 96, 3);
				return true;
			case 36://Enable/disable counter
				var enabled = api.getVarBit(player, 228+counter) == 1;
				api.setVarBit(player, 228+counter, enabled ? 0 : 1);
				return true;
			case 41://Select attack
			case 42://Select strength
			case 43://Select defense
			case 44://Select range
			case 45://Select mage
			case 46://Select hitpoints
			case 47://Select prayer
			case 48://Select agility
			case 49://Select herblore
			case 50://Select theiving
			case 51://Select crafting
			case 52://Select fletching
			case 53://Select mining
			case 54://Select smithing
			case 55://Select fishing
			case 56://Select cooking
			case 57://Select firemaking
			case 58://Select woodcutting
			case 59://Select runecrafting
			case 60://Select slayer
			case 61://Select farming
			case 62://Select construction
			case 63://Select hunter
			case 64://Select summoning
			case 65://Select dungeoneering
			case 66://Select divination
			case 67://Select combat
			case 68://Select all
				setCounterSkill(player, component-41);
				return true;
			case 70://Reset counter to zero
				api.setVarp(player, 90+counter, 0);
				return true;
			default:
				return false;			
			}
		} else if (interfaceID == 1215) {//Counter
			return false;
		} else {
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

function setCounterSkill (player, skill) {
	if (skill < SWAP_SKILLS.length) {
		skill = SWAP_SKILLS[skill];
	}
	var counter = api.getVarp(player, 96);
	api.setVarBit(player, 224+counter, skill+1);
	api.setVarp(player, 90+counter, 0);
}