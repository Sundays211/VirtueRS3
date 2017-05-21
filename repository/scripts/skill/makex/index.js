/**
 *  Module to initialise the make-X interface script bindings.
 */
var progress = require('./progress');
var selection = require('./selection');

module.exports = (function () {
	return {
		init : init,
		startCrafting : progress.startCrafting,
		selectProduct : selection.selectProduct
	};
	
	function init (scriptManager) {
		var modules = [
			progress,
			selection
		];
		
		for (var i in modules) {
			modules[i].init(scriptManager);
		}
	}
})();