/**
 * Module to initialise the kandarin system script bindings.
 */
module.exports = function (scriptManager) {
	var modules = [
        require('./acantha'),
		require('./aubury'),
		require('./bogrog'),
		require('./isidor'),
		require('./sanfew'),
		require('./sedridor'),
		require('./thormac'),
		require('./timmy'),
		require('./traiborn'),
		require('./wizard-distentor'),
		require('./wizard-korvak'),
		require('./wizard-mizgog'),
		require('./wizard-shug'),
		require('./wizard-sioncorn'),
		require('./wizard-vief'),
		require('./zavistic-rarve'),
		require('./zimberfizz')
	];
	
	for (var i in modules) {
		modules[i].init(scriptManager);
	}
};