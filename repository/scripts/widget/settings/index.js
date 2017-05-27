/**
 * Module to initialise the widget script bindings.
 */
module.exports = (function () {
	return {
		init : init,
	};
	
	function init (scriptManager) {
		var modules = [
			require('./action-bar-settings'),
			require('./doomsayer-settings'),
			require('./game-settings'),
			require('./gameplay-settings'),
			require('./house-settings'),
			require('./interface-settings'),
			require('./loot-settings'),
			require('./misc-settings')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();