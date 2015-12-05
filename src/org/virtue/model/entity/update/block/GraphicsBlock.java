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
public class GraphicsBlock extends Block {

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
	 * The {@link GraphicsBlock} constructor
	 */
	public GraphicsBlock(int type, int id) {
		this(type, id, 0, 0, 0);
	}
	
	public GraphicsBlock(int type, int id, int height) {
		this(type, id, height, 0, 0);
	}
	
	public GraphicsBlock(int type, int id, int height, int speed, int rotation) {
		super(getType(type, false), getPos(type, false), getType(type, true), getPos(type, true));		
		this.type = type;
		this.id = id;
		this.height = height;
		this.speed = speed;
		this.rotation = rotation;
	}
	
	/**
	 * Transforms the graphics block for the given delay.
	 * @param delay The delay.
	 * @return The graphics block.
	 */
	public GraphicsBlock transform(int delay) {
		return new GraphicsBlock(type, id, height, delay, rotation);
	}
	
	/**
	 * Gets the mask for the graphics block type
	 * @param type
	 * @param npc True if the mask is for an npc, false otherwise
	 * @return
	 */
	private static int getType(int type, boolean npc) {
		if (npc) {
			switch (type) {
			case 1:
				return 0x1;
			case 2:
				return 0x400;
			case 3:
				return 0x10000000;
			case 4:
				return 0x8000000;
			case 5:
				return 0x1000000;
			default:
				return 0;
			}			
		} else {
			switch (type) {
			case 1:
				return 0x1;
			case 2:
				return 0x2000;
			case 3:
				return 0x200;
			case 4:
				return 0x10000;
			case 5:
				return 0x400000;
			default:
				return 0;
			}			
		}
	}
	
	/**
	 * Gets the position of the graphics block type
	 * @param type
	 * @param npc True if the position is for an npc, false otherwise
	 * @return The position
	 */
	private static int getPos(int type, boolean npc) {
		if (npc) {
			switch (type) {
			case 1:
				return 20;
			case 2:
				return 24;
			case 3:
				return 18;
			case 4:
				return 10;
			case 5:
				return 15;
			default:
				return -1;
			}
		} else {
			switch (type) {
			case 1:
				return 11;
			case 2:
				return 18;
			case 3:
				return 14;
			case 4:
				return 15;
			case 5:
				return 17;
			default:
				return -1;
			}
		}
	}
	
	private int getSettingsHash () {
		return (height << 16) | (speed & 0xffff);
	}
	
	private int getRotationHash () {
		return (rotation & 0x7);
	}


	/* (non-Javadoc)
	 * @see org.virtue.model.entity.update.Block#encodeBlock(org.virtue.network.event.buffer.OutboundBuffer, org.virtue.model.entity.Entity)
	 */
	@Override
	public void encodeBlock(OutboundBuffer block, Entity entity) {
		//System.out.println("Encoding graphics block. id="+id+", type="+type);
		if (entity instanceof Player) {
			switch (type) {
			case 1://
				block.putLEShort(id);
				block.putIntB(getSettingsHash());
				block.putC(getRotationHash());
				break;
			case 2://
				block.putLEShortA(id);
				block.putIntA(getSettingsHash());
				block.putS(getRotationHash());
				break;
			case 3://
				block.putShort(id);
				block.putIntA(getSettingsHash());
				block.putByte(getRotationHash());
				break;
			case 4://
				block.putShort(id);
				block.putIntA(getSettingsHash());
				block.putS(getRotationHash());
				break;
			case 5://
				block.putLEShort(id);
				block.putIntB(getSettingsHash());
				block.putS(getRotationHash());
				break;
			}
		} else {
			switch (type) {
			case 1://
				block.putLEShort(id);
				block.putIntA(getSettingsHash());
				block.putByte(getRotationHash());
				break;
			case 2://
				block.putLEShortA(id);
				block.putIntA(getSettingsHash());
				block.putS(getRotationHash());
				break;
			case 3://
				block.putLEShort(id);
				block.putLEInt(getSettingsHash());
				block.putC(getRotationHash());
				break;
			case 4://
				block.putShortA(id);
				block.putInt(getSettingsHash());
				block.putS(getRotationHash());
				break;
			case 5://
				block.putLEShort(id);
				block.putIntA(getSettingsHash());
				block.putS(getRotationHash());
				break;
			}
		}
	}
}
