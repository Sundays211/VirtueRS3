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
/* globals EventType, ENGINE */
var coords = require('map/coords');

var util = require('util');
var dialog = require('dialog');
var chat = require('chat');
var map = require('map');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 05/11/2014
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, "test", function (ctx) {
			var args = ctx.cmdArgs;
			var player = ctx.player;
			if (args.length < 1) {
				util.sendCommandResponse(player, "Usage: test <type>", ctx.console);
			}
			
			switch (args[0]) {
			case "icons":
				testHeadIcons(player, args, ctx);
				return;
			case "name":
				testNameChange(player, args, ctx);
				return;
			case "locanim":
				testLocAnim(player, args, ctx);
				return;
			case "mestype":
				testMessageType(player, args, ctx);
				return;
			}
		});
		
	}
	
	function testHeadIcons(player, args, ctx) {
		if (args.length >= 4) {
			player.getHeadIcons().setIcon(parseInt(args[3]), parseInt(args[1]), parseInt(args[2]));
			player.getHeadIcons().refresh();
		} else {
			util.sendCommandResponse(player, "Usage: test icons <main_sprite> <sub_sprite> <slot>", ctx.console);
		}
	}
	
	function testNameChange (player) {
		dialog.requestName(player, "Please enter your desired display name: ").then(function (name) {
			var userHash = util.getUserHash(player);
			var oldName = util.getName(userHash);
			var success = ENGINE.setDisplayName(player, userHash, name);
			if (success) {
				chat.sendMessage(player, "Your display name has been changed from "+oldName+" to "+name+".");
				chat.sendMessage(player, "You might need to log out for the change to take effect.");
				chat.sendMessage(player, "NOTE: This change has no effect on the name you use to log in.");
			} else {
				chat.sendMessage(player, "Sorry, "+name+" is not available.");
			}
		});
	}
	
	function testLocAnim(player, args, ctx) {
		if (args.length < 2 || isNaN(args[1])) {
			util.sendCommandResponse(player, "Usage: test locanim <anim_id>", ctx.console);
			return;
		}
		var animId = parseInt(args[1]);
		var locCoords = coords(2551, 3550, 0);
		var shape = 10;
		
		var loc = map.getLoc(locCoords, shape);
		map.locAnim(loc, animId);
	}
	
	function testMessageType(player, args, ctx) {
		if (args.length < 2 || isNaN(args[1])) {
			util.sendCommandResponse(player, "Usage: test mestype <channel_id>", ctx.console);
			return;
		}
		var mesType = args[1];
		chat.sendMessage(player, "Test", mesType);
	}
})();

