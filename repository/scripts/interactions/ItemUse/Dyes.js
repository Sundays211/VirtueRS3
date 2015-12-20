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

var DyeListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;		
		var item = args.item;
		var slot = args.slot;
		
		switch (objTypeId) {
		case 28617://seismic wand
			if (api.getId(args.useitem) != 33296) {//The "use" item must be dye
				api.sendMessage(player, "Nothing interesting happens.");
				return;
			}
			api.setInvSlot(player, Inv.BACKPACK, slot, 33390, 1);
			api.delItem(player, Inv.BACKPACK, 33296, 1, args.useslot);
			api.sendMessage(player, "You successfully place dye over the seismic wand.");
			return;
		default:
			api.sendMessage(player, "Nothing interesting happens.");
			return;
		}
		return;
	}
});

/* Listen to the items specified */
var listen = function(scriptManager) {
	var listener = new DyeListener();
	//Bind to seismic wand (this means the event is called when any item is used on the wand, but not when the wand is used on another item)
	scriptManager.registerListener(EventType.OPHELDU, 28617, listener);
};