import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';

import { selectProduct, startCrafting } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

/**
 * @author Greco
 * @since 01/06/2017
 */
_events.bindEventListener(EventType.OPLOC1, [66848], (ctx) => {
	selectPotteryWheelProduct(ctx.player);
});

function selectPotteryWheelProduct(player: Player) {
	selectProduct(player, 7004, 7005, 7014);
	setResumeHandler(player, function() {
		closeAllWidgets(player);
		var productId = varp(player, 1170);
		var amount = varbit(player, 1003);
		if (amount) {
			setVarp(player, 1175, productId);
			//TODO: Check message
			var text = "You make an item.";
			startCrafting(player, amount, 883, text);
		}
	});
}
