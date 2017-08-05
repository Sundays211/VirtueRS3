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
/* globals Inv, WearPos, Stat */
var varbit = require('engine/var/bit');

var _config = require('engine/config');
var inv = require('inv');
var chat = require('chat');
var stat = require('stat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {
	var Hatchet = {
		BRONZE : {
			objId : 1351,
			level : 1,
			bonus : 1,
			anim : 21668
		},
		IRON : {
			objId : 1349,
			level : 1,
			bonus : 2,
			anim : 21667
		},
		STEEL : {
			objId : 1353,
			level : 6,
			bonus : 3,
			anim : 21666
		},
		BLACK : {
			objId : 1361,
			level : 11,
			bonus : 4,
			anim : 21665
		},
		MITHRIL : {
			objId : 1355,
			level : 21,
			bonus : 5,
			anim : 21664
		},
		ADAMANT : {
			objId : 1357,
			level : 31,
			bonus : 7,
			anim : 21663
		},
		RUNE : {
			objId : 1359,
			level : 41,
			bonus : 10,
			anim : 21662
		},
		DRAGON : {
			objId : 6739,
			level : 61,
			bonus : 13,
			anim : 21669
		},
		CRYSTAL : {
			objId : 32645,
			level : 71,
			bonus : 16,
			anim : 25003 //25182 for canoe ?
		}
	};

	var _hatchetLookup;

	function lookupHatchet (objId) {
		if (!_hatchetLookup) {
			_hatchetLookup = {};

			for (var ordial in Hatchet) {
				_hatchetLookup[Hatchet[ordial].objId] = Hatchet[ordial];
			}
		}
		return _hatchetLookup[objId.toString()];
	}

	return {
		getHatchet : getHatchet,
		values : Hatchet
	};

	function getHatchet (player) {
		var playerLevel = stat.getLevel(player, Stat.WOODCUTTING);
		var objId = inv.getObjId(player, Inv.EQUIPMENT, WearPos.WEAPON);
		var hatchet;
		if (objId !== -1 && _config.objCategory(objId) === 35) {
			hatchet = lookupHatchet(objId);
			if (typeof(hatchet) === "undefined") {
				chat.sendDebugMessage(player, "Worn item "+objId+" is categorised as a hatchet but is not yet supported.");
			} else if (playerLevel >= hatchet.level) {
				return hatchet;
			}
		}
		var bestHatchet = null;
		if (inv.hasTool(player, 1265)) {
			bestHatchet = lookupHatchet(_config.enumValue(7503, varbit(player, 18522)));
			if (playerLevel < bestHatchet.level) {
				return getNextLowestHatchet(playerLevel);
			}
		}

		for (var slot=0; slot<28; slot++) {
			objId = inv.getObjId(player, Inv.BACKPACK, slot);
			if (objId !== -1 && _config.objCategory(objId) === 35) {
				hatchet = lookupHatchet(objId);
				if (typeof(hatchet) === "undefined") {
					chat.sendDebugMessage(player, "Item "+objId+" found in backpack slot "+slot+" is categorised as a hatchet but is not yet supported.");
				} else if (!bestHatchet || hatchet.bonus > bestHatchet.bonus &&
						playerLevel >= hatchet.level) {
					bestHatchet = hatchet;
				}
			}
		}
		return bestHatchet;
	}

	function getNextLowestHatchet (playerLevel) {
		var best = Hatchet.BRONZE;
		var axe;
		for (var ordinal in Hatchet) {
			axe = Hatchet[ordinal];
			if (axe.bonus > best.bonus && axe.level <= playerLevel) {
				best = axe;
			}
		}
		return best;
	}
})();
