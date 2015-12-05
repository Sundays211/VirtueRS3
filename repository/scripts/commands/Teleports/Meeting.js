
var Tile = Java.type('org.virtue.model.entity.region.Tile');
var api;
var entered;

var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The object ids to bind to */
	getPossibleSyntaxes: function() {
		return [ "meeting" ];
	},

	/* The first option on an object */
	handle: function(player, syntax, args, clientCommand) {
		api.teleportEntity(player, 5504, 4152, 0);
		api.sendMessage(player, "<col=ff0000>Welcome to the Administration Room. ");
		api.sendMessage(player, "<col=ff0000>---------Rules------- ");
		api.sendMessage(player, "<col=ff0000>Please do not talk while meeting is going on.");
		return true;
	},
		
	adminCommand : function () {
		return false;
	}

});

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var listener = new CommandListener();
	scriptManager.registerCommandListener(listener, listener.getPossibleSyntaxes());
};