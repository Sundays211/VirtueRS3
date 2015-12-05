var api;

var AnimationBlock = Java.type('org.virtue.model.entity.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.model.entity.update.block.GraphicsBlock');
var FaceDirectionBlock = Java.type('org.virtue.model.entity.update.block.FaceDirectionBlock');

var PRAYER_SKILL = 5;

var Unset = 0;
var Chaotic = 1;
var Battle = 2;
var Order = 3;
var Fealty = 4;
var charmLimit = 500;

var ItemListener = Java.extend(Java.type('org.virtue.script.listeners.ItemListener'), {

	/* The item ids to bind to */
	getItemIDs: function() {
		return [];
	},

	/* The first option on an object */
	handleInteraction: function(player, item, slot, option) {
		switch (option) {
			case 1:
				//api.sendMessage(player, "Collect from the Nexus in lumbridge swamp to get free prayer experience!");
				break;
			default:
				break;
		}
		return true;
	},
	
	/* Returns the examine text for the item, or "null" to use the default */
	getExamine : function (player, item) {
		return null;
	}

});

var LocationListener = Java.extend(Java.type('org.virtue.script.listeners.LocationListener'), {

	/* The location ids to bind to */
	getIDs: function() {
		return [84209, 84140, 84141, 84142, 84143];
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		switch (object.getID()) {
		case 84209:
			startNexusCollection(player, object);
			return true;
		case 84140:
			startNexusPurification(player, object);
			return true;
		case 84141:
			startNexusPurification(player, object);
			return true;				
		case 84142:
			startNexusPurification(player, object);
			return true;				
		case 84143:
			startNexusPurification(player, object);
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


/* Listen to the location ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var listener = new LocationListener();
	var itemListener = new ItemListener();
	scriptManager.registerLocationListener(listener, listener.getIDs());
	scriptManager.registerBackpackItemListener(itemListener, itemListener.getItemIDs());
};

function startNexusCollection(player, object, option) {
	if (api.isPaused(player)) {
		return false;//Cannot charm as an action is already in process
	}
	var delay = 10;
	api.pausePlayer(player, delay+1);
	api.sendFilterMessage(player, "You collect from the Nexus and receive prayer experience as a reward...");
	api.runAnimation(player, 20174);
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
			process : function (player) {
				api.runAnimation(player, 20174);
				api.addExperience(player, PRAYER_SKILL, 250, true);
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
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
			process : function (player) {
				api.runAnimation(player, 20174);
				api.addExperience(player, PRAYER_SKILL, 150, true);
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

