import { Player } from "engine/models";
import _inv from 'engine/inv';

import { InventionMaterial, takeMaterials, getMaterialCount } from "shared/inv/materials";
import { Inv } from "engine/enums";
import { invTotalParam, hasTool, invTotal, takeItem } from "shared/inv";
import { varbit, setVarBit } from "engine/var";

export function hasResource(player: Player, resourceId: number): boolean {
	return getResourceCount(player, resourceId) > 0;
}

export function getResourceCount(
	player: Player,
	resourceId: number,
	inventionMaterialId?: InventionMaterial,
	hasBeastOfBurden?: boolean
): number {
	//See clientscript 7115
	var amount = 0;
	switch (resourceId) {
		case 17792:
		case 17793:
		case 554:
		case 555:
		case 556:
		case 557:
		case 558:
		case 559:
		case 560:
		case 561:
		case 562:
		case 563:
		case 564:
		case 565:
		case 566:
		case 9075:
		case 17780:
		case 17781:
		case 17782:
		case 17783:
		case 17784:
		case 17785:
		case 17786:
		case 17787:
		case 17788:
		case 17789:
		case 17790:
		case 17791:
			amount = getRuneCount(player, resourceId);
			break;
		case 5331://Watering can
		case 5333://Watering can (1)
		case 5334://Watering can (2)
		case 5335://Watering can (3)
		case 5336://Watering can (4)
		case 5337://Watering can (5)
		case 5338://Watering can (6)
		case 5339://Watering can (7)
		case 5340://Watering can (8)
			if (hasTool(player, 18682)) {
				amount = -1;
			} else {
				amount = (invTotal(player, 5340) * 8) + (invTotal(player, 5339) * 7) + (invTotal(player, 5338) * 6) + (invTotal(player, 5337) * 5) + (invTotal(player, 5336) * 4) + (invTotal(player, 5335) * 3) + (invTotal(player, 5334) * 2) + invTotal(player, 5333);
			}
			break;
		case 3430://Sacred oil (4)
		case 3432://Sacred oil (3)
		case 3434://Sacred oil (2)
		case 3436://Sacred oil (1)
			amount = invTotal(player, 3436) + (invTotal(player, 3434) * 2) + (invTotal(player, 3432) * 3) + (invTotal(player, 3430) * 4);
			break;
		// case 453://Coal
		//FIXME: We can't access varc from the server side...
		// 	amount = Math.max(0, varc(player, 2225));
		// 	break;
		//case 995://Coins
		//	amount = inv.total(player, 995);//inv.total counts amount in money pouch already
		//	break;
		case 25629://Iron (Artisans workshop)
			amount = Math.max(0, varbit(player, 361));
			break;
		case 25630://Coal (Artisans workshop)
			amount = Math.max(0, varbit(player, 369));
			break;
		case 25631://Mithril (Artisans workshop)
			amount = Math.max(0, varbit(player, 363));
			break;
		case 25632://Adamant (Artisans workshop)
			amount = Math.max(0, varbit(player, 366));
			break;
		case 25633://Runite (Artisans workshop)
			amount = Math.max(0, varbit(player, 367));
			break;
		case 6797://Watering can (to fill)
			amount = invTotal(player, 5339) + invTotal(player, 5338) + invTotal(player, 5337) + invTotal(player, 5336) + invTotal(player, 5335) + invTotal(player, 5334) + invTotal(player, 5333) + invTotal(player, 5331);
			break;
		case 1825://Waterskin (3)
		case 1827://Waterskin (2)
		case 1829://Waterskin (1)
		case 1831://Waterskin (0)
			amount = invTotal(player, 1831) + invTotal(player, 1829) + invTotal(player, 1827) + invTotal(player, 1825);
			break;
		case 26317://Ancient bones
			amount = Math.max(0, varbit(player, 17415));
			break;
		case 26318://Spices
			amount = Math.max(0, varbit(player, 17417));
			break;
		case 26319://Lacquer
			amount = Math.max(0, varbit(player, 17418));
			break;
		case 26320://Plate
			amount = Math.max(0, varbit(player, 17416));
			break;
		case 26321://Chi
			amount = Math.max(0, varbit(player, 17419));
			break;
		case 30566://Pearls
			amount = Math.max(0, varbit(player, 21334));
			break;
		case 30567://Koi scales
			amount = Math.max(0, varbit(player, 21335));
			break;
		// case 7984://Basilisk head
		// //FIXME: We can't access varc from the server side...
		// 	if (varc(player, 2689) > 0)  {
		// 		return 1;
		// 	}
		// 	break;
		// case 7986://Abyssal head
		// 	if (varc(player, 2690) > 0) {
		// 		return 1;
		// 	}
		// 	break;
		case 2169://Gnome spice
			//if (_map_members() == 0 && _oc_members(resourceId) == 1) {
			//	amount = 0;
			//} else if (a3 != -1 && inv.total(player, 2169) > 0) {
			//	amount = -1;
			//} else
			if (hasBeastOfBurden) {
				amount = invTotal(player, resourceId) + invTotal(player, resourceId, Inv.BEAST_OF_BURDEN);
			} else {
				amount = invTotal(player, resourceId);
			}
			break;
		case 36365://Invention material
			amount = getMaterialCount(player, inventionMaterialId);
			break;
		default:
			//if (_map_members() == 0 && _oc_members(resourceId) == 1) {
			//	amount = 0;
			//} else
			if (hasBeastOfBurden) {
				amount = invTotal(player, resourceId) + invTotal(player, resourceId, Inv.BEAST_OF_BURDEN);
			} else {
				amount = invTotal(player, resourceId);
			}
	}
	//if (a3 != -1 && v2 != -1)  {
	//	v0 = script_6589(a3, resourceId, a4);
	//}
	//return _add(amount, v0);
	return amount;
}

export function takeResources(
	player: Player,
	resourceId: number,
	amount: number,
	inventionMaterialId: InventionMaterial
) {
	switch (resourceId) {
		case 17792:
		case 17793:
		case 554:
		case 555:
		case 556:
		case 557:
		case 558:
		case 559:
		case 560:
		case 561:
		case 562:
		case 563:
		case 564:
		case 565:
		case 566:
		case 9075:
		case 17780:
		case 17781:
		case 17782:
		case 17783:
		case 17784:
		case 17785:
		case 17786:
		case 17787:
		case 17788:
		case 17789:
		case 17790:
		case 17791:
			takeRunes(player, resourceId, amount);
			return;
		case 5331://Watering can
		case 5333://Watering can (1)
		case 5334://Watering can (2)
		case 5335://Watering can (3)
		case 5336://Watering can (4)
		case 5337://Watering can (5)
		case 5338://Watering can (6)
		case 5339://Watering can (7)
		case 5340://Watering can (8)
			if (!hasTool(player, 18682)) {
				takeFromWeighted(player, amount, [5331, 5333, 5334, 5335, 5336, 5337, 5338, 5339, 5340]);
			}
			return;
		case 3430://Sacred oil (4)
		case 3432://Sacred oil (3)
		case 3434://Sacred oil (2)
		case 3436://Sacred oil (1)
			takeFromWeighted(player, amount, [229, 3436, 3434, 3432, 3430]);
			return;
		case 453://Coal
			throw "Unsupported remove coal!";
		//case 995://Coins
		//	amount = inv.total(player, 995);//inv.total counts amount in money pouch already
		//	break;
		case 25629://Iron (Artisans workshop)
			setVarBit(player, 361, varbit(player, 361) - amount);
			return;
		case 25630://Coal (Artisans workshop)
			setVarBit(player, 369, varbit(player, 369) - amount);
			return;
		case 25631://Mithril (Artisans workshop)
			setVarBit(player, 363, varbit(player, 363) - amount);
			return;
		case 25632://Adamant (Artisans workshop)
			setVarBit(player, 366, varbit(player, 366) - amount);
			return;
		case 25633://Runite (Artisans workshop)
			setVarBit(player, 367, varbit(player, 367) - amount);
			return;
		case 6797://Watering can (to fill)
			takeFromMulti(player, amount, [5331, 5333, 5334, 5335, 5336, 5337, 5338, 5339]);
			return;
		case 1825://Waterskin (3)
		case 1827://Waterskin (2)
		case 1829://Waterskin (1)
		case 1831://Waterskin (0)
			takeFromMulti(player, amount, [1831, 1829, 1827, 1825]);
			return;
		case 26317://Ancient bones
			setVarBit(player, 17415, varbit(player, 17415) - amount);
			return;
		case 26318://Spices
			setVarBit(player, 17417, varbit(player, 17417) - amount);
			return;
		case 26319://Lacquer
			setVarBit(player, 17418, varbit(player, 17418) - amount);
			return;
		case 26320://Plate
			setVarBit(player, 17416, varbit(player, 17416) - amount);
			return;
		case 26321://Chi
			setVarBit(player, 17419, varbit(player, 17419) - amount);
			return;
		case 30566://Pearls
			setVarBit(player, 21334, varbit(player, 21334) - amount);
			return;
		case 30567://Koi scales
			setVarBit(player, 21335, varbit(player, 21335) - amount);
			return;
		case 7984://Basilisk head
			/*if (varc(player, 2689) > 0)  {
				return 1;
			}*/
			throw "Unsupported Abyssal head";
		case 7986://Abyssal head
			/*if (varc(player, 2690) > 0) {
				return 1;
			}*/
			throw "Unsupported Abyssal head";
		case 2169://Gnome spice
			//if (_map_members() == 0 && _oc_members(resourceId) == 1) {
			//	amount = 0;
			//} else if (a3 != -1 && inv.total(player, 2169) > 0) {
			//	amount = -1;
			//} else
			//if (hasBeastOfBurden) {
			//	amount = inv.total(player, resourceId) + inv.total(player, resourceId, Inv.BEAST_OF_BURDEN);
			//} else {
			//	amount = inv.total(player, resourceId);
			//}
			break;
		case 36365://Invention material
			takeMaterials(player, inventionMaterialId, amount);
			return;
		default:
			takeItem(player, resourceId);
		//if (hasBeastOfBurden) {
		//	amount = inv.total(player, resourceId) + inv.total(player, resourceId, Inv.BEAST_OF_BURDEN);
		//} else {
		//	amount = inv.total(player, resourceId);
		//}
	}
}

function takeFromWeighted(player: Player, totalAmount: number, weightedItems: number[]) {
	for (var slot = 0; slot < _inv.size(Inv.BACKPACK); slot++) {
		var objId = _inv.getObject(player, Inv.BACKPACK, slot);
		var amount = weightedItems.indexOf(objId);

		//If the item matches one of the weighted ones and it's not the empty item
		if (amount > 0) {
			//Take the lesser of the available amount & the amount needed
			var removed = Math.min(amount, totalAmount);

			//Replace the item with one of less volume
			_inv.setSlot(player, Inv.BACKPACK, slot, weightedItems[amount - removed]);
			totalAmount -= removed;
			if (totalAmount < 1) {
				//If we've removed everything, return
				return;
			}
		}
	}
	throw "Not enough capacity! Still need " + totalAmount + " more.";
}

function takeFromMulti(player: Player, totalAmount: number, items: number[]) {
	for (var slot = 0; slot < _inv.size(Inv.BACKPACK); slot++) {
		var objId = _inv.getObject(player, Inv.BACKPACK, slot);
		if (items.indexOf(objId) !== -1) {
			var count = _inv.getCount(player, Inv.BACKPACK, slot);
			if (count < totalAmount) {
				_inv.clearSlot(player, Inv.BACKPACK, slot);
				totalAmount -= count;
			} else {
				_inv.setSlot(player, Inv.BACKPACK, slot, objId, count - totalAmount);
			}

			if (totalAmount < 1) {
				return;
			}
		}
	}
}

export function takeRunes(player: Player, runeId: number, amount: number) {
	switch (runeId) {
		case 17780://Air rune
			if (!invTotalParam(player, 972, Inv.EQUIPMENT)) {
				takeFromMulti(player, amount, [17780, 16091]);
			}
			return;
		case 17781://Water rune
			if (!invTotalParam(player, 973, Inv.EQUIPMENT)) {
				takeFromMulti(player, amount, [17781, 16092]);
			}
			return;
		case 17782://Earth rune
			if (!invTotalParam(player, 974, Inv.EQUIPMENT)) {
				takeFromMulti(player, amount, [17782, 16093]);
			}
			return;
		case 17783://Fire rune
			if (!invTotalParam(player, 975, Inv.EQUIPMENT)) {
				takeFromMulti(player, amount, [17783, 16094]);
			}
			return;
		case 17784://Mind rune
			takeFromMulti(player, amount, [17784, 16095]);
			return;
		case 17785://Chaos rune
			takeFromMulti(player, amount, [17785, 16096]);
			return;
		case 17786://Death rune
			takeFromMulti(player, amount, [17786, 16097]);
			return;
		case 17787://Blood rune
			takeFromMulti(player, amount, [17787, 16098]);
			return;
		case 17788://Body rune
			takeFromMulti(player, amount, [17788, 16099]);
			return;
		case 17789://Cosmic rune
			takeFromMulti(player, amount, [17789, 16100]);
			return;
		case 17790://Astral rune
			takeFromMulti(player, amount, [17790, 16101]);
			return;
		case 17791://Nature rune
			takeFromMulti(player, amount, [17791, 16102]);
			return;
		case 17792://Law rune
			takeFromMulti(player, amount, [17792, 16103]);
			return;
		case 17793://Soul rune
			takeFromMulti(player, amount, [17793, 16104]);
			return;
		case 556://Air rune
			if (!invTotalParam(player, 972, Inv.EQUIPMENT)) {
				takeItem(player, 556, amount);
			}
			return;
		//if (_map_members() == 1)
		//return inv.total(player, 556) + inv.total(player, 4697) + inv.total(player, 4695) + inv.total(player, 4696);
		case 555://Water rune
			if (!invTotalParam(player, 973, Inv.EQUIPMENT)) {
				takeItem(player, 555, amount);
			}
			return;
		//if (_map_members() == 1)
		//return inv.total(player, 555) + inv.total(player, 4694) + inv.total(player, 4695) + inv.total(player, 4698);
		case 554://Fire rune
			if (!invTotalParam(player, 975, Inv.EQUIPMENT)) {
				takeItem(player, 554, amount);
			}
			return;
		//if (_map_members() == 1)
		//return inv.total(player, 554) + inv.total(player, 4694) + inv.total(player, 4697) + inv.total(player, 4699);
		case 557://Earth rune
			if (!invTotalParam(player, 974, Inv.EQUIPMENT)) {
				takeItem(player, 557, amount);
			}
			return;
		//if (_map_members() == 1)
		//return inv.total(player, 557) + inv.total(player, 4696) + inv.total(player, 4699) + inv.total(player, 4698);
		case 563://Law rune
			//if (domain_2['cfg2691'] > 0 && _inv_total(94, 18342) > 0)
			//	return domain_2['cfg2691'];
			return takeItem(player, 563, amount);
		case 561://Nature rune
			//if (domain_2['cfg2691'] > 0 && _inv_total(94, 18341) > 0)
			//	return domain_2['cfg2691'];
			return takeItem(player, 561, amount);
		case 558://Mind rune
		case 559://Body rune
		case 560://Death rune
		case 562://Chaos rune
		case 9075://Astral rune
		case 564://Cosmic rune
		case 565://Blood rune
		case 566://Soul rune
			return takeItem(player, runeId, amount);
	}
}

export function getRuneCount(player: Player, runeId: number): number {
	switch (runeId) {
		case 17780://Air rune
			if (invTotalParam(player, 972, Inv.EQUIPMENT)) {
				return -1;
			}
			return invTotal(player, 17780) + invTotal(player, 16091);
		case 17781://Water rune
			if (invTotalParam(player, 973, Inv.EQUIPMENT)) {
				return -1;
			}
			return invTotal(player, 17781) + invTotal(player, 16092);
		case 17782://Earth rune
			if (invTotalParam(player, 974, Inv.EQUIPMENT)) {
				return -1;
			}
			return invTotal(player, 17782) + invTotal(player, 16093);
		case 17783://Fire rune
			if (invTotalParam(player, 975, Inv.EQUIPMENT)) {
				return -1;
			}
			return invTotal(player, 17783) + invTotal(player, 16094);
		case 17784://Mind rune
			return invTotal(player, 17784) + invTotal(player, 16095);
		case 17785://Chaos rune
			return invTotal(player, 17785) + invTotal(player, 16096);
		case 17786://Death rune
			return invTotal(player, 17786) + invTotal(player, 16097);
		case 17787://Blood rune
			return invTotal(player, 17787) + invTotal(player, 16098);
		case 17788://Body rune
			return invTotal(player, 17788) + invTotal(player, 16099);
		case 17789://Cosmic rune
			return invTotal(player, 17789) + invTotal(player, 16100);
		case 17790://Astral rune
			return invTotal(player, 17790) + invTotal(player, 16101);
		case 17791://Nature rune
			return invTotal(player, 17791) + invTotal(player, 16102);
		case 17792://Law rune
			return invTotal(player, 17792) + invTotal(player, 16103);
		case 17793://Soul rune
			return invTotal(player, 17793) + invTotal(player, 16104);
		case 556://Air rune
			if (invTotalParam(player, 972, Inv.EQUIPMENT)) {
				return -1;
			}
			//if (_map_members() == 1) {
			//	return inv.total(player, 556) + inv.total(player, 4697) + inv.total(player, 4695) + inv.total(player, 4696);
			//}
			return invTotal(player, 556);
		case 555://Water rune
			if (invTotalParam(player, 973, Inv.EQUIPMENT)) {
				return -1;
			}
			//if (_map_members() == 1) {
			//	return inv.total(player, 555) + inv.total(player, 4694) + inv.total(player, 4695) + inv.total(player, 4698);
			//}
			return invTotal(player, 555);
		case 554://Fire rune
			if (invTotalParam(player, 975, Inv.EQUIPMENT)) {
				return -1;
			}
			//if (_map_members() == 1) {
			//	return inv.total(player, 554) + inv.total(player, 4694) + inv.total(player, 4697) + inv.total(player, 4699);
			//}
			return invTotal(player, 554);
		case 557://Earth rune
			if (invTotalParam(player, 974, Inv.EQUIPMENT)) {
				return -1;
			}
			//if (_map_members() == 1) {
			//	return inv.total(player, 557) + inv.total(player, 4696) + inv.total(player, 4699) + inv.total(player, 4698);
			//}
			return invTotal(player, 557);
		case 563://Law rune
			//if (domain_2['cfg2691'] > 0 && _inv_total(94, 18342) > 0)
			//	return domain_2['cfg2691'];
			return invTotal(player, 563);
		case 561://Nature rune
			//if (domain_2['cfg2691'] > 0 && _inv_total(94, 18341) > 0)
			//	return domain_2['cfg2691'];
			return invTotal(player, 561);
		case 558://Mind rune
		case 559://Body rune
		case 560://Death rune
		case 562://Chaos rune
		case 9075://Astral rune
		case 564://Cosmic rune
		case 565://Blood rune
		case 566://Soul rune
			return invTotal(player, runeId);
	}
}
