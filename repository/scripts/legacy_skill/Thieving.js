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
var PickpocketNPCs = {
	MAN : {
	    ids : [1,2,3,4,5,6],
		level : 1,
		xp : 8,
		common : [[995,3]],
		stunTime : 5, //in seconds
		stunDamage : 10 //in lp (990 max)
	},
	FARMER : {
	    ids : [7],
		level : 10,
		xp : 14.5,
		common : [[995,9]],
		rare : [[5318]],
		stunTime : 5,
		stunDamage : 10
	},
	HAM_FEMALE : {
	    ids : [1715],
	    level : 15,
	    xp : 18.5,
	    common : [[1349],[1267],[1205],[1351],[1265],[321],[995,[2,21]],[2138],[1625],[1511]],
	    uncommon : [[4304],[4302],[4306],[4300],[4298],[1129],[4310],[4308],[1353],[1207],[1269],[1739],[686],[2370],
	               [33264],[199],[201],[1627],[203],[454,[1,5]],[441,[1,5]],[453],[440],[688],[697]],
	    rare : [[4170]],
	    stunTime : 4,
	    stunDamage : [10, 30]
	},
	HAM_MALE : {
	    ids : [1714],
	    level : 20,
	    xp : 22.5,
        common : [[1349],[1267],[1205],[1351],[1265],[321],[995,[2,21]],[2138],[1625],[1511]],
        uncommon : [[4304],[4302],[4306],[4300],[4298],[1129],[4310],[4308],[1353],[1207],[1269],[1739],[686],[2370],
                   [33264],[199],[201],[1627],[203],[454,[1,5]],[441,[1,5]],[453],[440],[688],[697]],
        rare : [[4170]],
	    stunTime : 4,
	    stunDamage : [10,30]
	},
	HAM_GUARD : {
	    ids : [-1],//TODO No pickpocket option on these? I think it unlocks after Death to the Dorgeshuun
	    level : 20,
	    xp : 22.5,
	    common : [[1349],[1267],[1205],[1351],[1265],[321],[995,[2,21]],[2138],[1625],[1511]],
        uncommon : [[4304],[4302],[4306],[4300],[4298],[1129],[4310],[4308],[1353],[1207],[1269],[1739],[686],[2370],
                   [33264],[199],[201],[1627],[203],[454,[1,5]],[441,[1,5]],[453],[440],[688],[697]],
        rare : [[4170]],
	    stunTime : 4,
	    stunDamage : [10,30]
	},
	WARRIOR : {
	    ids : [15,18],
	    level : 25,
	    xp : 26.0,
	    common : [[995,18]],
	    rare : [[18757]],
	    stunTime : 5,
	    stunDamage : 20
	},
	ROGUE : {
	    ids : [187],
	    level : 32,
	    xp : 35.5,
	    common : [[995,[25,120]],[556,8],[1993],[1523],[1203]],
	    rare : [[1211],[2357]],
	    stunTime : 5,
	    stunDamage : 20
	},
	CAVE_GOBLIN : {
	    ids : [5752,5753,5755,5756,5757,5758,5759],
	    level : 36,
	    xp : 40,
	    common : [[995,11],[995,28],[995,32],[995,46],[4537],[4546],[590],[596],[10981],[441,[1,17]],[1939],[10965],
	             [10964],[10960],[10962],[10961],[10963]],
	    stunTime : 5,
	    stunDamage : 10
	},
	MASTER_FARMER : {
	    ids : [2234,2235,3299],
	    level : 38,
	    xp : 43,
	    common : [[5324,[1,3]],[5319,[1,3]],[5318,[1,3]],[5320,[1,2]],[5322,[1,2]],[5308,[1,2]],[5305,[1,4]],
	             [5307,[1,3]],[5306,[1,3]],[5102],[5101],[5096],[5097],[5098],[5099],[5291],[5292],[5293],[5294]],
	    uncommon : [[5323],[5310],[5309,[1,2]],[5103],[5104],[5106],[5105],[5100]],
	    rare : [[5321],[5311],[5297],[5296],[5295],[5281],[5282]],
	    veryRare : [[5298],[5299],[5300],[5301],[5302],[5303],[5304],[21621],[5280],[21620]],
	    stunTime : 5,
	    stunDamage : 30
	},
	GUARD : {
	    ids : [9,32,296,297,298,299],
	    level : 40,
	    xp : 46.5,
	    common : [[995,30]],
	    stunTime : 5,
	    stunDamage : 20
	},
	FREMENNIK_CITIZEN : {
	    ids : [1305,1306,1307,1308,1309,1310,1311,1312,1313,1314],
	    level : 45,
	    xp : 65,
	    common : [[995,40]],
	    stunTime : 5,
	    stunDamage : 20
	},
	BEARDED_POLLNIVNIAN_BANDIT : {
	    ids : [6174,6388],
	    level : 45,
	    xp : 45,
	    common : [[995,40]],
	    stunTime : 5,
	    stunDamage : 20
	},
	DESERT_BANDIT : {
	    ids : [1926,1931],
	    level : 53,
	    xp: 79.5,
	    common : [[995,30],[179],[1523]],
	    stunTime : 5,
	    stunDamage : 30
	},
	KNIGHT_OF_ARDOUGNE : {
	    ids : [23,26],
	    level : 55,
	    xp : 84.3,
	    common : [[995,50]],
	    rare : [[18757]],
	    stunTime : 5,
	    stunDamage : 30
	},
	POLLINIVNIAN_BANDIT : {
	    ids : [1880,1881],
	    level : 55,
	    xp : 84.3,
	    common : [[995,50]],
	    stunTime : 5,
	    stunDamage : 50
	},
	YANILLE_WATCHMAN : {
	    ids : [34],
	    level : 65,
	    xp : 137.5,
	    common : [[995,60],[2309]],
	    stunTime : 5,
	    stunDamage : 30
	},
	MENAPHITE_THUG : {
	    ids : [1905],
	    level : 65,
	    xp : 137.5,
	    common : [[995,60]],
	    stunTime : 5,
	    stunDamage : 50
	},
	PALADIN : {
	    ids : [20,2256],
	    level : 70,
	    xp : 151.75,
	    common : [[995,80],[562,2]],
        rare : [[18757]],
	    stunTime : 5, // ? No value in runewiki
	    stunDamage : 30
	},
	//TODO this should stun always when not knocked out, and stun never if knocked successfully if caught while knocking stun for few secs
	MONKEY_KNIFE_FIGHTER : {
	    ids : [13212],
	    level : 70,
	    xp : [20,150],
	    common : [[995,[1,50]],[869,[1,10]],[25902,[1,10]]],
	    uncommon : [[379],[1329]],
	    rare : [[1331]],
	    veryRare : [[4587],[1333]],
	    stunTime : 5,
	    stunDamage : 60,
	},
	GNOME : {
	    ids : [66,67,68,168,169],
	    level : 75,
	    xp : 198.5,
	    common : [[995,300],[2162],[2150],[444],[577],[28266],[28265],[28260],[28259],[28262],[28261]],
	    uncommon : [[569],[28263],[28258]],
	    rare : [[28264],[28267]],
	    veryRare : [[18757]],
	    stunTime : 5,
	    stunDamage : 0,
	    stunDamageLpPercentage : 3
	},
	HERO : {
	    ids : [21],
	    level : 80,
	    xp : 273.3,
	    common : [[995,[200,300]]],
	    uncommon : [[1601],[569],[1993],[444],[565],[560,2]],
	    rare : [[18757]],
	    stunTime : 6,
	    stunDamage : 40
	},
	ELVES : {
	    ids : [2363,2364,2365,2366],
	    level : 85,
	    xp : 353.3,
	    common : [[995,280],[995,350],[995,240],[1993],[560,2],[561,3],[28259],[28261],[28260]],
	    uncommon : [[569],[444],[1601],[28265],[28266],[28258],[28263],[28262]],
	    rare : [[28264],[28267]],
	    veryRare : [[28547],[28548],[28549]],
	    stunTime : 6,
	    stunDamage : 50,
	    stunDamageLpPercentage : 3
	},
	DWARF_TRADER : {
	    ids : [2109,2110,2111,2112,2113,2114,2115,2116,2117,2118,2119,2120,2121,2122,2124,2126],
	    level : 90,
	    xp : 556.5,
	    common : [[995,[100,400]],[2350],[2352],[2354],[2360],[454],[439],[437],[441],[448],[28266],[28265],[28260],
	             [28259],[28261]],
	    uncommon : [[28258],[28263]],
	    rare : [[2362],[2364],[450],[452],[28264],[28262],[28267],[33269]],
	    veryRare : [[28547],[28548],[28549],[18757]],
	    stunTime : 5,
	    stunDamage : 10
	}

};
//market guard id 2236
var Stall = {
    VEGETABLE : {
        level : 2,
        xp : 10,
        ids : [-1]
    },
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

/* Listen to the stall and npc ids specified */
var listen = function(scriptManager) {
	var stalls = [ 34383 ];
	var stallListener = new LocationListener();
	for ( var i in stalls) {
		scriptManager.registerListener(EventType.OPLOC2, stalls[i], stallListener);
	}

    //register pickpocket listeners
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
				//Formula from runewiki
                var multiplesAvailable = 1
                for (var i = 1; i < 4; i++){
                    if(api.getStatLevel(player, 17) > thieving.level + 10 * i && api.getStatLevel(player,16) > thieving.level+10*(i-1))
                        multiplesAvailable++;
                    else
                        break;//Constantly increasing so might as well stop
                }
                //Chance of multiple 1 : amount of multiples unlocked, probably horribly wrong so replace if you know how this should go
                var multiplier = 1+Math.floor(Math.random() * multiplesAvailable);
                var successMessage;
				var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {
					process : function(player) {
                    switch(multiplier){
                    //TODO find the correct multiplier animation ids
                        case 2:
                            api.runAnimation(player, 881);
                            successMessage = "Your lightning-fast reactions allow you to steal double the loot.";
                            break;
                        case 3:
                            api.runAnimation(player, 881);
                            successMessage = "Your lightning-fast reactions allow you to steal triple the loot.";
                            break;
                        case 4:
                            api.runAnimation(player, 881);
                            successMessage = "Your lightning-fast reactions allow you to steal quadruple the loot.";
                            break;
                        default:
                            api.runAnimation(player, 881);
                            successMessage = "You pick the " + npc.name.toLowerCase() + "'s pocket."
                            break;
                    }
						if (delay <= 0) {
							api.sendFilterMessage(player, successMessage);
							Thieving.forThievingItem(player, thieving, npc, multiplier);
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

		forThievingItem : function (player, thieving, npc, multiplier) {


			api.addExperience(player, Stat.THIEVING, thieving.xp, true);
			//Determine which loot set should be used
			var lootChance = Math.random();
			var lootArray;
			if(lootChance > 0.998 && typeof thieving.veryRare !== 'undefined') //1:500
			    lootArray = thieving.veryRare;
			else if(lootChance > 0.99 && typeof thieving.rare !== 'undefined') //1:100
			    lootArray = thieving.rare;
			else if(lootChance > 0.95 && typeof thieving.uncommon !== 'undefined') //1:20
                lootArray = thieving.uncommon;
            else
                lootArray = thieving.common; //rest

            //Pick a random loot from the chosen loot set. Obviously this makes the rates above inaccurate for each item
            //but the rates arent accurate anyway so it's fine I guess
			var rand = Math.round(Math.random()*(lootArray.length-1));
			if(typeof lootArray[rand][1] === 'undefined')
			    api.addCarriedItem(player, lootArray[rand][0], 1);
			else{
			    if(lootArray[rand][1].constructor === Array){
                    var amount = Math.round(Math.random()*(lootArray[rand][1][1]-lootArray[rand][1][0]))+lootArray[rand][1][0];
                    api.addCarriedItem(player, lootArray[rand][0], amount*multiplier);
			    }else
			        api.addCarriedItem(player, lootArray[rand][0], lootArray[rand][1]*multiplier);
            }

		},

		getThievingChance : function (player, thieving) {
		    return 0.10; //TODO Figure out this
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