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
import { mesbox} from 'shared/dialog';
import { hasFinished } from '../../quest';

_events.bindEventListener(EventType.OPLOC1, [ 2783, 12692, 67468 ], (ctx) => {
	startSmithing(ctx.player);
});
//find out when you can use them
//26822 coords 0 39 52 2 3
//49036 coords 0 41 53 16 27
//4306 coords 0 40 57 59 17
_events.bindEventListener(EventType.OPLOC1, 78040, async (ctx) => {//Doric's anvil
	if(hasFinished(ctx.player, 207)) {
		startSmithing(ctx.player);
	} else {
		await mesbox(ctx.player, "You can't use the anvil until you finish helping Doric.");
	}
});		
		

function startSmithing (player: Player) {
	selectProduct(player, 7081, 7082, 7085);
	setResumeHandler(player, () => {
	    closeAllWidgets(player);
	    var productId = varp(player, 1170) as number;
	    var amount = varbit(player, 1003);
	    if (amount) {
		    setVarp(player, 1175, productId);
			//TODO: Use correct message
			var text = "You smith the "+_config.objName(productId);
			startCrafting(player, amount, 22143, text);
	    }
	});
}	