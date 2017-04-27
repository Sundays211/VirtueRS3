/**
 * 
 */
var api = require('../core/api');
var broadcasts = require('./logic/broadcasts');

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 573, function (ctx) {
		api.setWidgetEvents(ctx.player, 573, 59, 0, 126, 2);//Rank select dropdown option
		api.setWidgetEvents(ctx.player, 573, 5, 0, 30, 2);//Selected rank dropdown
		api.setWidgetEvents(ctx.player, 573, 20, 0, 30, 2);//Enable specific
		api.setWidgetEvents(ctx.player, 573, 19, 0, 6, 2);//Enable category
		load(ctx.player);
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, api.compHash(573, 71), function (ctx) {
		setAll(ctx.player, 1);//Enable all
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, api.compHash(573, 65), function (ctx) {
		setAll(ctx.player, 0);//Disable all
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, api.compHash(573, 19), function (ctx) {
		var category = api.getEnumValue(8661, ctx.slot);//Enable category
		enableCategory(ctx.player, category);
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, api.compHash(573, 20), function (ctx) {
		var messageType = api.getEnumValue(8659, ctx.slot);//Enable specific
		if (messageType != -1) {
			var enabled = broadcasts.isEnabled(ctx.player, messageType);
			broadcasts.setEnabled(ctx.player, messageType, enabled ? 0 : 1);
		} else {
			throw new Error("Message type not found for slot "+ctx.slot);
		}
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, api.compHash(573, 5), function (ctx) {
		var rank = api.getEnumValue(8659, ctx.slot);//Select rank dropdown
		api.setVarp(ctx.player, 4285, ctx.rank);
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, api.compHash(573, 59), function (ctx) {
		broadcasts.setMinimumVisibleRank(ctx.player, api.getVarp(player, 4285), ctx.slot);//Select rank
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, api.compHash(573, 47), function (ctx) {
		save(ctx.player);//Confirm save
		api.closeWidget(ctx.player, 1477, 326);
		api.openWidget(ctx.player, 1477, 326, 573, false);
	});
}

function load (player) {
	api.setVarp(player, 4276, getValue(api.getVarClanSetting(player, 5), 0));
	api.setVarp(player, 4277, getValue(api.getVarClanSetting(player, 6), 0));
	api.setVarp(player, 4278, getValue(api.getVarClanSetting(player, 7), 0));
	api.setVarp(player, 4279, getValue(api.getVarClanSetting(player, 8), 0));
	api.setVarp(player, 4280, getValue(api.getVarClanSetting(player, 9), 0));
	api.setVarp(player, 4281, getValue(api.getVarClanSetting(player, 10), 0));
	api.setVarp(player, 4282, getValue(api.getVarClanSetting(player, 11), 0));
	api.setVarp(player, 4283, getValue(api.getVarClanSetting(player, 12), 0));
	api.setVarp(player, 4284, getValue(api.getVarClanSetting(player, 14), 0));
}

function getValue (value, def) {
	return value ? def : value;
}

function save (player) {
	if (ClanPermissions.canChangeBroadcasts(player, clanApi.getRank(api.getClanHash(player), api.getUserHash(player)))) {
		api.setVarClanSetting(player, 5, api.getVarp(player, 4276));
		api.setVarClanSetting(player, 6, api.getVarp(player, 4277));
		api.setVarClanSetting(player, 7, api.getVarp(player, 4278));
		api.setVarClanSetting(player, 8, api.getVarp(player, 4279));
		api.setVarClanSetting(player, 9, api.getVarp(player, 4280));
		api.setVarClanSetting(player, 10, api.getVarp(player, 4281));
		api.setVarClanSetting(player, 11, api.getVarp(player, 4282));
		api.setVarClanSetting(player, 12, api.getVarp(player, 4283));
		api.setVarClanSetting(player, 14, api.getVarp(player, 4284));
		api.setVarp(player, 4286, -1);
		clanApi.sendBroadcast(api.getClanHash(player), 28, ["[Player A]"], [api.getName(player)]);
	}
}

function setAll (player, enabled) {
	for (var i=0; i<api.getEnumSize(8660);i++) {
		broadcasts.setEnabled(player, api.getStructParam(api.getEnumValue(8660, i), 4186), enabled);
	}
}
function enableCategory (player, category) {
	var structId;
	for (var i=0; i<api.getEnumSize(8660);i++) {
		structId = api.getEnumValue(8660, i);
		if (api.getStructParam(structId, 418) == category) {
			broadcasts.setEnabled(player, api.getStructParam(structId, 4186), 1);
		}
	}
}