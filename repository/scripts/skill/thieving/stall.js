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
var stat = require('../logic/stat');
var config = require('../../core/config');
var util = require('../../core/util');
var inv = require('../../inv');
var chat = require('../../chat');
var anim = require('../../core/anim');

/**
 * @author Kayla
 * @author rsJuuuuu
 * @since 01/16/2015
 */

module.exports = (function () {
	var Stall = {
	    VEGETABLE : {
	        level : 2,
	        xp : 10,
	        ids : [-1]
	    },
		SILK : {
			level : 1,
			xp : 8,
			loot : {id:995, count:20}
		}
	};
	
	return {
		init : init,
		values : Stall,
		stealFrom : stealFromStall
	};
	
	function init(scriptManager) {
		scriptManager.bind(EventType.OPLOC2, 34383, function (ctx) {
			stealFromStall(ctx.player, Stall.SILK, ctx.location);
		});
	}
	
	function stealFromStall (player, stall, loc) {
		if (stat.getLevel(player, Stat.THIEVING) < stall.level) {
			chat.sendMessage(player, "You need a thieving level of " + stall.level + " to steal from this " + config.locName(util.getId(loc))+".");
			return;
		}
		if (!inv.hasSpace(player)) {
			chat.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		anim.run(player, 881, function () {
			stat.giveXp(player, Stat.THIEVING, stall.xp);
			var loot = Array.isArray(stall.loot) ? util.pickRandom(stall.loot) : stall.loot;
			inv.give(player, loot.id, loot.count);
			chat.sendSpamMessage(player, "You successfully stole from the " + config.locName(util.getId(loc)) + ".");
		});
	}
})();