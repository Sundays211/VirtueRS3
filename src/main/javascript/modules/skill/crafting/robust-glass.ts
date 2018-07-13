import { EventType } from 'engine/enums';
import _events from 'engine/events';
import _map from 'engine/map';
import { Player, Location } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';

import { selectProduct, startCrafting } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

/**
 * @author Greco
 * @since 06/12/2018
 */
_events.bindEventListener(EventType.OPLOC1, [94067], (ctx) => {
	selectRobustGlassProduct(ctx.player, ctx.location);
});

_events.bindEventListener(EventType.OPLOC1, [2331, 67968], (ctx) => {
	selectElfRobustGlassProduct(ctx.player, ctx.location);
});

function selectRobustGlassProduct(player: Player, location: Location) {
	selectProduct(player, -1, -1, 6979, -1, "Robust Glass");
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var productId = varp(player, 1170);
		var amount = varbit(player, 1003);
		if (amount) {
			setVarp(player, 1175, productId);
			var text = "You make an item.";
			startCrafting(player, amount, 25120, text);
			_map.locAnim(location, 25041);
		}
	});
}

function selectElfRobustGlassProduct(player: Player, location: Location) {
	selectProduct(player, -1, -1, 9467, -1, "Robust Glass");
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var productId = varp(player, 1170);
		var amount = varbit(player, 1003);
		if (amount) {
			setVarp(player, 1175, productId);
			//TODO: Check message
			var text = "You make an item.";
			startCrafting(player, amount, 25041, text);
			_map.locAnim(location, 25041);
		}
	});
}
