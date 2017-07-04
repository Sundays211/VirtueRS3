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
package org.virtue.network.protocol.update;

import org.virtue.game.entity.Entity;
import org.virtue.network.event.buffer.OutboundBuffer;


/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 14, 2014
 */
public abstract class Block {

	/**
	 * Represents the block mask
	 */
	private int mask;
	
	/**
	 * Represents the block mask when used for an NPC
	 */
	private int npcMask;
	
	/**
	 * Represents the position of the block within the sending order
	 */
	private int position;
	
	
	public byte walkMask;
	
	/**
	 * Represents the position of the block within the sending order for an NPC
	 */
	private int npcPosition;
	
	public Block(BlockType type) {
		this(type.getPlayerMask(), type.getPlayerPos(), type.getNpcMask(), type.getNpcPos());
	}
	
	/**
	 * Creates a new block with the block's mask
	 * @param flag
	 */
	private Block(int mask, int position, int npcmask, int npcpos) {
		this.mask = mask;
		this.position = position;
		this.npcMask = npcmask;
		this.npcPosition = npcpos;
	}
	
	/**
	 * Returns the block's mask
	 */
	public int getMask(boolean npc) {
		return npc ? npcMask : mask;
	}
	
	/**
	 * Returns the block's position
	 */
	public int getPosition(boolean npc) {
		return npc ? npcPosition : position;
	}
	
	/**
	 * Encodes the block
	 * @param buffer - packet builder
	 * @param block - block builder
	 * @param entity - entity that needs the block updated
	 */
	public abstract void encodeBlock(OutboundBuffer block, Entity entity);
	
}
