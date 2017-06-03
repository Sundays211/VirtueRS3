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
/* globals EventType, CLAN_ENGINE*/
var widget = require('../widget');
var dialog = require('../dialog');
var clan = require('./logic/core');
var chat = require('../chat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 26/12/2014
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.COMMAND, "makeclan", function (ctx) {
		if (clan.inClan(ctx.player)) {
			chat.sendCommandResponse(ctx.player, "You need to leave your current clan before you can use this command (clan="+clan.getHash(ctx.player)+")", ctx.console);
			return;
		}
		widget.open(ctx.player, 1477, 437, 1094, false);
		dialog.setResumeHandler(ctx.player, function (value) {
			widget.closeSub(ctx.player, 1477, 437);
			if (value) {
				CLAN_ENGINE.createClan(value, ctx.player, []);
			}
		});
	});	
};