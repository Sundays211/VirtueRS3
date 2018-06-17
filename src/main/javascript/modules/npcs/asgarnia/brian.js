/**
 * Copyright (c) 2016 Virtue Studios
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
/* globals EventType, Inv */

var dialog = require('shared/dialog');
var varc = require('engine/var/client');
var varp = require('engine/var/player');
var widget = require('shared/widget');
module.exports = (function () {
	return {
	init : init
	};

	function init (scriptManager) {

	   scriptManager.bind(EventType.OPNPC1, 1860, function (ctx) {
	        var player = ctx.player;
		    dialog.builder(player).chatnpc(ctx.npc, "Would you like to buy some archery equipment?")
            .multi2("SELECT AN OPTION", "No thanks, I've got all the archery equipment I need.", function () {
	            dialog.builder(player).chatplayer("No thanks, I've got all the archery equipment I need.")
	            .chatnpc(ctx.npc, "Okay. Fare well on your travels.")
				.finish();
	        }, "Let's see what you've got, then.", function () {
                openshop(player);

	       });
	   });

	   scriptManager.bind(EventType.OPNPC3, 1860, function (ctx) {
	        openshop(ctx.player);
	   });
	}

	function openshop (player) {
        varp(player, 304, Inv.BRIANS_ARCHERY_SUPPLIES);
	    varc(player, 2360, "Brian's Archery Supplies");
	    widget.openCentral(player, 1265);
	}

})();
