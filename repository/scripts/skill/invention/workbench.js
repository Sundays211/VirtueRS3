/**
 * Copyright (c) 2016 Virtue Studios
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
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var dialog = require('../../dialog');
var widget = require('../../widget');
var makex = require('../makex');

/**
 * @author Greco
 */
module.exports = (function () {
	return {
		init : init,
		selectInventionProduct : selectInventionProduct
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, 100874, function (ctx) {
			selectInventionProduct(ctx.player);
		});
	}
	
	function selectInventionProduct (player) {
		makex.selectProduct(player, 10738, 10739, 10740);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				var text = "You carefully make device.";
				makex.startCrafting(player, amount, 27997, text);
			}
		});
	}
})();
