import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';

import { selectProduct, startCrafting } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

/**
 * @author Greco
 * @since 01/07/2017
 */
_events.bindEventListener(EventType.OPLOC2, [ 25824, 66850 ], (ctx) => {
 	selectSpinningWheelProduct(ctx.player);
 });

 function selectSpinningWheelProduct (player: Player) {
 	selectProduct(player, -1, -1, 7046, -1, "");//TODO: Find category name
 	setResumeHandler(player, () => {
 		closeAllWidgets(player);
 		var productId = varp(player, 1170);
 		var amount = varbit(player, 1003);
 		if (amount) {
 			setVarp(player, 1175, productId);
 			//TODO: Check message
 			var text = "You spin the item.";
 			startCrafting(player, amount, 1563, text);
 		}
 	});
 }
