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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 08/01/2015
 */
var GameSettingsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, interfaceID, args) {
		function openTab () {
			api.hideWidget(player, 1443, 10, true);
			api.hideWidget(player, 1443, 19, true);
			api.hideWidget(player, 1443, 28, true);
			api.hideWidget(player, 1443, 37, true);
			api.hideWidget(player, 1443, 46, true);
			api.hideWidget(player, 1443, 57, true);
			api.hideWidget(player, 1443, 65, true);
			api.hideWidget(player, 1443, 74, true);
			switch (api.getVarBit(player, 29043)) {
			case 0://Gameplay
				api.openWidget(player, 1443, 68, 1663, true);
				api.hideWidget(player, 1443, 10, false);
				return;
			case 1://Loot
				api.openWidget(player, 1443, 68, 1623, true);
				api.hideWidget(player, 1443, 19, false);
				return;
			case 2://Death store
				api.openWidget(player, 1443, 68, 1662, true);
				api.hideWidget(player, 1443, 28, false);
				return;
			case 3://Player owned house
				api.openWidget(player, 1443, 68, 1664, true);
				api.hideWidget(player, 1443, 37, false);
				return;
			case 4://Action bar
				api.openWidget(player, 1443, 68, 970, true);
				api.hideWidget(player, 1443, 46, false);
				return;
			case 5://Doomsayer warnings
				api.openWidget(player, 1443, 68, 583, true);
				api.hideWidget(player, 1443, 57, false);
				return;
			case 6://Misc
				api.openWidget(player, 1443, 68, 1674, true);
				api.hideWidget(player, 1443, 65, false);
				return;
			case 7://Aid
				api.openWidget(player, 1443, 68, 1690, true);
				api.hideWidget(player, 1443, 74, false);
				return;
			}
		}
		
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			openTab();
		} else {
			switch (args.component) {
			case 9://Gameplay settings
				api.setVarBit(player, 29043, 0);
				openTab();
				return;
			case 18://Loot settings
				api.setVarBit(player, 29043, 1);
				openTab();				
				return;
			case 27://Death store settings
				api.setVarBit(player, 29043, 2);
				openTab();
				return;
			case 36://Player owned house settings
				api.setVarBit(player, 29043, 3);
				openTab();
				return;
			case 45://Action bar settings
				api.setVarBit(player, 29043, 4);
				openTab();
				return;
			case 56://Doomsayer warning settings
				api.setVarBit(player, 29043, 5);
				openTab();
				return;
			case 64://Misc settings
				api.setVarBit(player, 29043, 6);
				openTab();				
				return;
			case 73://Aid settings
				api.setVarBit(player, 29043, 7);
				openTab();
				return;
			default:
				api.sendMessage(player, "Unhandled game settings tab: comp="+args.component+", slot="+args.slot+", button="+args.button);
				return;
			}
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new GameSettingsListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1443, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 1443, listener);
};