import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';

import { selectProduct, startCrafting } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

const TECTONIC_ENERGY = 28627;

/**
 * @author Greco
 * @since 06/12/2018
 */
_events.bindEventListener(EventType.OPHELD1, TECTONIC_ENERGY, (ctx) => {
 	selectTectonicProduct(ctx.player);
 });

 function selectTectonicProduct (player: Player) {
 	selectProduct(player, -1, -1, 7512, -1, "Tectonic");
 	setResumeHandler(player, () => {
 		closeAllWidgets(player);
 		var productId = varp(player, 1170);
 		var amount = varbit(player, 1003);
 		if (amount) {
 			setVarp(player, 1175, productId);
 			var text = "You create a tectonic item.";
 			startCrafting(player, amount, 25594, text);
 		}
 	});
 }
