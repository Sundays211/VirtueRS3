/**
 * Copyright (c) 2016 Virtue Studios
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
/* globals EventType */
var widget = require("../../core/widget");

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 22/03/2016
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		var bankBooths = [ 782, 2213, 10517, 11758, 14369, 29085, 34752, 42217 ];
		var bankChests = [ 83634, 42192, 20607, 79036 ];
		var bankers = [ 494, 495, 496, 497, 498, 499, 2718, 3416, 4907 ];
		
		scriptManager.bind(EventType.OPLOC2, bankBooths, function (ctx) {
			widget.openOverlaySub(ctx.player, 1017, 762, false);//Open Bank
		});
		
		scriptManager.bind(EventType.OPLOC1, bankChests, function (ctx) {
			widget.openOverlaySub(ctx.player, 1017, 762, false);//Open Bank
		});
		
		scriptManager.bind(EventType.OPLOC3, bankBooths, function (ctx) {
			widget.openCentral(ctx.player, 109, false);//Collect
		});
		
		scriptManager.bind(EventType.OPLOC3, bankChests, function (ctx) {
			widget.openCentral(ctx.player, 109, false);//Collect
		});
		
		scriptManager.bind(EventType.OPNPC1, bankers, function (ctx) {
			widget.openOverlaySub(ctx.player, 1017, 762, false);//Open Bank
		});
		
		scriptManager.bind(EventType.OPNPC4, bankChests, function (ctx) {
			widget.openCentral(ctx.player, 109, false);//Collect
		});
	}
})();
