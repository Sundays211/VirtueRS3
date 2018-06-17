/**
 * Copyright (c) 2014 Virtue Studios
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
var varp = require('engine/var/player');

var util = require('shared/util');
var makex = require('../makex');
var common = require('./common');
var FEATHER_ARROWS = 6966;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
module.exports = (function (){
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 52, function (ctx) {
			selectArrows(ctx.player, 53);//Arrow shaft
		});

		scriptManager.bind(EventType.OPHELDU, [ 52, 12539 ], function (ctx) {
			//Arrow shaft, Grenwall spikes
			if (makex.hasPossibleIngredient(14981, ctx.useObjId)) {
				selectArrows(ctx.player, 53);
			} else {
				util.defaultHandler(ctx, "arrow shaft use");
			}
		});

		scriptManager.bind(EventType.OPHELDU, [ 314, 10087, 10088, 10089,
			10090, 10091, 11525 ], function (ctx) {
			//Feather, Stripy feather, Red feather, Blue feather, Yellow feather
			//Orange feather, Wimpy feather
			if (makex.hasPossibleIngredient(14983, ctx.useObjId)) {
				selectArrows(ctx.player, 53);
			} else {
				util.defaultHandler(ctx, "feather use");
			}
		});

		common.registerProcessHandler(FEATHER_ARROWS, featherArrows);
	}

	function selectArrows (player, productId) {
		common.startStringing(player, FEATHER_ARROWS, productId);
	}

	function featherArrows (player, headlessArrowId, amount) {
		varp(player, 1175, headlessArrowId);
		//var text, animationId;
		var text = "You attach feathers to 15 arrow shafts.";
		makex.startCrafting(player, amount, -1, text);
	}
})();
