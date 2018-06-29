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
/* globals EventType, ENGINE, Inv, Stat */
var component = require('shared/widget/component');
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');
var CONST = require('shared/const');

var util = require('shared/util');
var config = require('engine/config');
var map = require('shared/map');
var dialog = require('shared/dialog');
var widget = require('shared/widget');
var chat = require('shared/chat');
var inv = require('shared/inv');

var moneyPouch = require('shared/inv/money-pouch');
var wornEquipment = require('shared/inv/equipment');
var loan = require('../trade/loan');
var actionBar = require('../combat/widgets/action-bar');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 25/03/2016
 */
module.exports = (function() {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1473, function (ctx) {
			var player = ctx.player;
			widget.open(player, 762, 112, 1463, true);
			widget.setEvents(player, 1473, 34, -1, -1, 2097152);
			widget.setEvents(player, 1473, 34, 0, 27, 15302030);
			ENGINE.sendInv(player, Inv.BACKPACK);
			ENGINE.sendInv(player, Inv.MONEY_POUCH);

			//TODO: Move this logic to Invention code
			if (varbit(player, 30224) != 1 &&
					ENGINE.getBaseLevel(player, Stat.SMITHING) > 80 &&
					ENGINE.getBaseLevel(player, Stat.CRAFTING) > 80 &&
					ENGINE.getBaseLevel(player, Stat.DIVINATION) > 80) {
				varbit(player, 30224, 1);
			}
			moneyPouch.updateCoins(player);
		});

		scriptManager.bind(EventType.IF_BUTTON, 1473, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 34://Backpack item
				var item = ENGINE.getItem(player, Inv.BACKPACK, ctx.slot);
				if (item === null || util.getId(item) != ctx.itemId) {
					ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
					return;
				}
				handleItemInteraction(player, item, ctx);
				return;
			case 52://Bond pouch
				return;//This is handled on the client side
			case 58://Money pouch option
				switch (ctx.button) {
				case 2://Open price checker
					widget.openCentral(player, 206, false);
					return;
				case 3://Examine
					moneyPouch.examineMoneyPouch(player);
					return;
				case 4://Withdraw
					moneyPouch.requestWithdrawCoins(player);
					return;
				default:
					util.defaultHandler(ctx, "backpack");
					return;
				}
				return;
			case 53://Invention pouch
				switch (ctx.button) {
				case 1:
					widget.openCentral(player, 1709, false);
					return;
				default:
					util.defaultHandler(ctx, "backpack");
					return;
				}
				return;
			//case 47://Wealth evaluator
			default:
				util.defaultHandler(ctx, "backpack");
				return;
			}
		});

		scriptManager.bind(EventType.IF_DRAG, component(1473, 34), function (ctx) {
			var player = ctx.player;
			var item = ENGINE.getItem(player, Inv.BACKPACK, ctx.fromslot);
			if (item === null) {
				ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
				return;
			}
			var hash = ctx.toHash;
			if (widget.getId(hash) == 1430) {
				actionBar.dragOnto(ctx.player, hash, 0, 0, util.getId(item));
				return;
			} else if (widget.getId(hash) != 1473) {//Item dragged somewhere other than backpack
				util.defaultHandler(ctx, "backpack item");
				return;
			}
			switch (ctx.tocomponent) {
			case 34://Move an item in the player's backpack
				if (ctx.toslot < 0 || ctx.toslot >= 28) {
					return;//This means the item wasn't dragged onto another slot. We'll just suppress the debug message...
				}
				var destItem = ENGINE.getItem(player, Inv.BACKPACK, ctx.toslot);
				//Since the client version has already changed, the order is reversed
				if (util.getId(item) != ctx.toitem || util.getId(destItem) != ctx.fromitem) {
					ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
					return;
				}
				ENGINE.setInvSlot(player, Inv.BACKPACK, ctx.toslot, item);
				ENGINE.setInvSlot(player, Inv.BACKPACK, ctx.fromslot, destItem);
				return;
			case 53://TODO: Move this to the invention code
				if (util.getId(item) != ctx.fromitem) {
					ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
					return;
				}
				var disassembly = require('../skill/invention/disassembly');
				disassembly.start(player, util.getId(item), ctx.fromslot);
				return;
			default:
				util.defaultHandler(ctx, "backpack item");
				return;
			}
		});

		scriptManager.bind(EventType.OPHELD4, CONST.COINS, function (ctx) {
			var amount = ENGINE.getCount(ctx.item);

			if (util.checkOverflow(moneyPouch.getCoinCount(ctx.player), amount)) {
				chat.sendMessage(ctx.player, "You do not have enough space in your money pouch.");
				return;
			}
			moneyPouch.addCoins(ctx.player, amount);
			ENGINE.delItem(ctx.player, Inv.BACKPACK, CONST.COINS, amount);
		});

		scriptManager.bind(EventType.IF_BUTTONT, component(1473, 34), handleUseOnInterface);
		scriptManager.bind(EventType.OPLOCT, component(1473, 34), handleUseOnLoc);
		scriptManager.bind(EventType.OPNPCT, component(1473, 34), handleUseOnNpc);
		scriptManager.bind(EventType.OPPLAYERT, component(1473, 34), handleUseOnPlayer);
	}

	function handleItemInteraction (player, item, ctx) {
		var objId = util.getId(item);
		var objCount = ENGINE.getCount(item);
		var opString, eventType;
		switch (ctx.button) {
		case 1://Iop1
			eventType = EventType.OPHELD1;
			opString = config.objIop(objId, 1);
			break;
		case 2://Iop2
			eventType = EventType.OPHELD2;
			opString = config.objIop(objId, 2);
			break;
		case 3://Iop3
			eventType = EventType.OPHELD3;
			opString = config.objIop(objId, 3);
			break;
		case 7://Iop4
			eventType = EventType.OPHELD4;
			opString = config.objIop(objId, 4);
			break;
		case 8://Iop5
			eventType = EventType.OPHELD5;
			opString = config.objIop(objId, 5);
			break;
		case 10://Examine
			chat.sendMessage(player, ""+item);
			chat.sendMessage(player, config.objDesc(objId));
			if (ENGINE.getExchangeCost(item) > -1) {
				chat.sendMessage(player, "GE guide price: "+util.toFormattedString(ENGINE.getExchangeCost(item)) +" gp each");
			}
		return;

		default:
			util.defaultHandler(ctx, "backpack");
			return;
		}
		if (ENGINE.hasEvent(eventType, objId)) {
			var args = {
					"player" : player,
					"item" : item,
					"objId" : objId,
					"objCount" : objCount,
					"slot" : ctx.slot
			};
			ENGINE.invokeEvent(eventType, objId, args);
		} else if (eventType == EventType.OPHELD2 && (opString == "Wear" || opString == "Wield") &&
				config.objWearpos(objId) != -1) {
			wornEquipment.equipItem(player, item, ctx.slot);
		} else if (eventType == EventType.OPHELD5 &&
				(opString == "Drop" || opString == "Destroy" || opString == "Discard")) {
			if (opString == "Drop") {
				dropItem(player, objId, objCount, ctx.slot);
			} else if ("Destroy" == opString) {
				destroyItem(player, objId, objCount, ctx.slot);
			} else if ("Discard" == opString) {
				discardItem(player, objId, ctx.slot);
			}
		} else {
			chat.sendDebugMessage(player, "Unhanded inventory item option: item="+item+", slot="+ctx.slot+", option="+opString+" ("+ctx.button+")");
		}
	}

	function handleUseOnInterface (ctx) {
		var player = ctx.player;
		var useslot = ctx.slot;
		var useitem = ENGINE.getItem(player, Inv.BACKPACK, useslot);
		if (useitem === null || util.getId(useitem) !== ctx.itemId) {
			ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
			return;
		}

		if (ctx.targetInterface != 1473) {//Item used on something other than backpack
			chat.sendDebugMessage(player, "Unhandled backpack item target: srcItem="+useitem+", targetInterface="+ctx.targetInterface+", targetComp="+ctx.targetComponent);
			return;
		}
		switch (ctx.targetComponent) {
		case 34://Used an item on another item in the player's backpack
			var slot = ctx.targetSlot;
			var item = ENGINE.getItem(player, Inv.BACKPACK, slot);
			if (item === null) {
				return;//This means the item wasn't used onto another item. We'll just suppress the debug message...
			}
			if (util.getId(item) != ctx.targetItemId) {
				ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
				return;
			}
			if (slot === useslot) {
				return;//Item used on itself
			}
			if (ENGINE.hasEvent(EventType.OPHELDU, util.getId(item))) {
				var args = {
						"player" : player,
						"useitem" : useitem,
						"useObjId" : util.getId(useitem),
						"useslot" : useslot,
						"item" : item,
						"objId" : util.getId(item),
						"slot" : slot
				};
				ENGINE.invokeEvent(EventType.OPHELDU, util.getId(item), args);
			} else {
				var message = "Nothing interesting happens.";
				if (util.isAdmin(player)) {
					message = "Unhandled item use: item="+item+", slot="+slot+", useitem="+useitem+", useslot="+useslot;
				}
				chat.sendDebugMessage(player, message);
			}
			return;
		default:
			util.defaultHandler(ctx);
			return;
		}
	}

	function handleUseOnLoc (ctx) {
		var player = ctx.player;
		var useslot = ctx.slot;
		var useitem = ENGINE.getItem(player, Inv.BACKPACK, useslot);
		if (useitem === null || util.getId(useitem) !== ctx.itemId) {
			ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
			return;
		}

		var location = ctx.targetLoc;
		if (ENGINE.hasEvent(EventType.OPLOCU, util.getId(location))) {
			var args = {
					"player" : player,
					"useitem" : useitem,
					"useObjId" : util.getId(useitem),
					"useslot" : useslot,
					"location" : ctx.targetLoc,
					"locTypeId" : util.getId(ctx.targetLoc),
					"coords" : ctx.targetCoords
			};
			ENGINE.invokeEvent(EventType.OPLOCU, util.getId(location), args);
		} else {
			var message = "Nothing interesting happens.";
			if (util.isAdmin(player)) {
				message = "Unhandled location use: location="+location+", useitem="+useitem+", useslot="+useslot;
			}
			chat.sendDebugMessage(player, message);
		}
	}

	function handleUseOnNpc (ctx) {
		var player = ctx.player;
		var useslot = ctx.slot;
		var useitem = ENGINE.getItem(player, Inv.BACKPACK, useslot);
		if (useitem === null || util.getId(useitem) !== ctx.itemId) {
			ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
			return;
		}

		var npc = ctx.npc;
		if (ENGINE.hasEvent(EventType.OPNPCU, util.getId(npc))) {
			var args = {
					"player" : player,
					"useitem" : useitem,
					"useObjId" : util.getId(useitem),
					"useslot" : useslot,
					"npc" : npc
			};
			ENGINE.invokeEvent(EventType.OPNPCU, util.getId(npc), args);
		} else {
			var message = "Nothing interesting happens.";
			if (util.isAdmin(player)) {
				message = "Unhandled NPC use: npc="+npc+", useitem="+useitem+", useslot="+useslot;
			}
			chat.sendDebugMessage(player, message);
		}
	}

	function handleUseOnPlayer (ctx) {
		var player = ctx.player;
		var useslot = ctx.slot;
		var useitem = ENGINE.getItem(player, Inv.BACKPACK, useslot);
		if (useitem === null || util.getId(useitem) !== ctx.itemId) {
			ENGINE.sendInv(player, Inv.BACKPACK);//Client backpack is out of sync; re-synchronise it
			return;
		}

		var targetPlayer = ctx.target;
		if (ENGINE.hasEvent(EventType.OPPLAYERU, util.getId(useitem))) {
			var args = {
					"player" : player,
					"useitem" : useitem,
					"useObjId" : util.getId(useitem),
					"useslot" : useslot,
					"target" : targetPlayer
			};
			ENGINE.invokeEvent(EventType.OPPLAYERU, util.getId(useitem), args);
		} else {
			var message = "Nothing interesting happens.";
			if (util.isAdmin(player)) {
				message = "Unhandled player use: player="+targetPlayer+", useitem="+useitem+", useslot="+useslot;
			}
			chat.sendDebugMessage(player, message);
		}
	}

	function dropItem (player, objId, count, slot) {
		//The item you are about to drop has high value.
		//I wish to drop it.
		//I wish to keep it.
		if (objId !== -1) {
			map.dropObj(objId, map.getCoords(player), player, count);
			inv.clearSlot(player, Inv.BACKPACK, slot);
		}
	}

	function destroyItem (player, objId, count, slot) {
		//if (inv.total(player, objId) > 1 && inv.getCount(player, Inv.BACKPACK, slot)== 1) {
		//	widget.hide(player, 1183, 8, false);
		//}
		//widget.setText(player, 1183, 4, config.objName(objId));
		//widget.setText(player, 1183, 9, "destroy info here");
		//widget.setObject(player, 1183, 10, objId, count);
		//widget.setText(player, 1183, 12, "Are you sure you want to destroy this object?");
		//widget.openOverlaySub(player, 1006, 1183, false);
		//todo get buttons to work
		chat.sendDebugMessage(player, "Destroyed item: "+objId);
		inv.clearSlot(player, Inv.BACKPACK, slot);
	}

	function discardItem (player, objId, slot) {
		var discard = function () {
			inv.clearSlot(player, Inv.BACKPACK, slot);
			loan.returnBorrowedItem(player);
		};

		var timeRemaining = varp(player, 430);
		var loanFrom = varp(player, 428);
		var message;
		if (timeRemaining > 0) {
			message = "<center>~Loan expires in "+util.toFormattedTime(timeRemaining)+"~</center><br>";
			message += "If you discard this item, it will disappear. You won't be able to pick it up again.";
			dialog.builder(player).mesbox(message).confirm("Discard the item?").then(discard).finish();
		} else if (loanFrom !== null && loanFrom != -1) {
			message = "<center>~Session-based loan~</center><br>";
			message += "If you discard this item, it will return to its owner, "+util.getName(loanFrom);
			message += ". You won't be able to pick it up again.";
			dialog.builder(player).mesbox(message).confirm("Discard the item?").then(discard).finish();
		} else {
			discard();//Destroy immediately, as the player should not still have the item.
		}
	}
})();
