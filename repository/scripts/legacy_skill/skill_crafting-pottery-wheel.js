/**
 * @author Greco
 * @since 01/06/2017
 */

var listen = function(scriptManager) {
	var locs = [ 66848 ];//Location IDs also known as Object IDs
	var listener = new PotteryWheelListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, 66848, listener);
	}
};

var PotteryWheelListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1://First click object
			PotteryWheel.handlePottery(player, locTypeId);
			return;
		case EventType.OPLOC2://Second click object
			PotteryWheel.handlePottery(player, locTypeId);
			return;
		case EventType.OPLOC3://Third click object
			return;
		}
	}
});

var PotteryWheel = {
		
		handlePottery : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 7004);//Main category
			api.setVarc(player, 2222, 7005);//Category text key
			api.setVarp(player, 1169, 7014);//Sub category
			if (typeof(7014) === "number") {
				api.setVarp(player, 1170, 1787);//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 1787;//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 883 : 883;
						var text = productData !== undefined && "You make an item." !== undefined ? "You make an item." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}