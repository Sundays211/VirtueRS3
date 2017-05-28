/**
 * Module to initialise the game frame script bindings.
 */
var overlay = require('./overlay');

module.exports = (function () {
	return {
		init : init,
		openOverlay : overlay.open
	};
	
	function init (scriptManager) {
		var modules = [
			overlay,
			require('./ribbon'),
			require('./minimap'),
			require('./options'),
			require('./confirm')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();