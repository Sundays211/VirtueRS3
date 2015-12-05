/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var ContainerState = Java.type('org.virtue.model.entity.player.inv.ContainerState');
var GroundItem = Java.type('org.virtue.model.entity.region.GroundItem');
var Item = Java.type('org.virtue.model.entity.player.inv.Item');
var Tile = Java.type('org.virtue.model.entity.region.Tile');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */

var FIREMAKING_SKILL = 11;

var Log = {
	NORMAL : {
		itemID : 1511,
		level : 1,
		xp : 40,
		fireID : 70755,
		duration : 200,//2 minutes
		bonfirexp : 50,
		bonfireGfx : 3098
	},
	OAK : {
		itemID : 1521,
		level : 15,
		xp : 60,
		fireID : 70757,
		duration : 230,//2 minutes 18 seconds
		bonfirexp : 85,
		bonfireGfx : 3099
	},
	WILLOW : {
		itemID : 1519,
		level : 30,
		xp : 90,
		fireID : 70758,
		duration : 280,//2 minutes 48 seconds
		bonfirexp : 105,
		bonfireGfx : 3101
	},
	TEAK : {
		itemID : 6333,
		level : 35,
		xp : 105,
		fireID : 70759,
		duration : 320,//3 minutes 12 seconds
		bonfirexp : 120,
		bonfireGfx : 3110
	},
	MAPLE : {
		itemID : 1517,
		level : 45,
		xp : 141,
		fireID : 70761,
		duration : 350,//3 minutes 30 seconds
		bonfirexp : 135,
		bonfireGfx : 3100
	},
	MAHOGANY : {
		itemID : 6332,
		level : 50,
		xp : 157.5,
		fireID : 70762,
		duration : 400,//4 minutes 00 seconds
		bonfirexp : 180,
		bonfireGfx : 3109
	},
	EUCALYPTUS : {
		itemID : 12581,
		level : 58,
		xp : 193.5,
		fireID : 70763,
		duration : 450,//4 minutes 30 seconds
		bonfirexp : 195,
		bonfireGfx : 3113
	},
	YEW : {
		itemID : 1515,
		level : 60,
		xp : 202.5,
		fireID : 70764,
		duration : 500,//5 minutes 00 seconds
		bonfirexp : 260,
		bonfireGfx : 3114
	},
	MAGIC : {
		itemID : 1513,
		level : 75,
		xp : 303.8,
		fireID : 70765,
		duration : 550,//5 minutes 30 seconds
		bonfirexp : 309.5,
		bonfireGfx : 3115
	},
	ELDER : {
		itemID : 29556,
		level : 90,
		xp : 450,
		fireID : -1,//TODO: Find this
		duration : 600,//6 minutes 00 seconds
		bonfirexp : 449,
		bonfireGfx : -1//3116 is close but not quite...
	},
	BONFIRE : {
		level : 1,
		xp : 40,
		fireID : 92885,
		duration : 200 //2 minutes
	},
	BONFIRE2 : {
		level : 1,
		xp : 40,
		fireID : 92903,
		duration : 200 //2 minutes
	}
}

var ItemListener = Java.extend(Java.type('org.virtue.script.listeners.ItemListener'), {

	/* The item ids to bind to */
	getItemIDs: function() {
		var ids = [];
		var ordinal = 0;
		for (var log in Log) {
			ids[ordinal++] = Log[log].itemID;
		}
		return ids;
	},

	/* The first option on an object */
	handleInteraction: function(player, item, slot, option) {
		switch (option) {
			case 1://Craft
				Firemaking.openToolDialog(player, item, slot);
				break;
			case 2://Light
				runFiremakingAction(player, item, slot);
				break;
			default:
				api.sendMessage(player, "Unhandled log action: objectid="+item.getID()+", option="+option);
				break;
		}
		return true;
	},
	
	/* Returns the examine text for the item, or "null" to use the default */
	getExamine : function (player, item) {
		return null;
	}

});

var FireListener = Java.extend(Java.type('org.virtue.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		Firemaking.openFireToolDialog(args.player, args.location);
	}
});

var FIRE_IDS = [];
var LOG_IDS = [];

/* Listen to the events specified */
var listen = function(scriptManager) {	
	for (var log in Log) {
		FIRE_IDS.push(Log[log].fireID);
	}	
	fireListener = new FireListener();
	for (var i in FIRE_IDS) {
		//Bind option one and five on all fires to this listener (option 1=Add Logs on bonfire, option 5=Use on normal fire)
		scriptManager.registerListener(EventType.LOC_OP1, FIRE_IDS[i], fireListener);
		scriptManager.registerListener(EventType.LOC_OP5, FIRE_IDS[i], fireListener);
	}
	
	
	itemListener = new ItemListener();
	LOG_IDS = itemListener.getItemIDs();
	scriptManager.registerItemListener(itemListener, LOG_IDS);
};

var Firemaking = {
		openToolDialog : function (player, item, slot) {
			var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.ToolSelectHandler'), {
				onToolSelected : function (toolID) {
					switch (toolID) {
					case 590:
						runFiremakingAction(player, item, slot);
						break;
					case 946:
						item.handleItemOnItem(player, slot, Item.create(946, 1), -1);//A hacky solution, but it should work
						break;
					case 24291://Add logs to a nearby bonfire
						findBonfire(player, item, slot);
						break;
					default:
						api.sendMessage(player, "Unhandled log tool: logID="+item.getID()+", toolID="+toolID);
						break;
					}
				}
			});
			var tools = [590, 946, 24291];
			if (item.getID() == Log.EUCALYPTUS.itemID) {
				tools = [590, 24291];
			}
			player.getDialogs().requestTool("What do you want to use on the logs?", new Handler(), tools);
		},
		openFireToolDialog : function (player, location) {
			var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.ToolSelectHandler'), {
				onToolSelected : function (toolID) {
					switch (toolID) {
					case 24291://Add logs the bonfire
						selectLogsToAdd(player, location)
						break;
					default:
						api.sendMessage(player, "Unhandled fire tool: fireID="+location.getID()+", toolID="+toolID);
						break;
					}
				}
			});
			player.getDialogs().requestTool("Choose what to do:", new Handler(), [25637, 24291]);
		}
}

function selectLogsToAdd (player, fire) {
	var hasLogs = [];
	var ordinal = 0;
	for (var slot in LOG_IDS) {
		if (api.carriedItemTotal(player, LOG_IDS[slot]) > 0) {
			hasLogs[ordinal++] = LOG_IDS[slot];
		}
	}
	if (hasLogs.length == 0) {
		return;//Player does not have any logs to add
	} else if (hasLogs.length == 1) {
		runBonfireAction(player, Item.create(hasLogs[0], 1), 0, fire);
	} else {
		var Handler = Java.extend(Java.type('org.virtue.model.entity.player.dialog.ToolSelectHandler'), {
			onToolSelected : function (toolID) {
				runBonfireAction(player, Item.create(toolID, 1), 0, fire);
			}
		});
		player.getDialogs().requestTool("Which logs do you want to add to the bonfire?", new Handler(), hasLogs);
	}
}

function runFiremakingAction (player, item, slot) {
	var log = forItem(item.getID());//Find the log type
	//FIREMAKING_SKILL
	if (api.getStatLevel(player, FIREMAKING_SKILL) < log.level) {
		api.sendMessage(player, "You need a firemaking level of "+log.level+" to light these logs.");
		return;
	}
	var delay = getFiremakingDelay(player, log);//Calculates the time taken to light this log
	var region = api.getRegion(player.getCurrentTile().getRegionID());
	if (region != null) {
		if (!tileEmpty(player.getCurrentTile(), region)) {
			api.sendMessage(player, "You can't light a fire here.");
			return;
		}
		item = new GroundItem(item, new Tile(player.getCurrentTile()));
		region.addItem(item);
		player.getInvs().getContainer(ContainerState.BACKPACK).clearSlot(slot);//Remove logs from inv
		player.getInvs().updateContainer(ContainerState.BACKPACK, [slot]);
		api.sendFilterMessage(player, "You attempt to light the logs.");
		var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
			process : function (player) {
				api.runAnimation(player, 16700);
				if (delay <= 0) {
					firemakingSuccess(player, region, log);
					return true;
				}
				if (!tileEmpty(player.getCurrentTile(), region) || !item.exists()) {
					return true;//Could not complete as tile is in use
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
}

function findBonfire (player, item, slot) {
	var xOff = player.getCurrentTile().getX() - 5;
	var yOff = player.getCurrentTile().getY() - 5;
	var plane = player.getCurrentTile().getPlane();
	var location;
	for (var x = xOff; x < xOff+11; x++) {
		for (var y = yOff; y < yOff+11; y++) {
			location = api.getLocationByNodeType(x, y, plane, 10);
			if (location != null && location.exists()) {
				if (FIRE_IDS.indexOf(location.getID()) !== -1) {
					moveToBonfire(player, item, slot, location);						
					return;
				}
			}
		}
	}
}

function moveToBonfire(player, item, slot, fire) {
	var OnTarget = Java.extend(Java.type('java.lang.Runnable'), {	
		run : function () {
			runBonfireAction(player, item, slot, fire);
		}
	})
	var Task = Java.extend(Java.type('java.lang.Runnable'), {	
		run : function () {
			if (!fire.exists() || !player.getMovement().moveTo(fire)) {
				print(fire.exists()+"\n")
				return;//Player cannot reach fire
			}
			player.getMovement().setOnTarget(new OnTarget());			
		}
	});
	api.executeTask(new Task());
}

function runBonfireAction (player, item, slot, fire) {
	var log = forItem(item.getID());//Find the log type
	if (api.getStatLevel(player, Stat.FIREMAKING) < log.level) {
		api.sendMessage(player, "You need a firemaking level of at least "+log.level+" to add these logs to a bonfire.");
		return;
	}
	player.getAppearance().setRenderAnimation(2498);
	player.getAppearance().refresh();
	var delay = 0;
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
		process : function (player) {
			if (delay <= 0) {
				if (api.carriedItemTotal(player, item.getID()) < 1 || !fire.exists()) {
					return true;
				}
				addLogToFire(player, item.getID(), slot, log);
				delay = 6;
			}
			delay--;
			return false;
		},
		stop : function (player) {//Clear the current animation block
			player.getAppearance().setRenderAnimation(-1);
			player.getAppearance().refresh();
		}

	});
	player.setAction(new Action());
}

function addLogToFire (player, itemID, slot, log) {
	api.delCarriedItem(player, itemID, 1, slot);//Remove logs
	api.addExperience(player, Stat.FIREMAKING, log.bonfireXp, true);//Add firemaking xp
	api.runAnimation(player, 16703);
	api.queueSpot(player, 1, log.bonfireGfx);
	api.sendFilterMessage(player, "You add a log to the fire.");
}

function firemakingSuccess (player, region, log) {
	region.removeItem(player.getCurrentTile(), log.itemID);
	region.spawnTempLocation(api.createLocation(log.fireID, new Tile(player.getCurrentTile()), 10, 0), log.duration);//Spawn the fire
	player.getMovement().moveAdjacent();
	api.addExperience(player, "firemaking", log.xp, true);//Add firemaking xp
	//player.getSkills().addExperience(SkillType.FIREMAKING, log.xp);
	api.sendFilterMessage(player, "The fire catches and the logs begin to burn.");
	
}

var blockNodeTypes = [10];

function tileEmpty (tile, region) {
	for (var type in blockNodeTypes) {
		if (api.getLocationByNodeType(tile.getX(), tile.getY(), tile.getPlane(), type) != null) {
			return false;
		}
	}
	return true;
}

function forItem(itemID) {
	for (ordinal in Log) {
		if (Log[ordinal].itemID == itemID) {
			return Log[ordinal];
		}
	}
	return null;
}

function getFiremakingDelay (player, log) {
	return 10;//TODO: Figure out the correct calculation for this
}

