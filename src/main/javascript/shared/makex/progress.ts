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
import { Player } from "engine/models";
import _config from "engine/config";
import { setVarp, setVarc, varp } from "engine/var";

import { closeOverlaySub, openOverlaySub } from "shared/widget";
import { sendDebugMessage, sendSpamMessage } from "shared/chat";
import { runAnim } from "shared/anim";
import { delayFunction } from "shared/util";
import { giveItem, takeItem, invTotal } from "shared/inv";
import { takeResources } from "shared/makex/resources";
import { giveXp } from "shared/stat";

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 27/03/2016
 */

export function openInterface(
	player: Player,
	productId: number,
	category: number,
	amount: number,
	delayPerItem: number
) {
	closeOverlaySub(player, 1018, false);
	setVarp(player, 1175, productId);
	setVarp(player, 1169, category);//enum 6816 maps categories -> names
	setVarc(player, 2227, delayPerItem);//Time per item
	setVarc(player, 2228, amount);//Total products
	setVarc(player, 2229, amount);//Remaining products

	setVarp(player, 1176, 0);//Xp received
	setVarp(player, 1177, 0);//Secondary skill xp received
	openOverlaySub(player, 1018, 1251, false);
}

export function startCrafting(
	player: Player,
	amount: number,
	animation: number = -1,
	successText?: string
) {
	var productId = varp(player, 1175) as number;
	//api.setVarp(player, 1169, category);
	openOverlaySub(player, 1018, 1251, false);
	var length = animation == -1 ? 1 : Math.ceil(_config.seqLength(animation) / 30);//Round up
	sendDebugMessage(player, "Total time: " + length);
	setVarc(player, 2227, length);//Time per item
	setVarc(player, 2228, amount);//Total products
	setVarc(player, 2229, amount);//Remaining products

	setVarp(player, 1176, 0);//Xp received
	setVarp(player, 1177, 0);//Secondary skill xp received
	var delay = length - 1;
	if (animation !== -1) {
		runAnim(player, animation);
	}
	//TODO: Replace this with delays
	var CraftAction = Java.extend(Java.type("org.virtue.game.entity.player.event.PlayerActionHandler"), {
		process: (_: Player) => {
			if (delay <= 0) {
				if (amount <= 0) {
					return true;
				}
				amount--;
				setVarc(player, 2229, amount);
				makeItem(player, productId);
				if (successText) {
					sendSpamMessage(player, successText);
				}

				if (amount >= 1 && animation != -1) {
					runAnim(player, animation);
				}
				delay = length;
			}
			delay--;
			return false;
		},

		stop: (_: Player) => {
			ENGINE.stopAnimation(player);//Clear animation
			closeOverlaySub(player, 1018, true);//Close interface
		}
	});
	player.setAction(new CraftAction());

	/*var procItem = function () {
		amount--;
		api.setVarc(player, 2229, amount);
		that.makeItem(player, productId);
		if (successText !== undefined) {
			api.sendMessage(player, successText, MesType.GAME_SPAM)
		}
		if (amount > 0) {
			runAnimation(player, animation, procItem);
		} else {
			api.stopAnimation(player);
		}
	}
	runAnimation(player, animation, procItem);*/
}

export function setRemaining(player: Player, remaining: number) {
	setVarc(player, 2229, remaining);
	if (remaining === 0) {
		var closeInterface = () => {
			closeOverlaySub(player, 1018, true);
		};
		delayFunction(player, 5, closeInterface, true, closeInterface);
	}
}

export function makeItem(player: Player, productId: number, productCount: number = 1) {
	var amountPerBatch = _config.objParam(productId, 2653) as number * productCount;
	processItemXp(player, productId, amountPerBatch);
	removeMaterials(player, productId, productCount);
	addProduct(player, productId, amountPerBatch);
}

function processItemXp(player: Player, productId: number, amountPerBatch: number) {
	var statId = _config.enumValue(681, _config.objParam(productId, 2696) as number) as number;
	var xp;
	if (statId != -1) {//Primary xp gained
		xp = _config.objParam(productId, 2697) as number * amountPerBatch;
		giveXp(player, statId, xp / 10);
		ENGINE.incrementVarp(player, 1176, xp);//Increment xp received value in the crafting process interface
	}
	statId = _config.enumValue(681, _config.objParam(productId, 2698) as number) as number;
	if (statId != -1) {//Secondary xp gained
		xp = _config.objParam(productId, 2699) as number * amountPerBatch;
		giveXp(player, statId, xp / 10);
		ENGINE.incrementVarp(player, 1177, xp);
	}
}

function addProduct(player: Player, productId: number, amount: number) {
	switch (productId) {
		case 34672://Arrow shafts
		case 34673:
		case 34674:
		case 34675:
		case 34676:
		case 34677:
			giveItem(player, 52, amount);
			return;
		default:
			giveItem(player, productId, amount);
	}
}

export function removeMaterials(player: Player, productId: number, productCount: number) {
	//See clientscript 7108
	var resourceId = _config.objParam(productId, 2655) as number;
	var matCountReq = _config.objParam(productId, 2665) as number;
	//var v11 = configApi.objParam(productId, 4134);
	var separateAmount = _config.objParam(productId, 2686) === 1;
	var structId = _config.objParam(productId, 2675) as number;
	var inventionMaterialId = _config.objParam(productId, 5456) as number;
	var loop = 1;
	var amountPerBatch = _config.objParam(productId, 2653) as number;
	while (resourceId != -1 || structId != -1) {
		if (structId != -1) {
			removeStructMaterials(player, structId, amountPerBatch * productCount);
		} else {
			if (matCountReq !== 0) {
				var amount = separateAmount ? matCountReq : matCountReq * amountPerBatch;
				takeResources(player, resourceId, amount * productCount, inventionMaterialId);
			}
		}
		loop++;
		switch (loop) {
			case 2:
				resourceId = _config.objParam(productId, 2656) as number;
				matCountReq = _config.objParam(productId, 2666) as number;
				//v11 = configApi.objParam(productId, 4135);
				separateAmount = _config.objParam(productId, 2687) === 1;
				structId = _config.objParam(productId, 2676) as number;
				inventionMaterialId = _config.objParam(productId, 5457) as number;
				break;
			case 3:
				resourceId = _config.objParam(productId, 2657) as number;
				matCountReq = _config.objParam(productId, 2667) as number;
				//v11 = configApi.objParam(productId, 4136);
				separateAmount = _config.objParam(productId, 2688) === 1;
				structId = _config.objParam(productId, 2677) as number;
				inventionMaterialId = _config.objParam(productId, 5458) as number;
				break;
			case 4:
				resourceId = _config.objParam(productId, 2658) as number;
				matCountReq = _config.objParam(productId, 2668) as number;
				//v11 = configApi.objParam(productId, 4137);
				separateAmount = _config.objParam(productId, 2689) === 1;
				structId = _config.objParam(productId, 2678) as number;
				inventionMaterialId = _config.objParam(productId, 5459) as number;
				break;
			case 5:
				resourceId = _config.objParam(productId, 2659) as number;
				matCountReq = _config.objParam(productId, 2669) as number;
				//v11 = configApi.objParam(productId, 4138);
				separateAmount = _config.objParam(productId, 2690) === 1;
				structId = _config.objParam(productId, 2679) as number;
				inventionMaterialId = _config.objParam(productId, 5460) as number;
				break;
			case 6:
				resourceId = _config.objParam(productId, 2660) as number;
				matCountReq = _config.objParam(productId, 2670) as number;
				//v11 = configApi.objParam(productId, 4139);
				separateAmount = _config.objParam(productId, 2691) === 1;
				structId = _config.objParam(productId, 2680) as number;
				inventionMaterialId = _config.objParam(productId, 5461) as number;
				break;
			case 7:
				resourceId = _config.objParam(productId, 2661) as number;
				matCountReq = _config.objParam(productId, 2671) as number;
				//v11 = configApi.objParam(productId, 4140);
				separateAmount = _config.objParam(productId, 2692) === 1;
				structId = _config.objParam(productId, 2681) as number;
				inventionMaterialId = _config.objParam(productId, 5462) as number;
				break;
			case 8:
				resourceId = _config.objParam(productId, 2662) as number;
				matCountReq = _config.objParam(productId, 2672) as number;
				//v11 = configApi.objParam(productId, 4141);
				separateAmount = _config.objParam(productId, 2693) === 1;
				structId = _config.objParam(productId, 2682) as number;
				inventionMaterialId = _config.objParam(productId, 5463) as number;
				break;
			case 9:
				resourceId = _config.objParam(productId, 2663) as number;
				matCountReq = _config.objParam(productId, 2673) as number;
				//v11 = configApi.objParam(productId, 4142);
				separateAmount = _config.objParam(productId, 2694) === 1;
				structId = _config.objParam(productId, 2683) as number;
				inventionMaterialId = _config.objParam(productId, 5464) as number;
				break;
			case 10:
				resourceId = _config.objParam(productId, 2664) as number;
				matCountReq = _config.objParam(productId, 2674) as number;
				//v11 = configApi.objParam(productId, 4143);
				separateAmount = _config.objParam(productId, 2695) === 1;
				structId = _config.objParam(productId, 2684) as number;
				inventionMaterialId = _config.objParam(productId, 5465) as number;
				break;
			default:
				resourceId = -1;
				structId = -1;
		}
	}
}

function removeStructMaterials(player: Player, structId: number, amount: number) {
	var id = _config.structParam(structId, 2655) as number;
	var matCountReq = _config.structParam(structId, 2665) as number;
	var separateAmount = _config.structParam(structId, 2686) === 1;
	var loop = 1;
	while (id != -1) {
		var has = invTotal(player, id);
		if (matCountReq <= has) {//The player has enough of the material for at least one item
			if (separateAmount) {
				takeItem(player, id, matCountReq);
				amount = 0;
			} else {
				has /= matCountReq;//Break down availability to per-item
				var toRemove = Math.min(has, amount);//Figure out how many items we *can* make with this material
				takeItem(player, id, matCountReq * toRemove);
				amount -= toRemove;//Decrease the remaining number of items
			}
		}
		if (amount <= 0) {
			return;
		}

		loop++;
		switch (loop) {
			case 2:
				id = _config.structParam(structId, 2656) as number;
				matCountReq = _config.structParam(structId, 2666) as number;
				separateAmount = _config.structParam(structId, 2687) === 1;
				break;
			case 3:
				id = _config.structParam(structId, 2657) as number;
				matCountReq = _config.structParam(structId, 2667) as number;
				separateAmount = _config.structParam(structId, 2688) === 1;
				break;
			case 4:
				id = _config.structParam(structId, 2658) as number;
				matCountReq = _config.structParam(structId, 2668) as number;
				separateAmount = _config.structParam(structId, 2689) === 1;
				break;
			case 5:
				id = _config.structParam(structId, 2659) as number;
				matCountReq = _config.structParam(structId, 2669) as number;
				separateAmount = _config.structParam(structId, 2690) === 1;
				break;
			case 6:
				id = _config.structParam(structId, 2660) as number;
				matCountReq = _config.structParam(structId, 2670) as number;
				separateAmount = _config.structParam(structId, 2691) === 1;
				break;
			case 7:
				id = _config.structParam(structId, 2661) as number;
				matCountReq = _config.structParam(structId, 2671) as number;
				separateAmount = _config.structParam(structId, 2692) === 1;
				break;
			case 8:
				id = _config.structParam(structId, 2662) as number;
				matCountReq = _config.structParam(structId, 2672) as number;
				separateAmount = _config.structParam(structId, 2693) === 1;
				break;
			case 9:
				id = _config.structParam(structId, 2663) as number;
				matCountReq = _config.structParam(structId, 2673) as number;
				separateAmount = _config.structParam(structId, 2694) === 1;
				break;
			case 10:
				id = _config.structParam(structId, 2664) as number;
				matCountReq = _config.structParam(structId, 2674) as number;
				separateAmount = _config.structParam(structId, 2695) === 1;
				break;
			default:
				id = -1;
		}
	}
}
