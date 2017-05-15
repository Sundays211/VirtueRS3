/**
 * Module to initialise the prayer script bindings.
 */

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		var modules = [
			require('./bones'),
			require('./ashes')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();