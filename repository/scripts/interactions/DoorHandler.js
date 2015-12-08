/**
 * @author Kayla
 * @date 12/14/2015
 */

var api;
var opened;

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.LocationListener'), {

	/* The location ids to bind to */
	getIDs: function() {
		return [25813, 25814];
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		var optionText = api.getLocType(object).op[option-1];
		api.sendMessage(player, optionText);
		switch (option) {
		case 1:
			if(opened) {
				opened = false;
				api.destroyLoc(object);
				var doorClosed = api.createLocation(25813, 2704, 3463, 0, 0, 0);
				api.spawnLocation(doorClosed);
				var doorClosed2 = api.createLocation(25814, 2704, 3462, 0, 0, 0);
				api.spawnLocation(doorClosed2);
			} else {
				opened = true;
				api.destroyLoc(object);
				var doorOpened = api.createLocation(25814, 2704, 3463, 0, 0, 1);//right
				api.spawnLocation(doorOpened);
				
				var doorOpened2 = api.createLocation(25813, 2704, 3462, 0, 0, 3);//Left
				api.spawnLocation(doorOpened2);
			}
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
	var listener = new LocationListener();
	scriptManager.registerLocationListener(listener, listener.getIDs());
};