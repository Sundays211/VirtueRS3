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
 * @since Feb 13, 2015
 */

var FriendChatListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;	
		if (event == EventType.IF_OPEN) {
			api.setWidgetEvents(player, 1587, 26, 0, 200, 6);
			api.setWidgetEvents(player, 1587, 47, 0, 1, 2);
			api.hideWidget(player, 1587, 29, true);			
		} else {
			switch (args.component) {
			case 26:
				api.hideWidget(player, 1587, 29, false);
				api.setWidgetText(player, 1587, 98, "Are you sure you want to switch to world " + args.slot + "?");
				return;
			case 47:
				api.setVarp(player, 4735, 104005679);
				api.setVarp(player, 4734, 7230);
				api.setVarp(player, 4736, 0);
				api.setWidgetEvents(player, 1477, 801, 0, 3, 2);
				return;
			case 84:
				api.setVarp(player, 20, -1761607680);
				api.closeWidget(player, 1477, 426);
				api.openWidget(player, 1477, 333, 1215, true);
				api.hideWidget(player, 1477, 333, false);
				api.hideWidget(player, 745, 2, true);
				return;
			case 93:
				api.openCentralWidget(player, 1587, false);
				return;
			default:
				api.sendMessage(player, "Unhandled world hop component: "+args.component);
				return;
			}
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new FriendChatListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1587, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 1587, listener);
};