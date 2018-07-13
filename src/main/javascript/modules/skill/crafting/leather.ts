import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';

import { setResumeHandler } from 'shared/dialog';
import { selectProduct, startCrafting } from 'shared/makex';
import { closeAllWidgets } from 'shared/widget';

/**
 * @author Greco
 * @since 01/04/2017
 */
_events.bindEventListener(EventType.OPHELD1, 1741, (ctx) => {
	selectLeatherCraft(ctx.player, 6991, 25594);//Leather
});

_events.bindEventListener(EventType.OPHELD1, 1743, (ctx) => {
	selectLeatherCraft(ctx.player, 6991, 25594);//Hard leather
});

_events.bindEventListener(EventType.OPHELD1, 25545, (ctx) => {
	selectLeatherCraft(ctx.player, 7002, 25594);//Imphide
});

_events.bindEventListener(EventType.OPHELD1, 25547, (ctx) => {
	selectLeatherCraft(ctx.player, 7001, 25594);//Spider silk
});

_events.bindEventListener(EventType.OPHELD1, 25551, (ctx) => {
	selectLeatherCraft(ctx.player, 7003, 25594);//Carapace
});

_events.bindEventListener(EventType.OPHELD1, 25549, (ctx) => {
	selectLeatherCraft(ctx.player, 7000, 25594);//Batwing
});

_events.bindEventListener(EventType.OPHELD1, 6289, (ctx) => {
	selectLeatherCraft(ctx.player, 6992, 25594);//Snakeskin
});

_events.bindEventListener(EventType.OPHELD1, 1745, (ctx) => {
	selectLeatherCraft(ctx.player, 6993, 25594);//Green Dragonhide
});

_events.bindEventListener(EventType.OPHELD1, 2505, (ctx) => {
	selectLeatherCraft(ctx.player, 6994, 25594);//Blue Dragonhide
});

_events.bindEventListener(EventType.OPHELD1, 2507, (ctx) => {
	selectLeatherCraft(ctx.player, 6995, 25594);//Red Dragonhide
});

_events.bindEventListener(EventType.OPHELD1, 2509, (ctx) => {
	selectLeatherCraft(ctx.player, 6996, 25594);//Black Dragonhide
});

_events.bindEventListener(EventType.OPHELD1, 24374, (ctx) => {
	selectLeatherCraft(ctx.player, 6997, 25594);//Royal Dragonhide
});

_events.bindEventListener(EventType.OPHELD1, [10818, 10820], (ctx) => {
	selectLeatherCraft(ctx.player, 6998, 25594);//Yak-Hide
});

_events.bindEventListener(EventType.OPHELD1, 10113, (ctx) => {
	selectLeatherCraft(ctx.player, 6999, 25594);//Enhanced Armour
});

function selectLeatherCraft(player: Player, category: number, animationId: number) {
	selectProduct(player, 6987, 6988, category);
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var productId = varp(player, 1170) as number;
		var amount = varbit(player, 1003);
		if (amount) {
			setVarp(player, 1175, productId);
			//TODO: Check message
			var text = "You craft the hide into " + _config.objName(productId);
			startCrafting(player, amount, animationId, text);
		}
	});
}
