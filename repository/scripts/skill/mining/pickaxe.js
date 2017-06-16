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
var varbit = require('../../core/var/bit');

var config = require('../../core/config');
var inv = require('../../inv');
var chat = require('../../chat');
var stat = require('../common/stat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {	
	var Pickaxe = {
		BRONZE : {
			objId : 1265,
			level : 1,
			speed : 6,
			bonus : 1,
			anim : 625
		},
		IRON : {
			objId : 1267,
			level : 1,
			speed : 5,
			bonus : 2,
			anim : 626
		},
		STEEL : {
			objId : 1269,
			level : 6,
			speed : 4,
			bonus : 3,
			anim : 627
		},
		MITHRIL : {
			objId : 1273,
			level : 21,
			speed : 3,
			bonus : 5,
			anim : 629
		},
		ADAMANT : {
			objId : 1271,
			level : 31,
			speed : 3,
			bonus : 7,
			anim : 628
		},
		RUNE : {
			objId : 1275,
			level : 41,
			speed : 3,
			bonus : 10,
			anim : 624
		},
		DRAGON : {
			objId : 15259,
			level : 61,
			speed : 3,
			bonus : 13,
			anim : 12190
		},
		CRYSTAL : {
			objId : 32646,
			level : 71,
			speed : 3,
			bonus : 16,
			anim : 25004
		}
	};
	
	var _pickaxeLookup;
	
	function lookupPickaxe (objId) {
		if (!_pickaxeLookup) {
			_pickaxeLookup = {};
			
            for (var ordial in Pickaxe) {
            	_pickaxeLookup[Pickaxe[ordial].objId] = Pickaxe[ordial];
            }
        }
		return _pickaxeLookup[objId.toString()];
	}
	
	return {
		getPickaxe : getPickaxe,
		values : Pickaxe
	};
	
	function getPickaxe (player) {
		var playerLevel = stat.getLevel(player, Stat.MINING);
        var objId = inv.getObjId(player, Inv.EQUIPMENT, WearPos.WEAPON);
        var pickaxe;
        if (objId !== -1 && config.objCategory(objId) === 67) {
        	pickaxe = lookupPickaxe(objId);
            if (typeof(pickaxe) === "undefined") {
                chat.sendDebugMessage(player, "Worn item "+objId+" is categorised as a pickaxe but is not yet supported.");
            } else if (playerLevel >= pickaxe.level) {
            	return pickaxe;
            }
        }
        var bestPickaxe = null;
        if (inv.hasTool(player, 1265)) {
        	bestPickaxe = lookupPickaxe(config.enumValue(7501, varbit(player, 18521)));
        	if (playerLevel < bestPickaxe.level) {
        		return getNextLowestPickaxe(playerLevel);
        	}
        }
        
        for (var slot=0; slot<28; slot++) {
        	objId = inv.getObjId(player, Inv.BACKPACK, slot);
            if (objId !== -1 && config.objCategory(objId) === 67) {
            	pickaxe = lookupPickaxe(objId);
            	if (typeof(pickaxe) === "undefined") {
            		chat.sendDebugMessage(player, "Item "+objId+" found in backpack slot "+slot+" is categorised as a pickaxe but is not yet supported.");
            	} else if (!bestPickaxe || pickaxe.bonus > bestPickaxe.bonus &&
            			playerLevel >= pickaxe.level) {
            		bestPickaxe = pickaxe;
                }
            }
        }
        return bestPickaxe;
	}
	
	function getNextLowestPickaxe (playerLevel) {
		var best = Pickaxe.BRONZE;
		var pic;
		for (var ordinal in Pickaxe) {
			pic = Pickaxe[ordinal];
			if (pic.bonus > best.bonus && pic.level <= playerLevel) {
				best = pic;
			}
		}
		return best;
	}
	
})();