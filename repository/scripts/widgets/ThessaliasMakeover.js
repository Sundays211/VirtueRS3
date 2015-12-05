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
var api;

var MALE_TOPS = 690, FEMALE_TOPS = 1591, MALE_LEGS = 1586, FEMALE_LEGS = 1607;

var MALE_ARMS = 711, FEMALE_ARMS = 693, MALE_WRISTS = 749, FEMALE_WRISTS = 751;

var TOP_COLOURS = 3282, LEG_COLOURS = 3284;

var WidgetListener = Java.extend(Java.type('org.virtue.script.listeners.WidgetListener'), {
	
	/* The interface ids to bind to */
	getIDs: function() {
		return [729];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		api.setWidgetEvents(player, 729, 17, 0, 126, 2);//17=Select style
		api.setWidgetEvents(player, 729, 20, 0, 500, 2);//20=Select colour
		api.setWidgetText(player, 729, 32, "Free!");
		api.setVarBit(player, 481, 0);
		api.clearStyleEdit(player);
		api.startStyleEdit(player);
		api.setVarc(player, 1010, api.getPlayerStyle(player, 2));//Top style
		api.setVarc(player, 1011, api.getPlayerStyle(player, 3));//Arm style
		api.setVarc(player, 1012, api.getPlayerStyle(player, 4));//Wrist style
		api.setVarc(player, 1013, api.getPlayerStyle(player, 5));//Leg style
		api.setVarc(player, 1016, api.getPlayerColour(player, 1));//Top colour
		api.setVarc(player, 1017, api.getPlayerColour(player, 2));//Legs colour
	},

	/* A button clicked on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 12://Choose top
			api.setVarBit(player, 481, 0);
			return true;
		case 13://Choose arms
			if (getSetByStyle(api.getPlayerStyle(player, 2), 3, api.isFemale(player)) == -1) {
				api.setVarBit(player, 481, 1);
			} else {				
				api.sendMessage(player, "You can't select different arms to go with that top.");
			}
			return true;
		case 14://Choose wrists
			if (getSetByStyle(api.getPlayerStyle(player, 2), 3, api.isFemale(player)) == -1) {
				api.setVarBit(player, 481, 2);
			} else {				
				api.sendMessage(player, "You can't select different wrists to go with that top.");
			}//Retro striped sweater
			//Retro two-tonned
			return true;
		case 15://Choose legs
			api.setVarBit(player, 481, 3);
			return true;
		case 17:
			setStyle(player, slot/2);
			return true;
		case 28://Confirm
			api.applyPlayerStyles(player);
			api.closeCentralWidgets(player);
			return true;
		case 20://Set colours
			setColour(player, slot/2);
			return true;
		default:
			api.sendMessage(player, "Unhandled makeover click: component="+component+", slot="+slot+", option="+option);
			return true;
		}
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		api.clearStyleEdit(player);
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var widgetListener = new WidgetListener();
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
};

function setStyle (player, slot) {
	switch(api.getVarBit(player, 481)) {
	case 0:
		setStyleInner(player, api.isFemale(player) ? FEMALE_TOPS : MALE_TOPS, slot, 0);
		break;
	case 1:
		setStyleInner(player, api.isFemale(player) ? FEMALE_ARMS : MALE_ARMS, slot, 1);
		break;
	case 2:
		setStyleInner(player, api.isFemale(player) ? FEMALE_WRISTS : MALE_WRISTS, slot, 2);
		break;
	case 3:
		setStyleInner(player, api.isFemale(player) ? FEMALE_LEGS : MALE_LEGS, slot, 3);
		break;
	}
}

function setStyleInner (player, enumID, slot, type) {
	var enumType = api.getEnumType(enumID);
	var newStyle = enumType.getValueInt(slot);
	if (newStyle != -1) {
		switch (type) {
		case 0://From client script 1513
			//api.sendMessage(player, "Selected top style: "+newStyle);
			var setID = getSetByStyle(newStyle, 3, api.isFemale(player));
			if (setID != -1) {
				var set = api.getStructType(setID);
				api.setPlayerStyle(player, 2, set.getParam(1182, -1));
				api.setPlayerStyle(player, 3, set.getParam(1183, -1));
				api.setPlayerStyle(player, 4, set.getParam(1184, -1));
			} else {
				api.setPlayerStyle(player, 2, newStyle);
				if (api.getPlayerStyle(player, 3) == -1 
						|| getSetByStyle(api.getPlayerStyle(player, 3), 4, api.isFemale(player)) == -1) {
					api.setPlayerStyle(player, 3, api.isFemale(player) ? 61 : 26);
				}
				if (api.getPlayerStyle(player, 4) == -1 
						|| getSetByStyle(api.getPlayerStyle(player, 4), 5, api.isFemale(player)) == -1) {
					api.setPlayerStyle(player, 3, api.isFemale(player) ? 68 : 34);
				}
			}
			break;
		case 1:
			api.setPlayerStyle(player, 3, newStyle);
			break;
		case 2:
			api.setPlayerStyle(player, 4, newStyle);
			break;
		case 3:
			api.setPlayerStyle(player, 5, newStyle);
			break;
		}			
	}
}

function setColour (player, slot) {
	switch(api.getVarBit(player, 481)) {
	case 0:
	case 1:
		setColourInner(player, TOP_COLOURS, slot, 0);
		break;
	case 2://No colours for wrists
		break;
	case 3:
		setColourInner(player, LEG_COLOURS, slot, 3);
		break;
	}
}

function setColourInner (player, enumID, slot, type) {
	var enumType = api.getEnumType(enumID);
	var newColour = enumType.getValueInt(slot);
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
}

function getSetByStyle (styleID, styleSlot, female) {
	var enumType = api.getEnumType(5735);
	for (var slot = enumType.getSize() - 1; slot >= 0; slot--) {
		var v6 = enumType.getValueInt(slot);
		if (v6 != -1) {
			var struct = api.getStructType(v6);
			var v7 = 0;
			for (var setID = getSetStruct(struct, 0, female); setID != -1; setID = getSetStruct(struct, v7, female)) {
				var setStyles = api.getStructType(setID);
				switch (styleSlot) {
					case 3:
						if (setStyles.getParam(1182, -1) == styleID) {
							return setID;
						}
						break;
					case 4:
						if (setStyles.getParam(1183, -1) == styleID) {
							return setID;
						}
						break;
					case 5:
						if (setStyles.getParam(1184, -1) == styleID) {
							return setID;
						}
						break;
					case 6:
						if (setStyles.getParam(1185, -1) == styleID) {
							return setID;
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
}

function getSetStruct(struct, slot, female) {
	switch (slot) {
	case 0:
		return struct.getParam(female ? 1175 : 1169, -1);
	case 1:
		return struct.getParam(female ? 1176: 1170, -1);
	case 2:
		return struct.getParam(female ? 1177 : 1171, -1);
	case 3:
		return struct.getParam(female ? 1178 : 1172, -1);
	case 4:
		return struct.getParam(female ? 1179 : 1173, -1);
	case 5:
		return struct.getParam(female ? 1180 : 1174, -1);
	default:
		return -1;
	}		
}