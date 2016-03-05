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
 * @since 05/03/2016
 */
var MinimapListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		switch (args.component) {
		case 9://Logout
			api.setVarp(player, 3813, 6);
			api.openWidget(player, 1477, 787, 26, true);
			return;
		case 22://Money pouch options
			switch (args.button) {
			case 1://Toggle money pouch
				var wasOpen = api.getVarBit(player, 1192) == 1;
				api.setVarBit(player, 1192, wasOpen ? 0 : 1);
				return;
			case 2://Open Price Checker
				api.openCentralWidget(player, 206, false);
				return;
			case 3://Examine money pouch
				var coins = api.getItem(player, Inv.MONEY_POUCH, 0);
				if (coins != null) {
					var count = api.getFormattedNumber(coins.getAmount());
					api.sendMessage(player, "Your money pouch contains " + count +" coins.");
				}
				return;
			case 4://Withdraw money pouch
				player.getMoneyPouch().removeMoneyPouchCoins();
				return;
			case 6://Bond pouch
				return;//This is client-sided
			case 5://Wealth evaluator
				//player.getWidgets().openWidget(1477, 380, 566, false);
				
			default:
				api.sendMessage(player, "Unhandled coin pouch button: button="+args.button);
				return;
			}			
		case 44://World map
			api.setVarp(player, 3926, 0);
			api.setVarp(player, 3928, -1);
			api.setVarp(player, 3929, -1);
			api.openWidget(player, 1477, 496, 669, true);
			api.setVarc(player, 3838, 0);
			api.setVarc(player, 3840, 0);
			api.hideWidget(player, 1477, 20, true);
			api.hideWidget(player, 1477, 21, true);
			api.hideWidget(player, 1477, 22, true);
			api.hideWidget(player, 1477, 506, true);
			api.hideWidget(player, 1477, 388, true);
			api.setVarp(player, 622, api.getCoordHash(api.getCoords(player)));
			api.setVarp(player, 674, api.getCoordHash(api.getCoords(player)));
			api.openWidget(player, 1477, 15, 1421, true);
			api.openWidget(player, 1477, 16, 1422, false);
			api.openWidget(player, 1422, 107, 698, true);
			/*player.getDispatcher().sendWidgetSettings(1422, 38, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 39, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 40, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 41, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 42, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 43, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 44, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 45, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 46, 2, 2, 2);
			player.getDispatcher().sendWidgetSettings(1422, 47, 2, 2, 2);
			player.getVars().setVarp(622, player.getCurrentTile().getTileHash());
			player.getDispatcher().sendWidgetSettings(1422, 86, 0, 19, 2);
			player.getDispatcher().sendHideWidget(1422, 49, true);
			player.getDispatcher().sendVarc(4197, -1);
			player.getVars().setVarp(674, player.getCurrentTile().getTileHash());*/
			return;		
		case 46://Toggle run
			if (args.button == 1) {
				var running = api.getVarp(player, 463) == 1;
				if (running) {
					api.setVarp(player, 463, 0);
					player.getMovement().setRunning(false);
				} else {
					api.setVarp(player, 463, 1);
					player.getMovement().setRunning(true);
				}
			} else if (args.button == 2) {
				api.runAnimation(player, 5713);
				api.sendMessage(player, "Unhandled rest action...");
			}
			return;
		case 57://Open lodestone interface
			api.openCentralWidget(player, 1092, false);
			return true;
		case 14://Legacy XP counter button
		case 27://Open notes
		case 30://Open group system
		case 33://Open metrics
		case 55://Reset camera
		default:
			api.sendMessage(player, "Unhandled minimap button: comp="+args.component+", slot="+args.slot+", button="+args.button);
			return;
		}		
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new MinimapListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1465, listener);
};

/*case 37:
	player.getVars().setVarValueInt(3708, 137110532);
	player.getVars().setVarValueInt(3708, 137110532);
	player.getVars().setVarValueInt(4719, -1);
	player.getVars().setVarValueInt(4722, -1);
	player.getVars().setVarValueInt(4723, -1);
	player.getVars().setVarValueInt(4724, -1);
	player.getVars().setVarValueInt(4725, -1);
	player.getVars().setVarValueInt(4726, -1);
	player.getVars().setVarValueInt(4727, -1);
	player.getVars().setVarValueInt(4728, -1);
	player.getVars().setVarValueInt(4729, -1);
	player.getVars().setVarValueInt(4730, -1);
	player.getVars().setVarValueInt(4731, -1);
	player.getVars().setVarValueInt(4732, -1);
	player.getVars().setVarValueInt(4733, -1);
	player.getVars().setVarValueInt(4697, 3);
	player.getVars().setVarValueInt(4698, 84);
	player.getVars().setVarValueInt(4721, 3);
	player.getVars().setVarValueInt(4722, 4);
	player.getVars().setVarValueInt(4723, 6);
	player.getVars().setVarValueInt(4725, 3);
	player.getVars().setVarValueInt(4726, 0);
	player.getVars().setVarValueInt(4720, -1);
	player.getDispatcher().sendHideWidget(1477, 377, false);
	player.getDispatcher().sendWidgetEvents(1477, 376, 0, 24, 2);
	player.getDispatcher().sendWidgetEvents(1477, 379, 1, 1, 2);
	player.getDispatcher().sendWidgetEvents(1477, 378, 1, 1, 2);
	player.getDispatcher().sendVarc(2911, 4);
	player.getDispatcher().sendHideWidget(1448, 3, false);
	player.getWidgets().openWidget(1448, 3, 1524, true);
	player.getDispatcher().sendHideWidget(1448, 3, false);
	player.getDispatcher().sendHideWidget(1448, 4, true);
	player.getDispatcher().sendWidgetEvents(1524, 24, 0, 6, 2);
	player.getDispatcher().sendWidgetEvents(1524, 26, 0, 39, 2);
	player.getDispatcher().sendWidgetEvents(1524, 16, 0, 5, 2);
	player.getDispatcher().sendWidgetEvents(1524, 16, 0, 5, 2);
	player.getDispatcher().sendWidgetEvents(1524, 29, 0, 137, 2359296);
	player.getDispatcher().sendWidgetEvents(1524, 66, 0, 137, 2);
	player.getDispatcher().sendHideWidget(1448, 5, false);
	player.getWidgets().openWidget(1448, 5, 1528, true);
	player.getDispatcher().sendHideWidget(1448, 5, false);
	player.getDispatcher().sendHideWidget(1448, 6, true);
	player.getDispatcher().sendHideWidget(1448, 7, true);
	player.getDispatcher().sendHideWidget(1448, 8, true);
	player.getDispatcher().sendHideWidget(1448, 9, true);
	player.getDispatcher().sendHideWidget(1448, 10, true);
	player.getDispatcher().sendHideWidget(1448, 11, true);
	player.getDispatcher().sendHideWidget(1448, 12, true);
	player.getDispatcher().sendHideWidget(1448, 1, true);
	player.getVars().setVarValueInt(4695, 0);
	player.getVars().setVarValueInt(4699, 0);
	break;
			*/
