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
var stat = require('../logic/stat');
var inv = require('../../inv');
var chat = require('../../chat');
var config = require('../../core/config');
var anim = require('../../core/anim');

/**
 * @author Kayla
 * @since 19/11/2014
 */
module.exports = (function () {
	var Ashes = {
		IMPIOUS : {
			id : 20264,
			xp : 4,
			spotAnimId : 56
		},
		ACCURSED : {
			id : 20266,
			xp : 12.5,
			spotAnimId : 47
		},
		INFERNAL : {
			id : 20268,
			xp : 62.5,
			spotAnimId : 40
		}
	};
	
	var bones = {
		init : init,
		scatter : scatterAshes,
		values : Ashes
	};
	
	return bones;
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 20264, function (ctx) {
			scatterAshes(ctx.player, ctx.slot, Ashes.IMPIOUS);
		});
		
		scriptManager.bind(EventType.OPHELD1, 20266, function (ctx) {
			scatterAshes(ctx.player, ctx.slot, Ashes.ACCURSED);
		});
		
		scriptManager.bind(EventType.OPHELD1, 20268, function (ctx) {
			scatterAshes(ctx.player, ctx.slot, Ashes.INFERNAL);
		});
	}
	
	function scatterAshes (player, slot, ashes) {
		inv.clearSlot(player, Inv.BACKPACK, slot);
		anim.addSpotAnim(player, ashes.spotAnimId);
		anim.run(player, 445, function () {
			chat.sendSpamMessage(player, "You scatter the ashes into the wind.");
			stat.giveXp(player, Stat.PRAYER, ashes.xp);
		});
	}
})();