/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
/* globals EventType, ENGINE, Inv */
var util = require('../../core/util');
var config = require('../../core/config');
var inv = require('../core');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 11/02/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 109, function (ctx) {
			ENGINE.sendInv(ctx.player, Inv.LOAN_RETURN);
		});

		scriptManager.bind(EventType.IF_BUTTON, 109, function (ctx) {
			var player = ctx.player;
			//Check script 654
			//Container 540 for loaned items?
			switch (ctx.component) {
			case 20://Reclaim item
				if (ctx.button === 1) {
					if (ENGINE.getVarp(player, 431) > 0) {
						util.defaultHandler(ctx, "collection box");
						return;
					} else if (ENGINE.getVarp(player, 429) != -1) {
						//Forcefully return
						//[Name] wants [his/her] item returned now. The item [he/she] lent to you has been returned to [his/her] Returned Items box.
						util.defaultHandler(ctx, "collection box");
						return;
					} else {
						if (inv.hasSpace(player, 1, Inv.BACKPACK)) {
							ENGINE.sendMessage(player, "Not enough space.");
							return;
						}
						var objId = inv.getObjId(player, Inv.LOAN_RETURN, 0);
						if (objId !== -1) {
							inv.take(player, objId, 1, Inv.LOAN_RETURN);
							inv.give(player, objId, 1, Inv.BACKPACK);
							return;
						}					
					}
					util.defaultHandler(ctx, "collection box");
					return;
				} else if (ctx.button === 10) {				
					var desc = config.objDesc(ctx.objId);
					ENGINE.sendMessage(player, desc);
					return;
				}
				util.defaultHandler(ctx, "collection box");
				return;	
			default:
				util.defaultHandler(ctx, "collection box");
				return;
			}
		});
	}
})();
