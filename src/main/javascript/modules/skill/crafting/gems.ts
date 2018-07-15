import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import { varp, varbit, setVarp } from 'engine/var';
import { Player } from 'engine/models';

import { setResumeHandler } from 'shared/dialog';
import { selectProduct, startCrafting } from 'shared/makex';
import { closeAllWidgets } from 'shared/widget';

/**
 * @author Greco
 * @since 01/04/2017
 */
_events.bindEventListener(EventType.OPHELD1, 1625, (ctx) => {
	selectGem(ctx.player, 6983, 1609);//Opal
});

_events.bindEventListener(EventType.OPHELD1, 1627, (ctx) => {
	selectGem(ctx.player, 6983, 1611);//Jade
});

_events.bindEventListener(EventType.OPHELD1, 1629, (ctx) => {
	selectGem(ctx.player, 6983, 1613);//Red topaz
});

_events.bindEventListener(EventType.OPHELD1, 1623, (ctx) => {
	selectGem(ctx.player, 6983, 1607);//Sapphire
});

_events.bindEventListener(EventType.OPHELD1, 1621, (ctx) => {
	selectGem(ctx.player, 6983, 1605);//Emerald
});

_events.bindEventListener(EventType.OPHELD1, 1619, (ctx) => {
	selectGem(ctx.player, 6983, 1603);//Ruby
});

_events.bindEventListener(EventType.OPHELD1, 1617, (ctx) => {
	selectGem(ctx.player, 6983, 1601);//Diamond
});

_events.bindEventListener(EventType.OPHELD1, 1631, (ctx) => {
	selectGem(ctx.player, 6983, 1615);//Dragonstone
});

_events.bindEventListener(EventType.OPHELD1, 1631, (ctx) => {
	selectGem(ctx.player, 6983, 1615);//Dragonstone
});

_events.bindEventListener(EventType.OPHELD1, 6571, (ctx) => {
	selectGem(ctx.player, 6983, 6573);//Onyx
});

_events.bindEventListener(EventType.OPHELD1, 31853, (ctx) => {
	selectGem(ctx.player, 6983, 31855);//Hydrix
});

_events.bindEventListener(EventType.OPHELD2, 2859, (ctx) => {
	selectGem(ctx.player, 6961, 2861);//Wolf bone arrowheads
});

_events.bindEventListener(EventType.OPHELD1, 1609, (ctx) => {
	selectGem(ctx.player, 6961, 45);//Opal bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 1611, (ctx) => {
	selectGem(ctx.player, 6961, 9187);//Jade bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 411, (ctx) => {
	selectGem(ctx.player, 6961, 46);//Pearl bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 413, (ctx) => {
	selectGem(ctx.player, 6961, 25480);//Pearl bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 1613, (ctx) => {
	selectGem(ctx.player, 6961, 9188);//Topaz bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 1607, (ctx) => {
	selectGem(ctx.player, 6961, 9189);//Sapphire bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 1605, (ctx) => {
	selectGem(ctx.player, 6961, 9190);//Emerald bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 1603, (ctx) => {
	selectGem(ctx.player, 6961, 9191);//Ruby bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 1601, (ctx) => {
	selectGem(ctx.player, 6961, 9192);//Diamond bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 1615, (ctx) => {
	selectGem(ctx.player, 6961, 9193);//Dragon bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 6573, (ctx) => {
	selectGem(ctx.player, 6961, 9194);//Onyx bolt tips
});

_events.bindEventListener(EventType.OPHELD1, 31855, (ctx) => {
	selectGem(ctx.player, 6961, 31867);//Hydrix bolt tips
});

function selectGem(player: Player, category: number, productId: number) {
	selectProduct(player, 6981, 6982, category, productId);
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var selectedCategory = varp(player, 1169);
		var selectedProduct = varp(player, 1170) as number;
		var amount = varbit(player, 1003);
		if (amount) {
			switch (selectedCategory) {
				case 6983:
					cutGem(player, selectedProduct, amount);
					return;
				case 6961:
					makeTips(player, selectedProduct, amount);
					return;
				default:
					throw "Unsupported category: " + selectedCategory;
			}
		}
	});
}

function cutGem(player: Player, gemId: number, amount: number) {
	setVarp(player, 1175, gemId);
	var animId = getAnimId(gemId);
	var text = "You cut the " + _config.objName(_config.objParam(gemId, 2655) as number);
	startCrafting(player, amount, animId, text);
}


function makeTips(player: Player, tipId: number, amount: number) {
	setVarp(player, 1175, tipId);
	var animId = getAnimId(_config.objParam(tipId, 2655) as number);
	var text = "You cut the " + _config.objName(tipId);
	startCrafting(player, amount, animId, text);
}

function getAnimId(gemId: number): number {
	switch (gemId) {
		case 1607://Sapphire
			return 22774;
		case 1605://Emerald
			return 22775;
		case 1603://Ruby
			return 22776;
		case 1601://Diamond
			return 22777;
		case 1609://Opal
			return 22778;
		case 1611://Jade
			return 22779;
		case 1613://Red topaz
			return 22780;
		case 1615://Dragonstone
			return 22781;
		case 6573://Onyx
			return 22782;
		case 31855://Hydrix
			return 24309;
		default:
			return 22784;
	}
}
