import { Npc } from './models';

function enumValue(enumId: number, key: number): string | number {
	return CONFIG_ENGINE.enumValue(enumId, key);
}

function enumHasValue(enumId: number, value: string | number): boolean {
	return CONFIG_ENGINE.enumHasValue(enumId, value);
}

function enumSize(enumId: number): number {
	return CONFIG_ENGINE.enumSize(enumId);
}

function enumValueList(enumId: number): Array<string | number> {
	var result = [];
	for (var i = 0; i < enumSize(enumId); i++) {
		result.push(enumValue(enumId, i));
	}
	return result;
}

function structParam(structId: number, param: number): string | number {
	return CONFIG_ENGINE.structParam(structId, param);
}

function objName(objId: number): string {
	return CONFIG_ENGINE.objName(objId);
}

function objDesc(objId: number): string {
	return CONFIG_ENGINE.objDesc(objId);
}

function objStackable(objId: number): boolean {
	return CONFIG_ENGINE.objStackable(objId);
}

function objWearpos(objId: number): number {
	return CONFIG_ENGINE.objWearpos(objId);
}

function objCategory(objId: number): number {
	return CONFIG_ENGINE.objCategory(objId);
}

function objCost(objId: number): number {
	//TODO: Implement configApi method to get obj cost
	return ENGINE.getItemType(objId).cost;
}

function objIop(objId: number, op: number) {
	return CONFIG_ENGINE.objIop(objId, op);
}

function objCert(objId: number): number {
	return CONFIG_ENGINE.objCert(objId);
}

function objUncert(objId: number): number {
	return CONFIG_ENGINE.objUncert(objId);
}

function objLent(objId: number): number {
	return CONFIG_ENGINE.objLent(objId);
}

function objUnlent(objId: number): number {
	return CONFIG_ENGINE.objUnlent(objId);
}

function objTradable(objId: number): boolean {
	return ENGINE.getItemType(objId).isTradable();
}

function objSellToGeneralStore(objId: number): boolean {
	return ENGINE.getItemType(objId).canSellToGeneralStore();
}

function objParam(objId: number, param: number): string | number {
	return CONFIG_ENGINE.objParam(objId, param);
}

function lookupDbRowId(dbTableId: number, rowPos: number): number {
	return CONFIG_ENGINE.lookupDbRowId(dbTableId, rowPos);
}

function lookupDbRowIds(dbTableId: number, indexId: number, key: number | string): number[] {
	return CONFIG_ENGINE.lookupDbRowIds(dbTableId, indexId, key);
}

function getDbFieldValues(dbTableId: number, dbRowId: number, column: number): any[] {
	return CONFIG_ENGINE.getDbFieldValues(dbTableId, dbRowId, column);
}

function npcName(npc: number | Npc): string {
	if (typeof npc !== 'number') {
		npc = ENGINE.getId(npc);
	}
	return CONFIG_ENGINE.npcName(npc);
}

function locName(locId: number): string {
	return CONFIG_ENGINE.locName(locId);
}

function locSizeX(locTypeId: number): number {
	return CONFIG_ENGINE.locSizeX(locTypeId);
}

function locSizeY(locTypeId: number): number {
	return CONFIG_ENGINE.locSizeY(locTypeId);
}

function locHasModel(locId: number, modelId: number): boolean {
	return ENGINE.getLocType(locId).hasMesh(modelId);
}

function seqLength(seqId: number): number {
	return CONFIG_ENGINE.seqLength(seqId);
}

export default {
	enumValue,
	enumHasValue,
	enumSize,
	enumValueList,
	structParam,
	objName,
	objDesc,
	objStackable,
	objWearpos,
	objCost,
	objCategory,
	objIop,
	objCert,
	objUncert,
	objLent,
	objUnlent,
	objTradable,
	objSellToGeneralStore,
	objParam,
	lookupDbRowId,
	lookupDbRowIds,
	getDbFieldValues,
	npcName,
	locName,
	locSizeX,
	locSizeY,
	locHasModel,
	seqLength
};
