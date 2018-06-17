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
/* globals EventType, Inv */
var varp = require('engine/var/player');
var varc = require('engine/var/client');

var widget = require('shared/widget');

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
module.exports = function(scriptManager) {

	scriptManager.bind(EventType.OPNPC3, [520, 521], function (ctx) {
		varp(ctx.player, 304, Inv.LUMBRIDGE_GEN_STORE);
		varp(ctx.player, 305, Inv.LUMBRIDGE_GEN_STORE_FREE_STOCK);
		varc(ctx.player, 2360, "Lumbridge General Store");
		widget.openCentral(ctx.player, 1265);
	});

	scriptManager.bind(EventType.OPNPC3, [522, 523], function (ctx) {
		varp(ctx.player, 304, Inv.VARROCK_GEN_STORE);
		varc(ctx.player, 2360, "Varrock General Store");
		widget.openCentral(ctx.player, 1265);
	});

	scriptManager.bind(EventType.OPNPC3, [526, 527], function (ctx) {
		varp(ctx.player, 304, Inv.FALADOR_GEN_STORE);
		varc(ctx.player, 2360, "Falador General Store");
		widget.openCentral(ctx.player, 1265);
	});

	scriptManager.bind(EventType.OPNPC3, 546, function (ctx) {
		varp(ctx.player, 304, Inv.ZAFF_STAFF_SHOP);
		varc(ctx.player, 2360, "Zaff's Superior Staves");
		widget.openCentral(ctx.player, 1265);
	});

	scriptManager.bind(EventType.OPNPC3, 549, function (ctx) {
		varp(ctx.player, 304, Inv.HORVIKS_ARMOUR_SHOP);
		varc(ctx.player, 2360, "Horvik's Armour Shop");
		widget.openCentral(ctx.player, 1265);
	});

	scriptManager.bind(EventType.OPNPC3, 550, function (ctx) {
		varp(ctx.player, 304, Inv.LOWES_ARCHERY_SHOP);
		varp(ctx.player, 305, Inv.LOWES_ARCHERY_FREE_STOCK);
		varc(ctx.player, 2360, "Lowe's Archery Emporium");
		widget.openCentral(ctx.player, 1265);
	});

	scriptManager.bind(EventType.OPNPC3, 551, function (ctx) {
		varp(ctx.player, 304, Inv.VARROCK_SWORD_SHOP);
		varp(ctx.player, 305, Inv.VARROCK_SWORD_FREE_STOCK);
		varc(ctx.player, 2360, "Varrock Sword Shop");
		widget.openCentral(ctx.player, 1265);
	});

	scriptManager.bind(EventType.OPNPC3, 8864, function (ctx) {
		varp(ctx.player, 304, Inv.LUMBRIDGE_FISH_STORE);
		varp(ctx.player, 305, Inv.LUMBRIDGE_FISH_STORE_FREE);
		varc(ctx.player, 2360, "Lumbridge Fishing Supplies");
		widget.openCentral(ctx.player, 1265);
	});
};
