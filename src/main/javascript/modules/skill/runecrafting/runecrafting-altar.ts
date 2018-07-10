/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { EventType, Stat } from 'engine/enums';
import _events from 'engine/events';
import _config from 'engine/config';
import { Player } from 'engine/models';
import { setVarBit } from 'engine/var';

import { multi2 } from 'shared/dialog';
import { sendMessage } from 'shared/chat';
import { getStatLevel, giveXp } from 'shared/stat';
import { invTotal, takeItem, giveItem } from 'shared/inv';
import { addSpotAnim, runAnim } from 'shared/anim';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 11/11/2014
 */
 _events.bindEventListener(EventType.OPLOC1, 2478, (ctx) => {
 	craftRunes(ctx.player, AIR_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2479, (ctx) => {
 	craftRunes(ctx.player, MIND_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2480, (ctx) => {
 	craftRunes(ctx.player, WATER_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2481, (ctx) => {
 	craftRunes(ctx.player, EARTH_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2482, (ctx) => {
 	craftRunes(ctx.player, FIRE_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2483, (ctx) => {
 	craftRunes(ctx.player, BODY_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2484, (ctx) => {
 	craftRunes(ctx.player, COSMIC_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2487, (ctx) => {
 	craftRunes(ctx.player, CHAOS_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 17010, (ctx) => {
 	craftRunes(ctx.player, ASTRAL_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC2, 17010, (ctx) => {
 	multi2(ctx.player, "CHOOSE AN OPTION", "Lunar spellbook", () => {
 		setVarBit(ctx.player, 0, 2);
 	}, "Normal spellbook", () => {
 		setVarBit(ctx.player, 0, 0);
 	});
 });

_events.bindEventListener(EventType.OPLOC1, 2486, (ctx) => {
 	craftRunes(ctx.player, NATURE_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2485, (ctx) => {
 	craftRunes(ctx.player, LAW_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 2488, (ctx) => {
 	craftRunes(ctx.player, DEATH_ALTAR);
 });

_events.bindEventListener(EventType.OPLOC1, 30624, (ctx) => {
 	craftRunes(ctx.player, BLOOD_ALTAR);
 });

 class RunecraftingAltar {
 	public readonly level: number;
 	public readonly xp: number;
 	public readonly runeId: number;
 	public readonly spotAnim: number;
 	public readonly pureOnly: boolean;
	public readonly multiplesAt: number[];

 	constructor({ level, xp, runeId, spotAnim, pureOnly, multiplesAt }: RunecraftingAltar) {
 		this.level = level;
 		this.xp = xp;
 		this.runeId = runeId;
 		this.spotAnim = spotAnim;
 		this.pureOnly = pureOnly;
		this.multiplesAt = multiplesAt;
 	}
 }

const AIR_ALTAR = new RunecraftingAltar({
 	level : 1,
 	xp : 5,
 	runeId : 556,
 	spotAnim : 4746,
 	pureOnly : false,
 	multiplesAt : [11, 22, 33, 44, 55, 66, 77, 88, 99, 110]
});

const MIND_ALTAR = new RunecraftingAltar({
 	level : 2,
 	xp : 5.5,
 	runeId : 558,
 	spotAnim : 4750,
 	pureOnly : false,
 	multiplesAt : [14, 28, 42, 56, 70, 84, 98, 112]
 });

 const WATER_ALTAR = new RunecraftingAltar({
 	level : 5,
 	xp : 6,
 	runeId : 555,
 	spotAnim : 4747,
 	pureOnly : false,
 	multiplesAt : [19, 38, 57, 76, 95]
 });

 const EARTH_ALTAR = new RunecraftingAltar({
 	level : 9,
 	xp : 6.5,
 	runeId : 557,
 	spotAnim : 4749,
 	pureOnly : false,
 	multiplesAt : [26, 52, 78, 104]
 });

 const FIRE_ALTAR = new RunecraftingAltar({
 	level : 14,
 	xp : 7,
 	runeId : 554,
 	spotAnim : 4748,
 	pureOnly : false,
 	multiplesAt : [35, 70, 105]
 });

 const BODY_ALTAR = new RunecraftingAltar({
 	level : 20,
 	xp : 7.5,
 	runeId : 559,
 	spotAnim : 4751,
 	pureOnly : false,
 	multiplesAt : [46, 92]
 });

 const COSMIC_ALTAR = new RunecraftingAltar({
 	level : 27,
 	xp : 8,
 	runeId : 564,
 	spotAnim : 4754,
 	pureOnly : true,
 	multiplesAt : [59]
 });

 const CHAOS_ALTAR = new RunecraftingAltar({
 	level : 35,
 	xp : 8.5,
 	runeId : 562,
 	spotAnim : 4752,
 	pureOnly : true,
 	multiplesAt : [74]
 });

 const ASTRAL_ALTAR = new RunecraftingAltar({
 	level : 40,
 	xp : 8.7,
 	runeId : 9075,
 	spotAnim : 4757,
 	pureOnly : true,
 	multiplesAt : [82]
 });

 const NATURE_ALTAR = new RunecraftingAltar({
 	level : 44,
 	xp : 9,
 	runeId : 561,
 	spotAnim : 4753,
 	pureOnly : true,
 	multiplesAt : [91]
 });

 const LAW_ALTAR = new RunecraftingAltar({
 	level : 54,
 	xp : 9.5,
 	runeId : 563,
 	spotAnim : 4756,
 	pureOnly : true,
 	multiplesAt : [110]
 });

 const DEATH_ALTAR = new RunecraftingAltar({
 	level : 65,
 	xp : 10,
 	runeId : 560,
 	spotAnim : 4758,
 	pureOnly : true,
 	multiplesAt : []
 });

 const BLOOD_ALTAR = new RunecraftingAltar({
 	level : 77,
 	xp : 10.5,
 	runeId : 565,
 	spotAnim : 4755,
 	pureOnly : true,
 	multiplesAt : []
});

function craftRunes (player: Player, alter: RunecraftingAltar) {
	var level = getStatLevel(player, Stat.RUNECRAFTING);
	if (level < alter.level) {
		sendMessage(player, "You need a runecrafting level of "+alter.level+" to craft this rune.");
		return;
	}

	var essCount = invTotal(player, 7936);//Pure essence
	var pureEss = true;
	if (essCount < 1) {
		if (!alter.pureOnly) {
			pureEss = false;
			essCount = invTotal(player, 1436);//Normal essence
		}
		if (essCount < 1) {
			sendMessage(player, "You don't have any "+(alter.pureOnly ? "pure" : "rune")+" essence.");
			return;
		}
	}
	var totalXp = essCount * alter.xp;

	addSpotAnim(player, alter.spotAnim, 0, 5, 0);
	runAnim(player, 23250, () => {
	    takeItem(player, pureEss ? 7936 : 1436, essCount);
		giveXp(player, Stat.RUNECRAFTING, totalXp);
		giveItem(player, alter.runeId, essCount * getHighestMultiple(alter.multiplesAt, level));
		sendMessage(player, "You bind the temple's power into "+_config.objName(alter.runeId)+"s.");
	});
}

function getHighestMultiple (multiples: number[], level: number): number {
	var multiple = 1;
	for (let levelRequirement of multiples) {
		if (levelRequirement <= level) {
			multiple++;
		}
	}
	return multiple;
}
