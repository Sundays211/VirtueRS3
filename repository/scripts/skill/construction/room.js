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

module.exports = {
	PARLOUR : {
		objId : 8395,
		typeId : 1,
		srcCoord : coords(0,29,79,0,56),
		doors : [false, true, true, true]
	},
	GARDEN : {
		objId : 8415,
		typeId : 2,
		doors : [true, true, true, true],
		srcCoord : coords(0,29,79,0,8)
	},
	KITCHEN : {
		objId : 8396,
		typeId : 3,
		doors : [false, false, true, true],
		srcCoord : coords(0,29,79,16,56),
		hotspots : [
			[ 8216, 8217, 8218, 8219, 8220, 8221, 8222 ],//Range
			[ 8223, 8224, 8225, 8226, 8227, 8228, 8229 ],//Shelves
			[ 8239, 8240, 8241, 8242, 8243, 8244 ],//Beer barrel
		]
	},
	DINING : {
		objId : 8397,
		typeId : 4,
		doors : [false, true, true, true],
		srcCoord : coords(0,29,79,32,56),
	},
	BEDROOM : {
		objId : 8398,
		typeId : 5,
		doors : [false, false, true, true],
		srcCoord : coords(0,29,79,48,56),
	},
	GAME : {
		objId : 8399,
		typeId : 6,
		srcCoord : coords(0,29,79,40,32),
	},
	SKILL_HALL_DOWNSTAIRS : {
		objId : 8401,
		typeId : 7,
		srcCoord : coords(0,29,79,8,48),
	},
	SKILL_HALL_UPSTAIRS : {
		objId : 8402,
		typeId : 8,
		srcCoord : coords(0,29,79,24,48),
	},
	QUEST_HALL_DOWNSTAIRS : {
		objId : 8403,
		typeId : 9,
		srcCoord : coords(0,29,79,40,48),
	},
	QUEST_HALL_UPSTAIRS : {
		objId : 8404,
		typeId : 10,
		srcCoord : coords(0,29,79,56,48),
	},
	CHAPEL : {
		objId : 8405,
		typeId : 11,
		srcCoord : coords(0,29,79,16,40),
	},
	WORKSHOP : {
		objId : 8406,
		typeId : 12,
		doors : [true, false, true, false],
		srcCoord : coords(0,29,79,0,40),
	},
	STUDY : {
		objId : 8407,
		typeId : 13,
		srcCoord : coords(0,29,79,32,40),
	},
	PORTAL_CHAMBER : {
		objId : 8408,
		typeId : 14,
		srcCoord : coords(0,29,79,8,32),
	},
	COMBAT : {
		id : 8400,
		srcCoord : coords(0,29,79,24,32),
	},
	THRONE : {
		id : 8409,
		srcCoord : coords(0,29,79,48,40),
	},
	OUBLIETTE : {
		id : 8410,
		srcCoord : coords(0,29,79,48,24),
	},
	DUNGEON_CORRIDOR : {
		id : 8411,
		srcCoord : coords(0,29,79,32,24),
	},
	DUNGEON_CROSS : {
		id : 8412,
		srcCoord : coords(0,29,79,0,24),
	},
	DUNGEON_STAIRS : {
		id : 8413,
		srcCoord : coords(0,29,79,16,24),
	},
	TREASURE_ROOM : {
		id : 8414,
		srcCoord : coords(0,29,79,56,32),
	},
	FORMAL_GARDEN : {
		id : 8416,
		srcCoord : coords(0,29,79,16,8),
	},
	COSTUME_ROOM : {
		id : 9842,
		srcCoord : coords(0,29,79,48,8),
	},
	MENAGERIE : {
		id : 15221,
		srcCoord : coords(0,29,79,56,16),
	},
	PIT_DUNGEON : {
		id : 18800,
		srcCoord : coords(0,29,79,40,16),
	},
	AQUARIUM : {
		id : 34685,
		srcCoord : coords(0,29,79,56,0),
	}//in the aquarium 0,24,104,11,10
};
