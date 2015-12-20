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
 * @since 04/19/2015
 */

var GloryListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		switch (event) {
		case EventType.OPWORN1://Edgeville
			Glory.edgevilleTeleport(player);
			break;
		case EventType.OPWORN2://Karamja
			Glory.karamjaTeleport(player);
			break;
		case EventType.OPWORN3://Draynor Village
			Glory.draynorTeleport(player);
			break;
		case EventType.OPWORN4://Al Kharid
			Glory.alkharidTeleport(player);
			break;
		}
		Glory.useCharge(player, Inv.EQUIPMENT, objTypeId, args.slot);
	}
});


/* Listen to the items specified */
var listen = function(scriptManager) {
	var ids = [1706, 1708, 1710, 1712];
	var itemListener = new GloryListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPWORN1, ids[i], itemListener);
		scriptManager.registerListener(EventType.OPWORN2, ids[i], itemListener);
		scriptManager.registerListener(EventType.OPWORN3, ids[i], itemListener);
		scriptManager.registerListener(EventType.OPWORN4, ids[i], itemListener);
	}
};

var Glory = {
		edgevilleTeleport : function (player) {
			api.teleportEntity(player, 3086, 3502, 0);
		},
		karamjaTeleport : function (player) {
			api.teleportEntity(player, 2919, 3163, 0);
		},
		draynorTeleport : function (player) {
			api.teleportEntity(player, 3081, 3251, 0);
		},
		alkharidTeleport : function (player) {
			api.teleportEntity(player, 3304, 3124, 0);
		},
		useCharge : function (player, inv, itemId, slot) {
			var newId = 1704;
			var chargesLeft = 0;
			switch (itemId) {
			case 1712:
				newId = 1710;
				chargesLeft = 3;
				break;
			case 1710:
				newId = 1708;
				chargesLeft = 2;
				break;
			case 1708:
				newId = 1706;
				chargesLeft = 1;
				break;
			case 1706:
				newId = 1704;
				chargesLeft = 0;
				break;
			}
			api.setInvSlot(player, inv, slot, newId, 1);
			switch (chargesLeft) {
			case 3:
				api.sendMessage(player, "Your amulet has three charges left.");
				break;
			case 2:
				api.sendMessage(player, "Your amulet has two charges left.");
				break;
			case 1:
				api.sendMessage(player, "Your amulet has one charge left.");
				break;
			case 0:
				api.sendMessage(player, "<col=ff0000>You use your amulet's last charge.</col>");
				break;
			}
		}
}