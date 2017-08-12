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
var chat = require('chat');
var inv = require('inv');
var dialog = require('dialog');
var util = require('util');
var anim = require('anim');
var map = require('map');
var coords = require('map/coords');
var loc = require('map/location');
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
				
	scriptManager.bind(EventType.OPLOC1, 34246, function (ctx) {//Wardrobe in Witch's House
        loc.add(34247, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location));  
    });	

    scriptManager.bind(EventType.OPLOC2, 34247, function (ctx) {//Wardrobe in Witch's House
        chat.sendMessage(ctx.player, "The wardobe is empty.");  
    });		
		
	scriptManager.bind(EventType.OPLOC3, 34247, function (ctx) {//Wardrobe in Witch's House
        loc.add(34246, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location));  
    });	
		
	scriptManager.bind(EventType.OPLOC1, 24670, function (ctx) {//Wardrobe in Witch's House
        loc.add(24671, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location));  
    });	
	
	scriptManager.bind(EventType.OPLOC2, 24671, function (ctx) {//Wardrobe in Witch's House
        chat.sendMessage(ctx.player, "The wardobe is empty."); 
    });	
		
	scriptManager.bind(EventType.OPLOC3, 24671, function (ctx) {//Wardrobe in Witch's House
        loc.add(24670, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location));  
    });		
		
	scriptManager.bind(EventType.OPLOC1, 24672, function (ctx) {//Staircase in Witch's House
        map.setCoords(ctx.player, coords(1, 45, 52, 18, 44));  
    });		
	
    scriptManager.bind(EventType.OPLOC1, 24673, function (ctx) {//Staircase in Witch's House
        map.setCoords(ctx.player, coords(0, 45, 52, 18, 40));  
    });	
	
	scriptManager.bind(EventType.OPLOC1, 24681, function (ctx) {//Drawers in Witch's House
        loc.add(24682, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location)); 
    });		
		
	scriptManager.bind(EventType.OPLOC2, 24682, function (ctx) {//Drawers in Witch's House
        chat.sendMessage(ctx.player, "The drawers are empty.");
    });		
		
	scriptManager.bind(EventType.OPLOC3, 24682, function (ctx) {//Drawers in Witch's House
        loc.add(24681, map.getCoords(ctx.location), loc.getShape(ctx.location), loc.getRotation(ctx.location)); 
		chat.sendMessage(ctx.player, "You shut the drawers.");
    });		
		
	scriptManager.bind(EventType.OPLOC1, 24718, function (ctx) {//Ladder in Witch's House
        anim.run(ctx.player, 828, function () {
			map.setCoords(ctx.player, coords(2774, 9759, 0)); 
		});	 
    });		
		
	scriptManager.bind(EventType.OPLOC1, 24882, function (ctx) {//Gramophone in Witch's House
         chat.sendMessage(ctx.player, "The gramophone doesn't have a record on it."); 
    });		
		
	scriptManager.bind(EventType.OPLOC1, 24842, function (ctx) {//Manhole (Quest Witch's House)
	  if (util.mapMembers()){
	     chat.sendMessage(ctx.player, "The cover won't budge. It seems to be locked.");
      } else {
         chat.sendMessage(ctx.player, "You need to be on a member's world to use this feature."); 
      }
    });	
	
    scriptManager.bind(EventType.OPLOC1, 2867, function (ctx) {//Potted plant (Quest Witch's House)
	  if (util.mapMembers()){
	  if (inv.has(ctx.player, 2409)) {
	     chat.sendMessage(ctx.player, "You don't find anything interesting."); 
	  } else {
	     inv.give(ctx.player, 2409, 1);
	     dialog.mesbox(ctx.player, "You find a key hidden under the flower pot."); 	 
	  }	
      } else {
         chat.sendMessage(ctx.player, "You need to be on a member's world to use this feature."); 
      }
	});
	
	scriptManager.bind(EventType.OPLOC1, 2861, function (ctx) {//Door (Quest Witch's House)
	  if (util.mapMembers()){
	  if (inv.has(ctx.player, 2409)) {
	     dialog.chatplayer(ctx.player, "It would be rude to break into this house.", Expression.NEUTRAL);
	  } else {
	     chat.sendMessage(ctx.player, "This door is locked."); 	 
	  }
      } else {
         chat.sendMessage(ctx.player, "You need to be on a member's world to use this feature."); 
      }
	});	
	
	scriptManager.bind(EventType.OPLOCU, 2861, function (ctx) {
	  switch (ctx.useObjId) {
	   case 2409:	
	     dialog.chatplayer(ctx.player, "It would be rude to break into this house.", Expression.NEUTRAL);
	   return;	
	  }
    });	
	
	}

})();
