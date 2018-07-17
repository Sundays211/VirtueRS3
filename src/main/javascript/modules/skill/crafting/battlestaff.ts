import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { Player } from 'engine/models';
import { varp, varbit, setVarp } from 'engine/var';
import { selectProduct, startCrafting } from 'shared/makex';
import { setResumeHandler } from 'shared/dialog';
import { closeAllWidgets } from 'shared/widget';

/**
 * @author Greco
 * @since 01/04/2017
 */
_events.bindEventListener(EventType.OPHELD1, 573, (ctx) => {
	selectBattlestaff(ctx.player, 1397);//Air battlestaff
});

_events.bindEventListener(EventType.OPHELD1, 571, (ctx) => {
	selectBattlestaff(ctx.player, 1395);//Water battlestaff
});

_events.bindEventListener(EventType.OPHELD1, 575, (ctx) => {
	selectBattlestaff(ctx.player, 1399);//Earth battlestaff
});

_events.bindEventListener(EventType.OPHELD1, 569, (ctx) => {
	selectBattlestaff(ctx.player, 1393);//Fire battlestaff
});

_events.bindEventListener(EventType.OPHELD1, 21775, (ctx) => {
	selectBattlestaff(ctx.player, 21777);//Armadyl battlestaff
});


function selectBattlestaff(player: Player, productId: number) {
	selectProduct(player, -1, -1, 6974, productId, "Battlestaves");
	setResumeHandler(player, () => {
		closeAllWidgets(player);
		var staffId = varp(player, 1170) as number;
		var amount = varbit(player, 1003);
		if (amount) {
			craftBattlestaves(player, staffId, amount);
		}
	});
}

function craftBattlestaves(player: Player, staffId: number, amount: number) {
	setVarp(player, 1175, staffId);
	var text, animationId;
	switch (staffId) {
		case 1397:
			text = "You make an Air battlestaff.";
			animationId = 16446;
			break;
		case 1395:
			text = "You make a Water battlestaff.";
			animationId = 16448;
			break;
		case 1399:
			text = "You make an Earth battlestaff.";
			animationId = 16448;
			break;
		case 1393:
			text = "You make a Fire battlestaff.";
			animationId = 16449;
			break;
		case 21777:
			text = "You make an Armadyl battlestaff.";
			animationId = 16450;
			break;
	}
	startCrafting(player, amount, animationId, text);
}
