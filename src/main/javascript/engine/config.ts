import { Npc, Player } from './models';

export default class {

	public static enumValue(enumId: number, key: number): string | number {
		return CONFIG_ENGINE.enumValue(enumId, key);
	}

	public static enumHasValue(enumId: number, value: string | number): boolean {
		return CONFIG_ENGINE.enumHasValue(enumId, value);
	}

	public static enumSize(enumId: number): number {
		return CONFIG_ENGINE.enumSize(enumId);
	}

	public static enumValueList(enumId: number): Array<string | number> {
		var result = [];
		for (var i = 0; i < this.enumSize(enumId); i++) {
			result.push(this.enumValue(enumId, i));
		}
		return result;
	}

	public static structParam(structId: number, param: number): string | number {
		return CONFIG_ENGINE.structParam(structId, param);
	}

	public static objName(objId: number): string {
		return CONFIG_ENGINE.objName(objId);
	}

	public static objDesc(objId: number): string {
		return CONFIG_ENGINE.objDesc(objId);
	}

	public static objStackable(objId: number): boolean {
		return CONFIG_ENGINE.objStackable(objId);
	}

	public static objWearpos(objId: number): number {
		return CONFIG_ENGINE.objWearpos(objId);
	}

	public static objCategory(objId: number): number {
		return CONFIG_ENGINE.objCategory(objId);
	}

	public static objCost(objId: number): number {
		//TODO: Implement configApi method to get obj cost
		return ENGINE.getItemType(objId).cost;
	}

	public static objIop(objId: number, op: number) {
		return CONFIG_ENGINE.objIop(objId, op);
	}

	public static objCert(objId: number): number {
		return CONFIG_ENGINE.objCert(objId);
	}

	public static objUncert(objId: number): number {
		return CONFIG_ENGINE.objUncert(objId);
	}

	public static objLent(objId: number): number {
		return CONFIG_ENGINE.objLent(objId);
	}

	public static objUnlent(objId: number): number {
		return CONFIG_ENGINE.objUnlent(objId);
	}

	public static objTradable(objId: number): boolean {
		return ENGINE.getItemType(objId).isTradable();
	}

	public static objSellToGeneralStore(objId: number): boolean {
		return ENGINE.getItemType(objId).canSellToGeneralStore();
	}

	public static objParam(objId: number, param: number): string | number {
		return CONFIG_ENGINE.objParam(objId, param);
	}

	public static lookupDbRowId(dbTableId: number, rowPos: number): number {
		return CONFIG_ENGINE.lookupDbRowId(dbTableId, rowPos);
	}

	public static lookupDbRowIds(dbTableId: number, indexId: number, key: number | string): number[] {
		return CONFIG_ENGINE.lookupDbRowIds(dbTableId, indexId, key);
	}

	public static getDbFieldValues(dbTableId: number, dbRowId: number, column: number): Array<number | string> {
		return CONFIG_ENGINE.getDbFieldValues(dbTableId, dbRowId, column);
	}

	public static npcName(npc: number | Npc): string {
		if (typeof npc !== 'number') {
			npc = ENGINE.getId(npc);
		}
		return CONFIG_ENGINE.npcName(npc);
	}

	public static locName(locId: number): string {
		return CONFIG_ENGINE.locName(locId);
	}

	public static locSizeX(locTypeId: number): number {
		return CONFIG_ENGINE.locSizeX(locTypeId);
	}

	public static locSizeY(locTypeId: number): number {
		return CONFIG_ENGINE.locSizeY(locTypeId);
	}

	public static locHasModel(locId: number, modelId: number): boolean {
		return ENGINE.getLocType(locId).hasMesh(modelId);
	}

	public static seqLength(seqId: number): number {
		return CONFIG_ENGINE.seqLength(seqId);
	}

	public static questStarted (player: Player, questId: number): boolean {
		return QUEST_ENGINE.isStarted(player, questId);
	}

	public static questFinished (player: Player, questId: number): boolean {
		return QUEST_ENGINE.isFinished(player, questId);
	}

}
