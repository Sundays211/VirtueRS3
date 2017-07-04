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
package org.virtue.network.event.context.impl.in;

import org.virtue.network.event.context.GameEventContext;
import org.virtue.network.event.decoder.ClientProtocol;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 5, 2014
 */
public class ButtonClickEventContext implements GameEventContext {
	
	private int hash;
	private int slot;
	private int itemID;
	private OptionButton button;
	
	public ButtonClickEventContext(int hash, int slot, int itemID, int opcode) {
		this.hash = hash;
		this.slot = slot;
		this.itemID = itemID;
		this.button = forOpcode(opcode);
	}

	public int getHash() {
		return hash;
	}

	public int getSlot() {
		return slot;
	}

	public int getItemID() {
		return itemID;
	}
	
	public OptionButton getButton () {
		return button;
	}

	public int getInterfaceId() {
		return hash >> 16;
	}

	public int getComponentId() {
		return hash & 0xffff;
	}
	
	public static OptionButton forOpcode (int opcode) {
		switch (ClientProtocol.forOpcode(opcode)) {
		case IF_BUTTON1:
			return OptionButton.ONE;
		case IF_BUTTON2:
			return OptionButton.TWO;
		case IF_BUTTON3:
			return OptionButton.THREE;
		case IF_BUTTON4:
			return OptionButton.FOUR;
		case IF_BUTTON5:
			return OptionButton.FIVE;
		case IF_BUTTON6:
			return OptionButton.SIX;
		case IF_BUTTON7:
			return OptionButton.SEVEN;
		case IF_BUTTON8:
			return OptionButton.EIGHT;
		case IF_BUTTON9:
			return OptionButton.NINE;
		case IF_BUTTON10:
			return OptionButton.TEN;
		default:
			return null;
		}
	}
	
}
