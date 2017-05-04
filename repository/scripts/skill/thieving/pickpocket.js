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
/* globals EventType, ENGINE, Stat */
var util = require('../../core/util');
var config = require('../../core/config');
var inv = require('../../core/inv');
var anim = require('../../core/anim');
var stat = require('../logic/stat');

/**
 * @author Kayla
 * @author rsJuuuuu
 * @since 01/16/2015
 */

module.exports = (function () {
	var item = util.lootItem;
	
	function hamCommon () {
		return [ item(1349), item(1267), item(1205), item(1351), item(1265), item(321),
			item(995, 2, 21), item(2138), item(1625), item(1511) ];
	}
	
	function hamUncommon () {
		return [ item(4304), item(4302), item(4306), item(4300), item(4298), item(1129),
			item(4310), item(4308), item(1353), item(1207), item(1269), item(1739), item(686),
			item(2370), item(33264), item(199), item(201), item(1627), item(203),
			item(454, 1, 5), item(441, 1, 5), item(453), item(440), item(688), item(697) ];
	}
	
	//Items are arrays in the syntax of [id, amount]
	//if amount is an array the first element will be treated as min amount and
	//the second element will be treated at max, result will be random number between those

	//market guard id 2236
	var Npc = {
		MAN_WOMAN : {
			level : 1,
			xp : 8,
			common : [ item(995, 3) ],
			stunTime : 5, //in seconds
			stunDamage : 10 //in lp (990 max)
		},
		FARMER : {
			level : 10,
			xp : 14.5,
			common : [ item(995, 9) ],
			rare : [ item(5318) ],
			stunTime : 5,
			stunDamage : 10
		},
		HAM_FEMALE : {
		    level : 15,
		    xp : 18.5,
		    common : hamCommon(),
		    uncommon : hamUncommon(),
		    rare : [ item(4170) ],
		    stunTime : 4,
		    stunDamage : [10, 30]
		},
		HAM_MALE : {
		    level : 20,
		    xp : 22.5,
	        common : hamCommon(),
	        uncommon : hamUncommon(),
	        rare : [ item(4170) ],
		    stunTime : 4,
		    stunDamage : [10,30]
		},
		HAM_GUARD : {
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
		    level : 25,
		    xp : 26.0,
		    common : [ item(995, 18)],
		    rare : [ item(18757) ],
		    stunTime : 5,
		    stunDamage : 20
		},
		ROGUE : {
		    level : 32,
		    xp : 35.5,
		    common : [ item(995, 25, 120), item(556, 8), item(1993), item(1523), item(1203) ],
		    rare : [ item(1211), item(2357) ],
		    stunTime : 5,
		    stunDamage : 20
		},
		CAVE_GOBLIN : {
		    level : 36,
		    xp : 40,
		    common : [ item(995, 11), item(995, 28), item(995, 32), item(995, 46), item(4537),
		    	item(4546), item(590), item(596), item(10981), item(441, 1, 17), item(1939),
		    	item(10965), item(10964), item(10960), item(10962), item(10961), item(10963) ],
		    stunTime : 5,
		    stunDamage : 10
		},
		MASTER_FARMER : {
		    level : 38,
		    xp : 43,
		    common : [ item(5324, 1, 3), item(5319, 1, 3), item(5318, 1, 3), item(5320, 1, 2),
		    	 item(5322, 1, 2), item(5308, 1, 2), item(5305, 1, 4), item(5307, 1, 3),
		    	 item(5306, 1, 3), item(102), item(5101), item(5096), item(5097), item(5098),
		    	 item(5099), item(5291), item(5292), item(5293), item(5294) ],
		    uncommon : [ item(5323), item(5310), item(5309, 1, 2), item(5103),
		    	 item(5104), item(5106), item(5105), item(5100) ],
		    rare : [ item(5321), item(5311), item(5297), item(5296), item(5295), item(5281), item(5282) ],
		    veryRare : [ item(5298), item(5299), item(5300), item(5301), item(5302), item(5303),
		    	 item(5304), item(21621), item(5280), item(21620) ],
		    stunTime : 5,
		    stunDamage : 30
		},
		GUARD : {
		    level : 40,
		    xp : 46.5,
		    common : [ item(995, 30) ],
		    stunTime : 5,
		    stunDamage : 20
		},
		FREMENNIK_CITIZEN : {
		    level : 45,
		    xp : 65,
		    common : [ item(995, 40) ],
		    stunTime : 5,
		    stunDamage : 20
		},
		DESERT_BANDIT : {
		    level : 53,
		    xp: 79.5,
		    common : [ item(995, 30), item(179), item(1523) ],
		    stunTime : 5,
		    stunDamage : 30
		},
		KNIGHT_OF_ARDOUGNE : {
		    level : 55,
		    xp : 84.3,
		    common : [ item(995, 50) ],
		    rare : [ item(18757) ],
		    stunTime : 5,
		    stunDamage : 30
		},
		YANILLE_WATCHMAN : {
		    level : 65,
		    xp : 137.5,
		    common : [ item(995, 60), item(2309) ],
		    stunTime : 5,
		    stunDamage : 30
		},
		PALADIN : {
		    level : 70,
		    xp : 151.75,
		    common : [ item(995, 80), item(562, 2) ],
	        rare : [ item(18757) ],
		    stunTime : 5, // ? No value in runewiki
		    stunDamage : 30
		},
		//TODO this should stun always when not knocked out, and stun never if knocked successfully if caught while knocking stun for few secs
		MONKEY_KNIFE_FIGHTER : {
		    level : 70,
		    xp : 150,//[20,150],
		    common : [ item(995, 1, 50), item(869, 1, 10), item(25902, 1, 10) ],
		    uncommon : [ item(379), item(1329) ],
		    rare : [ item(1331) ],
		    veryRare : [ item(4587), item(1333) ],
		    stunTime : 5,
		    stunDamage : 60,
		},
		GNOME : {
		    level : 75,
		    xp : 198.5,
		    common : [ item(995, 300), item(2162), item(2150), item(444), item(577), item(28266),
		    	item(28265), item(28260), item(28259), item(28262), item(28261) ],
		    uncommon : [ item(569), item(28263), item(28258) ],
		    rare : [ item(28264), item(28267) ],
		    veryRare : [ item(18757) ],
		    stunTime : 5,
		    stunDamage : 0,
		    stunDamageLpPercentage : 3
		},
		HERO : {
		    level : 80,
		    xp : 273.3,
		    common : [ item(995, 200, 300) ],
		    uncommon : [ item(1601), item(569), item(1993), item(444), item(565), item(560, 2) ],
		    rare : [ item(18757) ],
		    stunTime : 6,
		    stunDamage : 40
		},
		ELVES : {
		    level : 85,
		    xp : 353.3,
		    common : [ item(995, 280), item(995, 350), item(995, 240), item(1993), 
		    	item(560, 2), item(561, 3), item(28259), item(28261), item(28260) ],
		    uncommon : [ item(569), item(444), item(1601), item(28265),
		    	 item(28266), item(28258), item(28263), item(28262) ],
		    rare : [ item(28264), item(28267) ],
		    veryRare : [ item(28547), item(28548), item(28549) ],
		    stunTime : 6,
		    stunDamage : 50,
		    stunDamageLpPercentage : 3
		},
		DWARF_TRADER : {
		    level : 90,
		    xp : 556.5,
		    common : [ item(995, 100, 400), item(2350), item(2352), item(2354), item(2360), item(454),
		    	 item(439), item(437), item(441), item(448), item(28266), item(28265), item(28260),
		    	 item(28259), item(28261) ],
		    uncommon : [ item(28258), item(28263) ],
		    rare : [item(2362), item(2364), item(450), item(452), item(28264),
		    	item(28262), item(28267), item(33269) ],
		    veryRare : [ item(28547), item(28548), item(28549), item(18757) ],
		    stunTime : 5,
		    stunDamage : 10
		}

	};
	
	return {
		init : init,
		values : Npc,
		run : pickpocket
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPNPC3, [ 1, 2, 3, 4, 5, 6 ], function (ctx) {
			pickpocket(ctx.player, Npc.MAN_WOMAN, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, 7, function (ctx) {
			pickpocket(ctx.player, Npc.FARMER, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, 1715, function (ctx) {
			pickpocket(ctx.player, Npc.HAM_FEMALE, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, 1714, function (ctx) {
			pickpocket(ctx.player, Npc.HAM_MALE, ctx.npc);
		});
		
		/*scriptManager.bind(EventType.OPNPC3, -1, function (ctx) {
		//TODO No pickpocket option on these? I think it unlocks after Death to the Dorgeshuun
			pickpocket(ctx.player, Npc.HAM_GUARD, ctx.npc);
		});*/
		
		scriptManager.bind(EventType.OPNPC3, [ 15, 18 ], function (ctx) {
			pickpocket(ctx.player, Npc.WARRIOR, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, 187, function (ctx) {
			pickpocket(ctx.player, Npc.ROGUE, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 5752, 5753, 5755, 5756, 5757, 5758, 5759 ], function (ctx) {
			pickpocket(ctx.player, Npc.CAVE_GOBLIN, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 2234, 2235, 3299 ], function (ctx) {
			pickpocket(ctx.player, Npc.MASTER_FARMER, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 9, 32, 296, 297, 298, 299 ], function (ctx) {
			pickpocket(ctx.player, Npc.GUARD, ctx.npc);
		});

		scriptManager.bind(EventType.OPNPC3, [ 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314 ], function (ctx) {
			pickpocket(ctx.player, Npc.FREMENNIK_CITIZEN, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 1926, 1931 ], function (ctx) {
			pickpocket(ctx.player, Npc.DESERT_BANDIT, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 23, 26 ], function (ctx) {
			pickpocket(ctx.player, Npc.KNIGHT_OF_ARDOUGNE, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, 34, function (ctx) {
			pickpocket(ctx.player, Npc.YANILLE_WATCHMAN, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 20, 2256 ], function (ctx) {
			pickpocket(ctx.player, Npc.PALADIN, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, 13212, function (ctx) {
			pickpocket(ctx.player, Npc.MONKEY_KNIFE_FIGHTER, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 66, 67, 68, 168, 169 ], function (ctx) {
			pickpocket(ctx.player, Npc.GNOME, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, 21, function (ctx) {
			pickpocket(ctx.player, Npc.HERO, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 2363, 2364, 2365, 2366 ], function (ctx) {
			pickpocket(ctx.player, Npc.ELVES, ctx.npc);
		});
		
		scriptManager.bind(EventType.OPNPC3, [ 2109, 2110, 2111, 2112, 2113, 2114,
				2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2124, 2126 ], function (ctx) {
			pickpocket(ctx.player, Npc.DWARF_TRADER, ctx.npc);
		});
	}
	
	function pickpocket (player, data, npc) {
		ENGINE.faceEntity(player, npc);
		
		if (stat.getLevel(player, Stat.THIEVING) < data.level) {
			ENGINE.sendMessage(player, "You need a thieving level of " + 
					data.level + " to steal from this " + config.npcName(npc) + ".");
			return;
		}
		if (!inv.hasSpace(player)) {
			ENGINE.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		if (Math.random() <= 0.10) {//TODO Figure out thieving chance
			ENGINE.sendMessage(player, "You fail to pick the " + config.npcName(npc).toLowerCase() + "'s pocket.");
			ENGINE.freezeEntity(player, data.stunTime/0.6);
			ENGINE.sendMessage(player, "You've been stunned.");
			var delay = data.stunTime/0.6;
			var damage = data.stunDamage;
			if(typeof data.stunDamageLpPercentage !== 'undefined')
			    damage += player.getImpactHandler().getLifepoints()*data.stunDamageLpPercentage/100;
			ENGINE.hitEntity(player, damage);
			ENGINE.entitySay(npc, "What do you think you're doing?");
			
			anim.setSpotAnim(player, 80);
			anim.run(player, 834);
		} else {
			anim.run(player, 881, function () {
				giveLoot(player, data, npc);
			});
		}
	}

	function giveLoot (player, data, npc) {
		//Formula from runewiki
        var multiplesAvailable = 1;
        for (var i = 1; i < 4; i++){
            if (stat.getLevel(player, Stat.THIEVING) > data.level + 10 * i &&
            		stat.getLevel(player, Stat.AGILITY) > data.level+10*(i-1)) {
                multiplesAvailable++;
            } else {
                break;//Constantly increasing so might as well stop
            }
        }
        
		//Chance of multiple 1 : amount of multiples unlocked, probably horribly wrong so replace if you know how this should go
        var multiplier = 1+Math.floor(Math.random() * multiplesAvailable);
        switch(multiplier){
        //TODO find the correct multiplier animation ids
        case 2:
            ENGINE.sendFilterMessage(player, "Your lightning-fast reactions allow you to steal double the loot.");
            break;
        case 3:
            ENGINE.sendFilterMessage(player, "Your lightning-fast reactions allow you to steal triple the loot.");
            break;
        case 4:
            ENGINE.sendFilterMessage(player, "Your lightning-fast reactions allow you to steal quadruple the loot.");
            break;
        default:
        	ENGINE.sendFilterMessage(player, "You pick the " + config.npcName(npc).toLowerCase() + "'s pocket.");
            break;
        }

		stat.giveXp(player, Stat.THIEVING, data.xp);
		
		//uncommon (1:20), rare (1:100), veryRare (1:500)
		var item = util.weightedRandom(data.common, data.uncommon, 0.95,
				data.rare, 0.99, data.veryRare, 0.998);
		var amount = 1;
		if (typeof item.min !== "undefined") {
			if (typeof item.max !== "undefined") {
				amount = util.randomValue(item.min, item.max);
			} else {
				amount = item.min;
			}
		}
		inv.give(player, item.id, amount*multiplier);
	}
})();
