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
 */
import { Player, EventContext } from 'engine/models';
import _config from 'engine/config';
import _entity from 'engine/entity';
import _inv from 'engine/inv';
import { varp, setVarp } from 'engine/var';
import { Inv } from 'engine/enums';

import { giveItem } from 'shared/inv';
import { sendMessage } from 'shared/chat';
import { textGender, delayFunction } from 'shared/util';
import { CYCLES_PER_MIN } from 'shared/const';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 22/01/2015
 */
export function isBorrowing (player: Player) {
	if (varp(player, 430) > 0) {
		return false;
	} else if (varp(player, 428) !== -1) {
		return false;
	} else {
		return true;
	}
}

export function lendItem (
	fromPlayer: Player,
	toPlayer: Player,
	objId: number,
	duration: number
) {
	giveItem(fromPlayer, objId, 1, Inv.LOAN_RETURN);

	var lentId = _config.objLent(objId);
	giveItem(toPlayer, lentId, 1);

	if (duration === 0) {
		setVarp(toPlayer, 428, fromPlayer);//Loan from
		setVarp(fromPlayer, 429, toPlayer);//Loan to
	} else {
		duration *= 60;//Convert from hours to minutes
		setVarp(toPlayer, 430, duration);//Loan from duration
		setVarp(fromPlayer, 431, duration);//Loan to duration

		checkLoanedItem(fromPlayer);
		checkLentItem(toPlayer);
	}
	sendMessage(toPlayer, "The borrowed item will be returned to the owner's Returned Items box, "+
			"immediately, if either you or "+textGender(toPlayer, "he", "she")+" logs out.");
	sendMessage(fromPlayer, "Your item has been lent to "+_entity.getName(toPlayer)+". "+
			"It will be sent to your Returned Items box if either you or "+_entity.getName(toPlayer)+" logs out.");
	sendMessage(fromPlayer, "Speak to a banker to view your returned item box.");
}

export function processLogin (ctx: EventContext) {
	var player = ctx.player;
	var minutesPassed = Math.floor(ctx.tickDifference / CYCLES_PER_MIN);

	//Checks the item currently being loaned
	if (varp(player, 430)) {
		const timeRemaining = (varp(player, 430) as number)-minutesPassed;
		if (timeRemaining < 0) {
			setVarp(player, 430, 0);
			if (destroyBorrowedItems(player)) {
				sendMessage(player, "The item you were borrowing has been returned.");
			}
		} else {
			setVarp(player, 430, timeRemaining);
			checkLoanedItem(player);
		}
	}

	//Checks the item currently loaned out
	if (varp(player, 431)) {
		const timeRemaining = (varp(player, 431) as number)-minutesPassed;
		if (timeRemaining < 0) {
			setVarp(player, 431, 0);
			sendMessage(player, "Your item has been returned.");
		} else {
			setVarp(player, 431, timeRemaining);
			checkLentItem(player);
		}
	}
}

export function processLogout (ctx: EventContext) {
	var player = ctx.player;
	var lentFrom = varp(player, 428) as Player;
	if (lentFrom) {
		sendMessage(lentFrom, _entity.getName(player)+" has returned the item "+textGender(player, "he", "she")+" borrowed from you.");
		sendMessage(lentFrom, "You may retrieve it from your Returned Items box by speaking to a banker.");

		destroyBorrowedItems(player);
		setVarp(player, 428, null);
		setVarp(lentFrom, 429, null);
	}
	var loanTo = varp(player, 429) as Player;
	if (loanTo) {
		sendMessage(loanTo, "Your item has been returned.");
		destroyBorrowedItems(loanTo);
		setVarp(player, 429, null);
		setVarp(loanTo, 428, null);
	}
}

function checkLoanedItem (player: Player) {
	delayFunction(player, CYCLES_PER_MIN, () => {
		if (varp(player, 430) > 0) {
			const timeRemaining = (varp(player, 430) as number)-1;
			setVarp(player, 430, timeRemaining);
			if (varp(player, 430) === 0) {
				destroyBorrowedItems(player);
				sendMessage(player, "The item you were borrowing has been returned.");
			} else {
				checkLoanedItem(player);
			}
		}
	}, false);
}

function checkLentItem (player: Player) {
	delayFunction(player, CYCLES_PER_MIN, () => {
		if (varp(player, 431) > 0) {
			const timeRemaining = (varp(player, 431) as number)-1;
			setVarp(player, 431, timeRemaining);
			if (varp(player, 431) === 0) {
				sendMessage(player, "Your item has been returned.");
			} else {
				checkLentItem(player);
			}
		}
	}, false);
}

export function returnBorrowedItem (player: Player) {
	var lentFrom = varp(player, 428) as Player;
	if (lentFrom) {
		setVarp(lentFrom, 429, null);
		sendMessage(lentFrom, _entity.getName(player)+" has returned the item "+textGender(player, "he", "she")+" borrowed from you.");
		sendMessage(lentFrom, "You may retrieve it from your Returned Items box by speaking to a banker.");
	}
	setVarp(player, 428, null);
	setVarp(player, 430, 0);
}

function destroyBorrowedItems (player: Player) {
	var slot, objId;
	for (slot=0; slot<_inv.size(Inv.EQUIPMENT); slot++) {
		objId = _inv.getObject(player, Inv.EQUIPMENT, slot);
		if (objId !== -1 && _config.objUnlent(objId) !== objId) {
			_inv.clearSlot(player, Inv.EQUIPMENT, slot);
			return true;
		}
	}
	for (slot=0; slot<_inv.size(Inv.BACKPACK); slot++) {
		objId = _inv.getObject(player, Inv.BACKPACK, slot);
		if (objId !== -1 && _config.objUnlent(objId) !== objId) {
			_inv.clearSlot(player, Inv.BACKPACK, slot);
			return true;
		}
	}
	for (slot=0; slot<_inv.size(Inv.BANK); slot++) {
		objId = _inv.getObject(player, Inv.BANK, slot);
		if (objId === -1) {
			break;
		}
		if (_config.objUnlent(objId) !== objId) {
			_inv.clearSlot(player, Inv.BANK, slot);
			return true;
		}
	}
	return false;
}
