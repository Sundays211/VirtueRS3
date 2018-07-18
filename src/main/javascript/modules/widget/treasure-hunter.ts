/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { closeAllWidgets, hideWidget, closeWidgetSub, openWidget } from 'shared/widget';
import { setVarp, setVarc } from 'engine/var';
import { defaultHandler } from 'shared/util';

_events.bindEventListener(EventType.IF_OPEN, 1253, (ctx) => {
	setVarc(ctx.player, 1928, 0);
	setVarc(ctx.player, 4038, 0);
	setVarc(ctx.player, 3947, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4039, 0);
	setVarc(ctx.player, 3948, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4040, 0);
	setVarc(ctx.player, 3949, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4041, 0);
	setVarc(ctx.player, 3950, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4042, 0);
	setVarc(ctx.player, 3951, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4043, 1);
	setVarc(ctx.player, 3952, "This is a stackable bar that can be worked for Smithing XP based on your Smithing level.");
	setVarc(ctx.player, 4044, 0);
	setVarc(ctx.player, 3953, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4045, 1);
	setVarc(ctx.player, 3954, " Logs cut from a magic tree.");
	setVarc(ctx.player, 4046, 0);
	setVarc(ctx.player, 3955, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4047, 0);
	setVarc(ctx.player, 3956, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4048, 0);
	setVarc(ctx.player, 3957, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4049, 1);
	setVarc(ctx.player, 3958, "Rub this lamp to get some Farming XP.");
	setVarc(ctx.player, 4050, 0);
	setVarc(ctx.player, 3959, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4051, 0);
	setVarc(ctx.player, 3960, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4052, 0);
	setVarc(ctx.player, 3961, "Deploy this to create an elite training dummy, on which to train your melee skills.");
	setVarc(ctx.player, 4053, 0);
	setVarc(ctx.player, 3962, "Rub this lamp to get some Strength XP.");
	setVarc(ctx.player, 4054, 0);
	setVarc(ctx.player, 3963, "Deploy this to create an elite training dummy, on which to train your melee skills.");
	setVarc(ctx.player, 4055, 0);
	setVarc(ctx.player, 3964, "Rub this lamp to get some Mining XP.");
	setVarc(ctx.player, 4056, 0);
	setVarc(ctx.player, 3965, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4057, 0);
	setVarc(ctx.player, 3966, "Rub this lamp to get some Woodcutting XP.");
	setVarc(ctx.player, 4058, 0);
	setVarc(ctx.player, 3967, "A dungeoneering token, used to get rewards from Dungeoneering.");
	setVarc(ctx.player, 4059, 1);
	setVarc(ctx.player, 3968, "Rub this lamp to get some Agility XP.");
	setVarc(ctx.player, 4060, 0);
	setVarc(ctx.player, 3969, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4061, 1);
	setVarc(ctx.player, 3970, "Rub this lamp to get some Slayer XP.");
	setVarc(ctx.player, 4062, 0);
	setVarc(ctx.player, 3971, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4063, 1);
	setVarc(ctx.player, 3972, "A chunk of tier 4 harvested divine energy. It can be manipulated to create or transmute objects.");
	setVarc(ctx.player, 4064, 1);
	setVarc(ctx.player, 3973, "Resets a daily D&D of your choice.");
	setVarc(ctx.player, 4065, 0);
	setVarc(ctx.player, 3974, "The chestwear of an Armadylean archon.");
	setVarc(ctx.player, 4066, 1);
	setVarc(ctx.player, 3975, "Increases Divination experience gained by 1% when worn.");
	setVarc(ctx.player, 4067, 0);
	setVarc(ctx.player, 3976, "This star can be drained of energy to give you bonus XP.");
	setVarc(ctx.player, 4068, 1);
	setVarc(ctx.player, 3977, "A garb worn by magic-using followers of Zamorak. Requires Defence (70), Magic (70).");
	setVarc(ctx.player, 4069, 1);
	setVarc(ctx.player, 3978, "Provides piercing ideas.");
	setVarc(ctx.player, 4142, 10);
	setVarc(ctx.player, 1790, 0);
	setVarc(ctx.player, 4079, 0);
	setVarc(ctx.player, 4080, 0);
	setVarc(ctx.player, 1993, 1);
});

_events.bindEventListener(EventType.IF_BUTTON, 1253, (ctx) => {
	switch (ctx.component) {
		case 40:
			//if(player.getKeys() < 1) {
			//api.sendMessage(player, "You are out of keys.");
			//} else {
			//player.getTreasureHunter().selectReward(0);
			//}
			return;
		case 49:
			//if(player.getKeys() < 1) {
			//api.sendMessage(player, "You are out of keys.");
			//} else {
			//player.getTreasureHunter().selectReward(1);
			//}
			return;
		case 55:
			//if(player.getKeys() < 1) {
			//api.sendMessage(player, "You are out of keys.");
			//} else {
			//player.getTreasureHunter().selectReward(2);
			//}
			return;
		case 35:
			//if(player.getKeys() < 1) {
			//api.sendMessage(player, "You are out of keys.");
			//} else {
			//player.getTreasureHunter().selectReward(3);
			//}
			return;
		case 31:
			//if(player.getKeys() < 1) {
			//api.sendMessage(player, "You are out of keys.");
			//} else {
			//player.getTreasureHunter().selectReward(4);
			//}
			return true;
		case 214:
			//player.getTreasureHunter().claimReward(2);
			return;
		case 222:
			//player.getTreasureHunter().claimReward(0);
			return;
		case 242:
			//player.getTreasureHunter().claimReward(1);
			return;
		case 232:
		case 760:
			closeAllWidgets(ctx.player);
			return;
		case 346:
			setVarp(ctx.player, 1450, -1140842495);
			closeWidgetSub(ctx.player, 1477, 380);
			setVarc(ctx.player, 4081, -1);
			setVarc(ctx.player, 2045, 1);
			setVarc(ctx.player, 1784, 0);
			openWidget(ctx.player, 1477, 749, 1252, true);
			return;
		case 542:
			setVarp(ctx.player, 4146, 0);
			hideWidget(ctx.player, 1253, 244, true);
			hideWidget(ctx.player, 1253, 234, false);
			hideWidget(ctx.player, 1253, 552, true);
			setVarc(ctx.player, 4082, 133);
			hideWidget(ctx.player, 1253, 552, false);
			setVarc(ctx.player, 1993, 1);
			return;
		default:
			defaultHandler(ctx, "treasure-hunter");
			return;
	}
});
