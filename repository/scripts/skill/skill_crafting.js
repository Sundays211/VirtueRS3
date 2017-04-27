/**
 * @author Greco
 * @since 01/04/2017
 */

var OpHeldUseListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;		
		var itemId = api.getId(args.item);
		var useitemId = api.getId(args.useitem);
		var slot = args.slot;
		
		var validUse = false;
		var product = null;
		switch (itemId) {

		}
		
		if (validUse) {
			Crafting.handleCraft(player, itemId, slot, product);
		} else {
			defaultOpHeldUseHandler(player, args);
		}
	}
});

var OpHeldListner = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		Crafting.handleCraft(player, api.getId(args.item), args.slot);
	}
});



/* Listen to the item ids specified */
var listen = function(scriptManager) {
	Crafting.initMaterialLookup();
	Crafting.initProductLookup();
	var items = [24374,2509,2507,2505,1745,1741,1743,25551,25549,25547,25545,6289,1625,1627,1629,
	1623,1621,1619,1617,1631,6571,31853,1607,2861,1611,1613,1605,1603,1601,1615,6573,31855,569,571,573,575];
	var opHeldListener = new OpHeldListner();
	var opHeldUseListener = new OpHeldUseListener();
	for (var i in items) {
	scriptManager.registerListener(EventType.OPHELD1, items[i], opHeldListener);//
	}
	
	
};

var Crafting = {
		MaterialType : {
			LEATHER : {
				category : 6987,
				categoryNames : 6988,
				text : "You craft the hide into ",
				animation : 25594
			},
			GEMS : {
				category : 6981,
				categoryNames : 6982,
				text : "You cut the gem into ",
				animation : 22774
			},
			BATTLESTAVES : {
				category : 6974,
				categoryNames : 1187,
				text : "You attach the orb to the staff and create a ",
				animation : 16446
			}

		},
		materialLookup : {},
		initMaterialLookup : function () {
			this.materialLookup = {};
			var that = this;
			function addMaterial (id, category, type) {
				that.materialLookup[id] = {
						"id" : id, 
						"category" : category,
						"type" : type
						};
			}
			addMaterial(24374, 6997, this.MaterialType.LEATHER);//
			addMaterial(2509, 6996, this.MaterialType.LEATHER);//
			addMaterial(2507, 6995, this.MaterialType.LEATHER);//
			addMaterial(2505, 6994, this.MaterialType.LEATHER);//
			addMaterial(1745, 6993, this.MaterialType.LEATHER);//
			addMaterial(1741, 6991, this.MaterialType.LEATHER);//
			addMaterial(1743, 6991, this.MaterialType.LEATHER);//
			addMaterial(25551, 7003, this.MaterialType.LEATHER);//
			addMaterial(25545, 7002, this.MaterialType.LEATHER);//
			addMaterial(25547, 7001, this.MaterialType.LEATHER);//
			addMaterial(25549, 7000, this.MaterialType.LEATHER);//
			addMaterial(6289, 6992, this.MaterialType.LEATHER);//
			
			addMaterial(1625, 6983, this.MaterialType.GEMS);//
			addMaterial(1627, 6983, this.MaterialType.GEMS);//
			addMaterial(1629, 6983, this.MaterialType.GEMS);//
			addMaterial(1623, 6983, this.MaterialType.GEMS);//
			addMaterial(1621, 6983, this.MaterialType.GEMS);//
			addMaterial(1619, 6983, this.MaterialType.GEMS);//
			addMaterial(1617, 6983, this.MaterialType.GEMS);//
			addMaterial(1631, 6983, this.MaterialType.GEMS);//
			addMaterial(6571, 6983, this.MaterialType.GEMS);//
			addMaterial(31853, 6983, this.MaterialType.GEMS);//
			addMaterial(1607, 6961, this.MaterialType.GEMS);//
			
			addMaterial(2861, 6961, this.MaterialType.GEMS);//
			addMaterial(1611, 6961, this.MaterialType.GEMS);//
			addMaterial(1613, 6961, this.MaterialType.GEMS);//
			addMaterial(1605, 6961, this.MaterialType.GEMS);//
			addMaterial(1603, 6961, this.MaterialType.GEMS);//
			addMaterial(1601, 6961, this.MaterialType.GEMS);//
			addMaterial(1615, 6961, this.MaterialType.GEMS);//
			addMaterial(6573, 6961, this.MaterialType.GEMS);//
			addMaterial(31855, 6961, this.MaterialType.GEMS);//
			addMaterial(2859, 6961, this.MaterialType.GEMS);//
			
			addMaterial(569, 6974, this.MaterialType.BATTLESTAVES);//
			addMaterial(571, 6974, this.MaterialType.BATTLESTAVES);//
			addMaterial(573, 6974, this.MaterialType.BATTLESTAVES);//
			addMaterial(575, 6974, this.MaterialType.BATTLESTAVES);//
			
			
		},
		productLookup : {},
		initProductLookup : function () {
			this.productLookup = {};
			var that = this;
			function addProduct (id, animation, text) {
				that.productLookup[id] = {"id":id, "animation":animation, "text":text};
			}
			//Used when the standard animation, specified in MaterialType, isn't appropriate for this product
			addProduct(1397, 16446, "You make an Air battlestaff.");
			addProduct(1399, 16447, "You make an Earth battlestaff.");
			addProduct(1395, 16448, "You make a Water battlestaff.");
			addProduct(1393, 16449, "You make a Fire battlestaff.");
			addProduct(21777, 16450, "You make an Armadyl battlestaff.");
			
		},
		handleCraft : function (player, itemId, slot, productId) {
			var material = this.materialLookup[itemId];
			if (material === undefined) {
				throw "Unsupported material: "+itemId;
			}
			api.setVarp(player, 1168, material.type.category);
			api.setVarc(player, 2222, material.type.categoryNames);
			api.setVarp(player, 1169, material.category);
			if (typeof(productId) === "number") {
				api.setVarp(player, 1170, productId);
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = that.productLookup[productId];
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? productData.animation : material.type.animation;
						var text = productData !== undefined && productData.text !== undefined ? productData.text : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}
}