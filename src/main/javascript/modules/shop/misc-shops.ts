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
import { EventType, Inv } from 'engine/enums';
import _events from 'engine/events';
import { setVarp, setVarc } from 'engine/var';

import { openCentralWidget } from 'shared/widget';

/**
 * Contains shops which don't have their own file.
 * Most of these should be added to their own file once full dialog is added
 *
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 5/02/2015
 */
_events.bindEventListener(EventType.OPNPC3, [520, 521], (ctx) => {
	setVarp(ctx.player, 304, Inv.LUMBRIDGE_GEN_STORE);
	setVarp(ctx.player, 305, Inv.LUMBRIDGE_GEN_STORE_FREE_STOCK);
	setVarc(ctx.player, 2360, "Lumbridge General Store");
	openCentralWidget(ctx.player, 1265, false);
});

_events.bindEventListener(EventType.OPNPC3, [522, 523], (ctx) => {
	setVarp(ctx.player, 304, Inv.VARROCK_GEN_STORE);
	setVarc(ctx.player, 2360, "Varrock General Store");
	openCentralWidget(ctx.player, 1265, false);
});

_events.bindEventListener(EventType.OPNPC3, [526, 527], (ctx) => {
	setVarp(ctx.player, 304, Inv.FALADOR_GEN_STORE);
	setVarc(ctx.player, 2360, "Falador General Store");
	openCentralWidget(ctx.player, 1265, false);
});

_events.bindEventListener(EventType.OPNPC3, 546, (ctx) => {
	setVarp(ctx.player, 304, Inv.ZAFF_STAFF_SHOP);
	setVarc(ctx.player, 2360, "Zaff's Superior Staves");
	openCentralWidget(ctx.player, 1265, false);
});

_events.bindEventListener(EventType.OPNPC3, 549, (ctx) => {
	setVarp(ctx.player, 304, Inv.HORVIKS_ARMOUR_SHOP);
	setVarc(ctx.player, 2360, "Horvik's Armour Shop");
	openCentralWidget(ctx.player, 1265, false);
});

_events.bindEventListener(EventType.OPNPC3, 550, (ctx) => {
	setVarp(ctx.player, 304, Inv.LOWES_ARCHERY_SHOP);
	setVarp(ctx.player, 305, Inv.LOWES_ARCHERY_FREE_STOCK);
	setVarc(ctx.player, 2360, "Lowe's Archery Emporium");
	openCentralWidget(ctx.player, 1265, false);
});

_events.bindEventListener(EventType.OPNPC3, 551, (ctx) => {
	setVarp(ctx.player, 304, Inv.VARROCK_SWORD_SHOP);
	setVarp(ctx.player, 305, Inv.VARROCK_SWORD_FREE_STOCK);
	setVarc(ctx.player, 2360, "Varrock Sword Shop");
	openCentralWidget(ctx.player, 1265, false);
});

_events.bindEventListener(EventType.OPNPC3, 8864, (ctx) => {
	setVarp(ctx.player, 304, Inv.LUMBRIDGE_FISH_STORE);
	setVarp(ctx.player, 305, Inv.LUMBRIDGE_FISH_STORE_FREE);
	setVarc(ctx.player, 2360, "Lumbridge Fishing Supplies");
	openCentralWidget(ctx.player, 1265, false);
});
