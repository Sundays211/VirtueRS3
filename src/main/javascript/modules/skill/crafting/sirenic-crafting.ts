import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';

import { selectProduct, startCrafting } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

const SIRENIC_SCALE = 29863;

/**
 * @author Greco
 * @since 06/12/2018
 */
_events.bindEventListener(EventType.OPHELD1, SIRENIC_SCALE, (ctx) => {
 	selectSirenicProduct(ctx.player);
 });

function selectSirenicProduct (player: Player) {
	selectProduct(player, -1, -1, 8002, -1, "Sirenic");
	setResumeHandler(player, function () {
		closeAllWidgets(player);
		var productId = varp(player, 1170);
		var amount = varbit(player, 1003);
		if (amount) {
			setVarp(player, 1175, productId);
			var text = "You create a sirenic item.";
			startCrafting(player, amount, 25594, text);
		}
	});
}
