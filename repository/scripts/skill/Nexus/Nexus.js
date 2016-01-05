var Unset = 0;
var Chaotic = 1;
var Battle = 2;
var Order = 3;
var Fealty = 4;
var charmLimit = 500;

var NexusListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var location = args.location;
		
		switch (locTypeId) {
		case 84209:
			startNexusCollection(player, location);
			return;
		case 84140:
			startNexusPurification(player, location);
			return;
		case 84141:
			startNexusPurification(player, location);
			return;				
		case 84142:
			startNexusPurification(player, location);
			return;				
		case 84143:
			startNexusPurification(player, location);
			return;					
		default:
			api.sendMessage(player, "Unhandled nexus: "+location);
			return;
		}		
	}
});

/* Listen to the location ids specified */
var listen = function(scriptManager) {
	var locs = [ 84209, 84140, 84141, 84142, 84143 ];
	var listener = new NexusListener();
	for (var i in locs) {
		scriptManager.registerListener(EventType.OPLOC1, locs[i], listener);
	}
};

function startNexusCollection(player, object, option) {
	if (api.isPaused(player)) {
		return false;//Cannot charm as an action is already in process
	}
	var delay = 10;
	api.pausePlayer(player, delay+1);
	api.sendFilterMessage(player, "You collect from the Nexus and receive prayer experience as a reward...");
	api.runAnimation(player, 20174);
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
			process : function (player) {
				api.runAnimation(player, 20174);
				api.addExperience(player, Stat.PRAYER, 250, true);
				if (delay <= 0) {
					return true;
				}
				delay--;
				return false;
			},
			stop : function (player) {//Clear the current animation block
				api.clearAnimation(player);
			}
		
		});
		player.setAction(new Action());	
	}	

function startNexusPurification(player, object, option) {
	if (api.isPaused(player)) {
		return false;//Cannot charm as an action is already in process
	}
	var delay = 5;
	api.pausePlayer(player, delay+1);
	api.sendFilterMessage(player, "You purify the bowls and receive prayer experience...");
	api.runAnimation(player, 20174);
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
			process : function (player) {
				api.runAnimation(player, 20174);
				api.addExperience(player, Stat.PRAYER, 150, true);
				if (delay <= 0) {
					return true;
				}
				delay--;
				return false;
			},
			stop : function (player) {//Clear the current animation block
				api.clearAnimation(player);
			}
		
		});
		player.setAction(new Action());	
	}	

