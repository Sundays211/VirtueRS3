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
var ReportOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch (args["interface"]) {
		case 594://Player report
			api.setVarc(player, 2578, "");
			api.hideWidget(player, 594, 18, false);//Set interface hidden: if=594, comp=18, hidden=0
			api.setVarc(player, 790, 1);//Received varc: key=790, value=1
			api.setVarc(player, 2579, "[My name]");
			api.hideWidget(player, 594, 38, false);//Mute option on first screen
			api.hideWidget(player, 594, 9, false);//Mute option on second screen
			api.hideWidget(player, 594, 28, false);//Another mute option
			api.runClientScript(player, 7674, []);
			return;
		case 1405://Bug report
			api.setVarc(player, 2911, -1);
			api.runClientScript(player, 187, [1, 4]);
			api.runClientScript(player, 7657, []);
			api.setWidgetEvents(player, 1405, 47, 0, 10, 2);//Category select
			return;
		}
	}
});

var ReportButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch (args["interface"]) {
		case 1405://Bug report
			switch (args.component) {	
			case 47://Selected main category
				api.setVarBit(player, 18336, args.slot*10);
				var subCats = api.getEnumValue(7427, args.slot);
				if (subCats == -1) {
					api.setVarBit(player, 18337, args.slot*10);
				} else {
					var size = api.getEnumSize(subCats);
					api.setWidgetEvents(player, 1405, 61, 0, size, 2);
					api.setVarBit(player, 18337, 0);
				}
				return;
			case 61://Select sub category
				if (slot != 0) {
					api.setVarBit(player, 18337, api.getVarBit(player, 18336) + args.slot);
				}
				return;
			case 91://Submit button.
				return;
			default:
				api.sendMessage(player, "Unhandled bug report button: comp="+args.component+", button="+args.button+", slot="+args.slot);
				return;
			}
			return;
		case 1406://Report selection
			switch (args.component) {	
			case 15://Report player
				api.sendMessage(player, "Player reporting is not yet available.");
				api.closeCentralWidgets(player);
				//api.openCentralWidget(player, 594, false);
				return;
			case 23://Report bug
				api.openCentralWidget(player, 1405, false);
				return;
			default:
				api.sendMessage(player, "Unhandled report selection button: comp="+args.component+", button="+args.button+", slot="+args.slot);
				return;
			}
			return;
		}
	}
});

var ReportCloseListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		api.setVarBit(player, 18336, 0);
		api.setVarBit(player, 18337, 0);
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {	
	var listener = new ReportOpenListener();
	scriptManager.registerListener(EventType.IF_OPEN, 594, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 1405, listener);
	
	listener = new ReportButtonListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1405, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 1406, listener);
	
	listener = new ReportCloseListener();
	scriptManager.registerListener(EventType.IF_CLOSE, 1405, listener);
};