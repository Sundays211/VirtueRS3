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
 * @since 25/03/2016
 */

var BackpackOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		api.openWidget(player, 762, 112, 1463, true);
		api.setWidgetEvents(player, 1473, 34, -1, -1, 2097152);
		api.setWidgetEvents(player, 1473, 34, 0, 27, 15302030);
		api.sendInv(player, Inv.BACKPACK);
		api.sendInv(player, Inv.MONEY_POUCH);
	}
});

var BackpackButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		switch (args.component) {
		
		default:
			api.sendMessage(player, "Unhandled backpack component: "+args.component);
			return;
		}
	}
});

var BackpackDragListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		var item = api.getItem(player, Inv.BACKPACK, args.fromslot);
		if (item == null) {
			api.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
			return;
		}
		if (args.tointerface != 1473) {//Item dragged somewhere other than backpack
			api.sendMessage(player, "Unhandled backpack item drag: srcItem="+item+", destInterface="+args.tointerface+", destComp="+args.tocomponent);
			return;
		}
		switch (args.tocomponent) {
		case 34://Move an item in the player's backpack
			if (args.toslot < 0 || args.toslot >= 28) {
				return;//This means the item wasn't dragged onto another slot. We'll just suppress the debug message...
			}
			var destItem = api.getItem(player, Inv.BACKPACK, args.toslot);
			//Since the client version has already changed, the order is reversed
			if (api.getId(item) != args.toitem || api.getId(destItem) != args.fromitem) {
				api.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
				return;
			}
			api.setInvSlot(player, Inv.BACKPACK, args.toslot, item);
			api.setInvSlot(player, Inv.BACKPACK, args.fromslot, destItem);
			return;
		default:
			api.sendMessage(player, "Unhandled backpack item drag: srcItem="+item+", destComp="+args.tocomponent);
			return;
		}
	}
});

var BackpackUseListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		var useslot = args.slot;
		var useitem = api.getItem(player, Inv.BACKPACK, useslot);
		if (useitem == null || api.getId(useitem) != args.itemId) {
			api.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
			return;
		}
		if (event == EventType.IF_BUTTONT) {
			Backpack.handleUseOnInterface(player, useitem, useslot, args);
		} else if (event == EventType.OPLOCT) {
			Backpack.handleUseOnLoc(player, useitem, useslot, args);
		} else if (event == EventType.OPNPCT) {
			Backpack.handleUseOnNpc(player, useitem, useslot, args);
		} else if (event == EventType.OPPLAYERT) {
			Backpack.handleUseOnPlayer(player, useitem, useslot, args);
		} else {
			throw "Invalid event type: "+event;
		}		
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new BackpackOpenListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1473, listener);
	
	listener = new BackpackDragListener();	
	scriptManager.registerCompListener(EventType.IF_DRAG, 1473, 34, listener);
	
	listener = new BackpackUseListener();	
	scriptManager.registerCompListener(EventType.IF_BUTTONT, 1473, 34, listener);
	scriptManager.registerCompListener(EventType.OPLOCT, 1473, 34, listener);
	scriptManager.registerCompListener(EventType.OPNPCT, 1473, 34, listener);
	scriptManager.registerCompListener(EventType.OPPLAYERT, 1473, 34, listener);
};

var Backpack = {
		handleUseOnInterface : function (player, useitem, useslot, eventArgs) {
			if (args.targetInterface != 1473) {//Item used on something other than backpack
				api.sendMessage(player, "Unhandled backpack item target: srcItem="+useitem+", targetInterface="+eventArgs.targetInterface+", targetComp="+eventArgs.targetComponent);
				return;
			}
			switch (eventArgs.targetComponent) {
			case 34://Used an item on another item in the player's backpack
				var slot = eventArgs.targetSlot;
				var item = api.getItem(player, Inv.BACKPACK, slot);
				if (item == null) {
					return;//This means the item wasn't used onto another item. We'll just suppress the debug message...
				}
				if (api.getId(item) != eventArgs.targetItemId) {
					api.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
					return;
				}
				if (slot == useslot) {
					return;//Item used on itself
				}
				if (api.hasEvent(EventType.OPHELDU, api.getId(item))) {
					var args = {
							"player" : player,
							"useitem" : useitem,
							"useslot" : useslot,
							"item" : item,
							"slot" : slot
					};
					api.invokeEvent(EventType.OPHELDU, api.getId(item), args);
				} else {
					var message = "Nothing interesting happens.";
					if (api.isAdmin(player)) {
						message = "Unhandled item use: item="+item+", slot="+slot+", useitem="+useitem+", useslot="+useslot;
					}
					api.sendMessage(player, message);
				}
				return;
			default:
				api.sendMessage(player, "Unhandled backpack item use: srcItem="+useitem+", destComp="+eventArgs.targetComponent);
				return;
			}
		},
		handleUseOnLoc : function (player, useitem, useslot, eventArgs) {
			var location = eventArgs.targetLoc;
			if (api.hasEvent(EventType.OPLOCU, api.getId(location))) {
				var args = {
						"player" : player,
						"useitem" : useitem,
						"useslot" : useslot,
						"location" : eventArgs.targetLoc,
						"coords" : eventArgs.targetCoords
				};
				api.invokeEvent(EventType.OPLOCU, api.getId(location), args);
			} else {
				var message = "Nothing interesting happens.";
				if (api.isAdmin(player)) {
					message = "Unhandled location use: location="+location+", useitem="+useitem+", useslot="+useslot;
				}
				api.sendMessage(player, message);
			}
		},
		handleUseOnNpc : function (player, useitem, useslot, eventArgs) {
			var npc = eventArgs.npc;
			if (api.hasEvent(EventType.OPNPCU, api.getId(npc))) {
				var args = {
						"player" : player,
						"useitem" : useitem,
						"useslot" : useslot,
						"npc" : npc
				};
				api.invokeEvent(EventType.OPNPCU, api.getId(npc), args);
			} else {
				var message = "Nothing interesting happens.";
				if (api.isAdmin(player)) {
					message = "Unhandled NPC use: npc="+npc+", useitem="+useitem+", useslot="+useslot;
				}
				api.sendMessage(player, message);
			}
		},
		handleUseOnPlayer : function (player, useitem, useslot, eventArgs) {
			var targetPlayer = eventArgs.target;
			if (api.hasEvent(EventType.OPPLAYERU, api.getId(useitem))) {
				var args = {
						"player" : player,
						"useitem" : useitem,
						"useslot" : useslot,
						"target" : targetPlayer
				};
				api.invokeEvent(EventType.OPPLAYERU, api.getId(useitem), args);
			} else {
				var message = "Nothing interesting happens.";
				if (api.isAdmin(player)) {
					message = "Unhandled player use: player="+targetPlayer+", useitem="+useitem+", useslot="+useslot;
				}
				api.sendMessage(player, message);
			}
		}
}