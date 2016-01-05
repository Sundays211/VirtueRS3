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
 * @since 24/01/2015
 */
var CompCapeListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		if (event == EventType.OPWORN1) {//Kandarin Monastery
			api.teleportEntity(player, 3086, 3502, 0);
		} else if (event == EventType.OPWORN2) {//Ardougne farm
			api.teleportEntity(player, 2663, 3374, 0);
		} else if (event == EventType.OPWORN3) {//Max Guild
			api.teleportEntity(player, 2276, 3314, 1);
		} else if (event == EventType.OPWORN4) {//Summoning restore
			api.sendMessage(player, "<col=ff0000>will be added soon. bugged atm.");
		}
		
		/*switch (option) {
		case 26://Customise
			api.openCentralWidget(player, 20, false);
			return true;
		default:
			api.sendMessage(player, "Unhandled cape option: item="+item.getID()+", option="+option);
		}*/
	}
});

var MaxCapeListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		if (event == EventType.OPWORN1) {//Customise
			api.openCentralWidget(player, 20, false);
		} else if (event == EventType.OPWORN2) {//Max Guild
			api.teleportEntity(player, 2276, 3314, 1);
		}
	}
});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	var ids = [ 20767, 20769, 20771, 32151, 32152, 32153 ];
	var compCapeListener = new CompCapeListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPWORN1, ids[i], compCapeListener);
		scriptManager.registerListener(EventType.OPWORN2, ids[i], compCapeListener);
		scriptManager.registerListener(EventType.OPWORN3, ids[i], compCapeListener);
		scriptManager.registerListener(EventType.OPWORN4, ids[i], compCapeListener);
	}
	
	ids = [ 20767, 20769, 20771, 32151, 32152, 32153 ];
	var maxCapeListener = new MaxCapeListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPWORN1, ids[i], maxCapeListener);
		scriptManager.registerListener(EventType.OPWORN2, ids[i], maxCapeListener);
	}
}