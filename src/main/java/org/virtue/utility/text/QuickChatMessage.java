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
package org.virtue.utility.text;

import org.virtue.config.ConfigProvider;
import org.virtue.config.quickchatphrasetype.QuickChatPhraseType;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.bit.VarBitType;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.network.event.buffer.InboundBuffer;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/07/2015
 */
public class QuickChatMessage {
	
	public static QuickChatMessage decodeMessage (int type, InboundBuffer buffer) {
		QuickChatMessage message = new QuickChatMessage();
		message.type = QuickChatPhraseTypeList.list(type);
		if (message.type == null) {
			return null;
		}
		message.commands = message.type.unpack(buffer);
		return message;
	}
	
	private QuickChatPhraseType type;
	
	private int[] commands;
	
	private QuickChatMessage () {
		
	}
	
	public QuickChatPhraseType getType () {
		return type;
	}
	
	public int[] getCommands () {
		return commands;
	}
	
	public void setParams (Player player, ConfigProvider configProvider) {
		VarType varType;
		for (int param=0;param<type.getParamCount();param++) {
			switch (type.getDynamicCommand(param)) {
			case ENUM_STRING_STATBASE://Enum value related to base skill level
				commands[param] = player.getSkills().getBaseLevel(Stat.getById(type.getParamKey(param, 1)));
				break;
			case STAT_BASE://Base skill level
				commands[param] = player.getSkills().getBaseLevel(Stat.getById(type.getParamKey(param, 0)));
				break;
			case TOSTRING_VARBIT://Var bit value
				VarBitType varBitType = configProvider.getVarBitTypes().list(type.getParamKey(param, 0));
				commands[param] = player.getVars().getVarBitValue(varBitType);
				break;
			case TOSTRING_VARP://Var player value
				varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(type.getParamKey(param, 0));
				commands[param] = player.getVars().getVarValueInt(varType);
				break;
			case ACTIVECOMBATLEVEL://Combat level
				commands[param] = player.getSkills().getCombatLevel();
				break;
			case ACC_GETCOUNT_WORLD://Friend chat user count
				commands[param] = player.getChat().getFriendChatWorldCount();
				break;
			case ACC_GETMEANCOMBATLEVEL://Friend chat average combat level
				commands[param] = player.getChat().getFriendChatMeanCombatLevel();
				break;
			case ENUM_STRING://Currently only used for slayer assignment
				varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(type.getParamKey(param, 1));
				commands[param] = player.getVars().getVarValueInt(varType);
				break;
			case ENUM_STRING_CLAN://Friend chat rank
				break;
			case TOSTRING_SHARED:
				break;
			case LISTDIALOG://These are all client-sided only, so no extra work to be done on the server
			case OBJDIALOG:
			case OBJTRADEDIALOG:
			case COUNTDIALOG:
			default:
				break;
			
			}
		}
	}

}
