/**
 * @author Greco
 * @since 01/07/2017
 */

var listen = function(scriptManager) {
	var npc = [ 2824, 14877 ];
	var listener = new HideTanningListener();
	for (var i in npc) {
		scriptManager.registerListener(EventType.OPNPC3, 2824, listener);
		scriptManager.registerListener(EventType.OPNPC4, 14877, listener);
	}
};

var HideTanningListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npc, args) {
		var player = args.player;
		
		switch (event) {
		case EventType.OPNPC3:
			HideTanning.handleTanning(player, npc);
			return;
		case EventType.OPNPC4:
			HideTanning.handleTanning(player, npc);
			return;
		case EventType.OPNPC5:
			return;
		}
	}
});

var HideTanning = {
		
		handleTanning : function (player, itemId, slot, productId, locTypeId) {
			api.setVarp(player, 1168, 7081);//Main category
			api.setVarc(player, 2222, 7081);//Category text key
			api.setVarp(player, 1169, 6989);//Sub category
			if (typeof(6989) === "number") {
				api.setVarp(player, 1170, 1741);
			}
			api.openCentralWidget(player, 1370, false);
			var that = this;
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {				
				handle: function(value) {
					api.closeCentralWidgets(player);
					productId = api.getVarp(player, 1170);
					var amount = api.getVarBit(player, 1003);
					var productData = 1741;
					if (amount > 0) {
						api.setVarp(player, 1175, productId);
						var animation = productData !== undefined ? 25594 : 25594;
						var text = productData !== undefined && "You tan the hide." !== undefined ? "You tan the hide." : material.type.text+configApi.objName(productId);
						CraftProcess.startCrafting(player, amount, animation, text);
					}			
				}			
			});
			api.setInputHandler(player, new Handler());
		}		
}