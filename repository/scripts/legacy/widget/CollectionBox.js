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

var CollectionBoxListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		if (event == EventType.IF_OPEN) {
			api.sendInv(player, Inv.LOAN_RETURN);
		} else {
			switch (args.component) {
			case 20://Reclaim item
				if (option == 1) {
					if (api.getVarp(player, 431) > 0) {
						api.sendMessage(player, "Unhandled collection box button: comp="+args.component+", button="+args.button+", slot="+args.slot);
						return;
					} else if (api.getVarp(player, 429) != -1) {
						//Forcefully return
						//[Name] wants [his/her] item returned now. The item [he/she] lent to you has been returned to [his/her] Returned Items box.
						api.sendMessage(player, "Unhandled collection box button: comp="+args.component+", button="+args.button+", slot="+args.slot);
						return;
					} else {
						if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
							api.sendMessage(player, "Not enough space.");
							return;
						}
						var item = api.getItem(player, Inv.LOAN_RETURN, 0);
						if (item != null) {
							api.delItem(player, Inv.LOAN_RETURN, api.getId(item), 1);
							api.addItem(player, Inv.BACKPACK, api.getId(item), 1);
							return;
						}					
					}				
					api.sendMessage(player, "Unhandled collection box button: comp="+args.component+", button="+args.button+", slot="+args.slot);
					return false;
				} else if (option == 10) {				
					var desc = api.getItemDesc(args.item);
					api.sendMessage(player, desc);
					return true;
				} else {
					api.sendMessage(player, "Unhandled collection box button: comp="+args.component+", button="+args.button+", slot="+args.slot);
					return;
				}			
			default:
				api.sendMessage(player, "Unhandled collection box button: comp="+args.component+", button="+args.button+", slot="+args.slot);
				return;
			}
		}
		//Check script 654
		//Container 540 for loaned items?
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var collectionBoxListener = new CollectionBoxListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 109, collectionBoxListener);
	scriptManager.registerListener(EventType.IF_OPEN, 109, collectionBoxListener);
};