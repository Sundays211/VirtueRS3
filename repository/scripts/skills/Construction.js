var Tile = Java.type('org.virtue.game.entity.region.Tile');
var DynamicRegion = Java.type('org.virtue.game.entity.region.DynamicRegion');
var RegionTools = Java.type('org.virtue.game.entity.region.RegionTools');
/**
 * @author Kayla
 * @since 11/17/2015
 */
var api;

var BACKPACK = 93;

var RoomTypes = {
    DEFAULT : {
        level : 1,
        tile : new Tile(1864, 5056, 0),
    },
    GARDEN : {
        level : 1,
        tile : new Tile(1859, 5066, 0),
    },
    THRONE : {
        level : 1,
        tile : new Tile(1904, 5096, 0),
    },
    GAME : {
        level : 1,
        tile : new Tile(1864, 5104, 0),
    },
    FLOOR_2 : {
        level : 1,
        tile : new Tile(1903, 5095, 0),
    },
    PARLOUR : {
        level : 1,
        tile : new Tile(1856, 5112, 0),
    },
    KITCEN : {
        level : 1,
        tile : new Tile(1872, 5112, 0),
    },
    DINING : {
        level : 1,
        tile : new Tile(1890, 5112, 0),
    },
    WORK_SHOP : {
        level : 1,
        tile : new Tile(1856, 5096, 0),
    },
    BED_ROOM : {
        level : 1,
        tile : new Tile(1904, 5112, 0),
    },
    SKILL_HALL : {
        level : 1,
        tile : new Tile(1880, 5104, 0),
    },
    COMBAT : {
        level : 1,
        tile : new Tile(1880, 5088, 0),
    },
    QUEST_HALL : {
        level : 1,
        tile : new Tile(1912, 5104, 0),
    },
    STUDY : {
        level : 1,
        tile : new Tile(1888, 5096, 0),
    },
    COSTUME_ROOM : {
        level : 1,
        tile : new Tile(1904, 5064, 0),
    },
    CHAPEL : {
        level : 1,
        tile : new Tile(1872, 5096, 0),
    },
    PORTAL_CHAMBER : {
        level : 1,
        tile : new Tile(1864, 5088, 0),
    }
    //TODO REST
};


var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.LocationListener'), {

	/* The location ids to bind to */
	getIDs: function() {
		return [15478, 15482, 15361];
	},

	/* The first option on an object */
	handleInteraction: function(player, object, option) {
		switch (option) {
			case 1:
				api.openDialog(player, "HouseOptions");
			break;
			case 4:
				joinHouse(player);
				break;
			case 5:
				api.openCentralWidget(player, 402, false);
			break;
			default:
				api.sendMessage(player, "Unhandled construction action: locationid="+object.getID()+", option="+option);
				break;
		}
		return true;
	}

});


var DialogListener = Java.extend(Java.type('org.virtue.engine.script.listeners.DialogListener'), {
	startDialog : function (player) {
		player.getDialogs().sendMultichoice("Select an Option", ["Go to your house.", "Go to your house (building mode).", "Go to a friend's house.", "Never mind."], [1, 2, 3, 4]);
	},
	continueDialog : function (player, option) {
		switch (player.getDialogs().getStep()) {
		case -1:
			return true;
		case 1:
			enterHouse(player);
			return true;
		case 2:
			return true;
		case 3:
			joinHouse(player);
			return true;
		case 4:
			return true;
		default:
			return true;
		}
		
	},
	finishDialog : function (player) {
		
	}
});

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var listener = new LocationListener();
	scriptManager.registerLocationListener(listener, listener.getIDs());
	scriptManager.registerDialogListener(new DialogListener(), "HouseOptions");
	var widgetListener = new WidgetListener();
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

function enterHouse (player) {
	var house = RegionTools.createRegion();
	for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
		for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
			RegionTools.setChunk(house, xOffSet, yOffSet, 1, 232, 632, 0, 0);
		}
	}
	//RegionTools.setChunk(house, E/W Coord, N/S Coord, 1, 232, 639, 0, 0);
	//Format: region, housePosX, hosePosY, hoseLevel, originalPosX, originalPosY, originalLevel, rotation
	RegionTools.setChunk(house, 4, 4, 1, 232, 633, 0, 0);//Add a garden at 2,2
	RegionTools.setChunk(house, 4, 5, 1, 232, 639, 0, 0);//Add a parlor at 2,3
	RegionTools.setChunk(house, 4, 5, 2, 235, 634, 0, 0);//Add a parlor Roof
	RegionTools.setChunk(house, 5, 5, 1, 234, 637, 0, 0);//Add a parlor at 2,4
	RegionTools.buildRegion(house);
	var squareX = api.getSquareX(house.getBaseTile());
	var squareY = api.getSquareY(house.getBaseTile());
	api.teleportEntity(player, 1, squareX, squareY, 10, 10);
	player.setHouse(house);
	api.sendMessage(player, "Welcome to your house!");
}

function joinHouse(player) {
	var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
		handle : function (value) {
			if (value.length > 0) {
				var hash = api.getUserHash(value);
				if (hash != null) {
					var targetPlayer = api.getWorldPlayerByHash(hash);
					if (targetPlayer != null) {
						player.stopAll();
						player.getMovement().teleportTo(targetPlayer.getCurrentTile());
					} else {
						api.sendMessage(player, value+" is not home.")
					}
				} else {
					api.sendMessage(player, value+" is not registered on this server.")
				}
			}
		}
	});
	
	player.getDialogs().requestString("Please enter the display name of the player you wish to teleport too:", new Handler());
	return true;
}

function buildRoom(player, object) {
	
}

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [ 402 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		if (interfaceID == 402) {
		}
	},

	/* Pressed a button on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (interfaceID == 402) {
			switch (component) {
			case 93:
				api.runAnimation(player, 898);
				return true;
			}
		}
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		if (interfaceID == 402) {
			closeCentralWidgets(player);
		}
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}
});

