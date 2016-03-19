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
 * @author Kayla
 * @since 01/16/2015
 * @author rsJuuuuu
 */
var BACKPACK = 93;

//Also contains blackjack targets
//Items are arrays in the syntax of [id, amount]
//if amount is an array the first element will be treated as min amount and
//the second element will be treated at max, result will be random number between those
//TODO implement correct drop rates on drops
var PickpocketNPCs = {
	MAN : {
	    ids : [1,2,3],
		level : 1,
		xp : 8,
		items : [[995,3]],
		stunTime : 5, //in seconds
		stunDamage : 10, //in lp (990 max)
		multiples: [[11,1],[21,11],[31,21]] //double,triple,quadruple (thief,agility)
	},
	WOMEN : {
        ids : [4,5,6],
		level : 1,
        xp : 8,
        items : [995,3],
        stunTime : 5, //in seconds
        stunDamage : 10,
        multiples: [[11,1],[21,11],[31,21]] //double,triple,quadruple (thief,agility)
	},
	FARMER : {
	    ids : [7],
		level : 10,
		xp : 14.5,
		items : [[995,9],[5318]],
		stunTime : 5,
		stunDamage : 10,
		multiples : [[20,10],[30,20],[40,30]]
	},
	HAM_FEMALE : {
	    ids : [1715],
	    level : 15,
	    xp : 18.5,
	    items : [[950],[1511],[1625],[33264],[321],[995,[2,21]],[2138],[686],[697],
                [199],[201],[203],[688],[453,1],[454,[1,5]],[440],[441,[1,5]],[1739], [2370]],
	    stunTime : 4,
	    stunDamage : [10, 30],
	    multiples : [[25,15],[35,25],[45,35]]
	},
	HAM_MALE : {
	    ids : [1714],
	    level : 20,
	    xp : 22.5,
	    items : [[950],[1511],[1625],[33264],[321],[995,[2,21]],[2138],[686],[697],
        	    [199],[201],[203],[688],[453,1],[454,[1,5]],[440],[441,[1,5]],[1739], [2370]],
	    stunTime : 4,
	    stunDamage : [10,30],
	    multiples : [[30,20],[40,30],[50,40]]
	},
	HAM_GUARD : {
	    ids : [-1],//TODO No pickpocket option on these? I think it unlocks after Death to the Dorgeshuun
	    level : 20,
	    xp : 22.5,
	    items : [[950],[1511],[1625],[33264],[321],[995,[2,21]],[2138],[686],[697],
                [199],[201],[203],[688],[453,1],[454,[1,5]],[440],[441,[1,5]],[1739], [2370]],
	    stunTime : 4,
	    stunDamage : [10,30],
	    multiples : [[30,20],[40,30],[50,40]]
	},
	WARRIOR : {
	    ids : [15,18],
	    level : 25,
	    xp : 26.0,
	    items : [[995,18], [18757]],
	    stunTime : 5,
	    stunDamage : 20,
	    multiples : [[35,25],[45,35],[55,45]]
	},
	ROGUE : {
	    ids : [187],
	    level : 32,
	    xp : 35.5,
	    items : [[995,[25,120]],[556,8],[1993],[1523],[1944],[1203]],
	    stunTime : 5,
	    stunDamage : 20,
	    multiples : [[42,32],[52,42],[62,52]]
	},
	CAVE_GOBLIN : {
	    ids : [5752,5753,5755,5756,5757,5758,5759],
	    level : 36,
	    xp : 40,
	    items : [[995,11],[995,28],[995,32],[995,46],[4537],[4546],[590],[596],[10981],[441,[1,17]],[1939]],
	    stunTime : 5,
	    stunDamage : 10,
	    multiples : [[46,36],[56,46],[66,56]]
	},
	MASTER_FARMER : {
	    ids : [2234,2235,3299],
	    level : 38,
	    xp : 43,
	    items : [[5324,[1,3]],[5319,[1,3]],[5318,[1,3]],[5320,[1,2]],[5322,[1,2]],[5323],[5321],
	            [5308,[1,2]],[5305,[1,4]],[5307,[1,3]],[5306,[1,3]],[5310],[5309,[1,2]],[5311]],
	    stunTime : 5,
	    stunDamage : 30,
	    multiples : [[48,38],[58,48],[68,58]]
	},
	GUARD : {
	    ids : [9,32,296,297,298,299],
	    level : 40,
	    xp : 46.5,
	    items : [[995,30]],
	    stunTime : 5,
	    stunDamage : 20,
	    multiples : [[50,40],[60,50],[70,60]]
	},
	FREMENNIK_CITIZEN : {
	    ids : [1305,1306,1307,1308,1309,1310,1311,1312,1313,1314],
	    level : 45,
	    xp : 65,
	    items : [[995,40]],
	    stunTime : 5,
	    stunDamage : 20,
	    multiples : [[55,45],[65,55],[75,65]]
	},
	BEARDED_POLLNIVNIAN_BANDIT : {
	    ids : [6174,6388],
	    level : 45,
	    xp : 45,
	    items : [[995,40]],
	    stunTime : 5,
	    stunDamage : 20,
	    multiples : [[55,45],[65,55],[75,65]]
	},
	DESERT_BANDIT : {
	    ids : [1926,1931],
	    level : 53,
	    xp: 79.5,
	    items : [[995,30],[179],[1523]],
	    stunTime : 5,
	    stunDamage : 30,
	    multiples : [[63,53],[73,63],[83,73]]
	},
	KNIGHT_OF_ARDOUGNE : {
	    ids : [23,26],
	    level : 55,
	    xp : 84.3,
	    items : [[995,50]],
	    stunTime : 5,
	    stunDamage : 30,
	    multiples : [[65,55],[75,65],[85,75]]
	},
	POLLINIVNIAN_BANDIT : {
	    ids : [1880,1881],
	    level : 55,
	    xp : 84.3,
	    items : [[995,50]],
	    stunTime : 5,
	    stunDamage : 50,
	    multiples : [[65,55],[75,65],[85,75]]
	},
	YANILLE_WATCHMAN : {
	    ids : [34],
	    level : 65,
	    xp : 137.5,
	    items : [[995,60],[2309]],
	    stunTime : 5,
	    stunDamage : 30,
	    multiples : [[75,65],[85,75],[95,85]]
	},
	MENAPHITE_THUG : {
	    ids : [1905],
	    level : 65,
	    xp : 137.5,
	    items : [[995,60]],
	    stunTime : 5,
	    stunDamage : 50,
	    multiples : [[75,65],[85,75],[95,85]]
	},
	PALADIN : {
	    ids : [20,2256],
	    level : 70,
	    xp : 151.75,
	    items : [[995,80],[562,2]],
	    stunTime : 5, // ? No value in runewiki
	    stunDamage : 30,
	    multiples : [[80,70],[90,80],[200,200]] // 200,200 cuz never quad
	},
	//TODO this should stun always when not knocked out, and stun never if knocked successfully if caught while knocking stun for few secs
	MONKEY_KNIFE_FIGHTER : {
	    ids : [13212],
	    level : 70,
	    xp : [20,150],
	    items : [[995,[1,50]],[869,[1,10]],[25902,[1,10]],[379],[1329],[1331],[4587],[1333]],
	    stunTime : 5,
	    stunDamage : 60,
	    multiples : [[200,200],[200,200],[200,200]]
	},
	GNOME : {
	    ids : [66,67,68,168,169],
	    level : 75,
	    xp : 198.5,
	    items : [[995,300],[2162],[2150],[569],[444],[577],[28266],[28265],[28260],[28259]],
	    stunTime : 5,
	    stunDamage : 0,
	    stunDamageLpPercentage : 3,
	    multiples : [[85,75],[95,85],[200,200]]
	},
	HERO : {
	    ids : [21],
	    level : 80,
	    xp : 273.3,
	    items : [995,[200,300],[1601],[569],[1993],[444],[565],[560,2]],
	    stunTime : 6,
	    stunDamage : 40,
	    multiples : [[90,80],[200,200],[200,200]]
	},
	ELVES : {
	    ids : [2363,2364,2365,2366],
	    level : 85,
	    xp : 353.3,
	    items : [[995,280],[995,350],[995,240],[28259],[28261],[28260],[1993],[560,2],
	            [561,3],[569],[28265],[28266],[28262],[28258],[444],[1601],[28263],
	            [28264],[28267],[28547],[28548],[28549]],
	    stunTime : 6,
	    stunDamage : 50,
	    stunDamageLpPercentage : 3,
	    multiples : [[95,85],[200,200],[200,200]]
	},
	DWARF_TRADER : {
	    ids : [2109,2110,2111,2112,2113,2114,2115,2116,2117,2118,2119,2120,2121,2122,2124,2126],
	    level : 90,
	    xp : 556.5,
	    items : [[995,[100,400]],[2350],[2352],[2354],[2360],[2362],[2364],[454],[439],[437],
	            [441],[448],[450][452],[28266],[28265],[28260],[28259],[28261],[28258],[28263],
	            [28264],[28262],[28267],[18757],[28547],[28548],[28549],[33269]],
	    stunTime : 5,
	    stunDamage : 10,
	    multiples : [[100,85], [200,200],[200,200]]
	}

};
//market guard id 2236
var Stall = {
	SILK : {
		level : 1,
		stallID : 34383,
		xp : 8,
		itemID : 995,
		itemAmount : 20,
		baseTime : 4,
	}
};

var PickpocketListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function(event, npcTypeId, args) {
	    if (api.isFrozen(args.player)) {
	        api.sendMessage(args.player, "You can't do that while stunned.");
	        return false;
        }
		Thieving.startPickpocket(args.player, args.npc);
	}
});

var LocationListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function(event, locTypeId, args) {
		Thieving.startStall(args.player, args.location);
	}
});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var stalls = [ 34383 ];
	var stallListener = new LocationListener();
	for ( var i in stalls) {
		scriptManager.registerListener(EventType.OPLOC2, stalls[i], stallListener);
	}

	var listener = new PickpocketListener();
	for (var ordinal in PickpocketNPCs){
	    for(var i = 0; i < PickpocketNPCs[ordinal].ids.length; i++){
	        scriptManager.registerListener(EventType.OPNPC3,PickpocketNPCs[ordinal].ids[i], listener);
	    }
	}
};

var Thieving = {
		startStall : function (player, loc) {
			var stall = this.forStall(api.getLocType(loc).name);

			if (api.getStatLevel(player, Stat.THIEVING) < stall.level) {
				api.sendMessage(player, "You need a thieving level of " + stall.level + " to steal from this " + api.getLocType(stall.stallID).name + ".");
				return;
			}
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "Not enough space in your inventory.");
				return;
			}
			api.runAnimation(player, 881);
			var delay = this.getStallDelay(player, stall);
			api.freezeEntity(player, delay + 1);
			var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
				process : function(player) {
					api.runAnimation(player, 881);
					if (delay <= 0) {
						Thieving.forStallItem(player, stall, loc);
						return true;
					}
					delay--;
					return false;
				},
				stop : function(player) {
					api.stopAnimation(player);
				}

			});
			player.setAction(new Action());
		},
		
		forStallItem : function (player, stall, object) {
			api.addExperience(player, Stat.THIEVING, stall.xp, true);
			api.addCarriedItem(player, stall.itemID, stall.itemAmount);
			api.sendFilterMessage(player, "You successfully stole from the " + api.getLocType(object).name + ".");
		},
		
		getStallDelay : function (player, stall) {
			return stall.baseTime;
		},
		
		forStall : function (name) {
			switch (name) {
			case "Silk stall":
				return Stall.SILK;
			}
		},
		
		startPickpocket : function (player, npc) {
			var thieving = Thieving.forNPC(npc.getID());
			if (thieving == null)
				return;

			api.faceEntity(player, npc);
			if (api.getStatLevel(player, Stat.THIEVING) < thieving.level) {
				api.sendMessage(player, "You need a thieving level of "
						+ thieving.level + " to steal from this "
						+ npc.name + ".");
				return;
			}
			if (api.freeSpaceTotal(player, Inv.BACKPACK) < 1) {
				api.sendMessage(player, "Not enough space in your inventory.");
				return;
			}
			if (Math.random() <= Thieving.getThievingChance(thieving)) {
			    api.sendMessage(player, "You fail to pick the " + npc.name.toLowerCase() + "'s pocket.")
				api.freezeEntity(player, thieving.stunTime/0.6);
				api.sendMessage(player, "You've been stunned.");
				api.setSpotAnim(player, 1, 80);
				api.runAnimation(player, 834);
				var delay = thieving.stunTime/0.6;
				var damage = thieving.stunDamage;
				if(typeof thieving.stunDamageLpPercentage !== 'undefined')
				    damage += player.getImpactHandler().getLifepoints()*thieving.stunDamageLpPercentage/100;
				api.hitEntity(player, damage);
				api.entitySay(npc, "What do you think you're doing?")
				var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
                    process : function(player) {
                        if (delay <= 0) {
                            return true;
                        }
                        delay--;
                        return false;
                        },
                    stop : function(player) {
                        api.stopAnimation(player);
                        api.clearSpotAnim(player,1);
                    }
                });
                player.setAction(new Action());
			} else {
				api.runAnimation(player, 881);
				var delay = 3
				api.freezeEntity(player, delay + 1);
				var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
					process : function(player) {
						api.runAnimation(player, 881);
						if (delay <= 0) {
							Thieving.forThievingItem(player, thieving, npc);
							return true;
						}
						delay--;
						return false;
					},
					stop : function(player) {
						api.stopAnimation(player);
					}

				});
				player.setAction(new Action());
			}
		},

		forThievingItem : function (player, thieving, npc) {
		//TODO implement multiples
			api.addExperience(player, Stat.THIEVING, thieving.xp, true);
			var rand = Math.round(Math.random()*(thieving.items.length-1));
			if(typeof thieving.items[rand][1] === 'undefined')
			    api.addCarriedItem(player, thieving.items[rand][0], 1);
			else{
			    if(thieving.items[rand][1].constructor === Array){
                    var amount = Math.round(Math.random()*(thieving.items[rand][1][1]-thieving.items[rand][1][0]))+thieving.items[rand][1][0];
                    api.addCarriedItem(player, thieving.items[rand][0], amount);
			    }else
			        api.addCarriedItem(player, thieving.items[rand][0], thieving.items[rand][1]);
            }
			api.sendFilterMessage(player, "You pick the "
					+ npc.name.toLowerCase() + "'s pocket.");
		},

		getThievingChance : function (player, thieving) {
		    return 0.5; //TODO Figure out this
		},
		
		forNPC : function (id) {
		    for (var ordinal in PickpocketNPCs) {
		        for(var i = 0; i < PickpocketNPCs[ordinal].ids.length; i++){
		             if (PickpocketNPCs[ordinal].ids[i] === id) {
                        return PickpocketNPCs[ordinal];
                     }
                }
            }
			return null;
		}
}