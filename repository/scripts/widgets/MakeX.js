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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interface ids to bind to */
	getIDs: function() {
		return [1370, 1371];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		if (interfaceID != 1370) {
			return;
		}
		api.runClientScript(player, 6946, []);
		api.hideWidget(player, 1371, 20, false);
				
		api.setVarc(player, 2225, 0);
		api.setVarc(player, 2689, 0);
		api.setVarc(player, 2690, 0);
		
		var itemID = api.getVarp(player, 1170);
		if (itemID == -1) {//Auto-select item
			var category = api.getVarp(player, 1169);
			var items = api.getEnumType(category);
			for (var slot = 0; slot < items.getSize(); slot++) {
				if (api.itemTotal(player, "backpack", items.getValueInt(slot)) > 1) {
					itemID = items.getValueInt(slot);
					api.setVarp(player, 1170, itemID);
					break;
				}
			}
		}
		var invCount = getMaxAmount(player, itemID);//The maximum amount of the item the player can produce
		api.setVarBit(player, 1002, invCount);//Product select max amount
		api.setVarBit(player, 1003, invCount);//The amount currently selected

		var itemType = api.getItemType(itemID);
		
		//Information about the selected item
		api.setVarc(player, 2391, itemType.getExamineText());//Examine text
		api.setVarc(player, 2223, 1);
		api.setVarc(player, 2224, itemType.getExchangeValue());//Exchange guide price
		api.setVarc(player, 199, -1);//Varc: key=199, value=-1
		api.setVarc(player, 3678, -1);//Varc: key=3678, value=-1
		api.runClientScript(player, 8178, []);
		
		///api.openWidget(parentId, parentSlot, 1370, clickThrough, player);
		api.openWidget(player, 1370, 62, 1371, true);//The inner interface
		
		api.setWidgetEvents(player, 1371, 62, 0, 12, 2);//Allows an option to be selected in the category drop-down menu
		api.setWidgetEvents(player, 1371, 36, 0, invCount, 2359296);//Activates the amount selection dragger
		api.setWidgetEvents(player, 1371, 143, 0, invCount, 2);//Clicks on the amount selection dragger
		api.setWidgetEvents(player, 1371, 44, 0, getSlotCount(api.getVarp(player, 1169)), 2);//Allows the items to be clicked
	},

	/* A button pressed on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		var mainCategory = api.getVarp(player, 1168);
		if (mainCategory < 0) {
			return false;
		}
		switch (component) {
		case 62://Select product category
			var categories = api.getEnumType(mainCategory);
			if (categories != null && slot >= 0 && slot < categories.getSize()) {
				var newCategory = categories.getValueInt(slot);
				api.setVarp(player, 1169, newCategory);
				api.setWidgetEvents(player, 1371, 44, 0, getSlotCount(newCategory), 2);
				//player.getVars().setVarp(VarpKey.PRODUCT_SELECT_ITEM, getDefaultItem(newCategory));
				setSelectedProduct(player, 0);
			}
			return true;
		case 44://Select product
			return setSelectedProduct(player, slot);
		case 29://Increase amount
			if (api.getVarBit(player, 1003) < api.getVarBit(player, 1002)) {
				api.incrementVarBit(player, 1003, 1);
			}
			return true;
		case 31://Decrease amount
			if (api.getVarBit(player, 1003) > 0) {
				api.incrementVarBit(player, 1003, -1);
			}
			return true;
		case 143://Click amount
			if (slot < api.getVarBit(player, 1002) && slot >= 0) {
				api.setVarBit(player, 1003, slot+1);
				api.sendMessage(player, "Set amount to "+api.getVarBit(player, 1003));
			}
			return true;
		default:
			return false;
		}
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		if (interface1 == interface2 && interface1 == 1371 && component1 == component2 && component1 == 36) {
			if (slot2 < api.getVarBit(player, 1002) && slot2 >= 0) {
				api.setVarBit(player, 1003, slot2+1);
				api.sendMessage(player, "[Drag]Set amount to "+api.getVarBit(player, 1003));
			}
			return true;
		}
		return false;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var widgetListener = new WidgetListener();
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

/**
 * Sets the selected product and updates the information for it
 * @param player The player
 * @param slotID The selected slot ID
 * @return True if the product was selected successfully, false if an error occured
 */
function setSelectedProduct (player, slotID) {
	slotID = getEnumSlot(slotID);
	var subCategory = api.getVarp(player, 1169);
	if (subCategory < 0) {
		return false;
	}
	var items = api.getEnumType(subCategory);
	if (items != null && slotID >= 0 && slotID < items.getSize()) {
		var itemID = items.getValueInt(slotID);
		api.setVarp(player, 1170, itemID);
		api.setVarp(player, 1174, 0);
		var invCount = player.getSkills().canCraft(itemID) ? getMaxAmount(player, itemID) : 0;
		api.setVarBit(player, 1002, invCount);//The maximum amount of the item the player can produce
		api.setVarBit(player, 1003, invCount);//The selected amount of the product to produce
		api.setWidgetEvents(player, 1371, 36, 0, invCount, 2359296);//Activates the amount selection dragger
		api.setWidgetEvents(player, 1371, 143, 0, invCount, 2);//Clicks on the amount selection dragger

		var itemType = api.getItemType(itemID);
		
		api.setVarc(player, 2391, itemType.getExamineText());//Examine text
		api.setVarc(player, 2223, 1);//
		api.setVarc(player, 2224, itemType.getExchangeValue());//Exchange guide price (Disabled as the exchange does not exist)
		
		return true;
	} else {
		return false;
	}
}

function getMaxAmount (player, product) {
	var productType = api.getItemType(product);
	var materialID = productType.getParam(2655, -1);
	var structID = productType.getParam(2675, -1);
	var separateAmount = productType.getParam(2686, 1) == 1;
	var matCountReq = productType.getParam(2665, 0);
	var maxAmount = 2147483647;
	var materialCount;
	var createPerCycle = productType.getParam(2653, 1);
	var maxMakeSets = productType.getParam(2995, 10);
	var param = 1;
	while ((materialID != -1 || structID != -1) && maxAmount > 0) {
		if (structID != -1) {
			materialCount = getStructInvAmount(player, structID, createPerCycle);
			if (materialCount < maxAmount) {
				maxAmount = materialCount;
			}
		} else {
			if (matCountReq != 0) {
				materialCount = player.getInvs().getAmountCarried(materialID);
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
			materialID = productType.getParam(2656, -1);
			matCountReq = productType.getParam(2666, -1);
			separateAmount = productType.getParam(2687, 1) == 1;
			structID = productType.getParam(2676, -1);
			break;
		default:
			materialID = -1;
			structID = -1;
			break;
		}
	}
	if (productType.stackable == 1) {
		maxAmount = Math.min(maxAmount, maxMakeSets);
	}
	if (api.getVarp(player, 1171) > 0) {
		maxAmount = Math.min(maxAmount, player.getVars().getVarp(1171));
	}
	return Math.min(maxAmount, 60);
}

function getStructInvAmount (player, structID, productAmount) {
	var struct = api.getStructType(structID);
	var id = struct.getParam(2655, -1);
	var matCountReq = struct.getParam(2665, 0);
	var separateAmount = struct.getParam(2686, 1) == 1;
	var total = 0;
	var v1 = 0;
	var v9 = 0;
	var loop = 1;
	var numberOf;
	while (id != -1) {
		numberOf = player.getInvs().getAmountCarried(id);
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
			id = struct.getParam(2656, -1);
			matCountReq = struct.getParam(2666, -1);
			separateAmount = struct.getParam(2687, 1) == 1;
			break;
		case 3:
			id = struct.getParam(2657, -1);
			matCountReq = struct.getParam(2667, -1);
			separateAmount = struct.getParam(2688, 1) == 1;
			break;
		case 4:
			id = struct.getParam(2658, -1);
			matCountReq = struct.getParam(2668, -1);
			separateAmount = struct.getParam(2689, 1) == 1;
			break;
		case 5:
			id = struct.getParam(2659, -1);
			matCountReq = struct.getParam(2669, -1);
			separateAmount = struct.getParam(2690, 1) == 1;
			break;
		case 6:
			id = struct.getParam(2660, -1);
			matCountReq = struct.getParam(2670, -1);
			separateAmount = struct.getParam(2691, 1) == 1;
			break;
		case 7:
			id = struct.getParam(2661, -1);
			matCountReq = struct.getParam(2671, -1);
			separateAmount = struct.getParam(2692, 1) == 1;
			break;
		case 8:
			id = struct.getParam(2662, -1);
			matCountReq = struct.getParam(2672, -1);
			separateAmount = struct.getParam(2693, 1) == 1;
			break;
		case 9:
			id = struct.getParam(2663, -1);
			matCountReq = struct.getParam(2673, -1);
			separateAmount = struct.getParam(2694, 1) == 1;
			break;
		case 10:
			id = struct.getParam(2664, -1);
			matCountReq = struct.getParam(2674, -1);
			separateAmount = struct.getParam(2695, 1) == 1;
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

function getEnumSlot (ifSlot) {
	return ifSlot/4;
}

function getSlotCount (category) {
	var items = api.getEnumType(category);
	if (items != null) {
		return items.getSize() * 4;
	} else {
		return 0;
	}
}