/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
/* globals EventType, ENGINE */

var util = require('../../core/util');
var widget = require('../../widget');
var anim = require('../../core/anim');
var coords = require('../../map/coords');
var map = require('../../map');
var varbit = require('../../core/var/bit');
var chat = require('../../chat');

module.exports = (function () {
	
	var LodestoneType = {	
		BANDIT_CAMP : {
			base : 69827,
			coords : coords(3214, 2955, 0),
			varbit : 9482
		},
		LUNAR_ISLE : {
			base : 69828,
			coords : coords(2085, 3915, 0),
			varbit : 10236
		},
		AL_KHARID : {
			base : 69829,
			coords : coords(3297, 3185, 0),
			varbit : 28
		},
		ARDOUGNE : {
			base : 69830,
			coords : coords(2634, 3349, 0),
			varbit : 29
		},
		BURTHORPE : {
			base : 69831,
			coords : coords(2899, 3545, 0),
			varbit : 30
		},
		CATHERBY : {
			base : 69832,
			coords : coords(2831, 3452, 0),
			varbit : 31
		},
		DRAYNOR_VILLAGE : {
			base : 69833,
			coords : coords(3105, 3299, 0),
			varbit : 32
		},
		EDGEVILLE : {
			base : 69834,
			coords : coords(3067, 3506, 0),
			varbit : 33
		},
		FALADOR : {
			base : 69835,
			coords : coords(2967, 3404, 0),
			varbit : 34
		},
		LUMBRIDGE : {
			base : 69836,
			coords : coords(3233, 3222, 0),
			varbit: 35
		},
		PORT_SARIM : {
			base : 69837,
			coords : coords(3011, 3216, 0),
			varbit : 36
		},
		SEERS_VILLAGE : {
			base : 69838,
			coords : coords(2689, 3483, 0),
			varbit : 37
		},
		TAVERLY : {
			base : 69839,
			coords : coords(2878, 3443, 0),
			varbit : 38
		},
		VARROCK : {
			base : 69840,
			coords : coords(3214, 3377, 0),
			varbit : 39
		},
		YANILLE : {
			base : 69841,
			coords : coords(2529, 3095, 0),
			varbit : 40
		},
		CANIFIS : {
			base : 84748,
			coords : coords(3517, 3516, 0),
			varbit : 18523
		},
		EAGLES_PEEK : {
			base : 84749,
			coords : coords(2366, 3480, 0),
			varbit : 18524
		},
		FREMINIK_PROVINCE : {
			base : 84750,
			coords : coords(2712, 3678, 0),
			varbit : 18525
		},
		KARAMJA : {
			base : 84751,
			coords : coords(2761, 3148, 0),
			varbit : 18526
		},
		OOGLOG : {
			base : 84752,
			coords : coords(2532, 2872, 0),
			varbit : 18527
		},
		TIRANNWN : {
			base : 84753,
			coords : coords(2254, 3150, 0),
			varbit : 18528
		},
		WILDERNESS_VOLCANO : {
			base : 84754,
			coords : coords(3143, 3636, 0),
			varbit : 18529
		},
		ASHDALE : {
			base : 66532,
			coords : coords(2474, 2709, 2),
			varbit : 22430
		},
		PRIFDDINAS : {
			base : 93370,
			coords : coords(2208, 3361, 1),
			varbit : 24967
		}
	};
	
	
	return {
		init : init
	};
	
		
	function getById (id) {
			for (var ordial in LodestoneType) {
				if (LodestoneType[ordial].base == id) {
					return LodestoneType[ordial];
				}
			}
		}
	
	function init (scriptManager) {
		var ids = [];
	    for (var i in LodestoneType) {
	    	ids.push(LodestoneType[i].base);
	    }
		scriptManager.bind(EventType.OPLOC1, ids, function (ctx) {
	        var lodestone = getById(util.getId(ctx.location));
			var transformed = ENGINE.getLocType(ctx.player, util.getId(ctx.location));
			if (lodestone.varbit == 9482) {	
				varbit(ctx.player, lodestone.varbit, 15);
				chat.sendMessage(ctx.player, "You have activated the "+transformed.name+".");
			} else if (lodestone.varbit == 10236) {	//lunar isle lodestone
				varbit(ctx.player, lodestone.varbit, 190);
				chat.sendMessage(ctx.player, "You have activated the "+transformed.name+".");
			} else {
				varbit(ctx.player, lodestone.varbit, 1);
				chat.sendMessage(ctx.player, "You have activated the "+transformed.name+".");
			}
        });
		
		scriptManager.bind(EventType.IF_BUTTON, 1092, function (ctx) {
			switch (ctx.component) {	
			case 8://Bandit camp lodestone
				teleportToLodestone(ctx.player, LodestoneType.BANDIT_CAMP);
				return;
			case 9://Lunar lodestone
				teleportToLodestone(ctx.player, LodestoneType.LUNAR_ISLE);
				return;
			case 10://Al Kharid lodestone
				teleportToLodestone(ctx.player, LodestoneType.AL_KHARID);
				return;
			case 11://Ardougne lodestone
				teleportToLodestone(ctx.player, LodestoneType.ARDOUGNE);
				return;
			case 12://Burthorpe lodestone
				teleportToLodestone(ctx.player, LodestoneType.BURTHORPE);
				return;
			case 13://Catherby lodestone
				teleportToLodestone(ctx.player, LodestoneType.CATHERBY);
				return;
			case 14://Draynor lodestone
				teleportToLodestone(ctx.player, LodestoneType.DRAYNOR_VILLAGE);
				return;
			case 15://Edgeville lodestone
				teleportToLodestone(ctx.player, LodestoneType.EDGEVILLE);
				return;
			case 16://Falador lodestone
				teleportToLodestone(ctx.player, LodestoneType.FALADOR);
				return;
			case 17://Lumbridge lodestone
				teleportToLodestone(ctx.player, LodestoneType.LUMBRIDGE);
				return;
			case 18://Port sarim lodestone
				teleportToLodestone(ctx.player, LodestoneType.PORT_SARIM);
				return;
			case 19://Seers village lodestone
				teleportToLodestone(ctx.player, LodestoneType.SEERS_VILLAGE);
				return;
			case 20://Taverly lodestone
				teleportToLodestone(ctx.player, LodestoneType.TAVERLY);
				return;
			case 21://Varrock lodestone
			    teleportToLodestone(ctx.player, LodestoneType.VARROCK);
				return;
			case 22://Yanille lodestone
				teleportToLodestone(ctx.player, LodestoneType.YANILLE);
				return;
			case 23://Canifis lodestone
				teleportToLodestone(ctx.player, LodestoneType.CANIFIS);
				return;
			case 24://Eagles peak lodestone
				teleportToLodestone(ctx.player, LodestoneType.EAGLES_PEEK);
				return;
			case 25://Fremennik lodestone
				teleportToLodestone(ctx.player, LodestoneType.FREMINIK_PROVINCE);
				return;
			case 26://Karamja lodestone
				teleportToLodestone(ctx.player, LodestoneType.KARAMJA);
				return;
			case 27://Oo'glog lodestone
				teleportToLodestone(ctx.player, LodestoneType.OOGLOG);
				return;
			case 28://Tirannwn lodestone
				teleportToLodestone(ctx.player, LodestoneType.TIRANNWN);
				return;
			case 29://Wilderness lodestone
				teleportToLodestone(ctx.player, LodestoneType.WILDERNESS_VOLCANO);
				return;
			case 30://Ashdale lodestone
			    teleportToLodestone(ctx.player, LodestoneType.ASHDALE);
				return;
			case 31://Prifddinas lodestone
				teleportToLodestone(ctx.player, LodestoneType.PRIFDDINAS);
				return;
			case 32://jmod event lodestone 
				return;	
			case 33://Iceberg lodestone
				//api.sendMessage(player, "Unhandled iceberg teleport.");
				return;
			case 50://Close button
				return;
			case 49://close
				return;
			case 58://Enable/disable quick teleport
				return;
			default:
				util.defaultHandler(ctx, "Lodestone");
				return;		
			}
		});
	
	}

	function teleportToLodestone(player, dest) {
		if (dest.varbit == -1 || varbit(player, dest.varbit) == 1) {
			widget.closeAll(player);
			var landSpot = ENGINE.offsetCoords(dest.coords, 0, -1, 0);
			anim.addSpotAnim(player,3017);
			anim.run(player, 16385, function () {
				map.setCoords(player, dest.coords);
				ENGINE.faceCoords(player, landSpot);
				anim.addSpotAnim(player, 3018);
				anim.run(player, 16386, function () {
					anim.run(player, 16393, function () {
						anim.run(player, -1); 
						map.setCoords(player, landSpot);
					});
				});
			});
		} else {
			var locType = ENGINE.getLocType(player, dest.base);
			chat.sendMessage(player, "You'll need to unlock the "+locType.name+" before you can Home Teleport there.");
		}
	} 

	
})();
