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
import { Player } from "engine/models";
import _config from 'engine/config';
import { varp, setVarp } from "engine/var";
import { checkOverflow } from "shared/util";

/**
 * Invention material handler
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 03/04/2016
 */
export enum InventionMaterial {
	JUNK = 1,
	SIMPLE = 2,
	BASE = 3,
	BLADE = 4,
	MAGIC = 5,
	ORGANIC = 6,
	SPIRITUAL = 7,
	STAVE = 8,
	TENSILE = 9,
	HEAD = 10,
	CONNECTOR = 11,
	COVER = 12,
	CLEAR = 13,
	DELICATE = 14,
	CRAFTED = 15,
	PLATED = 16,
	FLEXIBLE = 17,
	DEFLECTING = 18,
	METALLIC = 19,
	SPIKED = 20,
	SMOOTH = 21,
	PADDED = 22,
	CRYSTAL = 23,
	PRECISE = 100,
	SHARP = 101,
	POWERFUL = 102,
	HEALTHY = 103,
	HEAVY = 105,
	STUNNING = 106,
	ENHANCING = 107,
	PROTECTIVE = 108,
	EVASIVE = 109,
	PRECIOUS = 110,
	PIOUS = 111,
	LIGHT = 112,
	LIVING = 113,
	ETHEREAL = 114,
	VARIABLE = 115,
	DEXTROUS = 116,
	STRONG = 117,
	SWIFT = 118,
	IMBUED = 119,
	DIRECT = 120,
	SUBTLE = 121,
	KNIGHTLY = 104,
	HARNESSED = 122,
	UNDEAD = 123,
	SEREN = 124,
	DRAGONFIRE = 125,
	FUNGAL = 126,
	EXPLOSIVE = 127,
	CORPOREAL = 128,
	SARADOMIN = 129,
	ZAMORAK = 130,
	ARMADYL = 131,
	BANDOS = 132,
	ZAROS = 133,
	OCEANIC = 134,
	RESILIENT = 135,
	SILENT = 136,
	NOXIOUS = 137,
	RUMBLING = 138,
	ASCENDED = 139,
	PESTIFEROUS = 140,
	FORTUNATE = 142,
	ANCIENT = 143,
	CULINARY = 144,
	BRASSICAN = 145,
	SHIFTING = 146,
	REFINED = 141
}

export function takeMaterials(player: Player, materialId: number, amount: number): boolean {
	var total = getMaterialCount(player, materialId);
	total -= amount;
	if (total >= 0) {
		setMaterialCount(player, materialId, total);
		return true;
	} else {
		return false;
	}
}

export function giveMaterials(player: Player, materialId: InventionMaterial, amount: number): boolean {
	var total = getMaterialCount(player, materialId);
	if (checkOverflow(total, amount)) {
		return false;
	} else {
		total += amount;
		setMaterialCount(player, materialId, total);
		return true;
	}
}

export function getMaterialName(materialId: InventionMaterial): string {
	var rowId = _config.lookupDbRowIds(4, 0, materialId)[0];
	var fieldValues = _config.getDbFieldValues(4, rowId, 1);
	return fieldValues[0] as string;
}

export function getMaterialCategory(materialId: InventionMaterial): number {
	var rowId = _config.lookupDbRowIds(4, 0, materialId)[0];
	var fieldValues = _config.getDbFieldValues(4, rowId, 7);
	return fieldValues[0] as number;
}

export function getMaterialCount(player: Player, materialId: InventionMaterial): number {
	//Clientscript 12054 for material varps
	switch (materialId) {
		case 1:
			return varp(player, 5997) as number;
		case 2:
			return varp(player, 5998) as number;
		case 3:
			return varp(player, 5999) as number;
		case 4:
			return varp(player, 6000) as number;
		case 5:
			return varp(player, 6001) as number;
		case 6:
			return varp(player, 6002) as number;
		case 7:
			return varp(player, 6003) as number;
		case 8:
			return varp(player, 6004) as number;
		case 9:
			return varp(player, 6005) as number;
		case 10:
			return varp(player, 6006) as number;
		case 11:
			return varp(player, 6007) as number;
		case 12:
			return varp(player, 6008) as number;
		case 13:
			return varp(player, 6009) as number;
		case 14:
			return varp(player, 6010) as number;
		case 15:
			return varp(player, 6011) as number;
		case 16:
			return varp(player, 6012) as number;
		case 17:
			return varp(player, 6013) as number;
		case 18:
			return varp(player, 6014) as number;
		case 19:
			return varp(player, 6015) as number;
		case 20:
			return varp(player, 6016) as number;
		case 21:
			return varp(player, 6017) as number;
		case 22:
			return varp(player, 6018) as number;
		case 23:
			return varp(player, 6019) as number;
		case 100:
			return varp(player, 6020) as number;
		case 101:
			return varp(player, 6021) as number;
		case 102:
			return varp(player, 6022) as number;
		case 103:
			return varp(player, 6023) as number;
		case 104:
			return varp(player, 6024) as number;
		case 105:
			return varp(player, 6025) as number;
		case 106:
			return varp(player, 6064) as number;
		case 107:
			return varp(player, 6065) as number;
		case 108:
			return varp(player, 6026) as number;
		case 109:
			return varp(player, 6027) as number;
		case 110:
			return varp(player, 6028) as number;
		case 111:
			return varp(player, 6029) as number;
		case 112:
			return varp(player, 6030) as number;
		case 113:
			return varp(player, 6031) as number;
		case 114:
			return varp(player, 6032) as number;
		case 115:
			return varp(player, 6033) as number;
		case 116:
			return varp(player, 6034) as number;
		case 117:
			return varp(player, 6035) as number;
		case 118:
			return varp(player, 6036) as number;
		case 119:
			return varp(player, 6037) as number;
		case 120:
			return varp(player, 6038) as number;
		case 121:
			return varp(player, 6039) as number;
		case 122:
			return varp(player, 6040) as number;
		case 123:
			return varp(player, 6041) as number;
		case 125:
			return varp(player, 6042) as number;
		case 126:
			return varp(player, 6043) as number;
		case 127:
			return varp(player, 6044) as number;
		case 128:
			return varp(player, 6045) as number;
		case 131:
			return varp(player, 6046) as number;
		case 132:
			return varp(player, 6047) as number;
		case 145:
			return varp(player, 6062) as number;
		case 129:
			return varp(player, 6048) as number;
		case 124:
			return varp(player, 6049) as number;
		case 130:
			return varp(player, 6050) as number;
		case 133:
			return varp(player, 6051) as number;
		case 134:
			return varp(player, 6052) as number;
		case 135:
			return varp(player, 6053) as number;
		case 136:
			return varp(player, 6054) as number;
		case 137:
			return varp(player, 6055) as number;
		case 138:
			return varp(player, 6056) as number;
		case 139:
			return varp(player, 6057) as number;
		case 140:
			return varp(player, 6058) as number;
		case 142:
			return varp(player, 6059) as number;
		case 143:
			return varp(player, 6060) as number;
		case 144:
			return varp(player, 6061) as number;
		case 146:
			return varp(player, 6063) as number;
		case 141:
			return varp(player, 6066) as number;
		default:
			return 0;
	}
}

function setMaterialCount(player: Player, materialId: InventionMaterial, value: number) {
	//Clientscript 12054 for material varps
	switch (materialId) {
		case 1:
			setVarp(player, 5997, value);
			return;
		case 2:
			setVarp(player, 5998, value);
			return;
		case 3:
			setVarp(player, 5999, value);
			return;
		case 4:
			setVarp(player, 6000, value);
			return;
		case 5:
			setVarp(player, 6001, value);
			return;
		case 6:
			setVarp(player, 6002, value);
			return;
		case 7:
			setVarp(player, 6003, value);
			return;
		case 8:
			setVarp(player, 6004, value);
			return;
		case 9:
			setVarp(player, 6005, value);
			return;
		case 10:
			setVarp(player, 6006, value);
			return;
		case 11:
			setVarp(player, 6007, value);
			return;
		case 12:
			setVarp(player, 6008, value);
			return;
		case 13:
			setVarp(player, 6009, value);
			return;
		case 14:
			setVarp(player, 6010, value);
			return;
		case 15:
			setVarp(player, 6011, value);
			return;
		case 16:
			setVarp(player, 6012, value);
			return;
		case 17:
			setVarp(player, 6013, value);
			return;
		case 18:
			setVarp(player, 6014, value);
			return;
		case 19:
			setVarp(player, 6015, value);
			return;
		case 20:
			setVarp(player, 6016, value);
			return;
		case 21:
			setVarp(player, 6017, value);
			return;
		case 22:
			setVarp(player, 6018, value);
			return;
		case 23:
			setVarp(player, 6019, value);
			return;
		case 100:
			setVarp(player, 6020, value);
			return;
		case 101:
			setVarp(player, 6021, value);
			return;
		case 102:
			setVarp(player, 6022, value);
			return;
		case 103:
			setVarp(player, 6023, value);
			return;
		case 104:
			setVarp(player, 6024, value);
			return;
		case 105:
			setVarp(player, 6025, value);
			return;
		case 106:
			setVarp(player, 6064, value);
			return;
		case 107:
			setVarp(player, 6065, value);
			return;
		case 108:
			setVarp(player, 6026, value);
			return;
		case 109:
			setVarp(player, 6027, value);
			return;
		case 110:
			setVarp(player, 6028, value);
			return;
		case 111:
			setVarp(player, 6029, value);
			return;
		case 112:
			setVarp(player, 6030, value);
			return;
		case 113:
			setVarp(player, 6031, value);
			return;
		case 114:
			setVarp(player, 6032, value);
			return;
		case 115:
			setVarp(player, 6033, value);
			return;
		case 116:
			setVarp(player, 6034, value);
			return;
		case 117:
			setVarp(player, 6035, value);
			return;
		case 118:
			setVarp(player, 6036, value);
			return;
		case 119:
			setVarp(player, 6037, value);
			return;
		case 120:
			setVarp(player, 6038, value);
			return;
		case 121:
			setVarp(player, 6039, value);
			return;
		case 122:
			setVarp(player, 6040, value);
			return;
		case 123:
			setVarp(player, 6041, value);
			return;
		case 125:
			setVarp(player, 6042, value);
			return;
		case 126:
			setVarp(player, 6043, value);
			return;
		case 127:
			setVarp(player, 6044, value);
			return;
		case 128:
			setVarp(player, 6045, value);
			return;
		case 131:
			setVarp(player, 6046, value);
			return;
		case 132:
			setVarp(player, 6047, value);
			return;
		case 145:
			setVarp(player, 6062, value);
			return;
		case 129:
			setVarp(player, 6048, value);
			return;
		case 124:
			setVarp(player, 6049, value);
			return;
		case 130:
			setVarp(player, 6050, value);
			return;
		case 133:
			setVarp(player, 6051, value);
			return;
		case 134:
			setVarp(player, 6052, value);
			return;
		case 135:
			setVarp(player, 6053, value);
			return;
		case 136:
			setVarp(player, 6054, value);
			return;
		case 137:
			setVarp(player, 6055, value);
			return;
		case 138:
			setVarp(player, 6056, value);
			return;
		case 139:
			setVarp(player, 6057, value);
			return;
		case 140:
			setVarp(player, 6058, value);
			return;
		case 142:
			setVarp(player, 6059, value);
			return;
		case 143:
			setVarp(player, 6060, value);
			return;
		case 144:
			setVarp(player, 6061, value);
			return;
		case 146:
			setVarp(player, 6063, value);
			return;
		case 141:
			setVarp(player, 6066, value);
			return;
		default:
			throw "Invalid material: " + materialId;
	}
}
