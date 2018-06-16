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
/* globals EventType */

var dialog = require('shared/dialog');
var varc = require('engine/var/client');
var varp = require('engine/var/player');
var widget = require('shared/widget');
module.exports = (function () {
	return {
	init : init
	};

	function init (scriptManager) {

	    scriptManager.bind(EventType.OPNPC1, 557, function (ctx) {
	        dialog.builder(ctx.player).chatnpc(ctx.npc, "Welcome to my food store! Would you like to buy<br> anything?")
			.multi3("SELECT AN OPTION", "Yes please.", function () {
			    dialog.builder(ctx.player).chatplayer("Yes please.")
                .then(function () {
				    openshop(ctx.player);
				});
			}, "No, thank you.", function () {
			    dialog.builder(ctx.player).chatplayer("No, thank you.")
			    .finish();
			}, "What can you recommend?", function () {
				dialog.builder(ctx.player).chatplayer("What can you recommend?")
				.chatnpc(ctx.npc, "We have this really exotic fruit all the way from Karamja.<br> It's called a banana.")
				.multi2("SELECT AN OPTION", "Hmm, I think I'll try one.", function () {
				    dialog.builder(ctx.player).chatplayer("Hmm, I think I'll try one.")
					.chatnpc(ctx.npc, "Great. You might as well take a look at the rest of my<br> wares as well.")
					.then(function () {
				    openshop(ctx.player);
				    });
				}, "I don't like the sound of that.", function () {
				    dialog.builder(ctx.player).chatplayer("I don't like the sound of that.")
					.chatnpc(ctx.npc, "Well, it's your choice, but I do recommend them.")
					.finish();
				});
			});
	    });

		scriptManager.bind(EventType.OPNPC3, 557, function (ctx) {
		    openshop(ctx.player);
		});
	}

	function openshop (player) {
        varp(player, 304, Inv.WYDINS_FOOD_STORE);
	    varc(player, 2360, "Wydin's Food Store");
	    widget.openCentral(player, 1265);
	}


})();
