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
package org.virtue.network.protocol.update.ref;

import java.util.Arrays;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.utility.MD5Encryption;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 13/11/2014
 */
public class HeadIcons {
	
	private Entity entity;
	
	private byte[] iconData;
	private byte[] iconHash;
	
	private int[] spriteIDs;
	private int[] subSpriteIDs;
	
	public HeadIcons (Entity entity) {
		this.entity = entity;
		spriteIDs = new int[8];
		Arrays.fill(spriteIDs, -1);
		subSpriteIDs = new int[8];
		Arrays.fill(subSpriteIDs, -1);
	}
	
	public void setIcon (int mainSprite, int subSprite) {
		this.setIcon(1, mainSprite, subSprite);
	}
	
	public void setIcon (int type, int mainSprite, int subSprite) {
		this.spriteIDs[type] = mainSprite;
		this.subSpriteIDs[type] = subSprite;
	}
	
	public void reset() {
		this.reset(1);
	}
	
	public void reset(int type) {
		spriteIDs[type] = -1;
		subSpriteIDs[type] = -1;
	}
	
	public void refresh () {
		OutboundBuffer update = new OutboundBuffer();
		int flags = 0;
		for (int slot=0; slot<spriteIDs.length; slot++) {
			if (spriteIDs[slot] != -1) {
				flags |= 1 << slot;
			}
		}
		if (entity instanceof Player) {
			update.putByte(flags);
		} else if (entity instanceof NPC) {
			update.putC(flags);
		}
		for (int slot=0; slot<spriteIDs.length; slot++) {
			if (spriteIDs[slot] != -1) {
				if (entity instanceof Player) {
					update.putByte(subSpriteIDs[slot]);
					update.putShort(spriteIDs[slot]);
				} else if (entity instanceof NPC) {
					update.putBigSmart(spriteIDs[slot]);
					update.putSmartS(subSpriteIDs[slot]);
				}
			}
		}
		
		byte[] blockData = new byte[update.offset()];
		System.arraycopy(update.buffer(), 0, blockData, 0, blockData.length);
		byte[] md5Hash = MD5Encryption.encrypt(blockData);
		this.iconData = blockData;
		this.iconHash = md5Hash;
	}

	public byte[] getHash() {
		return iconHash;
	}

	public byte[] getData() {
		return iconData;
	}

}
