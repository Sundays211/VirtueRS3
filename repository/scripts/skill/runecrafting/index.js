/**
 * Module to initialise the runecrafting script bindings.
 */

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		require('./runecrafting-alter')(scriptManager);
		require('./mysterious-runes')(scriptManager);
		require('./exit-portal')(scriptManager);
	}
})();