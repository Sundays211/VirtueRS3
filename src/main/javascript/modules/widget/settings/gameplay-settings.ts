/**
 * Copyright (c) 2014 Virtue Studios
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
import { EventContext, Player } from 'engine/models';
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import { varbit, varp, setVarBit, setVarp } from 'engine/var';

import { testBit, unsetBit, setBit, defaultHandler } from 'shared/util';
import { openWidget } from 'shared/widget';

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 08/01/2015
 */
_events.bindEventListener(EventType.IF_BUTTON, 1663, (ctx: EventContext) => {
	var player = ctx.player;
	var enabled;
	switch (ctx.component) {
		case 8://One-button gameplay
			enabled = varp(player, 455) == 1;
			setVarp(player, 455, enabled ? 0 : 1);
			return;
		case 15://Hide familiar options
			enabled = varbit(player, 18564) == 1;
			setVarBit(player, 18564, enabled ? 0 : 1);
			return;
		case 21://Guidance system hints
			enabled = varbit(player, 20924) == 1;
			setVarBit(player, 20924, enabled ? 0 : 1);
			return;
		case 27://Toggle quick-chat
			enabled = varbit(player, 21242) == 1;
			setVarBit(player, 21242, enabled ? 0 : 1);
			return;
		case 33://Legacy combat mode
			//varbit 27168 = combat mode (1=legacy, 0=EoC)
			setVarp(player, 3813, 9);
			openWidget(player, 1477, 871, 26, true);
			return;
		case 45://Legacy interfaces
			//Varbit 27169 = interface mode (1=legacy, 0=EoC)
			setVarp(player, 3813, 10);
			openWidget(player, 1477, 871, 26, true);//853
			return;
		case 40://Drag and drop items
			enabled = varbit(player, 27164) == 1;
			setVarBit(player, 27164, enabled ? 0 : 1);
			return;
		/*Adventurer log settings*/
		case 53://Adv log quest complete
			toggleAdvLog(player, 1);
			return;
		case 59://Adv log quest milestones
			toggleAdvLog(player, 2);
			return;
		case 65://Adv log champion's challenge
			toggleAdvLog(player, 3);
			return;
		case 71://Adv log court cases
			toggleAdvLog(player, 4);
			return;
		case 77://Adv log music milestones
			toggleAdvLog(player, 5);
			return;
		case 83://Adv log level-ups
			toggleAdvLog(player, 6);
			return;
		case 89://Adv log level-up milestones
			toggleAdvLog(player, 7);
			return;
		case 95://Adv log total level milestones
			toggleAdvLog(player, 8);
			return;
		case 101://Adv log total xp milestones
			toggleAdvLog(player, 9);
			return;
		case 107://Adv log item drops
			toggleAdvLog(player, 10);
			return;
		case 113://Adv log npc kills
			toggleAdvLog(player, 11);
			return;
		case 119://Adv log holiday events
			toggleAdvLog(player, 13);
			return;
		case 125://Adv log misc
			toggleAdvLog(player, 14);
			return;
		case 131://Adv log treasure trails
			toggleAdvLog(player, 15);
			return;
		case 137://Adv log found item
			toggleAdvLog(player, 16);
			return;
		case 143://Adv log dungeoneering deep floor
			toggleAdvLog(player, 17);
			return;
		case 149://Adv log dungeoneering boss kills
			toggleAdvLog(player, 18);
			return;
		case 155://Adv log dungeoneering spent tokens
			toggleAdvLog(player, 19);
			return;
		case 161://Adv log dungeoneering found journals
			toggleAdvLog(player, 20);
			return;
		case 166://Skip travel cutscenes
			enabled = varbit(player, 29889) == 1;
			setVarBit(player, 29889, enabled ? 0 : 1);
			return;
		default:
			defaultHandler(ctx, "gameplay settings");
			return;
	}
});

function toggleAdvLog(player: Player, bit: number) {
	var baseVal = varp(player, 1274) as number;
	if (testBit(baseVal, bit)) {
		setVarp(player, 1274, unsetBit(baseVal, bit));
	} else {
		setVarp(player, 1274, setBit(baseVal, bit));
	}
}
