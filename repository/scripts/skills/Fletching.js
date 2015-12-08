/**
 * Copyright (c) 2014 Virtue Studios
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
var CraftAction = Java.type('org.virtue.game.content.skills.CraftAction');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
var api;

var FletchLog = {
		NORMAL : {
			itemID : 1511,
			category : 6947,
			animation : 24943,
			defaultProduct : 50
		},
		OAK : {
			itemID : 1521,
			category : 6949,
			animation : 24944,
			defaultProduct : 54
		},
		WILLOW : {
			itemID : 1519,
			category : 6950,
			defaultProduct : 60
		},
		TEAK : {
			itemID : 6333,
			category : 6951,
			defaultProduct : 9446
		},
		MAPLE : {
			itemID : 1517,
			category : 6952,
			defaultProduct : 64
		},
		MAHOGANY : {
			itemID : 6332,
			category : 6953,
			defaultProduct : 9450
		}
}

var FletchType = {
		FLETCH_WOOD : {
			category : 6939,
			categoryNames : 6940,
			subCategory : -1,
			tool : 946,
			animation : 24940,
			delay : 3,
			successText : "You carefully cut the logs into a shortbow."
		},
		STRING_BOW : {
			category : 6941,
			categoryNames : 6942,
			subCategory : 6880,
			tool : -1,
			animation : 1,
			delay : 3,
			successText : "You carefully cut the logs into a shortbow."
		},
		FEATHER_ARROW : {
			category : 6943,
			categoryNames : 6944,
			subCategory : 6880,
			tool : -1,
			animation : -1,
			delay : 3,
			successText : "You carefully cut the logs into a shortbow."
		},
		TIP_ARROW : {
			category : 6945,
			categoryNames : 6946,
			subCategory : 6880,
			tool : -1,
			animation : -1,
			delay : 3,
			successText : "You carefully cut the logs into a shortbow."
		},
		PTION_MAKING : {
			category : 6839,
			categoryNames : 6840,
			subCategory : -1,
			tool : -1,
			animation : -1,
			delay : 3,
			successText : "You carefully cut the logs into a shortbow."
		}
}

var FletchMaterial = {
		1511 : {//Normal logs
			itemID : 1511,//The item ID of the material
			useWith : [],
			type : FletchType.FLETCH_WOOD,//The main category of the fletching action
			category : 6947,//The sub category (eg "normal", "oak", "willow", etc)
			defaultProduct : 50,//The default selected product
			animation : 6702,//The crafting animation
			delay : 3//The time taken to craft products
		},
		1521 : {//Oak logs
			itemID : 1521,
			useWith : [],
			type : FletchType.FLETCH_WOOD,
			category : 6949,
			defaultProduct : 54,
			animation : 6702,
			delay : 3
		},
		1519 : {//Willow logs
			itemID : 1519,
			useWith : [],
			type : FletchType.FLETCH_WOOD,
			category : 6950,
			defaultProduct : 60,
			animation : 6702,
			delay : 3
		},
		6333 : {//Teak logs
			itemID : 6333,
			useWith : [],
			type : FletchType.FLETCH_WOOD,
			category : 6951,
			defaultProduct : 9446,
			animation : 6702,
			delay : 3
		},
		1517 : {//Maple logs
			itemID : 1517,
			useWith : [],
			type : FletchType.FLETCH_WOOD,
			category : 6952,
			defaultProduct : 64,
			animation : 6702,
			delay : 3
		},
		6332 : {//Mahogany logs
			itemID : 6332,
			useWith : [],
			type : FletchType.FLETCH_WOOD,
			category : 6953,
			defaultProduct : 9450,
			animation : 6702,
			delay : 3
		},
		1777 : {//Bow string
			itemID : 1777,
			useWith : [],
			type : FletchType.STRING_BOW,
			defaultProduct : -1,//Auto select product
			animation : -1//This shouldn't be selected as a product...
		},
		48 : {//Shieldbow (u)
			itemID : 48,
			useWith : [1777],
			type : FletchType.STRING_BOW,
			defaultProduct : 839,
			animation : 6684
		},
		50 : {//Shortbow (u)
			itemID : 50,
			useWith : [1777],
			type : FletchType.STRING_BOW,
			defaultProduct : 841,
			animation : 6678
		},
		54 : {//Oak Shortbow (u)
			itemID : 54,
			useWith : [1777],
			type : FletchType.STRING_BOW,
			defaultProduct : 843,
			animation : 6679
		},
		56 : {//Oak Shieldbow (u)
			itemID : 56,
			useWith : [1777],
			type : FletchType.STRING_BOW,
			defaultProduct : 845,
			animation : 6685
		},
		58 : {//Willow Shieldbow (u)
			itemID : 58,
			useWith : [1777],
			type : FletchType.STRING_BOW,
			defaultProduct : 847,
			animation : 6686
		},
		60 : {//Willow Shortbow (u)
			itemID : 60,
			useWith : [1777],
			type : FletchType.STRING_BOW,
			defaultProduct : 849,
			animation : 6680
		},
		52 : {//Arrow shaft
			itemID : 52,
			useWith : [314],//Feather
			type : FletchType.FEATHER_ARROW,
			category : 6966,
			defaultProduct : 53,
			animation : -1
		},
		53 : {//Headless arrow
			itemID : 53,
			useWith : [314],//Feather
			type : FletchType.FEATHER_ARROW,
			category : 6966,
			defaultProduct : 53,
			animation : -1
		},
		39 : {//Bronze arrowheads
			itemID : 39,
			useWith : [53],//Headless arrow
			type : FletchType.TIP_ARROW,
			category : 6963,
			defaultProduct : 882,
			animation : -1
		}
}

var ToolListener = Java.extend(Java.type('org.virtue.engine.script.listeners.ItemOnItemListener'), {

	/* The first option on an object */
	handleInteraction: function(player, item1, slot1, item2, slot2) {
		var material = fletchForItem(item1.getID());
		var item = item1;
		var slot = slot1;
		if (material === null || material.defaultProduct == -1) {
			//Item1 is the tool/minor material
			item = item2;
			slot = slot2;
		}
		//print("Fletching item-on-item: item1="+item1+", item2="+item2+", material="+JSON.stringify(material));
		if (material !== null || fletchForItem(item2.getID()) !== null) {
			showFletchingDialog(player, item, [slot1, slot2]);
		} else {
			api.sendMessage(player, "Unhandled fletching option: item1="+item.getID()+", item2="+item2.getID());
		}
		return true;
	}

});

var MaterialListner = Java.extend(Java.type('org.virtue.engine.script.listeners.ItemListener'), {
	
	/* The item ids to bind to */
	getItemIDs: function() {
		return [];
	},

	/* The first option on an object */
	handleInteraction: function(player, item, slot, option) {
		if (option == 1) {
			showFletchingDialog(player, item, [slot, -1]);
		} else {
			api.sendMessage(player, "Unhandled fletching option: item="+item.getID()+", option="+option);
		}
		return true;
	},
	
	/* Returns the examine text for the item, or "null" to use the default */
	getExamine : function (player, item) {
		return null;
	}

});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	
	for (var material in FletchMaterial) {
		switch (FletchMaterial[material].type) {
		case FletchType.FLETCH_WOOD:
			scriptManager.registerItemOnItemListener(new ToolListener(), FletchMaterial[material].type.tool, material);
			break;
		case FletchType.STRING_BOW:
			scriptManager.registerItemListener(new MaterialListner(), [material]);
			if (material !== 1777) {
				scriptManager.registerItemOnItemListener(new ToolListener(), 1777, material);
			}
			break;
		case FletchType.FEATHER_ARROW:
		case FletchType.TIP_ARROW:
			scriptManager.registerItemOnItemListener(new ToolListener(), FletchMaterial[material].useWith[0], material);
			break;
		}
	}
};

/**
 * Shows the dialog for the player to select the product and amount to fletch
 * @param player The player
 * @param item The currently selected item
 * @param slot The backpack slot of the selected item
 */
function showFletchingDialog (player, item, slots) {
	var materialType = fletchForItem(item.getID());
	if (materialType == null) {
		print("ERROR: No material found for item "+item);
		return;
	}
	//player.getVars().setVarp(1106, 77266977);
	api.setVarp(player, 1168, materialType.type.category);//Main category (6939 = fletching)
	api.setVarc(player, 2222, 6940);//Category text key
	if (typeof materialType.category == "number") {
		api.setVarp(player, 1169, materialType.category);//Sub category (6947 = normal logs)
	} else {
		api.setVarp(player, 1169, materialType.type.subCategory);//Sub category (6947 = normal logs)
	}	
	api.setVarp(player, 1170, materialType.defaultProduct);//Item ID
	api.openCentralWidget(player, 1370, false);
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		
		handle: function(value) {
			api.closeCentralWidgets(player);
			var productID = api.getVarp(player, 1170);
			var amount = api.getVarBit(player, 1003);
			if (amount > 0) {
				fletchProduct(player, materialType, slots, productID, amount);
			}			
		}
	
	});
	api.setInputHandler(player, new Handler());
}

function fletchForItem (itemID) {
	if (typeof FletchMaterial[itemID] == "object") {
		return FletchMaterial[itemID];
	} else {
		return null;
	}
}

function fletchProduct (player, materialType, slots, productID, amount) {
	api.setVarp(player, 1175, productID);
	api.sendMessage(player, "Selected product "+productID+", amount="+amount);	
	var animation = typeof(materialType.animation) == "number" ? materialType.animation : materialType.type.animation;
	var delay = typeof(materialType.delay) == "number" ? materialType.delay : materialType.type.delay;
	var text = materialType.type.successText;
	var action = new CraftAction(productID, animation, delay, text);
	action.setPreferedSlots(slots[0], slots.length > 1 ? slots[1] : -1);
	action.start(player, amount);
	player.setAction(action);
}