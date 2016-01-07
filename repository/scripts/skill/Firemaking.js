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
var GroundItem = Java.type('org.virtue.game.world.region.GroundItem');

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

var LogListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		var item = args.item;
		var slot = args.slot;
		
		if (event == EventType.OPHELD1) {//Craft
			Firemaking.openToolDialog(player, item, slot);
		} else if (event == EventType.OPHELD2) {//Light
			Firemaking.runFiremakingAction(player, item, slot);
		}
	}
});

var FireListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
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
	var fireListener = new FireListener();
	for (var i in FIRE_IDS) {
		//Bind option one and five on all fires to this listener (option 1=Add Logs on bonfire, option 5=Use on normal fire)
		scriptManager.registerListener(EventType.OPLOC1, FIRE_IDS[i], fireListener);
		scriptManager.registerListener(EventType.OPLOC5, FIRE_IDS[i], fireListener);
	}
	
	for (var log in Log) {
		LOG_IDS.push(Log[log].itemID);
	}
	var logListener = new LogListener();
	for (var i in LOG_IDS) {
		//Bind option one and two on all logs to this listener
		scriptManager.registerListener(EventType.OPHELD1, LOG_IDS[i], logListener);
		scriptManager.registerListener(EventType.OPHELD2, LOG_IDS[i], logListener);
	}
};

var Firemaking = {
		openToolDialog : function (player, item, slot) {
			var tools = [590, 946, 24291];
			if (item.getID() == Log.EUCALYPTUS.itemID) {
				tools = [590, 24291];
			}
			requestTool(player, "What do you want to use on the logs?", tools, function (toolId) {
				switch (toolId) {
				case 590://Light
					Firemaking.runFiremakingAction(player, item, slot);
					break;
				case 946://Craft
					showFletchingDialog(player, item, [slot])
					//item.handleItemOnItem(player, slot, Item.create(946, 1), -1);//A hacky solution, but it should work
					break;
				case 24291://Add logs to a nearby bonfire
					Firemaking.findBonfire(player, item.getId(), slot);
					break;
				default:
					api.sendMessage(player, "Unhandled log tool: logs="+item+", toolID="+toolId);
					break;
				}
			});
		},
		openFireToolDialog : function (player, location) {
			requestTool(player, "Choose what to do:", [25637, 24291], function (toolId) {
				switch (toolId) {
				case 24291://Add logs the bonfire
					Firemaking.selectLogsToAdd(player, location)
					break;
				default:
					api.sendMessage(player, "Unhandled fire tool: fire="+location+", toolID="+toolId);
					break;
				}
			});
		},
		selectLogsToAdd : function (player, fire) {
			var hasLogs = [];
			for (var slot in LOG_IDS) {
				if (api.carriedItemTotal(player, LOG_IDS[slot]) > 0) {
					hasLogs.push(LOG_IDS[slot]);
				}
			}
			if (hasLogs.length == 0) {
				return;//Player does not have any logs to add
			} else if (hasLogs.length == 1) {
				this.runBonfireAction(player, hasLogs[0], 0, fire);
			} else {
				requestTool(player, "Which logs do you want to add to the bonfire?", hasLogs, function (toolId) {
					Firemaking.runBonfireAction(player, toolId, 0, fire);
				});
			}
		},
		runFiremakingAction : function (player, item, slot) {
			var log = this.forItem(item.getID());//Find the log type
			if (api.getStatLevel(player, Stat.FIREMAKING) < log.level) {
				api.sendMessage(player, "You need a firemaking level of "+log.level+" to light these logs.");
				return;
			}
			var delay = this.getDelay(player, log);//Calculates the time taken to light this log
			var region = api.getRegion(api.getCoords(player));
			if (region != null) {
				if (!this.tileEmpty(api.getCoords(player), region)) {
					api.sendMessage(player, "You can't light a fire here.");
					return;
				}
				item = new GroundItem(item, api.getCoords(player));
				region.addItem(item);
				api.delItem(player, Inv.BACKPACK, item.getId(), 1, slot);//Remove logs from inv
				api.sendMessage(player, "You attempt to light the logs.", MesType.GAME_SPAM);
				var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
					process : function (player) {
						api.runAnimation(player, 16700);
						if (delay <= 0) {
							Firemaking.firemakingSuccess(player, log);
							return true;
						}
						if (!Firemaking.tileEmpty(player.getCurrentTile(), region) || !item.exists()) {
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
		},
		findBonfire : function (player, itemId, slot) {
			var xOff = api.getCoordX(player) - 5;
			var yOff = api.getCoordY(player) - 5;
			var plane = api.getCoordLevel(player);
			var location;
			for (var x = xOff; x < xOff+11; x++) {
				for (var y = yOff; y < yOff+11; y++) {
					location = api.getLocationByNodeType(x, y, plane, 10);
					if (location != null && location.exists()) {
						if (FIRE_IDS.indexOf(location.getID()) !== -1) {
							this.moveToBonfire(player, itemId, slot, location);						
							return;
						}
					}
				}
			}
		},
		moveToBonfire : function (player, itemId, slot, fire) {
			var OnTarget = Java.extend(Java.type('java.lang.Runnable'), {	
				run : function () {
					Firemaking.runBonfireAction(player, itemId, slot, fire);
				}
			})
			if (!fire.exists()) {
				return;//Player cannot reach fire
			}
			api.moveTo(player, fire, new OnTarget());
		},
		runBonfireAction : function (player, itemId, slot, fire) {
			var log = this.forItem(itemId);//Find the log type
			if (api.getStatLevel(player, Stat.FIREMAKING) < log.level) {
				api.sendMessage(player, "You need a firemaking level of at least "+log.level+" to add these logs to a bonfire.");
				return;
			}
			api.setRenderAnim(player, 2498);
			var delay = 0;
			var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					if (delay <= 0) {
						if (api.carriedItemTotal(player, itemId) < 1 || !fire.exists()) {
							return true;
						}
						Firemaking.addLogToFire(player, itemId, slot, log);
						delay = 6;
					}
					delay--;
					return false;
				},
				stop : function (player) {//Clear the current animation block
					api.setRenderAnim(player, -1);
				}

			});
			player.setAction(new Action());
		},
		addLogToFire : function (player, itemID, slot, log) {
			api.delCarriedItem(player, itemID, 1, slot);//Remove logs
			api.addExperience(player, Stat.FIREMAKING, log.bonfirexp, true);//Add firemaking xp
			api.runAnimation(player, 16703);
			api.setSpotAnim(player, 1, log.bonfireGfx);
			api.sendMessage(player, "You add a log to the fire.", MesType.GAME_SPAM);
		},
		firemakingSuccess : function (player, log) {
			api.removeDroppedItem(api.getCoords(player), log.itemID);
			api.spawnLocation(api.createLocation(log.fireID, api.getCoords(player), 10, 0), log.duration);//Spawn the fire
			api.moveAdjacent(player);
			api.addExperience(player, Stat.FIREMAKING, log.xp, true);//Add firemaking xp
			api.sendMessage(player, "The fire catches and the logs begin to burn.", MesType.GAME_SPAM);
		},
		blockNodeTypes : [10],
		tileEmpty : function (coords, region) {
			for (var type in this.blockNodeTypes) {
				if (api.getLocationByNodeType(coords.getX(), coords.getY(), coords.getPlane(), this.blockNodeTypes[type]) != null) {
					return false;
				}
			}
			return true;
		},
		forItem : function (itemID) {
			for (var ordinal in Log) {
				if (Log[ordinal].itemID == itemID) {
					return Log[ordinal];
				}
			}
			return null;
		},
		getDelay : function (player, log) {
			return 10;//TODO: Figure out the correct calculation for this
		}
}

