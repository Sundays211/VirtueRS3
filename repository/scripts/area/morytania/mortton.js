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
var coords = require('map/coords');
var map = require('map');
var anim = require('anim');
var dialog = require('dialog');
var varp = require('engine/var/player');
var widget = require('widget');
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
	   
	    scriptManager.bind(EventType.OPLOC1, 87997, function (ctx) {//jump down well
		    anim.run(ctx.player, 21924, function () {
			    varp(ctx.player, 5142, 15364);//find right varbits that are used
				varp(ctx.player, 5144, 24181);
				widget.openCentral(ctx.player, 1591, false);	
				
			});	
			//getting kicked out anim 21922
        });
		
		scriptManager.bind(EventType.OPLOC2, 87997, function (ctx) {//well graveyard
            map.setCoords(ctx.player, coords(1,37,94,31,39));
			anim.run(ctx.player, 2924);
        });

	}

})();