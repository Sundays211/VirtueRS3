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
		objCert : objCert,
		objUncert : objUncert,
		objSellToGeneralStore : objSellToGeneralStore
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
}