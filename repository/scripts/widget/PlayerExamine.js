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
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/01/2016
 */
var ExamineSettingsListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, interfaceID, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			var messsage = api.getVarp(player, 4982);
			api.setVarc(player, 4670, messsage);
			//varcstr id=4670, value=
			api.setWidgetEvents(player, 1561, 35, 0, 22, 2);
		} else {
			switch (args.component) {
			case 21://Enter new message
				inframeInput(player, 1561, 18, function (value) {
					if (value.length > 80) {
						value = value.substring(0, 80);
					}
					api.setVarp(player, 4982, value);
					api.setVarc(player, 4670, value);
				}, 9, 80);
				return;
			case 30://Close
				return;
			case 40://Clear message
				api.setVarp(player, 4982, "");
				api.setVarc(player, 4670, "");
				return;
			case 35://Set status
				api.setWidgetEvents(player, 1477, 867, 0, 10, 2);
				//IF events: if=1477, comp=867, from=0, to=11, events=2
			case 45://Toggle privacy mode
			default:
				api.sendMessage(player, "Unhandled examine settings button: comp="+args.component+", slot="+args.slot+", button="+args.button);
				return;
			}		
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new ExamineSettingsListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1561, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 1561, listener);
};