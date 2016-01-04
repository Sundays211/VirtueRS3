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
 * @since 16/01/2015
 */

var ScribeListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		if (event == EventType.OPNPC3) {//Get vexillum from
			startClanVexGiver(player, npc);
		} else {
			chatnpc(player, npc, "Hey "+api.getName(player)+", I am giving away free clan vex. If you right click me and click get vex.");
		}
	}
});

function startClanVexGiver (player, npc) {
	if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	if (api.getClanHash(player) == null) {
		api.sendMessage(player, "You must be in a clan to get a clan vex.");
		return;
	}
	if (api.carriedItemTotal(player, 20709) > 0
			|| api.itemTotal(player, Inv.BANK, 20709) > 0) {
		api.sendMessage(player, "You already own a clan vexillum.");
		return;
	}
	api.addCarriedItem(player, 20709, 1);
	chatnpc(player, npc, "Here you go "+api.getName(player)+".");
}

var GuardCaptainListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		if (event == EventType.OPNPC3) {//Get cloak from
			startClanCloakGiver(player, npc);
		} else {
			chatnpc(player, npc, "Hey "+api.getName(player)+", You can get a clan cape from me.");
		}
	}
});

function startClanCloakGiver (player, npc) {
	if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
		api.sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	if (api.getClanHash(player) == null) {
		api.sendMessage(player, "You must be in a clan to get a clan cloak.");
		return;
	}
	if (api.carriedItemTotal(player, 20708) > 0
			|| api.itemTotal(player, Inv.BANK, 20709) > 0) {
		api.sendMessage(player, "You already own a clan cloak.");
		return;
	}
	api.addCarriedItem(player, 20708, 1);
	chatnpc(player, npc, "Here you go "+api.getName(player)+".");
}

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var listener = new ScribeListener();
	scriptManager.registerListener(EventType.OPNPC1, 5915, listener);
	scriptManager.registerListener(EventType.OPNPC3, 5915, listener);
	
	listener = new GuardCaptainListener();
	scriptManager.registerListener(EventType.OPNPC1, 13633, listener);
	scriptManager.registerListener(EventType.OPNPC3, 13633, listener);
};