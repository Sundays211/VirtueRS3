/**
 * A wrapper around the core Java API
 */
module.exports = init();

function init () {
	var apiWrapper = {
		defaultHandler : defaultHandler,
		compHash : compHash
	}
	return api;
}

function defaultHandler (ctx, type) {
	if (type == EventType.IF_BUTTON) {
		if (api.isAdmin(ctx.player)) {
			api.sendMessage(ctx.player, "Unhandled "+(type?type:"interface")+" button: comp="+ctx.component+", ctx="+args.slot+", ctx="+args.button);
		} else {
			api.sendMessage(ctx.player, "Nothing interesting happens.");
		}
	}
};

function compHash (iface, comp) {
	return (iface << 16) | comp;
}