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

var NpcListener = Java.extend(Java.type('org.virtue.engine.script.listeners.NpcListener'), {

	/* The npc ids to bind to */
	getIDs: function() {
		return [4907, 494, 1419, 2593, 3416];
	},

	/* The first option on an npc */
	handleInteraction: function(player, npc, option) {
		switch (npc.getID()) {
		case 1419:
		case 2593:
			switch (option) {
			case 1:
				api.openCentralWidget(player, 105, false);
				return true;
			default:
				return false;
			}
		default://Normal banker
			switch (option) {
			case 1:
				api.openOverlaySub(player, 1017, 762, false);
				return true;
			case 4://Collect
				api.openCentralWidget(player, 109, false);
				return true;
			default:
				return false;
			}		
		}			
	},
	
	getInteractRange : function (npc, option) {
		return 2;
	}

});

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	var locs = [ 2213, 782, 11758, 34752, 83634, 10517, 29085, 42192, 14369, 20607, 42217, 79036 ];
	var listener = new BankBoothListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, locs[i], listener);
		scriptManager.registerListener(EventType.OPLOC2, locs[i], listener);
		scriptManager.registerListener(EventType.OPLOC3, locs[i], listener);
	}
	
	var npcListener = new NpcListener();
	scriptManager.registerNpcListener(npcListener, npcListener.getIDs());
};