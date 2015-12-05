/**
 * @Author Kayla
 */
var SceneLocation = Java.type('org.virtue.model.entity.region.SceneLocation');
var ItemListener = Java.extend(Java.type('org.virtue.script.listeners.ItemListener'), {
	
	/* The item ids to bind to */
	getItemIDs: function() {
		return [ 6 ];
	},

	/* The first option on an object */
	handleInteraction: function(player, item, slot, option) {
		switch(item.getId()) {
		case 6://Process Cannon
			switch (option) {
			case 1:
				//api.delCarriedItem(player, item.getId(), 1, slot);
				//ProcessCannon(player);
				return true;
			}
			return true;
		default:
			return false;
		}
	},
	
	getExamine : function (player, item) {
		return null;
	}

});

function ProcessCannon (player) {
	var frame = 0;
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {
				api.runAnimation(player, 827);
				SceneLocation = api.createLocation(7, player.getCurrentTile(), 10, 0);
				api.spawnLocation(SceneLocation);
			} else if (frame == 3) {
				api.runAnimation(player, 827);
				api.transformLoc(SceneLocation, 8, 999999);
				api.delCarriedItem(player, 8, 1);
			} else if (frame == 6) {
				api.runAnimation(player, 827);
				api.transformLoc(SceneLocation, 9, 999999);
				api.delCarriedItem(player, 10, 1);
			} else if (frame == 9) {
				api.runAnimation(player, 827);
				api.transformLoc(SceneLocation, 6, 999999);
				api.delCarriedItem(player, 12, 1);
			} else if (frame == 20) {
				api.destroyLoc(SceneLocation);
				api.addCarriedItem(player, 6, 1);
				api.addCarriedItem(player, 8, 1);
				api.addCarriedItem(player, 10, 1);
				api.addCarriedItem(player, 12, 1);
			}
			frame++;
			return false;
		},
		stop : function (player) {
			player.queueUpdateBlock(new AnimationBlock(-1));
			player.queueUpdateBlock(new GraphicsBlock(1, -1));
		}
	});
	player.setAction(new Action());
}

var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The location ids to bind to */
	getIDs : function() {
		return [ 6, 7 ];
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		if (option != 1) {
			return false;
		}
		
		if (api.freeSpaceTotal(player, "backpack") < 1) {
			api.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		
		switch (object.getID()) {
			case 6://Cannon Full
				api.destroyLoc(SceneLocation);
				return true;
			case 7://Cannon Full
				api.destroyLoc(SceneLocation);
				return true;
			default:
				return false;
		}		
	},
	
	/* The range that a player must be within to interact */
	getInteractRange : function (object, option) {
		return 1;
	},
	
	/* A backpack item used on the location */
	handleItemOnLoc : function (player, location, item, invSlot) {
		return false;
	}

});

var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var itemListener = new ItemListener();
	scriptManager.registerItemListener(itemListener, itemListener.getItemIDs());
	var listener = new LocationListener();
	scriptManager.registerLocationListener(listener, listener.getIDs());
}