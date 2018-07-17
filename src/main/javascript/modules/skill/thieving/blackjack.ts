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
import { EventType } from 'engine/enums';
import _events from 'engine/events';
import { pickpocket } from './pickpocket';
import { lootItem } from 'shared/util';

/**
 * @author Kayla
 * @author rsJuuuuu
 * @since 01/16/2015
 */
_events.bindEventListener(EventType.OPNPC3, [6174, 6388], (ctx) => {
	//TODO: Add blackjack logic
	pickpocket(ctx.player, Npc.BEARDED_POLLNIVNIAN_BANDIT, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [1880, 1881], (ctx) => {
	//TODO: Add blackjack logic
	pickpocket(ctx.player, Npc.POLLINIVNIAN_BANDIT, ctx.npc);
});

_events.bindEventListener(EventType.OPNPC3, [1905], (ctx) => {
	//TODO: Add blackjack logic
	pickpocket(ctx.player, Npc.MENAPHITE_THUG, ctx.npc);
});

var Npc = {
	BEARDED_POLLNIVNIAN_BANDIT: {
		level: 45,
		xp: 45,
		common: [lootItem(995, 40)],
		stunTime: 5,
		stunDamage: 20
	},
	POLLINIVNIAN_BANDIT: {
		level: 55,
		xp: 84.3,
		common: [lootItem(995, 50)],
		stunTime: 5,
		stunDamage: 50
	},
	MENAPHITE_THUG: {
		level: 65,
		xp: 137.5,
		common: [lootItem(995, 60)],
		stunTime: 5,
		stunDamage: 50
	},
};
