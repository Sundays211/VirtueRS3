/**
 * Module to initialise the clan system script bindings.
 * We use a bootstrap.js file here so we can tell the engine which scripts need initialising and which don't
 */

module.exports = function (scriptManager) {
	require('./clan-chat')(scriptManager);
	require('./clan-settings')(scriptManager);
	require('./clan-vex')(scriptManager);
	require('./clan-camp')(scriptManager);
	require('./clan-admin-messages')(scriptManager);
	require('./clan-motif-editor')(scriptManager);
	require('./clan-commands')(scriptManager);
};