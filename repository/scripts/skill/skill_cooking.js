/**
 * @author Greco
 * @since 01/07/2017
 */

var listen = function(scriptManager) {
	var locs = [ 114, 5275, 24283, 61333, 63209, 66892, 76295, 94064 ];//Location IDs also known as Object IDs
	var listener = new CookingListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, 114, listener);
		scriptManager.registerListener(EventType.OPLOC1, 5275, listener);
		scriptManager.registerListener(EventType.OPLOC1, 24283, listener);
		scriptManager.registerListener(EventType.OPLOC1, 61333, listener);
		scriptManager.registerListener(EventType.OPLOC1, 63209, listener);
		scriptManager.registerListener(EventType.OPLOC1, 76295, listener);
		scriptManager.registerListener(EventType.OPLOC1, 94064, listener);
		scriptManager.registerListener(EventType.OPLOC2, 66892, listener);
	}
};

var CookingListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1:
			Cooking.handleCooking(player, locTypeId);
			return;
		case EventType.OPLOC2:
			Cooking.handleCooking(player, locTypeId);
			return;
		}
	}
});

var Cooking = {
		handleCooking : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 6794);
			api.setVarc(player, 2222, 6795);
			api.setVarp(player, 1169, 6797);
			if (typeof(6797) === "number") {
				api.setVarp(player, 1170, 315);
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 315;
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 25650 : 25650;
						var text = productData !== undefined && "You successfully cook the food." !== undefined ? "You successfully cook the food." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}