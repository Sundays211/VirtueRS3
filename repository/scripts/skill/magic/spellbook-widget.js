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
/* globals EventType, Java, Inv */
var component = require('../../widget/component');
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var Spellbook = Java.type('org.virtue.game.content.skills.magic.Spellbook');

var inv = require('../../inv');
var widget = require('../../widget');
var chat = require('../../chat');
var dialog = require('../../dialog');
var config = require('../../core/config');
var util = require('../../core/util');

var disassembly = require('../invention/disassembly');
var makex = require('../makex');

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 04/04/2016
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.IF_OPEN, 1461, function (ctx) {
			widget.setEvents(ctx.player, 1461, 1, 0, 189, 97350);
			widget.setEvents(ctx.player, 1461, 7, 7, 16, 2);
		});
		
		scriptManager.bind(EventType.IF_BUTTON1, component(1461, 1), function (ctx) {
			var player = ctx.player;
			var spell = config.enumValue(6740, ctx.slot);
			
			switch (spell) {
			case 14740://Enchant bolts
				enchantCrossbowBolts(player);
				return;
			case 14875://Home teleport
				widget.openCentral(player, 1092);
				return;
			default:
				var hardCodedSpell = Spellbook.MODERN.get(ctx.slot);
				if (hardCodedSpell !== null) {
					if (player.getCombatSchedule().getAutocastSpell() !== null) {
						player.getCombatSchedule().setAutocastSpell(null);
						chat.sendMessage(player, "Auto-cast spell cleared.");
					} else {
						player.getCombatSchedule().setAutocastSpell(hardCodedSpell);
						chat.sendMessage(player, "Main-hand spell set to: spell");
					}
				} else {
					util.defaultHandler(ctx, "magic abilities");
				}
			}
		});
				
		scriptManager.bind(EventType.IF_BUTTONT, component(1461, 1), function (ctx) {
			var player = ctx.player;
			
			if (ctx.targetInterface != 1473) {//Spell used on something other than backpack
				util.defaultHandler(ctx, "magic abilities");
				return;
			}
			var spell = config.enumValue(6740, ctx.slot);
			var objId = inv.getObjId(player, Inv.BACKPACK, ctx.targetSlot);
			if (objId === -1) {
				return;//This means the spell wasn't used on an item. We'll just suppress the debug message.
			}
			switch (spell) {
			case 32942://Analyse
				disassembly.analyseItem(player, objId);
				return;
			case 32943://Disassemble
				disassembly.start(player, objId, ctx.targetSlot);
				return;
			default:
				util.defaultHandler(ctx, "magic abilities");
				return;
			}
		});
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
