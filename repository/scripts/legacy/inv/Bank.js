/**
 * Copyright (c) 2016 Virtue Studios
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
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 22/03/2016
 */
var BankBoothListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1:
			api.openOverlaySub(player, 1017, 762, false);
			return;
		case EventType.OPLOC2://Handing code for the second option //Open Bank
			api.openOverlaySub(player, 1017, 762, false);
			return;
		case EventType.OPLOC3://Collect
			api.openCentralWidget(player, 109, false);
			return;
		}		
	}
});

var BankerListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		if (event == EventType.OPNPC1) {
			api.openOverlaySub(player, 1017, 762, false);
		} else if (event == EventType.OPNPC4) {
			api.openCentralWidget(player, 109, false);
		}		
	}
});

/* Listen to the game nodes specified */
var listen = function(scriptManager) {
	var locs = [ 2213, 782, 11758, 34752, 83634, 10517, 29085, 42192, 14369, 20607, 42217, 79036 ];
	var listener = new BankBoothListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, locs[i], listener);
		scriptManager.registerListener(EventType.OPLOC2, locs[i], listener);
		scriptManager.registerListener(EventType.OPLOC3, locs[i], listener);
	}
	
	var npcs = [ 494, 495, 496, 497, 498, 499, 2718, 3416, 4907 ];
	var bankerListener = new BankerListener();
	for (var i in npcs) {
		//Binds option one and four on all bankers to this listener
		scriptManager.registerListener(EventType.OPNPC1, npcs[i], bankerListener);
		scriptManager.registerListener(EventType.OPNPC4, npcs[i], bankerListener);
	}
};

var Bank = {
		/**
		 * Checks whether the player has enough space to fit the specified item in their bank
		 */
		canDeposit : function (itemId, count) {
			var storedCount = api.itemTotal(player, Inv.BANK, itemId);
			if (storeCount == 0) {//This means we don't have any of the item in the bank now, so we'll need one more slot
				var emptySlots = api.freeSpaceTotal(player, Inv.BANK);
				return emptySlots > 0;//TODO: Also count the bank boosters.
			} else {//Check whether we would excede the max count (2^31-1)
				return (INTEGER_MAX-storedCount)<count;
			}
		},
		depositItem : function (itemId, count) {
			var selectedTab = api.getVarBit(player, 288);
			
		}
}