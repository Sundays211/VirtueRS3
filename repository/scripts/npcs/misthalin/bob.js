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

var dialog = require('dialog');
var varc = require('engine/var/client');
var varp = require('engine/var/player');
var widget = require('widget');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
		
	   scriptManager.bind(EventType.OPNPC1, 519, function (ctx) {
	       var player = ctx.player;
	       var npc = ctx.npc;
           dialog.multi3(player, "SELECT AN OPTION", "I'd like to trade.", function () {
	          dialog.builder(player).chatplayer("I'd like to trade.")
	          .chatnpc(npc, "Great! I buy and sell pickaxes and hatchets. There are<br> plenty to choose from, and I've some free samples too.<br> Take your pick...or hatchet.")
	          .then(function () {
              openshop(player);
	          });
	       }, "Can you repair my items for me?", function () {
	          dialog.builder(player).chatplayer("Can you repair my items for me?")
	          .chatnpc(npc, "of course I can, though the materials may cost you. Just<br> hand me the item and I'll have a look.")
	          .finish();
           }, "About the Task System...", function () {
			   dialog.multi2(player, "CHOOSE AN OPTION", "Tell me about the Task System.", function () {
				  tasksystem(player,npc);
			   }, "Sorry, I was just leaving.", function () {
	           });  
	       });	
	   });	
	
	   scriptManager.bind(EventType.OPNPC3, 519, function (ctx) {
	      openshop(ctx.player);
	   });
	}
	
	function tasksystem (player, npc) {
		  dialog.builder(player).chatnpc(npc, "Very well: the Task System is a collection of deeds you<br> may wish to complete while adventuring around<br> RuneScape.") 
	      .chatnpc(npc, "You van earn special rewards for completing Tasks; at<br> the very least, each is worth a cash bounty from Explorer<br> Jack in Lumbridge.")
          .chatnpc(npc, "Some also give items that will help complete other Tasks,<br> and many count as progress towards the set of area<br> they're in.")
		  .multi3("CHOOSE AN OPTION", "Tell me about the set reward for this locality.", function () {
			  dialog.builder(player).chatnpc(npc, "For completing the Lumbridge and Draynor set, you are<br> presented with an explorer's ring.")
              .chatnpc(npc, "This ring will become increasingly useful with each<br> difficulty level of the set that you complete.")
			  .chatnpc(npc, "When you are presented with your rewards, you will be<br> told of their uses.")
			  .mesbox("You may also select a set Task (denoted in the main Task System<br> interface by a small shield icon) and choose 'Rewards' to see what rewards<br> a set item provdes.")
			  .multi3("CHOOSE AN OPTION", "Tell me about the Task System.", function () {
			    tasksystem(player,npc);
			  }, "How do I claim these rewards?", function () {
			    claimtheserewards(player,npc);
              }, "Sorry, I was just leaving.", function () {
              });  
		  }, "How do I claim these rewards?", function () {
			  claimtheserewards(player,npc);
          }, "Sorry, I was just leaving.", function () {
          });			  
	}
	
	function claimtheserewards (player, npc) {
		 dialog.builder(player).chatnpc(npc, "You need to complete all of the Tasks in the set of a<br> particular difficulty, then you can claim your reward. Most<br> of the Lumbridge set's Tasks are straightforward,<br> although you might find some require quests to be") 
	     .chatnpc(npc, "started, if not finished.") 	  
		 .chatnpc(npc, "To claim the Lumbridge set rewards, speak to Ned in<br> Draynor Village, Explorer Jack in Lumbridge, or myself.")
	     .multi2("CHOOSE AN OPTION", "Tell me about the Task System.", function () {
		    tasksystem(player,npc);
	     }, "Sorry, I was just leaving.", function () {
         });
	}
	
	
	function openshop (player) {
      varp(player, 304, Inv.BOBS_AXES);
	  varp(player, 305, Inv.BOBS_AXES_FREE_STOCK);
	  varc(player, 2360, "Bob's Brilliant Axes");
	  widget.openCentral(player, 1265);
	}
	
	
})();
