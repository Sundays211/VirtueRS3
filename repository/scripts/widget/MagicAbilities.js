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

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 04/04/2016
 */
var MageAbilitiesOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		api.setWidgetEvents(player, 1461, 1, 0, 189, 97350);
		api.setWidgetEvents(player, 1461, 7, 7, 16, 2);
	}
});

var MageAbilitiesButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch (args.component) {
		case 1:
			var spell = org.virtue.game.content.skills.magic.Spellbook.MODERN.get(args.slot);
			if (player.getCombatSchedule().getAutocastSpell() != null) {
				player.getCombatSchedule().setAutocastSpell(null);
				api.sendMessage(player, "Auto-cast spell cleared.");
			} else {
				player.getCombatSchedule().setAutocastSpell(spell);
				api.sendMessage(player, "Main-hand spell set to: spell");
			}
		default:
			api.sendMessage(player, "Unhandled mage abilities button: comp="+args.component+", slot="+args.slot+", button="+args.button);
			return;
		}
	}
});

var MageAbilitiesTargetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		var spell = args.slot;
		if (args.targetInterface != 1473) {//Spell used on something other than backpack
			api.sendMessage(player, "Unhandled magic ability target: spell="+spell+", targetInterface="+args.targetInterface+", targetComp="+args.targetComponent);
			return;
		}
		var slot = args.targetSlot;
		var item = api.getItem(player, Inv.BACKPACK, slot);
		if (item == null) {
			return;//This means the spell wasn't used on an item. We'll just suppress the debug message.
		}
		switch (args.slot) {
		case 188://Analyse
			Disassembly.analyseItem(player, api.getId(item));
			return;
		case 189://Disassemble
			Disassembly.startDisassembly(player, item, slot);
			return;
		default:
			api.sendMessage(player, "Unhandled magic spell use: spell="+spell+", slot="+slot+", item="+item);
			return;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new MageAbilitiesOpenListener();	
	scriptManager.registerListener(EventType.IF_OPEN, 1461, listener);
	
	listener = new MageAbilitiesButtonListener();	
	scriptManager.registerListener(EventType.IF_BUTTON, 1461, listener);
	
	listener = new MageAbilitiesTargetListener();	
	scriptManager.registerCompListener(EventType.IF_BUTTONT, 1461, 1, listener);
};

var MagicAbilities = {
		
}