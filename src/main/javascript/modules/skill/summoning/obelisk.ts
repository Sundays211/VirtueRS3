/**
 * @author Greco
 * @since 12/10/2016
 */
import { EventType } from "engine/enums";
import _events from "engine/events";
import { varp, varbit } from "engine/var"; 
import { Player } from 'engine/models';


import { runAnim } from "shared/anim";
import { makeItem, selectProduct } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

_events.bindEventListener(EventType.OPLOC1, [ 67036, 94230 ], (ctx) => {
	startSummoning(ctx.player);
});
 		
function startSummoning (player: Player) {
	selectProduct(player, 6932, 6933, 6934);
	setResumeHandler(player, () => {
	    closeAllWidgets(player);
	    var productId = varp(player, 1170) as number;
	    var amount = varbit(player, 1003) as number;
	    if (amount) {
		    createPouches(player, productId, amount);
	    }
	});
}

function createPouches (player: Player, productId: number, amount: number) {
	makeItem(player, productId, amount);
	runAnim(player, 8500);
}