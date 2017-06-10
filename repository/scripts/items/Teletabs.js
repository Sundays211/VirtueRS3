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
/* globals EventType, ENGINE */
var coords = require('../map/coords');

var anim = require('../core/anim');
var map = require('../map');
var inv = require('../inv');

module.exports = (function () {
	var TeleTabs = {
 	    VarrockTele : {
			itemID : 8007,
			destination : coords(3212, 3424, 0)
	    },
	    LumbridgeTele : {
	    	itemID : 8008,
	    	destination : coords(3222, 3218, 0)
	    },		    
        FaladorTele : {
        	itemID : 8009,
        	destination : coords(2965, 3379, 0)
	    },
		CamelotTele : {
			itemID : 8010,
			destination : coords(2757, 3477, 0)
	    },
		ArdougneTele : {
			itemID : 8011,
			destination : coords(2661, 3303, 0)
	    },
		WatchtowerTele : {
			itemID : 8012,
			destination : coords(2549, 3112, 0)
	    },
		HouseTele : {
			itemID : 8013,
			destination : coords(2955, 3224, 0)
	    },
		GodwarsTele : {
			itemID : 31665,
			destination : coords(2886, 5309, 0)
	    }	
	};

   return {
	   init : init
   };


   function init (scriptManager) {
	   scriptManager.bind(EventType.OPHELD1, [8007, 8008, 8009, 8010,8011, 8012,8013, 31665], function (ctx) {
		   var teletab = forteletab(ctx.player, ctx.item);
		   inv.take(ctx.player, teletab.itemID, 1);
		   ENGINE.freezeEntity(ctx.player, 7);
		   anim.addSpotAnim(ctx.player, 1680);
		   anim.run(ctx.player, 9597, function () {
			   anim.run(ctx.player, 4731, function () {	
				   map.setCoords(ctx.player, teletab.destination);
				   anim.run(ctx.player, 9598);
			   });
		   });
	   });	 
   }
   
   function forteletab(player, item) {
	   var teletab;
	   for (var ordial in TeleTabs) {
		   teletab = TeleTabs[ordial];
		   if (teletab.itemID == item.getID()) {
			   return teletab;
		   }
	   }
	   return null;
   } 
	
})();