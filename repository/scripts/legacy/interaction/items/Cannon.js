/**
 * @Author Kayla
 */
var ItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, itemTypeId, args) {
		var player = args.player;
		var slot = args.slot;
		
		//api.delCarriedItem(player, itemTypeId, 1, slot);
		//ProcessCannon(player);
	}

});

function ProcessCannon (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.runAnimation(player, 827);
				var loc = api.createLocation(7, player.getCurrentTile(), 10, 0);
				api.spawnLocation(loc);
			} else if (frame == 3) {
				api.runAnimation(player, 827);
				api.transformLoc(loc, 8, 999999);
				api.delCarriedItem(player, 8, 1);
			} else if (frame == 6) {
				api.runAnimation(player, 827);
				api.transformLoc(loc, 9, 999999);
				api.delCarriedItem(player, 10, 1);
			} else if (frame == 9) {
				api.runAnimation(player, 827);
				api.transformLoc(loc, 6, 999999);
				api.delCarriedItem(player, 12, 1);
			} else if (frame == 20) {
				api.destroyLoc(loc);
				api.addCarriedItem(player, 6, 1);
				api.addCarriedItem(player, 8, 1);
				api.addCarriedItem(player, 10, 1);
				api.addCarriedItem(player, 12, 1);
			}
			frame++;
			return false;
		},
		stop : function (player) {
			api.stopAnimation(player);
			api.clearSpotAnim(player, 1);
		}
	});
	player.setAction(new Action());
}

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var loc = args.location;
		
		if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
			api.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		
		switch (locTypeId) {
			case 6://Cannon Full
				api.destroyLoc(loc);
				return true;
			case 7://Cannon Full
				api.destroyLoc(loc);
				return true;
			default:
				return false;
		}		
	}
});

var listen = function(scriptManager) {
	var itemListener = new ItemListener();
	scriptManager.registerListener(EventType.OPHELD1, 6, itemListener);
	
	var listener = new LocationListener();
	scriptManager.registerListener(EventType.OPLOC2, 6, listener);//Cannon
	scriptManager.registerListener(EventType.OPLOC1, 7, listener);//Cannon base
}