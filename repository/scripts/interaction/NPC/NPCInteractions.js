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
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 01/16/2015
 */

var HansListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		if (event == EventType.OPNPC1) {
			chatnpc(player, npc, "Hello. What are you doing here?");
		} else if (event == EventType.OPNPC3) {
			chatnpc(player, npc, "Would you like to purchase a cape?");
		}
	}
});

var ThessaliaListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		if (event == EventType.OPNPC1) {
			chatnpc(player, npc, "Would you like to buy any fine clothes?");
		} else if (event == EventType.OPNPC4) {
			startMakeover(player, npc);
		}
	}
});

var NastrothListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		if (api.freeSpaceTotal(player, Inv.BACKPACK) < 28) {
			chatnpc(player, npc, "Sorry! I cannot give you any item's if you have something in your inventory already. You must have atleast 28 empty inventory slots. Come talk to me later.");
			return;
		}
		api.addCarriedItem(player, 995, 100000);
		api.addCarriedItem(player, 15273, 1000);
		api.addCarriedItem(player, 6585, 1);
		api.addCarriedItem(player, 4151, 1);
		api.addCarriedItem(player, 1163, 1);
		api.addCarriedItem(player, 1127, 1);
		api.addCarriedItem(player, 1201, 1);
		api.addCarriedItem(player, 1079, 1);
		api.addCarriedItem(player, 4131, 1);
		api.addCarriedItem(player, 6570, 1);
		api.addCarriedItem(player, 7462, 1);
		chatnpc(player, npc, "Here you go! Enjoy your starter kit.");
	}
});

var LadyDeathknellListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		chatnpc(player, npc, "You can start your journey by picking one of the starter set's beside the bank chest.");
		api.runAnimation(npc, 21985);
	}
});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var listener = new HansListener();
	scriptManager.registerListener(EventType.OPNPC1, 0, listener);
	scriptManager.registerListener(EventType.OPNPC3, 0, listener);
	
	listener = new ThessaliaListener();
	scriptManager.registerListener(EventType.OPNPC1, 548, listener);
	//scriptManager.registerListener(EventType.OPNPC4, 548, listener);
	
	listener = new NastrothListener();
	scriptManager.registerListener(EventType.OPNPC1, 6539, listener);
	
	listener = new LadyDeathknellListener();
	scriptManager.registerListener(EventType.OPNPC1, 16014, listener);
};