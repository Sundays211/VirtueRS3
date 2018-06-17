/**
 * 
 */
/* globals configApi, ENGINE */

module.exports = init();

function init () {
	var config = {
		enumValue : enumValue,
		enumHasValue : enumHasValue,
		enumSize : enumSize,
		enumValueList : enumValueList,
		structParam : structParam,
		objName : objName,
		objDesc : objDesc,
		objStackable : objStackable,
		objWearpos : objWearpos,
		objCost : objCost,
		objCategory : objCategory,
		objIop : objIop,
		objCert : objCert,
		objUncert : objUncert,
		objLent : objLent,
		objUnlent : objUnlent,
		objTradable : objTradable,
		objSellToGeneralStore : objSellToGeneralStore,
		objParam : objParam,
		lookupDbRowId : lookupDbRowId,
		lookupDbRowIds : lookupDbRowIds,
		getDbFieldValues : getDbFieldValues,
		npcName : npcName,
		locName : locName,
		locSizeX : locSizeX,
		locSizeY : locSizeY,
		locHasModel : locHasModel,
		seqLength : seqLength
	};
	
	return config;
	
	function enumValue (enumId, key) {
		return configApi.enumValue(enumId, key);
	}
	
	function enumHasValue (enumId, value) {
		return configApi.enumHasValue(enumId, value);
	}
	
	function enumSize (enumId) {
		return configApi.enumSize(enumId);
	}
	
	function enumValueList (enumId) {
		var result = [];
		for (var i=0; i<enumSize(enumId); i++){
			result.push(enumValue(enumId, i));
		}
		return result;
	}
	
	function structParam (structId, param) {
		return configApi.structParam(structId, param);
	}
	
	function objName (objId) {
		return configApi.objName(objId);
	}
	
	function objDesc (objId) {
		return configApi.objDesc(objId);
	}
	
	function objStackable (objId) {
		return configApi.objStackable(objId);
	}
	
	function objWearpos (objId) {
		return configApi.objWearpos(objId);
	}
	
	function objCategory (objId) {
		return configApi.objCategory(objId);
	}
	
	function objCost (objId) {
		//TODO: Implement configApi method to get obj cost
		return ENGINE.getItemType(objId).cost;
	}
	
	function objIop (objId, op) {
		return configApi.objIop(objId, op);
	}
	
	function objCert (objId) {
		return configApi.objCert(objId);
	}
	
	function objUncert (objId) {
		return configApi.objUncert(objId);
	}
	
	function objLent (objId) {
		return configApi.objLent(objId);
	}
	
	function objUnlent (objId) {
		return configApi.objUnlent(objId);
	}
	
	function objTradable (objId) {
		return ENGINE.getItemType(objId).isTradable();
	}
	
	function objSellToGeneralStore (objId) {
		return ENGINE.getItemType(objId).canSellToGeneralStore();
	}
	
	function objParam (objId, param) {
		return configApi.objParam(objId, param);
	}
	
	function lookupDbRowId (dbTableId, rowPos) {
		return configApi.lookupDbRowId(dbTableId, rowPos);
	}
	
	function lookupDbRowIds (dbTableId, indexId, key) {
		return configApi.lookupDbRowIds(dbTableId, indexId, key);
	}
	
	function getDbFieldValues (dbTableId, dbRowId, column) {
		return configApi.getDbFieldValues(dbTableId, dbRowId, column);
	}
	
	function npcName (npc) {
		if (typeof npcId !== 'number') {
			npc = ENGINE.getId(npc);
		}
		return configApi.npcName(npc);
	}

	function locName (locId) {
		return configApi.locName(locId);
	}

	function locSizeX (locTypeId) {
		return configApi.locSizeX(locTypeId);
	}

	function locSizeY (locTypeId) {
		return configApi.locSizeY(locTypeId);
	}

	function locHasModel (locId, modelId) {
		return ENGINE.getLocType(locId).hasMesh(modelId);
	}
	
	function seqLength (seqId) {
		return configApi.seqLength(seqId);
	}
}