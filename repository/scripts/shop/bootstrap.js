/**
 * Module to initialise the shop system script bindings.
 */

module.exports = function (scriptManager) {
	require('./shop-widget')(scriptManager);
	require('./magestix')(scriptManager);
	require('./thessalia')(scriptManager);
	require('./misc-shops')(scriptManager);
};