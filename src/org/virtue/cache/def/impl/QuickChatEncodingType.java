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
package org.virtue.cache.def.impl;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/07/2015
 */
public enum QuickChatEncodingType {
	LISTDIALOG(0, 2, 2, 1),
	OBJDIALOG(1, 2, 2, 0),
	COUNTDIALOG(2, 4, 4, 0),
	STAT_BASE(4, 1, 1, 1),
	ENUM_STRING(6, 0, 4, 2),
	ENUM_STRING_CLAN(7, 0, 1, 1),
	TOSTRING_VARP(8, 0, 4, 1),
	TOSTRING_VARBIT(9, 0, 4, 1),
	OBJTRADEDIALOG(10, 2, 2, 0),
	ENUM_STRING_STATBASE(11, 0, 1, 2),
	ACC_GETCOUNT_WORLD(12, 0, 1, 0),
	ACC_GETMEANCOMBATLEVEL(13, 0, 1, 0),
	TOSTRING_SHARED(14, 0, 4, 1),
	ACTIVECOMBATLEVEL(15, 0, 1, 0);
		
    public int serialID;
    public int clientTransmitSize;
    public int serverTransmitSize;
    public int configKeyCount;
    
    QuickChatEncodingType(int id, int clientSize, int serverSize, int keyCount) {
		serialID = id;
		clientTransmitSize = clientSize;
		serverTransmitSize = serverSize;
		configKeyCount = keyCount;
    }
    
    public static QuickChatEncodingType getByID(int id) {
		for (QuickChatEncodingType key : values()) {
		    if (id == key.serialID) {
		    	return key;
		    }
		}
		return null;
	}
}
