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
/* globals EventType, Stat, Inv */
var stat = require('../common/stat');
var inv = require('../../inv');
var chat = require('../../chat');
var anim = require('../../core/anim');

/**
 * @author Kayla
 * @since 19/11/2014
 */
module.exports = (function () {
	var Bones = {
		BONES : {
			id : 526,
			xp : 4.5
		},
		WOLF_BONES : {
			id : 2859,
			xp : 4.5
		},
		BURNT_BONES : {
			id : 528,
			xp : 4.5
		},
		MONKEY_BONES : {
			id : 3179,
			xp : 5
		},
		BAT_BONES : {
			id : 17672,
			xp : 5.3
		},
		BIG_BONES : {
			id : 17674,
			xp : 12.5
		},
		JOGRE_BONES : {
			id : 3125,
			xp : 15
		},
		ZOGRE_BONES : {
			id : 4812,
			xp : 22.5
		},
		SHAIKAHAN_BONES : {
			id : 3123,
			xp : 22.5
		},
		BABYDRAGON_BONES : {
			id : 534,
			xp : 30
		},
		WYVERN_BONES : {
			id : 6812,
			xp : 50
		},
		DRAGON_BONES : {
			id : 17676,
			xp : 72
		},
		FAYRG_BONES : {
			id : 4830,
			xp : 84
		},
		RAURG_BONES : {
			id : 4832,
			xp : 96
		},
		DAGANNOTH_BONES : {
			id : 6729,
			xp : 125
		},
		AIRUT_BONES : {
			id : 30209,
			xp : 132.5
		},
		OURG_BONES : {
			id : 4834,
			xp : 140
		},
		FROST_DRAGON_BONES : {
			id : 18830,
			xp : 180
		},
		ANCIENT_BONES : {
			id : 15410,
			xp : 200
		}
	};

	return {
		init : init,
		bury : buryBones,
		values : Bones
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 526, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 2859, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.WOLF_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 528, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.BURNT_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 3179, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.MONKEY_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 17672, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.BAT_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 17674, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.BIG_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 3125, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.JOGRE_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 4812, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.ZOGRE_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 3123, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.SHAIKAHAN_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 534, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.BABYDRAGON_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 6812, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.WYVERN_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 17676, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.DRAGON_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 4830, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.FAYRG_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 4832, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.RAURG_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 6729, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.DAGANNOTH_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 30209, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.AIRUT_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 4834, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.OURG_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 18830, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.FROST_DRAGON_BONES);
		});
		
		scriptManager.bind(EventType.OPHELD1, 15410, function (ctx) {
			buryBones(ctx.player, ctx.slot, Bones.ANCIENT_BONES);
		});
	}
	
	function buryBones (player, slot, bones) {
		chat.sendSpamMessage(player, "You dig a hole in the ground...");
		inv.clearSlot(player, Inv.BACKPACK, slot);
		anim.run(player, 827, function () {
			chat.sendSpamMessage(player, "You bury the bones.");
			stat.giveXp(player, Stat.PRAYER, bones.xp);
		});
	}
})();