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
import { Inv } from 'engine/enums/inventory';
import { Player } from 'engine/models';
import { COINS_OBJ } from 'shared/const';
import { runClientScript, toFormattedString, checkOverflow } from 'shared/util';
import { sendSpamMessage, sendMessage } from 'shared/chat';
import { requestCount } from 'shared/dialog';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 27/03/2016
 */
export function removeCoins(player: Player, amount: number) {
	if (amount > 0) {
		ENGINE.delItem(player, Inv.MONEY_POUCH, COINS_OBJ, amount);
		sendSpamMessage(player, toFormattedString(amount) + " coins have been removed from your money pouch.");
		runClientScript(player, 5561, [0, amount]);
		updateCoins(player);
	}
}

export function addCoins(player: Player, amount: number) {
	if (amount > 0) {
		ENGINE.addItem(player, Inv.MONEY_POUCH, COINS_OBJ, amount);
		sendSpamMessage(player, toFormattedString(amount) + " coins have been added to your money pouch.");
		runClientScript(player, 5561, [1, amount]);
		updateCoins(player);
	}
}

export function updateCoins(player: Player) {
	//sendMessage(player, "Updating coins... ("+getCoinCount(player)+" total)");
	runClientScript(player, 5560, [getCoinCount(player)]);
}

export function getCoinCount(player: Player): number {
	return ENGINE.itemTotal(player, Inv.MONEY_POUCH, COINS_OBJ);
}

export function examineMoneyPouch(player: Player) {
	var count = ENGINE.itemTotal(player, Inv.MONEY_POUCH, COINS_OBJ);
	sendMessage(player, "Your money pouch contains " + toFormattedString(count) + " coins.");
}

export function requestWithdrawCoins(player: Player) {
	if (ENGINE.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
		sendMessage(player, "You don't have space in your inventory to do that.");
		return;
	}
	var message = "Your money pouch contains " + toFormattedString(getCoinCount(player)) + " coins.";
	message += "<br>How many would you like to withdraw?";

	requestCount(player, message).then((value: number) => {
		var amount = Math.min(value, getCoinCount(player));
		if (amount < 1) {
			return;
		}
		if (ENGINE.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
			sendMessage(player, "You don't have space in your inventory to do that.");
			return;
		}
		var heldCoins = ENGINE.itemTotal(player, Inv.BACKPACK, COINS_OBJ);
		if (checkOverflow(heldCoins, amount)) {
			sendMessage(player, "You don't have space in your inventory to do that.");
			return;
		}
		removeCoins(player, amount);
		ENGINE.addItem(player, Inv.BACKPACK, COINS_OBJ, amount);
	});
}
