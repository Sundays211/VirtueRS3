/**
 * Copyright (c) 2016 Virtue Studios
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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/01/2016
 */
var QuestListListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			api.setWidgetEvents(player, 190, 17, 0, 300, 14);
			api.setWidgetEvents(player, 190, 40, 0, 11, 2);
			api.hideWidget(player, 1500, 325, false);
			api.hideWidget(player, 1500, 4, false);
			api.hideWidget(player, 1500, 5, true);
			api.runClientScript(player, 4021, ["Cook's Assistant"]);
		} else {		
			switch (args.component) {
			case 3://Filter 1
			case 4:
				api.sendMessage(player, "TODO: Find the right varbit for filter 1");
				//var enabled = api.getVarBit(player, 318) == 1;
				//api.setVarBit(player, 318, enabled ? 0 : 1);
				return;
			case 5://Filter 2
			case 8:
				var enabled = api.getVarBit(player, 316) == 1;
				api.setVarBit(player, 316, enabled ? 0 : 1);
				return;
			case 9://Hide done
			case 12:
				api.sendMessage(player, "TODO: Find the right varbit for hide done");
				//var enabled = api.getVarBit(player, 317) == 1;
				//api.setVarBit(player, 317, enabled ? 0 : 1);
				return;
			case 40://Category
				api.setVarBit(player, 315, args.slot);
				return;
			case 17:
				switch (args.button) {
				case 1:
				case 2:
					api.sendMessage(player, "Quest not added Overview/journal slot=" + args.slot);
					return;
				default:
					api.sendMessage(player, "Option " + args.button);
					return;
				}
				return;
				//3936
			default:
				api.sendMessage(player, "Unhandled quest list button: comp="+args.component+", slot="+args.slot+", button="+args.button)
				return;
			}		
		}
	}
});

/*
 * player.getDispatcher().sendHideWidget(1500, 325, false);
	player.getDispatcher().sendVarc(695, 0);
	player.getWidgets().sendOverlay(3, -1);
	player.getDispatcher().sendHideWidget(1448, 3, false);
	player.getWidgets().closeWidget(1448, 3);
	player.getWidgets().openWidget(1448, 3, 190, true);
	player.getDispatcher().sendHideWidget(1448, 3, false);
	player.getDispatcher().sendHideWidget(1448, 4, true);
	player.getDispatcher().sendWidgetSettings(190, 17, 0, 300, 14);
	player.getDispatcher().sendWidgetSettings(190, 40, 0, 11, 2);
	player.getDispatcher().sendHideWidget(1448, 5, false);
	player.getWidgets().openWidget(1448, 5, 1500, true);
	player.getDispatcher().sendHideWidget(1448, 5, false);
	player.getDispatcher().sendHideWidget(1448, 6, true);
	player.getDispatcher().sendHideWidget(1448, 7, true);
	player.getDispatcher().sendHideWidget(1448, 8, true);
	player.getDispatcher().sendHideWidget(1448, 9, true);
	player.getDispatcher().sendHideWidget(1448, 10, true);
	player.getDispatcher().sendHideWidget(1448, 11, true);
	player.getDispatcher().sendHideWidget(1448, 12, true);
	player.getDispatcher().sendHideWidget(1448, 1, true);
	player.getDispatcher().sendHideWidget(1500, 4, false);
	player.getDispatcher().sendHideWidget(1500, 5, true);
	player.getDispatcher().sendRunScript(4021, new Object[] { "Cook's Assistant" });
 */

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new QuestListListener();
	scriptManager.registerListener(EventType.IF_OPEN, 190, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 190, listener);
};