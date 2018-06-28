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
/* globals EventType, Inv */
var dialog = require('shared/dialog');
var inv = require('shared/inv');
var chat = require('shared/chat');
var widget = require('shared/widget');
var coords = require('shared/map/coords');
var util = require('shared/util');
var anim = require('shared/anim');
var map = require('shared/map');
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {

		scriptManager.bind(EventType.OPLOC1, 15468, function (ctx) {
			if(inv.total(ctx.player, 2347, Inv.BACKPACK)) {
				dialog.builder(ctx.player).mesbox("You already have a hammer.");
			} else {
				inv.give(ctx.player, 2347,1);
			    dialog.builder(ctx.player).objbox(2347, "You take a hammer from the crate.");
			}
		});

		scriptManager.bind(EventType.OPLOC1, 55301, function (ctx) {
			widget.openCentral(ctx.player, 205, false);
			widget.setText(ctx.player, 205, 49, "Combat Winners");
			widget.setText(ctx.player, 205, 48, "EoC p2p Fullout - Wicked Fury<br>EoC p2p 20v20 - Wicked Fury<br>EoC f2p Fullout - Wicked Fury<br>EoC f2p 20v20 - Wicked Fury<br>Legacy p2p Fullout - Wicked Fury<br>Legacy p2p 20v20 - Wicked Fury<br>Legacy f2p Fullout - Titan's Revolution<br>Legacy f2p 20v20 - Wicked Fury<br>");
			widget.setText(ctx.player, 205, 53, "Skilling Winners");
			widget.setText(ctx.player, 205, 50, "2015 - Summit<br>2015 (Iron) - Ceecs Clan<br>2014 - Hola Amigos<br>2013 - Venimus<br>2012 - Skill Shock<br>2011 - Divination<br>2010 - Divination<br>2009 - Divination");
			widget.setText(ctx.player, 205, 54, "Combined Winners");
			widget.setText(ctx.player, 205, 51, "2013 - Venimus<br>2012 - Basedin2minutes<br>2011 - Family Unity Network<br>2010 - Basedin2minutes<br>2009 - Wicked Fury");
			widget.setText(ctx.player, 205, 55, "Current Winners");
			widget.setText(ctx.player, 205, 52, "The Victorious Winners of<br>the 2015 jagex Clan Cup<br> <br> Combat - Wicked Fury<br>Skilling - Summit<br>Iron Skilling - Ceecs Clan");
		});

		scriptManager.bind(EventType.OPLOC1, 47713, function (ctx) {//Rocks (Quest The Restless Ghost)
            dialog.builder(ctx.player).mesbox("There's nothing there of any use to you.");
	    });

	    scriptManager.bind(EventType.OPLOC1, 86431, function (ctx) {//Old mine entrance(Ham hidout)
	        if(util.mapMembers()){
	           dialog.builder(ctx.player).mesbox("not yet implemented.");
            } else {
               dialog.builder(ctx.player).mesbox("You need to be on a member's world to use this feature.");
            }
	    });

	    scriptManager.bind(EventType.OPLOC1, 91021, function (ctx) {//dark hole under tree
	        if(util.mapMembers()){
	           chat.sendMessage(ctx.player, "not yet implemented.");
            } else {
               dialog.builder(ctx.player).mesbox("You need to be on a member's world to use this feature.");
            }
	     });

	    scriptManager.bind(EventType.OPLOC1, 36687, function (ctx) {//Trapdoor to lumbridge celler
	         anim.run(ctx.player, 827, function () {
             map.setCoords(ctx.player, coords(3208, 9616, 0));
	         });
	    });

		scriptManager.bind(EventType.OPLOC1, 36768, function (ctx) {//ladder lumbridge castle
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)+1;
			anim.run(ctx.player, 828);
            map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC1, 36769, function (ctx) {//ladder lumbridge castle
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)-1;
			var level2 = map.getLevel(currentCoords)+1;
			dialog.builder(ctx.player).multi3("WHAT WOULD YOU LIKE TO DO?", "Climb up the ladder.", function () {
				anim.run(ctx.player, 828);
				map.setCoords(ctx.player, coords(x, y, level2));
			}, "Climb down the ladder.", function () {
                anim.run(ctx.player, 828);
			    map.setCoords(ctx.player, coords(x, y, level));
			}, "Never mind.", function () {
	        });
	    });

		scriptManager.bind(EventType.OPLOC2, 36769, function (ctx) {//ladder lumbridge castle
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)+1;
			anim.run(ctx.player, 828);
            map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC3, 36769, function (ctx) {//ladder lumbridge castle
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)-1;
			anim.run(ctx.player, 828);
            map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC1, 36770, function (ctx) {//ladder lumbridge castle
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)-1;
			anim.run(ctx.player, 828);
            map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC1, 36771, function (ctx) {//ladder lumbridge castle
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords)-2;
			var level = map.getLevel(currentCoords)+1;
			anim.run(ctx.player, 828);
            map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC1, 36772, function (ctx) {//ladder lumbridge castle
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords)+2;
			var level = map.getLevel(currentCoords)-1;
	        anim.run(ctx.player, 828);
            map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC1, [36773,36776], function (ctx) {//Staircase lumbridge castle bottom floor
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)+1;
	        map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC2, [36774,36777], function (ctx) {//Staircase lumbridge castle mid floor
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)+1;
	        map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC1, [36774,36777], function (ctx) {//Staircase lumbridge castle mid floor
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)-1;
			var level2 = map.getLevel(currentCoords)+1;
			dialog.builder(ctx.player).multi3("WHAT WOULD YOU LIKE TO DO?", "Go up the stairs.", function () {
				map.setCoords(ctx.player, coords(x, y, level2));
			}, "Go down the stairs.", function () {
			    map.setCoords(ctx.player, coords(x, y, level));
			}, "Never mind.", function () {
	        });
	    });

		scriptManager.bind(EventType.OPLOC3, [36774,36777], function (ctx) {//Staircase lumbridge castle mid floor
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)-1;
	        map.setCoords(ctx.player, coords(x, y, level));
	    });

		scriptManager.bind(EventType.OPLOC1, [36775,36778], function (ctx) {//Staircase lumbridge castle top floor
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)-1;
	        map.setCoords(ctx.player, coords(x, y, level));
	    });



	}
})();
