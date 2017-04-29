/**
 * @author Greco
 * @since 03/01/2017
 */

var listen = function(scriptManager) {
	var locs = [ 66849 ];//Location IDs also known as Object IDs
	var listener = new LoomListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, 66849, listener);
	}
};

var LoomListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1://First click object
			Loom.handleLoom(player, locTypeId);
			return;
		case EventType.OPLOC2://Second click object
			Loom.handleLoom(player, locTypeId);
			return;
		case EventType.OPLOC3://Third click object
			return;
		}
	}
});

var Loom = {
		
		handleLoom : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 7042);//Main category
			api.setVarc(player, 2222, 7043);//Category text key
			api.setVarp(player, 1169, 7044);//Sub category
			if (typeof(7044) === "number") {
				api.setVarp(player, 1170, 3224);//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 3224;//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 2270 : 2270;
						var text = productData !== undefined && "You weave the materials together." !== undefined ? "You weave the materials together." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}