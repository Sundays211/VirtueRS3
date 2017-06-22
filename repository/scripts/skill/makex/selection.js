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
/* globals EventType, Inv, ENGINE */
var component = require('widget/component');
var varp = require('engine/var/player');
var varc = require('engine/var/client');
var varbit = require('engine/var/bit');

var widget = require('widget');
var config = require('engine/config');
var util = require('util');
var inv = require('inv');
var chat = require('chat');
var stat = require('stat');
var quest = require('../../quest');

var resources = require('./resources');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
module.exports = (function () {
	return {
		init : init,
		selectProduct : selectProduct,
		structContainsItem : structContainsItem
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1370, function (ctx) {
			openDialog(ctx.player);
		});
		
		scriptManager.bind(EventType.IF_DRAG, component(1371, 36), function (ctx) {
			if (ctx.toslot < varbit(ctx.player, 1002) && ctx.toslot >= 0) {
				varbit(ctx.player, 1003, ctx.toslot+1);
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON, 1371, function (ctx) {
			var player = ctx.player;
			switch (ctx.component) {
			case 62://Select product category
				var mainCategory = varp(player, 1168);
				if (mainCategory < 0) {
					chat.sendDebugMessage(player, "No main category selected!");
					return;
				}
				if (ctx.slot >= 0 && ctx.slot < config.enumSize(mainCategory)) {
					var newCategory = config.enumValue(mainCategory, ctx.slot);
					varp(player, 1169, newCategory);
					var slotCount = config.enumSize(newCategory) * 4;
					widget.setEvents(player, 1371, 44, 0, slotCount, 2);
					setSelectedProduct(player, 0);
				}
				return;
			case 44://Select product
				setSelectedProduct(player, ctx.slot);
				return;
			case 29://Increase count
				if (varbit(player, 1003) < varbit(player, 1002)) {
					varbit(player, 1003, varbit(player, 1003)+1);
				}
				return;
			case 31://Decrease count
				if (varbit(player, 1003) > 0) {
					varbit(player, 1003, varbit(player, 1003)-1);
				}
				return;
			case 143://Click count
				if (ctx.slot < varbit(player, 1002) && ctx.slot >= 0) {
					varbit(player, 1003, ctx.slot+1);
				}
				return;
			default:
				util.defaultHandler(ctx, "make-x dialog");
				return;
			}
		});
	}
	
	function selectProduct (player, rootCategory, rootCategoryNames, category, productId, categoryName) {
		productId = typeof(productId) === 'number' ? productId : -1;
		if (typeof(categoryName) !== 'undefined') {
			varc(player, 2390, categoryName);
			rootCategory = -1;
			rootCategoryNames = -1;
		} else {
			varc(player, 2390, "");
		}
		varp(player, 1168, rootCategory);
		varc(player, 2222, rootCategoryNames);
		varp(player, 1169, category);
		varp(player, 1170, productId);
		widget.openCentral(player, 1370, false);
	}
	
	function openDialog (player) {
		util.runClientScript(player, 6946, []);
		widget.hide(player, 1371, 20, false);
				
		varc(player, 2225, 0);
		varc(player, 2689, 0);
		varc(player, 2690, 0);

		var categoryId = varp(player, 1169);		
		var selectedObjId = varp(player, 1170);
		
		if (!config.enumHasValue(categoryId, selectedObjId)) {
			selectedObjId = -1;//Only select items actually in the category
		}
		
		if (selectedObjId == -1) {//Auto-select item
			var productId;
			for (var slot = 0; slot < config.enumSize(categoryId); slot++) {
				productId = config.enumValue(categoryId, slot);
				if (getMaxAmount(player, productId) > 1) {
					varp(player, 1170, productId);
					selectedObjId = productId;
					break;
				}
			}
		}
		if (selectedObjId == -1) {
			selectedObjId = config.enumValue(categoryId, 0);
			varp(player, 1170, selectedObjId);
		}
		var invCount = canCraft(player, selectedObjId) ? getMaxAmount(player, selectedObjId) : 0;//The maximum amount of the item the player can produce
		varbit(player, 1002, invCount);//Product select max amount
		varbit(player, 1003, invCount);//The amount currently selected
		
		//Information about the selected item
		varc(player, 2391, config.objDesc(selectedObjId));//Description
		varc(player, 2223, 1);
		varc(player, 2224, ENGINE.getExchangeCost(selectedObjId));//Exchange guide price
		
		widget.open(player, 1370, 62, 1371, true);//The inner interface
		
		widget.setEvents(player, 1371, 62, 0, 12, 2);//Allows an option to be selected in the category drop-down menu
		widget.setEvents(player, 1371, 36, 0, invCount, 2359296);//Activates the amount selection dragger
		widget.setEvents(player, 1371, 143, 0, invCount, 2);//Clicks on the amount selection dragger
		var slotCount = config.enumSize(categoryId) * 4;
		widget.setEvents(player, 1371, 44, 0, slotCount, 2);//Allows the items to be clicked
	}
	
	/**
	 * Sets the selected product and updates the information for it
	 * @param player The player
	 * @param slot The selected slot ID
	 * @return True if the product was selected successfully, false if an error occured
	 */
	function setSelectedProduct (player, slot) {
		slot = slot/4;
		var subCategory = varp(player, 1169);
		if (subCategory < 0) {
			return false;
		}
		if (slot >= 0 && slot < config.enumValue(subCategory)) {
			var objId = config.enumValue(subCategory, slot);
			varp(player, 1170, objId);
			varp(player, 1174, 0);
			var heldCount = canCraft(player, objId) ? getMaxAmount(player, objId) : 0;
			varbit(player, 1002, heldCount);//The maximum amount of the item the player can produce
			varbit(player, 1003, heldCount);//The selected amount of the product to produce
			widget.setEvents(player, 1371, 36, 0, heldCount, 2359296);//Activates the count selection dragger
			widget.setEvents(player, 1371, 143, 0, heldCount, 2);//Clicks on the count selection dragger
			
			varc(player, 2391, config.objDesc(objId));//Examine text
			varc(player, 2223, 1);//
			varc(player, 2224, ENGINE.getExchangeCost(objId));//Exchange guide price
			
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
	function canCraft (player, productId) {
		 if (!checkTools(player, productId)) {
			 return false;
		 }
		 
		 var key = config.objParam(productId, 2640);
		 var value = config.objParam(productId, 2645);
		 var reqID = 1;
		 while (key > 0) {
			if (!checkRequirement(player, key, value, config.objParam(productId, 317), config.objParam(productId, 3649) == 1, reqID)) {
				return false;
			}
			reqID++;
			switch (reqID) {
				case 2:
					key = config.objParam(productId, 2641);
					value = config.objParam(productId, 2646);
					break;
				case 3:
					key = config.objParam(productId, 2642);
					value = config.objParam(productId, 2647);
					break;
				case 4:
					key = config.objParam(productId, 2643);
					value = config.objParam(productId, 2648);
					break;
				case 5:
					key = config.objParam(productId, 2644);
					value = config.objParam(productId, 2649);
					break;
				default:
					key = 0;
			}
		 }
		 return true;
	}
	
	function checkRequirement (player, key, value, unk1, boostable) {
		if (key > 0 && key < 61) {//Stat
			if (boostable) {
				if (stat.getLevel(player, config.enumValue(681, key)) >= value) {
					// || reqID == 0 && script_7107(unk1) >= value
					return true;
				}
			} else if (stat.getBaseLevel(player, config.enumValue(681, key)) >= value) {
				return true;
			}
			return false;
		}
		if (key == 61) {//Quest
			var questId = config.enumValue(812, value);
			return quest.hasFinished(player, questId);
		}
		if (key == 62) {
			return false;
			//return script_7163(value);//TODO: Implement misc requirements
		}
		return true;
	}
	
	function checkTools (player, productId) {
		var toolId = config.objParam(productId, 2655);
		var structId = config.objParam(productId, 2675);
		var param = 1;
		while (toolId != -1 || structId != -1) {
			if (structId != -1) {
				if (getStructMaxAmount(player, structId, 1) === 0) {
					return false;
				}
			} else {
				if (!hasTool(player, toolId)) {
					return false;
				}
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
		return true;
	}
	
	function hasTool (player, toolId) {
		if (inv.has(player, toolId, 1, Inv.BACKPACK)) {
			return true;
		}
		if (inv.has(player, toolId, 1, Inv.EQUIPMENT)) {
			return true;
		}
		return inv.hasTool(player, toolId);
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
	
	function structContainsItem (structId, objId) {
		var id = config.structParam(structId, 2655);
		var loop = 1;
		while (id != -1) {
			if (id == objId) {
				return true;
			}
			loop++;
			switch (loop) {
			case 2:
				id = config.structParam(structId, 2656);
				break;
			case 3:
				id = config.structParam(structId, 2657);
				break;
			case 4:
				id = config.structParam(structId, 2658);
				break;
			case 5:
				id = config.structParam(structId, 2659);
				break;
			case 6:
				id = config.structParam(structId, 2660);
				break;
			case 7:
				id = config.structParam(structId, 2661);
				break;
			case 8:
				id = config.structParam(structId, 2662);
				break;
			case 9:
				id = config.structParam(structId, 2663);
				break;
			case 10:
				id = config.structParam(structId, 2664);
				break;
			default:
				id = -1;
			}
		}
		return false;
	}
	
	function getMaxAmount (player, productId) {
		//See clientscript 7108
		var materialId = config.objParam(productId, 2655);
		var matCountReq = config.objParam(productId, 2665);
		//int v11 = config.objParam(productId, 4134);
		var separateAmount = config.objParam(productId, 2686) == 1;
		var structId = config.objParam(productId, 2675);
		//int v1 = config.objParam(productId, 5456);
		var maxAmount = 2147483647;
		var materialCount;
		var createPerCycle = config.objParam(productId, 2653);
		var maxMakeSets = config.objParam(productId, 2995);
		var param = 1;
		while ((materialId != -1 || structId != -1) && maxAmount > 0) {
			if (structId != -1) {
				materialCount = getStructMaxAmount(player, structId, createPerCycle);
				if (materialCount < maxAmount) {
					maxAmount = materialCount;
				}
			} else {
				if (matCountReq !== 0) {
					materialCount = resources.getCount(player, materialId);
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
			switch(param) {
			case 2:
				materialId = config.objParam(productId, 2656);
				matCountReq = config.objParam(productId, 2666);
				//v11 = config.objParam(productId, 4135);
				separateAmount = config.objParam(productId, 2687) == 1;
				structId = config.objParam(productId, 2676);
				//v1 = config.objParam(productId, 5457);
				break;
			case 3:
				materialId = config.objParam(productId, 2657);
				matCountReq = config.objParam(productId, 2667);
				//v11 = config.objParam(productId, 4136);
				separateAmount = config.objParam(productId, 2688) == 1;
				structId = config.objParam(productId, 2677);
				//v1 = config.objParam(productId, 5458);
				break;
			case 4:
				materialId = config.objParam(productId, 2658);
				matCountReq = config.objParam(productId, 2668);
				//v11 = config.objParam(productId, 4137);
				separateAmount = config.objParam(productId, 2689);
				structId = config.objParam(productId, 2678);
				//v1 = config.objParam(productId, 5459);
				break;
			case 5:
				materialId = config.objParam(productId, 2659);
				matCountReq = config.objParam(productId, 2669);
				//v11 = config.objParam(productId, 4138);
				separateAmount = config.objParam(productId, 2690);
				structId = config.objParam(productId, 2679);
				//v1 = config.objParam(productId, 5460);
				break;
			case 6:
				materialId = config.objParam(productId, 2660);
				matCountReq = config.objParam(productId, 2670);
				//v11 = config.objParam(productId, 4139);
				separateAmount = config.objParam(productId, 2691);
				structId = config.objParam(productId, 2680);
				//v1 = config.objParam(productId, 5461);
				break;
			case 7:
				materialId = config.objParam(productId, 2661);
				matCountReq = config.objParam(productId, 2671);
				//v11 = config.objParam(productId, 4140);
				separateAmount = config.objParam(productId, 2692);
				structId = config.objParam(productId, 2681);
				//v1 = config.objParam(productId, 5462);
				break;
			case 8:
				materialId = config.objParam(productId, 2662);
				matCountReq = config.objParam(productId, 2672);
				//v11 = config.objParam(productId, 4141);
				separateAmount = config.objParam(productId, 2693);
				structId = config.objParam(productId, 2682);
				//v1 = config.objParam(productId, 5463);
				break;
			case 9:
				materialId = config.objParam(productId, 2663);
				matCountReq = config.objParam(productId, 2673);
				//v11 = config.objParam(productId, 4142);
				separateAmount = config.objParam(productId, 2694);
				structId = config.objParam(productId, 2683);
				//v1 = config.objParam(productId, 5464);
				break;
			case 10:
				materialId = config.objParam(productId, 2664);
				matCountReq = config.objParam(productId, 2674);
				//v11 = config.objParam(productId, 4143);
				separateAmount = config.objParam(productId, 2695);
				structId = config.objParam(productId, 2684);
				//v1 = config.objParam(productId, 5465);
				break;
			default:
				materialId = -1;
				structId = -1;
				break;
			}
		}
		if (config.objStackable(productId)) {
			maxAmount = Math.min(maxAmount, maxMakeSets);
		}
		if (varp(player, 1171) > 0) {
			maxAmount = Math.min(maxAmount, varp(player, 1171));
		}
		return Math.min(maxAmount, 60);
	}
	
	function getStructMaxAmount (player, structId, productAmount) {
		var id = config.structParam(structId, 2655);
		var matCountReq = config.structParam(structId, 2665);
		var separateAmount = config.structParam(structId, 2686) == 1;
		var total = 0;
		var v1 = 0;
		var v9 = 0;
		var loop = 1;
		var numberOf;
		while (id != -1) {
			numberOf = inv.total(player, id);
			if (numberOf == -1) {
				total = 2147483647;
				loop = 2147483647;
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
				id = config.structParam(structId, 2656);
				matCountReq = config.structParam(structId, 2666);
				separateAmount = config.structParam(structId, 2687) == 1;
				break;
			case 3:
				id = config.structParam(structId, 2657);
				matCountReq = config.structParam(structId, 2667);
				separateAmount = config.structParam(structId, 2688) == 1;
				break;
			case 4:
				id = config.structParam(structId, 2658);
				matCountReq = config.structParam(structId, 2668);
				separateAmount = config.structParam(structId, 2689) == 1;
				break;
			case 5:
				id = config.structParam(structId, 2659);
				matCountReq = config.structParam(structId, 2669);
				separateAmount = config.structParam(structId, 2690) == 1;
				break;
			case 6:
				id = config.structParam(structId, 2660);
				matCountReq = config.structParam(structId, 2670);
				separateAmount = config.structParam(structId, 2691) == 1;
				break;
			case 7:
				id = config.structParam(structId, 2661);
				matCountReq = config.structParam(structId, 2671);
				separateAmount = config.structParam(structId, 2692) == 1;
				break;
			case 8:
				id = config.structParam(structId, 2662);
				matCountReq = config.structParam(structId, 2672);
				separateAmount = config.structParam(structId, 2693) == 1;
				break;
			case 9:
				id = config.structParam(structId, 2663);
				matCountReq = config.structParam(structId, 2673);
				separateAmount = config.structParam(structId, 2694) == 1;
				break;
			case 10:
				id = config.structParam(structId, 2664);
				matCountReq = config.structParam(structId, 2674);
				separateAmount = config.structParam(structId, 2695) == 1;
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
})();
