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
		
		startDisassembly : function (player, item, slot) {
			var itemId = configApi.objUncert(api.getId(item));
			var total = Math.min(60, api.itemTotal(player, Inv.BACKPACK, api.getId(item)));
			CraftProcess.openInterface(player, itemId, 10740, total, 2);
			var remaining = total;
			var disassembleItem = function () {
				api.sendMessage(player, "TODO: Add materials from item "+itemId);
				api.delItem(player, Inv.BACKPACK, api.getId(item), 1);
				remaining--;
				CraftProcess.setRemaining(player, remaining);
				api.setSpotAnim(player, 1, 6003);
				api.runAnimation(player, 27997);
				if (remaining > 0) {
					delay(player, 2, disassembleItem);
				}
			};
			delay(player, 2, disassembleItem, true, function () {
				api.closeOverlaySub(player, 1018, true);
			});
			
		},
		
		getMaterials : function (player, materialId) {
			//Clientscript 12054 for material varps
			switch (materialId) {
			case 1:
				return api.getVarp(player, 5997);
			case 2:
				return api.getVarp(player, 5998);
			case 3:
				return api.getVarp(player, 5999);
			case 4:
				return api.getVarp(player, 6000);
			case 5:
				return api.getVarp(player, 6001);
			case 6:
				return api.getVarp(player, 6002);
			case 7:
				return api.getVarp(player, 6003);
			case 8:
				return api.getVarp(player, 6004);
			case 9:
				return api.getVarp(player, 6005);
			case 10:
				return api.getVarp(player, 6006);
			case 11:
				return api.getVarp(player, 6007);
			case 12:
				return api.getVarp(player, 6008);
			case 13:
				return api.getVarp(player, 6009);
			case 14:
				return api.getVarp(player, 6010);
			case 15:
				return api.getVarp(player, 6011);
			case 16:
				return api.getVarp(player, 6012);
			case 17:
				return api.getVarp(player, 6013);
			case 18:
				return api.getVarp(player, 6014);
			case 19:
				return api.getVarp(player, 6015);
			case 20:
				return api.getVarp(player, 6016);
			case 21:
				return api.getVarp(player, 6017);
			case 22:
				return api.getVarp(player, 6018);
			case 23:
				return api.getVarp(player, 6019);
			case 100:
				return api.getVarp(player, 6020);
			case 101:
				return api.getVarp(player, 6021);
			case 102:
				return api.getVarp(player, 6022);
			case 103:
				return api.getVarp(player, 6023);
			case 104:
				return api.getVarp(player, 6024);
			case 105:
				return api.getVarp(player, 6025);
			case 106:
				return api.getVarp(player, 6064);
			case 107:
				return api.getVarp(player, 6065);
			case 108:
				return api.getVarp(player, 6026);
			case 109:
				return api.getVarp(player, 6027);
			case 110:
				return api.getVarp(player, 6028);
			case 111:
				return api.getVarp(player, 6029);
			case 112:
				return api.getVarp(player, 6030);
			case 113:
				return api.getVarp(player, 6031);
			case 114:
				return api.getVarp(player, 6032);
			case 115:
				return api.getVarp(player, 6033);
			case 116:
				return api.getVarp(player, 6034);
			case 117:
				return api.getVarp(player, 6035);
			case 118:
				return api.getVarp(player, 6036);
			case 119:
				return api.getVarp(player, 6037);
			case 120:
				return api.getVarp(player, 6038);
			case 121:
				return api.getVarp(player, 6039);
			case 122:
				return api.getVarp(player, 6040);
			case 123:
				return api.getVarp(player, 6041);
			case 125:
				return api.getVarp(player, 6042);
			case 126:
				return api.getVarp(player, 6043);
			case 127:
				return api.getVarp(player, 6044);
			case 128:
				return api.getVarp(player, 6045);
			case 131:
				return api.getVarp(player, 6046);
			case 132:
				return api.getVarp(player, 6047);
			case 145:
				return api.getVarp(player, 6062);
			case 129:
				return api.getVarp(player, 6048);
			case 124:
				return api.getVarp(player, 6049);
			case 130:
				return api.getVarp(player, 6050);
			case 133:
				return api.getVarp(player, 6051);
			case 134:
				return api.getVarp(player, 6052);
			case 135:
				return api.getVarp(player, 6053);
			case 136:
				return api.getVarp(player, 6054);
			case 137:
				return api.getVarp(player, 6055);
			case 138:
				return api.getVarp(player, 6056);
			case 139:
				return api.getVarp(player, 6057);
			case 140:
				return api.getVarp(player, 6058);
			case 142:
				return api.getVarp(player, 6059);
			case 143:
				return api.getVarp(player, 6060);
			case 144:
				return api.getVarp(player, 6061);
			case 146:
				return api.getVarp(player, 6063);
			case 141:
				return api.getVarp(player, 6066);
			default:
				return 0;
			}
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