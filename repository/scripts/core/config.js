/**
 * 
 */

module.exports = init();

function init () {
	var config = {
		enumValue : enumValue,
		enumHasValue : enumHasValue,
		enumSize : enumSize,
		structParam : structParam
	}
	
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
}