/**
 * Module to initialise the runecrafting script bindings.
 */

module.exports = function (scriptManager) {
	require('./runecrafting-alter')(scriptManager);
	require('./mysterious-runes')(scriptManager);
	require('./exit-portal')(scriptManager);
};