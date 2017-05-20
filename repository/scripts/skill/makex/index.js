/**
 *  Module to initialise the make-X interface script bindings.
 */
var progress = require('./progress');

module.exports = (function () {
	return {
		init : init,
		startCrafting : progress.startCrafting
	};
	
	function init (scriptManager) {
		var modules = [
			progress,
			require('./selection')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();