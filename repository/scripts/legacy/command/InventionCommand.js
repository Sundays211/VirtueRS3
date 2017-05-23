
var CommandListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, syntax, scriptArgs) {
		var player = scriptArgs.player;
		//varp 5091 = Max integer value
		//need to fix craft progress so it can check and remove materials from the invention material widget
		Manufacture.handleManufacture(player);
		return;
	}
});

/* Listen to the commands specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerListener(EventType.COMMAND, "manufacture", listener);
	scriptManager.registerListener(EventType.COMMAND, "invent", listener);
};