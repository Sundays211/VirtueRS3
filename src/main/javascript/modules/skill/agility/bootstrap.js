/**
 * Module to initialise the agility script bindings.
 */

module.exports = function (scriptManager) {
	require('./agility-pyramid')(scriptManager);
	require('./gnome-agility-course')(scriptManager);
};