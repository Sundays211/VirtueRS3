/**
 * Copyright (c) 2017 Virtue Studios
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
/* globals EventType, Inv, ENGINE */
var anim = require('shared/anim');
var inv = require('shared/inv');
var chat = require('shared/chat');

module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPPLAYERU, 962, function (ctx) {
			var possibles = [1046, 1042, 1044, 1048, 1040, 1038];
			var extraPossibles = [1127, 1079, 1201, 1163, 2581, 6571, 563, 554, 555, 995, 1973, 1635, 950, 1897, 1969, 1217];
			var idx = Math.floor(Math.random()*possibles.length);
			var idx2 = Math.floor(Math.random()*extraPossibles.length);
			var choice = possibles[idx];
			var choice2 = extraPossibles[idx2];

			if (inv.freeSpace(ctx.player, Inv.BACKPACK) < 3) {
				 chat.sendMessage(ctx.player, "Not enough space in your inventory.");
				 return;
			}
			if (inv.freeSpace(ctx.target, Inv.BACKPACK) < 3) {
				 chat.sendMessage(ctx.player, "The person you are trying to use this item on does not have enough inventory space.");
				 return;
			}
			chat.sendMessage(ctx.player, "You pulled the Christmas Cracker... ");
			anim.run(ctx.player, 15153);
			ENGINE.faceEntity(ctx.player, ctx.target);
			anim.run(ctx.target, 15153);
			ENGINE.faceEntity(ctx.target, ctx.player);
			if (Math.random() <= 0.5) {
				ENGINE.clearFaceEntity(ctx.player);
				ENGINE.playerForceSay(ctx.player, "Hey! I got the cracker!", false);
				inv.give(ctx.player, choice2, 1); //Extra reward random
				inv.give(ctx.player, choice, 1); //Random Partyhat
				inv.give(ctx.player, 995, 100000); //Extra 100k for opening
				inv.take(ctx.player, 962, 1, ctx.slot);
			} else {
				ENGINE.clearFaceEntity(ctx.target);
				ENGINE.playerForceSay(ctx.target, "Hey! I got the cracker!", false);
				inv.give(ctx.target, choice2, 1); //Extra reward random
				inv.give(ctx.target, choice, 1); //Random Partyhat
				inv.give(ctx.target, 995, 100000); //Extra 100k for opening
				inv.take(ctx.player, 962, 1, ctx.slot);
			}
		});
	}

})();
