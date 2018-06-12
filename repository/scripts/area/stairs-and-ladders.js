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
/* globals EventType */

var dialog = require('dialog');
var coords = require('map/coords');
var anim = require('anim');
var map = require('map');
var chat = require('chat');
var util = require('util');
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		
		scriptManager.bind(EventType.OPLOC1, 29355, function (ctx) {
		    if (map.getCoordX(ctx.location) == 3116 && map.getCoordY(ctx.location) == 9852) {//ladder from hill giants to varrock
		        anim.run(ctx.player, 828, function () {
                map.setCoords(ctx.player, coords(3115, 3452, 0));
	            });
		    } else if (map.getCoordX(ctx.location) == 3209 && map.getCoordY(ctx.location) == 9616) {//ladder to lumbridge castle where cook is
		        anim.run(ctx.player, 828, function () {
                map.setCoords(ctx.player, coords(3210, 3216, 0));
	            });
		    } else {
			    util.defaultHandler(ctx, "unhandled ladder");
		    }	
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
		
		scriptManager.bind(EventType.OPLOC2, [36774,36777], function (ctx) {//Staircase lumbridge castle mid floor
		    var currentCoords = map.getCoords(ctx.player);
			var x = map.getCoordX(currentCoords);
			var y = map.getCoordY(currentCoords);
			var level = map.getLevel(currentCoords)+1;
	        map.setCoords(ctx.player, coords(x, y, level));	
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
		
		scriptManager.bind(EventType.OPLOC1, 39273, function (ctx) {//ladder betty's basement quest (swept away)
	        anim.run(ctx.player, 828, function () {
                map.setCoords(ctx.player, coords(3014, 3257, 0));
	        });  
	    });
		
		scriptManager.bind(EventType.OPLOC1, 45481, function (ctx) {
		    if (map.getCoordX(ctx.location) == 3215 && map.getCoordY(ctx.location) == 3239) {//Staircase Lumbridge's general store
                map.setCoords(ctx.player, coords(3214, 3239, 1));
		    } else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {//Staircase west of Lumbridge's general store
                map.setCoords(ctx.player, coords(3200, 3242, 1));
			} else if (map.getCoordX(ctx.location) == 3193 && map.getCoordY(ctx.location) == 3255) {//Staircase Lumbridge's fishing store
                map.setCoords(ctx.player, coords(3195, 3255, 1));
		    } else {
			    util.defaultHandler(ctx, "unhandled Staircase");
		    }	
        });

		scriptManager.bind(EventType.OPLOC1, 45482, function (ctx) {
		    if (map.getCoordX(ctx.location) == 3215 && map.getCoordY(ctx.location) == 3239) {//Staircase Lumbridge's general store
                map.setCoords(ctx.player, coords(3217, 3239, 0));
		   } else if (map.getCoordX(ctx.location) == 3200 && map.getCoordY(ctx.location) == 3243) {//Staircase west of Lumbridge's general store
                map.setCoords(ctx.player, coords(3200, 3245, 0));
		   } else if (map.getCoordX(ctx.location) == 3193 && map.getCoordY(ctx.location) == 3255) {//Staircase Lumbridge's fishing store
                map.setCoords(ctx.player, coords(3195, 3255, 0));
		    } else {
			    util.defaultHandler(ctx, "Staircase");
		    }	
        });
		
	}

})();