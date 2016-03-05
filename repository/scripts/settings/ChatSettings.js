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

/** 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 20/12/2014
 */

var ChatSettingsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, interfaceID, args) {
		var player = args.player;
		var slot = args.slot;
		
		switch (args.component) {
		case 32://Click-through chatboxes
			var enabled = api.getVarBit(player, 20188) == 1;
			api.setVarBit(player, 20188, enabled ? 0 : 1);
			return;
		case 36://Timestamps in chatbox
			var enabled = api.getVarBit(player, 27452) == 1;
			api.setVarBit(player, 27452, enabled ? 0 : 1);
			return;
		case 40://Split private chat
			var enabled = api.getVarBit(player, 20187) == 1;
			api.setVarBit(player, 20187, enabled ? 0 : 1);
			return;
		case 44://Show/hide login/logout notifications
			var enabled = api.getVarBit(player, 24940) == 1;
			api.setVarBit(player, 24940, enabled ? 0 : 1);
			return;
		case 48://Hide public chat effects
			var enabled = api.getVarp(player, 456) == 0;
			api.setVarp(player, 456, enabled ? 1 : 0);
			return;
		case 58://Public chat colour
			api.setVarBit(player, 24562, 7);
			api.setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 62://Friend chat colour
			api.setVarBit(player, 24562, 0);
			api.setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 66://Private chat colour
			api.setVarBit(player, 24562, 1);
			api.setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 70://Clan chat colour
			api.setVarBit(player, 24562, 2);
			api.setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 74://Guest clan chat colour
			api.setVarBit(player, 24562, 3);
			api.setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 78://Group chat colour
			api.setVarBit(player, 24562, 4);
			api.setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 82://Group team chat colour
			api.setVarBit(player, 24562, 5);
			api.setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 86://Twitch chat colour
			api.setVarBit(player, 24562, 6);
			api.setWidgetEvents(player, 1702, 96, 0, 20, 2);
			return;
		case 96:
			var mode = api.getVarBit(player, 24562);
			switch (mode) {
			case 0://Friend chat
				api.setVarBit(player, 1190, slot);
				return;
			case 1://Private chat
				api.setVarp(player, 457, slot);
				return;
			case 2://Clan chat
				api.setVarBit(player, 1188, slot);
				return;
			case 3://Guest clan chat
				api.setVarBit(player, 1191, slot);
				return;
			case 4://Group chat
				api.setVarBit(player, 24560, slot);
				return;
			case 5://Team Group chat
				api.setVarBit(player, 24561, slot);
				return;
			case 6://Twitch chat
				api.setVarBit(player, 21371, slot);
				return;
			case 7://Public chat
				api.setVarBit(player, 30165, slot);
				return;
			default:
				api.sendMessage(player, "Unhandled chat mode: component="+args.component+", slot="+args.slot+", button="+args.button+", mode="+mode);
				return;
			}
		case 106://Enable friends chat window
			var disabled = api.getVarBit(player, 30167) == 1;
			api.setVarBit(player, 30167, disabled ? 0 : 1);
			return;
		case 111://Enable private chat window
			if (api.getVarBit(player, 20187) != 1) {
				var disabled = api.getVarBit(player, 30166) == 1;
				api.setVarBit(player, 30166, disabled ? 0 : 1);
			}
			return;
		case 116://Enable clan chat window
			var disabled = api.getVarBit(player, 30168) == 1;
			api.setVarBit(player, 30168, disabled ? 0 : 1);
			return;
		case 121://Enable guest clan chat window
			var disabled = api.getVarBit(player, 30169) == 1;
			api.setVarBit(player, 30169, disabled ? 0 : 1);
			return;
		case 126://Enable group chat window
			var disabled = api.getVarBit(player, 30171) == 1;
			api.setVarBit(player, 30171, disabled ? 0 : 1);
			return;
		case 131://Enable trade/assist chat window
			var disabled = api.getVarBit(player, 30170) == 1;
			api.setVarBit(player, 30170, disabled ? 0 : 1);
			return;
		case 137://Use fullname prefix
			api.setVarBit(player, 30172, 0);
			return;
		case 141://Use short prefix
			api.setVarBit(player, 30172, 1);
			return;
		case 145://Use no prefix
			api.setVarBit(player, 30172, 2);
			return;
		default:
			api.sendMessage(player, "Unhandled chat settings button: component="+args.component+", slot="+args.slot+", button="+args.button);
			return;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var chatSettingsListener = new ChatSettingsListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1702, chatSettingsListener);
};