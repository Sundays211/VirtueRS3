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
var anim = require('shared/anim');
var map = require('shared/map');
var coords = require('shared/map/coords');


module.exports = (function () {
	return {
		init : init
	};
	// npcs
	//gublinch  5003-5019 and 829 varbit 14381
	//Shanty Claws 828
	//loc
	//19036-Cage
    //19037-Cage with gublinch
	function init (scriptManager) {
	scriptManager.bind(EventType.OPLOC1, 19040, function (ctx) {//Ladder 3168 5320
	anim.run(ctx.player, 828, function () {
	map.setCoords(ctx.player, coords(2841, 3143, 0));
	});
	});
	}
})();
