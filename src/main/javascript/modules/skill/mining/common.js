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
/* globals Stat */
var chat = require('shared/chat');
var util = require('shared/util');
var anim = require('shared/anim');
var stat = require('shared/stat');

var pickaxe = require('./pickaxe');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {
	return {
		runMiningAction : runMiningAction
	};

	function runMiningAction (player, levelReq, onSuccess) {
		if (stat.getLevel(player, Stat.MINING) < levelReq) {
			chat.sendMessage(player, "You require a mining level of "+levelReq+"  to mine this rock.");
			return;
		}
		var pic = pickaxe.getPickaxe(player);//Find the highest pickaxe the player holds and can use
		if (!pic) {
			chat.sendMessage(player, "You need a pickaxe to mine this rock.");
			return;
		}
		anim.run(player, pic.anim);
		util.delayFunction(player, pic.speed, process, true);

		function process () {
			if (checkSuccess(player, levelReq, pic)) {
				anim.stop(player);
				onSuccess();
			} else {
				anim.run(player, pic.anim);
				util.delayFunction(player, pic.speed, process, true);
			}
		}
	}

	function checkSuccess(player, levelReq, pic) {
		//TODO: Get the right calculation for this. At the moment it's a complete guess...
		var chance = (stat.getLevel(player, Stat.MINING) + pic.bonus) - levelReq;
		for (var i=0;i<chance;i++) {
			if (Math.random() > 0.9) {
				return true;
			}
		}
		return false;
	}
})();
