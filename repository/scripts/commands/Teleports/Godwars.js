
var Tile = Java.type('org.virtue.model.entity.region.Tile');


var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The object ids to bind to */
	getPossibleSyntaxes: function() {
		return [ "godwars" ];
	},

	/* The first option on an object */
	handle: function(player, syntax, args, clientCommand) {
		api.sendMessage(player, "<col=#333333>Welcome to God Wars Dungeon.</col>");
		api.teleportEntity(player, 2882, 5311, 0);
		return true;
	},
		
	adminCommand : function () {
		return false;
	}

});

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	var listener = new CommandListener();
	scriptManager.registerCommandListener(listener, listener.getPossibleSyntaxes());
};