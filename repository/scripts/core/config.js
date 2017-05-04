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
		structParam : structParam,
		objName : objName,
		objDesc : objDesc,
		objStackable : objStackable,
		objCost : objCost,
		objCategory : objCategory,
		objCert : objCert,
		objUncert : objUncert,
		objSellToGeneralStore : objSellToGeneralStore,
		objParam : objParam,
		lookupDbRowId : lookupDbRowId,
		lookupDbRowIds : lookupDbRowIds,
		getDbFieldValues : getDbFieldValues,
		npcName : npcName,
		locName : locName
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
	
	function objCategory (objId) {
		return configApi.objCategory(objId);
	}
	
	function objCost (objId) {
		//TODO: Implement configApi method to get obj cost
		return ENGINE.getItemType(objId).cost;
	}
	
	function objCert (objId) {
		return configApi.objCert(objId);
	}
	
	function objUncert (objId) {
		return configApi.objUncert(objId);
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
}