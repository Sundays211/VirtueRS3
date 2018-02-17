/**
 * Copyright (c) 2015 Virtue Studios
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
/* globals EventType, ENGINE, Java */
var varc = require('engine/var/client');
var coords = require('map/coords');

var Virtue = Java.type('org.virtue.Virtue');
var World = Java.type('org.virtue.game.World');

var anim = require('anim');
var map = require('map');
var util = require('util');
var chat = require('chat');
var widget = require('widget');

/** 
 * @author Kayla
 * @date 11/28/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.COMMAND_ADMIN, "root", function (ctx) {
			var parent = parseInt(ctx.cmdArgs[0]);
			ctx.player.getDispatcher().sendRootWidget(parent);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, ["coords","pos","mypos"], function (ctx) {
		chat.sendCommandResponse(ctx.player, util.getName(ctx.player) +" "+ map.getCoords(ctx.player) +" or "+ map.getCoordX(ctx.player)+" "+ map.getCoordY(ctx.player), ctx.console);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, [ "inter", "if", "widget" ], function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			if (args.length < 1 || isNaN(args[0])) {
				chat.sendCommandResponse(player, "Usage: "+ctx.syntax+" [id]", ctx.console);
				return;
			}
			
			if (args.length >= 3) {
				var parent = parseInt(args[0]);
				var slot = parseInt(args[1]);
				var sub = parseInt(args[2]);
				widget.open(player, parent, slot, sub, false);
			} else {
				widget.openCentral(player, parseInt(args[0]), false);
			}
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "uptime", function (ctx) {
			var ticks = ENGINE.getServerCycle();
			var time = util.toFormattedTime(ticks);
			chat.sendCommandResponse(ctx.player, "Server has been online for "+time+".", ctx.console);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "setKey", function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			var amount = parseInt(args[0]);
			player.setKeys(amount);
			varc(player, 1800, player.getKeys() - 1);
			chat.sendMessage(player, "You now have "+(player.getKeys())+" for Treasure Hunter.");
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, ["priceReload", "reloadPrice"], function () {
			Virtue.getInstance().getExchange().loadPrices();
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, ["duel", "challenge"], function (ctx) {
			ctx.player.test(ctx.player);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "adr", function (ctx) {
			ctx.player.getCombat().setAdrenaline(100);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "adminroom", function (ctx) {
			map.teleport(ctx.player, coords(2845, 5154, 0), 18007);
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "forcetalk", function (ctx) {
			var player = ctx.player;
			var args = ctx.cmdArgs;
			
			var message = "";
			for (var i = 0; i < args.length; i++) {
				message += (i === 0 ? (args[i].substring(0, 1).toUpperCase() + args[i].substring(1)) : args[i]) + (i == args.length - 1 ? "" : " ");
			}
			
			var iterate = World.getInstance().getPlayers().iterator();
			var players = null;
			while (iterate.hasNext()) {
				players = iterate.next();
				ENGINE.playerForceSay(player, message, false);
			}
		});
		
		scriptManager.bind(EventType.COMMAND_ADMIN, "forcedance", function () {
			var iterate = ENGINE.getPlayerIterator(ENGINE.getWorld());
			var p2 = null;
			while (iterate.hasNext()) {
				p2 = iterate.next();
				p2.getAppearance().setRenderAnimation(3171);
				p2.getAppearance().refresh();
				anim.run(p2, 7071);//7071					
			}
		});
	}
})();
