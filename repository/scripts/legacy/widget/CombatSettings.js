/**
 * Copyright (c) 2015 Virtue Studios
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
 * @since Jan 7, 2015
 */

var CombatSettingsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		switch (args.component) {
		case 2://sheathe
			player.switchSheathing();
			return;
		case 4://special attack
			player.getCombatSchedule().updateAdrenaline(1000);
			player.getCombatSchedule().setSpecialEnabled(!player.getCombatSchedule().isSpecialEnabled());
			player.getCombatSchedule().setDefaultAttack();
			api.sendMessage(player, "Special is " + (player.getCombatSchedule().isSpecialEnabled() ? "enabled." : "disabled."));
			return true;
		case 49://retaliate
			var wasRetaliating = api.getVarp(player, 462) == 0;
			api.setVarp(player, 462, wasRetaliating ? 1 : 0);
			return;
		case 32://attack
		case 36://balance
		case 40://strength
		case 44://defence
		default:
			api.sendMessage(player, "Unhandled combat settings button: comp="+args.component+", button="+args.button+", slot="+args.slot);
			return;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new CombatSettingsListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1503, listener);
};