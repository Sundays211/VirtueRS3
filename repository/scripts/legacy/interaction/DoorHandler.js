/**
 * @author Kayla
 * @date 12/14/2015
 */
var opened;

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var location = args.location;
		
		if(opened) {
			opened = false;
			api.destroyLoc(location);
			var doorClosed = api.createLocation(25813, 2704, 3463, 0, 0, 0);
			api.spawnLocation(doorClosed);
			var doorClosed2 = api.createLocation(25814, 2704, 3462, 0, 0, 0);
			api.spawnLocation(doorClosed2);
		} else {
			opened = true;
			api.destroyLoc(location);
			var doorOpened = api.createLocation(25814, 2704, 3463, 0, 0, 1);//right
			api.spawnLocation(doorOpened);
			
			var doorOpened2 = api.createLocation(25813, 2704, 3462, 0, 0, 3);//Left
			api.spawnLocation(doorOpened2);
		}	
	}
});

var listen = function(scriptManager) {
	var locs = [ 25813, 25814 ];
	var listener = new LocationListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, locs[i], listener);
	}
};