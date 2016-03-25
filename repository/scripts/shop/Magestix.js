/**
 *  @author Alex
 */

var MagestixListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		if (event == EventType.OPNPC1) {
			chatnpc(player, npc, "If you want to know how to bring forth magical creatures from the ether, you've come to the right place!", function () {
				Magestix.maintalk(player, npc);
	       });	  
		} else if (event == EventType.OPNPC5) {
			Magestix.openshop(player);
		}
	}
});

var listen = function(scriptManager) {
	var listener = new MagestixListener();
	scriptManager.registerListener(EventType.OPNPC1, 14866, listener);
	scriptManager.registerListener(EventType.OPNPC5, 14866, listener);
};

var Magestix = {
		
		maintalk : function (player, npc) {
				multi3(player, "CHOOSE AN OPTION", "I need summoning supplies.", function () {		
					Magestix.openshop(player);
				}, "I want to train summoning.", function () {
					Magestix.howtotrain(player, npc);
				}, "Tell me more about summoning.", function () {
					Magestix.moreinfo(player, npc);
				});
				return;
		},
		
		openshop : function (player) {
			api.setVarp(player, 304, Inv.SUMMONING_SHOP_1);
			api.setVarp(player, 305, Inv.SUMMONING_SHOP_FREE);
			api.setVarc(player, 2360, "Magestix's Summoning Shop");
			api.openCentralWidget(player, 1265, false);
		},

		howtotrain : function (player, npc) {
			chatnpc(player, npc, "You need to create pouches, by combining reagents with spirit shards.", function () {	
			}); 
		},

		moreinfo : function (player, npc) {
			chatnpc(player, npc, "There is another world, besides this one. That world is filled with wondrous creatures, great and small. Summoning is the art of drawing those creatures forth to server you.", function () {
				chatnpc(player, npc, "By combining rare reagents with our spirit shards, you can create pouches to perform this act.", function () {
					
				}); 
				});
		},

		farewell : function (player, npc) {
			chatnpc(player, npc, "Thank you for the information about Summoning.", function () {	
			}); 
		}
}