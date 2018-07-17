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
/* globals Stat, Inv */
var _entity = require('engine/entity');
var _map = require('engine/map');

var stat = require('shared/stat');
var chat = require('shared/chat');
var map = require('shared/map');
var inv = require('shared/inv');
var anim = require('shared/anim');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
module.exports = (function () {
	return {
		lightLogs : lightLogs
	};

	function lightLogs (player, logType, slot) {
		if (stat.getLevel(player, Stat.FIREMAKING) < logType.level) {
			chat.sendMessage(player, "You need a firemaking level of "+logType.level+" to light these logs.");
			return;
		}
		if (!inv.has(player, 590) && !inv.hasTool(player, 590)) {
			chat.sendMessage(player, "You need a tinderbox to light these logs.");
			return;
		}
		var fireCoords = map.getCoords(player);

		if (!tileEmpty(fireCoords)) {
			chat.sendMessage(player, "You can't light a fire here.");
			return;
		}

		//Remove logs from inv & drop on the ground
		map.dropObj(logType.logId, fireCoords, player);
		inv.take(player, logType.logId, 1, Inv.BACKPACK, slot);
		chat.sendSpamMessage(player, "You attempt to light the logs.");

		var process = function () {
			if (tileEmpty(fireCoords)) {
				if (Math.random() < getFireSuccessRate(player)) {
					firemakingSuccess(player, logType);
				} else {
					anim.run(player, 16700, process);
				}
			}
		};
		anim.run(player, 16700, process);
	}

	function firemakingSuccess (player, logType) {
		map.takeObj(logType.logId, map.getCoords(player));
		var coord = _map.getCoords(player);
		var loc = _map.addLoc(logType.fireId, coord, 10, 0);//Spawn the fire
		_map.delay(coord, function () {
			map.delLoc(loc);
		}, logType.duration);
		_entity.moveAdjacent(player);
		stat.giveXp(player, Stat.FIREMAKING, logType.lightXp);//Add firemaking xp
		chat.sendSpamMessage(player, "The fire catches and the logs begin to burn.");
	}

	function tileEmpty (coord) {
		return !map.getLoc(coord, 10);
	}

	function getFireSuccessRate (player) {
		//A veteran player came up with this for me based on his experience. It starts to succeed always at first try
		//at level 41. Apparently it's the same regardless of the logs level requirement.
		return (0.02*(stat.getLevel(player, Stat.FIREMAKING)-1)+0.2);
	}
})();
