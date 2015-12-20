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
import org.virtue.game.world.region.Tile;
import org.virtue.game.world.region.movement.Direction;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.protocol.update.Block;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 14, 2014
 */
public class ForceMovementBlock extends Block {
	
	private Tile tile1;
	private int delay1;
	private Tile tile2;
	private int delay2;
	
	private Direction direction;
	
	public ForceMovementBlock(Tile tile1, int delay1, Direction direction) {
		this(tile1, delay1, direction, tile1, delay1+1);
	}

	/**
	 * The {@link ForceMovementBlock} constructor
	 */
	public ForceMovementBlock(Tile tile1, int delay1, Direction direction, Tile tile2, int delay2) {
		super(0x2, 1, 0x4000, 8);
		this.tile1 = tile1;
		this.delay1 = delay1;
		this.tile2 = tile2;
		this.delay2 = delay2;
		this.direction = direction;
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.protocol.update.Block#encodeBlock(org.virtue.network.event.buffer.OutboundBuffer, org.virtue.game.entity.Entity)
	 */
	@Override
	public void encodeBlock(OutboundBuffer block, Entity entity) {
		if (entity instanceof Player) {
			block.putS(tile1.getX() - entity.getCurrentTile().getX());
			block.putS(tile1.getY() - entity.getCurrentTile().getY());
			block.putC(tile2.getX() - entity.getCurrentTile().getX());
			block.putByte(tile2.getY() - entity.getCurrentTile().getY());
			block.putShortA(delay1 * 30);
			block.putShortA(delay2 * 30);
			block.putShort(this.direction.getID());
		} else {
			block.putS(tile1.getX() - entity.getCurrentTile().getX());
			block.putS(tile1.getY() - entity.getCurrentTile().getY());
			block.putC(tile2.getX() - entity.getCurrentTile().getX());
			block.putS(tile2.getY() - entity.getCurrentTile().getY());
			block.putLEShortA(delay1 * 30);
			block.putLEShortA(delay2 * 30);
			block.putLEShort(this.direction.getID());			
		}
	}

}
