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
/* globals Inv */
var _varbit = require('engine/var/bit');
var _map = require('engine/map');

var chat = require('shared/chat');
var widget = require('shared/widget');
var dialog = require('shared/dialog');
var inv = require('shared/inv');

var houseBuilder = require('./house-builder');

module.exports = (function () {
	return {
		buildFurniture : buildFurniture,
		removeFurniture : removeFurniture
	};

	function removeFurniture (player, roomCoord, hotspotId, callback) {
		dialog.builder(player).confirm("Really remove it?").then(function () {
			var zoneX = _map.getLocalX(roomCoord) >> 3;
			var zoneY = _map.getLocalY(roomCoord) >> 3;
			var level = _map.getLevel(roomCoord);
			var roomId = houseBuilder.loadRoom(player, zoneX, zoneY, level);
			if (roomId === -1) {
				throw "Room not found at "+roomCoord;
			}
			setHotspot(player, hotspotId, 0);
			houseBuilder.storeRoomData(player, roomId);
			callback();
		});
	}

	function buildFurniture (player, roomCoord, hotspotId, options, callback) {
		inv.fillInv(player, Inv.HOUSE_FURNITURE_OPTIONS, options);
		widget.openCentral(player, 1306);
		dialog.setResumeHandler(player, function (value) {
			handleSelectResponse(player, roomCoord, value & 0xffff, hotspotId);
			callback();
		});
	}

	function handleSelectResponse (player, zoneCoord, optionComponentId, hotspotId) {
		var zoneX = _map.getLocalX(zoneCoord) >> 3;
		var zoneY = _map.getLocalY(zoneCoord) >> 3;
		var level = _map.getLevel(zoneCoord);
		var roomId = houseBuilder.loadRoom(player, zoneX, zoneY, level);
		if (roomId === -1) {
			throw "Room not found at "+zoneCoord;
		}

		var slot;
		switch (optionComponentId) {
		case 8:
			slot = 1;
			break;
		case 15:
			slot = 2;
			break;
		case 22:
			slot = 3;
			break;
		case 29:
			slot = 4;
			break;
		case 36:
			slot = 5;
			break;
		case 43:
			slot = 6;
			break;
		case 50:
			slot = 7;
			break;
		default:
			chat.sendDebugMessage(player, "Unhandled furniture creation resume pause: "+optionComponentId);
			return;
		}
		setHotspot(player, hotspotId, slot);
		houseBuilder.storeRoomData(player, roomId);
	}

	function setHotspot (player, hotspotId, value) {
		switch (hotspotId) {
		case 1:
			_varbit(player, 1529, value);
			return;
		case 2:
			_varbit(player, 1530, value);
			return;
		case 3:
			_varbit(player, 1531, value);
			return;
		case 4:
			_varbit(player, 1532, value);
			return;
		case 5:
			_varbit(player, 1533, value);
			return;
		case 6:
			_varbit(player, 1534, value);
			return;
		case 7:
			_varbit(player, 1535, value);
			return;
		}
	}
})();
