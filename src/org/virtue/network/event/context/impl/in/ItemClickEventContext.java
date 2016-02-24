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
package org.virtue.network.event.context.impl.in;

import org.virtue.network.event.context.GameEventContext;
import org.virtue.network.event.decoder.ClientProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 31/10/2014
 */
public class ItemClickEventContext implements GameEventContext {
	
	private int itemID;
	
	private int baseX;
	private int baseY;
	
	private boolean forceRun;
	
	private OptionButton button;
	
	public ItemClickEventContext (int id, int baseX, int baseY, boolean forcerun, int opcode) {
		this.itemID = id;
		this.baseX = baseX;
		this.baseY = baseY;
		this.forceRun = forcerun;
		this.button = forOpcode(opcode);
	}
	
	public int getItemID () {
		return itemID;
	}
	
	public int getBaseX () {
		return baseX;
	}
	
	public int getBaseY () {
		return baseY;
	}
	
	public boolean forceRun () {
		return forceRun;
	}
	
	public OptionButton getButton () {
		return button;
	}
	
	public static OptionButton forOpcode (int opcode) {
		switch (ClientProtocol.forOpcode(opcode)) {
		case ITEM_OPTION_1:
			return OptionButton.ONE;
		case ITEM_OPTION_2:
			return OptionButton.TWO;
		case ITEM_OPTION_3:
			return OptionButton.THREE;
		case ITEM_OPTION_4:
			return OptionButton.FOUR;
		case ITEM_OPTION_5:
			return OptionButton.FIVE;
		case ITEM_OPTION_6:
			return OptionButton.SIX;
		default:
			return null;
		}
	}

}
