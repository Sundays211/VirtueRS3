import { Player } from "engine/models";
import _config from "engine/config";
import { varp, varbit, setVarp } from "engine/var";

import { selectProduct, startCrafting } from "shared/makex";
import { setResumeHandler } from "shared/dialog";
import { closeAllWidgets } from "shared/widget";

export function startGrinding (player: Player, category: number, productId: number) {
	selectProduct(player, 6832, 6833, category, productId);
	setHerbloreHandler(player);
}

export function startPotionMaking (player: Player, category: number, productId: number) {
	selectProduct(player, 6838, 6839, category, productId);
	setHerbloreHandler(player);
}

function setHerbloreHandler (player: Player) {
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var selectedCategory = varp(player, 1169) as number;
		var selectedProduct = varp(player, 1170) as number;
		var amount = varbit(player, 1003);
		if (amount) {
			processHerblore(player, selectedCategory, selectedProduct, amount);
		}
	});
}

function processHerblore (player: Player, category: number, productId: number, amount: number) {
	switch (category) {
		case 6834://Herblore Ingredients
		case 6835://Cooking Ingredients
		case 6837://Salamander tar
		case 6836://Other
			grindItems(player, productId, amount);
			return;
		case 6841://Clean Herbs
			cleanHerbs(player, productId, amount);
			return;
		case 6842://Unfinished Potions
			mixUnfinished(player, productId, amount);
			return;
		default:
			throw "Unknown herblore category "+category;
	}
}

function grindItems (player: Player, groundItemId: number, amount: number) {
	setVarp(player, 1175, groundItemId);
	var text = "You make an item";
	startCrafting(player, amount, 22756, text);
}

function cleanHerbs (player: Player, cleanHerbId: number, amount: number) {
	setVarp(player, 1175, cleanHerbId);
	const text = "You clean the dirt from the "+_config.objName(_config.objParam(cleanHerbId, 2655) as number);
	startCrafting(player, amount, 22756, text);
}

function mixUnfinished (player: Player, unfinishedId: number, amount: number) {
	setVarp(player, 1175, unfinishedId);
	var text = "You mix the "+_config.objName(unfinishedId);
	startCrafting(player, amount, 24896, text);
}
