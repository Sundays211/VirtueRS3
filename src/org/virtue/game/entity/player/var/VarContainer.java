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
package org.virtue.game.entity.player.var;

import java.util.HashMap;
import java.util.Map;

import org.virtue.config.vartype.VarDomain;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.bit.VarBitOverflowException;
import org.virtue.config.vartype.bit.VarBitType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 5/04/2016
 */
public class VarContainer implements VarDomain {
	
	private Map<Integer, Object> values = new HashMap<>();

	/**
	 * 
	 */
	public VarContainer() {
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.var.VarDomain#getVarValue(org.virtue.config.vartype.VarType)
	 */
	@Override
	public Object getVarValue(VarType varType) {
		return values.get(varType.id);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.var.VarDomain#getVarValueLong(int)
	 */
	@Override
	public long getVarValueLong(VarType varType) {
		return (long) getVarValue(varType);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.var.VarDomain#getVarValueInt(int)
	 */
	@Override
	public int getVarValueInt(VarType varType) {
		// TODO Auto-generated method stub
		return 0;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.var.VarDomain#getVarBitValue(org.virtue.config.vartype.bit.VarBitType)
	 */
	@Override
	public int getVarBitValue(VarBitType type) {
		// TODO Auto-generated method stub
		return 0;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.var.VarDomain#setVarValue(org.virtue.config.vartype.VarType, java.lang.Object)
	 */
	@Override
	public void setVarValue(VarType varType, Object value) {
		values.put(varType.id, value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.var.VarDomain#setVarValueInt(int, int)
	 */
	@Override
	public void setVarValueInt(VarType varType, int value) {
		// TODO Auto-generated method stub

	}

	/* (non-Javadoc)
	 * @see org.virtue.config.vartype.VarDomain#setVarBitValue(org.virtue.config.vartype.bit.VarBitType, int)
	 */
	@Override
	public void setVarBitValue(VarBitType type, int value) throws VarBitOverflowException {
		// TODO Auto-generated method stub
		
	}

}
