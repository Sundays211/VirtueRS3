/**
 * @author Greco
 * @since 01/07/2017
 */
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models'; 
import { varp, varbit, setVarp } from 'engine/var';
import _config from 'engine/config';
 
import { selectProduct, startCrafting } from 'shared/makex'; 
import { closeAllWidgets } from 'shared/widget';
import { setResumeHandler } from 'shared/dialog';

_events.bindEventListener(EventType.OPLOC1, [ 114, 5275, 24283, 34546, 61333, 63209, 66892, 76295, 94064 ], (ctx) => {
	startCooking(ctx.player);
});

function startCooking (player: Player) {
	selectProduct(player, 6794, 6795, 6797);
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var productId = varp(player, 1170) as number;
		var amount = varbit(player, 1003);
		if (amount) {
			setVarp(player, 1175, productId);
			var text = "You cook the "+_config.objName(productId);
			startCrafting(player, amount, 25650, text);
		}
	});
}