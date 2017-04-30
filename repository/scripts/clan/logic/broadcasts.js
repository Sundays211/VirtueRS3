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
/* globals ENGINE, CLAN_ENGINE */
/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 29/12/2014
 */

module.exports = init();

function init () {
	var broadcasts = {
		send : send,
		isEnabled : isEnabled,
		setEnabled : setEnabled,
		setMinimumVisibleRank : setMinimumVisibleRank
	};
	
	return broadcasts;
	
	function send (clanHash, type, find, replace) {
		CLAN_ENGINE.sendBroadcast(clanHash, type, find, replace);
	}
	
	function isEnabled (player, type) {
		switch (type) {
		case 0:
			return ENGINE.getVarBit(player, 21957);
		case 1:
			return ENGINE.getVarBit(player, 21958);
		case 2:
			return ENGINE.getVarBit(player, 21959);
		case 3:
			return ENGINE.getVarBit(player, 21960);
		case 4:
			return ENGINE.getVarBit(player, 21961);
		case 5:
			return ENGINE.getVarBit(player, 21962);
		case 6:
			return ENGINE.getVarBit(player, 21963);
		case 7:
			return ENGINE.getVarBit(player, 21964);
		case 8:
			return ENGINE.getVarBit(player, 21965);
		case 9:
			return ENGINE.getVarBit(player, 21966);
		case 10:
			return ENGINE.getVarBit(player, 21967);
		case 11:
			return ENGINE.getVarBit(player, 21968);
		case 12:
			return ENGINE.getVarBit(player, 21969);
		case 13:
			return ENGINE.getVarBit(player, 21970);
		case 14:
			return ENGINE.getVarBit(player, 21971);
		case 15:
			return ENGINE.getVarBit(player, 21972);
		case 16:
			return ENGINE.getVarBit(player, 21973);
		case 17:
			return ENGINE.getVarBit(player, 21974);
		case 18:
			return ENGINE.getVarBit(player, 21975);
		case 19:
			return ENGINE.getVarBit(player, 21976);
		case 20:
			return ENGINE.getVarBit(player, 21977);
		case 21:
			return ENGINE.getVarBit(player, 21978);
		case 22:
			return ENGINE.getVarBit(player, 21979);
		case 23:
			return ENGINE.getVarBit(player, 21980);
		case 24:
			return ENGINE.getVarBit(player, 21981);
		case 25:
			return ENGINE.getVarBit(player, 21982);
		case 26:
			return ENGINE.getVarBit(player, 21983);
		case 27:
			return ENGINE.getVarBit(player, 21984);
		case 28:
			return ENGINE.getVarBit(player, 21985);
		case 29:
			return ENGINE.getVarBit(player, 21986);
		default:
			return 0;
		}
	}

	function setEnabled (player, type, enabled) {
		switch (type) {
		case 0:
			return ENGINE.setVarBit(player, 21957, enabled);
		case 1:
			return ENGINE.setVarBit(player, 21958, enabled);
		case 2:
			return ENGINE.setVarBit(player, 21959, enabled);
		case 3:
			return ENGINE.setVarBit(player, 21960, enabled);
		case 4:
			return ENGINE.setVarBit(player, 21961, enabled);
		case 5:
			return ENGINE.setVarBit(player, 21962, enabled);
		case 6:
			return ENGINE.setVarBit(player, 21963, enabled);
		case 7:
			return ENGINE.setVarBit(player, 21964, enabled);
		case 8:
			return ENGINE.setVarBit(player, 21965, enabled);
		case 9:
			return ENGINE.setVarBit(player, 21966, enabled);
		case 10:
			return ENGINE.setVarBit(player, 21967, enabled);
		case 11:
			return ENGINE.setVarBit(player, 21968, enabled);
		case 12:
			return ENGINE.setVarBit(player, 21969, enabled);
		case 13:
			return ENGINE.setVarBit(player, 21970, enabled);
		case 14:
			return ENGINE.setVarBit(player, 21971, enabled);
		case 15:
			return ENGINE.setVarBit(player, 21972, enabled);
		case 16:
			return ENGINE.setVarBit(player, 21973, enabled);
		case 17:
			return ENGINE.setVarBit(player, 21974, enabled);
		case 18:
			return ENGINE.setVarBit(player, 21975, enabled);
		case 19:
			return ENGINE.setVarBit(player, 21976, enabled);
		case 20:
			return ENGINE.setVarBit(player, 21977, enabled);
		case 21:
			return ENGINE.setVarBit(player, 21978, enabled);
		case 22:
			return ENGINE.setVarBit(player, 21979, enabled);
		case 23:
			return ENGINE.setVarBit(player, 21980, enabled);
		case 24:
			return ENGINE.setVarBit(player, 21981, enabled);
		case 25:
			return ENGINE.setVarBit(player, 21982, enabled);
		case 26:
			return ENGINE.setVarBit(player, 21983, enabled);
		case 27:
			return ENGINE.setVarBit(player, 21984, enabled);
		case 28:
			return ENGINE.setVarBit(player, 21985, enabled);
		case 29:
			return ENGINE.setVarBit(player, 21986, enabled);
		default:
			return false;
		}
	}

	function setMinimumVisibleRank (player, type, rank) {
		switch (type) {
		case 0:
			return ENGINE.setVarBit(player, 21993, rank);
		case 1:
			return ENGINE.setVarBit(player, 21994, rank);
		case 2:
			return ENGINE.setVarBit(player, 21995, rank);
		case 3:
			return ENGINE.setVarBit(player, 21996, rank);
		case 4:
			return ENGINE.setVarBit(player, 21997, rank);
		case 5:
			return ENGINE.setVarBit(player, 21998, rank);
		case 6:
			return ENGINE.setVarBit(player, 21999, rank);
		case 7:
			return ENGINE.setVarBit(player, 22000, rank);	
		case 8:
			return ENGINE.setVarBit(player, 22001, rank);	
		case 9:
			return ENGINE.setVarBit(player, 22002, rank);	
		case 10:
			return ENGINE.setVarBit(player, 22003, rank);	
		case 11:
			return ENGINE.setVarBit(player, 22004, rank);	
		case 12:
			return ENGINE.setVarBit(player, 22005, rank);	
		case 13:
			return ENGINE.setVarBit(player, 22006, rank);	
		case 14:
			return ENGINE.setVarBit(player, 22007, rank);	
		case 15:
			return ENGINE.setVarBit(player, 22008, rank);	
		case 16:
			return ENGINE.setVarBit(player, 22009, rank);	
		case 17:
			return ENGINE.setVarBit(player, 22010, rank);
		case 18:
			return ENGINE.setVarBit(player, 22011, rank);
		case 19:
			return ENGINE.setVarBit(player, 22012, rank);
		case 20:
			return ENGINE.setVarBit(player, 22013, rank);
		case 21:
			return ENGINE.setVarBit(player, 22014, rank);
		case 22:
			return ENGINE.setVarBit(player, 22015, rank);
		case 23:
			return ENGINE.setVarBit(player, 22016, rank);
		case 24:
			return ENGINE.setVarBit(player, 22017, rank);
		case 25:
			return ENGINE.setVarBit(player, 22018, rank);
		case 26:
			return ENGINE.setVarBit(player, 22019, rank);
		case 27:
			return ENGINE.setVarBit(player, 22020, rank);
		case 28:
			return ENGINE.setVarBit(player, 22021, rank);
		case 29:
			return ENGINE.setVarBit(player, 22022, rank);
		default:
			return false;
		}
	}
}
