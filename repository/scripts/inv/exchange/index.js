/**
 * Module to initialise the Grand Exchange script bindings.
 */

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		var modules = [
			require('./collection-box'),
			require('./clerk'),
			require('./exchange-widget')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();