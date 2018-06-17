/**
 * Module to initialise the combat widget script bindings.
 */

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		var modules = [
			require('./action-bar'),
			require('./defence-book'),
			require('./magic-book'),
			require('./melee-book'),
			require('./prayer-book'),
			require('./ranged-book')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();