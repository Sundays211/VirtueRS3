/**
 * Module to initialise the herblore script bindings.
 */

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		var modules = [
			require('./workbench'),
			require('./disassembly')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();