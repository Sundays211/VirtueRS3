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

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/01/2015
 */
var api;

var ItemOnItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.ItemOnItemListener'), {

	/* The first option on an object */
	handleInteraction: function(player, item1, slot1, item2, slot2) {
		var item = item1;
		var slot = slot1;
		if (item1.getID() === 33296 && item2.getID() == 28617) {
			api.addCarriedItem(player, 33390, 1);
			api.delCarriedItem(player, 33296, 1, slot);
			api.delCarriedItem(player, 28617, 1, slot);
			api.sendMessage(player, "You successfully placed dye over the seismic wand.");
		} else {
			api.sendMessage(player, "Nothing interesting happens.");
			//api.sendMessage(player, "item on item: item1="+item.getID()+", item2="+item2.getID());
		}
		return true;
	}

});

/* Listen to the location ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var listener = new ItemOnItemListener();
	scriptManager.registerItemOnItemListener(listener, 33296, 28617);

};