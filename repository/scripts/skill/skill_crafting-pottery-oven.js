/**
 * @author Greco
 * @since 01/06/2017
 */

var listen = function(scriptManager) {
	var locs = [ 66847 ];//Location IDs also known as Object IDs
	var listener = new PotteryOvenListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, 66847, listener);
	}
};

var PotteryOvenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1://First click object
			PotteryOven.handlePottery(player, locTypeId);
			return;
		case EventType.OPLOC2://Second click object
			PotteryOven.handlePottery(player, locTypeId);
			return;
		case EventType.OPLOC3://Third click object
			return;
		}
	}
});

var PotteryOven = {
		
		handlePottery : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 7006);//Main category
			api.setVarc(player, 2222, 7007);//Category text key
			api.setVarp(player, 1169, 7015);//Sub category
			if (typeof(7015) === "number") {
				api.setVarp(player, 1170, 1931);//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 1931;//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 24975 : 24975;
						var text = productData !== undefined && "You make an item." !== undefined ? "You make an item." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}