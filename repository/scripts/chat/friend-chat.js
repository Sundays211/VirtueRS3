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
/* globals EventType */
var varc = require('../core/var/client');
var util = require('../core/util');
var widget = require('../widget');
var dialog = require('../core/dialog');
var chat = require('../chat');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 9/11/2014
 */

module.exports = function(scriptManager) {
	scriptManager.bind(EventType.IF_OPEN, 1427, function (ctx) {
		var player = ctx.player;
		
		var name = util.getName(player.getSavedChannelOwner());
		varc(player, 2508, name ? name : util.getName(player));//Last friend chat joined
		varc(player, 1027, 1);
		varc(player, 1034, 2);
		widget.setEvents(player, 1427, 29, 0, 600, 1024);
	});
	
	scriptManager.bind(EventType.IF_BUTTON, 1427, function (ctx) {
		var player = ctx.player;
		
		switch (ctx.component) {
		case 10://Join/leave
			if (player.getChat().getFriendChatOwner() !== 0) {
				util.runClientScript(player, 194, [1]);
				return;
			} else {
				dialog.openModalBase(player);
				util.runClientScript(player, 8178, []);
				util.runClientScript(player, 8537, []);
				util.runClientScript(player, 194, [1]);
			}				
			return;
		case 36://Manual kick/ban
			dialog.openModalBase(player);
			util.runClientScript(player, 8178, []);
			util.runClientScript(player, 2688, []);
			return;
		case 4://Settings
			widget.openCentral(player, 1108);
			return;
		case 34://Loot share
			chat.sendMessage(player, "Loot share has not yet been implemented.");
			return;
		default:
			util.defaultHandler(ctx, "friends chat");
			return;
		}
	});
};
