import { Player } from "engine/models";

import { setResumeHandler } from "shared/dialog";
import { startCrafting } from "shared/makex";
import { closeAllWidgets } from "shared/widget";
import { varp, varbit, setVarp } from "engine/var";

export function setSelectionHandler (player: Player) {
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var category = varp(player, 1169) as number;
		var productId = varp(player, 1170) as number;
		var amount = varbit(player, 1003);
		if (amount) {
			processFletching(player, category, productId, amount);
		}
	});
}

function processFletching (player: Player, category: number, productId: number, amount: number) {
	switch (category) {
		case 6947://Logs
		case 6948://Achey logs
		case 6949://Oak logs
		case 6950://Willow logs
		case 6951://Teak logs
		case 6952://Maple logs
		case 6953://Mahogany logs
		case 6954://Yew logs
		case 6955://Magic logs
		case 6956://Blisterwood logs
		case 7994://Elder logs
			fletchLogs(player, productId, amount);
			return;
		case 6958://String bows
			stringBows(player, productId, amount);
			return;
		case 6966://Feather arrows
			featherArrows(player, productId, amount);
			return;
		default:
			throw "Unknown fletching category "+category;
	}
}

function fletchLogs (player: Player, productId: number, amount: number) {
	const animationId = productId === 6955 ? 24939 : 24943;
	setVarp(player, 1175, productId);
	startCrafting(player, amount, animationId);
}

function stringBows (player: Player, bowId: number, amount: number) {
 	setVarp(player, 1175, bowId);
 	var text, animationId;
 	switch (bowId) {
 	case 839:
 		text = "You attach the string to the Shieldbow.";
 		animationId = 6684;
 		break;
 	case 841:
 		text = "You attach the string to the Shortbow.";
 		animationId = 6678;
 		break;
 	case 845:
 		text = "You attach the string to the Oak shieldbow.";
 		animationId = 6685;
 		break;
 	case 843:
 		text = "You attach the string to the Oak shortbow.";
 		animationId = 6679;
 		break;
 	case 847:
 		text = "You attach the string to the Willow shieldbow.";
 		animationId = 6686;
 		break;
 	case 849:
 		text = "You attach the string to the Willow shortbow.";
 		animationId = 6680;
 		break;
 	case 851:
 		text = "You attach the string to the Maple shieldbow.";
 		animationId = 6687;
 		break;
 	case 853:
 		text = "You attach the string to the Maple shortbow.";
 		animationId = 6681;
 		break;
 	case 855:
 		text = "You attach the string to the Yew shieldbow.";
 		animationId = 6688;
 		break;
 	case 857:
 		text = "You attach the string to the Yew shortbow.";
 		animationId = 6682;
 		break;
 	case 859:
 		text = "You attach the string to the Magic shieldbow.";
 		animationId = 6689;
 		break;
 	case 861:
 		text = "You attach the string to the Magic shortbow.";
 		animationId = 6683;
 		break;
 	case 29611:
 		text = "You attach the string to the Elder shieldbow.";
 		animationId = 21674;
 		break;
 	case 29614:
 		text = "You attach the string to the Elder shortbow.";
 		animationId = 21673;
 		break;
 	default:
 		throw "Unsupported bow: "+bowId;
 	}
 	startCrafting(player, amount, animationId, text);
 }

 function featherArrows (player: Player, headlessArrowId: number, amount: number) {
	 setVarp(player, 1175, headlessArrowId);
	 //var text, animationId;
	 var text = "You attach feathers to 15 arrow shafts.";
	 startCrafting(player, amount, -1, text);
 }
