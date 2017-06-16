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
/* globals EventType, Stat */
var stat = require('../common/stat');
var inv = require('../../inv');
var chat = require('../../chat');
var anim = require('../../core/anim');
var config = require('../../core/config');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 11/11/2014
 */

module.exports = (function () {
	var Alter = {
		AIR : {
			level : 1,
			xp : 5,
			runeID : 556,
			spotAnim : 4746,
			pureOnly : false,
			multiplesAt : [11, 22, 33, 44, 55, 66, 77, 88, 99, 110]
		},
		MIND : {
			level : 2,
			xp : 5.5,
			runeID : 558,
			spotAnim : 4750,
			pureOnly : false,
			multiplesAt : [14, 28, 42, 56, 70, 84, 98, 112]
		},
		WATER : {
			level : 5,
			xp : 6,
			runeID : 555,
			spotAnim : 4747,
			pureOnly : false,
			multiplesAt : [19, 38, 57, 76, 95]
		},
		EARTH : {
			level : 9,
			xp : 6.5,
			runeID : 557,
			spotAnim : 4749,
			pureOnly : false,
			multiplesAt : [26, 52, 78, 104]
		},
		FIRE : {
			level : 14,
			xp : 7,
			runeID : 554,
			spotAnim : 4748,
			pureOnly : false,
			multiplesAt : [35, 70, 105]
		},
		BODY : {
			level : 20,
			xp : 7.5,
			runeID : 559,
			spotAnim : 4751,
			pureOnly : false,
			multiplesAt : [46, 92]
		},
		COSMIC : {
			level : 27,
			xp : 8,
			runeID : 564,
			spotAnim : 4754,
			pureOnly : true,
			multiplesAt : [59]
		},
		CHAOS : {
			level : 35,
			xp : 8.5,
			runeID : 562,
			spotAnim : 4752,
			pureOnly : true,
			multiplesAt : [74]
		},
		ASTRAL : {
			level : 40,
			xp : 8.7,
			runeID : 9075,
			spotAnim : 4757,
			pureOnly : true,
			multiplesAt : [82]
		},
		NATURE : {
			level : 44,
			xp : 9,
			runeID : 561,
			spotAnim : 4753,
			pureOnly : true,
			multiplesAt : [91]
		},
		LAW : {
			level : 54,
			xp : 9.5,
			runeID : 563,
			spotAnim : 4756,
			pureOnly : true,
			multiplesAt : [110]
		},
		DEATH : {
			level : 65,
			xp : 10,
			runeID : 560,
			spotAnim : 4758,
			pureOnly : true,
			multiplesAt : []
		},
		BLOOD : {
			level : 77,
			xp : 10.5,
			runeID : 565,
			spotAnim : 4755,
			pureOnly : true,
			multiplesAt : []
		}
	};
	
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, 2478, function (ctx) {
			craftRunes(ctx.player, Alter.AIR);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2479, function (ctx) {
			craftRunes(ctx.player, Alter.MIND);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2480, function (ctx) {
			craftRunes(ctx.player, Alter.WATER);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2481, function (ctx) {
			craftRunes(ctx.player, Alter.EARTH);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2482, function (ctx) {
			craftRunes(ctx.player, Alter.FIRE);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2483, function (ctx) {
			craftRunes(ctx.player, Alter.BODY);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2484, function (ctx) {
			craftRunes(ctx.player, Alter.COSMIC);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2487, function (ctx) {
			craftRunes(ctx.player, Alter.CHAOS);
		});
		
		scriptManager.bind(EventType.OPLOC1, 17010, function (ctx) {
			craftRunes(ctx.player, Alter.ASTRAL);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2486, function (ctx) {
			craftRunes(ctx.player, Alter.NATURE);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2485, function (ctx) {
			craftRunes(ctx.player, Alter.LAW);
		});
		
		scriptManager.bind(EventType.OPLOC1, 2488, function (ctx) {
			craftRunes(ctx.player, Alter.DEATH);
		});
		
		scriptManager.bind(EventType.OPLOC1, 30624, function (ctx) {
			craftRunes(ctx.player, Alter.BLOOD);
		});
	}
	
	function craftRunes (player, alter) {
		var level = stat.getLevel(player, Stat.RUNECRAFTING);
		if (level < alter.level) {
			chat.sendMessage(player, "You need a runecrafting level of "+alter.level+" to craft this rune.");
			return;
		}
		
		var essCount = inv.total(player, 7936);//Pure essence
		var pureEss = true;
		if (essCount < 1) {
			if (!alter.pureOnly) {
				pureEss = false;
				essCount = inv.total(player, 1436);//Normal essence
			}
			if (essCount < 1) {
				chat.sendMessage(player, "You don't have any "+(alter.pureOnly ? "pure" : "rune")+" essence.");
				return;
			}
		}
		var totalXp = essCount * alter.xp;
		inv.take(player, pureEss ? 7936 : 1436, essCount);
		
		anim.addSpotAnim(player, alter.spotAnim, 0, 5, 0);
		anim.run(player, 23250, function () {
			stat.giveXp(player, Stat.RUNECRAFTING, totalXp);
			inv.give(player, alter.runeID, essCount * getHighestMultiple(alter, level));
			chat.sendMessage(player, "You bind the temple's power into "+config.objName(alter.runeID)+"s.");
		});
	}
	
	function getHighestMultiple (alter, level) {
		var multiple = 1;
		for (var ordinal in alter.multiplesAt) {
			if (alter.multiplesAt[ordinal] <= level) {
				multiple++;
			}
		}
		return multiple;
	}
})();
