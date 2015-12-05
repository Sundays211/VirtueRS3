
var Tile = Java.type('org.virtue.model.entity.region.Tile');


var CommandListener = Java.extend(Java.type('org.virtue.script.listeners.CommandListener'), {

	/* The object ids to bind to */
	getPossibleSyntaxes: function() {
		return [ "edge" ];
	},

	/* The first option on an object */
	handle: function(player, syntax, args, clientCommand) {
		api.teleportEntity(player, 3087, 3502, 0);
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