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
import org.virtue.game.map.CoordGrid;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.protocol.update.Block;
import org.virtue.network.protocol.update.BlockType;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 14, 2014
 */
public class ForceMovementBlock extends Block {

	private CoordGrid intermediateCoords;
	private int intermediateDelay;
	private CoordGrid finalCoords;
	private int finalDelay;

	private CoordGrid facing;

	/**
	 * The {@link ForceMovementBlock} constructor
	 */
	public ForceMovementBlock(CoordGrid fromCoords, int delay, CoordGrid toCoords, int length, CoordGrid facing) {
		super(BlockType.MOVE);
		this.intermediateCoords = fromCoords;
		this.intermediateDelay = delay;
		this.finalCoords = toCoords;
		this.finalDelay = length;
		this.facing = facing;
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.protocol.update.Block#encodeBlock(org.virtue.network.event.buffer.OutboundBuffer, org.virtue.game.entity.Entity)
	 */
	@Override
	public void encodeBlock(OutboundBuffer block, Entity entity) {
		int direction = ((int) (Math.atan2(entity.getCurrentTile().getX() - facing.getX(), entity.getCurrentTile().getY() - facing.getY()) * 2607.5945876176133)) & 0x3fff;
		if (entity instanceof Player) {
			block.putA(intermediateCoords.getX() - entity.getCurrentTile().getX());
			block.putA(intermediateCoords.getY() - entity.getCurrentTile().getY());
			block.putC(finalCoords.getX() - entity.getCurrentTile().getX());
			block.putA(finalCoords.getY() - entity.getCurrentTile().getY());
			block.putA(intermediateCoords.getLevel() - entity.getCurrentTile().getLevel());
			block.putA(finalCoords.getLevel() - entity.getCurrentTile().getLevel());
			block.putShortA(intermediateDelay);
			block.putLEShortA(finalDelay);
			block.putLEShortA(direction);
		} else {
			block.putC(intermediateCoords.getX() - entity.getCurrentTile().getX());
			block.putS(intermediateCoords.getY() - entity.getCurrentTile().getY());
			block.putByte(finalCoords.getX() - entity.getCurrentTile().getX());
			block.putA(finalCoords.getY() - entity.getCurrentTile().getY());
			block.putS(intermediateCoords.getLevel() - entity.getCurrentTile().getLevel());
			block.putA(finalCoords.getLevel() - entity.getCurrentTile().getLevel());
			block.putShortA(intermediateDelay);
			block.putShort(finalDelay);
			block.putLEShort(direction);
		}
	}

}
