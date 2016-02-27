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
 * @since Oct 14, 2014
 */
public class SpotAnimationBlock extends Block {

	/**
	 * The graphics block type
	 */
	private int type;
	
	/**
	 * The ID of the graphics
	 */
	private int id;
	
	/**
	 * The rotation of the graphic
	 */
	private int rotation;
	
	/**
	 * The height of the graphic
	 */
	private int height;
	
	/**
	 * The speed of the graphic
	 */
	private int speed;
	
	/**
	 * The {@link SpotAnimationBlock} constructor
	 */
	public SpotAnimationBlock(int type, int id) {
		this(type, id, 0, 0, 0);
	}
	
	public SpotAnimationBlock(int type, int id, int height) {
		this(type, id, height, 0, 0);
	}
	
	public SpotAnimationBlock(int type, int id, int height, int speed, int rotation) {
		super(getType(type));		
		this.type = type;
		this.id = id;
		this.height = height;
		this.speed = speed;
		this.rotation = rotation;
	}
	
	private static BlockType getType (int type) {
		switch (type) {
		case 1:
			return BlockType.SPOT_1;
		case 2:
			return BlockType.SPOT_2;
		case 3:
			return BlockType.SPOT_3;
		case 4:
			return BlockType.SPOT_4;
		case 5:
			return BlockType.SPOT_5;
		default:
			return null;
		}
	}
	
	/**
	 * Transforms the graphics block for the given delay.
	 * @param delay The delay.
	 * @return The graphics block.
	 */
	public SpotAnimationBlock transform(int delay) {
		return new SpotAnimationBlock(type, id, height, delay, rotation);
	}
	
	private int getSettingsHash () {
		return (height << 16) | (speed & 0xffff);
	}
	
	private int getRotationHash () {
		return (rotation & 0x7);
	}


	/* (non-Javadoc)
	 * @see org.virtue.network.protocol.update.Block#encodeBlock(org.virtue.network.event.buffer.OutboundBuffer, org.virtue.game.entity.Entity)
	 */
	@Override
	public void encodeBlock(OutboundBuffer block, Entity entity) {
		//System.out.println("Encoding graphics block. id="+id+", type="+type);
		if (entity instanceof Player) {
			switch (type) {
			case 1:
				block.putLEShort(id);
				block.putLEInt(getSettingsHash());
				block.putA(getRotationHash());
				break;
			case 2:
				block.putShortA(id);
				block.putInt(getSettingsHash());
				block.putS(getRotationHash());
				break;
			case 3:
				block.putLEShortA(id);
				block.putIntAlt3(getSettingsHash());
				block.putByte(getRotationHash());
				break;
			case 4:
				block.putShort(id);
				block.putIntAlt3(getSettingsHash());
				block.putS(getRotationHash());
				break;
			case 5:
				block.putShortA(id);
				block.putIntAlt2(getSettingsHash());
				block.putByte(getRotationHash());
				break;
			}
		} else {
			switch (type) {
			case 1://done
				block.putShortA(id);
				block.putInt(getSettingsHash());
				block.putA(getRotationHash());
				break;
			case 2://done
				block.putShort(id);
				block.putIntAlt2(getSettingsHash());
				block.putC(getRotationHash());
				break;
			case 3://done
				block.putLEShortA(id);
				block.putIntAlt3(getSettingsHash());
				block.putByte(getRotationHash());
				break;
			case 4://done
				block.putShort(id);
				block.putIntAlt3(getSettingsHash());
				block.putA(getRotationHash());
				break;
			case 5://done
				block.putShort(id);
				block.putInt(getSettingsHash());
				block.putByte(getRotationHash());
				break;
			}
		}
	}
}
