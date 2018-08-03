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
import { EventType, Inv, Stat } from 'engine/enums';
import _events from 'engine/events';
import _inv from 'engine/inv';
import _entity from 'engine/entity';
import _config from 'engine/config';
import { varbit, setVarBit, varp } from 'engine/var';
import { Player, EventContext } from 'engine/models';

import _component from 'shared/widget/component';
import { openWidget, setWidgetEvents, openCentralWidget, getWidgetId } from 'shared/widget';
import { getBaseLevel } from 'shared/stat';
import { updateCoins, examineMoneyPouch, requestWithdrawCoins, addCoins, getCoinCount } from 'shared/inv/money-pouch';
import { defaultHandler, isAdmin, getId, toFormattedTime, toFormattedString, checkOverflow } from 'shared/util';
import { COINS_OBJ } from 'shared/const';
import { sendDebugMessage, sendMessage } from 'shared/chat';
import { mesbox, confirmDialog } from 'shared/dialog';
import { dropObject } from 'shared/map';
import { equipItem } from 'shared/inv';

import { returnBorrowedItem } from '../trade/loan';

//Legacy imports. TODO: Remove these as their respective modules get converted
import * as actionBar from '../combat/widgets/action-bar';
import * as disassembly from '../skill/invention/disassembly';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 25/03/2016
 */
_events.bindEventListener(EventType.IF_OPEN, 1473, (ctx) => {
	var player = ctx.player;
	openWidget(player, 762, 112, 1463, true);
	setWidgetEvents(player, 1473, 34, -1, -1, 2097152);
	setWidgetEvents(player, 1473, 34, 0, 27, 15302030);
	_inv.send(player, Inv.BACKPACK);
	_inv.send(player, Inv.MONEY_POUCH);

	//TODO: Move this logic to Invention code
	if (varbit(player, 30224) !== 1 &&
		getBaseLevel(player, Stat.SMITHING) >= 80 &&
		getBaseLevel(player, Stat.CRAFTING) >= 80 &&
		getBaseLevel(player, Stat.DIVINATION) >= 80) {
		setVarBit(player, 30224, 1);
	}
	updateCoins(player);
});

_events.bindEventListener(EventType.IF_BUTTON, 1473, (ctx) => {
	var player = ctx.player;
	switch (ctx.component) {
		case 34://Backpack item
			const objId = _inv.getObject(player, Inv.BACKPACK, ctx.slot);
			if (objId != ctx.objId) {
				//Client backpack is out of sync; re-synchronise it
				_inv.resendSlot(player, Inv.BACKPACK, ctx.slot);
				return;
			}
			const objCount = _inv.getCount(player, Inv.BACKPACK, ctx.slot);
			handleItemInteraction(player, objId, objCount, ctx);
			return;
		case 52://Bond pouch
			return;//This is handled on the client side
		case 58://Money pouch option
			switch (ctx.button) {
				case 2://Open price checker
					openCentralWidget(player, 206, false);
					return;
				case 3://Examine
					examineMoneyPouch(player);
					return;
				case 4://Withdraw
					requestWithdrawCoins(player);
					return;
				default:
					defaultHandler(ctx, "backpack");
					return;
			}
		case 53://Invention pouch
			switch (ctx.button) {
				case 1:
					openCentralWidget(player, 1709, false);
					return;
				default:
					defaultHandler(ctx, "backpack");
					return;
			}
		//case 47://Wealth evaluator
		default:
			defaultHandler(ctx, "backpack");
			return;
	}
});

_events.bindEventListener(EventType.IF_DRAG, _component(1473, 34), (ctx) => {
	var player = ctx.player;
	const objId = _inv.getObject(player, Inv.BACKPACK, ctx.fromslot);
	if (objId === -1) {
		//Client backpack is out of sync; re-synchronise it
		_inv.resendSlot(player, Inv.BACKPACK, ctx.fromslot);
		return;
	}
	const objCount = _inv.getCount(player, Inv.BACKPACK, ctx.fromslot);
	var hash = ctx.toHash;
	if (getWidgetId(hash) == 1430) {
		actionBar.dragOnto(ctx.player, hash, 0, 0, objId);
		return;
	} else if (getWidgetId(hash) != 1473) {//Item dragged somewhere other than backpack
		defaultHandler(ctx, "backpack item");
		return;
	}
	switch (ctx.toComponent) {
		case 34://Move an item in the player's backpack
			if (ctx.toslot < 0 || ctx.toslot >= 28) {
				return;//This means the item wasn't dragged onto another slot. We'll just suppress the debug message...
			}
			const destObjId = _inv.getObject(player, Inv.BACKPACK, ctx.toslot);
			//Since the client version has already changed, the order is reversed
			if (objId !== ctx.toObjId) {
				//Client backpack is out of sync; re-synchronise it
				_inv.resendSlot(player, Inv.BACKPACK, ctx.toslot);
				return;
			} else if (destObjId !== ctx.fromObjId) {
				//Client backpack is out of sync; re-synchronise it
				_inv.resendSlot(player, Inv.BACKPACK, ctx.fromslot);
				return;
			}
			const destObjCount = _inv.getCount(player, Inv.BACKPACK, ctx.toslot);
			_inv.setSlot(player, Inv.BACKPACK, ctx.toslot, objId, objCount);
			_inv.setSlot(player, Inv.BACKPACK, ctx.toslot, destObjId, destObjCount);
			return;
		case 53://TODO: Move this to the invention code
			if (objId !== ctx.fromObjId) {
				//Client backpack is out of sync; re-synchronise it
				_inv.resendSlot(player, Inv.BACKPACK, ctx.fromslot);
				return;
			}
			disassembly.start(player, objId);
			return;
		default:
			defaultHandler(ctx, "backpack item");
			return;
	}
});

_events.bindEventListener(EventType.OPHELD4, COINS_OBJ, (ctx) => {
	var amount = _inv.getCount(ctx.player, Inv.BACKPACK, ctx.slot);

	if (checkOverflow(getCoinCount(ctx.player), amount)) {
		sendMessage(ctx.player, "You do not have enough space in your money pouch.");
		return;
	}
	addCoins(ctx.player, amount);
	_inv.clearSlot(ctx.player, Inv.BACKPACK, ctx.slot);
});

_events.bindEventListener(EventType.IF_BUTTONT, _component(1473, 34), (ctx) => {
	const player = ctx.player;
	const useslot = ctx.slot;
	const useObjId = _inv.getObject(player, Inv.BACKPACK, useslot);
	if (useObjId !== ctx.objId) {
		//Client backpack is out of sync; re-synchronise it
		_inv.resendSlot(player, Inv.BACKPACK, useslot);
		return;
	}

	if (ctx.targetInterface !== 1473) {//Item used on something other than backpack
		sendDebugMessage(player, `Unhandled backpack item target: object=${useObjId}, targetInterface=${ctx.targetInterface}, targetComp=${ctx.targetComponent}`);
		return;
	}
	switch (ctx.targetComponent) {
		case 34://Used an item on another item in the player's backpack
			var slot = ctx.targetSlot;
			var objId = _inv.getObject(player, Inv.BACKPACK, slot);
			if (objId === -1) {
				return;//This means the item wasn't used onto another item. We'll just suppress the debug message...
			}
			if (objId != ctx.targetObjId) {
				//Client backpack is out of sync; re-synchronise it
				_inv.resendSlot(player, Inv.BACKPACK, slot);
				return;
			}
			if (slot === useslot) {
				return;//Item used on itself
			}
			if (_events.hasEvent(EventType.OPHELDU, objId)) {
				var args = {
					"event": EventType.OPHELDU,
					"trigger": objId,
					"player": player,
					"useObjId": useObjId,
					"useslot": useslot,
					"objId": objId,
					"slot": slot
				};
				_events.invokeEvent(EventType.OPHELDU, objId, args);
			} else {
				var message = "Nothing interesting happens.";
				if (isAdmin(player)) {
					message = `Unhandled item use: objId=${objId}, slot=${slot}, useObjId=${useObjId}, useslot=${useslot}`;
				}
				sendMessage(player, message);
			}
			return;
		default:
			defaultHandler(ctx);
			return;
	}
});

_events.bindEventListener(EventType.OPLOCT, _component(1473, 34), (ctx) => {
	const player = ctx.player;
	const useslot = ctx.slot;
	const useObjId = _inv.getObject(player, Inv.BACKPACK, useslot);
	if (useObjId !== ctx.objId) {
		//Client backpack is out of sync; re-synchronise it
		_inv.resendSlot(player, Inv.BACKPACK, useslot);
		return;
	}

	const locTypeId = getId(ctx.targetLoc);
	if (_events.hasEvent(EventType.OPLOCU, locTypeId)) {
		var args = {
			"event": EventType.OPHELDU,
			"trigger": locTypeId,
			"player": player,
			"useObjId": useObjId,
			"useslot": useslot,
			"location": ctx.targetLoc,
			"locTypeId": locTypeId,
			"coords": ctx.targetCoords
		};
		_events.invokeEvent(EventType.OPLOCU, locTypeId, args);
	} else {
		var message = "Nothing interesting happens.";
		if (isAdmin(player)) {
			message = `Unhandled location use: location=${ctx.targetLoc}, useObjId=${useObjId}, useslot=${useslot}`;
		}
		sendMessage(player, message);
	}
});

_events.bindEventListener(EventType.OPNPCT, _component(1473, 34), (ctx) => {
	var player = ctx.player;
	var useslot = ctx.slot;
	const useObjId = _inv.getObject(player, Inv.BACKPACK, useslot);
	if (useObjId !== ctx.objId) {
		//Client backpack is out of sync; re-synchronise it
		_inv.resendSlot(player, Inv.BACKPACK, useslot);
		return;
	}

	var npcTypeId = getId(ctx.npc);
	if (_events.hasEvent(EventType.OPNPCU, npcTypeId)) {
		var args = {
			"event": EventType.OPHELDU,
			"trigger": npcTypeId,
			"player": player,
			"useObjId": useObjId,
			"useslot": useslot,
			"npc": ctx.npc
		};
		_events.invokeEvent(EventType.OPNPCU, npcTypeId, args);
	} else {
		var message = "Nothing interesting happens.";
		if (isAdmin(player)) {
			message = `Unhandled NPC use: npc=${ctx.npc}, useObjId=${useObjId}, useslot=${useslot}`;
		}
		sendMessage(player, message);
	}
});

_events.bindEventListener(EventType.OPPLAYERT, _component(1473, 34), (ctx) => {
	var player = ctx.player;
	var useslot = ctx.slot;
	const useObjId = _inv.getObject(player, Inv.BACKPACK, useslot);
	if (useObjId !== ctx.objId) {
		//Client backpack is out of sync; re-synchronise it
		_inv.resendSlot(player, Inv.BACKPACK, useslot);
		return;
	}

	var targetPlayer = ctx.target;
	if (_events.hasEvent(EventType.OPPLAYERU, useObjId)) {
		var args = {
			"event": EventType.OPHELDU,
			"trigger": useObjId,
			"player": player,
			"useObjId": useObjId,
			"useslot": useslot,
			"target": targetPlayer
		};
		_events.invokeEvent(EventType.OPPLAYERU, useObjId, args);
	} else {
		var message = "Nothing interesting happens.";
		if (isAdmin(player)) {
			message = `Unhandled player use: player=${targetPlayer}, useitem=${useObjId}, useslot=${useslot}`;
		}
		sendMessage(player, message);
	}
});

function handleItemInteraction(player: Player, objId: number, objCount: number, ctx: EventContext) {
	var opString, eventType;
	switch (ctx.button) {
		case 1://Iop1
			eventType = EventType.OPHELD1;
			opString = _config.objIop(objId, 1);
			break;
		case 2://Iop2
			eventType = EventType.OPHELD2;
			opString = _config.objIop(objId, 2);
			break;
		case 3://Iop3
			eventType = EventType.OPHELD3;
			opString = _config.objIop(objId, 3);
			break;
		case 7://Iop4
			eventType = EventType.OPHELD4;
			opString = _config.objIop(objId, 4);
			break;
		case 8://Iop5
			eventType = EventType.OPHELD5;
			opString = _config.objIop(objId, 5);
			break;
		case 10://Examine
			sendDebugMessage(player, `Object: ${objId}, count: ${objCount}`);
			sendMessage(player, _config.objDesc(objId));
			if (ENGINE.getExchangeCost(objId) > -1) {
				sendMessage(player, "GE guide price: " + toFormattedString(ENGINE.getExchangeCost(objId)) + " gp each");
			}
			return;

		default:
			defaultHandler(ctx, "backpack");
			return;
	}
	if (_events.hasEvent(eventType, objId)) {
		const args = {
			"event": eventType,
			"trigger": objId,
			"player": player,
			"objId": objId,
			"objCount": objCount,
			"slot": ctx.slot
		};
		_events.invokeEvent(eventType, objId, args);
	} else if (eventType === EventType.OPHELD2 && (opString === "Wear" || opString === "Wield") &&
		_config.objWearpos(objId) !== -1) {
		equipItem(player, objId, ctx.slot);
	} else if (eventType == EventType.OPHELD5 &&
		(opString == "Drop" || opString == "Destroy" || opString == "Discard")) {
		if (opString == "Drop") {
			dropItem(player, objId, objCount, ctx.slot);
		} else if ("Destroy" == opString) {
			destroyItem(player, objId, ctx.slot);
		} else if ("Discard" == opString) {
			discardItem(player, ctx.slot);
		}
	} else {
		sendDebugMessage(player, `Unhanded inventory item option: objId=${objId}, slot=${ctx.slot}, option=${opString} (${ctx.button})`);
	}
}

function dropItem(player: Player, objId: number, count: number, slot: number) {
	//The item you are about to drop has high value.
	//I wish to drop it.
	//I wish to keep it.
	if (objId !== -1) {
		dropObject(objId, _entity.getCoords(player), player, count);
		_inv.clearSlot(player, Inv.BACKPACK, slot);
	}
}

function destroyItem(player: Player, objId: number, slot: number) {
	//if (inv.total(player, objId) > 1 && inv.getCount(player, Inv.BACKPACK, slot)== 1) {
	//	widget.hide(player, 1183, 8, false);
	//}
	//widget.setText(player, 1183, 4, config.objName(objId));
	//widget.setText(player, 1183, 9, "destroy info here");
	//widget.setObject(player, 1183, 10, objId, count);
	//widget.setText(player, 1183, 12, "Are you sure you want to destroy this object?");
	//widget.openOverlaySub(player, 1006, 1183, false);
	//todo get buttons to work
	sendDebugMessage(player, "Destroyed item: " + objId);
	_inv.clearSlot(player, Inv.BACKPACK, slot);
}

async function discardItem(player: Player, slot: number) {
	var timeRemaining = varp(player, 430) as number;
	var loanFrom = varp(player, 428);
	var message;
	if (timeRemaining > 0) {
		message = "<center>~Loan expires in " + toFormattedTime(timeRemaining) + "~</center><br>";
		message += "If you discard this item, it will disappear. You won't be able to pick it up again.";
		await mesbox(player, message);
		await confirmDialog(player, "Discard the item?");
	} else if (loanFrom !== null && loanFrom !== -1) {
		message = "<center>~Session-based loan~</center><br>";
		message += "If you discard this item, it will return to its owner, " + _entity.getName(loanFrom);
		message += ". You won't be able to pick it up again.";
		await mesbox(player, message);
		await confirmDialog(player, "Discard the item?");
	}
	//Destroy immediately, as the player should not still have the item.
	_inv.clearSlot(player, Inv.BACKPACK, slot);
	returnBorrowedItem(player);
}
