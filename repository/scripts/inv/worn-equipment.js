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
/* globals EventType, ENGINE, Inv */
var varbit = require('../core/var/bit');
var varc = require('../core/var/client');

var widget = require('../core/widget');
var util = require('../core/util');
var config = require('../core/config');
var inv = require('./core');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 23/03/2016
 */
module.exports = (function () {
	return {
		init : init,
		isWearing : isWearing,
		wearItem : wearItem,
		removeItem : removeItem
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1464, function (ctx) {
			widget.setEvents(ctx.player, 1464, 15, 0, 18, 15302654);
			widget.setEvents(ctx.player, 1464, 13, 2, 12, 2);
			ENGINE.sendInv(ctx.player, Inv.EQUIPMENT);		
			varc(ctx.player, 181, 0);
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1464, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 15:
				var item = ENGINE.getItem(player, Inv.EQUIPMENT, ctx.slot);			
				if (item === null || util.getId(item) != ctx.itemId) {
					//The client inventory must not be synchronised, so let's send it again
					ENGINE.sentInv(player, Inv.EQUIPMENT);
					return;
				}
				handleInteraction(player, util.getId(item), ctx.slot, ctx.button, ctx);
				return;
			case 13:
				switch (ctx.slot) {
				case 12:
					varbit(player, 18995, 3);
					widget.openOverlay(player, 0);
					return;
				case 7:
					widget.openCentral(player, 17, false);
					widget.setEvents(player, 17, 18, 1024, 14, 1024);
					widget.setEvents(player, 17, 17, 1024, 47, 1024);
					widget.setEvents(player, 17, 20, 1024, 47, 1024);
					widget.setEvents(player, 17, 22, 1024, 47, 1024);
					return;
				case 2:
					widget.openCentral(player, 1178, false);
					return;
				default:
					util.defaultHandler(ctx, "worn equipment");
					return;
				}
				return;
			default:
				util.defaultHandler(ctx, "worn equipment");
				return;
			}
		});
	}
	
	function isWearing(player, objId) {
		return inv.has(player, objId, 1, Inv.EQUIPMENT);
	}
	
	function wearItem (player, objId, slot) {
		if (!player.getEquipment().meetsEquipRequirements(objId)) {
			return;
		}
		if (!player.getEquipment().wearItem(slot)) {
			ENGINE.sendMessage(player, "You do not have enough space in your backpack to equip that item.");
		}
	}
	
	function removeItem (player, objId, slot) {
		player.getEquipment().removeItem(slot, objId);
	}
	
	function handleInteraction (player, objId, slot, button, ctx) {
		var eventType = null;
		switch (button) {
		case 1://Remove
			removeItem(player, objId, slot);
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
			ENGINE.sendMessage(player, config.objDesc(objId));
			return;
		default:
			break;
		}
		if (eventType === null || ENGINE.hasEvent(eventType, objId)) {
			var args = {
					"player" : player,
					"item" : objId,
					"slot" : slot
			};
			ENGINE.invokeEvent(eventType, objId, args);
		} else {
			util.defaultHandler(ctx, "worn equipment");
		}
	}
})();
