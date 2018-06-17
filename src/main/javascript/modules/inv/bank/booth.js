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
var widget = require("shared/widget");
var dialog = require('shared/dialog');
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

		var oploc1bank = [ 2693, 20607, 42192, 66449, 79036, 83634, 92225, 96801 ];
		var oploc2bank = [ 782, 2012, 2015, 2019, 2213, 5276, 6084, 10517, 11338, 11758, 14369, 19230, 22819, 24914, 25688, 25808, 29085, 34752, 36786, 42217, 42377, 42378, 49018, 52589, 66665, 66666, 66667, 69021, 69022, 69023, 69024, 76274, 83954, 92692, 100247, 100248 ];
		var oploc2collect = [ 20607 ];
		var oploc3collect = [ 782, 2012, 2015, 2019, 2213, 2693, 5276, 6084, 10517, 11338, 11758, 14369, 19230, 22819, 24914, 25688, 25808, 29085, 34752, 36786, 42192, 42217, 42377, 42378, 49018, 52589, 66449, 66665, 66666, 66667, 69021, 69022, 69023, 69024, 76274, 79036, 83634, 83954, 92225, 92692, 96801, 100247, 100248 ];
		var bankers = [ 494, 495, 496, 497, 498, 499, 553, 2718, 2759, 3293, 3416, 4907, 19086];

		scriptManager.bind(EventType.OPLOC1, oploc1bank, function (ctx) {
			widget.openOverlaySub(ctx.player, 1017, 762, false);//Open Bank
		});

		scriptManager.bind(EventType.OPLOC2, oploc2bank, function (ctx) {
			widget.openOverlaySub(ctx.player, 1017, 762, false);//Open Bank
		});

		scriptManager.bind(EventType.OPLOC2, oploc2collect, function (ctx) {
			widget.openCentral(ctx.player, 109, false);//Collect
		});

		scriptManager.bind(EventType.OPLOC3, oploc3collect, function (ctx) {
			widget.openCentral(ctx.player, 109, false);//Collect
		});

		scriptManager.bind(EventType.OPNPC1, bankers, function (ctx) {
			widget.openOverlaySub(ctx.player, 1017, 762, false);//Open Bank
		});

		scriptManager.bind(EventType.OPNPC3, bankers, function (ctx) {//talk
		    dialog.builder(ctx.player).chatnpc(ctx.npc, "Good day. How may I help you?")
		    .multi4("WHAT WOULD YOU LIKE TO SAY?", "I'd like to access my bank account, please.", function () {
			    widget.openOverlaySub(ctx.player, 1017, 762, false);//Open Bank
		    }, "I'd like to check my PIN settings.", function () {
				widget.openCentral(ctx.player, 14, false);//Bank pin
		    }, "I'd like to see my collection box.", function () {
		        widget.openCentral(ctx.player, 109, false);//Collect
		    }, "What is this place?", function () {
			    dialog.builder(ctx.player).chatnpc(ctx.npc, "This is a branch of the Bank of RuneScape. We have<br> branches in many towns.")
				.multi2("WHAT WOULD YOU LIKE TO SAY?", "And what do you do?", function () {
					dialog.builder(ctx.player).chatnpc(ctx.npc, "We will look after your items and money for you. Leave<br> your valuables with us if you want to keep them safe.")
					.finish();
				}, "Didn't you used to be called the Bank of Varrock?", function () {
 				    dialog.builder(ctx.player).chatnpc(ctx.npc, "Yes we did, but people kept on coming into our branches<br> outside of Varrock and telling us that our signs were<br> wrong. They acted as if we didn't know what town we<br> were in or something.")
					.finish();
				});
		    });
		});

		scriptManager.bind(EventType.OPNPC3, [14923, 14924, 14925], function (ctx) {//talk
		    //has sound saying (Good day How may I help you)
			//npc 14924 guy voice else the other 2 are girls
		    dialog.builder(ctx.player).chatnpc(ctx.npc, "Good day. How may I help you?")
		    .multi3("WHAT WOULD YOU LIKE TO SAY?", "I'd like to access my bank account, please.", function () {
			    widget.openOverlaySub(ctx.player, 1017, 762, false);//Open Bank
		    }, "I'd like to check my PIN settings.", function () {
				widget.openCentral(ctx.player, 14, false);//Bank pin
		    }, "I'd like to see my collection box.", function () {
		        widget.openCentral(ctx.player, 109, false);//Collect
		    });
		});

		scriptManager.bind(EventType.OPNPC4, bankers, function (ctx) {
			widget.openCentral(ctx.player, 109, false);//Collect
		});
	}
})();
