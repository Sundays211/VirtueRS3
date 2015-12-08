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


var Tile = Java.type('org.virtue.game.entity.region.Tile');
var AnimationBlock = Java.type('org.virtue.network.protocol.update.block.AnimationBlock');
var GraphicsBlock = Java.type('org.virtue.network.protocol.update.block.GraphicsBlock');
var FaceDirectionBlock = Java.type('org.virtue.network.protocol.update.block.FaceDirectionBlock');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 06/11/2014
 */
var api;

var Lodestone = {	
	BANDIT_CAMP : {
		base : 69827,
		tile : new Tile(3214, 2955, 0),
		varbit : -1
	},
	LUNAR_ISLE : {
		base : 69828,
		tile : new Tile(2085, 3915, 0),
		varbit : -1
	},
	AL_KHARID : {
		base : 69829,
		tile : new Tile(3297, 3185, 0),
		varbit : 28
	},
	ARDOUGNE : {
		base : 69830,
		tile : new Tile(2634, 3349, 0),
		varbit : 29
	},
	BURTHORPE : {
		base : 69831,
		tile : new Tile(2899, 3545, 0),
		varbit : 30
	},
	CATHERBY : {
		base : 69832,
		tile : new Tile(2831, 3452, 0),
		varbit : 31
	},
	DRAYNOR_VILLAGE : {
		base : 69833,
		tile : new Tile(3105, 3299, 0),
		varbit : 32
	},
	EDGEVILLE : {
		base : 69834,
		tile : new Tile(3067, 3506, 0),
		varbit : 33
	},
	FALADOR : {
		base : 69835,
		tile : new Tile(2967, 3404, 0),
		varbit : 34
	},
	LUMBRIDGE : {
		base : 69836,
		tile : new Tile(3233, 3222, 0),
		varbit: 35
	},
	PORT_SARIM : {
		base : 69837,
		tile : new Tile(3011, 3216, 0),
		varbit : 36
	},
	SEERS_VILLAGE : {
		base : 69838,
		tile : new Tile(2689, 3483, 0),
		varbit : 37
	},
	TAVERLY : {
		base : 69839,
		tile : new Tile(2878, 3443, 0),
		varbit : 38
	},
	VARROCK : {
		base : 69840,
		tile : new Tile(3214, 3377, 0),
		varbit : 39
	},
	YANILLE : {
		base : 69841,
		tile : new Tile(2529, 3095, 0),
		varbit : 40
	},
	CANIFIS : {
		base : 84748,
		tile : new Tile(3517, 3516, 0),
		varbit : 18523
	},
	EAGLES_PEEK : {
		base : 84749,
		tile : new Tile(2366, 3480, 0),
		varbit : 18524
	},
	FREMINIK_PROVINCE : {
		base : 84750,
		tile : new Tile(2712, 3678, 0),
		varbit : 18525
	},
	KARAMJA : {
		base : 84751,
		tile : new Tile(2761, 3148, 0),
		varbit : 18526
	},
	OOGLOG : {
		base : 84752,
		tile : new Tile(2532, 2872, 0),
		varbit : 18527
	},
	TIRANNWN : {
		base : 84753,
		tile : new Tile(2254, 3150, 0),
		varbit : 18528
	},
	WILDERNESS_VOLCANO : {
		base : 84754,
		tile : new Tile(3143, 3636, 0),
		varbit : 18529
	},
	ASHDALE : {
		base : 66532,
		tile : new Tile(2474, 2709, 2),
		varbit : 22430
	},
	PRIFDDINAS : {
		base : 93370,
		tile : new Tile(2208, 3361, 1),
		varbit : 24967
	}
};

/**
 * If set to true, players can travel to lodestones they haven't unlocked yet
 */
BYPASS_UNLOCK = true;

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.LocationListener'), {

	/* The object ids to bind to */
	getIDs: function() {
		var ids = [];
		ordinal = 0;
		for (lodestone in Lodestone) {
			ids[ordinal++] = Lodestone[lodestone].base;
		}
		return ids;
	},

	/* The first option on an object */
	handleInteraction: function(player, location, option) {
		var lodestone = forObject(location.getID());
		var transformed = api.getLocType(player, lodestone.base);
		if (transformed.op[option-1].toUpperCase() == "activate".toUpperCase()) {
			if (lodestone.varbit == -1) {
				player.getDispatcher().sendGameMessage("Unhandled lodestone activation for "+transformed.name+" - varpbit has not been found yet.");
			} else {
				player.getVars().setVarpBit(lodestone.varbit, 1);
				player.getDispatcher().sendGameMessage("You have activated the "+transformed.name+".");
			}
		} else {
			//player.getDispatcher().sendGameMessage("Transform for base "+lodestone.base+" = "+transformed);
			player.getDispatcher().sendGameMessage("Unhandled lodestone action: object="+object+", option="+transformed.op[option-1]);
		}
		return true;
	},
	
	/* The range that a player must be within to interact */
	getInteractRange : function (location, option) {
		return 1;
	},
	
	/* A backpack item used on the location */
	handleItemOnLoc : function (player, location, item, invSlot) {
		return false;
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
			//player.getMovement().teleportTo(lodestone.tile);
		}
		return true;
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

/* Listen to the object ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var objListner = new LocationListener();
	var widListener = new WidgetListener();

	scriptManager.registerLocationListener(objListner, objListner.getIDs());
	scriptManager.registerWidgetListener(widListener, widListener.getIDs());
};

/**
 * Queues and runs the home teleport action
 * @param player The player
 * @param tile The target tile
 */
function runHomeTeleport (player, dest) {
	var frame = 0;
	var landSpot = Tile.edit(dest, 0, -1, 0);
	var gfxType = 1;
	
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
		process : function (player) {
			if (frame === 0) {//The initial emote (drawing circle/reading book)
				player.queueUpdateBlock(new AnimationBlock(16385));
				player.queueUpdateBlock(new GraphicsBlock(gfxType, 3017));
			} else if (frame == 18) {//Actually moving the player
				player.getMovement().teleportTo(dest);
				player.queueUpdateBlock(new FaceDirectionBlock(landSpot));
				api.pausePlayer(player, 7);
			} else if (frame == 19) {//The landing emotion
				api.runAnimation(player, 16386);
				player.queueUpdateBlock(new GraphicsBlock(gfxType, 3018));
			} else if  (frame == 23) {//The post-landing movement
				player.queueUpdateBlock(new AnimationBlock(16393));
			} else if (frame == 25) {//Corrects the player's tile (otherwise it resets after about 10 seconds)
				player.getMovement().teleportTo(landSpot);
				return true;
			}
			frame++;
			return false;
		},
		stop : function (player) {//Clear the current animation and graphics block
			player.queueUpdateBlock(new AnimationBlock(-1));
			player.queueUpdateBlock(new GraphicsBlock(gfxType, -1));
		}
	});
	
	player.setAction(new Action());
}

function forObject (objectID) {
	for (ordial in Lodestone) {
		if (Lodestone[ordial].base == objectID) {
			return Lodestone[ordial];
		}
	}
}

function forComponent (component) {
	switch (component) {
	case 4:
		return Lodestone.BANDIT_CAMP;
	case 15:
		return Lodestone.LUNAR_ISLE;
	case 16:
		return Lodestone.AL_KHARID;
	case 17:
		return Lodestone.ARDOUGNE;
	case 18:
		return Lodestone.BURTHORPE;
	case 19:
		return Lodestone.CATHERBY;
	case 20:
		return Lodestone.DRAYNOR_VILLAGE;
	case 21:
		return Lodestone.EDGEVILLE;
	case 22:
		return Lodestone.FALADOR;
	case 23:
		return Lodestone.LUMBRIDGE;
	case 24:
		return Lodestone.PORT_SARIM;
	case 25:
		return Lodestone.SEERS_VILLAGE;
	case 26:
		return Lodestone.TAVERLY;
	case 27:
		return Lodestone.VARROCK;
	case 28:
		return Lodestone.YANILLE;
	case 29:
		return Lodestone.CANIFIS;
	case 30:
		return Lodestone.EAGLES_PEEK;
	case 31:
		return Lodestone.FREMINIK_PROVINCE;
	case 32:
		return Lodestone.KARAMJA;
	case 33:
		return Lodestone.OOGLOG;
	case 34:
		return Lodestone.TIRANNWN;
	case 35:
		return Lodestone.WILDERNESS_VOLCANO;
	case 36:
		return Lodestone.ASHDALE;
	case 37:
		return Lodestone.PRIFDDINAS;
	default:
		return null;
	}
}