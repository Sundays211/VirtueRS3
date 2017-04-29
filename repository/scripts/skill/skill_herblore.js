/**
 * @author Greco
 * @since 12/20/2016
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
			Herblore.handleCraft(player, itemId, slot, product);
		} else {
			defaultOpHeldUseHandler(player, args);
		}
	}
});

var OpHeldListner = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		Herblore.handleCraft(player, api.getId(args.item), args.slot);
	}
});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	Herblore.initMaterialLookup();
	Herblore.initProductLookup();
	
	var opHeldListener = new OpHeldListner();
	var opHeldUseListener = new OpHeldUseListener();
	
	
	for (var ordinal in CleaningHerbsArray) {
		for(var i = 0; i < CleaningHerbsArray[ordinal].ids.length; i++) {
	        scriptManager.registerListener(EventType.OPHELD1, CleaningHerbsArray[ordinal].ids[i], opHeldListener);
	    }
	}
	
	for (var ordinal in UnfinishedPotionsArray) {
		for(var i = 0; i < UnfinishedPotionsArray[ordinal].ids.length; i++) {
	        scriptManager.registerListener(EventType.OPHELDU, UnfinishedPotionsArray[ordinal].ids[i], opHeldListener);
	    }
	}
	
	//Finished Potions
	scriptManager.registerListener(EventType.OPHELDU, 91, opHeldListener);
	
	
	//Juju Herbs
	scriptManager.registerListener(EventType.OPHELD1, 19984, opHeldListener);
	
};

var CleaningHerbsArray = {
		CLEANING : {	
			ids : [199, 201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 2485, 3049, 3051, 12172, 14836, 21626],
		}			
}

var UnfinishedPotionsArray = {
		UNFPOTIONS : {	
			ids : [249, 251, 253, 255, 257, 259, 261, 263, 265, 267, 269, 2481, 2998, 3000, 12174, 14854, 21624, 227],
		}			
}

var Herblore = {
		MaterialType : {
			HERBS : {
				category : 6838,
				categoryNames : 6839,
				text : "You clean the ",
				animation : 22756
			},
			UNFINISHED : {
				category : 6838,
				categoryNames : 6839,
				text : "You mix the ",
				animation : 24896
			},
			FINISHED : {
				category : 6838,
				categoryNames : 6839,
				text : "You mix the ",
				animation : 24896
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
			
			//Cleaning Herbs
			addMaterial(199, 6841, this.MaterialType.HERBS);
			addMaterial(201, 6841, this.MaterialType.HERBS);
			addMaterial(203, 6841, this.MaterialType.HERBS);
			addMaterial(205, 6841, this.MaterialType.HERBS);
			addMaterial(207, 6841, this.MaterialType.HERBS);
			addMaterial(209, 6841, this.MaterialType.HERBS);
			addMaterial(211, 6841, this.MaterialType.HERBS);
			addMaterial(213, 6841, this.MaterialType.HERBS);
			addMaterial(215, 6841, this.MaterialType.HERBS);
			addMaterial(217, 6841, this.MaterialType.HERBS);
			addMaterial(219, 6841, this.MaterialType.HERBS);
			addMaterial(2485, 6841, this.MaterialType.HERBS);			
			addMaterial(3049, 6841, this.MaterialType.HERBS);
			addMaterial(3051, 6841, this.MaterialType.HERBS);
			addMaterial(12172, 6841, this.MaterialType.HERBS);
			addMaterial(14836, 6841, this.MaterialType.HERBS);
			addMaterial(21626, 6841, this.MaterialType.HERBS);
			
			//Unfinished Potions
			addMaterial(249, 6842, this.MaterialType.UNFINISHED);
			addMaterial(251, 6842, this.MaterialType.UNFINISHED);
			addMaterial(253, 6842, this.MaterialType.UNFINISHED);
			addMaterial(255, 6842, this.MaterialType.UNFINISHED);
			addMaterial(257, 6842, this.MaterialType.UNFINISHED);
			addMaterial(259, 6842, this.MaterialType.UNFINISHED);
			addMaterial(261, 6842, this.MaterialType.UNFINISHED);
			addMaterial(263, 6842, this.MaterialType.UNFINISHED);
			addMaterial(265, 6842, this.MaterialType.UNFINISHED);
			addMaterial(267, 6842, this.MaterialType.UNFINISHED);
			addMaterial(269, 6842, this.MaterialType.UNFINISHED);
			addMaterial(2481, 6842, this.MaterialType.UNFINISHED);
			addMaterial(2998, 6842, this.MaterialType.UNFINISHED);
			addMaterial(3000, 6842, this.MaterialType.UNFINISHED);
			addMaterial(12174, 6842, this.MaterialType.UNFINISHED);
			addMaterial(14854, 6842, this.MaterialType.UNFINISHED);
			addMaterial(21624, 6842, this.MaterialType.UNFINISHED);
			
			//Finished Potions
			addMaterial(91, 6843, this.MaterialType.UNFINISHED);
			
			
			
			//Cleaning Juju Herbs
			addMaterial(19984, 6845, this.MaterialType.HERBS);
			
		},
		productLookup : {},
		initProductLookup : function () {
			this.productLookup = {};
			var that = this;
			function addProduct (id, animation, text) {
				that.productLookup[id] = {"id":id, "animation":animation, "text":text};
			}
			
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