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
var dialog = require('dialog');
var inv = require('inv');
var chat = require('chat');
var widget = require('widget');
var coords = require('map/coords');
var util = require('util');
var anim = require('anim');
var map = require('map');
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, 69776, function (ctx) {
			chat.sendMessage(ctx.player, "North to the Chsmpions' Guild and Varrock.");
		});	
		
		scriptManager.bind(EventType.OPLOC1, 69778, function (ctx) {
			chat.sendMessage(ctx.player, "West to Lumbridge's mill.");
		});
		
	    scriptManager.bind(EventType.OPLOC1, 69780, function (ctx) {
	    	chat.sendMessage(ctx.player, "East to Lumbridge.");
		});
	    
		scriptManager.bind(EventType.OPLOC1, 69782, function (ctx) {
			chat.sendMessage(ctx.player, "North to Lumbridge farms.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69783, function (ctx) {
			chat.sendMessage(ctx.player, "South to Lumbridge.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69784, function (ctx) {
			chat.sendMessage(ctx.player, "West to Draynow and Wizards' Tower.");
		});
		
		scriptManager.bind(EventType.OPLOC1, [69785,69790], function (ctx) {
			chat.sendMessage(ctx.player, "East to Al Kharid.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69786, function (ctx) {
			chat.sendMessage(ctx.player, "South to Lumbridge's graveyard/swamp and boat to Daemonheim.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69787, function (ctx) {
			chat.sendMessage(ctx.player, "South-west into Lumbridge Castle.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69788, function (ctx) {
			chat.sendMessage(ctx.player, "North-west to Lumbridge farms.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69789, function (ctx) {
			chat.sendMessage(ctx.player, "North to Varrock.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 69791, function (ctx) {
			chat.sendMessage(ctx.player, "West into Lumbridge.");
		});
		
		scriptManager.bind(EventType.OPLOC1, 15468, function (ctx) {
			if(inv.total(ctx.player, 2347, Inv.BACKPACK)) {
				dialog.mesbox(ctx.player, "You already have a hammer.");
			} else {
				inv.give(ctx.player, 2347,1);
			    dialog.objbox(ctx.player, 2347, "You take a hammer from the crate.");
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
            dialog.mesbox(ctx.player, "There's nothing there of any use to you."); 
	    });	
		
	    scriptManager.bind(EventType.OPLOC1, 86431, function (ctx) {//Old mine entrance(Ham hidout)
	        if(util.mapMembers()){
	           dialog.mesbox(ctx.player, "not yet implemented.");
            } else {
               dialog.mesbox(ctx.player, "You need to be on a member's world to use this feature."); 
            }
	    });	
		
	    scriptManager.bind(EventType.OPLOC1, 91021, function (ctx) {//dark hole under tree
	        if(util.mapMembers()){
	           chat.sendMessage(ctx.player, "not yet implemented.");
            } else {
               dialog.mesbox(ctx.player, "You need to be on a member's world to use this feature."); 
            }
	     });	
		 
	    scriptManager.bind(EventType.OPLOC1, 36687, function (ctx) {//Trapdoor to lumbridge celler
	         anim.run(ctx.player, 827, function () {
             map.setCoords(ctx.player, coords(3208, 9616, 0));
	         });	
	    });
		
	}
})();
