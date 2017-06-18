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
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var chat = require('../../chat');
var dialog = require('../../dialog');
var widget = require('../../widget');

var disassembly = require('../invention/disassembly');
var makex = require('../makex');

/**
 * 
 */
module.exports = (function () {
	return {
		cast : cast,
		castOnItem : castOnItem
	};
	
	function cast (player, spellId) {
		//param 2871 = spellbook (0=Normal, 1=Ancient, 2=Lunar, 3=Common, 4=Dungeoneering)
		//varbit 0 = active spellbook
		switch (spellId) {
		case 14740://Enchant bolts
			enchantCrossbowBolts(player);
			return;
		case 14875://Home teleport
			widget.openCentral(player, 1092);
			return;
		default:
			chat.sendDebugMessage(player, "Spell not yet implemented: "+spellId);
		}
	}
	
	function castOnItem (player, spellId, objId, slot) {
		switch (spellId) {
		case 32942://Analyse
			disassembly.analyseItem(player, objId);
			return;
		case 32943://Disassemble
			disassembly.start(player, objId, slot);
			return;
		default:
			chat.sendDebugMessage(player, "Spell not yet implemented: "+spellId);
			return;
		}
	}
	
	function enchantCrossbowBolts (player) {
		makex.selectProduct(player, -1, -1, 6761, -1, "Enchant Bolts");
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				varp(player, 1175, productId);
				var text = "You enchant the bolts.";
				makex.startCrafting(player, amount, 21670, text);
			}
		});
	}
})();