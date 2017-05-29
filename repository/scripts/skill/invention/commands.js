/* globals EventType */
var workbench = require('./workbench');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND, [ "invent", "manufacture" ], function (ctx) {
			//varp 5091 = Max integer value
			//need to fix craft progress so it can check and remove materials from the invention material widget
			workbench.selectInventionProduct(ctx.player);
		});
	}
})();
