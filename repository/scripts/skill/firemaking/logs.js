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
/* globals EventType */
var chat = require('chat');
var dialog = require('dialog');

var bonfire = require('./bonfire');
var lighting = require('./lighting');
var fletching = require('../fletching/fletch-log');

var LogType = require('./fire');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
module.exports = (function () {
	return {
		init : init
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 1511, function (ctx) {
			openToolDialog(ctx.player, LogType.NORMAL, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 1511, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.NORMAL, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 1521, function (ctx) {
			openToolDialog(ctx.player, LogType.OAK, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 1521, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.OAK, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 1519, function (ctx) {
			openToolDialog(ctx.player, LogType.WILLOW, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 1519, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.WILLOW, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 6333, function (ctx) {
			openToolDialog(ctx.player, LogType.TEAK, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 6333, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.TEAK, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 1517, function (ctx) {
			openToolDialog(ctx.player, LogType.MAPLE, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 1517, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.MAPLE, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 6332, function (ctx) {
			openToolDialog(ctx.player, LogType.MAHOGANY, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 6332, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.MAHOGANY, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 12581, function (ctx) {
			openToolDialog(ctx.player, LogType.EUCALYPTUS, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 12581, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.EUCALYPTUS, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 1515, function (ctx) {
			openToolDialog(ctx.player, LogType.YEW, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 1515, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.YEW, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 1513, function (ctx) {
			openToolDialog(ctx.player, LogType.MAGIC, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 1513, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.MAGIC, ctx.slot);
		});


		scriptManager.bind(EventType.OPHELD1, 29556, function (ctx) {
			openToolDialog(ctx.player, LogType.ELDER, ctx.slot);
		});

		scriptManager.bind(EventType.OPHELD2, 29556, function (ctx) {
			lighting.lightLogs(ctx.player, LogType.ELDER, ctx.slot);
		});
	}

	function openToolDialog (player, logType, slot) {
		var tools = [ 590, 946, 24291 ];
		if (logType === LogType.EUCALYPTUS) {
			tools = [ 590, 24291 ];
		}
		dialog.requestTool(player, "What do you want to use on the logs?", tools, function (toolId) {
			switch (toolId) {
			case 590://Light
				lighting.lightLogs(player, logType, slot);
				break;
			case 946://Craft
				fletching.selectProduct(player, logType.logId, slot);
				break;
			case 24291://Add logs to a nearby bonfire
				var fire = bonfire.find(player);
				if (fire) {
					bonfire.moveTo(player, logType, fire);
				}
				break;
			default:
				chat.sendDebugMessage(player, "Unhandled log tool: logs="+logType.logId+", toolID="+toolId);
				break;
			}
		});
	}
})();
