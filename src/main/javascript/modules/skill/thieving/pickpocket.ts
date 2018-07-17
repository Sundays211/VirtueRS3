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
import { EventType, Stat } from 'engine/enums';
import { Npc, Player } from 'engine/models';
import _events from 'engine/events';
import _config from 'engine/config';

import { lootItem, weightedRandom, randomValue } from 'shared/util';
import { invHasSpace, giveItem } from 'shared/inv';
import { sendMessage, sendSpamMessage } from 'shared/chat';
import { getStatLevel, giveXp } from 'shared/stat';
import { addSpotAnim, runAnim } from 'shared/anim';

/**
 * @author Kayla
 * @author rsJuuuuu
 * @since 01/16/2015
 */
_events.bindEventListener(EventType.OPNPC3, [1, 2, 3, 4, 5, 6], (ctx) => {
	pickpocket(ctx.player, Npc.MAN_WOMAN, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, 7, (ctx) => {
	pickpocket(ctx.player, Npc.FARMER, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, 1715, (ctx) => {
	pickpocket(ctx.player, Npc.HAM_FEMALE, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, 1714, (ctx) => {
	pickpocket(ctx.player, Npc.HAM_MALE, ctx.npc);
});

/*_events.bindEventListener(EventType.OPNPC3, -1, (ctx) => {
//TODO No pickpocket option on these? I think it unlocks after Death to the Dorgeshuun
	 pickpocket(ctx.player, Npc.HAM_GUARD, ctx.npc);
});*/

_events.bindEventListener(EventType.OPNPC3, [15, 18], (ctx) => {
	pickpocket(ctx.player, Npc.WARRIOR, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, 187, (ctx) => {
	pickpocket(ctx.player, Npc.ROGUE, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [5752, 5753, 5755, 5756, 5757, 5758, 5759], (ctx) => {
	pickpocket(ctx.player, Npc.CAVE_GOBLIN, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [2234, 2235, 3299], (ctx) => {
	pickpocket(ctx.player, Npc.MASTER_FARMER, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [9, 32, 296, 297, 298, 299], (ctx) => {
	pickpocket(ctx.player, Npc.GUARD, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314], (ctx) => {
	pickpocket(ctx.player, Npc.FREMENNIK_CITIZEN, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [1926, 1931], (ctx) => {
	pickpocket(ctx.player, Npc.DESERT_BANDIT, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [23, 26], (ctx) => {
	pickpocket(ctx.player, Npc.KNIGHT_OF_ARDOUGNE, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, 34, (ctx) => {
	pickpocket(ctx.player, Npc.YANILLE_WATCHMAN, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [20, 2256], (ctx) => {
	pickpocket(ctx.player, Npc.PALADIN, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, 13212, (ctx) => {
	pickpocket(ctx.player, Npc.MONKEY_KNIFE_FIGHTER, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [66, 67, 68, 168, 169], (ctx) => {
	pickpocket(ctx.player, Npc.GNOME, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, 21, (ctx) => {
	pickpocket(ctx.player, Npc.HERO, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [2363, 2364, 2365, 2366], (ctx) => {
	pickpocket(ctx.player, Npc.ELVES, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [2109, 2110, 2111, 2112, 2113, 2114,
	2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2124, 2126], (ctx) => {
		pickpocket(ctx.player, Npc.DWARF_TRADER, ctx.npc);
	});


function hamCommon() {
	return [lootItem(1349), lootItem(1267), lootItem(1205), lootItem(1351), lootItem(1265), lootItem(321),
	lootItem(995, 2, 21), lootItem(2138), lootItem(1625), lootItem(1511)];
}

function hamUncommon() {
	return [lootItem(4304), lootItem(4302), lootItem(4306), lootItem(4300), lootItem(4298), lootItem(1129),
	lootItem(4310), lootItem(4308), lootItem(1353), lootItem(1207), lootItem(1269), lootItem(1739), lootItem(686),
	lootItem(2370), lootItem(33264), lootItem(199), lootItem(201), lootItem(1627), lootItem(203),
	lootItem(454, 1, 5), lootItem(441, 1, 5), lootItem(453), lootItem(440), lootItem(688), lootItem(697)];
}

//Items are arrays in the syntax of [id, amount]
//if amount is an array the first element will be treated as min amount and
//the second element will be treated at max, result will be random number between those

//market guard id 2236
var Npc = {
	MAN_WOMAN: {
		level: 1,
		xp: 8,
		common: [lootItem(995, 3)],
		stunTime: 5, //in seconds
		stunDamage: 10 //in lp (990 max)
	},
	FARMER: {
		level: 10,
		xp: 14.5,
		common: [lootItem(995, 9)],
		rare: [lootItem(5318)],
		stunTime: 5,
		stunDamage: 10
	},
	HAM_FEMALE: {
		level: 15,
		xp: 18.5,
		common: hamCommon(),
		uncommon: hamUncommon(),
		rare: [lootItem(4170)],
		stunTime: 4,
		stunDamage: 10
		//stunDamage : [10, 30]
	},
	HAM_MALE: {
		level: 20,
		xp: 22.5,
		common: hamCommon(),
		uncommon: hamUncommon(),
		rare: [lootItem(4170)],
		stunTime: 4,
		stunDamage: 10
		//stunDamage : [10,30]
	},
	HAM_GUARD: {
		level: 20,
		xp: 22.5,
		common: [[1349], [1267], [1205], [1351], [1265], [321], [995, [2, 21]], [2138], [1625], [1511]],
		uncommon: [[4304], [4302], [4306], [4300], [4298], [1129], [4310], [4308], [1353], [1207], [1269], [1739], [686], [2370],
		[33264], [199], [201], [1627], [203], [454, [1, 5]], [441, [1, 5]], [453], [440], [688], [697]],
		rare: [[4170]],
		stunTime: 4,
		stunDamage: 10
		//stunDamage : [10,30]
	},
	WARRIOR: {
		level: 25,
		xp: 26.0,
		common: [lootItem(995, 18)],
		rare: [lootItem(18757)],
		stunTime: 5,
		stunDamage: 20
	},
	ROGUE: {
		level: 32,
		xp: 35.5,
		common: [lootItem(995, 25, 120), lootItem(556, 8), lootItem(1993), lootItem(1523), lootItem(1203)],
		rare: [lootItem(1211), lootItem(2357)],
		stunTime: 5,
		stunDamage: 20
	},
	CAVE_GOBLIN: {
		level: 36,
		xp: 40,
		common: [lootItem(995, 11), lootItem(995, 28), lootItem(995, 32), lootItem(995, 46), lootItem(4537),
		lootItem(4546), lootItem(590), lootItem(596), lootItem(10981), lootItem(441, 1, 17), lootItem(1939),
		lootItem(10965), lootItem(10964), lootItem(10960), lootItem(10962), lootItem(10961), lootItem(10963)],
		stunTime: 5,
		stunDamage: 10
	},
	MASTER_FARMER: {
		level: 38,
		xp: 43,
		common: [lootItem(5324, 1, 3), lootItem(5319, 1, 3), lootItem(5318, 1, 3), lootItem(5320, 1, 2),
		lootItem(5322, 1, 2), lootItem(5308, 1, 2), lootItem(5305, 1, 4), lootItem(5307, 1, 3),
		lootItem(5306, 1, 3), lootItem(102), lootItem(5101), lootItem(5096), lootItem(5097), lootItem(5098),
		lootItem(5099), lootItem(5291), lootItem(5292), lootItem(5293), lootItem(5294)],
		uncommon: [lootItem(5323), lootItem(5310), lootItem(5309, 1, 2), lootItem(5103),
		lootItem(5104), lootItem(5106), lootItem(5105), lootItem(5100)],
		rare: [lootItem(5321), lootItem(5311), lootItem(5297), lootItem(5296), lootItem(5295), lootItem(5281), lootItem(5282)],
		veryRare: [lootItem(5298), lootItem(5299), lootItem(5300), lootItem(5301), lootItem(5302), lootItem(5303),
		lootItem(5304), lootItem(21621), lootItem(5280), lootItem(21620)],
		stunTime: 5,
		stunDamage: 30
	},
	GUARD: {
		level: 40,
		xp: 46.5,
		common: [lootItem(995, 30)],
		stunTime: 5,
		stunDamage: 20
	},
	FREMENNIK_CITIZEN: {
		level: 45,
		xp: 65,
		common: [lootItem(995, 40)],
		stunTime: 5,
		stunDamage: 20
	},
	DESERT_BANDIT: {
		level: 53,
		xp: 79.5,
		common: [lootItem(995, 30), lootItem(179), lootItem(1523)],
		stunTime: 5,
		stunDamage: 30
	},
	KNIGHT_OF_ARDOUGNE: {
		level: 55,
		xp: 84.3,
		common: [lootItem(995, 50)],
		rare: [lootItem(18757)],
		stunTime: 5,
		stunDamage: 30
	},
	YANILLE_WATCHMAN: {
		level: 65,
		xp: 137.5,
		common: [lootItem(995, 60), lootItem(2309)],
		stunTime: 5,
		stunDamage: 30
	},
	PALADIN: {
		level: 70,
		xp: 151.75,
		common: [lootItem(995, 80), lootItem(562, 2)],
		rare: [lootItem(18757)],
		stunTime: 5, // ? No value in runewiki
		stunDamage: 30
	},
	//TODO this should stun always when not knocked out, and stun never if knocked successfully if caught while knocking stun for few secs
	MONKEY_KNIFE_FIGHTER: {
		level: 70,
		xp: 150,//[20,150],
		common: [lootItem(995, 1, 50), lootItem(869, 1, 10), lootItem(25902, 1, 10)],
		uncommon: [lootItem(379), lootItem(1329)],
		rare: [lootItem(1331)],
		veryRare: [lootItem(4587), lootItem(1333)],
		stunTime: 5,
		stunDamage: 60,
	},
	GNOME: {
		level: 75,
		xp: 198.5,
		common: [lootItem(995, 300), lootItem(2162), lootItem(2150), lootItem(444), lootItem(577), lootItem(28266),
		lootItem(28265), lootItem(28260), lootItem(28259), lootItem(28262), lootItem(28261)],
		uncommon: [lootItem(569), lootItem(28263), lootItem(28258)],
		rare: [lootItem(28264), lootItem(28267)],
		veryRare: [lootItem(18757)],
		stunTime: 5,
		stunDamage: 0,
		stunDamageLpPercentage: 3
	},
	HERO: {
		level: 80,
		xp: 273.3,
		common: [lootItem(995, 200, 300)],
		uncommon: [lootItem(1601), lootItem(569), lootItem(1993), lootItem(444), lootItem(565), lootItem(560, 2)],
		rare: [lootItem(18757)],
		stunTime: 6,
		stunDamage: 40
	},
	ELVES: {
		level: 85,
		xp: 353.3,
		common: [lootItem(995, 280), lootItem(995, 350), lootItem(995, 240), lootItem(1993),
		lootItem(560, 2), lootItem(561, 3), lootItem(28259), lootItem(28261), lootItem(28260)],
		uncommon: [lootItem(569), lootItem(444), lootItem(1601), lootItem(28265),
		lootItem(28266), lootItem(28258), lootItem(28263), lootItem(28262)],
		rare: [lootItem(28264), lootItem(28267)],
		veryRare: [lootItem(28547), lootItem(28548), lootItem(28549)],
		stunTime: 6,
		stunDamage: 50,
		stunDamageLpPercentage: 3
	},
	DWARF_TRADER: {
		level: 90,
		xp: 556.5,
		common: [lootItem(995, 100, 400), lootItem(2350), lootItem(2352), lootItem(2354), lootItem(2360), lootItem(454),
		lootItem(439), lootItem(437), lootItem(441), lootItem(448), lootItem(28266), lootItem(28265), lootItem(28260),
		lootItem(28259), lootItem(28261)],
		uncommon: [lootItem(28258), lootItem(28263)],
		rare: [lootItem(2362), lootItem(2364), lootItem(450), lootItem(452), lootItem(28264),
		lootItem(28262), lootItem(28267), lootItem(33269)],
		veryRare: [lootItem(28547), lootItem(28548), lootItem(28549), lootItem(18757)],
		stunTime: 5,
		stunDamage: 10
	}

};

type LootItem = {
	id: number,
	min: number,
	max: number
}

type PickpocketData = {
	level: number,
	xp: number,
	common: LootItem[],
	uncommon?: LootItem[],
	rare?: LootItem[],
	veryRare?: LootItem[],
	stunTime: number,
	stunDamage: number,
	stunDamageLpPercentage?: number
}

export function pickpocket(player: Player, data: PickpocketData, npc: Npc) {
	ENGINE.faceEntity(player, npc);

	if (getStatLevel(player, Stat.THIEVING) < data.level) {
		sendMessage(player, "You need a thieving level of " +
			data.level + " to steal from this " + _config.npcName(npc) + ".");
		return;
	}
	if (!invHasSpace(player)) {
		sendMessage(player, "Not enough space in your inventory.");
		return;
	}
	if (Math.random() <= 0.10) {//TODO Figure out thieving chance
		sendMessage(player, "You fail to pick the " + _config.npcName(npc).toLowerCase() + "'s pocket.");
		ENGINE.freezeEntity(player, data.stunTime / 0.6);
		sendMessage(player, "You've been stunned.");
		var damage = data.stunDamage;
		if (typeof data.stunDamageLpPercentage !== 'undefined')
			damage += player.getImpactHandler().getLifepoints() * data.stunDamageLpPercentage / 100;
		ENGINE.hitEntity(player, damage);
		ENGINE.entitySay(npc, "What do you think you're doing?");

		addSpotAnim(player, 80);
		runAnim(player, 834);
	} else {
		runAnim(player, 881, () => {
			giveLoot(player, data, npc);
		});
	}
}

function giveLoot(player: Player, data: PickpocketData, npc: Npc) {
	//Formula from runewiki
	var multiplesAvailable = 1;
	for (var i = 1; i < 4; i++) {
		if (getStatLevel(player, Stat.THIEVING) > data.level + 10 * i &&
			getStatLevel(player, Stat.AGILITY) > data.level + 10 * (i - 1)) {
			multiplesAvailable++;
		} else {
			break;//Constantly increasing so might as well stop
		}
	}

	//Chance of multiple 1 : amount of multiples unlocked, probably horribly wrong so replace if you know how this should go
	var multiplier = 1 + Math.floor(Math.random() * multiplesAvailable);
	switch (multiplier) {
		//TODO find the correct multiplier animation ids
		case 2:
			sendSpamMessage(player, "Your lightning-fast reactions allow you to steal double the loot.");
			break;
		case 3:
			sendSpamMessage(player, "Your lightning-fast reactions allow you to steal triple the loot.");
			break;
		case 4:
			sendSpamMessage(player, "Your lightning-fast reactions allow you to steal quadruple the loot.");
			break;
		default:
			sendSpamMessage(player, "You pick the " + _config.npcName(npc).toLowerCase() + "'s pocket.");
			break;
	}

	giveXp(player, Stat.THIEVING, data.xp);

	//uncommon (1:20), rare (1:100), veryRare (1:500)
	var loot = weightedRandom(data.common, data.uncommon, 0.95,
		data.rare, 0.99, data.veryRare, 0.998);
	var amount = 1;
	if (typeof loot.min !== "undefined") {
		if (typeof loot.max !== "undefined") {
			amount = randomValue(loot.min, loot.max);
		} else {
			amount = loot.min;
		}
	}
	giveItem(player, loot.id, amount * multiplier);
}
