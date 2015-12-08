/**
 * @Author Kayla
 */

 
 
var LocationListener = Java.extend(Java
		.type('org.virtue.engine.script.listeners.LocationListener'), {

	/* The location ids to bind to */
	getIDs : function() {
		return [ 14315 ];
	},

	/* The first option on an object */
	handleInteraction : function(player, object, option) {
		if (option != 1) {
			return false;
		}
		switch (object.getID()) {
		case 14315:// Novice Lander
			/*controller = Java.type('org.virtue.Virtue').getInstance().getController().getController(Java.type('org.virtue.game.content.minigame.impl.PestController').class);
			minigames = Java.type('org.virtue.Virtue').getInstance().getController().getMinigames(Java.type('org.virtue.game.content.minigame.impl.PestController').class);
			minigame = null;
			
			if (minigames.size() == 0) {
				api.sendMessage(player, "You should create the instance.");
				minigame = Java.type('org.virtue.Virtue').getInstance().getController().createPest(1, 25);
			}
			
			api.sendMessage(player, "Game already exists.");
			controller.addPlayer(minigames.get(minigames.size() - 1), player);*/
			return true;
		default:
			return false;
		}
	},

	/* The range that a player must be within to interact */
	getInteractRange : function(object, option) {
		return 1;
	},

	/* A backpack item used on the location */
	handleItemOnLoc : function(player, location, item, invSlot) {
		return false;
	}

});

/* Listen to the location ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var listener = new LocationListener();
	scriptManager.registerLocationListener(listener, listener.getIDs());
};