/**
 * @author Greco
 * @since 12/23/2016
 */

var listen = function(scriptManager) {
	var locs = [ 2783,12692,67468 ];//Location IDs also known as Object IDs
	var listener = new SmithingListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, 2783, listener);
		scriptManager.registerListener(EventType.OPLOC1, 12692, listener);
		scriptManager.registerListener(EventType.OPLOC1, 67468, listener);
	}
};

var SmithingListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1://First click object
			Smithing.handleSmithing(player, locTypeId);
			return;
		case EventType.OPLOC2://Second click object
			Smithing.handleSmithing(player, locTypeId);
			return;
		case EventType.OPLOC3://Third click object
			return;
		}
	}
});

var Smithing = {
		
		handleSmithing : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 7081);//Main category 7046
			api.setVarc(player, 2222, 7082);//Category text key
			api.setVarp(player, 1169, 7085);//Sub category
			if (typeof(7085) === "number") {
				api.setVarp(player, 1170, 1205);//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 1205;//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 22143 : 22143;
						var text = productData !== undefined && "You smith the item." !== undefined ? "You smith the item." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}