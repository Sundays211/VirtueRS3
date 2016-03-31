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
 * @since 23/03/2016
 */

var EquipmentOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		api.setWidgetEvents(player, 1464, 15, 0, 18, 15302654);
		api.setWidgetEvents(player, 1464, 13, 2, 12, 2);
		api.sendInv(player, Inv.EQUIPMENT);		
		api.setVarc(player, 181, 0);
	}
});

var EquipmentButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		switch (args.component) {
		case 15:
			var item = api.getItem(player, Inv.EQUIPMENT, args.slot);			
			if (item == null || api.getId(item) != args.itemId) {
				//The client inventory must not be synchronised, so let's send it again
				api.sentInv(player, Inv.EQUIPMENT);
				return;
			}
			WornEquipment.handleInteraction(player, item, args.slot, args.button);
			return;
		case 13:
			switch (args.slot) {
			case 12:
				api.setVarBit(player, 18995, 3);
				Overlay.openOverlay(player, 0);
				/*player.getVars().setVarValueInt(3708, 38544385);
				player.getVars().setVarValueInt(3708, 38544385);
				player.getWidgets().sendOverlay(1, -1);
				player.getDispatcher().sendHideWidget(1477, 377, false);
				player.getDispatcher().sendWidgetSettings(1477, 376, 0, 24, 2);
				player.getDispatcher().sendWidgetSettings(1477, 379, 1, 1, 2);
				player.getDispatcher().sendWidgetSettings(1477, 378, 1, 1, 2);
				player.getDispatcher().sendVarc(2911, 1);
				player.getDispatcher().sendHideWidget(1448, 3, false);
				player.getWidgets().openWidget(1448, 3, 1474, true);
				player.getDispatcher().sendHideWidget(1448, 3, false);
				player.getDispatcher().sendHideWidget(1448, 4, true);
				player.getDispatcher().sendWidgetEvents(1474, 15, -1, -1, 2097152);
				player.getDispatcher().sendWidgetEvents(1474, 15, 0, 27, 15302030);
				player.getDispatcher().sendHideWidget(1448, 5, false);
				player.getWidgets().openWidget(1448, 5, 1463, true);
				player.getDispatcher().sendHideWidget(1448, 5, false);
				player.getDispatcher().sendHideWidget(1448, 6, true);
				player.getDispatcher().sendHideWidget(1448, 7, false);
				player.getWidgets().openWidget(1448, 7, 1462, true);
				player.getDispatcher().sendHideWidget(1448, 7, false);
				player.getDispatcher().sendHideWidget(1448, 8, true);
				player.getDispatcher().sendWidgetEvents(1462, 14, 0, 18, 15302654);
				player.getDispatcher().sendWidgetEvents(1462, 20, 2, 12, 2);
				player.getDispatcher().sendHideWidget(1448, 9, true);
				player.getDispatcher().sendHideWidget(1448, 10, true);
				player.getDispatcher().sendHideWidget(1448, 11, true);
				player.getDispatcher().sendHideWidget(1448, 12, true);
				player.getDispatcher().sendHideWidget(1448, 1, true);*/
				return;
			case 7:
				api.openCentralWidget(player, 17, false);
				api.setWidgetEvents(player, 17, 18, 1024, 14, 1024);
				api.setWidgetEvents(player, 17, 17, 1024, 47, 1024);
				api.setWidgetEvents(player, 17, 20, 1024, 47, 1024);
				api.setWidgetEvents(player, 17, 22, 1024, 47, 1024);
				return;
			case 2:
				api.openCentralWidget(player, 1178, false);
				return;
			}
		default:
			api.sendMessage(player, "Unhandled worn equipment button: comp="+args.component+", slot="+args.slot+", button="+args.button);
			return;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var openListener = new EquipmentOpenListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1464, openListener);
	
	var buttonListener = new EquipmentButtonListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1464, buttonListener);
};

var WornEquipment = {
		wearItem : function (player, item, slot) {
			if (!player.getEquipment().meetsEquipRequirements(item)) {
				return;
			}
			if (!player.getEquipment().wearItem(slot)) {
				api.sendMessage(player, "You do not have enough space in your backpack to equip that item.");
			}
		},
		removeItem : function (player, item, slot) {
			player.getEquipment().removeItem(slot, api.getId(item));
		},
		
		handleInteraction : function (player, item, slot, button) {
			var itemId = api.getId(item);
			var eventType = null;
			switch (button) {
			case 1://Remove
				this.removeItem(player, item, slot);
				return;
			case 2://Equipment op 1
				eventType = EventType.OPWORN1;
				break;
			case 3://Equipment op 2
				eventType = EventType.OPWORN2;
				break;
			case 4://Equipment op 3
				eventType = EventType.OPWORN3;
				break;
			case 5://Equipment op 4
				eventType = EventType.OPWORN4;
				break;
			case 6://Equipment op 5
				eventType = EventType.OPWORN5;
				break;
			case 10://Examine
				api.sendMessage(player, ""+item);
				api.sendMessage(player, api.getItemDesc(item));
				return;
			default:
				break;
			}
			if (eventType == null || api.hasEvent(eventType, itemId)) {
				var args = {
						"player" : player,
						"item" : item,
						"slot" : slot
				};
				api.invokeEvent(eventType, itemId, args);
			} else {
				player.getDispatcher().sendGameMessage("Unhanded equipment item button: item="+item+", slot="+slot+", button="+button);
			}
		}
}
