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
var chat = require('chat');
var util = require('util');
var anim = require('anim');
var stat = require('stat');

var hatchet = require('./hatchet');

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
		runWoodcuttingAction : runWoodcuttingAction
	};

	function runWoodcuttingAction (player, levelReq, onSuccess) {
		if (stat.getLevel(player, Stat.WOODCUTTING) < levelReq) {
			chat.sendMessage(player, "You require a woodcutting level of "+levelReq+"  to chop this tree.");
			return;
		}
		var axe = hatchet.getHatchet(player);//Find the highest hatchet the player holds and can use
		if (!axe) {
			chat.sendMessage(player, "You need a hatchet to chop this tree.");
			return;
		}
		anim.run(player, axe.anim);
		util.delayFunction(player, 4, process, true);

		function process () {
			if (checkSuccess(player, levelReq, axe)) {
				anim.stop(player);
				onSuccess();
			} else {
				anim.run(player, axe.anim);
				util.delayFunction(player, 4, process, true);
			}
		}
	}

	function checkSuccess(player, levelReq, axe) {
		//TODO: Get the right calculation for this. At the moment it's a complete guess...
		var chance = (stat.getLevel(player, Stat.WOODCUTTING) + axe.bonus) - levelReq;
		for (var i=0;i<chance;i++) {
			if (Math.random() > 0.9) {
				return true;
			}
		}
		return false;
	}
})();