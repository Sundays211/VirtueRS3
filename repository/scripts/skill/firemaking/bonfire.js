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

/* globals EventType, Stat, Inv */
var _entity = require('engine/entity');
var _config = require('engine/config');

var coords = require('map/coords');
var locMap = require('map/location');
var map = require('map');
var util = require('util');
var inv = require('inv');
var stat = require('stat');
var chat = require('chat');
var anim = require('anim');
var dialog = require('dialog');

var FireType = require('./fire');
/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
module.exports = (function () {
	return {
		init : init,
		findBonfire : findBonfire,
		moveToBonfire : moveToBonfire
	};

	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC5, [ 70755, 70757, 70758, 70759, 
				70761, 70762, 70763, 70764, 70765, 87548 ], function (ctx) {
			openFireToolDialog(ctx.player, ctx.location);
		});
	}

	function openFireToolDialog (player, fire) {
		dialog.requestTool(player, "Choose what to do:", [ 25637, 24291 ], function (toolId) {
			switch (toolId) {
			case 24291://Add logs the bonfire
				selectLogsToAdd(player, fire);
				break;
			default:
				chat.sendDebugMessage(player, "Unhandled fire tool: fire="+fire+", toolID="+toolId);
				break;
			}
		});
	}

	function selectLogsToAdd (player, fire) {
		var logLookup = {};
		for (var slot = 0; slot < 28; slot++) {
			var objId = inv.getObjId(player, Inv.BACKPACK, slot);
			if (objId != -1 && !logLookup[objId] && _config.objCategory(objId) === 22) {
				var logType = util.lookupValue(FireType, 'logId', objId);
				if (logType) {
					logLookup[objId] = logType;
				} else {
					chat.sendDebugMessage(player, "Object "+objId+" is categorised as a log but is not yet supported!");
				}
			}
			
		}
		var logs = Object.keys(logLookup);
		if (!logs.length) {
			return;//Player does not have any logs to add
		} else if (logs.length === 1) {
			runBonfireAction(player, logLookup[logs[0]], fire);
		} else {
			dialog.requestTool(player, "Which logs do you want to add to the bonfire?", logs, function (logId) {
				runBonfireAction(player, logLookup[logId], fire);
			});
		}
	}

	function findBonfire (player) {
		var xOff = map.getCoordX(player) - 5;
		var yOff = map.getCoordY(player) - 5;
		var level = map.getCoordLevel(player);
		var location;
		for (var x = xOff; x <= xOff+10; x++) {
			for (var y = yOff; y <= yOff+10; y++) {
				location = locMap.get(coords(x, y, level), 10);
				if (location && util.lookupValue(FireType, 'fireId', util.getId(location))) {
					return location;
				}
			}
		}
	}

	function moveToBonfire (player, logType, fire) {
		_entity.moveTo(player, fire, function () {
			runBonfireAction(player, logType, fire);
		});
	}

	function runBonfireAction (player, logType, fire) {
		if (stat.getLevel(player, Stat.FIREMAKING) < logType.level) {
			chat.sendMessage(player, "You need a firemaking level of at least "+logType.level+" to add these logs to a bonfire.");
			return;
		}
		_entity.setBas(player, 2498);

		var clearBas = function () {
			_entity.setBas(player, -1);
		};

		var fireCoords = map.getCoords(fire);
		var fireId = util.getId(fire);
		
		var addLogToFire = function () {
			if (inv.has(player, logType.logId) && util.getId(map.getLoc(fireCoords, 10)) === fireId) {
				inv.take(player, logType.logId, 1);//Remove logs
				stat.giveXp(player, Stat.FIREMAKING, logType.addLogXp);//Add firemaking xp
				anim.run(player, 16703);
				anim.addSpotAnim(player, logType.addLogSpotAnim);
				chat.sendSpamMessage(player, "You add a log to the fire.");

				util.delayFunction(player, 6, addLogToFire, true, clearBas);
			} else {
				clearBas();
			}
		};

		addLogToFire();
		util.delayFunction(player, 6, addLogToFire, true, clearBas);
	}
})();
