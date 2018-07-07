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
import { Player } from 'engine/models';
import { EventType, Inv } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import { varbit, setVarp, setVarc, setVarBit, varp } from 'engine/var';

import _component from 'shared/widget/component';
import { closeOverlaySub, setWidgetEvents, hideWidget, openWidget } from 'shared/widget';
import { defaultHandler, runClientScript, testBit } from 'shared/util';
import { sendDebugMessage } from 'shared/chat';
import { INTEGER_MAX } from 'shared/const';
import { getResourceCount } from 'shared/makex/resources';
import { hasItem, hasTool } from 'shared/inv';
import { getBaseLevel, getStatLevel } from 'shared/stat';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
_events.bindEventListener(EventType.IF_BUTTON, 1251, (ctx) => {
	switch (ctx.component) {
		case 2://Close
		case 53://Done
			closeOverlaySub(ctx.player, 1018);
			return;
		case 47://Cancel
			ENGINE.stop(ctx.player);
			return;
		default:
			defaultHandler(ctx, "craft progress");
			return;
	}
});

_events.bindEventListener(EventType.IF_CLOSE, 1251, (ctx) => {
	setVarp(ctx.player, 1175, -1);//Clear product
	setVarp(ctx.player, 1176, 0);//Clear experience gained counter
	setVarp(ctx.player, 1177, 0);
	runClientScript(ctx.player, 3373, [1018]);
	setVarc(ctx.player, 2227, 0);//Clear time
	setVarc(ctx.player, 2228, 0);//Clear total
	setVarc(ctx.player, 2229, 0);//Clear remaining
});

_events.bindEventListener(EventType.IF_OPEN, 1370, (ctx) => {
	openDialog(ctx.player);
});

_events.bindEventListener(EventType.IF_DRAG, _component(1371, 36), (ctx) => {
	if (ctx.toslot < varbit(ctx.player, 1002) && ctx.toslot >= 0) {
		setVarBit(ctx.player, 1003, ctx.toslot + 1);
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1371, (ctx) => {
	var player = ctx.player;
	switch (ctx.component) {
		case 62://Select product category
			var mainCategory = varp(player, 1168) as number;
			if (mainCategory < 0) {
				sendDebugMessage(player, "No main category selected!");
				return;
			}
			if (ctx.slot >= 0 && ctx.slot < _config.enumSize(mainCategory)) {
				var newCategory = _config.enumValue(mainCategory, ctx.slot) as number;
				setVarp(player, 1169, newCategory);
				var slotCount = _config.enumSize(newCategory) * 4;
				setWidgetEvents(player, 1371, 44, 0, slotCount, 2);
				setSelectedProduct(player, 0);
			}
			return;
		case 44://Select product
			setSelectedProduct(player, ctx.slot);
			return;
		case 29://Increase count
			if (varbit(player, 1003) < varbit(player, 1002)) {
				setVarBit(player, 1003, varbit(player, 1003) + 1);
			}
			return;
		case 31://Decrease count
			if (varbit(player, 1003) > 0) {
				setVarBit(player, 1003, varbit(player, 1003) - 1);
			}
			return;
		case 143://Click count
			if (ctx.slot < varbit(player, 1002) && ctx.slot >= 0) {
				setVarBit(player, 1003, ctx.slot + 1);
			}
			return;
		default:
			defaultHandler(ctx, "make-x dialog");
			return;
	}
});

function openDialog(player: Player) {
	runClientScript(player, 6946, []);
	hideWidget(player, 1371, 20, false);

	setVarc(player, 2225, 0);
	setVarc(player, 2689, 0);
	setVarc(player, 2690, 0);

	var categoryId = varp(player, 1169) as number;
	var selectedObjId = varp(player, 1170) as number;

	if (!_config.enumHasValue(categoryId, selectedObjId)) {
		selectedObjId = -1;//Only select items actually in the category
	}

	if (selectedObjId == -1) {//Auto-select item
		for (var slot = 0; slot < _config.enumSize(categoryId); slot++) {
			const productId = _config.enumValue(categoryId, slot) as number;
			if (getMaxAmount(player, productId) > 1) {
				setVarp(player, 1170, productId);
				selectedObjId = productId;
				break;
			}
		}
	}
	if (selectedObjId == -1) {
		selectedObjId = _config.enumValue(categoryId, 0) as number;
		setVarp(player, 1170, selectedObjId);
	}
	var invCount = canCraft(player, selectedObjId) ? getMaxAmount(player, selectedObjId) : 0;//The maximum amount of the item the player can produce
	setVarBit(player, 1002, invCount);//Product select max amount
	setVarBit(player, 1003, invCount);//The amount currently selected

	//Information about the selected item
	setVarc(player, 2391, _config.objDesc(selectedObjId));//Description
	setVarc(player, 2223, 1);
	setVarc(player, 2224, ENGINE.getExchangeCost(selectedObjId));//Exchange guide price

	openWidget(player, 1370, 62, 1371, true);//The inner interface

	setWidgetEvents(player, 1371, 62, 0, 12, 2);//Allows an option to be selected in the category drop-down menu
	setWidgetEvents(player, 1371, 36, 0, invCount, 2359296);//Activates the amount selection dragger
	setWidgetEvents(player, 1371, 143, 0, invCount, 2);//Clicks on the amount selection dragger
	var slotCount = _config.enumSize(categoryId) * 4;
	setWidgetEvents(player, 1371, 44, 0, slotCount, 2);//Allows the items to be clicked
}

/**
 * Sets the selected product and updates the information for it
 * @param player The player
 * @param slot The selected slot ID
 * @return True if the product was selected successfully, false if an error occured
 */
function setSelectedProduct(player: Player, slot: number) {
	slot = slot / 4;
	var subCategory = varp(player, 1169) as number;
	if (subCategory < 0) {
		return false;
	}
	if (slot >= 0 && slot < _config.enumValue(subCategory, slot)) {
		var objId = _config.enumValue(subCategory, slot) as number;
		setVarp(player, 1170, objId);
		setVarp(player, 1174, 0);
		var heldCount = canCraft(player, objId) ? getMaxAmount(player, objId) : 0;
		setVarBit(player, 1002, heldCount);//The maximum amount of the item the player can produce
		setVarBit(player, 1003, heldCount);//The selected amount of the product to produce
		setWidgetEvents(player, 1371, 36, 0, heldCount, 2359296);//Activates the count selection dragger
		setWidgetEvents(player, 1371, 143, 0, heldCount, 2);//Clicks on the count selection dragger

		setVarc(player, 2391, _config.objDesc(objId));//Examine text
		setVarc(player, 2223, 1);//
		setVarc(player, 2224, ENGINE.getExchangeCost(objId));//Exchange guide price

		return true;
	} else {
		return false;
	}
}

/**
 * Returns whether the player has the requirements to craft the product of the specified ID
 * @param productId The itemType ID of the product to check
 * @return True if the player meets all the requirements, false otherwise
 */
function canCraft(player: Player, productId: number): boolean {
	//See clientscript 7105
	if (!checkTools(player, productId)) {
		return false;
	}

	var key = _config.objParam(productId, 2640) as number;
	var value = _config.objParam(productId, 2645) as number;
	var reqId = 1;
	while (key > 0) {
		if (!checkRequirement(
			player,
			key,
			value,
			_config.objParam(productId, 317) as number,
			_config.objParam(productId, 3649) === 1,
			reqId
		)) {
			return false;
		}
		reqId++;
		switch (reqId) {
			case 2:
				key = _config.objParam(productId, 2641) as number;
				value = _config.objParam(productId, 2646) as number;
				break;
			case 3:
				key = _config.objParam(productId, 2642) as number;
				value = _config.objParam(productId, 2647) as number;
				break;
			case 4:
				key = _config.objParam(productId, 2643) as number;
				value = _config.objParam(productId, 2648) as number;
				break;
			case 5:
				key = _config.objParam(productId, 2644) as number;
				value = _config.objParam(productId, 2649) as number;
				break;
			default:
				key = 0;
		}
	}
	return true;
}

function checkRequirement(
	player: Player,
	key: number,
	value: number,
	unk1: number,
	boostable: boolean,
	reqId: number
) {
	//See clientscript 7106
	if (key > 0 && key < 61) {//Stat
		if (boostable) {
			if (getStatLevel(player, _config.enumValue(681, key) as number) >= value) {
				// || reqID == 0 && script_7107(unk1) >= value
				return true;
			}
		} else if (getBaseLevel(player, _config.enumValue(681, key) as number) >= value) {
			return true;
		}
		return false;
	}
	switch (key) {
		case 61://Quest
			var questId = _config.enumValue(812, value) as number;
			return _config.questFinished(player, questId);
		case 62:
			sendDebugMessage(player, "Unsupported misc requirement: " + value);
			return false;
		//return script_7163(value);//TODO: Implement misc requirements
		case 63:
			return hasUnlockedInvention(player, value);
	}
	return true;
}

function hasUnlockedInvention(player: Player, id: number): boolean {
	if (id < 0) {
		return true;
	}
	switch (Math.floor(id / 32)) {
		case 0:
			return testBit(varp(player, 5981) as number, id % 32);
		case 1:
			return testBit(varp(player, 5982) as number, id % 32);
		case 2:
			return testBit(varp(player, 5983) as number, id % 32);
	}
	return false;
}

function checkTools(player: Player, productId: number): boolean {
	//See clientscript 7113
	var toolId = _config.objParam(productId, 2650) as number;
	var structId = _config.objParam(productId, 2990) as number;
	var param = 1;
	while (toolId != -1 || structId != -1) {
		if (structId != -1) {
			if (getStructMaxAmount(player, structId, 1) === 0) {
				return false;
			}
		} else {
			if (!checkDialogHasTool(player, toolId)) {
				return false;
			}
		}
		param++;
		switch (param) {
			case 2:
				toolId = _config.objParam(productId, 2651) as number;
				structId = _config.objParam(productId, 2991) as number;
				break;
			case 3:
				toolId = _config.objParam(productId, 2652) as number;
				structId = _config.objParam(productId, 2992) as number;
				break;
			default:
				toolId = -1;
				structId = -1;
				break;
		}
	}
	return true;
}

function checkDialogHasTool(player: Player, toolId: number): boolean {
	if (hasItem(player, toolId, 1, Inv.BACKPACK)) {
		return true;
	}
	if (hasItem(player, toolId, 1, Inv.EQUIPMENT)) {
		return true;
	}
	return hasTool(player, toolId);
}

/*function isTool (productId, itemId) {
	 var toolId = config.objParam(productId, 2655);
	 var structId = config.objParam(productId, 2675);
	 var param = 1;
	 while (toolId != -1 || structId != -1) {
		   if (structId != -1 && structContainsItem(structId, itemId)) {
			   return true;
		   } else if (toolId == itemId) {
			   return true;
		   }
		   param++;
		   switch (param) {
		   case 2:
			   toolId = config.objParam(productId, 2651);
			   structId = config.objParam(productId, 2991);
			   break;
		   case 3:
			   toolId = config.objParam(productId, 2652);
			   structId = config.objParam(productId, 2992);
			   break;
		   default:
			   toolId = -1;
			   structId = -1;
			   break;
		   }
	 }
	 return false;
}*/


function getMaxAmount(player: Player, productId: number): number {
	//See clientscript 7108
	var resourceId = _config.objParam(productId, 2655) as number;
	var matCountReq = _config.objParam(productId, 2665) as number;
	//int v11 = config.objParam(productId, 4134);
	var separateAmount = _config.objParam(productId, 2686) === 1;
	var structId = _config.objParam(productId, 2675) as number;
	var inventionMaterialId = _config.objParam(productId, 5456) as number;
	var maxAmount = INTEGER_MAX;
	var materialCount;
	var createPerCycle = _config.objParam(productId, 2653) as number;
	var maxMakeSets = _config.objParam(productId, 2995) as number;
	var param = 1;
	while ((resourceId != -1 || structId != -1) && maxAmount > 0) {
		if (structId != -1) {
			materialCount = getStructMaxAmount(player, structId, createPerCycle);
			if (materialCount < maxAmount) {
				maxAmount = materialCount;
			}
		} else {
			if (matCountReq !== 0) {
				materialCount = getResourceCount(player, resourceId, inventionMaterialId);
				if (materialCount != -1) {
					if (separateAmount) {
						maxAmount = Math.min(maxAmount, materialCount / matCountReq);
					} else {
						maxAmount = Math.min(maxAmount, (materialCount + ((matCountReq * createPerCycle) - 1)) / (matCountReq * createPerCycle));
					}
				}
			}
		}
		param++;
		switch (param) {
			case 2:
				resourceId = _config.objParam(productId, 2656) as number;
				matCountReq = _config.objParam(productId, 2666) as number;
				//v11 = config.objParam(productId, 4135);
				separateAmount = _config.objParam(productId, 2687) === 1;
				structId = _config.objParam(productId, 2676) as number;
				inventionMaterialId = _config.objParam(productId, 5457) as number;
				break;
			case 3:
				resourceId = _config.objParam(productId, 2657) as number;
				matCountReq = _config.objParam(productId, 2667) as number;
				//v11 = config.objParam(productId, 4136);
				separateAmount = _config.objParam(productId, 2688) === 1;
				structId = _config.objParam(productId, 2677) as number;
				inventionMaterialId = _config.objParam(productId, 5458) as number;
				break;
			case 4:
				resourceId = _config.objParam(productId, 2658) as number;
				matCountReq = _config.objParam(productId, 2668) as number;
				//v11 = config.objParam(productId, 4137);
				separateAmount = _config.objParam(productId, 2689) === 1;
				structId = _config.objParam(productId, 2678) as number;
				inventionMaterialId = _config.objParam(productId, 5459) as number;
				break;
			case 5:
				resourceId = _config.objParam(productId, 2659) as number;
				matCountReq = _config.objParam(productId, 2669) as number;
				//v11 = config.objParam(productId, 4138);
				separateAmount = _config.objParam(productId, 2690) === 1;
				structId = _config.objParam(productId, 2679) as number;
				inventionMaterialId = _config.objParam(productId, 5460) as number;
				break;
			case 6:
				resourceId = _config.objParam(productId, 2660) as number;
				matCountReq = _config.objParam(productId, 2670) as number;
				//v11 = config.objParam(productId, 4139);
				separateAmount = _config.objParam(productId, 2691) === 1;
				structId = _config.objParam(productId, 2680) as number;
				inventionMaterialId = _config.objParam(productId, 5461) as number;
				break;
			case 7:
				resourceId = _config.objParam(productId, 2661) as number;
				matCountReq = _config.objParam(productId, 2671) as number;
				//v11 = config.objParam(productId, 4140);
				separateAmount = _config.objParam(productId, 2692) === 1;
				structId = _config.objParam(productId, 2681) as number;
				inventionMaterialId = _config.objParam(productId, 5462) as number;
				break;
			case 8:
				resourceId = _config.objParam(productId, 2662) as number;
				matCountReq = _config.objParam(productId, 2672) as number;
				//v11 = config.objParam(productId, 4141);
				separateAmount = _config.objParam(productId, 2693) === 1;
				structId = _config.objParam(productId, 2682) as number;
				inventionMaterialId = _config.objParam(productId, 5463) as number;
				break;
			case 9:
				resourceId = _config.objParam(productId, 2663) as number;
				matCountReq = _config.objParam(productId, 2673) as number;
				//v11 = config.objParam(productId, 4142);
				separateAmount = _config.objParam(productId, 2694) === 1;
				structId = _config.objParam(productId, 2683) as number;
				inventionMaterialId = _config.objParam(productId, 5464) as number;
				break;
			case 10:
				resourceId = _config.objParam(productId, 2664) as number;
				matCountReq = _config.objParam(productId, 2674) as number;
				//v11 = config.objParam(productId, 4143);
				separateAmount = _config.objParam(productId, 2695) === 1;
				structId = _config.objParam(productId, 2684) as number;
				inventionMaterialId = _config.objParam(productId, 5465) as number;
				break;
			default:
				resourceId = -1;
				structId = -1;
				break;
		}
	}
	if (_config.objStackable(productId)) {
		maxAmount = Math.min(maxAmount, maxMakeSets);
	}
	if (varp(player, 1171) > 0) {
		maxAmount = Math.min(maxAmount, varp(player, 1171) as number);
	}
	return Math.min(maxAmount, 60);
}

function getStructMaxAmount(player: Player, structId: number, productAmount: number): number {
	//See clientscript 7109
	var id = _config.structParam(structId, 2655) as number;
	var matCountReq = _config.structParam(structId, 2665) as number;
	var separateAmount = _config.structParam(structId, 2686) === 1;
	var inventionMaterialId = _config.structParam(structId, 5456) as number;
	var total = 0;
	var v1 = 0;
	var v9 = 0;
	var loop = 1;
	var numberOf;
	while (id != -1) {
		numberOf = getResourceCount(player, id, inventionMaterialId);
		if (numberOf == -1) {
			total = INTEGER_MAX;
			loop = INTEGER_MAX;
		} else if (separateAmount) {
			total += (numberOf / matCountReq);
		} else {
			total += (numberOf / (matCountReq * productAmount));
			v1 += (numberOf % (matCountReq * productAmount)) / matCountReq;
			v9 += (((numberOf % (matCountReq * productAmount)) % matCountReq) * 1) / matCountReq;
		}
		loop++;
		switch (loop) {
			case 2:
				id = _config.structParam(structId, 2656) as number;
				matCountReq = _config.structParam(structId, 2666) as number;
				separateAmount = _config.structParam(structId, 2687) === 1;
				inventionMaterialId = _config.structParam(structId, 5457) as number;
				break;
			case 3:
				id = _config.structParam(structId, 2657) as number;
				matCountReq = _config.structParam(structId, 2667) as number;
				separateAmount = _config.structParam(structId, 2688) === 1;
				inventionMaterialId = _config.structParam(structId, 5458) as number;
				break;
			case 4:
				id = _config.structParam(structId, 2658) as number;
				matCountReq = _config.structParam(structId, 2668) as number;
				separateAmount = _config.structParam(structId, 2689) === 1;
				inventionMaterialId = _config.structParam(structId, 5459) as number;
				break;
			case 5:
				id = _config.structParam(structId, 2659) as number;
				matCountReq = _config.structParam(structId, 2669) as number;
				separateAmount = _config.structParam(structId, 2690) === 1;
				inventionMaterialId = _config.structParam(structId, 5460) as number;
				break;
			case 6:
				id = _config.structParam(structId, 2660) as number;
				matCountReq = _config.structParam(structId, 2670) as number;
				separateAmount = _config.structParam(structId, 2691) === 1;
				inventionMaterialId = _config.structParam(structId, 5461) as number;
				break;
			case 7:
				id = _config.structParam(structId, 2661) as number;
				matCountReq = _config.structParam(structId, 2671) as number;
				separateAmount = _config.structParam(structId, 2692) === 1;
				inventionMaterialId = _config.structParam(structId, 5462) as number;
				break;
			case 8:
				id = _config.structParam(structId, 2662) as number;
				matCountReq = _config.structParam(structId, 2672) as number;
				separateAmount = _config.structParam(structId, 2693) === 1;
				inventionMaterialId = _config.structParam(structId, 5463) as number;
				break;
			case 9:
				id = _config.structParam(structId, 2663) as number;
				matCountReq = _config.structParam(structId, 2673) as number;
				separateAmount = _config.structParam(structId, 2694) === 1;
				inventionMaterialId = _config.structParam(structId, 5464) as number;
				break;
			case 10:
				id = _config.structParam(structId, 2664) as number;
				matCountReq = _config.structParam(structId, 2674) as number;
				separateAmount = _config.structParam(structId, 2695) === 1;
				inventionMaterialId = _config.structParam(structId, 5465) as number;
				break;
			case 11:
				id = _config.structParam(structId, 5451) as number;
				matCountReq = _config.structParam(structId, 5471) as number;
				separateAmount = _config.structParam(structId, 5476) === 1;
				inventionMaterialId = _config.structParam(structId, 5466) as number;
				break;
			case 12:
				id = _config.structParam(structId, 5452) as number;
				matCountReq = _config.structParam(structId, 5472) as number;
				separateAmount = _config.structParam(structId, 5477) === 1;
				inventionMaterialId = _config.structParam(structId, 5467) as number;
				break;
			case 13:
				id = _config.structParam(structId, 5453) as number;
				matCountReq = _config.structParam(structId, 5473) as number;
				separateAmount = _config.structParam(structId, 5478) === 1;
				inventionMaterialId = _config.structParam(structId, 5468) as number;
				break;
			case 14:
				id = _config.structParam(structId, 5454) as number;
				matCountReq = _config.structParam(structId, 5474) as number;
				separateAmount = _config.structParam(structId, 5479) === 1;
				inventionMaterialId = _config.structParam(structId, 5469) as number;
				break;
			case 15:
				id = _config.structParam(structId, 5455) as number;
				matCountReq = _config.structParam(structId, 5475) as number;
				separateAmount = _config.structParam(structId, 5480) === 1;
				inventionMaterialId = _config.structParam(structId, 5470) as number;
				break;
			default:
				id = -1;
		}
	}
	if ((v1 + v9) > 0) {
		v1 += v9 / 1;
		total += v1 / productAmount;
		if ((((v9 / 1) % productAmount) + (v1 % productAmount)) > 0) {
			total++;
		}
	}
	return total;
}
