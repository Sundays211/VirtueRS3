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
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		
		scriptManager.bind(EventType.OPLOC1, [76651,76652], function (ctx) {//danger sign
			dialog.builder(ctx.player).mesbox("The warning signs in front of the huge stone gate state:")
			.mesbox("<col=800000>The Kharidian Desert is a VERY dangerous place. Beware of high<br><col=800000> temperatures, sandstorms, quicksand, bandits, slavers, kalphites,<br><col=800000> monkeys, crocodiles, and acts of vengeful, goddesses bent on the total<br><col=800000> destruction of all life in the desert.")
			.mesbox("No responsibility is taken by shantay if anything bad should happen to you<br> under any circumstances whatsoever.")
			.finish();
		});
		
	}
})();
