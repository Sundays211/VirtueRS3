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
 * @since 18/01/2015
 */

var MALE_TOPS = 690, FEMALE_TOPS = 1591, MALE_LEGS = 1586, FEMALE_LEGS = 1607;

var MALE_ARMS = 711, FEMALE_ARMS = 693, MALE_WRISTS = 749, FEMALE_WRISTS = 751;

var TOP_COLOURS = 3282, LEG_COLOURS = 3284;

var ThessaliaMakeoverButton = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		var slot = args.slot;
		
		switch (args.component) {
		case 12://Choose top
			api.setVarBit(player, 481, 0);
			return;
		case 13://Choose arms
			if (Makeover.getSetByStyle(api.getPlayerKit(player, 2), 3, api.isFemale(player)) == -1) {
				api.setVarBit(player, 481, 1);
			} else {				
				api.sendMessage(player, "You can't select different arms to go with that top.");
			}
			return;
		case 14://Choose wrists
			if (Makeover.getSetByStyle(api.getPlayerKit(player, 2), 3, api.isFemale(player)) == -1) {
				api.setVarBit(player, 481, 2);
			} else {				
				api.sendMessage(player, "You can't select different wrists to go with that top.");
			}//Retro striped sweater
			//Retro two-tonned
			return;
		case 15://Choose legs
			api.setVarBit(player, 481, 3);
			return;
		case 17:
			Makeover.setKit(player, slot/2);
			return;
		case 28://Confirm
			api.applyPlayerStyles(player);
			api.closeCentralWidgets(player);
			return;
		case 20://Set colours
			Makeover.setColour(player, slot/2);
			return;
		default:
			api.sendMessage(player, "Unhandled makeover button: component="+args.component+", slot="+slot+", button="+args.button);
			return;
		}
	}
});

var ThessaliaMakeoverOpen = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		api.setWidgetEvents(player, 729, 17, 0, 126, 2);//17=Select style
		api.setWidgetEvents(player, 729, 20, 0, 500, 2);//20=Select colour
		api.setWidgetText(player, 729, 32, "Free!");
		api.setVarBit(player, 481, 0);
		api.clearStyleEdit(player);
		api.startStyleEdit(player);
		api.setVarc(player, 1010, api.getPlayerKit(player, 2));//Top style
		api.setVarc(player, 1011, api.getPlayerKit(player, 3));//Arm style
		api.setVarc(player, 1012, api.getPlayerKit(player, 4));//Wrist style
		api.setVarc(player, 1013, api.getPlayerKit(player, 5));//Leg style
		api.setVarc(player, 1016, api.getPlayerColour(player, 1));//Top colour
		api.setVarc(player, 1017, api.getPlayerColour(player, 2));//Legs colour
	}
});

var ThessaliaMakeoverClose = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		api.clearStyleEdit(player);
	}
});

var ThessaliaNpcListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, npcTypeId, args) {
		var player = args.player;
		var npc = args.npc;
		
		if(api.freeSpaceTotal(player, Inv.EQUIPMENT) != api.invCapacity(player, Inv.EQUIPMENT)) {
			chatnpc(player, npc, "You're not able to try on my clothes with all that armour. Take it off and then speak to me again.");
			return;
		}
		api.openCentralWidget(player, 729, false);
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new ThessaliaMakeoverOpen();
	scriptManager.registerListener(EventType.IF_OPEN, 729, listener);
	
	listener = new ThessaliaMakeoverButton();
	scriptManager.registerListener(EventType.IF_BUTTON, 729, listener);
	
	listener = new ThessaliaMakeoverClose();
	scriptManager.registerListener(EventType.IF_CLOSE, 729, listener);	

	listener = new ThessaliaNpcListener();
	scriptManager.registerListener(EventType.OPNPC4, 548, listener);
};

var Makeover = {
		setKit : function (player, slot) {
			switch(api.getVarBit(player, 481)) {
			case 0:
				this.setKitInner(player, api.isFemale(player) ? FEMALE_TOPS : MALE_TOPS, slot, 0);
				break;
			case 1:
				this.setKitInner(player, api.isFemale(player) ? FEMALE_ARMS : MALE_ARMS, slot, 1);
				break;
			case 2:
				this.setKitInner(player, api.isFemale(player) ? FEMALE_WRISTS : MALE_WRISTS, slot, 2);
				break;
			case 3:
				this.setKitInner(player, api.isFemale(player) ? FEMALE_LEGS : MALE_LEGS, slot, 3);
				break;
			}
		},
		setColour : function (player, slot) {
			switch(api.getVarBit(player, 481)) {
			case 0:
			case 1:
				this.setColourInner(player, TOP_COLOURS, slot, 0);
				break;
			case 2://No colours for wrists
				break;
			case 3:
				this.setColourInner(player, LEG_COLOURS, slot, 3);
				break;
			}
		},
		setKitInner : function (player, enumID, slot, type) {
			var newStyle = api.getEnumValue(enumID, slot);
			if (newStyle != -1) {
				switch (type) {
				case 0://From client script 1513
					//api.sendMessage(player, "Selected top style: "+newStyle);
					var setID = this.getSetByStyle(newStyle, 3, api.isFemale(player));
					if (setID != -1) {
						api.setPlayerKit(player, 2, api.getStructParam(setID, 1182));
						api.setPlayerKit(player, 3, api.getStructParam(setID, 1183));
						api.setPlayerKit(player, 4, api.getStructParam(setID, 1184));
					} else {
						api.setPlayerKit(player, 2, newStyle);
						if (api.getPlayerKit(player, 3) == -1 
								|| this.getSetByStyle(api.getPlayerKit(player, 3), 4, api.isFemale(player)) == -1) {
							api.setPlayerKit(player, 3, api.isFemale(player) ? 61 : 26);
						}
						if (api.getPlayerKit(player, 4) == -1 
								|| this.getSetByStyle(api.getPlayerKit(player, 4), 5, api.isFemale(player)) == -1) {
							api.setPlayerKit(player, 3, api.isFemale(player) ? 68 : 34);
						}
					}
					break;
				case 1:
					api.setPlayerKit(player, 3, newStyle);
					break;
				case 2:
					api.setPlayerKit(player, 4, newStyle);
					break;
				case 3:
					api.setPlayerKit(player, 5, newStyle);
					break;
				}			
			}
		},
		setColourInner : function (player, enumID, slot, type) {
			var newColour = api.getEnumValue(enumID, slot);
			if (newColour != -1) {
				switch (type) {
				case 0:
				case 1://Top
					api.setPlayerColour(player, 1, newColour);
					break;
				case 3://Legs
					api.setPlayerColour(player, 2, newColour);
					break;
				}
			}
		},
		getSetByStyle : function (styleID, styleSlot, female) {
			for (var slot = api.getEnumSize(5735) - 1; slot >= 0; slot--) {
				var v6 = api.getEnumValue(5735, slot);
				if (v6 != -1) {
					var v7 = 0;
					for (var setStyles = this.getSetStruct(v6, 0, female); setStyles != -1; setStyles = this.getSetStruct(v6, v7, female)) {
						switch (styleSlot) {
							case 3:
								if (api.getStructParam(setStyles, 1182) == styleID) {
									return setStyles;
								}
								break;
							case 4:
								if (api.getStructParam(setStyles, 1183) == styleID) {
									return setStyles;
								}
								break;
							case 5:
								if (api.getStructParam(setStyles, 1184) == styleID) {
									return setStyles;
								}
								break;
							case 6:
								if (api.getStructParam(setStyles, 1185) == styleID) {
									return setStyles;
								}
								break;
							default:
								return -1;
						}
						v7++;
					}
				}
			}
			return -1;
		},
		getSetStruct : function (structId, slot, female) {
			switch (slot) {
			case 0:
				return api.getStructParam(structId, female ? 1175 : 1169);
			case 1:
				return api.getStructParam(structId, female ? 1176: 1170);
			case 2:
				return api.getStructParam(structId, female ? 1177 : 1171);
			case 3:
				return api.getStructParam(structId, female ? 1178 : 1172);
			case 4:
				return api.getStructParam(structId, female ? 1179 : 1173);
			case 5:
				return api.getStructParam(structId, female ? 1180 : 1174);
			default:
				return -1;
			}		
		}
}