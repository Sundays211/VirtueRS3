/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
/* globals EventType, Inv, Stat */
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var anim = require('../../core/anim');
var config = require('../../core/config');
var util = require('../../core/util');
var inv = require('../../inv');
var dialog = require('../../dialog');
var widget = require('../../widget');

var makex = require('../makex');
var stat = require('../logic/stat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/01/2016
 */
module.exports = (function () {
	var Saplings = {
		OAK : {
			seed : 5312, 
			seedling : 5358, 
			wateredSeedling : 5364, 
			sapling : 5370
		},
		WILLOW : { 
			seed : 5313, 
			seedling : 5359, 
			wateredSeedling : 5365,
			sapling : 5371 
		},
		MAPLE : {
			seed : 5314, 
			seedling : 5360, 
			wateredSeedling : 5366,
			sapling : 5372
		},
		YEW : {
			seed : 5315, 
			seedling : 5361, 
			wateredSeedling : 5367,
			sapling : 5373
		},
		MAGIC : {
			seed : 5316, 
			seedling : 5362, 
			wateredSeedling : 5368,
			sapling : 5374
		},
		SPIRIT : {
			seed : 5317, 
			seedling : 5363, 
			wateredSeedling : 5369,
			sapling : 5375
		}
	};
	
	var _bySeedId = {};
	var _bySeedlingId = {};
	
	function initLookups () {
		for (var i in Saplings) {
			var s = Saplings[i];
			_bySeedId[s.seed] = s;
			_bySeedlingId[s.seedling] = s;
		}
	}
	
	return {
		init : init,
		process : process,
		values : Saplings
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELDU, 5354, function (ctx) {
			var sapling = lookupBySeedId(ctx.useObjId);
			if (sapling) {
				plantSeed(ctx.player, sapling.seedling, 6825);
			} else {
				util.defaultHandler(ctx, "plant pot");
			}
		});
		
		scriptManager.bind(EventType.OPHELDU, [ 5312, 5313, 5314, 5315, 5316, 5317 ], function (ctx) {
			var sapling = lookupBySeedId(ctx.objId);
			if (ctx.useObjId === 5354) {
				plantSeed(ctx.player, sapling.seedling, 6825);
			} else {
				util.defaultHandler(ctx, "seed");
			}
		});

		scriptManager.bind(EventType.OPHELDU, [ 5358, 5359, 5360, 5361, 5362, 5363 ], function (ctx) {
			var seedling = lookupBySeedlingId(ctx.objId);
			if (config.enumHasValue(136, ctx.useObjId)) {
				water(ctx.player, seedling.wateredSeedling, 6826);
			} else {
				util.defaultHandler(ctx, "seedling");
			}
		});
		
		scriptManager.bind(EventType.OPHELDU, config.enumValueList(136), function (ctx) {
			//Watering can
			var seedling = lookupBySeedlingId(ctx.useObjId);
			if (seedling) {
				water(ctx.player, seedling.wateredSeedling, 6826);
			} else {
				util.defaultHandler(ctx, "watering can");
			}
		});
		initLookups();
	}
	
	function lookupBySeedId (seedId) {
		return _bySeedId[seedId];
	}
	
	function lookupBySeedlingId (seedlingId) {
		return _bySeedlingId[seedlingId];
	}
	
	function process (player) {
		for (var slot=0; slot<28; slot++) {
			var objId = inv.getObjId(player, Inv.BACKPACK, slot);
			switch (objId) {
			case 5364://Oak seedling
				growSapling(player, 5364, 5370);
				break;
			case 5365://Willow seedling
				growSapling(player, 5365, 5371);
				break;
			case 5366://Maple seedling
				growSapling(player, 5366, 5372);
				break;
			case 5367://Yew seedling
				growSapling(player, 5367, 5373);
				break;
			case 5374://Magic seedling
				growSapling(player, 5368, 5374);
				break;
			case 5369://Spirit seedling
				growSapling(player, 5369, 5375);
				break;
			}
		}
	}
	
	function growSapling (player, oldId, newId) {
		inv.take(player, oldId);
		inv.give(player, newId);
	}
	
	function fill (player) {
		anim.run(player, 24898, function () {
			inv.take(player, 5350);
			inv.give(player, 5354);
			if (inv.has(player, 5350)) {
				//If there are empty pots remaining, keep filling them.
				fill(player);
			}
		});
	}
	
	function plantSeed (player, productId, productCategory) {
		makex.selectProduct(player, 6821, 6822, productCategory, productId);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var count = varbit(player, 1003);
			var xp = config.objParam(productId, 2697) * count;
			stat.giveXp(player, Stat.FARMING, xp);
			inv.take(player, 5354, count);
			inv.take(player, config.objParam(productId, 2656), count);
			inv.give(player, productId, count);
		});
	}
	
	function water (player, productId, productCategory) {
		makex.selectProduct(player, 6823, 6824, productCategory, productId);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				makex.startCrafting(player, amount);
			}
		});
	}
})();
