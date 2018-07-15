import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { varp, varbit } from 'engine/var';
import { Player } from 'engine/models';

import { makeItem, selectProduct } from 'shared/makex';
import { closeAllWidgets } from 'shared/widget';
import { setResumeHandler } from 'shared/dialog';

/**
 * @author Greco
 * @since 01/07/2017
 */
_events.bindEventListener(EventType.OPNPC3, 2824, (ctx) => {
 	selectHides(ctx.player);
 });

_events.bindEventListener(EventType.OPNPC4, 14877, (ctx) => {
 	selectHides(ctx.player);
 });

 function selectHides (player: Player) {
 	selectProduct(player, -1, -1, 6989, -1, "Tanner");
 	setResumeHandler(player, () => {
 		closeAllWidgets(player);
 		var productId = varp(player, 1170) as number;
 		var amount = varbit(player, 1003);
 		if (amount) {
 			makeItem(player, productId, amount);
 		}
 	});
 }
