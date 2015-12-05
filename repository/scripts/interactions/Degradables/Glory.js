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
var ForceTalkBlock = Java.type('org.virtue.model.entity.update.block.ForceTalkBlock');
var FaceEntityBlock = Java.type('org.virtue.model.entity.update.block.FaceEntityBlock');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 04/19/2015
 */
var api;

var ItemListener = Java.extend(Java.type('org.virtue.script.listeners.ItemListener'), {
	
	/* The item ids to bind to */
	getItemIDs: function() {
		return [1712];
	},

	/* The first option on an object */
	handleInteraction: function(player, item, slot, option) {
		switch (option) {
		case 22://Edge
			api.teleportEntity(player, 3086, 3502, 0);
			return true;
		case 23://karamaja
			api.teleportEntity(player, 3086, 3502, 0);
			return true;
		case 24://Draynor village
			api.teleportEntity(player, 3110, 3294, 0);
			return true;
		case 25://alkarid
			api.teleportEntity(player, 3086, 3502, 0);
			return true;
		default:
			api.sendMessage(player, "Unhandled equipment option: item="+item.getID()+", option="+option);
		}
		return true;
	},
	
	/* Returns the examine text for the item, or "null" to use the default */
	getExamine : function (player, item) {
		return null;
	}

});


/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var itemListener = new ItemListener();
	scriptManager.registerItemListener(itemListener, itemListener.getItemIDs());
};