/**
 * @author Greco
 * @since 12/23/2016
 */

var listen = function(scriptManager) {
	var locs = [ 11666, 45310, 61330, 76293, 67465, 67467 ];//Location IDs also known as Object IDs
	var listener = new SmeltingListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC2, 11666, listener);
		scriptManager.registerListener(EventType.OPLOC2, 45310, listener);
		scriptManager.registerListener(EventType.OPLOC2, 61330, listener);
		scriptManager.registerListener(EventType.OPLOC2, 67465, listener);
		scriptManager.registerListener(EventType.OPLOC2, 67467, listener);
		scriptManager.registerListener(EventType.OPLOC2, 76293, listener);
	}
};

var SmeltingListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1://First click object
			Smelting.handleSmelting(player, locTypeId);
			return;
		case EventType.OPLOC2://Second click object
			Smelting.handleSmelting(player, locTypeId);
			return;
		case EventType.OPLOC3://Third click object
			return;
		}
	}
});

var Smelting = {
		
		handleSmelting : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 7079);//Main category
			api.setVarc(player, 2222, 7080);//Category text key
			api.setVarp(player, 1169, 7083);//Sub category
			if (typeof(7083) === "number") {
				api.setVarp(player, 1170, 2349);//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 2349;//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 22142 : 22142;
						var text = productData !== undefined && "You smelt the item." !== undefined ? "You smelt the item." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}