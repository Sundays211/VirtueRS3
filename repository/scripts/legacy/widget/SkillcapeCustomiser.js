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

var SkillcapeCustomiserListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		if (event == EventType.IF_CLOSE) {
			api.refreshEquipment(player);
		} else {
			switch (args.component) {
			case 10://Colour 1
				SkillcapeCustomiser.selectCapeColour(player, 1);
				return;
			case 7://Colour 2
				SkillcapeCustomiser.selectCapeColour(player, 2);
				return;
			case 4://Colour 3
				SkillcapeCustomiser.selectCapeColour(player, 3);
				return;
			case 1://Colour 4
				SkillcapeCustomiser.selectCapeColour(player, 4);
				return;
			case 33://Change col1 to col2
				SkillcapeCustomiser.copyCapeColour(player, 2, 1);
				return;
			case 35://Change col1 to col3
				SkillcapeCustomiser.copyCapeColour(player, 3, 1);
				return;
			case 37://Change col1 to col4
				SkillcapeCustomiser.copyCapeColour(player, 4, 1);
				return;
			case 53://Change col2 to col1
				SkillcapeCustomiser.copyCapeColour(player, 1, 2);
				return;
			case 55://Change col2 to col3
				SkillcapeCustomiser.copyCapeColour(player, 3, 2);
				return;
			case 57://Change col2 to col4
				SkillcapeCustomiser.copyCapeColour(player, 4, 2);
				return;
			case 67://Change col3 to col1
				SkillcapeCustomiser.copyCapeColour(player, 1, 3);
				return;
			case 69://Change col3 to col2
				SkillcapeCustomiser.copyCapeColour(player, 2, 3);
				return;
			case 71://Change col3 to col4
				SkillcapeCustomiser.copyCapeColour(player, 4, 3);
				return;		
			case 81://Change col4 to col1
				SkillcapeCustomiser.copyCapeColour(player, 1, 4);
				return;
			case 83://Change col4 to col2
				SkillcapeCustomiser.copyCapeColour(player, 2, 4);
				return;
			case 85://Change col4 to col3
				SkillcapeCustomiser.copyCapeColour(player, 3, 4);
				return;
			case 111://Done
				api.closeCentralWidgets(player);
				return;
			case 101://Close button
				return;
			case 153://Save as preset 1
				SkillcapeCustomiser.handlePreset(player, 1, true);
				return;
			case 160://Save as preset 2
				SkillcapeCustomiser.handlePreset(player, 2, true);
				return;
			case 167://Save as preset 3
				SkillcapeCustomiser.handlePreset(player, 3, true);
				return;
			case 174://Load preset 1
				SkillcapeCustomiser.handlePreset(player, 1, false);
				return;
			case 181://Load preset 2
				SkillcapeCustomiser.handlePreset(player, 2, false);
				return;
			case 188://Load preset 3
				SkillcapeCustomiser.handlePreset(player, 3, false);
				return;
			default:
				api.sendMessage(player, "Unhandled skillcape customisation button: component="+args.component+", button="+args.button+", slot="+args.slot);
				return;
			}
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new SkillcapeCustomiserListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 20, listener);
	scriptManager.registerListener(EventType.IF_CLOSE, 20, listener);
}

var SkillcapeCustomiser = {
		selectCapeColour : function (player, type) {
			var prevColour;
			switch (type) {
			case 1:
				prevColour = api.getVarBit(player, 1039);
				break;
			case 2:
				prevColour = api.getVarBit(player, 1040);
				break;
			case 3:
				prevColour = api.getVarBit(player, 1041);
				break;
			case 4:
				prevColour = api.getVarBit(player, 1042);
				break;
			}
			api.setVarp(player, 426, prevColour);
			api.openCentralWidget(player, 19, false);
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
				handle : function (value) {
					api.closeCentralWidgets(player);
					//print(value+"\n");
					if (value != 65535) {
						switch (type) {
						case 1:
							api.setVarBit(player, 1039, value);
							break;
						case 2:
							api.setVarBit(player, 1040, value);
							break;
						case 3:
							api.setVarBit(player, 1041, value);
							break;
						case 4:
							api.setVarBit(player, 1042, value);
							break;
						}
					}
					player.getEquipment().refresh(true);
					api.openCentralWidget(player, 20, false);
				}
			});
			api.setInputHandler(player, new Handler());
		},
		copyCapeColour : function (player, fromType, toType) {
			var colour;
			switch (fromType) {
			case 1:
				colour = api.getVarBit(player, 1039);
				break;
			case 2:
				colour = api.getVarBit(player, 1040);
				break;
			case 3:
				colour = api.getVarBit(player, 1041);
				break;
			case 4:
				colour = api.getVarBit(player, 1042);
				break;
			}
			switch (toType) {
			case 1:
				api.setVarBit(player, 1039, colour);
				break;
			case 2:
				api.setVarBit(player, 1040, colour);
				break;
			case 3:
				api.setVarBit(player, 1041, colour);
				break;
			case 4:
				api.setVarBit(player, 1042, colour);
				break;
			}
		},
		handlePreset : function (player, preset, isSave) {
			var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
				handle : function (value) {
					if ((value & 0xffff) == 211) {//Confirm
						if (isSave) {
							SkillcapeCustomiser.savePreset(player, preset);
						} else {
							SkillcapeCustomiser.loadPreset(player, preset);
						}
					}
					api.openCentralWidget(player, 20, false);
				}
			});
			api.setInputHandler(player, new Handler());
		},
		savePreset : function (player, preset) {
			api.sendMessage(player, "Saving preset "+preset);
			var col1 = api.getVarBit(player, 1039);
			var col2 = api.getVarBit(player, 1040);
			var col3 = api.getVarBit(player, 1041);
			var col4 = api.getVarBit(player, 1042);
			switch (preset) {
			case 1:
				api.setVarBit(player, 25814, col1);
				api.setVarBit(player, 25815, col2);
				api.setVarBit(player, 25816, col3);
				api.setVarBit(player, 25817, col4);
				break;
			case 2:
				api.setVarBit(player, 25818, col1);
				api.setVarBit(player, 25819, col2);
				api.setVarBit(player, 25820, col3);
				api.setVarBit(player, 25821, col4);
				break;
			case 3:
				api.setVarBit(player, 25822, col1);
				api.setVarBit(player, 25823, col2);
				api.setVarBit(player, 25824, col3);
				api.setVarBit(player, 25825, col4);
				break;
			}
		},
		loadPreset : function (player, preset) {
			api.sendMessage(player, "Loading preset "+preset);
			var col1, col2, col3, col4;
			switch (preset) {
			case 1:
				col1 = api.getVarBit(player, 25814);
				col2 = api.getVarBit(player, 25815);
				col3 = api.getVarBit(player, 25816);
				col4 = api.getVarBit(player, 25817);
				break;
			case 2:
				col1 = api.getVarBit(player, 25818);
				col2 = api.getVarBit(player, 25819);
				col3 = api.getVarBit(player, 25820);
				col4 = api.getVarBit(player, 25821);
				break;
			case 3:
				col1 = api.getVarBit(player, 25822);
				col2 = api.getVarBit(player, 25823);
				col3 = api.getVarBit(player, 25824);
				col4 = api.getVarBit(player, 25825);
				break;
			default:
				return;
			}
			api.setVarBit(player, 1039, col1);
			api.setVarBit(player, 1040, col2);
			api.setVarBit(player, 1041, col3);
			api.setVarBit(player, 1042, col4);
		}
}