/**
 * Module to initialise the agility script bindings.
 */

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		require('./agility-pyramid')(scriptManager);
		require('./gnome-agility-course')(scriptManager);
	}
})();