/**
 * @author Greco
 * @since 01/05/2017
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
			Weaving.handleWeave(player, itemId, slot, product);
		} else {
			defaultOpHeldUseHandler(player, args);
		}
	}
});

var OpHeldListner = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		Weaving.handleWeave(player, api.getId(args.item), args.slot);
	}
});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	Weaving.initMaterialLookup();
	Weaving.initProductLookup();
	var items = [29313,29314,229315,29316,29317,29318,29319,29320,29321,29322,29323,29324];
	var opHeldListener = new OpHeldListner();
	var opHeldUseListener = new OpHeldUseListener();
	for (var i in items) {
	scriptManager.registerListener(EventType.OPHELD1, items[i], opHeldListener);
	}
};



var Weaving = {
		MaterialType : {
			WEAVE : {
				category : 7812,
				categoryNames : 7813,
				text : "You successfully weave the energy into: ",
				animation : 21248 //21248 or 21225
				//TODO Add SpotAnim(Graphic) to CraftProcess
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
			addMaterial(29313, 7814, this.MaterialType.WEAVE);
			addMaterial(29314, 7815, this.MaterialType.WEAVE);
			addMaterial(29315, 7816, this.MaterialType.WEAVE);
			addMaterial(29316, 7817, this.MaterialType.WEAVE);
			addMaterial(29317, 7818, this.MaterialType.WEAVE);
			addMaterial(29318, 7819, this.MaterialType.WEAVE);
			addMaterial(29319, 7820, this.MaterialType.WEAVE);
			addMaterial(29320, 7821, this.MaterialType.WEAVE);
			addMaterial(29321, 7822, this.MaterialType.WEAVE);
			addMaterial(29322, 7823, this.MaterialType.WEAVE);
			addMaterial(29323, 7824, this.MaterialType.WEAVE);
			addMaterial(29324, 7825, this.MaterialType.WEAVE);
			
			
		},
		productLookup : {},
		initProductLookup : function () {
			this.productLookup = {};
			var that = this;
			function addProduct (id, animation, text) {
				that.productLookup[id] = {"id":id, "animation":animation, "text":text};
			}

		},
		handleWeave : function (player, itemId, slot, productId) {
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