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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 14, 2014
 */
public class AnimationBlock extends Block {
	
	/**
	 * The reset animation.
	 */
	public static final AnimationBlock RESET = new AnimationBlock(-1);
	
	private int[] frames;
	
	private int delay;

	/**
	 * The {@link AnimationBlock} constructor
	 */
	public AnimationBlock(int id) {
		this(id, 0);
	}
	
	public AnimationBlock(int id, int delay) {
		super(0x4, 2, 0x8, 2);
		this.frames = new int[] { id, id, id, id };
		this.delay = delay;
	}
	
	/**
	 * Transforms the graphics block for the given delay.
	 * @param delay The delay.
	 * @return The graphics block.
	 */
	public AnimationBlock transform(int delay) {
		return new AnimationBlock(frames[0], delay);
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.protocol.update.Block#encodeBlock(org.virtue.network.event.buffer.OutboundBuffer, org.virtue.game.entity.Entity)
	 */
	@Override
	public void encodeBlock(OutboundBuffer block, Entity entity) {
		//System.out.println("Encoding animation block. id="+frames[0]+", delay="+delay);
		for (int frame : frames) {
			block.putBigSmart(frame);
		}
		if (entity instanceof Player) {
			block.putC(delay);//Delay
		} else {
			block.putA(delay);//Delay
		}
	}

	/**
	 * Gets the delay value.
	 * @return The delay.
	 */
	public int getDelay() {
		return delay;
	}

}
