/**
 *  Module to initialise the make-X interface script bindings.
 */
var progress = require('./progress');
var selection = require('./selection');

module.exports = (function () {
	return {
		startCrafting : progress.startCrafting,
		selectProduct : selection.selectProduct,
		makeItem : progress.makeItem
	};
	
})();