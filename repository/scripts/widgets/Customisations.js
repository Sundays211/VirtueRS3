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
 * @since 03/02/2015
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.script.listeners.WidgetListener'), {
	
	/* The interface ids to bind to */
	getIDs: function() {
		return [ 1311, 900 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		if(interfaceID == 1311) {
			api.startStyleEdit(player);
			api.setVarc(player, 2017, api.getPlayerColour(player, 0));//Primary hair colour
			api.setVarc(player, 2018, 0);//Secondary hair colour
			api.setVarp(player, 261, api.getPlayerStyle(player, 0));//Current hair style
			api.setVarp(player, 262, api.getPlayerStyle(player, 1));//Current facial hair style
			api.setVarp(player, 779, 1426);
			api.setVarc(player, 2699, -1);
			api.setWidgetEvents(player, 1311, 83, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 138, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 139, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 140, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 141, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 142, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 143, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 144, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 145, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 146, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 147, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 148, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 149, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 150, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 151, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 152, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 153, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 154, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 155, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 156, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 157, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 158, 0, 3030, 14);
			api.setWidgetEvents(player, 1311, 233, 0, 3, 2);
			api.setWidgetEvents(player, 1311, 216, 0, 204, 6);//Colours?
			api.setWidgetEvents(player, 1311, 455, 0, 127, 2);//Pet name
			api.setWidgetEvents(player, 1311, 525, 0, 4, 2);
			api.runClientScript(player, 6874, []);
			api.hideWidget(player, 1311, 190, true);
		} else if (interfaceID == 900) {
			
		}
	},

	/* A button clicked on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		//api.getVarBit(player, 673);	
		api.sendMessage(player, "Inter: "+interfaceID+", Component: " + component + ", Option " + option);
		switch (component) {
		case 507://Show all items
			api.setVarBit(player, 678, 1);
			return true;
		case 74://Show owned items
			api.setVarBit(player, 678, 0);
			return true;
		case 92://Apply
			Customisation.applyCustomStyles(player);
			return true;
		case 1:
		case 2:
		case 4:
		case 5:
			return false;
		case 216://Set colour
			return Customisation.setHairColour(player, slot, option);
		//case 138://Select option
		default:
			var handled = Customisation.processOption(player, component, slot, option);
			return handled;
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
//Male hairstyles = 2339
//Female hairstyles = 2342
//Facial hair = 6571
var Customisation = {
		processOption : function (player, component, slot, option) {
			var optionEnum = api.getEnumType(5961);
			var optionType = -1;
			for (var i = 0; i < optionEnum.getSize(); i++) {
				if (component == (optionEnum.getValueInt(i) & 0xffff)) {
					optionType = i;
					break;
				}
			}
			if (optionType == -1) {
				return false;
			}
			switch (api.getVarBit(player, 673)) {
			case 1:
				return Customisation.handleHairstyleOption(player, optionType, slot/3, option);
			default:
				return false;
			}
		},
		handleHairstyleOption : function (player, type, slot, option) {
			switch (type) {
			case 1://Set hairstyle
				var enumID = api.isFemale(player) ? 2341 : 2338;
				var hairstyleEnum = api.getEnumType(enumID);
				var struct = api.getStructType(hairstyleEnum.getValueInt(slot));
				Customisation.setHairstyle(player, struct.getParam(788, -1), option != 2, false);
				return true;
			case 2://Set beard
			case 4://Set premium hairstyle
			case 5://Set premium beard
			default:
				api.sendMessage(player, "Selected hairstyle option: type="+type+", slot="+slot+", option="+option);
				return true;
			}
		},
		setHairstyle : function (player, style, isPreview, isBeard) {
			api.setPlayerStyle(player, isBeard ? 1 : 0, style);
			if (!isPreview) {
				Customisation.applyCustomStyles(player);
			} else {
				api.runClientScript(player, 6453, [-1, ""]);
				api.runClientScript(player, 6874, []);
				api.setVarc(player, 1968, 1);
				api.setVarc(player, 1969, 0);
				api.hideWidget(player, 1311, 59, false);//440
				api.hideWidget(player, 1311, 58, true);//Received if hidden: if=1311, comp=396, hide=1
				api.hideWidget(player, 1311, 155, false);
				api.runClientScript(player, 6462, []);
			}
		},
		setHairColour : function (player, slot, option) {
			if (api.getVarBit(player, 673) != 1) {
				return false;
			}
			var enumType = api.getEnumType(2345);
			var newColour = enumType.getValueInt(slot/2);
			if (newColour != -1) {
				api.setPlayerColour(player, 0, newColour);
				api.setVarc(player, 2017, newColour);
				api.hideWidget(player, 1311, 59, false);//440
				api.hideWidget(player, 1311, 58, true);//Received if hidden: if=1311, comp=396, hide=1
				//api.hideWidget(player, 1311, 155, false);
				api.runClientScript(player, 6462, []);
			}
			return true;
		},
		applyCustomStyles : function (player) {
			api.applyPlayerStyles(player);
			api.setVarp(player, 261, api.getPlayerStyle(player, 0));
			api.setVarp(player, 262, api.getPlayerStyle(player, 1));
			api.setVarp(player, 265, 0);
			api.runClientScript(player, 6874, []);
			api.setVarc(player, 1968, 1);
			api.setVarc(player, 1969, 0);
			api.runClientScript(player, 2716, [-1]);
			api.runClientScript(player, 6453, [-1, ""]);
			api.setVarc(player, 2017, api.getPlayerColour(player, 0));
			api.setVarc(player, 2018, 0);//Secondary hair colour
			api.setVarc(player, 779, 2699);
			api.hideWidget(player, 1311, 155, true);//171
			api.hideWidget(player, 1311, 59, true);//440
			//Received if hidden: if=1311, comp=415, hide=1
			api.hideWidget(player, 1311, 58, true);//396
			//Received if hidden: if=1311, comp=347, hide=1
			api.runClientScript(player, 6462, []);//Refresh the selected option. TODO: Fix this so it works
		}
}