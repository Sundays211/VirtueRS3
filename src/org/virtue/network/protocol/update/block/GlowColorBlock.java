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
package org.virtue.network.protocol.update.block;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.protocol.update.Block;
import org.virtue.network.protocol.update.BlockType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Nov 7, 2014
 */
public class GlowColorBlock extends Block {
	
	/**
	 * The red color (0-255)
	 */
	private int red;
	
	/**
	 * The green color (0-255)
	 */
	private int green;
	
	/**
	 * The blue color (0-255)
	 */
	private int blue;
	
	/**
	 * The alpha intensity (0-255)
	 */
	private int alpha;
	
	/**
	 * Amount of time before the color is updated
	 */
	private int delay;
	
	/**
	 * Amount of time the color should stay after its been updated
	 */
	private int duration;
	
	public GlowColorBlock(int r, int g, int b, int a, int delay, int duration) {
		super(BlockType.GLOW);
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alpha = a;
		this.delay = delay;
		this.duration = duration;
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.protocol.update.Block#encodeBlock(org.virtue.network.event.buffer.OutboundBuffer, org.virtue.game.entity.Entity)
	 */
	@Override
	public void encodeBlock(OutboundBuffer block, Entity entity) {
		if (entity instanceof Player) {
			block.putByte(red);
			block.putA(green);
			block.putA(blue);
			block.putByte(alpha);
			block.putShortA(delay);
			block.putShort(duration);
		} else {
			block.putByte(red);
			block.putByte(green);
			block.putA(blue);
			block.putByte(alpha);
			block.putLEShortA(delay);
			block.putLEShort(duration);
		}
	}
}
