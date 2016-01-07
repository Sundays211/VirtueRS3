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
var FaceDirectionBlock = Java.type('org.virtue.network.protocol.update.block.FaceDirectionBlock');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 06/11/2014
 */

var LodestoneType = {	
	BANDIT_CAMP : {
		base : 69827,
		tile : api.getCoords(3214, 2955, 0),
		varbit : -1
	},
	LUNAR_ISLE : {
		base : 69828,
		tile : api.getCoords(2085, 3915, 0),
		varbit : -1
	},
	AL_KHARID : {
		base : 69829,
		tile : api.getCoords(3297, 3185, 0),
		varbit : 28
	},
	ARDOUGNE : {
		base : 69830,
		tile : api.getCoords(2634, 3349, 0),
		varbit : 29
	},
	BURTHORPE : {
		base : 69831,
		tile : api.getCoords(2899, 3545, 0),
		varbit : 30
	},
	CATHERBY : {
		base : 69832,
		tile : api.getCoords(2831, 3452, 0),
		varbit : 31
	},
	DRAYNOR_VILLAGE : {
		base : 69833,
		tile : api.getCoords(3105, 3299, 0),
		varbit : 32
	},
	EDGEVILLE : {
		base : 69834,
		tile : api.getCoords(3067, 3506, 0),
		varbit : 33
	},
	FALADOR : {
		base : 69835,
		tile : api.getCoords(2967, 3404, 0),
		varbit : 34
	},
	LUMBRIDGE : {
		base : 69836,
		tile : api.getCoords(3233, 3222, 0),
		varbit: 35
	},
	PORT_SARIM : {
		base : 69837,
		tile : api.getCoords(3011, 3216, 0),
		varbit : 36
	},
	SEERS_VILLAGE : {
		base : 69838,
		tile : api.getCoords(2689, 3483, 0),
		varbit : 37
	},
	TAVERLY : {
		base : 69839,
		tile : api.getCoords(2878, 3443, 0),
		varbit : 38
	},
	VARROCK : {
		base : 69840,
		tile : api.getCoords(3214, 3377, 0),
		varbit : 39
	},
	YANILLE : {
		base : 69841,
		tile : api.getCoords(2529, 3095, 0),
		varbit : 40
	},
	CANIFIS : {
		base : 84748,
		tile : api.getCoords(3517, 3516, 0),
		varbit : 18523
	},
	EAGLES_PEEK : {
		base : 84749,
		tile : api.getCoords(2366, 3480, 0),
		varbit : 18524
	},
	FREMINIK_PROVINCE : {
		base : 84750,
		tile : api.getCoords(2712, 3678, 0),
		varbit : 18525
	},
	KARAMJA : {
		base : 84751,
		tile : api.getCoords(2761, 3148, 0),
		varbit : 18526
	},
	OOGLOG : {
		base : 84752,
		tile : api.getCoords(2532, 2872, 0),
		varbit : 18527
	},
	TIRANNWN : {
		base : 84753,
		tile : api.getCoords(2254, 3150, 0),
		varbit : 18528
	},
	WILDERNESS_VOLCANO : {
		base : 84754,
		tile : api.getCoords(3143, 3636, 0),
		varbit : 18529
	},
	ASHDALE : {
		base : 66532,
		tile : api.getCoords(2474, 2709, 2),
		varbit : 22430
	},
	PRIFDDINAS : {
		base : 93370,
		tile : api.getCoords(2208, 3361, 1),
		varbit : 24967
	}
};

/**
 * If set to true, players can travel to lodestones they haven't unlocked yet
 */
BYPASS_UNLOCK = true;

var LodestoneListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		var lodestone = forObject(locTypeId);
		var transformed = api.getLocType(player, lodestone.base);
		if (transformed.op[option-1].toUpperCase() == "activate".toUpperCase()) {
			if (lodestone.varbit == -1) {
				api.sendMessage(player, "Unhandled lodestone activation for "+transformed.name+" - varpbit has not been found yet.");
			} else {
				api.setVarBit(player, lodestone.varbit, 1);
				api.sendMessage(player, "You have activated the "+transformed.name+".");
			}
		} else {
			api.sendMessage(player, "Unhandled lodestone action: object="+object+", option="+transformed.op[option-1]);
		}
	}
});

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		return [1092];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		
	},

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		if (component == 47) {
			return true;//Close button - handled on the client side.
		}
		var lodestone = forComponent(component);
		if (lodestone === null) {
			player.getDispatcher().sendGameMessage("Unhandled lodestone action: component="+component+", option="+option);
		} else {
			if (BYPASS_UNLOCK || lodestone.varbit == -1 || player.getVars().getVarpBit(lodestone.varbit) == 1) {
				api.closeCentralWidgets(player);
				runHomeTeleport(player, lodestone.tile);
			} else {
				var locType = api.getLocType(player, lodestone.base);
				player.getDispatcher().sendGameMessage("You'll need to unlock the "+locType.name+" before you can Home Teleport there.");
			}
		}
		return true;
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

/* Listen to the widget and location events specified */
var listen = function(scriptManager) {
	var ids = [];
	for (var i in LodestoneType) {
		ids.push(LodestoneType[i].base);
	}
	var lodestoneListener = new LodestoneListener();
	for (var i in ids) {
		//Bind option one on all lodestones to this listener
		scriptManager.registerListener(EventType.OPLOC1, ids[i], lodestoneListener);
	}
	var widListener = new WidgetListener();

	scriptManager.registerWidgetListener(widListener, widListener.getIDs());
};

/**
 * Queues and runs the home teleport action
 * @param player The player
 * @param tile The target tile
 */
function runHomeTeleport (player, dest) {
	var frame = 0;
	var landSpot = api.offsetCoords(dest, 0, -1, 0);
	
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {//The initial emote (drawing circle/reading book)
				api.runAnimation(player, 16385);
				api.setSpotAnim(player, 1, 3017);
			} else if (frame == 18) {//Actually moving the player
				api.teleportEntity(player, dest);
				api.faceCoords(player, landSpot);
				api.pausePlayer(player, 7);
			} else if (frame == 19) {//The landing emotion
				api.runAnimation(player, 16386);
				api.setSpotAnim(player, 1, 3018);
			} else if  (frame == 23) {//The post-landing movement
				api.runAnimation(player, 16393);
			} else if (frame == 25) {//Corrects the player's tile (otherwise it resets after about 10 seconds)
				api.teleportEntityBy(player, 0, -1, 0);
				return true;
			}
			frame++;
			return false;
		},
		stop : function (player) {//Clear the current animation and graphics block
			api.stopAnimation(player);
			api.clearSpotAnim(player, 1);
		}
	});
	
	player.setAction(new Action());
}

function forObject (objectID) {
	for (ordial in Lodestone) {
		if (LodestoneType[ordial].base == objectID) {
			return LodestoneType[ordial];
		}
	}
}

function forComponent (component) {
	switch (component) {
	case 4:
		return LodestoneType.BANDIT_CAMP;
	case 15:
		return LodestoneType.LUNAR_ISLE;
	case 16:
		return LodestoneType.AL_KHARID;
	case 17:
		return LodestoneType.ARDOUGNE;
	case 18:
		return LodestoneType.BURTHORPE;
	case 19:
		return LodestoneType.CATHERBY;
	case 20:
		return LodestoneType.DRAYNOR_VILLAGE;
	case 21:
		return LodestoneType.EDGEVILLE;
	case 22:
		return LodestoneType.FALADOR;
	case 23:
		return LodestoneType.LUMBRIDGE;
	case 24:
		return LodestoneType.PORT_SARIM;
	case 25:
		return LodestoneType.SEERS_VILLAGE;
	case 26:
		return LodestoneType.TAVERLY;
	case 27:
		return LodestoneType.VARROCK;
	case 28:
		return LodestoneType.YANILLE;
	case 29:
		return LodestoneType.CANIFIS;
	case 30:
		return LodestoneType.EAGLES_PEEK;
	case 31:
		return LodestoneType.FREMINIK_PROVINCE;
	case 32:
		return LodestoneType.KARAMJA;
	case 33:
		return LodestoneType.OOGLOG;
	case 34:
		return LodestoneType.TIRANNWN;
	case 35:
		return LodestoneType.WILDERNESS_VOLCANO;
	case 36:
		return LodestoneType.ASHDALE;
	case 37:
		return LodestoneType.PRIFDDINAS;
	default:
		return null;
	}
}