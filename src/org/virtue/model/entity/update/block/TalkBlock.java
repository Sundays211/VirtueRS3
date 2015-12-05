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
package org.virtue.model.entity.update.block;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.update.Block;
import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 14, 2014
 */
public class TalkBlock extends Block {

	/**
	 * The message
	 */
	private String message;
	
	/**
	 * The flags of the message
	 */
	private int flags;
	
	/**
	 * The {@link TalkBlock} constructor
	 */
	public TalkBlock(String message, int flags) {
		super(0x40000, 8, 0x80, 4);
		this.message = message;
		this.flags = flags;
	}


	/* (non-Javadoc)
	 * @see org.virtue.model.entity.update.Block#encodeBlock(org.virtue.network.event.buffer.OutboundBuffer, org.virtue.model.entity.Entity)
	 */
	@Override
	public void encodeBlock(OutboundBuffer block, Entity entity) {
		if (entity instanceof Player) {
			block.putString(message);
			block.putA(flags);
		} else {
			block.putString(message);			
		}
	}
}
