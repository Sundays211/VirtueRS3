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
		id : 8395,
		srcCoord : coords(0,29,79,0,56),
		hotspots : [
			[ 8309, 8310, 8311, 8312, 8313, 8314, 8315 ],//Chair #1
			[ 8309, 8310, 8311, 8312, 8313, 8314, 8315 ],//Chair #2
			[ 8309, 8310, 8311, 8312, 8313, 8314, 8315 ],//Chair #3
			[ 8316, 8317, 8318 ],//Rug
			[ 8319, 8320, 8321 ],//Bookcase
			[ 8325, 8326, 8327 ],//Fireplace
			[ 8322, 8323, 8324 ]//Curtains
		]
	},
	KITCEN : {
		id : 8396,
		srcCoord : coords(0,29,79,16,56),
		hotspots : [
			[ 8216, 8217, 8218, 8219, 8220, 8221, 8222 ],//Range
			[ 8223, 8224, 8225, 8226, 8227, 8228, 8229 ],//Shelves
			[ 8239, 8240, 8241, 8242, 8243, 8244 ],//Beer barrel
		]
	},
	DINING : {
		id : 8397,
		srcCoord : coords(0,29,79,32,56),
	},
	BEDROOM : {
		id : 8398,
		srcCoord : coords(0,29,79,48,56),
	},
	GAME : {
		id : 8399,
		srcCoord : coords(0,29,79,40,32),
	},
	COMBAT : {
		id : 8400,
		srcCoord : coords(0,29,79,24,32),
	},
	SKILL_HALL_DOWNSTAIRS : {
		id : 8401,
		srcCoord : coords(0,29,79,8,48),
	},
	SKILL_HALL_UPSTAIRS : {
		id : 8402,
		srcCoord : coords(0,29,79,24,48),
	},
	QUEST_HALL_DOWNSTAIRS : {
		id : 8403,
		srcCoord : coords(0,29,79,40,48),
	},
	QUEST_HALL_UPSTAIRS : {
		id : 8404,
		srcCoord : coords(0,29,79,56,48),
	},
	CHAPEL : {
		id : 8405,
		srcCoord : coords(0,29,79,16,40),
	},
	WORKSHOP : {
		id : 8406,
		srcCoord : coords(0,29,79,0,40),
	},
	STUDY : {
		id : 8407,
		srcCoord : coords(0,29,79,32,40),
	},
	PORTAL_CHAMBER : {
		id : 8408,
		srcCoord : coords(0,29,79,8,32),
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
	GARDEN : {
		id : 8415,
		srcCoord : coords(0,29,79,0,8),
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
	},
};
