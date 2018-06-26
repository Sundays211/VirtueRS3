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
import { EventType } from 'engine/enums/event-type';
import _events from 'engine/events';
import { varbit, setVarBit } from 'engine/var';

import _component from 'shared/widget/component';
import { setWidgetEvents, inframeInput } from 'shared/widget';
import { defaultHandler } from 'shared/util';
import { sendDebugMessage } from 'shared/chat';


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 08/01/2015
 */
_events.bindEventListener(EventType.IF_OPEN, 1623, (ctx) => {
	setWidgetEvents(ctx.player, 1623, 128, 0, 20, 2359296);
	setWidgetEvents(ctx.player, 1623, 129, 0, 20, 2);
});

_events.bindEventListener(EventType.IF_DRAG, _component(1623, 128), (ctx) => {
	if (ctx.toslot >= 0 && ctx.toslot < 20) {
		setVarBit(ctx.player, 21238, (ctx.toslot + 1) * 50000);
	}
});

_events.bindEventListener(EventType.IF_BUTTON, 1623, (ctx) => {
	var player = ctx.player;
	var enabled, value;
	switch (ctx.component) {
		case 30://Use loot inventory
			enabled = varbit(player, 27942) == 1;
			setVarBit(player, 27942, enabled ? 0 : 1);
			return;
		case 37://Use area loot
			enabled = varbit(player, 27943) == 1;
			setVarBit(player, 27943, enabled ? 0 : 1);
			return;
		case 114://Enable right click to open interface
			enabled = varbit(player, 27961) == 1;
			setVarBit(player, 27961, enabled ? 0 : 1);
			return;
		case 43://Loot by monatary value
			enabled = varbit(player, 27945) == 1;
			setVarBit(player, 27945, enabled ? 0 : 1);
			return;
		case 48://Select monatary value
			sendDebugMessage(player, "Unhandled monatary value selector");
			return;
		case 52://Loot armour and weapons
			enabled = varbit(player, 27947) == 1;
			setVarBit(player, 27947, enabled ? 0 : 1);
			return;
		case 58://Loot ammo
			enabled = varbit(player, 27948) == 1;
			setVarBit(player, 27948, enabled ? 0 : 1);
			return;
		case 64://Loot combat consumables
			enabled = varbit(player, 27949) == 1;
			setVarBit(player, 27949, enabled ? 0 : 1);
			return;
		case 70://Loot construction materials
			enabled = varbit(player, 27950) == 1;
			setVarBit(player, 27950, enabled ? 0 : 1);
			return;
		case 76://Loot runes
			enabled = varbit(player, 27951) == 1;
			setVarBit(player, 27951, enabled ? 0 : 1);
			return;
		case 82://Loot prayer items
			enabled = varbit(player, 27952) == 1;
			setVarBit(player, 27952, enabled ? 0 : 1);
			return;
		case 88://Loot mining & smithing items
			enabled = varbit(player, 27953) == 1;
			setVarBit(player, 27953, enabled ? 0 : 1);
			return;
		case 94://Loot farming items
			enabled = varbit(player, 27954) == 1;
			setVarBit(player, 27954, enabled ? 0 : 1);
			return;
		case 100://Loot herblore items
			enabled = varbit(player, 27955) == 1;
			setVarBit(player, 27955, enabled ? 0 : 1);
			return;
		case 108://Loot crafting materials
			enabled = varbit(player, 27956) == 1;
			setVarBit(player, 27956, enabled ? 0 : 1);
			return;
		case 120://Decrease lootbeam trigger cost
			value = varbit(player, 21238);
			setVarBit(player, 21238, Math.max(50000, value - 1));
			return;
		case 125://Increase lootbeam trigger cost
			value = varbit(player, 21238);
			setVarBit(player, 21238, Math.min(1000000, value + 1));
			return;
		case 129://Lootbean trigger cost slider (also has drag event)
			if (ctx.slot >= 0 && ctx.slot < 20) {
				setVarBit(player, 21238, (ctx.slot + 1) * 50000);
			}
			return;
		case 139://Enter manual amount
			inframeInput(player, 1623, 139, (newValue) => {
				newValue = newValue as number;
				setVarBit(player, 21238, Math.min(1000000, Math.max(50000, newValue - 1)));
			}, 7, 7);
			return;
		case 145://Rotate lootbeam
			setVarBit(player, 23261, 0);
			setVarBit(player, 26778, 1);
			return;
		case 147://Disable lootbeam
			setVarBit(player, 23261, 0);
			setVarBit(player, 26778, 0);
			return;
		case 149://Default lootbeam
			setVarBit(player, 23261, 1);
			setVarBit(player, 26778, 1);
			return;
		case 151://Rainbow lootbeam
			if (varbit(player, 22915) == 1) {//If rainbow lootbeam is enabled
				setVarBit(player, 23261, 2);
				setVarBit(player, 26778, 1);
			}
			return;
		case 153://Christmas lootbeam
			if (varbit(player, 26407) == 1) {//If christmas lootbeam is enabled
				setVarBit(player, 23261, 3);
				setVarBit(player, 26778, 1);
			}
			return;
		case 155://Beach lootbeam
			if (varbit(player, 28241) == 1) {//If beach lootbeam is enabled
				setVarBit(player, 23261, 4);
				setVarBit(player, 26778, 1);
			}
			return;
		default:
			defaultHandler(ctx, "loot settings");
			return;
	}
});
