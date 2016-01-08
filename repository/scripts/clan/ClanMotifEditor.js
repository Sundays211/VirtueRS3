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
 * @since 24/01/2015
 */

var MotifEditorListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		if (event == EventType.IF_OPEN) {
			//if_opensub: parent=1477, parentSlot=412, if=1105, closable=0
			api.setWidgetEvents(player, 1105, 66, 0, 118, 2);
			api.setWidgetEvents(player, 1105, 63, 0, 118, 2);
			api.runClientScript(player, 4399, [72417446]);
		} else {
			switch (args.component) {
			case 148://Close button
				return;
			case 120://Save changes
				MotifEditor.saveChanges(player);
				return;
			case 35://Change symbol 1 colour
				MotifEditor.selectColour(player, 1);
				return;
			case 80://Change symbol 2 colour
				MotifEditor.selectColour(player, 2);
				return;
			case 92://Change primary colour
				MotifEditor.selectColour(player, 3);
				return;
			case 104://Change secondary colour
				MotifEditor.selectColour(player, 4);
				return;
			case 66://Select logo 1
				MotifEditor.selectLogo(player, 1, args.slot);
				return;
			case 63://Select logo 2
				MotifEditor.selectLogo(player, 2, args.slot);
				return;
			case 15://Change sym1 col to sym2 col
				MotifEditor.copyColour(player, 2, 1);
				return;
			case 17://Change sym1 col to primary col
				MotifEditor.copyColour(player, 3, 1);
				return;
			case 19://Change sym1 col to secondary col
				MotifEditor.copyColour(player, 4, 1);
				return;
			case 196://Change sym2 col to sym1 col
				MotifEditor.copyColour(player, 1, 2);
				return;
			case 198://Change sym2 col to primary col
				MotifEditor.copyColour(player, 3, 2);
				return;
			case 200://Change sym2 col to secondary col
				MotifEditor.copyColour(player, 4, 2);
				return;
			case 210://Change primary col to sym1 col
				MotifEditor.copyColour(player, 1, 3);
				return;
			case 212://Change primary col to sym2 col
				MotifEditor.copyColour(player, 2, 3);
				return;
			case 214://Change primary col to secondary col
				MotifEditor.copyColour(player, 4, 3);
				return;
			case 224://Change secondary col to sym1 col
				MotifEditor.copyColour(player, 1, 4);
				return;
			case 226://Change secondary col to sym2 col
				MotifEditor.copyColour(player, 2, 4);
				return;
			case 228://Change secondary col to primary col
				MotifEditor.copyColour(player, 3, 4);
				return;
			default:
				api.sendMessage(player, "Unhandled clan motif editor component: "+args.component);
				return;
			}
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new MotifEditorListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1105, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 1105, listener);
};

var MotifEditor = {
		saveChanges : function (player) {
			api.setVarBit(player, 8815, api.getVarBit(player, 8965));//Update logo 1
			api.setVarBit(player, 8816, api.getVarBit(player, 8966));//Update logo 2
			api.setVarClanSetting(player, 16, api.getVarp(player, 2067));//Update logo 1 colour
			api.setVarClanSetting(player, 17, api.getVarp(player, 2068));//Update logo 2 colour
			api.setVarClanSetting(player, 18, api.getVarp(player, 2069));//Update primary colour
			api.setVarClanSetting(player, 19, api.getVarp(player, 2070));//Update secondary colour
			api.sendMessage(player, "Clan motif updated. Changes will take effect in the next few minutes.");
			clanApi.sendBroadcast(api.getClanHash(player), 24, ["[Player A]"], [api.getName(player)]);
			api.closeCentralWidgets(player);
		},
		selectLogo : function (player, type, slot) {
			switch (type) {
			case 1:
				api.setVarBit(player, 8965, slot+1);
				return;
			case 2:
				api.setVarBit(player, 8966, slot+1);
				return;
			}
		},
		selectColour : function (player, type) {
			var prevColour;
			switch (type) {
			case 1:
				prevColour = api.getVarp(player, 2067);
				break;
			case 2:
				prevColour = api.getVarp(player, 2068);
				break;
			case 3:
				prevColour = api.getVarp(player, 2069);
				break;
			case 4:
				prevColour = api.getVarp(player, 2070);
				break;
			}
			api.setVarp(player, 1111, prevColour);
			api.openCentralWidget(player, 1106, false);
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
				handle : function (value) {
					api.closeCentralWidgets(player);
					if (value != 0) {
						switch (type) {
						case 1:
							api.setVarp(player, 2067, value);
							break;
						case 2:
							api.setVarp(player, 2068, value);
							break;
						case 3:
							api.setVarp(player, 2069, value);
							break;
						case 4:
							api.setVarp(player, 2070, value);
							break;
						}
					}
					api.openCentralWidget(player, 1105, false);
					api.runClientScript(player, 4399, [72417469]);
				}
			});
			api.setInputHandler(player, new Handler());
		},
		copyColour : function (player, fromType, toType) {
			var colour;
			switch (fromType) {
			case 1:
				colour = api.getVarp(player, 2067);
				break;
			case 2:
				colour = api.getVarp(player, 2068);
				break;
			case 3:
				colour = api.getVarp(player, 2069);
				break;
			case 4:
				colour = api.getVarp(player, 2070);
				break;
			}
			switch (toType) {
			case 1:
				api.setVarp(player, 2067, colour);
				break;
			case 2:
				api.setVarp(player, 2068, colour);
				break;
			case 3:
				api.setVarp(player, 2069, colour);
				break;
			case 4:
				api.setVarp(player, 2070, colour);
				break;
			}
		}
}