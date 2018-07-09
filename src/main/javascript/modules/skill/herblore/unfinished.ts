import { EventContext } from "engine/models";
import { EventType } from "engine/enums";
import _events from "engine/events";

import { startPotionMaking } from "./logic";
import { defaultHandler } from "shared/util";

const UNFINISHED_POTIONS = 6842;

/**
 * @author Greco
 * @since 12/20/2016
 */
_events.bindEventListener(EventType.OPHELDU, 249, function(ctx) {
	cleanHerbUse(ctx, 91);//Guam
});

_events.bindEventListener(EventType.OPHELDU, 251, function(ctx) {
	cleanHerbUse(ctx, 93);//Marrentill
});

_events.bindEventListener(EventType.OPHELDU, 253, function(ctx) {
	cleanHerbUse(ctx, 95);//Tarromin
});

_events.bindEventListener(EventType.OPHELDU, 255, function(ctx) {
	cleanHerbUse(ctx, 97);//Harralander
});

_events.bindEventListener(EventType.OPHELDU, 257, function(ctx) {
	cleanHerbUse(ctx, 99);//Ranarr
});

_events.bindEventListener(EventType.OPHELDU, 259, function(ctx) {
	cleanHerbUse(ctx, 101);//Irit
});

_events.bindEventListener(EventType.OPHELDU, 261, function(ctx) {
	cleanHerbUse(ctx, 103);//Avantoe
});

_events.bindEventListener(EventType.OPHELDU, 263, function(ctx) {
	cleanHerbUse(ctx, 105);//Kwuarm
});

_events.bindEventListener(EventType.OPHELDU, 265, function(ctx) {
	cleanHerbUse(ctx, 107);//Cadantine
});

_events.bindEventListener(EventType.OPHELDU, 267, function(ctx) {
	cleanHerbUse(ctx, 109);//Dwarf weed
});

_events.bindEventListener(EventType.OPHELDU, 269, function(ctx) {
	cleanHerbUse(ctx, 111);//Torstol
});

_events.bindEventListener(EventType.OPHELDU, 2481, function(ctx) {
	cleanHerbUse(ctx, 2483);//Lantadyme
});

_events.bindEventListener(EventType.OPHELDU, 2998, function(ctx) {
	cleanHerbUse(ctx, 3002);//Toadflax
});

_events.bindEventListener(EventType.OPHELDU, 3000, function(ctx) {
	cleanHerbUse(ctx, 3004);//Snapdragon
});

_events.bindEventListener(EventType.OPHELDU, 12172, function(ctx) {
	cleanHerbUse(ctx, 12181);//Spirit weed
});

_events.bindEventListener(EventType.OPHELDU, 14854, function(ctx) {
	cleanHerbUse(ctx, 14856);//Wergali
});

_events.bindEventListener(EventType.OPHELDU, 21624, function(ctx) {
	cleanHerbUse(ctx, 21628);//Fellstalk
});

_events.bindEventListener(EventType.OPHELDU, 227, function(ctx) {
	//Vial of water
	switch (ctx.useObjId) {
		case 249://Guam
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 91);
			return;
		case 251://Marrentill
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 93);
			return;
		case 253://Tarromin
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 95);
			return;
		case 255://Harralander
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 97);
			return;
		case 257://Ranarr
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 99);
			return;
		case 259://Irit
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 101);
			return;
		case 261://Avantoe
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 103);
			return;
		case 263://Kwuarm
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 105);
			return;
		case 265://Cadantine
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 107);
			return;
		case 267://Dwarf weed
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 109);
			return;
		case 269://Torstol
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 111);
			return;
		case 2481://Lantadyme
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 2483);
			return;
		case 2998://Toadflax
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 3002);
			return;
		case 3000://Snapdragon
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 3004);
			return;
		case 12172://Spirit weed
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 12181);
			return;
		case 14854://Wergali
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 14856);
			return;
		case 21624://Fellstalk
			startPotionMaking(ctx.player, UNFINISHED_POTIONS, 21628);
			return;
		default:
			defaultHandler(ctx);
			return;
	}
});



function cleanHerbUse(ctx: EventContext, productId: number) {
	if (ctx.useObjId !== 227) {
		defaultHandler(ctx);
	} else {
		startPotionMaking(ctx.player, UNFINISHED_POTIONS, productId);
	}
}
