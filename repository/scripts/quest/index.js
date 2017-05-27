/**
 * Module to initialise the inventory script bindings.
 */
var quest = require('./core');

module.exports = (function () {
	return {
		init : init,
		hasStarted : quest.hasStarted,
		hasFinished : quest.hasFinished
	};
	
	function init (scriptManager) {
		var modules = [
			require('./quest-list'),
			require('./cooks-assistant')
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();