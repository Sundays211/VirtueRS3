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
/* globals ENGINE, Inv, Stat, Woodcutting */
var varc = require('engine/var/client');

var anim = require('shared/anim');
var config = require('engine/config');
var util = require('shared/util');
var chat = require('shared/chat');
var inv = require('shared/inv');
var widget = require('shared/widget');
var stat = require('shared/stat');

var materials = require('./materials');
var makexProgress = require('../makex/progress');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 04/04/2016
 */
module.exports = (function () {
	var JUNK_PAST_75 = {
			75 : 4.2, 76 : 3.8, 77 : 3.4, 78 : 3.0, 79 : 2.7,
			80 : 2.3, 81 : 2.0, 82 : 1.7, 83 : 1.4, 84 : 1.2,
			85 : 1.0, 86 : 0.8, 87 : 0.6, 88 : 0.4, 89 : 0.3 };

	var _categoryLookup;
	return {
		init : init,
		canDisassemble : canDisassemble,
		start : startDisassembly,
		analyseItem : analyseItem
	};

	function init () {
		_categoryLookup = {};
		function registerCategory (id, materialCount, often, sometimes, rarely, boosted) {
			boosted = boosted === undefined ? false : boosted;
			_categoryLookup[id] = {"id":id, "materialCount":materialCount, "often":often, "sometimes":sometimes, "rarely":rarely, "boosted":boosted};
		}
		var Material = materials.values;
		registerCategory(22, 1, [Material.SIMPLE], [], [Material.LIVING]);//Logs
		registerCategory(64, 12, [Material.STAVE, Material.TENSILE, Material.FLEXIBLE], [], [Material.PRECISE, Material.DEXTROUS], true);//Shortbow
		registerCategory(3751, 4, [Material.STAVE, Material.TENSILE, Material.FLEXIBLE], [], [Material.PRECISE, Material.STRONG], true);//Shieldbow (u)
		registerCategory(3752, 4, [Material.STAVE, Material.TENSILE, Material.FLEXIBLE], [], [Material.PRECISE, Material.DEXTROUS], true);//Shortbow (u)
	}

	function lookupCategory (category) {
		if (!_categoryLookup) {
			init();
		}
		return _categoryLookup[category];
	}

	function canDisassemble (objId) {
		var category = config.objCategory(config.objUncert(objId));
		return lookupCategory(category) !== undefined;
	}

	function startDisassembly (player, objId) {
		ENGINE.interrupt(player);
		if (!canDisassemble(objId)) {
			chat.sendMessage(player, "You can't disassemble that item (not yet implemented)");
			return;
		}
		var uncertId = config.objUncert(objId);
		var total = Math.min(60, inv.total(player, objId, Inv.BACKPACK));
		varc(player, 5123, uncertId);
		varc(player, 5124, 1);
		makexProgress.openInterface(player, 36365, 10740, total, 2);
		var remaining = total;
		chat.sendMessage(player, "Disassembling: "+config.objName(uncertId));
		anim.addSpotAnim(player, 6003);
		anim.run(player, 27997);
		var xp = calculateExperience(uncertId);
		var onInterrupt = function () {
			widget.closeOverlaySub(player, 1018, true);
		};
		var disassembleItem = function () {
			addMaterials(player, uncertId);
			inv.take(player, objId, 1);
			remaining--;
			makexProgress.setRemaining(player, remaining);
			stat.giveXp(player, Stat.INVENTION, xp);
			if (remaining > 0) {
				anim.addSpotAnim(player, 6003);
				anim.run(player, 27997);
				util.delayFunction(player, 2, disassembleItem, true, onInterrupt);
			}
		};
		util.delayFunction(player, 2, disassembleItem, true, onInterrupt);
	}

	/**
	 * Gets the level of the item, used to calculate the junk chance & experience gained.
	 * For most items, this is based either off the level to make or gather (logs, bars, ores, etc) or the level to wear/wield.
	 */
	function getItemLevel (objId) {
		switch (config.objCategory(objId)) {
		case 22://Logs
			return Woodcutting.getLevelToChop(objId);
		case 64://Shortbow
			return config.objParam(objId, 23);
		case 3751://Shieldbow (u)
		case 3752://Shortbow (u)
			return Math.floor(config.objParam(objId, 2645) / 2);
		default:
			return 1;
		}
	}

	function analyseItem (player, objId) {
		objId = config.objUncert(objId);
		var categoryData = lookupCategory(config.objCategory(objId));
		if (categoryData === undefined) {
			chat.sendMessage(player, "<col=ff0000>That item cannot be disassembled.");
			return;
		}
		chat.sendMessage(player, "Item: "+config.objName(objId));
		chat.sendMessage(player, "Junk chance: "+calculateJunkChance(objId));
		chat.sendMessage(player, "Experience: "+calculateExperience(objId));
		chat.sendMessage(player, "Chance for materials: "+categoryData.materialCount);
		chat.sendMessage(player, "This may be disassembled into: ");
		var ordinal;
		for (ordinal in categoryData.often) {
			chat.sendMessage(player, "* "+materials.getName(categoryData.often[ordinal])+" (often)");
		}
		for (ordinal in categoryData.sometimes) {
			chat.sendMessage(player, "* "+materials.getName(categoryData.often[ordinal])+" (sometimes)");
		}
		for (ordinal in categoryData.rarely) {
			chat.sendMessage(player, "* "+materials.getName(categoryData.often[ordinal])+" (rarely)");
		}
	}
	//1713?
	function calculateExperience (objId) {
		var categoryData = lookupCategory(config.objCategory(objId));
		var level = getItemLevel(objId);
		return Math.max((categoryData.boosted ? 0.3 : 0.03)*level, 0.1);
	}

	function calculateJunkChance (itemId) {
		var level = getItemLevel(itemId);
		if (level < 75) {
			return 100 - level * 1.1;
		} else if (level >= 75 && level < 90) {
			return JUNK_PAST_75[level];
		} else if (level >= 90) {
			return 0.0;
		}
	}

	function addMaterials (player, objId) {
		var categoryData = lookupCategory(config.objCategory(objId));
		if (categoryData === undefined) {
			chat.sendDebugMessage(player, "No materials found for category "+config.objCategory(objId));
			return;
		}
		var results = {};

		var junkChance = calculateJunkChance(objId);
		for (var i=0;i<categoryData.materialCount;i++) {
			var material = pickMaterial(categoryData.often, categoryData.sometimes, categoryData.rarely, junkChance);
			if (typeof(results[material]) !== "number") {
				results[material] = 0;
			}
			results[material]++;
		}
		var message = "Materials gained: ";
		var materialValues = [];
		for (var ordinal in results) {
			var count = results[ordinal];
			var materialId = parseInt(ordinal);
			var type = materials.getCategory(materialId);
			if (count > 0) {
				if (type === 3) {//Uncommon
					materialValues.push("<col=ff6600>"+count+" x "+materials.getName(materialId)+"</col>");
				} else if (type === 4) {//Rare
					materialValues.push("<col=ff0000>"+count+" x "+materials.getName(materialId)+"</col>");
				} else {
					materialValues.push(count+" x "+materials.getName(materialId));
				}
				materials.give(player, materialId, count);
			}
		}
		chat.sendSpamMessage(player, message+materialValues.join(", "));
	}

	function pickMaterial (often, sometimes, rarely, junkChance) {
		if ((Math.random() * 100) < junkChance) {
			return materials.values.JUNK;
		}
		return often[(Math.floor(Math.random() * often.length))];
	}
})();
