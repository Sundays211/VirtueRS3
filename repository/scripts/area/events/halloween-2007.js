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
/* globals EventType*/
var coords = require('map/coords');
var _entity = require('engine/entity');
var anim = require('anim');
var map = require('map');
var util = require('util');
module.exports = (function () {
	return {
		init : init
	};
	//halloween 2007   0,25,75,42,25
	function init (scriptManager) {
		
		scriptManager.bind(EventType.OPLOC1, 27211, function (ctx) {//ramp
	        anim.run(ctx.player, 7273);
	        _entity.forceMove(ctx.player, map.getCoords(ctx.player), 6, coords(0,25,75,23,45), 160);
	    });
		
	    scriptManager.bind(EventType.OPLOC1, 27218, function (ctx) {//Slide
		    var currentCoords = map.getCoords(ctx.player);
		    var targetCoords = coords(0,25,75,42,19);
	        anim.run(ctx.player, 7274);
	        _entity.forceMove(ctx.player, currentCoords, 220, targetCoords, 300);
	    });
			
	    scriptManager.bind(EventType.OPLOC1, 27278, function (ctx) {//Springboard
		    if (map.getCoordX(ctx.location) == 1637 && map.getCoordY(ctx.location) == 4817) {
		     //TODO add walk to Springboard
	            map.locAnim(ctx.location, 7296);
	            anim.run(ctx.player, 7268);
			    _entity.forceMove(ctx.player, map.getCoords(ctx.player), 5, coords(0,25,75,37,20), 30);
			} else if (map.getCoordX(ctx.location) == 1633 && map.getCoordY(ctx.location) == 4824) {	
			    //TODO add walk to Springboard
	            map.locAnim(ctx.location, 7296);
	            anim.run(ctx.player, 7268);
			    _entity.forceMove(ctx.player, map.getCoords(ctx.player), 5, coords(0,25,75,30,24), 30);	
			} else if (map.getCoordX(ctx.location) == 1630 && map.getCoordY(ctx.location) == 4819) {	
			    //TODO add walk to Springboard
	            map.locAnim(ctx.location, 7296);
	            anim.run(ctx.player, 7268);
			    _entity.forceMove(ctx.player, map.getCoords(ctx.player), 5, coords(0,25,75,27,19), 30);	
			} else if (map.getCoordX(ctx.location) == 1624 && map.getCoordY(ctx.location) == 4822) {	
			    //TODO add walk to Springboard
	            map.locAnim(ctx.location, 7296);
	            anim.run(ctx.player, 7269);
			    _entity.forceMove(ctx.player, map.getCoords(ctx.player), 5, coords(0,25,75,24,28), 30);	
				//TODO render anim of swim
			} else {
			    util.defaultHandler(ctx, "halloween 2007 Springboard");
		    }			
	    });
		

	}

})();