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
var LootSettingsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, interfaceID, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			api.setWidgetEvents(player, 1623, 128, 0, 20, 2359296);
			api.setWidgetEvents(player, 1623, 129, 0, 20, 2);
		} else if (event == EventType.IF_DRAG) {
			if (args.toslot >= 0 && args.toslot < 20) {
				api.setVarBit(player, 21238, (args.toslot+1)*50000);
			}
		} else {
			switch (args.component) {
			case 30://Use loot inventory
				var enabled = api.getVarBit(player, 27942) == 1;
				api.setVarBit(player, 27942, enabled ? 0 : 1);
				return;
			case 37://Use area loot
				var enabled = api.getVarBit(player, 27943) == 1;
				api.setVarBit(player, 27943, enabled ? 0 : 1);
				return;
			case 114://Enable right click to open interface
				var enabled = api.getVarBit(player, 27961) == 1;
				api.setVarBit(player, 27961, enabled ? 0 : 1);
				return;
			case 43://Loot by monatary value
				var enabled = api.getVarBit(player, 27945) == 1;
				api.setVarBit(player, 27945, enabled ? 0 : 1);
				return;
			case 48://Select monatary value
				api.sendMessage(player, "Unhandled monatary value selector");
				return;
			case 52://Loot armour and weapons
				var enabled = api.getVarBit(player, 27947) == 1;
				api.setVarBit(player, 27947, enabled ? 0 : 1);
				return;
			case 58://Loot ammo
				var enabled = api.getVarBit(player, 27948) == 1;
				api.setVarBit(player, 27948, enabled ? 0 : 1);
				return;
			case 64://Loot combat consumables
				var enabled = api.getVarBit(player, 27949) == 1;
				api.setVarBit(player, 27949, enabled ? 0 : 1);
				return;
			case 70://Loot construction materials
				var enabled = api.getVarBit(player, 27950) == 1;
				api.setVarBit(player, 27950, enabled ? 0 : 1);
				return;
			case 76://Loot runes
				var enabled = api.getVarBit(player, 27951) == 1;
				api.setVarBit(player, 27951, enabled ? 0 : 1);
				return;
			case 82://Loot prayer items
				var enabled = api.getVarBit(player, 27952) == 1;
				api.setVarBit(player, 27952, enabled ? 0 : 1);
				return;
			case 88://Loot mining & smithing items
				var enabled = api.getVarBit(player, 27953) == 1;
				api.setVarBit(player, 27953, enabled ? 0 : 1);
				return;
			case 94://Loot farming items
				var enabled = api.getVarBit(player, 27954) == 1;
				api.setVarBit(player, 27954, enabled ? 0 : 1);
				return;
			case 100://Loot herblore items
				var enabled = api.getVarBit(player, 27955) == 1;
				api.setVarBit(player, 27955, enabled ? 0 : 1);
				return;
			case 108://Loot crafting materials
				var enabled = api.getVarBit(player, 27956) == 1;
				api.setVarBit(player, 27956, enabled ? 0 : 1);
				return;
			case 120://Decrease lootbeam trigger cost
				var value = api.getVarBit(player, 21238);
				api.setVarBit(player, 21238, Math.max(50000, value-1));
				return;
			case 125://Increase lootbeam trigger cost
				var value = api.getVarBit(player, 21238);
				api.setVarBit(player, 21238, Math.min(1000000, value+1));
				return;
			case 129://Lootbean trigger cost slider (also has drag event)
				if (args.slot >= 0 && args.slot < 20) {
					api.setVarBit(player, 21238, (args.slot+1)*50000);
				}
				return;
			case 139://Enter manual amount
				inframeInput(player, 1623, 139, function (value) {
					api.setVarBit(player, 21238, Math.min(1000000, Math.max(50000, value-1)));
				}, 7, 7);
				return;
			case 145://Rotate lootbeam
				api.setVarBit(player, 23261, 0);
				api.setVarBit(player, 26778, 1);
				return;
			case 147://Disable lootbeam
				api.setVarBit(player, 23261, 0);
				api.setVarBit(player, 26778, 0);
				return;
			case 149://Default lootbeam
				api.setVarBit(player, 23261, 1);
				api.setVarBit(player, 26778, 1);
				return;		
			case 151://Rainbow lootbeam
				if (api.getVarBit(player, 22915) == 1) {//If rainbow lootbeam is enabled
					api.setVarBit(player, 23261, 2);
					api.setVarBit(player, 26778, 1);
				}
				return;
			case 153://Christmas lootbeam
				if (api.getVarBit(player, 26407) == 1) {//If christmas lootbeam is enabled
					api.setVarBit(player, 23261, 3);
					api.setVarBit(player, 26778, 1);
				}
				return;
			case 155://Beach lootbeam
				if (api.getVarBit(player, 28241) == 1) {//If beach lootbeam is enabled
					api.setVarBit(player, 23261, 4);
					api.setVarBit(player, 26778, 1);
				}
				return;
			default:
				api.sendMessage(player, "Unhandled loot settings button: comp="+args.component+", slot="+args.slot+", button="+args.button);
				return;
			}		
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new LootSettingsListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1623, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 1623, listener);
	scriptManager.registerCompListener(EventType.IF_DRAG, 1623, 128, listener);
};