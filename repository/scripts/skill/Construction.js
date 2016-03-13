/**
 * @author Kayla
 * @since 11/17/2015
 */

var RoomTypes = {
    DEFAULT : {
        level : 1,
        tile : api.getCoords(1864, 5056, 0),
    },
    GARDEN : {
        level : 1,
        tile : api.getCoords(1859, 5066, 0),
    },
    PARLOUR : {
        level : 1,
        tile : api.getCoords(1856, 5112, 0),
    },
    KITCEN : {
        level : 5,
        tile : api.getCoords(1872, 5112, 0),
    },
    DINING : {
        level : 10,
        tile : api.getCoords(1890, 5112, 0),
    },
    WORK_SHOP : {
        level : 15,
        tile : api.getCoords(1856, 5096, 0),
    },
    BEDROOM : {
        level : 20,
        tile : api.getCoords(1904, 5112, 0),
    },
    SKILL_HALL : {
        level : 25,
        tile : api.getCoords(1880, 5104, 0),
    },
    GAME : {
        level : 30,
        tile : api.getCoords(1864, 5104, 0),
    },
    COMBAT : {
        level : 32,
        tile : api.getCoords(1880, 5088, 0),
    },
    QUEST_HALL : {
        level : 35,
        tile : api.getCoords(1912, 5104, 0),
    },
    MENAGERIE : {
        level : 37,
        tile : api.getCoords(1912, 5072, 0),
    },
    STUDY : {
        level : 40,
        tile : api.getCoords(1888, 5096, 0),
    },
    COSTUME_ROOM : {
        level : 42,
        tile : api.getCoords(1904, 5064, 0),
    },
    CHAPEL : {
        level : 45,
        tile : api.getCoords(1872, 5096, 0),
    },
    PORTAL_CHAMBER : {
        level : 50,
        tile : api.getCoords(1864, 5088, 0),
    },
    FORMAL_GARDEN : {
        level : 55,
        tile : api.getCoords(1920, 5064, 0),
    },
    THRONE : {
        level : 60,
        tile : api.getCoords(1904, 5096, 0),
    },
    AQUARIUM : {
        level : 63,
        tile : api.getCoords(1912, 5058, 0),
    },
    OUBLIETTE : {
        level : 65,
        tile : api.getCoords(1904, 5080, 0),
    },
    DUNGEON : {
        level : 70,
        tile : api.getCoords(1873, 5081, 0),
    },
    PIT_DUNGEON : {
        level : 70,
        tile : api.getCoords(1897, 5073, 0),
    },
    TREASURE_ROOM : {
        level : 75,
        tile : api.getCoords(1913, 5089, 0),
    },
    FLOOR_2 : {
        level : 1,
        tile : api.getCoords(1903, 5095, 0),
    },
};


var HousePortalListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		if (event == EventType.OPLOC1) {
			multi4(player, "Select an Option", "Go to your house.", function () {
				enterHouse(player);
			}, "Go to your house (building mode).", function () {
				api.sendMessage(player, "Build mode is not yet supported.");
			}, "Go to a friend's house.", function () {
				joinHouse(player);
			}, "Never mind.");
		} else if (event == EventType.OPLOC4) {
			joinHouse(player);
		} else if (event == EventType.OPLOC5) {
			api.openCentralWidget(player, 402, false);
		} else {
			api.sendMessage(player, "Unhandled construction action: locationid="+locTypeId+", event="+event);
		}
	}
});

/* Listen to the locations specified */
var listen = function(scriptManager) {
	var ids = [ 15478, 15482, 15361 ];
	var listener = new HousePortalListener();
	for (var i in ids) {
		//Bind all options on house portals
		scriptManager.registerListener(EventType.OPLOC1, ids[i], listener);
		scriptManager.registerListener(EventType.OPLOC2, ids[i], listener);
		scriptManager.registerListener(EventType.OPLOC3, ids[i], listener);
		scriptManager.registerListener(EventType.OPLOC4, ids[i], listener);
		scriptManager.registerListener(EventType.OPLOC5, ids[i], listener);
	}
};

function enterHouse (player) {
	var house = mapApi.createArea();
	for (var xOffSet = 0; xOffSet < 8; xOffSet++) {
		for (var yOffSet = 0; yOffSet < 8; yOffSet++) {
			mapApi.setChunk(house, xOffSet, yOffSet, 1, 232, 632, 0, 0);
		}
	}
	//mapApi.setChunk(house, E/W Coord, N/S Coord, 1, 232, 639, 0, 0);
	//Format: region, housePosX, housePosY, houseLevel, originalPosX, originalPosY, originalLevel, rotation
	mapApi.setChunk(house, 4, 4, 1, 232, 633, 0, 0);//Add a garden at 2,2
	mapApi.setChunk(house, 4, 5, 1, 232, 639, 0, 0);//Add a parlor at 2,3
	mapApi.setChunk(house, 4, 5, 2, 235, 634, 0, 0);//Add a parlor Roof
	mapApi.setChunk(house, 5, 5, 1, 234, 637, 0, 0);//Add a parlor at 2,4
	mapApi.buildArea(house);
	var squareX = mapApi.getSquareX(house);
	var squareY = mapApi.getSquareY(house);
	api.teleportEntity(player, 1, squareX, squareY, 10, 10);
	player.setHouse(house);
	api.sendMessage(player, "Welcome to your house!");
}

function joinHouse(player) {
	requestName(player, "Enter name:", function (value) {
		var hash = api.getUserHash(value);
		if (hash != null) {
			var targetPlayer = api.getWorldPlayerByHash(hash);
			if (targetPlayer != null) {
				api.teleportEntity(player, api.getCoords(targetPlayer));
			} else {
				api.sendMessage(player, "They do not seem to be at home.")
			}
			//They don't own a house.
		} else {
			api.sendMessage(player, "That player is offline, or has privacy mode enabled.")
		}
	});
}

function buildRoom(player, object) {
	
}