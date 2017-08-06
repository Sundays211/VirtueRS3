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
var GroundItem = Java.type('org.virtue.game.map.GroundItem');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */

var Log = {
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
		if (Log[log].fireID !== undefined) {
			FIRE_IDS.push(Log[log].fireID);
		}		
	}
	var fireListener = new FireListener();
	for (var i in FIRE_IDS) {
		//Bind option one and five on all fires to this listener (option 1=Add Logs on bonfire, option 5=Use on normal fire)
		scriptManager.registerListener(EventType.OPLOC1, FIRE_IDS[i], fireListener);
		scriptManager.registerListener(EventType.OPLOC5, FIRE_IDS[i], fireListener);
		//Bind use logs on a fire
		scriptManager.registerListener(EventType.OPLOCU, FIRE_IDS[i], fireListener);
	}
	
	for (var log in Log) {
		if (Log[log].itemID !== undefined) {
			LOG_IDS.push(Log[log].itemID);
		}
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
			if (api.getId(item) == Log.EUCALYPTUS.itemID) {
				tools = [590, 24291];
			}
			requestTool(player, "What do you want to use on the logs?", tools, function (toolId) {
				switch (toolId) {
				case 590://Light
					Firemaking.runFiremakingAction(player, item, slot);
					break;
				case 946://Craft
					Fletching.selectProduct(player, api.getId(item), slot);
					//item.handleItemOnItem(player, slot, Item.create(946, 1), -1);//A hacky solution, but it should work
					break;
				case 24291://Add logs to a nearby bonfire
					Firemaking.findBonfire(player, api.getId(item), slot);
					break;
				default:
					api.sendMessage(player, "Unhandled log tool: logs="+item+", toolID="+toolId);
					break;
				}
			});
		},
		runFiremakingAction : function (player, item, slot) {
			var log = this.forItem(api.getId(item));//Find the log type
			if (api.getStatLevel(player, Stat.FIREMAKING) < log.level) {
				api.sendMessage(player, "You need a firemaking level of "+log.level+" to light these logs.");
				return;
			}
			if (api.itemTotal(player, Inv.BACKPACK, 590) < 1 && !Toolbelt.hasTool(player, 590)) {
				api.sendMessage(player, "You need a tinderbox to light these logs.");
				return;
			}
			var delay = 4;//Calculates the time taken to light this log
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
						    if(Math.random() < Firemaking.getFireSuccessRate(player)){
							    Firemaking.firemakingSuccess(player, log);
							    return true;
							}else{
							    delay = 4;
							    return false;
							}
						}
						if (!Firemaking.tileEmpty(player.getCurrentTile(), region) || !item.exists()) {
							return true;//Could not complete as tile is in use
						}
						delay--;
						return false;
					},
					stop : function (player) {//Clear the current animation block
						api.stopAnimation(player);
					}
			
				});
				player.setAction(new Action());	
			}
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
		getFireSuccessRate : function (player) {
		    //A veteran player came up with this for me based on his experience. It starts to succeed always at first try
		    //at level 41. Apparently it's the same regardless of the logs level requirement.
        	return (0.02*(api.getStatLevel(player,Stat.FIREMAKING)-1)+0.2);
		}
}

