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
var CraftDialogOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		api.runClientScript(player, 6946, []);
		api.hideWidget(player, 1371, 20, false);
				
		api.setVarc(player, 2225, 0);
		api.setVarc(player, 2689, 0);
		api.setVarc(player, 2690, 0);
		
		var selectedItemId = api.getVarp(player, 1170);
		if (selectedItemId == -1) {//Auto-select item
			var category = api.getVarp(player, 1169);
			var objTypeId;
			for (var slot = 0; slot < api.getEnumSize(category); slot++) {
				objTypeId = api.getEnumValue(category, slot);
				if (api.itemTotal(player, Inv.BACKPACK, objTypeId) > 1) {
					api.setVarp(player, 1170, objTypeId);
					break;
				}
			}
		}
		var invCount = CraftDialog.getMaxAmount(player, selectedItemId);//The maximum amount of the item the player can produce
		api.setVarBit(player, 1002, invCount);//Product select max amount
		api.setVarBit(player, 1003, invCount);//The amount currently selected
		
		//Information about the selected item
		api.setVarc(player, 2391, api.getItemDesc(selectedItemId));//Examine text
		api.setVarc(player, 2223, 1);
		api.setVarc(player, 2224, api.getExchangeCost(selectedItemId));//Exchange guide price
		api.setVarc(player, 199, -1);//Varc: key=199, value=-1
		api.setVarc(player, 3678, -1);//Varc: key=3678, value=-1
		api.runClientScript(player, 8178, []);
		
		api.openWidget(player, 1370, 62, 1371, true);//The inner interface
		
		api.setWidgetEvents(player, 1371, 62, 0, 12, 2);//Allows an option to be selected in the category drop-down menu
		api.setWidgetEvents(player, 1371, 36, 0, invCount, 2359296);//Activates the amount selection dragger
		api.setWidgetEvents(player, 1371, 143, 0, invCount, 2);//Clicks on the amount selection dragger
		var slotCount = api.getEnumSize(api.getVarp(player, 1169)) * 4;
		api.setWidgetEvents(player, 1371, 44, 0, slotCount, 2);//Allows the items to be clicked
	}
});

var CraftDialogButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		
		var mainCategory = api.getVarp(player, 1168);
		if (mainCategory < 0) {
			api.sendMessage(player, "No main category selected!");
			return;
		}
		switch (args.component) {
		case 62://Select product category
			if (args.slot >= 0 && args.slot < api.getEnumSize(mainCategory)) {
				var newCategory = api.getEnumValue(mainCategory, args.slot);
				api.setVarp(player, 1169, newCategory);
				var slotCount = api.getEnumSize(newCategory) * 4;
				api.setWidgetEvents(player, 1371, 44, 0, slotCount, 2);
				CraftDialog.setSelectedProduct(player, 0);
			}
			return;
		case 44://Select product
			CraftDialog.setSelectedProduct(player, args.slot);
			return;
		case 29://Increase count
			if (api.getVarBit(player, 1003) < api.getVarBit(player, 1002)) {
				api.incrementVarBit(player, 1003, 1);
			}
			return;
		case 31://Decrease count
			if (api.getVarBit(player, 1003) > 0) {
				api.incrementVarBit(player, 1003, -1);
			}
			return;
		case 143://Click count
			if (args.slot < api.getVarBit(player, 1002) && args.slot >= 0) {
				api.setVarBit(player, 1003, args.slot+1);
			}
			return;
		default:
			api.sendMessage(player, "Unhandled craft dialog button: comp="+args.component+", slot="+args.slot+", button="+args.button);
			return;
		}
	}
});

var CraftDialogSliderListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, comphash, args) {
		var player = args.player;
		
		if (args.toslot < api.getVarBit(player, 1002) && args.toslot >= 0) {
			api.setVarBit(player, 1003, args.toslot+1);
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new CraftDialogOpenListener();	
	scriptManager.registerListener(EventType.IF_OPEN, 1370, listener);
	
	listener = new CraftDialogButtonListener();	
	scriptManager.registerListener(EventType.IF_BUTTON, 1371, listener);
	
	listener = new CraftDialogSliderListener();	
	scriptManager.registerCompListener(EventType.IF_DRAG, 1371, 36, listener);
};

var CraftDialog = {
		/**
		 * Sets the selected product and updates the information for it
		 * @param player The player
		 * @param slot The selected slot ID
		 * @return True if the product was selected successfully, false if an error occured
		 */
		setSelectedProduct : function (player, slot) {
			slot = slot/4;
			var subCategory = api.getVarp(player, 1169);
			if (subCategory < 0) {
				return false;
			}
			if (slot >= 0 && slot < api.getEnumSize(subCategory)) {
				var itemID = api.getEnumValue(subCategory, slot);
				api.setVarp(player, 1170, itemID);
				api.setVarp(player, 1174, 0);
				var invCount = player.getSkills().canCraft(itemID) ? this.getMaxAmount(player, itemID) : 0;
				api.setVarBit(player, 1002, invCount);//The maximum amount of the item the player can produce
				api.setVarBit(player, 1003, invCount);//The selected amount of the product to produce
				api.setWidgetEvents(player, 1371, 36, 0, invCount, 2359296);//Activates the amount selection dragger
				api.setWidgetEvents(player, 1371, 143, 0, invCount, 2);//Clicks on the amount selection dragger
				
				api.setVarc(player, 2391, api.getItemDesc(itemID));//Examine text
				api.setVarc(player, 2223, 1);//
				api.setVarc(player, 2224, api.getExchangeCost(itemID));//Exchange guide price (Disabled as the exchange does not exist)
				
				return true;
			} else {
				return false;
			}
		},
		
		getMaxAmount : function (player, productId) {
			var materialID = api.getItemParam(productId, 2655);
			var structID = api.getItemParam(productId, 2675);
			var separateAmount = api.getItemParam(productId, 2686) == 1;
			var matCountReq = api.getItemParam(productId, 2665);
			var maxAmount = 2147483647;
			var materialCount;
			var createPerCycle = api.getItemParam(productId, 2653);
			var maxMakeSets = api.getItemParam(productId, 2995);
			var param = 1;
			while ((materialID != -1 || structID != -1) && maxAmount > 0) {
				if (structID != -1) {
					materialCount = this.getStructInvAmount(player, structID, createPerCycle);
					if (materialCount < maxAmount) {
						maxAmount = materialCount;
					}
				} else {
					if (matCountReq != 0) {
						materialCount = api.carriedItemTotal(player, materialID);
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
					materialID = api.getItemParam(productId, 2656);
					matCountReq = api.getItemParam(productId, 2666);
					separateAmount = api.getItemParam(productId, 2687) == 1;
					structID = api.getItemParam(productId, 2676);
					break;
				default:
					materialID = -1;
					structID = -1;
					break;
				}
			}
			if (api.itemStacks(productId)) {
				maxAmount = Math.min(maxAmount, maxMakeSets);
			}
			if (api.getVarp(player, 1171) > 0) {
				maxAmount = Math.min(maxAmount, api.getVarp(player, 1171));
			}
			return Math.min(maxAmount, 60);
		},
		getStructInvAmount : function (player, structId, productAmount) {
			var id = api.getStructParam(structId, 2655);
			var matCountReq = api.getStructParam(structId, 2665);
			var separateAmount = api.getStructParam(structId, 2686) == 1;
			var total = 0;
			var v1 = 0;
			var v9 = 0;
			var loop = 1;
			var numberOf;
			while (id != -1) {
				numberOf = api.carriedItemTotal(player, id);
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
					id = api.getStructParam(structId, 2656);
					matCountReq = api.getStructParam(structId, 2666);
					separateAmount = api.getStructParam(structId, 2687) == 1;
					break;
				case 3:
					id = api.getStructParam(structId, 2657);
					matCountReq = api.getStructParam(structId, 2667);
					separateAmount = api.getStructParam(structId, 2688) == 1;
					break;
				case 4:
					id = api.getStructParam(structId, 2658);
					matCountReq = api.getStructParam(structId, 2668);
					separateAmount = api.getStructParam(structId, 2689) == 1;
					break;
				case 5:
					id = api.getStructParam(structId, 2659);
					matCountReq = api.getStructParam(structId, 2669);
					separateAmount = api.getStructParam(structId, 2690) == 1;
					break;
				case 6:
					id = api.getStructParam(structId, 2660);
					matCountReq = api.getStructParam(structId, 2670);
					separateAmount = api.getStructParam(structId, 2691) == 1;
					break;
				case 7:
					id = api.getStructParam(structId, 2661);
					matCountReq = api.getStructParam(structId, 2671);
					separateAmount = api.getStructParam(structId, 2692) == 1;
					break;
				case 8:
					id = api.getStructParam(structId, 2662);
					matCountReq = api.getStructParam(structId, 2672);
					separateAmount = api.getStructParam(structId, 2693) == 1;
					break;
				case 9:
					id = api.getStructParam(structId, 2663);
					matCountReq = api.getStructParam(structId, 2673);
					separateAmount = api.getStructParam(structId, 2694) == 1;
					break;
				case 10:
					id = api.getStructParam(structId, 2664);
					matCountReq = api.getStructParam(structId, 2674);
					separateAmount = api.getStructParam(structId, 2695) == 1;
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
}