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
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
	   
	    scriptManager.bind(EventType.OPLOC1, 3507, function (ctx) {//gate
		dialog.mesbox(ctx.player, "There's a message attached to this gate, it reads:-<br><col=0000ff>~ Mort Myre is a dangerous Ghast infested swamp. ~<br><col=0000ff> ~ Do not enter if you value your life. ~<br><col=0000ff> ~ All persons wishing to enter must see Drezel. ~");
        });
	   
	    scriptManager.bind(EventType.OPLOC1, 91557, function (ctx) {//cave to araxyte lair
            map.setCoords(ctx.player, coords(1,70,98,32,17));
			anim.run(ctx.player, 15459);
        });
		
		scriptManager.bind(EventType.OPLOC2, 91557, function (ctx) {//cave to araxyte graveyard
            map.setCoords(ctx.player, coords(1,73,97,32,30));
			anim.run(ctx.player, 15459);
        });

	}

})();