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
		preview : preview
	};
	return room;

	function init (scriptManager) {
		roomRegistry.register(room, 8395);
	}

	function preview (zoneCoord, rotation) {
		//Chairs
		locMap.addZoneLoc(coords(0,0,0,2,60), zoneCoord, rotation, 15410, 11, 2);
		locMap.addZoneLoc(coords(0,0,0,5,60), zoneCoord, rotation, 15411, 11, 1);
		locMap.addZoneLoc(coords(0,0,0,4,59), zoneCoord, rotation, 15412, 10, 2);

		/*//Rug space
		locMap.addZoneLoc(coords(0,0,0,3,59), zoneCoord, rotation, 15413, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,3,60), zoneCoord, rotation, 15413, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,4,59), zoneCoord, rotation, 15413, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,4,60), zoneCoord, rotation, 15413, 22, 2);

		locMap.addZoneLoc(coords(0,0,0,2,59), zoneCoord, rotation, 15414, 22, 3);
		locMap.addZoneLoc(coords(0,0,0,2,60), zoneCoord, rotation, 15414, 22, 3);
		locMap.addZoneLoc(coords(0,0,0,3,58), zoneCoord, rotation, 15414, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,4,58), zoneCoord, rotation, 15414, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,3,61), zoneCoord, rotation, 15414, 22, 0);
		locMap.addZoneLoc(coords(0,0,0,4,61), zoneCoord, rotation, 15414, 22, 0);
		locMap.addZoneLoc(coords(0,0,0,5,59), zoneCoord, rotation, 15414, 22, 1);
		locMap.addZoneLoc(coords(0,0,0,5,60), zoneCoord, rotation, 15414, 22, 1);

		locMap.addZoneLoc(coords(0,0,0,2,61), zoneCoord, rotation, 15415, 22, 0);
		locMap.addZoneLoc(coords(0,0,0,5,61), zoneCoord, rotation, 15415, 22, 1);
		locMap.addZoneLoc(coords(0,0,0,5,58), zoneCoord, rotation, 15415, 22, 2);
		locMap.addZoneLoc(coords(0,0,0,2,58), zoneCoord, rotation, 15415, 22, 3);*/

		//Bookcases
		locMap.addZoneLoc(coords(0,0,0,0,57), zoneCoord, rotation, 15416, 10, 0);
		locMap.addZoneLoc(coords(0,0,0,7,57), zoneCoord, rotation, 15416, 10, 2);

		//Fireplace
		locMap.addZoneLoc(coords(0,0,0,3,63), zoneCoord, rotation, 15418, 10, 1);

		//Curtains
		locMap.addZoneLoc(coords(0,0,0,0,58), zoneCoord, rotation, 15419, 5, 0);
		locMap.addZoneLoc(coords(0,0,0,0,61), zoneCoord, rotation, 15419, 5, 0);
		locMap.addZoneLoc(coords(0,0,0,2,63), zoneCoord, rotation, 15419, 5, 1);
		locMap.addZoneLoc(coords(0,0,0,5,63), zoneCoord, rotation, 15419, 5, 1);
		locMap.addZoneLoc(coords(0,0,0,7,58), zoneCoord, rotation, 15419, 5, 2);
		locMap.addZoneLoc(coords(0,0,0,7,61), zoneCoord, rotation, 15419, 5, 2);
		locMap.addZoneLoc(coords(0,0,0,2,56), zoneCoord, rotation, 15419, 5, 3);
		locMap.addZoneLoc(coords(0,0,0,5,56), zoneCoord, rotation, 15419, 5, 3);
		
		//Doors
		locMap.addZoneLoc(coords(0,0,0,0,4), zoneCoord, rotation, 15313, 0, 0);
		locMap.addZoneLoc(coords(0,0,0,0,3), zoneCoord, rotation, 15314, 0, 0);
		locMap.addZoneLoc(coords(0,0,0,7,3), zoneCoord, rotation, 15313, 0, 2);
		locMap.addZoneLoc(coords(0,0,0,7,4), zoneCoord, rotation, 15314, 0, 2);
		locMap.addZoneLoc(coords(0,0,0,3,0), zoneCoord, rotation, 15313, 0, 3);
		locMap.addZoneLoc(coords(0,0,0,4,0), zoneCoord, rotation, 15314, 0, 3);
	}
})();