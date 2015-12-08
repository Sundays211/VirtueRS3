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
package org.virtue.game.entity.player.widget.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.def.impl.EnumType;
import org.virtue.cache.def.impl.StructType;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.PrivilegeLevel;
import org.virtue.game.entity.player.widget.Widget;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.protocol.update.ref.Appearance.Gender;
import org.virtue.utility.EnumTypeList;
import org.virtue.utility.StructTypeList;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 17/01/2015
 */
public class AccountCreationWidget extends Widget {
	
	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(AccountCreationWidget.class);
	
	public static final int[] MALE_STYLE_SLOTS = { 0, 1, 2, 3, 4, 5, 6, 14 };
	public static final int[] FEMALE_STYLE_SLOTS = { 7, 8, 9, 10, 11, 12, 13, 15 };
	
	private static final int STYLE_PARAM = 788;
	
	private static final int MALE_HAIRSTYLES = 3304;
	private static final int FEMALE_HAIRSTYLES = 3302;
	
	private static final int FACIAL_HAIR = 3307;
	
	private static final int MALE_TORSO = 3287;
	private static final int FEMALE_TORSO = 3299;
	
	private static final int MALE_LEGS = 3289;
	private static final int FEMALE_LEGS = 3301;
	
	private static final int MALE_FOOTWARE = 3290;
	private static final int FEMALE_FOOTWARE = 3293;
	
	private static final int SKIN_COLOURS = 748;
	
	private static final int SKIN_COLOUR_SLOTS = 7724;
	
	private static final int HAIR_COLOURS = 2345;
	
	private static final int HAIR_COLOUR_SLOTS = 7723;
	
	private static final int BODY_COLOURS = 3282;
	
	private static final int BODY_COLOUR_SLOTS = 7721;
	
	private static final int FOOTWARE_COLOURS = 3297;
	
	private static final int FOOTWARE_COLOUR_SLOTS = 7722;
	
	
	//Older style enums:
	//Male:
	//Type 0: Styles=1591, Names=1590
	//Type 1: Styles=693, Names=1593
	//Type 2: Styles=751, Names=750
	//Type 3: Styles=1607, Names=1606
	//Female:
	//Type 0: Styles=690, Names=689
	//Type 1: Styles=711, Names=702
	//Type 2: Styles=749, Names=750

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#click(int, int, int, int, org.virtue.game.entity.player.Player, org.virtue.network.event.context.impl.in.OptionButton)
	 */
	@Override
	public boolean click(int widgetId, int componentId, int slotId, int itemId, Player player, OptionButton option) {
		switch (componentId) {
		case 18:
			player.getAppearance().setGender(Gender.FEMALE);
			player.getAppearance().sendBlock(true);
			return true;
		case 19:
			player.getAppearance().setGender(Gender.MALE);
			player.getAppearance().sendBlock(true);
			return true;
		case 163://Select colour
			setColour(player, slotId/2);
			return true;
		case 185://Select style
			setStyle(player, slotId/2);			
			return true;
		case 192://Skin colour
			player.getDialogs().setStep(0);
			player.getDispatcher().sendWidgetSettings(1420, 180, 0, 66, 2);
			player.getDispatcher().sendWidgetSettings(1420, 158, 0, 46, 2);
			return true;
		case 219://Hairstyle
			player.getDialogs().setStep(1);
			player.getDispatcher().sendWidgetSettings(1420, 180, 0, 66, 2);
			player.getDispatcher().sendWidgetSettings(1420, 158, 0, 46, 2);
			return true;
		case 220://Torso
			player.getDialogs().setStep(2);
			player.getDispatcher().sendWidgetSettings(1420, 180, 0, 66, 2);
			player.getDispatcher().sendWidgetSettings(1420, 158, 0, 46, 2);
			return true;
		case 221://Legs
			player.getDialogs().setStep(3);
			player.getDispatcher().sendWidgetSettings(1420, 180, 0, 66, 2);
			player.getDispatcher().sendWidgetSettings(1420, 158, 0, 46, 2);
			return true;
		case 222://Feet
			player.getDialogs().setStep(4);
			player.getDispatcher().sendWidgetSettings(1420, 180, 0, 66, 2);
			player.getDispatcher().sendWidgetSettings(1420, 158, 0, 46, 2);
			return true;
		case 223://Facial hair
			player.getDialogs().setStep(5);
			player.getDispatcher().sendWidgetSettings(1420, 180, 0, 66, 2);
			player.getDispatcher().sendWidgetSettings(1420, 158, 0, 46, 2);
			return true;
		case 596://Ironman mode status
			switch (slotId) {
			case 0:
				player.setPrivilgeLevel(PrivilegeLevel.PLAYER);
				break;
			case 1:
				player.setPrivilgeLevel(PrivilegeLevel.IRONMAN);
				break;
			case 2:
				player.setPrivilgeLevel(PrivilegeLevel.HARDCORE_IRONMAN);
				break;
			}
			break;
		default:
			logger.warn("Unhandled click: component="+componentId+", slot="+slotId+", item="+itemId+", option="+option);
		}		
		return false;
	}
	
	private void setStyle (Player player, int slot) {
		switch (player.getDialogs().getStep()) {//A work-around as the client seems to track this via a client variable
		case 0://Skin colour
			break;
		case 1://Hairstyle
			setStyle(player, player.getAppearance().isMale() ? MALE_HAIRSTYLES : FEMALE_HAIRSTYLES, slot, 1);
			break;
		case 2://Torso
			setStyle(player, player.getAppearance().isMale() ? MALE_TORSO : FEMALE_TORSO, slot, 2);
			break;
		case 3://Legs
			setStyle(player, player.getAppearance().isMale() ? MALE_LEGS : FEMALE_LEGS, slot, 3);
			break;
		case 4://Footware
			setStyle(player, player.getAppearance().isMale() ? MALE_FOOTWARE : FEMALE_FOOTWARE, slot, 4);
			break;
		case 5://Facial hair
			if (player.getAppearance().isMale()) {
				setStyle(player, FACIAL_HAIR, slot, 5);
			}
			break;
		}
	}
	
	private void setColour (Player player, int slot) {
		switch (player.getDialogs().getStep()) {
		case 0://Skin colour
			setColour(player, SKIN_COLOURS, EnumTypeList.list(SKIN_COLOUR_SLOTS).getValueInt(slot), 0);
			break;
		case 1://Hair colour
		case 5:
			setColour(player, HAIR_COLOURS, EnumTypeList.list(HAIR_COLOUR_SLOTS).getValueInt(slot), 1);
			break;
		case 2://Torso
			setColour(player, BODY_COLOURS, EnumTypeList.list(BODY_COLOUR_SLOTS).getValueInt(slot), 2);
			break;
		case 3://Legs
			setColour(player, BODY_COLOURS, EnumTypeList.list(BODY_COLOUR_SLOTS).getValueInt(slot), 3);
			break;
		case 4://Footware
			setColour(player, FOOTWARE_COLOURS, EnumTypeList.list(FOOTWARE_COLOUR_SLOTS).getValueInt(slot), 4);
			break;
		}
	}
	
	private void setColour (Player player, int enumID, int slot, int type) {
		EnumType enumType = EnumTypeList.list(enumID);
		int newColour = enumType.getValueInt(slot);
		if (newColour != -1) {
			switch (type) {
			case 0://Skin
				player.getAppearance().setTempColour(4, newColour);
				break;
			case 1:
			case 5://Hair
				player.getAppearance().setTempColour(0, newColour);
				break;
			case 2://Top
				player.getAppearance().setTempColour(1, newColour);
				break;
			case 3://Legs
				player.getAppearance().setTempColour(2, newColour);
				break;
			case 4://Feet
				player.getAppearance().setTempColour(3, newColour);
				break;
			}
			player.getAppearance().sendBlock(true);
		}
	}
	
	private void setStyle (Player player, int enumID, int slot, int type) {
		EnumType enumType = EnumTypeList.list(enumID);
		int newStyle;
		if (type == 1) {
			StructType struct = StructTypeList.list(enumType.getValueInt(slot));
			newStyle = (struct == null) ? -1 : struct.getParam(STYLE_PARAM, -1);
		} else {
			newStyle = enumType.getValueInt(slot);
		}		
		if (newStyle != -1) {
			switch (type) {
			case 1:
				player.getAppearance().setTempStyle(0, newStyle);
				break;
			case 2:
				int setID = getSetByStyle(newStyle, 3, !player.getAppearance().isMale());
				if (setID != -1) {
					StructType set = StructTypeList.list(setID);
					player.getAppearance().setTempStyle(2, set.getParam(1182, -1));
					player.getAppearance().setTempStyle(3, set.getParam(1183, -1));
					player.getAppearance().setTempStyle(4, set.getParam(1184, -1));
				} else {
					player.getAppearance().setTempStyle(2, newStyle);
				}
				break;
			case 3:
				player.getAppearance().setTempStyle(5, newStyle);
				break;
			case 4:
				player.getAppearance().setTempStyle(6, newStyle);
				break;
			case 5:
				player.getAppearance().setTempStyle(1, newStyle);
				break;
			}			
			player.getAppearance().sendBlock(true);
		}
	}
	
	private int getSetByStyle (int styleID, int styleSlot, boolean female) {
		EnumType enumType = EnumTypeList.list(5735);
		for (int slot = enumType.getSize() - 1; slot >= 0; slot--) {
			int v6 = enumType.getValueInt(slot);
			if (v6 != -1) {
				StructType struct = StructTypeList.list(v6);
				int v7 = 0;
				for (int setID = getSetStruct(struct, 0, female); setID != -1; setID = getSetStruct(struct, v7, female)) {
					StructType setStyles = StructTypeList.list(setID);
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
	
	private int getSetStruct(StructType struct, int slot, boolean female) {
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

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.widget.Widget#getStates()
	 */
	@Override
	public int[] getStates() {
		return new int[] { 1420 };
	}

}
