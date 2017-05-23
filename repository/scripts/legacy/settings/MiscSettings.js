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
var MiscSettingsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, interfaceID, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			api.setWidgetEvents(player, 1674, 91, 0, 8, 2359296);
			api.setWidgetEvents(player, 1674, 92, 0, 8, 2);
			api.setWidgetEvents(player, 1674, 67, 0, 8, 2359296);
			api.setWidgetEvents(player, 1674, 68, 0, 8, 2);
		} else if (event == EventType.IF_DRAG) {			
			if (args.fromcomponent == 67) {
				if (args.toslot >= 0 && args.toslot < 8) {
					api.setVarBit(player, 19011, args.toslot);
				}
			} else if (args.fromcomponent == 91) {
				if (args.toslot >= 0 && args.toslot < 8) {
					api.setVarBit(player, 19010, args.toslot);
				}
			}
		} else {
			switch (args.component) {	
			case 17://Destroy empty vials when mixing potions
				var enabled = api.getVarBit(player, 1723) == 1;
				api.setVarBit(player, 1723, enabled ? 0 : 1);
				return;
			case 28://Destroy empty pie dishes when eating
				var enabled = api.getVarBit(player, 1726) == 1;
				api.setVarBit(player, 1726, enabled ? 0 : 1);
				return;
			case 33://Destroy empty bowls when cooking
				var enabled = api.getVarBit(player, 1724) == 1;
				api.setVarBit(player, 1724, enabled ? 0 : 1);
				return;
			case 39://Destroy empty vials when drinking potions	
				var enabled = api.getVarBit(player, 26774) == 1;
				api.setVarBit(player, 26774, enabled ? 0 : 1);
				return;
			case 44://Destroy empty bowls when eating
				var enabled = api.getVarBit(player, 1725) == 1;
				api.setVarBit(player, 1725, enabled ? 0 : 1);
				return;
			case 49://Destroy empty beer glasses when drinking
				var enabled = api.getVarBit(player, 1727) == 1;
				api.setVarBit(player, 1727, enabled ? 0 : 1);
				return;
			case 54://Destroy empty vials when decanting
				var enabled = api.getVarBit(player, 1728) == 1;
				api.setVarBit(player, 1728, enabled ? 0 : 1);
				return;
			case 59://Previous xp cap icon
				var newIcon = api.getVarBit(player, 19011)-1;
				api.setVarBit(player, 19011, newIcon >= 0 ? newIcon : 0);
				return;
			case 64://Next xp cap icon
				var newIcon = api.getVarBit(player, 19011)+1;
				api.setVarBit(player, 19011, newIcon < 8 ? newIcon : 7);
				return;
			case 68://Xp cap icon slider (67 for drag)
				if (args.slot >= 0 && args.slot < 8) {
					api.setVarBit(player, 19011, args.slot);
				}
				return;
			case 83://Previous virtual level cap icon
				var newIcon = api.getVarBit(player, 19010)-1;
				api.setVarBit(player, 19010, newIcon >= 0 ? newIcon : 0);
				return;
			case 88://Next virtual level cap icon
				var newIcon = api.getVarBit(player, 19010)+1;
				api.setVarBit(player, 19010, newIcon < 8 ? newIcon : 7);
				return;
			case 92://Virtual level cap icon slider (91 for drag)
				if (args.slot >= 0 && args.slot < 8) {
					api.setVarBit(player, 19010, args.slot);
				}
				return;
			case 106://Toggle virtual leveling
				var enabled = api.getVarBit(player, 19007) == 1;
				api.setVarBit(player, 19007, enabled ? 0 : 1);
				return;
			case 111://Toggle gold trim around max stats
				var enabled = api.getVarBit(player, 19009) == 1;
				api.setVarBit(player, 19009, enabled ? 0 : 1);
				return;
			case 116://Destroy empty buckets when farming
				var enabled = api.getVarBit(player, 29815) == 1;
				api.setVarBit(player, 29815, enabled ? 0 : 1);
				return;
			case 121://Destroy empty pot plants
				var enabled = api.getVarBit(player, 29816) == 1;
				api.setVarBit(player, 29816, enabled ? 0 : 1);
				return;
			default:
				api.sendMessage(player, "Unhandled misc settings button: comp="+args.component+", slot="+args.slot+", button="+args.button);
				return;
			}		
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new MiscSettingsListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1674, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 1674, listener);
	scriptManager.registerCompListener(EventType.IF_DRAG, 1674, 67, listener);
	scriptManager.registerCompListener(EventType.IF_DRAG, 1674, 91, listener);
};