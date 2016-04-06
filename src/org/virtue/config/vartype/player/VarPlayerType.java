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
package org.virtue.config.vartype.player;

import java.nio.ByteBuffer;

import org.virtue.config.vartype.VarType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 6/04/2016
 */
public class VarPlayerType extends VarType {
	
	public static enum VarPlayerTypeEncodingKey {
		PROTECTEDACCESSREQUIRED(100),
		SETVARALLOWED(101),
		WEALTHEQUIVALENT(102),
		SENDTOGAMELOGWORLD(103),
		WARNONDECREASE(104),
		HISCOREDATA(105),
		PLOGDATA(106),
		CLANDATA(107),
		TRANSMITLEVELOTHER(108),
		GENERALPURPOSE(109),
		CLIENTCODE(110),
		MASTERQUEST(111),
		QUESTPOINTS(112),
		LEGACYID(113),
		KEY_114(114),
		KEY_115(115),
		KEY_116(116),
		KEY_117(117);

		private int serialID;

		private VarPlayerTypeEncodingKey(int id) {
			this.serialID = id;
		}
	    
		static VarPlayerTypeEncodingKey getById (int id) {
			for (VarPlayerTypeEncodingKey key : values()) {
				if (id == key.serialID) {
					return key;
				}
			}
			return null;
		}
	}
	
	public int clientCode;

	public VarPlayerType(int id, VarPlayerTypeList list) {
		super(id, list);
	}

	@Override
	public void decode (ByteBuffer buffer, int code) {
		VarPlayerTypeEncodingKey key = VarPlayerTypeEncodingKey.getById(code);
		switch (key) {
		case CLIENTCODE:
			clientCode = buffer.getShort() & 0xffff;
			break;
		default:
			throw new IllegalStateException("Unsupported encoding key: "+key);
		}
	}
}
