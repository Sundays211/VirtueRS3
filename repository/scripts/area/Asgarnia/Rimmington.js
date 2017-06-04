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

var dialog = require('../../dialog');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, 31459, function (ctx) {//Customs Sergeant
			dialog.chatnpc(ctx.player, 7830, "NEUTRAL", "Zzzzzzzzzzzzzzzzzzz.", function () { //just need the right chat head
		    });	
		});
		scriptManager.bind(EventType.OPLOC1, 71969, function (ctx) {//locker
			dialog.chatnpc(ctx.player, 7831, "NEUTRAL", "Hey! Nobody stores anything in there unless thay are<br> under arrest.", function () { //just need the right chat head
		    });	
		});
		scriptManager.bind(EventType.OPLOC1, 71970, function (ctx) {//notices outside Customs Sergeant
			dialog.mesbox(ctx.player, "There are no new notices here.");
		});
		scriptManager.bind(EventType.OPLOC1, 72434, function (ctx) {//Sleeping man
			dialog.chatnpc(ctx.player, 15476, "NEUTRAL", "...ears to pour their course...", function () { //just need the right chat head
		    });	
		});
		scriptManager.bind(EventType.OPLOC1, 72442, function (ctx) {//Waylan
			dialog.chatnpc(ctx.player, 15471, "NEUTRAL", "...wending through the willows...", function () { //just need the right chat head
		    });	
		});
	}
})();
