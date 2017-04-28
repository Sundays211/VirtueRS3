/**
 * A wrapper around the core Java API
 */
module.exports = init();

function init () {
	var utils = {
		defaultHandler : defaultHandler
	}
	return utils;
}

function defaultHandler (ctx, type) {
	
	if (api.isAdmin(ctx.player)) {
		ENGINE.sendMessage(ctx.player, "Unhandled "+(type?type:"interface")+" button: "+ctx.toString());
	} else {
		ENGINE.sendMessage(ctx.player, "Nothing interesting happens.");
	}
};