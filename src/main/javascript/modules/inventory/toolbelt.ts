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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import { Player } from 'engine/models';

import { defaultHandler } from 'shared/util';
import { hasTool, takeItem } from 'shared/inv';
import { sendMessage } from 'shared/chat';
import { varbit, setVarBit } from 'engine/var';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 24/03/2016
 */
_events.bindEventListener(EventType.IF_BUTTON, 1178, (ctx) => {
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
 		defaultHandler(ctx, "toolbelt");
 		return;
 	}
 });

_events.bindEventListener(EventType.OPHELD4, [ 1265, 1267, 1269, 1273, 1271, 1275, 15259, 32646,
 	  1351, 1349, 1353, 1355, 1357, 1359, 6739, 32645,
 	  975, 6313, 6315, 6317 ], (ctx) => {
 	addMultiLevelTool(ctx.player, ctx.objId);
 });

_events.bindEventListener(EventType.OPHELD4, [ 946, 1735, 1595, 1755, 1599, 1597, 1733, 1592,
 		5523, 13431, 307, 309, 311, 301, 303, 2347, 590, 8794, 4,
 		9434, 11065, 1785, 2976, 1594, 5343, 5325, 5341, 5329,
 		233, 952, 305, 11323, 2575, 2576, 13153, 10150, 2574, 7409, 18682,
 		4162, 34960, 34961, 34962, 10952, 32644, 34963, 34964,
 		31188, 27996, 27996, 19675, 21451 ], (ctx) => {
 	addSingleLevelTool(ctx.player, ctx.objId);
 });

_events.bindEventListener(EventType.OPHELD1, 36389, (ctx) => {
 	addSingleLevelTool(ctx.player, 36389);
 });

_events.bindEventListener(EventType.OPHELD1, 20565, (ctx) => {
 	addSingleLevelTool(ctx.player, 20565);
 });

_events.bindEventListener(EventType.OPHELD1, 30225, (ctx) => {
 	addSingleLevelTool(ctx.player, 30225);
 });

_events.bindEventListener(EventType.OPHELD3, 18337, (ctx) => {
 	addSingleLevelTool(ctx.player, 18337);
 });


 function addSingleLevelTool(player: Player, toolId: number) {
 	if (hasTool(player, toolId)) {
 		sendMessage(player, "That is already on your tool belt.");
 		return;
 	}

 	var success = addTool(player, toolId);
 	if (success) {
 		takeItem(player, toolId, 1);
 		sendMessage(player, "You add the " + _config.objName(toolId) + " to your tool belt.");
 	}
 }

 function addMultiLevelTool(player: Player, toolId: number) {
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
 		sendMessage(player, "That is already on your tool belt.");
 	} else if (level < currentLevel) {
 		sendMessage(player, "Your tool belt already contains a higher tier of this tool.");
 	} else {
 		switch (type) {
 		case 1://Pickaxe
 			addTool(player, 1265);
 			setVarBit(player, 18521, level);
 			break;
 		case 4://Hatchet
 			addTool(player, 1351);
 			setVarBit(player, 18522, level);
 			break;
 		case 9://Machete
 			addTool(player, 975);
 			setVarBit(player, 4935, level);
 			break;
 		}
 		takeItem(player, toolId, 1);
 		sendMessage(player, "You add the " + _config.objName(toolId) + " to your tool belt.");
 	}
 }

 function addTool (player: Player, toolId: number) {
 	if (hasTool(player, toolId)) {
 		return false;
 	}

 	switch (toolId) {
 	/* Dungeoneering Tools */
 	case 16295://Novite pickaxe
 		setVarBit(player, 3008, 1);
 		return true;
 	case 16297://Bathus pickaxe
 		setVarBit(player, 3008, 2);
 		return true;
 	case 16299://Marmaros pickaxe
 		setVarBit(player, 3008, 3);
 		return true;
 	case 16301://Kratonite pickaxe
 		setVarBit(player, 3008, 4);
 		return true;
 	case 16303://Fractite pickaxe
 		setVarBit(player, 3008, 5);
 		return true;
 	case 16305://Zephyrium pickaxe
 		setVarBit(player, 3008, 6);
 		return true;
 	case 16307://Argonite pickaxe
 		setVarBit(player, 3008, 7);
 		return true;
 	case 16309://Katagon pickaxe
 		setVarBit(player, 3008, 8);
 		return true;
 	case 16311://Gorgonite pickaxe
 		setVarBit(player, 3008, 9);
 		return true;
 	case 16313://Promethium pickaxe
 		setVarBit(player, 3008, 10);
 		return true;
 	case 16315://Primal pickaxe
 		setVarBit(player, 3008, 11);
 		return true;
 	case 16361://Novite hatchet
 		setVarBit(player, 3009, 1);
 		return true;
 	case 16363://Bathus hatchet
 		setVarBit(player, 3009, 2);
 		return true;
 	case 16365://Marmaros hatchet
 		setVarBit(player, 3009, 3);
 		return true;
 	case 16367://Kratonite hatchet
 		setVarBit(player, 3009, 4);
 		return true;
 	case 16369://Fractite hatchet
 		setVarBit(player, 3009, 5);
 		return true;
 	case 16371://Zephyrium hatchet
 		setVarBit(player, 3009, 6);
 		return true;
 	case 16373://Argonite hatchet
 		setVarBit(player, 3009, 7);
 		return true;
 	case 16375://Katagon hatchet
 		setVarBit(player, 3009, 8);
 		return true;
 	case 16377://Gorgonite hatchet
 		setVarBit(player, 3009, 9);
 		return true;
 	case 16379://Promethium hatchet
 		setVarBit(player, 3009, 10);
 		return true;
 	case 16381://Primal hatchet
 		setVarBit(player, 3009, 10);
 		return true;
 	case 17883://Hammer
 		setVarBit(player, 3010, 1);
 		return true;
 	case 17678://Tinderbox
 		setVarBit(player, 3011, 1);
 		return true;
 	case 17794://Fly fishing rod
 		setVarBit(player, 3012, 1);
 		return true;
 	case 17754://Knife
 		setVarBit(player, 3013, 1);
 		return true;
 	case 17446://Needle
 		setVarBit(player, 3014, 1);
 		return true;
 	case 17444://Chisel
 		setVarBit(player, 3015, 1);
 		return true;

 	/* Regular Tools */
 	case 946://Knife
 		setVarBit(player, 2968, 1);
 		return true;
 	case 1735://Shears
 		setVarBit(player, 2969, 1);
 		return true;
 	case 1595://Amulet mould
 		setVarBit(player, 2970, 1);
 		return true;
 	case 1755://Chisel
 		setVarBit(player, 2971, 1);
 		return true;
 	case 1599://Holy mould
 		setVarBit(player, 2972, 1);
 		return true;
 	case 1597://Necklace mould
 		setVarBit(player, 2973, 1);
 		return true;
 	case 1733://Needle
 		setVarBit(player, 2974, 1);
 		return true;
 	case 1592://Ring mould
 		setVarBit(player, 2975, 1);
 		return true;
 	case 5523://Tiara mould
 		setVarBit(player, 2976, 1);
 		return true;
 	case 13431://Crayfish cage
 		setVarBit(player, 2977, 1);
 		return true;
 	case 307://Fishing rod
 		setVarBit(player, 2978, 1);
 		return true;
 	case 309://Fly fishing rod
 		setVarBit(player, 2979, 1);
 		return true;
 	case 311://Harpoon
 		setVarBit(player, 2980, 1);
 		return true;
 	case 301://Lobster pot
 		setVarBit(player, 2981, 1);
 		return true;
 	case 303://Small fishing net
 		setVarBit(player, 2982, 1);
 		return true;
 	case 1265://Bronze pickaxe (18521=other pickaxes)
 		setVarBit(player, 2983, 1);
 		return true;
 	case 2347://Hammer
 		setVarBit(player, 2984, 1);
 		return true;
 	case 1351://Bronze hatchet (18522=other hatchets)
 		setVarBit(player, 2985, 1);
 		return true;
 	case 590://Tinderbox
 		setVarBit(player, 2986, 1);
 		return true;
 	case 8794://Saw
 		setVarBit(player, 2988, 1);
 		return true;
 	case 4://Ammo mould
 		setVarBit(player, 2989, 1);
 		return true;
 	case 9434://Bolt mould
 		setVarBit(player, 2990, 1);
 		return true;
 	case 11065://Bracelet mould
 		setVarBit(player, 2991, 1);
 		return true;
 	case 1785://Glassblowing pipe
 		setVarBit(player, 2992, 1);
 		return true;
 	case 2976://Sickle mould
 		setVarBit(player, 2993, 1);
 		return true;
 	case 1594://Unholy mould
 		setVarBit(player, 2994, 1);
 		return true;
 	case 5343://Seed dibber
 		setVarBit(player, 2995, 1);
 		return true;
 	case 5325://Gardening trowel
 		setVarBit(player, 2996, 1);
 		return true;
 	case 5341://Rake
 		setVarBit(player, 2997, 1);
 		return true;
 	case 5329://Secateurs
 		setVarBit(player, 2998, 1);
 		return true;
 	case 233://Pestle and mortar
 		setVarBit(player, 2999, 1);
 		return true;
 	case 952://Spade
 		setVarBit(player, 3000, 1);
 		return true;
 	case 305://Big fishing net
 		setVarBit(player, 3001, 1);
 		return true;
 	case 975://Machete (4935=others)
 		setVarBit(player, 3002, 1);
 		return true;
 	case 11323://Barbarian rod
 		setVarBit(player, 3003, 1);
 		return true;
 	case 2575://Watch
 		setVarBit(player, 3004, 1);
 		return true;
 	case 2576://Chart
 		setVarBit(player, 3005, 1);
 		return true;
 	case 13153://Chain link mould
 		setVarBit(player, 3006, 1);
 		return true;
 	case 10150://Noose wand
 		setVarBit(player, 3007, 1);
 		return true;
 	case 2574://Sextant
 		setVarBit(player, 685, 1);
 		return true;
 	case 7409://Magic secateurs
 		setVarBit(player, 27430, 1);
 		return true;
 	case 18682://Magic watering can
 		setVarBit(player, 27431, 1);
 		return true;
 	case 20565://Tongs
 		setVarBit(player, 28410, 1);
 		return true;
 	case 4162://Rock hammer
 		setVarBit(player, 28219, 1);
 		return true;
 	case 34960://Salt shaker
 		setVarBit(player, 28220, 1);
 		return true;
 	case 34961://Ice shaker
 		setVarBit(player, 28221, 1);
 		return true;
 	case 34962://Fungicide shaker
 		setVarBit(player, 28222, 1);
 		return true;
 	case 10952://Slayer bell
 		setVarBit(player, 28223, 1);
 		return true;
 	case 32644://Crystal chime
 		setVarBit(player, 28224, 1);
 		return true;
 	case 34963://Explosive shaker
 		setVarBit(player, 28225, 1);
 		return true;
 	case 34964://Super explosive shaker
 		setVarBit(player, 28225, 2);
 		return true;
 	case 18337://Bonecrusher
 		setVarBit(player, 28226, 1);
 		return true;
 	case 31188://Seedicide
 		setVarBit(player, 28227, 1);
 		return true;
 	case 27996://Charming imp
 		setVarBit(player, 28228, 1);
 		return true;
 	case 19675://Herbicide
 		setVarBit(player, 28229, 1);
 		return true;
 	case 21451://Ouroboros pouch
 		setVarBit(player, 28230, 1);
 		return true;
 	case 36389://Charge Pack
 		setVarBit(player, 30225, 1);
 		return true;
 	default:
 		return false;
 	}
 }
