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
/* globals EventType, Expression */
var dialog = require('shared/dialog');
var anim = require('shared/anim');
var map = require('shared/map');
var coords = require('shared/map/coords');
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {

	scriptManager.bind(EventType.OPLOC1, 75852, function (ctx) {//Trapdoor old xmas event
	    //todo add knocking sound
	    dialog.builder(ctx.player).chatnpc(15874, "Get lost!", Expression.NEUTRAL);
	    //todo add get lost sound
	});

	scriptManager.bind(EventType.OPLOC1, 5116, function (ctx) {//Trapdoor (Mysterious old man house)
	    dialog.builder(ctx.player).chatnpc(16873, "Keep out of my basement!", Expression.NEUTRAL);//varp 3524 32772 to enter
	});

	scriptManager.bind(EventType.OPLOC1, [47424,47421], function (ctx) {//draynormanor main door
	    dialog.builder(ctx.player).chatplayer("There's a sign on the door that says:")
	   .mesbox("Adventurers beware: Going in doesn't mean you'll come out again.")
	   .then(function () {
       //varp 2170	from 67108864 to 67108992
	   //or varp 20
	    });
	});

	scriptManager.bind(EventType.OPLOC1, [96780,96781], function (ctx) {//deaths hourglass
	    anim.run(ctx.player, 23603, function () {
        map.setCoords(ctx.player, coords(414, 652, 0));
	    });
	});

	scriptManager.bind(EventType.OPLOC1, 10041, function (ctx) {//tree next to bank
        anim.run(ctx.player, 21189, function () {
		    anim.run(ctx.player, -1);
	        dialog.builder(ctx.player).chatnpc(2574, "Qw! That really hurt!")
	    });
	});

	scriptManager.bind(EventType.OPLOC2, 10041, function (ctx) {//tree next to bank
	    dialog.builder(ctx.player).chatplayer("Hello?")
		.chatnpc(2574, "Ssshhh! What do you want?")
		.chatplayer("Well, it's not every day you see a man up a tree.")
		.chatnpc(2574, "I'm trying to observe a suspect. Leave me alone!")
		.multi3("WHAT WOUlD YOU LIKE TO SAY?", "This is about the bank robbery, right?", function () {
		}, "You're not being very subtle up there.", function () {
	    }, "Can I do anything to help?", function () {
		   // dialog.builder(ctx.player).chatplayer("Can I do anything to help?")
		});
	});

	//dog kennel
	//varp 3468 1246925975 all blue draynor
	//interface 1383
	}
})();
