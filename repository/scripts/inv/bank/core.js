/**
 * Copyright (c) 2016 Virtue Studios
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
/* globals ENGINE, Inv */
var util = require('util');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 22/03/2016
 */
module.exports = (function () {
	return {
		canDeposit : canDeposit,
		deposit : deposit
	};
	
	/**
	 * Checks whether the player has enough space to fit the specified item in their bank
	 */
	function canDeposit (player, objId, count) {
		var storedCount = ENGINE.itemTotal(player, Inv.BANK, objId);
		if (storedCount === 0) {//This means we don't have any of the item in the bank now, so we'll need one more slot
			var emptySlots = ENGINE.freeSpaceTotal(player, Inv.BANK);
			return emptySlots > 0;//TODO: Also count the bank boosters.
		} else {//Check whether we would excede the max count (2^31-1)
			return util.checkOverflow(storedCount, count);
		}
	}
	
	function deposit (player, objId, count) {// jshint ignore:line
		//TODO: Remove jshint ignore when implemented
		//var selectedTab = varbit(player, 288);
		//TODO: Finish this
	}
})();