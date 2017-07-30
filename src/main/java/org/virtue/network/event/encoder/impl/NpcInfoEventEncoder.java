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
package org.virtue.network.event.encoder.impl;

import java.security.MessageDigest;
import java.util.Iterator;

import org.virtue.core.constants.CompassPoint;
import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;
import org.virtue.network.protocol.update.Block;
import org.virtue.network.protocol.update.block.HeadIconBlock;
import org.virtue.network.protocol.update.ref.Viewport;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/11/2014
 */
public class NpcInfoEventEncoder implements EventEncoder<Viewport> {
	
	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, Viewport context) {
		OutboundBuffer buffer = new OutboundBuffer();
		OutboundBuffer block = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.NPC_INFO, player);
		buffer.setBitAccess();
		packNpcMovement(player, buffer, block, context);
		packNpcAddition(player, buffer, block, context);
		buffer.setByteAccess();
		buffer.putBytes(block.buffer(), 0, block.offset());
		buffer.finishVarShort();
		return buffer;
	}
	
	private void packNpcMovement (Entity player, OutboundBuffer buffer, OutboundBuffer block, Viewport context) {
		buffer.putBits(8, context.getLocalNpcs().size());
		for (Iterator<NPC> iterator = context.getLocalNpcs().iterator(); iterator.hasNext();) {
			NPC npc = iterator.next();
			if (!npc.getCurrentTile().withinDistance(player.getCurrentTile(), ((1 << context.getSize() - 1) - 2)) || npc.getMovement().teleported() || !npc.exists() || npc.getImpactHandler().isDead()) {
				buffer.putBits(1, 1);
				buffer.putBits(2, 3);
				iterator.remove();//Remove NPC from viewport
				continue;
			}
			CompassPoint walkDir = npc.getMovement().getNextWalkDirection();
			CompassPoint runDir = npc.getMovement().getNextRunDirection();
			boolean needsUpdate = needsMaskUpdate(npc, context, block.offset());
			if (needsUpdate) {
				packUpdateBlock(npc, block, context);
			}
			buffer.putBits(1, (needsUpdate || walkDir != null) ? 1 : 0);
			if (walkDir != null) {
				buffer.putBits(2, runDir == null ? 1 : 2);
				if (runDir != null) {
					buffer.putBits(1, 1);
				}
				buffer.putBits(3, walkDir.getID());
				if (runDir != null) {
					buffer.putBits(3, runDir.getID());
				}
				buffer.putBits(1, needsUpdate ? 1 : 0);
			} else if (needsUpdate) {
				buffer.putBits(2, 0);
			}
		}
	}
	
	private void packNpcAddition(Entity player, OutboundBuffer buffer, OutboundBuffer block, Viewport context) {
		for (NPC npc : World.getInstance().getNPCs()) {
			if (context.getLocalNpcs().size() >= 250) {
				//System.out.println("Unable to add npc "+npc.getID()+" to viewport of player "+player.getName());
				break;
			}
			if (npc == null || !npc.exists() || context.getLocalNpcs().contains(npc) || !npc.getCurrentTile().withinDistance(player.getCurrentTile(), ((1 << context.getSize() - 1) - 2))) {
				continue;
			}
			context.getLocalNpcs().add(npc);
			
			buffer.putBits(15, npc.getIndex());//NPC entity index
			
			int dx = npc.getCurrentTile().getX() - player.getCurrentTile().getX();
			int dy = npc.getCurrentTile().getY() - player.getCurrentTile().getY();

			if (dx < 15) {
				dx += 32;
			}
			if (dy < 15) {
				dy += 32;
			}

			buffer.putBits(3, npc.getDirection().getID());
			buffer.putBits(5, dx);
			buffer.putBits(5, dy);
			buffer.putBits(15, npc.getID());//NPC type
			buffer.putBits(1, npc.getMovement().teleported() ? 1 : 0);
			buffer.putBits(1, npc.needsMaskUpdate() ? 1 : 0);
			buffer.putBits(2, npc.getCurrentTile().getLevel());


			if (npc.needsMaskUpdate()) {
				packUpdateBlock(npc, block, context);
			}
		}
		buffer.putBits(15, 32767);
	}
	
	/**
	 * Returns whether or not a mask update needs to be packed for this player
	 * @param npc The player to check
	 * @param context The viewport of the current player
	 * @param blockSize The total size of the current update block
	 * @return True if a mask update is needed, false otherwise
	 */
	private boolean needsMaskUpdate (NPC npc, Viewport context, int blockSize) {
		boolean headIconUpdate = needHeadIconUpdate(npc.getIndex(), npc.getHeadIcons().getHash(), context, blockSize);
		return headIconUpdate || npc.needsMaskUpdate();
	}

	private boolean needHeadIconUpdate(int index, byte[] hash, Viewport context, int blockSize) {
		if (blockSize > ((7500 - 500) / 2) || hash == null) {
			return false;
		}
		return context.getNPCHeadIconHashes()[index] == null || !MessageDigest.isEqual(context.getNPCHeadIconHashes()[index], hash);
	}
	
	private void packUpdateBlock (NPC npc, OutboundBuffer block, Viewport context) {
		int masks = 0;
		Block headIconBlock = null;
		if (needHeadIconUpdate(npc.getIndex(), npc.getHeadIcons().getHash(), context, block.offset())) {
			headIconBlock = new HeadIconBlock();
			masks |= headIconBlock.getMask(true);
			context.getNPCHeadIconHashes()[npc.getIndex()] = npc.getHeadIcons().getHash();
		}
		for (int pos = 0; pos < 24; pos++) {
			if (npc.getUpdateBlocks()[pos] == null) {
				continue;
			}
			masks |= npc.getUpdateBlocks()[pos].getMask(true);
		}		
		
		if (masks >= 0x100) {
			masks |= 0x20;
		}
		if (masks >= 0x10000) {
			masks |= 0x4000;
		}
		if (masks >= 0x1000000) {
			masks |= 0x20000;
		}
		
		//System.out.println("Mask: 0x"+Integer.toHexString(masks)+", uid="+npc.getIndex());
		
		block.putShort(npc.getIndex());		
		block.putByte(masks & 0xff);
		
		if (masks >= 0x100) {
			block.putByte((masks >> 8) & 0xff);
		}
		if (masks >= 0x10000) {
			block.putByte((masks >> 16) & 0xff);
		}
		if (masks >= 0x1000000) {
			block.putByte((masks >> 24) & 0xff);
		}
		for (int pos = 0; pos < 24; pos++) {
			if (npc.getUpdateBlocks()[pos] == null) {
				if (headIconBlock != null && pos == headIconBlock.getPosition(true)) {
					//System.out.println("Encoding mask "+headIconBlock.getClass().getName());
					headIconBlock.encodeBlock(block, npc);
				}
				continue;
			}
			//System.out.println("Encoding mask "+npc.getUpdateBlocks()[pos].getClass().getName());
			npc.getUpdateBlocks()[pos].encodeBlock(block, npc);			
		}
	}
}
