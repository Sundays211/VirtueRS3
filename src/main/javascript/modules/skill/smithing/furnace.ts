/**
 * @author Greco
 * @since 12/23/2016
 */
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';
import _config from 'engine/config';

import { selectProduct, startCrafting } from 'shared/makex'; 
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

_events.bindEventListener(EventType.OPLOC2, [ 11666, 45310, 61330, 67465, 67466, 67467, 76293 ], (ctx) => {
	startSmelting(ctx.player);
});
	
function startSmelting (player: Player) {
	selectProduct(player, 7079, 7080, 7083);
	setResumeHandler(player, () => {
	    closeAllWidgets(player);
	    var productId = varp(player, 1170) as number;
	    var amount = varbit(player, 1003);
	    if (amount) {
		    setVarp(player, 1175, productId);
			//TODO: Use correct message
			var text = "You smelt the "+_config.objName(productId);
			startCrafting(player, amount, 22142, text);
	    }
	});
}		