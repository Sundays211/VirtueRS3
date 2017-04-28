/**
 * 
 */
var util = require('../core/util');
var widget = require('../core/widget');
var config = require('../core/config');
var clan = require('./logic/core');
var broadcasts = require('./logic/broadcasts');
var permissions = require('./logic/permissions');

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 573, function (ctx) {
		widget.setEvents(ctx.player, 573, 59, 0, 126, 2);//Rank select dropdown option
		widget.setEvents(ctx.player, 573, 5, 0, 30, 2);//Selected rank dropdown
		widget.setEvents(ctx.player, 573, 20, 0, 30, 2);//Enable specific
		widget.setEvents(ctx.player, 573, 19, 0, 6, 2);//Enable category
		load(ctx.player);
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, widget.getHash(573, 71), function (ctx) {
		setAll(ctx.player, 1);//Enable all
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, widget.getHash(573, 65), function (ctx) {
		setAll(ctx.player, 0);//Disable all
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, widget.getHash(573, 19), function (ctx) {
		var category = config.enumValue(8661, ctx.slot);//Enable category
		enableCategory(ctx.player, category);
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, widget.getHash(573, 20), function (ctx) {
		var messageType = config.enumValue(8659, ctx.slot);//Enable specific
		if (messageType != -1) {
			var enabled = broadcasts.isEnabled(ctx.player, messageType);
			broadcasts.setEnabled(ctx.player, messageType, enabled ? 0 : 1);
		} else {
			throw new Error("Message type not found for slot "+ctx.slot);
		}
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, widget.getHash(573, 5), function (ctx) {
		var rank = config.enumValue(8659, ctx.slot);//Select rank dropdown
		ENGINE.setVarp(ctx.player, 4285, ctx.rank);
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, widget.getHash(573, 59), function (ctx) {
		broadcasts.setMinimumVisibleRank(ctx.player, ENGINE.getVarp(player, 4285), ctx.slot);//Select rank
	});
	
	scriptManager.bind(EventType.IF_BUTTON1, widget.getHash(573, 47), function (ctx) {
		save(ctx.player);//Confirm save
		ENGINE.closeWidget(ctx.player, 1477, 326);
		widget.open(ctx.player, 1477, 326, 573, false);
	});

	function load (player) {
		ENGINE.setVarp(player, 4276, getValue(api.getVarClanSetting(player, 5), 0));
		ENGINE.setVarp(player, 4277, getValue(api.getVarClanSetting(player, 6), 0));
		ENGINE.setVarp(player, 4278, getValue(api.getVarClanSetting(player, 7), 0));
		ENGINE.setVarp(player, 4279, getValue(api.getVarClanSetting(player, 8), 0));
		ENGINE.setVarp(player, 4280, getValue(api.getVarClanSetting(player, 9), 0));
		ENGINE.setVarp(player, 4281, getValue(api.getVarClanSetting(player, 10), 0));
		ENGINE.setVarp(player, 4282, getValue(api.getVarClanSetting(player, 11), 0));
		ENGINE.setVarp(player, 4283, getValue(api.getVarClanSetting(player, 12), 0));
		ENGINE.setVarp(player, 4284, getValue(api.getVarClanSetting(player, 14), 0));
	}

	function getValue (value, def) {
		return value ? def : value;
	}

	function save (player) {
		if (permissions.canChangeBroadcasts(player, clan.getRank(clan.getHash(player), api.getUserHash(player)))) {
			api.setVarClanSetting(player, 5, ENGINE.getVarp(player, 4276));
			api.setVarClanSetting(player, 6, ENGINE.getVarp(player, 4277));
			api.setVarClanSetting(player, 7, ENGINE.getVarp(player, 4278));
			api.setVarClanSetting(player, 8, ENGINE.getVarp(player, 4279));
			api.setVarClanSetting(player, 9, ENGINE.getVarp(player, 4280));
			api.setVarClanSetting(player, 10, ENGINE.getVarp(player, 4281));
			api.setVarClanSetting(player, 11, ENGINE.getVarp(player, 4282));
			api.setVarClanSetting(player, 12, ENGINE.getVarp(player, 4283));
			api.setVarClanSetting(player, 14, ENGINE.getVarp(player, 4284));
			ENGINE.setVarp(player, 4286, -1);
			broadcasts.send(clan.getHash(player), 28, ["[Player A]"], [api.getName(player)]);
		}
	}

	function setAll (player, enabled) {
		for (var i=0; i < config.enumSize(8660); i++) {
			broadcasts.setEnabled(player, config.structParam(config.enumValue(8660, i), 4186), enabled);
		}
	}
	function enableCategory (player, category) {
		var structId;
		for (var i=0; i < config.enumSize(8660); i++) {
			structId = config.enumValue(8660, i);
			if (config.structParam(structId, 418) == category) {
				broadcasts.setEnabled(player, config.structParam(structId, 4186), 1);
			}
		}
	}
}