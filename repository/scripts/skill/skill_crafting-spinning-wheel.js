/**
 * @author Greco
 * @since 01/07/2017
 */

var listen = function(scriptManager) {
	var locs = [ 66850 ];//Location IDs also known as Object IDs
	var listener = new SpinningWheelListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC2, 66850, listener);
	}
};

var SpinningWheelListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPLOC1://First click object
			SpinningWheel.handleSpinning(player, locTypeId);
			return;
		case EventType.OPLOC2://Second click object
			SpinningWheel.handleSpinning(player, locTypeId);
			return;
		case EventType.OPLOC3://Third click object
			return;
		}
	}
});

var SpinningWheel = {
		
		handleSpinning : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 7081);//Main category
			api.setVarc(player, 2222, 7081);//Category text key
			api.setVarp(player, 1169, 7046);//Sub category
			if (typeof(7046) === "number") {
				api.setVarp(player, 1170, 1759);//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 1759;//Selects the product (ItemID) from the given varp / category above - setVarp 1168.
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 1563 : 1563;
						var text = productData !== undefined && "You spin the item." !== undefined ? "You spin the item." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}