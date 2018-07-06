import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import _entity from 'engine/entity';
import { varp, setVarp } from 'engine/var';

import _component from 'shared/widget/component';
import { Player } from 'engine/models';
import { setWidgetEvents, openWidget } from 'shared/widget';
import { getOrDefault, getUserHash } from 'shared/util';

import { setBroadcastEnabled, isBroadcastEnabled, setBroadcastMinimumVisibleRank, sendClanBroadcast } from './logic/broadcasts';
import { canChangeBroadcasts } from './logic/permissions';
import { getClanRank, getClanHash } from './logic/core';

_events.bindEventListener(EventType.IF_OPEN, 573, (ctx) => {
	setWidgetEvents(ctx.player, 573, 59, 0, 126, 2);//Rank select dropdown option
	setWidgetEvents(ctx.player, 573, 5, 0, 30, 2);//Selected rank dropdown
	setWidgetEvents(ctx.player, 573, 20, 0, 30, 2);//Enable specific
	setWidgetEvents(ctx.player, 573, 19, 0, 6, 2);//Enable category
	load(ctx.player);
});

_events.bindEventListener(EventType.IF_BUTTON1, _component(573, 71), (ctx) => {
	setAll(ctx.player, true);//Enable all
});

_events.bindEventListener(EventType.IF_BUTTON1, _component(573, 65), (ctx) => {
	setAll(ctx.player, false);//Disable all
});

_events.bindEventListener(EventType.IF_BUTTON1, _component(573, 19), (ctx) => {
	var category = _config.enumValue(8661, ctx.slot) as number;//Enable category
	enableCategory(ctx.player, category);
});

_events.bindEventListener(EventType.IF_BUTTON1, _component(573, 20), (ctx) => {
	var messageType = _config.enumValue(8659, ctx.slot) as number;//Enable specific
	if (messageType !== -1) {
		var enabled = isBroadcastEnabled(ctx.player, messageType);
		setBroadcastEnabled(ctx.player, messageType, !enabled);
	} else {
		throw new Error("Message type not found for slot " + ctx.slot);
	}
});

_events.bindEventListener(EventType.IF_BUTTON1, _component(573, 5), (ctx) => {
	var rank = _config.enumValue(8659, ctx.slot);//Select rank dropdown
	setVarp(ctx.player, 4285, rank);
});

_events.bindEventListener(EventType.IF_BUTTON1, _component(573, 59), (ctx) => {
	setBroadcastMinimumVisibleRank(ctx.player, varp(ctx.player, 4285) as number, ctx.slot);//Select rank
});

_events.bindEventListener(EventType.IF_BUTTON1, _component(573, 47), (ctx) => {
	save(ctx.player);//Confirm save
	ENGINE.closeWidget(ctx.player, 1477, 326);
	openWidget(ctx.player, 1477, 326, 573, false);
});

function load(player: Player) {
	setVarp(player, 4276, getOrDefault(ENGINE.getVarClanSetting(player, 5), 0));
	setVarp(player, 4277, getOrDefault(ENGINE.getVarClanSetting(player, 6), 0));
	setVarp(player, 4278, getOrDefault(ENGINE.getVarClanSetting(player, 7), 0));
	setVarp(player, 4279, getOrDefault(ENGINE.getVarClanSetting(player, 8), 0));
	setVarp(player, 4280, getOrDefault(ENGINE.getVarClanSetting(player, 9), 0));
	setVarp(player, 4281, getOrDefault(ENGINE.getVarClanSetting(player, 10), 0));
	setVarp(player, 4282, getOrDefault(ENGINE.getVarClanSetting(player, 11), 0));
	setVarp(player, 4283, getOrDefault(ENGINE.getVarClanSetting(player, 12), 0));
	setVarp(player, 4284, getOrDefault(ENGINE.getVarClanSetting(player, 14), 0));
}

function save(player: Player) {
	if (canChangeBroadcasts(player, getClanRank(player))) {
		ENGINE.setVarClanSetting(player, 5, varp(player, 4276));
		ENGINE.setVarClanSetting(player, 6, varp(player, 4277));
		ENGINE.setVarClanSetting(player, 7, varp(player, 4278));
		ENGINE.setVarClanSetting(player, 8, varp(player, 4279));
		ENGINE.setVarClanSetting(player, 9, varp(player, 4280));
		ENGINE.setVarClanSetting(player, 10, varp(player, 4281));
		ENGINE.setVarClanSetting(player, 11, varp(player, 4282));
		ENGINE.setVarClanSetting(player, 12, varp(player, 4283));
		ENGINE.setVarClanSetting(player, 14, varp(player, 4284));
		setVarp(player, 4286, -1);
		sendClanBroadcast(getClanHash(player), 28, ["[Player A]"], [_entity.getName(player)]);
	}
}

function setAll(player: Player, enabled: boolean) {
	for (var i = 0; i < _config.enumSize(8660); i++) {
		const type = _config.structParam(_config.enumValue(8660, i) as number, 4186) as number;
		setBroadcastEnabled(player, type, enabled);
	}
}
function enableCategory(player: Player, category: number) {
	let structId;
	for (var i = 0; i < _config.enumSize(8660); i++) {
		structId = _config.enumValue(8660, i) as number;
		if (_config.structParam(structId, 418) === category) {
			setBroadcastEnabled(player, _config.structParam(structId, 4186) as number, true);
		}
	}
}
