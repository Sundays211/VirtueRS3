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
var WidgetState = Java.type('org.virtue.model.entity.player.widget.WidgetState');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 08/01/2015
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.script.listeners.WidgetListener'), {
	
	/* The interface ids to bind to */
	getIDs: function() {
		return [1443];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		
	},

	/* A button clicked on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 7://One-button gameplay
			var enabled = api.getVarp(player, 455) == 1;
			api.setVarp(player, 455, enabled ? 0 : 1);
			return true;
		case 13://Accept aid
			var enabled = api.getVarp(player, 459) == 1;
			api.setVarp(player, 459, enabled ? 0 : 1);
			return true;
		case 19://Hide familiar options
			var enabled = api.getVarBit(player, 18564) == 1;
			api.setVarBit(player, 18564, enabled ? 0 : 1);
			return true;
		case 25://Guidance system hints
			var enabled = api.getVarBit(player, 20924) == 1;
			api.setVarBit(player, 20924, enabled ? 0 : 1);
			return true;
		case 31://Toggle quick-chat
			var enabled = api.getVarBit(player, 21242) == 1;
			api.setVarBit(player, 21242, enabled ? 0 : 1);
			return true;
		case 37:
			player.setWidgetState(WidgetState.SWITCH_WIDGET);
			api.setVarp(player, 3813, 9);
			api.openWidget(player, 1477, 787, 26, true);
			api.setWidgetEvents(player, 26, 22, -1, -1, 2);
			return true;
		/*case 45://Right-click reporting (No longer exists in 835)
			var enabled = api.getVarBit(player, 16564) == 1;
			api.setVarBit(player, 16564, enabled ? 0 : 1);
			return true;*/
		case 47://Enable build mode (house)
			var enabled = api.getVarBit(player, 1537) == 1;
			api.setVarBit(player, 1537, enabled ? 0 : 1);
			return true;
		case 54://Teleport to house at house
			api.setVarBit(player, 1552, 0);
			return true;
		case 58://Teleport to house at portal
			api.setVarBit(player, 1552, 1);
			return true;
		case 66://House doors open
			api.setVarBit(player, 1553, 1);
			return true;
		case 70://House doors closed
			api.setVarBit(player, 1553, 0);
			return true;
		case 100://Adv log quest complete
			toggleAdvLog(player, 1);
			return true;
		case 106://Adv log quest milestones
			toggleAdvLog(player, 2);
			return true;
		case 112://Adv log champion's challenge
			toggleAdvLog(player, 3);
			return true;
		case 118://Adv log court cases
			toggleAdvLog(player, 4);
			return true;
		case 124://Adv log music milestones
			toggleAdvLog(player, 5);
			return true;
		case 130://Adv log level-ups
			toggleAdvLog(player, 6);
			return true;
		case 136://Adv log level-up milestones
			toggleAdvLog(player, 7);
			return true;
		case 142://Adv log total level milestones
			toggleAdvLog(player, 8);
			return true;
		case 148://Adv log total xp milestones
			toggleAdvLog(player, 9);
			return true;
		case 154://Adv log item drops
			toggleAdvLog(player, 10);
			return true;
		case 160://Adv log npc kills
			toggleAdvLog(player, 11);
			return true;
		case 166://Adv log holiday events
			toggleAdvLog(player, 13);
			return true;
		case 172://Adv log misc
			toggleAdvLog(player, 14);
			return true;
		case 178://Adv log treasure trails
			toggleAdvLog(player, 15);
			return true;
		case 184://Adv log found item
			toggleAdvLog(player, 16);
			return true;
		case 190://Adv log dungeoneering deep floor
			toggleAdvLog(player, 17);
			return true;
		case 196://Adv log dungeoneering boss kills
			toggleAdvLog(player, 18);
			return true;
		case 202://Adv log dungeoneering spent tokens
			toggleAdvLog(player, 19);
			return true;
		case 208://Adv log dungeoneering found journals
			toggleAdvLog(player, 20);
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

function toggleAdvLog (player, bit) {
	var baseVal = api.getVarp(player, 1274);
	if (testBit(baseVal, bit)) {
		api.setVarp(player, 1274, unsetBit(baseVal, bit));
	} else {
		api.setVarp(player, 1274, setBit(baseVal, bit));
	}
}

function testBit (value, bit) {
	return (value & 1 << bit) != 0;
}

function setBit (value, bit) {
	return value | 1 << bit;
}

function unsetBit (value, bit) {
	return value & -1 - (1 << bit);
}