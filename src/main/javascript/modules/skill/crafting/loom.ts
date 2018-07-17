import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';

import { selectProduct, startCrafting } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

/**
 * @author Greco
 * @since 03/01/2017
 */
_events.bindEventListener(EventType.OPLOC1, [66849], (ctx) => {
	selectLoomProduct(ctx.player);
});

_events.bindEventListener(EventType.OPLOC2, [85047], (ctx) => {
	selectLoomProduct(ctx.player);
});

function selectLoomProduct(player: Player) {
	selectProduct(player, 7042, 7043, 7044);
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var productId = varp(player, 1170);
		var amount = varbit(player, 1003);
		if (amount) {
			setVarp(player, 1175, productId);
			//TODO: Check message
			var text = "You weave the materials together.";
			startCrafting(player, amount, 2270, text);
		}
	});
}
