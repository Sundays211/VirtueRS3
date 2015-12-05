/**
 * @Author Kayla
 */

var LocationListener = Java.extend(Java
		.type('org.virtue.script.listeners.LocationListener'), {

	/* The location ids to bind to */
	getIDs : function() {
		return [ 14315, 14314 ];
	},

	/* The first option on an object */
	handleInteraction : function(player, object, option) {
		if (option != 1) {
			return false;
		}
		switch (object.getID()) {
		case 14315:// Novice Lander
			minigame = Java.type('org.virtue.Virtue').getInstance().getController().createPest(2, 25);
			minigame.getPlayers().add(player);
			api.teleportEntity(player, 2661, 2639, 0);
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