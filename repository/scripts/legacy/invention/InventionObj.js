/**
 * @author Greco
 */

var listen = function(scriptManager) {
	var locs = [ 100874 ];
	var listener = new InventListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, 100874, listener);
	}
};

var InventListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1:
			Manufacture.handleManufacture(player, locTypeId);
			return;
		case EventType.OPLOC2:
			Manufacture.handleManufacture(player, locTypeId);
			return;
		}
	}
});

var Manufacture = {
		handleManufacture : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 10738);
			api.setVarc(player, 2222, 10739);
			api.setVarp(player, 1169, 10740);
			if (typeof(10740) === "number") {
				api.setVarp(player, 1170, 36719);
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 36719;
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 27997 : 27997;
						var text = productData !== undefined && "You create the device." !== undefined ? "You create the device." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}