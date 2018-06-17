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
var varbit = require('engine/var/bit');

var util = require('shared/util');
var config = require('engine/config');
var chat = require('shared/chat');
var common = require('shared/inv/common');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 24/03/2016
 */

module.exports = (function () {
	return {
		init : init,
		hasTool : hasTool
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.IF_BUTTON, 1178, function (ctx) {
			switch (ctx.component) {
			case 17://See next item
			case 18://See previous item
			case 19://General tab
			case 20://Fishing tab
			case 21://Crafting tab
			case 22://Farming tab
			case 23://Slayer tab
			case 24://Invention tab
			case 42://Second visible item
			case 45://Third visible item
			case 51://Fifth visible item
			case 54://Sixth visible item
			case 77://Close
				return;
			//case 123://Settings
			default:
				util.defaultHandler(ctx, "toolbelt");
				return;
			}
		});

		scriptManager.bind(EventType.OPHELD4, [ 1265, 1267, 1269, 1273, 1271, 1275, 15259, 32646,
	          1351, 1349, 1353, 1355, 1357, 1359, 6739, 32645,
	          975, 6313, 6315, 6317 ], function (ctx) {
			addMultiLevelTool(ctx.player, util.getId(ctx.item));
		});

		scriptManager.bind(EventType.OPHELD4, [ 946, 1735, 1595, 1755, 1599, 1597, 1733, 1592,
				5523, 13431, 307, 309, 311, 301, 303, 2347, 590, 8794, 4,
				9434, 11065, 1785, 2976, 1594, 5343, 5325, 5341, 5329,
				233, 952, 305, 11323, 2575, 2576, 13153, 10150, 2574, 7409, 18682,
				4162, 34960, 34961, 34962, 10952, 32644, 34963, 34964,
				31188, 27996, 27996, 19675, 21451 ], function (ctx) {
			addSingleLevelTool(ctx.player, util.getId(ctx.item));
		});

		scriptManager.bind(EventType.OPHELD1, 36389, function (ctx) {
			addSingleLevelTool(ctx.player, 36389);
		});

		scriptManager.bind(EventType.OPHELD1, 20565, function (ctx) {
			addSingleLevelTool(ctx.player, 20565);
		});

		scriptManager.bind(EventType.OPHELD1, 30225, function (ctx) {
			addSingleLevelTool(ctx.player, 30225);
		});

		scriptManager.bind(EventType.OPHELD3, 18337, function (ctx) {
			addSingleLevelTool(ctx.player, 18337);
		});
	}

	function addSingleLevelTool(player, toolId) {
		if (hasTool(player, toolId)) {
			chat.sendMessage(player, "That is already on your tool belt.");
			return;
		}

		var success = addTool(player, toolId);
		if (success) {
			common.take(player, toolId, 1);
			chat.sendMessage(player, "You add the " + config.objName(toolId) + " to your tool belt.");
		}
	}

	function addMultiLevelTool(player, toolId) {
		var level = -1;
		var type = -1;
		//See client script 5540
		switch (toolId) {
		case 1265://Bronze pickaxe
			level = 0;
			type = 1;
			break;
		case 1267://Iron pickaxe
			level = 1;
			type = 1;
			break;
		case 1269://Steel pickaxe
			level = 2;
			type = 1;
			break;
		case 1273://Mithril pickaxe
			level = 3;
			type = 1;
			break;
		case 1271://Adamant pickaxe
			level = 4;
			type = 1;
			break;
		case 1275://Rune pickaxe
			level = 5;
			type = 1;
			break;
		case 15259://Dragon pickaxe
			level = 6;
			type = 1;
			break;
		case 32646://Crystal pickaxe
			level = 7;
			type = 1;
			break;
		case 1351://Bronze hatchet
			level = 0;
			type = 4;
			break;
		case 1349://Iron hatchet
			level = 1;
			type = 4;
			break;
		case 1353://Steel hatchet
			level = 2;
			type = 4;
			break;
		case 1355://Mithril hatchet
			level = 3;
			type = 4;
			break;
		case 1357://Adamant hatchet
			level = 4;
			type = 4;
			break;
		case 1359://Rune hatchet
			level = 5;
			type = 4;
			break;
		case 6739://Dragon hatchet
			level = 6;
			type = 4;
			break;
		case 32645://Crystal hatchet
			level = 7;
			type = 4;
			break;
		case 975://Machete
			level = 0;
			type = 9;
			break;
		case 6313://Opal machete
			level = 1;
			type = 9;
			break;
		case 6315://Jade machete
			level = 2;
			type = 9;
			break;
		case 6317://Red topaz machete
			level = 3;
			type = 9;
			break;
		}
		var currentLevel;
		switch (type) {
		case 1://Pickaxe
			currentLevel = varbit(player, 18521);
			break;
		case 4://Hatchet
			currentLevel = varbit(player, 18522);
			break;
		case 9://Machete
			currentLevel = varbit(player, 4935);
			break;
		default:
			return;
		}
		if (level === currentLevel) {
			chat.sendMessage(player, "That is already on your tool belt.");
		} else if (level < currentLevel) {
			chat.sendMessage(player, "Your tool belt already contains a higher tier of this tool.");
		} else {
			switch (type) {
			case 1://Pickaxe
				addTool(player, 1265);
				varbit(player, 18521, level);
				break;
			case 4://Hatchet
				addTool(player, 1351);
				varbit(player, 18522, level);
				break;
			case 9://Machete
				addTool(player, 975);
				varbit(player, 4935, level);
				break;
			}
			common.take(player, toolId, 1);
			chat.sendMessage(player, "You add the " + config.objName(toolId) + " to your tool belt.");
		}
	}

	function addTool (player, toolId) {
		if (hasTool(player, toolId)) {
			return false;
		}

		switch (toolId) {
		/* Dungeoneering Tools */
		case 16295://Novite pickaxe
			varbit(player, 3008, 1);
			return true;
		case 16297://Bathus pickaxe
			varbit(player, 3008, 2);
			return true;
		case 16299://Marmaros pickaxe
			varbit(player, 3008, 3);
			return true;
		case 16301://Kratonite pickaxe
			varbit(player, 3008, 4);
			return true;
		case 16303://Fractite pickaxe
			varbit(player, 3008, 5);
			return true;
		case 16305://Zephyrium pickaxe
			varbit(player, 3008, 6);
			return true;
		case 16307://Argonite pickaxe
			varbit(player, 3008, 7);
			return true;
		case 16309://Katagon pickaxe
			varbit(player, 3008, 8);
			return true;
		case 16311://Gorgonite pickaxe
			varbit(player, 3008, 9);
			return true;
		case 16313://Promethium pickaxe
			varbit(player, 3008, 10);
			return true;
		case 16315://Primal pickaxe
			varbit(player, 3008, 11);
			return true;
		case 16361://Novite hatchet
			varbit(player, 3009, 1);
			return true;
		case 16363://Bathus hatchet
			varbit(player, 3009, 2);
			return true;
		case 16365://Marmaros hatchet
			varbit(player, 3009, 3);
			return true;
		case 16367://Kratonite hatchet
			varbit(player, 3009, 4);
			return true;
		case 16369://Fractite hatchet
			varbit(player, 3009, 5);
			return true;
		case 16371://Zephyrium hatchet
			varbit(player, 3009, 6);
			return true;
		case 16373://Argonite hatchet
			varbit(player, 3009, 7);
			return true;
		case 16375://Katagon hatchet
			varbit(player, 3009, 8);
			return true;
		case 16377://Gorgonite hatchet
			varbit(player, 3009, 9);
			return true;
		case 16379://Promethium hatchet
			varbit(player, 3009, 10);
			return true;
		case 16381://Primal hatchet
			varbit(player, 3009, 10);
			return true;
		case 17883://Hammer
			varbit(player, 3010, 1);
			return true;
		case 17678://Tinderbox
			varbit(player, 3011, 1);
			return true;
		case 17794://Fly fishing rod
			varbit(player, 3012, 1);
			return true;
		case 17754://Knife
			varbit(player, 3013, 1);
			return true;
		case 17446://Needle
			varbit(player, 3014, 1);
			return true;
		case 17444://Chisel
			varbit(player, 3015, 1);
			return true;

		/* Regular Tools */
		case 946://Knife
			varbit(player, 2968, 1);
			return true;
		case 1735://Shears
			varbit(player, 2969, 1);
			return true;
		case 1595://Amulet mould
			varbit(player, 2970, 1);
			return true;
		case 1755://Chisel
			varbit(player, 2971, 1);
			return true;
		case 1599://Holy mould
			varbit(player, 2972, 1);
			return true;
		case 1597://Necklace mould
			varbit(player, 2973, 1);
			return true;
		case 1733://Needle
			varbit(player, 2974, 1);
			return true;
		case 1592://Ring mould
			varbit(player, 2975, 1);
			return true;
		case 5523://Tiara mould
			varbit(player, 2976, 1);
			return true;
		case 13431://Crayfish cage
			varbit(player, 2977, 1);
			return true;
		case 307://Fishing rod
			varbit(player, 2978, 1);
			return true;
		case 309://Fly fishing rod
			varbit(player, 2979, 1);
			return true;
		case 311://Harpoon
			varbit(player, 2980, 1);
			return true;
		case 301://Lobster pot
			varbit(player, 2981, 1);
			return true;
		case 303://Small fishing net
			varbit(player, 2982, 1);
			return true;
		case 1265://Bronze pickaxe (18521=other pickaxes)
			varbit(player, 2983, 1);
			return true;
		case 2347://Hammer
			varbit(player, 2984, 1);
			return true;
		case 1351://Bronze hatchet (18522=other hatchets)
			varbit(player, 2985, 1);
			return true;
		case 590://Tinderbox
			varbit(player, 2986, 1);
			return true;
		case 8794://Saw
			varbit(player, 2988, 1);
			return true;
		case 4://Ammo mould
			varbit(player, 2989, 1);
			return true;
		case 9434://Bolt mould
			varbit(player, 2990, 1);
			return true;
		case 11065://Bracelet mould
			varbit(player, 2991, 1);
			return true;
		case 1785://Glassblowing pipe
			varbit(player, 2992, 1);
			return true;
		case 2976://Sickle mould
			varbit(player, 2993, 1);
			return true;
		case 1594://Unholy mould
			varbit(player, 2994, 1);
			return true;
		case 5343://Seed dibber
			varbit(player, 2995, 1);
			return true;
		case 5325://Gardening trowel
			varbit(player, 2996, 1);
			return true;
		case 5341://Rake
			varbit(player, 2997, 1);
			return true;
		case 5329://Secateurs
			varbit(player, 2998, 1);
			return true;
		case 233://Pestle and mortar
			varbit(player, 2999, 1);
			return true;
		case 952://Spade
			varbit(player, 3000, 1);
			return true;
		case 305://Big fishing net
			varbit(player, 3001, 1);
			return true;
		case 975://Machete (4935=others)
			varbit(player, 3002, 1);
			return true;
		case 11323://Barbarian rod
			varbit(player, 3003, 1);
			return true;
		case 2575://Watch
			varbit(player, 3004, 1);
			return true;
		case 2576://Chart
			varbit(player, 3005, 1);
			return true;
		case 13153://Chain link mould
			varbit(player, 3006, 1);
			return true;
		case 10150://Noose wand
			varbit(player, 3007, 1);
			return true;
		case 2574://Sextant
			varbit(player, 685, 1);
			return true;
		case 7409://Magic secateurs
			varbit(player, 27430, 1);
			return true;
		case 18682://Magic watering can
			varbit(player, 27431, 1);
			return true;
		case 20565://Tongs
			varbit(player, 28410, 1);
			return true;
		case 4162://Rock hammer
			varbit(player, 28219, 1);
			return true;
		case 34960://Salt shaker
			varbit(player, 28220, 1);
			return true;
		case 34961://Ice shaker
			varbit(player, 28221, 1);
			return true;
		case 34962://Fungicide shaker
			varbit(player, 28222, 1);
			return true;
		case 10952://Slayer bell
			varbit(player, 28223, 1);
			return true;
		case 32644://Crystal chime
			varbit(player, 28224, 1);
			return true;
		case 34963://Explosive shaker
			varbit(player, 28225, 1);
			return true;
		case 34964://Super explosive shaker
			varbit(player, 28225, 2);
			return true;
		case 18337://Bonecrusher
			varbit(player, 28226, 1);
			return true;
		case 31188://Seedicide
			varbit(player, 28227, 1);
			return true;
		case 27996://Charming imp
			varbit(player, 28228, 1);
			return true;
		case 19675://Herbicide
			varbit(player, 28229, 1);
			return true;
		case 21451://Ouroboros pouch
			varbit(player, 28230, 1);
			return true;
		case 36389://Charge Pack
			varbit(player, 30225, 1);
			return true;
		default:
			return false;
		}
	}

	function hasTool (player, toolId) {
		switch (toolId) {
		/* Dungeoneering Tools */
		case 16295://Novite pickaxe
			return varbit(player, 3008) > 0;
		case 16297://Bathus pickaxe
			return varbit(player, 3008) > 1;
		case 16299://Marmaros pickaxe
			return varbit(player, 3008) > 2;
		case 16301://Kratonite pickaxe
			return varbit(player, 3008) > 3;
		case 16303://Fractite pickaxe
			return varbit(player, 3008) > 4;
		case 16305://Zephyrium pickaxe
			return varbit(player, 3008) > 5;
		case 16307://Argonite pickaxe
			return varbit(player, 3008) > 6;
		case 16309://Katagon pickaxe
			return varbit(player, 3008) > 7;
		case 16311://Gorgonite pickaxe
			return varbit(player, 3008) > 8;
		case 16313://Promethium pickaxe
			return varbit(player, 3008) > 9;
		case 16315://Primal pickaxe
			return varbit(player, 3008) > 10;
		case 16361://Novite hatchet
			return varbit(player, 3009) > 0;
		case 16363://Bathus hatchet
			return varbit(player, 3009) > 1;
		case 16365://Marmaros hatchet
			return varbit(player, 3009) > 2;
		case 16367://Kratonite hatchet
			return varbit(player, 3009) > 3;
		case 16369://Fractite hatchet
			return varbit(player, 3009) > 4;
		case 16371://Zephyrium hatchet
			return varbit(player, 3009) > 5;
		case 16373://Argonite hatchet
			return varbit(player, 3009) > 6;
		case 16375://Katagon hatchet
			return varbit(player, 3009) > 7;
		case 16377://Gorgonite hatchet
			return varbit(player, 3009) > 8;
		case 16379://Promethium hatchet
			return varbit(player, 3009) > 9;
		case 16381://Primal hatchet
			return varbit(player, 3009) > 10;
		case 17883://Hammer
			return varbit(player, 3010) == 1;
		case 17678://Tinderbox
			return varbit(player, 3011) == 1;
		case 17794://Fly fishing rod
			return varbit(player, 3012) == 1;
		case 17754://Knife
			return varbit(player, 3013) == 1;
		case 17446://Needle
			return varbit(player, 3014) == 1;
		case 17444://Chisel
			return varbit(player, 3015) == 1;

		/* Regular Tools */
		case 946://Knife
			return varbit(player, 2968) == 1;
		case 1735://Shears
			return varbit(player, 2969) == 1;
		case 1595://Amulet mould
			return varbit(player, 2970) == 1;
		case 1755://Chisel
			return varbit(player, 2971) == 1;
		case 1599://Holy mould
			return varbit(player, 2972) == 1;
		case 1597://Necklace mould
			return varbit(player, 2973) == 1;
		case 1733://Needle
			return varbit(player, 2974) == 1;
		case 1592://Ring mould
			return varbit(player, 2975) == 1;
		case 5523://Tiara mould
			return varbit(player, 2976) == 1;
		case 13431://Crayfish cage
			return varbit(player, 2977) == 1;
		case 307://Fishing rod
			return varbit(player, 2978) == 1;
		case 309://Fly fishing rod
			return varbit(player, 2979) == 1;
		case 311://Harpoon
			return varbit(player, 2980) == 1;
		case 301://Lobster pot
			return varbit(player, 2981) == 1;
		case 303://Small fishing net
			return varbit(player, 2982) == 1;
		case 1265://Bronze pickaxe
			return varbit(player, 2983) == 1;
		case 1267://Iron pickaxe
			return (varbit(player, 2983) + varbit(player, 18521)) > 1;
		case 1269://Steel pickaxe
			return (varbit(player, 2983) + varbit(player, 18521)) > 2;
		case 1273://Mithril pickaxe
			return (varbit(player, 2983) + varbit(player, 18521)) > 3;
		case 1271://Adamant pickaxe
			return (varbit(player, 2983) + varbit(player, 18521)) > 4;
		case 1275://Rune pickaxe
			return (varbit(player, 2983) + varbit(player, 18521)) > 5;
		case 15259://Dragon pickaxe
			return (varbit(player, 2983) + varbit(player, 18521)) > 6;
		case 32646://Crystal pickaxe
			return (varbit(player, 2983) + varbit(player, 18521)) > 7;
		case 2347://Hammer
			return varbit(player, 2984) == 1;
		case 1351://Bronze hatchet
			return varbit(player, 2985) == 1;
		case 1349://Iron hatchet
			return (varbit(player, 2985) + varbit(player, 18522)) > 1;
		case 1353://Steel hatchet
			return (varbit(player, 2985) + varbit(player, 18522)) > 2;
		case 1355://Mithril hatchet
			return (varbit(player, 2985) + varbit(player, 18522)) > 3;
		case 1357://Adamant hatchet
			return (varbit(player, 2985) + varbit(player, 18522)) > 4;
		case 1359://Rune hatchet
			return (varbit(player, 2985) + varbit(player, 18522)) > 5;
		case 6739://Dragon hatchet
			return (varbit(player, 2985) + varbit(player, 18522)) > 6;
		case 32645://Crystal hatchet
			return (varbit(player, 2985) + varbit(player, 18522)) > 7;
		case 590://Tinderbox
			return varbit(player, 2986) == 1;
		case 8794://Saw
			return varbit(player, 2988) == 1;
		case 4://Ammo mould
			return varbit(player, 2989) == 1;
		case 9434://Bolt mould
			return varbit(player, 2990) == 1;
		case 11065://Bracelet mould
			return varbit(player, 2991) == 1;
		case 1785://Glassblowing pipe
			return varbit(player, 2992) == 1;
		case 2976://Sickle mould
			return varbit(player, 2993) == 1;
		case 1594://Unholy mould
			return varbit(player, 2994) == 1;
		case 5343://Seed dibber
			return varbit(player, 2995) == 1;
		case 5325://Gardening trowel
			return varbit(player, 2996) == 1;
		case 5341://Rake
			return varbit(player, 2997) == 1;
		case 5329://Secateurs
			return varbit(player, 2998) == 1;
		case 233://Pestle and mortar
			return varbit(player, 2999) == 1;
		case 952://Spade
			return varbit(player, 3000) == 1;
		case 305://Big fishing net
			return varbit(player, 3001) == 1;
		case 975://Machete
			return varbit(player, 3002) == 1;
		case 6313://Opal machete
			return (varbit(player, 3002) + varbit(player, 4935)) > 1;
		case 6315://Jade machete
			return (varbit(player, 3002) + varbit(player, 4935)) > 2;
		case 6317://Red topaz machete
			return (varbit(player, 3002) + varbit(player, 4935)) > 3;
		case 11323://Barbarian rod
			return varbit(player, 3003) == 1;
		case 2575://Watch
			return varbit(player, 3004) == 1;
		case 2576://Chart
			return varbit(player, 3005) == 1;
		case 13153://Chain link mould
			return varbit(player, 3006) == 1;
		case 10150://Noose wand
			return varbit(player, 3007) == 1;
		case 2574://Sextant
			return varbit(player, 685) == 1;
		case 7409://Magic secateurs
			return varbit(player, 27430) == 1;
		case 18682://Magic watering can
			return varbit(player, 27431) == 1;
		case 20565://Tongs
			return varbit(player, 28410) == 1;
		case 4162://Rock hammer
			return varbit(player, 28219) == 1;
		case 34960://Salt shaker
			return varbit(player, 28220) == 1;
		case 34961://Ice shaker
			return varbit(player, 28221) == 1;
		case 34962://Fungicide shaker
			return varbit(player, 28222) == 1;
		case 10952://Slayer bell
			return varbit(player, 28223) == 1;
		case 32644://Crystal chime
			return varbit(player, 28224) == 1;
		case 34963://Explosive shaker
			return varbit(player, 28225) > 0;
		case 34964://Super explosive shaker
			return varbit(player, 28225) == 2;
		case 18337://Bonecrusher
			return varbit(player, 28226) == 1;
		case 31188://Seedicide
			return varbit(player, 28227) == 1;
		case 27996://Charming imp
			return varbit(player, 28228) == 1;
		case 19675://Herbicide
			return varbit(player, 28229) == 1;
		case 21451://Ouroboros pouch
			return varbit(player, 28230) == 1;
		case 36367://Inventor's Tools
		case 36368://Bag of materials
			return varbit(player, 30224) == 1;
		case 36389://Charge Pack
			return varbit(player, 30225) == 1;
		default:
			return false;
		}
	}

})();
