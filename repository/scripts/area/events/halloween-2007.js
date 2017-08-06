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
module.exports = (function () {
	return {
		init : init
	};
	//halloween 2007   0,25,75,42,25
	function init (scriptManager) {
		
	    scriptManager.bind(EventType.OPLOC1, 27218, function (ctx) {//Slide
		var currentCoords = map.getCoords(ctx.player);
		var targetCoords = coords(0,25,75,42,19);
	    anim.run(ctx.player, 7274);
	    _entity.forceMove(ctx.player, currentCoords, 220, targetCoords, 300);
	    });

	}

})();