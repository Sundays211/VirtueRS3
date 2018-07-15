import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';

import { selectProduct, startCrafting } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

/**
 * @author Greco
 * @since 06/12/2018
 */
_events.bindEventListener(EventType.OPHELD1, 31718, (ctx) => {
	selectNoxiousWeaponProduct(ctx.player);
});

_events.bindEventListener(EventType.OPHELD1, 31719, (ctx) => {
	selectNoxiousWeaponProduct(ctx.player);
});

_events.bindEventListener(EventType.OPHELD1, 31720, (ctx) => {
	selectNoxiousWeaponProduct(ctx.player);
});

_events.bindEventListener(EventType.OPHELD1, 31722, (ctx) => {
	selectNoxiousWeaponProduct(ctx.player);
});

_events.bindEventListener(EventType.OPHELD1, 31723, (ctx) => {
	selectNoxiousWeaponProduct(ctx.player);
});

_events.bindEventListener(EventType.OPHELD1, 31724, (ctx) => {
	selectNoxiousWeaponProduct(ctx.player);
});

function selectNoxiousWeaponProduct(player: Player) {
	selectProduct(player, -1, -1, 9056, -1, "Noxious");
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var productId = varp(player, 1170);
		var amount = varbit(player, 1003);
		if (amount) {
			setVarp(player, 1175, productId);
			var text = "You create a noxious item.";
			startCrafting(player, amount, 25594, text);
		}
	});
}
