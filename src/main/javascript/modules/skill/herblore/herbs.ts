import _events from 'engine/events';
import { EventType } from 'engine/enums';

import { startPotionMaking } from './logic';

const CLEAN_HERBS = 6841;

/**
 * @author Greco
 * @since 12/20/2016
 */
_events.bindEventListener(EventType.OPHELD1, 199, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 249);//Guam
});

_events.bindEventListener(EventType.OPHELD1, 201, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 251);//Marrentill
});

_events.bindEventListener(EventType.OPHELD1, 203, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 253);//Tarromin
});

_events.bindEventListener(EventType.OPHELD1, 205, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 255);//Harralander
});

_events.bindEventListener(EventType.OPHELD1, 207, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 257);//Ranarr
});

_events.bindEventListener(EventType.OPHELD1, 209, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 259);//Irit
});

_events.bindEventListener(EventType.OPHELD1, 211, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 261);//Avantoe
});

_events.bindEventListener(EventType.OPHELD1, 213, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 263);//Kwuarm
});

_events.bindEventListener(EventType.OPHELD1, 215, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 265);//Cadantine
});

_events.bindEventListener(EventType.OPHELD1, 217, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 267);//Dwarf weed
});

_events.bindEventListener(EventType.OPHELD1, 219, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 269);//Torstol
});

_events.bindEventListener(EventType.OPHELD1, 2485, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 2481);//Lantadyme
});

_events.bindEventListener(EventType.OPHELD1, 3049, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 2998);//Toadflax
});

_events.bindEventListener(EventType.OPHELD1, 3051, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 3000);//Snapdragon
});

_events.bindEventListener(EventType.OPHELD1, 12174, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 12172);//Spirit weed
});

_events.bindEventListener(EventType.OPHELD1, 14836, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 14854);//Wergali
});

_events.bindEventListener(EventType.OPHELD1, 21626, function(ctx) {
	startPotionMaking(ctx.player, CLEAN_HERBS, 21624);//Fellstalk
});
