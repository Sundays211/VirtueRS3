import { EventType } from 'engine/enums';
import _events from 'engine/events';

import { startGrinding } from './logic';

const HERBLORE_INGREDIENTS = 6834;
const COOKING_INGREDIENTS = 6835;
const SALAMANDER = 6837;
const OTHER_GRINDING = 6836;

/**
 * @author Greco
 * @since 06/12/2018
 */
_events.bindEventListener(EventType.OPHELD1, 237, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 235);//Unicorn Horn
});

_events.bindEventListener(EventType.OPHELD1, 243, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 241);//Blue Dragon Scale
});

_events.bindEventListener(EventType.OPHELD1, 5075, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 6693);//Crushed Birds Nest
});

_events.bindEventListener(EventType.OPHELD1, 10109, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 10111);//Kebbit Teeth
});

_events.bindEventListener(EventType.OPHELD1, 9735, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 9736);//Desert Goat Horn
});

_events.bindEventListener(EventType.OPHELD1, 4698, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 9594);//Ground Mud Rune
});

_events.bindEventListener(EventType.OPHELD1, 321, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 11266);//Anchovy Paste
});

_events.bindEventListener(EventType.OPHELD1, 9016, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 9018);//Gorak Claw Powder
});

_events.bindEventListener(EventType.OPHELD1, 35271, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 35724);//Small Crystal Urchin -> Harmony Dust
});

_events.bindEventListener(EventType.OPHELD1, 35272, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 35725);//Medium Crystal Urchin -> Harmony Dust
});

_events.bindEventListener(EventType.OPHELD1, 35273, function(ctx) {
	startGrinding(ctx.player, HERBLORE_INGREDIENTS, 35726);//Large Crystal Urchin -> Harmony Dust
});

_events.bindEventListener(EventType.OPHELD2, 1973, function(ctx) {
	startGrinding(ctx.player, COOKING_INGREDIENTS, 1975);//Chocolate Bar
});

_events.bindEventListener(EventType.OPHELD2, 249, function(ctx) {
	startGrinding(ctx.player, COOKING_INGREDIENTS, 6681);//Ground Guam
});

_events.bindEventListener(EventType.OPHELD2, 401, function(ctx) {
	startGrinding(ctx.player, COOKING_INGREDIENTS, 6683);//Ground Seaweed
});

_events.bindEventListener(EventType.OPHELD2, 7518, function(ctx) {
	startGrinding(ctx.player, COOKING_INGREDIENTS, 7527);//Ground Crab Meat
});

_events.bindEventListener(EventType.OPHELD2, 339, function(ctx) {
	startGrinding(ctx.player, COOKING_INGREDIENTS, 7528);//Ground Cod
});

_events.bindEventListener(EventType.OPHELD2, 7516, function(ctx) {
	startGrinding(ctx.player, COOKING_INGREDIENTS, 7517);//Ground Kelp
});

_events.bindEventListener(EventType.OPHELD2, 2309, function(ctx) {
	startGrinding(ctx.player, COOKING_INGREDIENTS, 7515);//Ground Breadcrumbs
});

_events.bindEventListener(EventType.OPHELD2, 592, function(ctx) {
	startGrinding(ctx.player, OTHER_GRINDING, 8865);//Ground Ashes
});

_events.bindEventListener(EventType.OPHELD1, 9079, function(ctx) {
	startGrinding(ctx.player, OTHER_GRINDING, 9082);//Ground Tooth
});

_events.bindEventListener(EventType.OPHELD2, 21773, function(ctx) {
	startGrinding(ctx.player, OTHER_GRINDING, 21774);//Dust of Armadyl
});
