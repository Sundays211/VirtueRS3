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
 * @author Sundays211
 * @since 9/11/2014
 */

var FriendListListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			api.setWidgetEvents(player, 550, 7, 0, 500, 1022);
			api.setWidgetEvents(player, 550, 57, 0, 500, 6);
		} else {
			switch (args.component) {
			case 7://Friends list pane
				if (args.button == 7) {
					api.openOverlaySub(player, 1006, 451, false);
					api.runClientScript(player, 8178, []);
					api.runClientScript(player, 9206, [args.slot, 0, 29556758, 29556742, 29556743]);
					return;
				}
				api.sendMessage(player, "Unhandled friend list option: "+args.button);
				return;
			case 25://Add friend
				openModalBase(player);
				api.runClientScript(player, 8178, []);
				api.runClientScript(player, 103, []);
				return;
			case 33://Remove friend
				openModalBase(player);
				api.runClientScript(player, 8178, []);
				api.runClientScript(player, 104, []);
				return;
			case 43://Recruit friend
				api.sendMessage(player, "Recruit friend has not been implemented");
				return;
			case 57://Add/set ignore note 
				if (args.button == 1) {
					api.openOverlaySub(player, 1006, 451, false);
					api.runClientScript(player, 8178, []);
					api.runClientScript(player, 9206, [args.slot/2, 1, 29556758, 29556742, 29556743]);
					return;
				}
				api.sendMessage(player, "Unhandled ignore list option: "+args.button);
				return;
			case 67://Add ignore
				openModalBase(player);
				api.runClientScript(player, 8178, []);
				api.runClientScript(player, 105, []);
				return;
			case 75://Remove ignore
				openModalBase(player);
				api.runClientScript(player, 8178, []);
				api.runClientScript(player, 1419, []);
				return;
			case 83:
			case 85://Switching between friend and ignore tabs. We'll send this as handled so it doesn't spam the chatbox
				return;
			default:
				api.sendMessage(player, "Unhandled friends list component: "+args.component);
				return;
			}
		}
	}
});

var FriendOptionListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, type, args) {
		var player = args.player;
		if (args["interface"] == 550) {
			switch (args.button) {
			case 7:
				api.openOverlaySub(player, 1006, 451, false);
				api.runClientScript(player, 8178, []);
				api.runClientScript(player, 9206, [args.slot, 0, 29556758, 29556742, 29556743]);
				return;
			}
		}
		api.sendMessage(player, "Unhandled friend list option: interface="+args["interface"]+", comp="+args.component+", slot="+args.slot+", name="+args.name+", button="+args.button);
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new FriendListListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 550, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 550, listener);
	var optionListener = new FriendOptionListener();
	scriptManager.registerListener(EventType.CHATLIST_OPTION, ChatListType.FRIEND, listener);
};