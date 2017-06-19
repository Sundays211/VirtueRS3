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
/* globals EventType, Inv, Java */
var component = require('../../widget/component');
var varbit = require('../../core/var/bit');

var Spellbook = Java.type('org.virtue.game.content.skills.magic.Spellbook');

var config = require('../../core/config');
var util = require('../../core/util');
var chat = require('../../chat');
var inv = require('../../inv');
var widget = require('../../widget');

var spellbook = require('../../skill/magic/spellbook');
var logic = require('./logic');

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 01/02/2015
 */
module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		//Script 8426 = ability book options
		scriptManager.bind(EventType.IF_OPEN, 1461, function (ctx) {
			widget.setEvents(ctx.player, 1461, 1, 0, 189, 97350);
			widget.setEvents(ctx.player, 1461, 7, 0, 16, 2);
		});
		
		scriptManager.bind(EventType.IF_BUTTON1, component(1461, 7), function (ctx) {
			if (ctx.slot === 11) {
				//Toggle hide
				varbit(ctx.player, 27344, !varbit(ctx.player, 27344) ? 1 : 0);
			} else {
				//Save selected magic tab
				varbit(ctx.player, 18791, logic.tabIdFromSlot(ctx.slot));
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON1, component(1461, 1), function (ctx) {
			var player = ctx.player;
			var spell = config.enumValue(6740, ctx.slot);
			//2880 = category (0=combat, 1=teleport, 2=skill, 4=?, 5=ability)
			if (config.structParam(spell, 2880) === 5) {
				logic.runAbility(player, spell);
			} else {
				spellbook.cast(player, spell);
			}
		});
		
		scriptManager.bind(EventType.IF_BUTTON2, component(1461, 1), function (ctx) {
			var player = ctx.player;
			var spellId = config.enumValue(6740, ctx.slot);
			if (config.structParam(spellId, 2874)) {
				//TODO: Logic for off-hand autocast spells
				//varbit 18050 = off-hand autocast spell
				//varbits 21705, 21706 also used for auto-cast spells
				if (varbit(player, 43) === config.structParam(spellId, 2793)) {
					varbit(player, 43, 0);
					chat.sendMessage(player, "Auto-cast spell cleared.");
				} else {
					varbit(player, 43, config.structParam(spellId, 2793));
					//Main-hand spell set to: <spell>
					chat.sendMessage(player, "Auto-cast spell set to: "+config.structParam(spellId, 2794));
				}
				var hardCodedSpell = Spellbook.MODERN.get(spellId);
				if (hardCodedSpell !== null) {
					if (player.getCombatSchedule().getAutocastSpell() !== null) {
						player.getCombatSchedule().setAutocastSpell(null);
					} else {
						player.getCombatSchedule().setAutocastSpell(hardCodedSpell);
					}
				} else {
					chat.sendDebugMessage(player, "Spell not yet implemented: "+spellId);
				}
			} else {
				util.defaultHandler(ctx, "magic abilities");
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
			spellbook.castOnItem(player, spell, objId, ctx.targetSlot);
		});
	}
})();
