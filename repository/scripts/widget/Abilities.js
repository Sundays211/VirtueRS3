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
 * @since 01/02/2015
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [ 1460, 1458, 1461, 1452, 1449, 1503 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		switch (interfaceID) {
		case 1460://Melee
			api.setWidgetEvents(player, 1460, 1, 0, 171, 97286);
			api.setWidgetEvents(player, 1460, 4, 6, 14, 2);
			break;
		}
	},
	

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (interfaceID) {
		case 1460://Melee
			var ability = ActionBar.getAbilities().get(interfaceID << 6 | component);
			if (ability != null) {
				player.getCombatSchedule().run(ability);
			}
			return true;
		case 1458://Prayer
			if(!player.getCombat().getPrayer().usingPrayer) {
				player.getCombat().getPrayer().activate(slot);
				api.runAnimation(player, 18018);
			} else {
				player.getCombat().getPrayer().deactivate(slot);
			}
			return false;
		case 1461://Mage
			var spell = org.virtue.game.content.skills.magic.Spellbook.MODERN.get(slot);
			if (player.getCombatSchedule().getAutocastSpell() != null) {
				player.getCombatSchedule().setAutocastSpell(null);
				api.sendMessage(player, "Auto-cast spell cleared.");
			} else {
				player.getCombatSchedule().setAutocastSpell(spell);
				api.sendMessage(player, "Main-hand spell set to: spell");
			}
			return false;
		case 1452://Ranged
		case 1449://Defence
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