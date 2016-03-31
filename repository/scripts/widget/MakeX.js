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

		var categoryId = api.getVarp(player, 1169);		
		var selectedItemId = api.getVarp(player, 1170);
		
		if (!configApi.enumHasValue(categoryId, selectedItemId)) {
			selectedItemId = -1;//Only select items actually in the category
		}
		
		if (selectedItemId == -1) {//Auto-select item
			var productId;
			for (var slot = 0; slot < configApi.enumSize(categoryId); slot++) {
				productId = configApi.enumValue(categoryId, slot);
				if (CraftDialog.getMaxAmount(player, productId) > 1) {
					api.setVarp(player, 1170, productId);
					selectedItemId = productId;
					break;
				}
			}
		}
		if (selectedItemId == -1) {
			selectedItemId = configApi.enumValue(categoryId, 0);
			api.setVarp(player, 1170, selectedItemId);
		}
		var invCount = CraftDialog.getMaxAmount(player, selectedItemId);//The maximum amount of the item the player can produce
		api.setVarBit(player, 1002, invCount);//Product select max amount
		api.setVarBit(player, 1003, invCount);//The amount currently selected
		
		//Information about the selected item
		api.setVarc(player, 2391, configApi.objDesc(selectedItemId));//Description
		api.setVarc(player, 2223, 1);
		api.setVarc(player, 2224, api.getExchangeCost(selectedItemId));//Exchange guide price
		
		api.openWidget(player, 1370, 62, 1371, true);//The inner interface
		
		api.setWidgetEvents(player, 1371, 62, 0, 12, 2);//Allows an option to be selected in the category drop-down menu
		api.setWidgetEvents(player, 1371, 36, 0, invCount, 2359296);//Activates the amount selection dragger
		api.setWidgetEvents(player, 1371, 143, 0, invCount, 2);//Clicks on the amount selection dragger
		var slotCount = configApi.enumSize(categoryId) * 4;
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
				var invCount = this.canCraft(player, itemID) ? this.getMaxAmount(player, itemID) : 0;
				api.setVarBit(player, 1002, invCount);//The maximum amount of the item the player can produce
				api.setVarBit(player, 1003, invCount);//The selected amount of the product to produce
				api.setWidgetEvents(player, 1371, 36, 0, invCount, 2359296);//Activates the count selection dragger
				api.setWidgetEvents(player, 1371, 143, 0, invCount, 2);//Clicks on the count selection dragger
				
				api.setVarc(player, 2391, configApi.objDesc(itemID));//Examine text
				api.setVarc(player, 2223, 1);//
				api.setVarc(player, 2224, api.getExchangeCost(itemID));//Exchange guide price
				
				return true;
			} else {
				return false;
			}
		},
		
		/**
		 * Returns whether the player has the requirements to craft the product of the specified ID
		 * @param productId The itemType ID of the product to check
		 * @return True if the player meets all the requirements, false otherwise
		 */
		canCraft : function (player, productId) {
			 if (!this.checkTools(player, productId)) {
				 return false;
			 }
			 
			 var key = configApi.objParam(productId, 2640);
			 var value = configApi.objParam(productId, 2645);
			 var reqID = 1;
			 while (key > 0) {
				if (!this.checkRequirement(player, key, value, configApi.objParam(productId, 317), configApi.objParam(productId, 3649) == 1, reqID)) {
					return false;
				}
				reqID++;
				switch (reqID) {
					case 2:
						key = configApi.objParam(productId, 2641);
						value = configApi.objParam(productId, 2646);
						break;
					case 3:
						key = configApi.objParam(productId, 2642);
						value = configApi.objParam(productId, 2647);
						break;
					case 4:
						key = configApi.objParam(productId, 2643);
						value = configApi.objParam(productId, 2648);
						break;
					case 5:
						key = configApi.objParam(productId, 2644);
						value = configApi.objParam(productId, 2649);
						break;
					default:
						key = 0;
				}
			 }
			 return true;
		},
		
		checkRequirement : function (player, key, value, unk1, boostable, reqID) {
			if (key > 0 && key < 61) {//Stat
				if (boostable) {
					if (api.getStatLevel(player, api.getEnumValue(681, key)) >= value) {
						// || reqID == 0 && script_7107(unk1) >= value
						return true;
					}
				} else if (api.getBaseLevel(player, api.getEnumValue(681, key)) >= value) {
					return true;
				}
				return false;
			}
			if (key == 61) {//Quest
				var questId = api.getEnumValue(812, value);
				return questApi.isFinished(player, questId);
			}
			if (key == 62) {
				return false;
				//return script_7163(value);//TODO: Implement misc requirements
			}
			return true;
		},
		
		checkTools : function (player, productId) {
			var toolId = configApi.objParam(productId, 2655);
			var structId = configApi.objParam(productId, 2675);
			var param = 1;
			while (toolId != -1 || structId != -1) {
				if (structId != -1) {
					if (this.getStructInvAmount(player, structId, 1) == 0) {
						return false;
					}
				} else {
					if (!this.hasTool(player, toolId)) {
						return false;
					}
				}
				param++;
				switch (param) {
				case 2:
					toolId = configApi.objParam(productId, 2651);
					structId = configApi.objParam(productId, 2991);
					break;
				case 3:
					toolId = configApi.objParam(productId, 2652);
					structId = configApi.objParam(productId, 2992);
					break;
				default:
					toolId = -1;
					structId = -1;
					break;
				}
			}
			return true;
		},
		
		hasTool : function (player, toolId) {
			if (api.itemTotal(player, Inv.BACKPACK, toolId) > 0) {
				return true;
			}
			if (api.itemTotal(player, Inv.EQUIPMENT, toolId) > 0) {
				return true;
			}
			return Toolbelt.hasTool(player, toolId);
		},
		
		isTool : function (productId, itemId) {
			var toolId = configApi.objParam(productId, 2655);
			var structId = configApi.objParam(productId, 2675);
			var param = 1;
			while (toolId != -1 || structId != -1) {
				if (structId != -1 && this.structContainsItem(structId, itemId)) {
					return true;
				} else if (toolId == itemId) {
					return true;
				}
				param++;
				switch (param) {
				case 2:
					toolId = configApi.objParam(productId, 2651);
					structId = configApi.objParam(productId, 2991);
					break;
				case 3:
					toolId = configApi.objParam(productId, 2652);
					structId = configApi.objParam(productId, 2992);
					break;
				default:
					toolId = -1;
					structId = -1;
					break;
				}
			}
			return false;
		},
		
		structContainsItem : function (structId, itemId) {
			var id = configApi.structParam(structId, 2655);
			var loop = 1;
			while (id != -1) {
				if (id == itemId) {
					return true;
				}
				loop++;
				switch (loop) {
				case 2:
					id = configApi.structParam(structId, 2656);
					break;
				case 3:
					id = configApi.structParam(structId, 2657);
					break;
				case 4:
					id = configApi.structParam(structId, 2658);
					break;
				case 5:
					id = configApi.structParam(structId, 2659);
					break;
				case 6:
					id = configApi.structParam(structId, 2660);
					break;
				case 7:
					id = configApi.structParam(structId, 2661);
					break;
				case 8:
					id = configApi.structParam(structId, 2662);
					break;
				case 9:
					id = configApi.structParam(structId, 2663);
					break;
				case 10:
					id = configApi.structParam(structId, 2664);
					break;
				default:
					id = -1;
				}
			}
			return false;
		},
		
		getMaxAmount : function (player, productId) {
			//See clientscript 7108
			var materialId = configApi.objParam(productId, 2655);
			var structId = configApi.objParam(productId, 2675);
			var separateAmount = configApi.objParam(productId, 2686) == 1;
			var matCountReq = configApi.objParam(productId, 2665);
			var maxAmount = 2147483647;
			var materialCount;
			var createPerCycle = configApi.objParam(productId, 2653);
			var maxMakeSets = configApi.objParam(productId, 2995);
			var param = 1;
			while ((materialId != -1 || structId != -1) && maxAmount > 0) {
				if (structId != -1) {
					materialCount = this.getStructInvAmount(player, structId, createPerCycle);
					if (materialCount < maxAmount) {
						maxAmount = materialCount;
					}
				} else {
					if (matCountReq != 0) {
						materialCount = Backpack.getHeldCount(player, materialId);
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
					materialId = configApi.objParam(productId, 2656);
					matCountReq = configApi.objParam(productId, 2666);
					//v11 = configApi.objParam(productId, 4135);
					separateAmount = configApi.objParam(productId, 2687) == 1;
					structId = configApi.objParam(productId, 2676);
					//v1 = configApi.objParam(productId, 5457);
					break;
				case 3:
					materialId = configApi.objParam(productId, 2657);
					matCountReq = configApi.objParam(productId, 2667);
					//v11 = configApi.objParam(productId, 4136);
					separateAmount = configApi.objParam(productId, 2688) == 1;
					structId = configApi.objParam(productId, 2677);
					//v1 = configApi.objParam(productId, 5458);
					break;
				case 4:
					materialId = configApi.objParam(productId, 2658);
					matCountReq = configApi.objParam(productId, 2668);
					//v11 = configApi.objParam(productId, 4137);
					separateAmount = configApi.objParam(productId, 2689);
					structId = configApi.objParam(productId, 2678);
					//v1 = configApi.objParam(productId, 5459);
					break;
				case 5:
					materialId = configApi.objParam(productId, 2659);
					matCountReq = configApi.objParam(productId, 2669);
					//v11 = configApi.objParam(productId, 4138);
					separateAmount = configApi.objParam(productId, 2690);
					structId = configApi.objParam(productId, 2679);
					//v1 = configApi.objParam(productId, 5460);
					break;
				case 6:
					materialId = configApi.objParam(productId, 2660);
					matCountReq = configApi.objParam(productId, 2670);
					//v11 = configApi.objParam(productId, 4139);
					separateAmount = configApi.objParam(productId, 2691);
					structId = configApi.objParam(productId, 2680);
					//v1 = configApi.objParam(productId, 5461);
					break;
				case 7:
					materialId = configApi.objParam(productId, 2661);
					matCountReq = configApi.objParam(productId, 2671);
					//v11 = configApi.objParam(productId, 4140);
					separateAmount = configApi.objParam(productId, 2692);
					structId = configApi.objParam(productId, 2681);
					//v1 = configApi.objParam(productId, 5462);
					break;
				case 8:
					materialId = configApi.objParam(productId, 2662);
					matCountReq = configApi.objParam(productId, 2672);
					//v11 = configApi.objParam(productId, 4141);
					separateAmount = configApi.objParam(productId, 2693);
					structId = configApi.objParam(productId, 2682);
					//v1 = configApi.objParam(productId, 5463);
					break;
				case 9:
					materialId = configApi.objParam(productId, 2663);
					matCountReq = configApi.objParam(productId, 2673);
					//v11 = configApi.objParam(productId, 4142);
					separateAmount = configApi.objParam(productId, 2694);
					structId = configApi.objParam(productId, 2683);
					//v1 = configApi.objParam(productId, 5464);
					break;
				case 10:
					materialId = configApi.objParam(productId, 2664);
					matCountReq = configApi.objParam(productId, 2674);
					//v11 = configApi.objParam(productId, 4143);
					separateAmount = configApi.objParam(productId, 2695);
					structId = configApi.objParam(productId, 2684);
					//v1 = configApi.objParam(productId, 5465);
					break;
				default:
					materialId = -1;
					structId = -1;
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
			var id = configApi.structParam(structId, 2655);
			var matCountReq = configApi.structParam(structId, 2665);
			var separateAmount = configApi.structParam(structId, 2686) == 1;
			var total = 0;
			var v1 = 0;
			var v9 = 0;
			var loop = 1;
			var numberOf;
			while (id != -1) {
				numberOf = Backpack.getHeldCount(player, id);
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
					id = configApi.structParam(structId, 2656);
					matCountReq = configApi.structParam(structId, 2666);
					separateAmount = configApi.structParam(structId, 2687) == 1;
					break;
				case 3:
					id = configApi.structParam(structId, 2657);
					matCountReq = configApi.structParam(structId, 2667);
					separateAmount = configApi.structParam(structId, 2688) == 1;
					break;
				case 4:
					id = configApi.structParam(structId, 2658);
					matCountReq = configApi.structParam(structId, 2668);
					separateAmount = configApi.structParam(structId, 2689) == 1;
					break;
				case 5:
					id = configApi.structParam(structId, 2659);
					matCountReq = configApi.structParam(structId, 2669);
					separateAmount = configApi.structParam(structId, 2690) == 1;
					break;
				case 6:
					id = configApi.structParam(structId, 2660);
					matCountReq = configApi.structParam(structId, 2670);
					separateAmount = configApi.structParam(structId, 2691) == 1;
					break;
				case 7:
					id = configApi.structParam(structId, 2661);
					matCountReq = configApi.structParam(structId, 2671);
					separateAmount = configApi.structParam(structId, 2692) == 1;
					break;
				case 8:
					id = configApi.structParam(structId, 2662);
					matCountReq = configApi.structParam(structId, 2672);
					separateAmount = configApi.structParam(structId, 2693) == 1;
					break;
				case 9:
					id = configApi.structParam(structId, 2663);
					matCountReq = configApi.structParam(structId, 2673);
					separateAmount = configApi.structParam(structId, 2694) == 1;
					break;
				case 10:
					id = configApi.structParam(structId, 2664);
					matCountReq = configApi.structParam(structId, 2674);
					separateAmount = configApi.structParam(structId, 2695) == 1;
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