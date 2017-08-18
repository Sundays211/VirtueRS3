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

var coords = require('map/coords');

var roomRegistry = require('../room-registry');
var locMap = require('map/location');

module.exports = (function () {
	var room = {
		init : init,
		preview : preview,
		clearPreview : clearPreview
	};
	return room;

	function init (scriptManager) {
		roomRegistry.register(8415, room);
	}

	function preview (zoneCoord, rotation) {
		locMap.addZoneLoc(coords(0,29,79,3,11), zoneCoord, rotation, 15361, 10, 0);//Centerpiece
		locMap.addZoneLoc(coords(0,29,79,1,13), zoneCoord, rotation, 15362, 10, 0);//Big Tree
		locMap.addZoneLoc(coords(0,29,79,6,14), zoneCoord, rotation, 15363, 10, 1);//Tree
		locMap.addZoneLoc(coords(0,29,79,6,8), zoneCoord, rotation, 15364, 10, 0);//Big Plant 1
		locMap.addZoneLoc(coords(0,29,79,0,8), zoneCoord, rotation, 15365, 10, 0);//Big Plant 2
		locMap.addZoneLoc(coords(0,29,79,3,9), zoneCoord, rotation, 15366, 10, 0);//Small Plant 1
		locMap.addZoneLoc(coords(0,29,79,4,13), zoneCoord, rotation, 15367, 10, 0);//Small Plant 2
		
		//Doors
		locMap.addZoneLoc(coords(0,0,0,0,4), zoneCoord, rotation, 15313, 0, 0);
		locMap.addZoneLoc(coords(0,0,0,0,3), zoneCoord, rotation, 15314, 0, 0);
		locMap.addZoneLoc(coords(0,0,0,4,7), zoneCoord, rotation, 15313, 0, 1);
		locMap.addZoneLoc(coords(0,0,0,3,7), zoneCoord, rotation, 15314, 0, 1);
		locMap.addZoneLoc(coords(0,0,0,7,3), zoneCoord, rotation, 15313, 0, 2);
		locMap.addZoneLoc(coords(0,0,0,7,4), zoneCoord, rotation, 15314, 0, 2);
		locMap.addZoneLoc(coords(0,0,0,3,0), zoneCoord, rotation, 15313, 0, 3);
		locMap.addZoneLoc(coords(0,0,0,4,0), zoneCoord, rotation, 15314, 0, 3);
	}

	function clearPreview (zoneCoord, rotation) {
		locMap.delZoneLoc(coords(0,29,79,3,11), zoneCoord, rotation, 15361, 10, 0);//Centerpiece
		locMap.delZoneLoc(coords(0,29,79,1,13), zoneCoord, rotation, 15362, 10, 0);//Big Tree
		locMap.delZoneLoc(coords(0,29,79,6,14), zoneCoord, rotation, 15363, 10, 1);//Tree
		locMap.delZoneLoc(coords(0,29,79,6,8), zoneCoord, rotation, 15364, 10, 0);//Big Plant 1
		locMap.delZoneLoc(coords(0,29,79,0,8), zoneCoord, rotation, 15365, 10, 0);//Big Plant 2
		locMap.delZoneLoc(coords(0,29,79,3,9), zoneCoord, rotation, 15366, 10, 0);//Small Plant 1
		locMap.delZoneLoc(coords(0,29,79,4,13), zoneCoord, rotation, 15367, 10, 0);//Small Plant 2
		
		//Doors
		locMap.delZoneLoc(coords(0,0,0,0,4), zoneCoord, rotation, 15313, 0, 0);
		locMap.delZoneLoc(coords(0,0,0,0,3), zoneCoord, rotation, 15314, 0, 0);
		locMap.delZoneLoc(coords(0,0,0,4,7), zoneCoord, rotation, 15313, 0, 1);
		locMap.delZoneLoc(coords(0,0,0,3,7), zoneCoord, rotation, 15314, 0, 1);
		locMap.delZoneLoc(coords(0,0,0,7,3), zoneCoord, rotation, 15313, 0, 2);
		locMap.delZoneLoc(coords(0,0,0,7,4), zoneCoord, rotation, 15314, 0, 2);
		locMap.delZoneLoc(coords(0,0,0,3,0), zoneCoord, rotation, 15313, 0, 3);
		locMap.delZoneLoc(coords(0,0,0,4,0), zoneCoord, rotation, 15314, 0, 3);
	}
})();