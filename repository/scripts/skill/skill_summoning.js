/**
 * @author Greco
 * @since 12/10/2016
 */

var listen = function(scriptManager) {
	var locs = [ 67036, 94230 ];//Location IDs also known as Object IDs
	var listener = new SummoningListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, 67036, listener);
		scriptManager.registerListener(EventType.OPLOC1, 94230, listener);
	}
};

var SummoningListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1://First click object
			Summoning.handleSummoning(player, locTypeId);
			return;
		}
	}
});

var Summoning = {
		
		handleSummoning : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 6932);//Main category
			api.setVarc(player, 2222, 6933);//Category text key
			api.setVarp(player, 1169, 6934);//Sub category
			if (typeof(6934) === "number") {
				api.setVarp(player, 1170, 12047);//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 12047;//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 8500 : 8500;
						var text = productData !== undefined && "You infuse the materials." !== undefined ? "You infuse the materials." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}