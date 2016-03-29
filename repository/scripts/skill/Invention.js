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

/**
 * Handles the Invention CraftAction
 *  @author Alex
 */

var Inventions = {//
		Inventions : {
			itemID : 52,
			category : 6966,
			animation : 27997,
			defaultProduct : 53
		}
}

var InventType = {	//	
		INVENT : {
			category : 10738,
			categoryNames : 10739,
			subCategory : -1,
			tool : -1,
			animation : 27997,
			delay : 3,
			successText : "You carefully make device."
		}
}

var InventMaterial = {//
		31846 : {//
			itemId : 31846,
			useWith : [],
			type : InventType.INVENT,
			category : 10740,
			defaultProduct : 36389,
			animation : 27997
			//6003 = disassembly spotanim
		}
}
//varbit 30224 = invention enabled
var ToolListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;		
		var item = args.item;
		var slot = args.slot;
		
		var material = Invention.productForItem(objTypeId);
		
		if (material === null || material.defaultProduct == -1) {
			//Item1 is the tool/minor material
			item = args.useitem;
			slot = args.useslot;
		}
		if (material !== null || Invention.productForItem(api.getId(args.useitem)) !== null) {
			Invention.showInventDialog(player, item, [args.slot, args.useslot]);
		} else {
			defaultOpHeldUseHandler(player, args);
		}
		return;
	}
});

var MaterialListner = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var item = args.item;
		var slot = args.slot;
		Invention.showInventDialog(player, item, [slot, -1]);
	}
});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	var materialListener = new MaterialListner();
	var toolListener = new ToolListener();
	
	for (var i in InventMaterial) {
		var material = InventMaterial[i];
		
		switch (material.type) {
		case InventType.INVENT:
			scriptManager.registerListener(EventType.OPHELD1, material.itemId, materialListener);
			break;
		}
	}
};

var Invention = {
		/**
		 * Shows the dialog for the player to select the product and amount to fletch
		 * @param player The player
		 * @param item The currently selected item
		 * @param slot The backpack slot of the selected item
		 */
		showInventDialog : function (player, item, slots) {
			var materialType = this.productForItem(api.getId(item));
			if (materialType == null) {
				print("ERROR: No material found for item "+item);
				return;
			}
			api.setVarp(player, 1168, materialType.type.category);//Main category
			api.setVarc(player, 2222, 10739);//Category text key
			if (typeof materialType.category == "number") {
				api.setVarp(player, 1169, materialType.category);//Sub category
			} else {
				api.setVarp(player, 1169, materialType.type.subCategory);//Sub category
			}	
			api.setVarp(player, 1170, materialType.defaultProduct);//Item ID
			api.openCentralWidget(player, 1370, false);
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
				
				handle: function(value) {
					api.closeCentralWidgets(player);
					var productID = api.getVarp(player, 1170);
					var count = api.getVarBit(player, 1003);
					if (count > 0) {
						Invention.processInvention(player, materialType, slots, productID, count);
					}			
				}
			
			});
			api.setInputHandler(player, new Handler());
		},
		
		productForItem : function (itemID) {
			if (typeof InventMaterial[itemID] == "object") {
				return InventMaterial[itemID];
			} else {
				return null;
			}
		},
		
		processInvention : function (player, materialType, slots, productID, amount) {
			api.setVarp(player, 1175, productID);
			api.sendMessage(player, "Selected product "+productID+", amount="+amount);	
			var animation = typeof(materialType.animation) == "number" ? materialType.animation : materialType.type.animation;
			var delay = typeof(materialType.delay) == "number" ? materialType.delay : materialType.type.delay;
			var text = materialType.type.successText;
			CraftProcess.startCrafting(player, amount, animation, text);
			/*var action = new CraftAction(productID, animation, delay, text);
			action.setPreferedSlots(slots[0], slots.length > 1 ? slots[1] : -1);
			action.start(player, amount);
			player.setAction(action);*/
		}

}





