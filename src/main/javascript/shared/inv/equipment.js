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
var util = require('../util');
var config = require('engine/config');
var chat = require('../chat');
var common = require('./common');

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
		isWearing : isWearing,
		wearItem : wearItem,
		removeItem : removeItem,
		handleInteraction : handleInteraction
	};

	function isWearing(player, objId) {
		return common.has(player, objId, 1, Inv.EQUIPMENT);
	}

	function wearItem (player, objId, slot) {
		if (!player.getEquipment().meetsEquipRequirements(objId)) {
			return;
		}
		if (!player.getEquipment().wearItem(slot)) {
			chat.sendMessage(player, "You do not have enough space in your backpack to equip that item.");
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
			chat.sendMessage(player, config.objDesc(objId));
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