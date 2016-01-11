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
		coords : api.getCoords(3214, 2955, 0),
		varbit : -1
	},
	LUNAR_ISLE : {
		base : 69828,
		coords : api.getCoords(2085, 3915, 0),
		varbit : -1
	},
	AL_KHARID : {
		base : 69829,
		coords : api.getCoords(3297, 3185, 0),
		varbit : 28
	},
	ARDOUGNE : {
		base : 69830,
		coords : api.getCoords(2634, 3349, 0),
		varbit : 29
	},
	BURTHORPE : {
		base : 69831,
		coords : api.getCoords(2899, 3545, 0),
		varbit : 30
	},
	CATHERBY : {
		base : 69832,
		coords : api.getCoords(2831, 3452, 0),
		varbit : 31
	},
	DRAYNOR_VILLAGE : {
		base : 69833,
		coords : api.getCoords(3105, 3299, 0),
		varbit : 32
	},
	EDGEVILLE : {
		base : 69834,
		coords : api.getCoords(3067, 3506, 0),
		varbit : 33
	},
	FALADOR : {
		base : 69835,
		coords : api.getCoords(2967, 3404, 0),
		varbit : 34
	},
	LUMBRIDGE : {
		base : 69836,
		coords : api.getCoords(3233, 3222, 0),
		varbit: 35
	},
	PORT_SARIM : {
		base : 69837,
		coords : api.getCoords(3011, 3216, 0),
		varbit : 36
	},
	SEERS_VILLAGE : {
		base : 69838,
		coords : api.getCoords(2689, 3483, 0),
		varbit : 37
	},
	TAVERLY : {
		base : 69839,
		coords : api.getCoords(2878, 3443, 0),
		varbit : 38
	},
	VARROCK : {
		base : 69840,
		coords : api.getCoords(3214, 3377, 0),
		varbit : 39
	},
	YANILLE : {
		base : 69841,
		coords : api.getCoords(2529, 3095, 0),
		varbit : 40
	},
	CANIFIS : {
		base : 84748,
		coords : api.getCoords(3517, 3516, 0),
		varbit : 18523
	},
	EAGLES_PEEK : {
		base : 84749,
		coords : api.getCoords(2366, 3480, 0),
		varbit : 18524
	},
	FREMINIK_PROVINCE : {
		base : 84750,
		coords : api.getCoords(2712, 3678, 0),
		varbit : 18525
	},
	KARAMJA : {
		base : 84751,
		coords : api.getCoords(2761, 3148, 0),
		varbit : 18526
	},
	OOGLOG : {
		base : 84752,
		coords : api.getCoords(2532, 2872, 0),
		varbit : 18527
	},
	TIRANNWN : {
		base : 84753,
		coords : api.getCoords(2254, 3150, 0),
		varbit : 18528
	},
	WILDERNESS_VOLCANO : {
		base : 84754,
		coords : api.getCoords(3143, 3636, 0),
		varbit : 18529
	},
	ASHDALE : {
		base : 66532,
		coords : api.getCoords(2474, 2709, 2),
		varbit : 22430
	},
	PRIFDDINAS : {
		base : 93370,
		coords : api.getCoords(2208, 3361, 1),
		varbit : 24967
	}
};

var LodestoneListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		
		var lodestone = Lodestones.getById(locTypeId);
		var transformed = api.getLocType(player, lodestone.base);
		if (lodestone.varbit == -1) {
			api.sendMessage(player, "Unhandled lodestone activation for "+transformed.name+" - varpbit has not been found yet.");
		} else {
			api.setVarBit(player, lodestone.varbit, 1);
			api.sendMessage(player, "You have activated the "+transformed.name+".");
		}
	}
});

var LodestoneInterfaceListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, ifaceId, args) {
		var player = args.player;
		
		switch (args.component) {
		case 8://Bandit camp lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.BANDIT_CAMP);
			return;
		case 9://Lunar lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.LUNAR_ISLE);
			return;
		case 10://Al Kharid lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.AL_KHARID);
			return;
		case 11://Ardougne lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.ARDOUGNE);
			return;
		case 12://Burthorpe lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.BURTHORPE);
			return;
		case 13://Catherby lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.CATHERBY);
			return;
		case 14://Draynor lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.DRAYNOR_VILLAGE);
			return;
		case 15://Edgeville lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.EDGEVILLE);
			return;
		case 16://Falador lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.FALADOR);
			return;
		case 17://Lumbridge lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.LUMBRIDGE);
			return;
		case 18://Port sarim lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.PORT_SARIM);
			return;
		case 19://Seers village lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.SEERS_VILLAGE);
			return;
		case 20://Taverly lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.TAVERLY);
			return;
		case 21://Varrock lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.VARROCK);
			return;
		case 22://Yanille lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.YANILLE);
			return;
		case 23://Canifis lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.CANIFIS);
			return;
		case 24://Eagles peak lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.EAGLES_PEEK);
			return;
		case 25://Fremennik lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.FREMINIK_PROVINCE);
			return;
		case 26://Karamja lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.KARAMJA);
			return;
		case 27://Oo'glog lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.OOGLOG);
			return;
		case 28://Tirannwn lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.TIRANNWN);
			return;
		case 29://Wilderness lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.WILDERNESS_VOLCANO);
			return;
		case 30://Ashdale lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.ASHDALE);
			return;
		case 31://Prifddinas lodestone
			Lodestones.teleportToLodestone(player, LodestoneType.PRIFDDINAS);
			return;
		case 33://Iceberg lodestone
			api.sendMessage(player, "Unhandled iceberg teleport.");
			return;
		case 50://Close button
			return;
		case 58://Enable/disable quick teleport
		default:
			api.sendMessage(player, "Unhandled lodestone button: comp="+args.component+", button="+args.button);
			return;
		}
	}
});

/* Listen to the widget and location events specified */
var listen = function(scriptManager) {
	var ids = [];
	for (var i in LodestoneType) {
		ids.push(LodestoneType[i].base);
	}
	var listener = new LodestoneListener();
	for (var i in ids) {
		//Bind option one on all lodestones to this listener
		scriptManager.registerListener(EventType.OPLOC1, ids[i], listener);
	}
	listener = new LodestoneInterfaceListener();

	scriptManager.registerListener(EventType.IF_BUTTON, 1092, listener);
};

var Lodestones = {
		teleportToLodestone : function (player, lodestone) {
			if (lodestone.varbit == -1 || api.getVarBit(player, lodestone.varbit) == 1) {
				api.closeCentralWidgets(player);
				this.runHomeTeleport(player, lodestone.coords);
			} else {
				var locType = api.getLocType(player, lodestone.base);
				api.sendMessage(player, "You'll need to unlock the "+locType.name+" before you can Home Teleport there.");
			}
		},
		
		/**
		 * Queues and runs the home teleport action
		 * @param player The player
		 * @param tile The target tile
		 */
		runHomeTeleport : function (player, dest) {
			var frame = 0;
			var landSpot = api.offsetCoords(dest, 0, -1, 0);
			api.setSpotAnim(player, 1, 3017);
			runAnimation(player, 16385, function () {//The initial animation (drawing circle/reading book)
				api.teleportEntity(player, dest);
				api.faceCoords(player, landSpot);
				api.setSpotAnim(player, 1, 3018);
				runAnimation(player, 16386, function () {//The landing animation
					runAnimation(player, 16393, function () {//The post-landing movement
						//Corrects the player's tile (otherwise it resets after about 10 seconds)
						//FIXME: This makes the player 'jump' by one coordinate 
						api.teleportEntity(player, landSpot);						
					});
				});
			});
		},
		
		getById : function (id) {
			for (var ordial in Lodestone) {
				if (LodestoneType[ordial].base == id) {
					return LodestoneType[ordial];
				}
			}
		}
}