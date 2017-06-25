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
package org.virtue.network.event.encoder.impl;

import java.security.MessageDigest;

import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.encoder.EventEncoder;
import org.virtue.network.event.encoder.ServerProtocol;
import org.virtue.network.protocol.update.Block;
import org.virtue.network.protocol.update.block.AppearenceBlock;
import org.virtue.network.protocol.update.block.HeadIconBlock;
import org.virtue.network.protocol.update.ref.MoveSpeed;
import org.virtue.network.protocol.update.ref.Viewport;
import org.virtue.utility.DirectionUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 18, 2014
 */
public class PlayerInfoEventEncoder implements EventEncoder<Viewport> {

	private static final int MAX_PLAYER_ADD = 25;

	/* (non-Javadoc)
	 * @see org.virtue.network.event.encoder.EventEncoder#encode(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public OutboundBuffer encode(Player player, Viewport context) {
		OutboundBuffer buffer = new OutboundBuffer();
		OutboundBuffer block = new OutboundBuffer();
		buffer.putVarShort(ServerProtocol.PLAYER_INFO, player);
		//int startOffset = buffer.offset();
		processLocalPlayers(player, buffer, block, context, true);
		processLocalPlayers(player, buffer, block, context, false);
		processOutsidePlayers(player, buffer, block, context, true);
		processOutsidePlayers(player, buffer, block, context, false);
		//System.out.println("Pointer before masks: "+(buffer.offset() - startOffset));
		buffer.putBytes(block.buffer(), 0, block.offset());
		//System.out.println("Pointer after masks: "+(buffer.offset() - startOffset));
		buffer.finishVarShort();
		return buffer;
	}

	private void processLocalPlayers(Entity player, OutboundBuffer buffer, OutboundBuffer block, Viewport context, boolean nsn0) {
		buffer.setBitAccess();
		int skipCount = 0;

		for (int index = 0; index < context.getLocalPlayerIndexCount(); index++) {
			int uid = context.getLocalPlayerIndicies()[index];
			if (nsn0 ? (0x1 & context.getSlotFlags()[uid]) != 0 : (0x1 & context.getSlotFlags()[uid]) == 0) {
				continue;
			}
			if (skipCount > 0) {
				skipCount--;
				context.getSlotFlags()[uid] = (byte) (context.getSlotFlags()[uid] | 0x2);
				continue;
			}

			Player p = context.getLocalPlayers()[uid];
			if (needsRemove(player, p)) {
				buffer.putBits(1, 1);
				buffer.putBits(1, 0);
				buffer.putBits(2, 0);
				//context.getRegionHashes()[playerIndex] = p.getLastTile() == null ? p.getCurrentTile().getRegionHash() : p.getLastTile().getRegionHash();

				int regionHash = p.getCurrentTile().getRegionHash();
				if (regionHash == context.getRegionHashes()[uid]) {
					buffer.putBits(1, 0);
				} else {
					buffer.putBits(1, 1);
					appendRegionHash(buffer, p, context.getRegionHashes()[uid], regionHash);
					context.getRegionHashes()[uid] = regionHash;
				}

				context.getLocalPlayers()[uid] = null;
			} else {
				//boolean appearanceUpdate = needsAppearanceUpdate(p.getIndex(), p.getAppearance().getHash(), context, block.offset());
				//boolean headIconUpdate = needHeadIconUpdate(p.getIndex(), p.getAppearance().getHash(), context, block.offset());
				context.getRegionHashes()[uid] = p.getCurrentTile().getRegionHash();
				boolean hasExtendedInfo = needsMaskUpdate(p, context, block.offset());
				if (hasExtendedInfo) {
					packUpdateBlock(p, block, context, false);
				}
				MoveSpeed speed = p.getMovement().getNextMoveSpeed();
				int walkDir = p.getMovement().getNextWalkDirection();
				int runDir = p.getMovement().getNextRunDirection();
				if (speed == MoveSpeed.INSTANT) {
					buffer.putBits(1, 1);
					buffer.putBits(1, hasExtendedInfo ? 1 : 0);
					buffer.putBits(2, 3);

					int xOffset = p.getCurrentTile().getX() - p.getLastTile().getX();
					int yOffset = p.getCurrentTile().getY() - p.getLastTile().getY();
					int planeOffset = p.getCurrentTile().getLevel() - p.getLastTile().getLevel();
					if (Math.abs(p.getCurrentTile().getX() - p.getLastTile().getX()) <= 14 && Math.abs(p.getCurrentTile().getY() - p.getLastTile().getY()) <= 14) {
						buffer.putBits(1, 0);
						if (xOffset < 0) {
							xOffset += 32;
						}
						if (yOffset < 0) {
							yOffset += 32;
						}
						buffer.putBits(15, (yOffset) + (xOffset << 5) + ((planeOffset & 0x3) << 10) + (4 << 12));
					} else {
						buffer.putBits(1, 1);
						buffer.putBits(3, 4);
						buffer.putBits(30, (yOffset & 0x3fff) + ((xOffset & 0x3fff) << 14) + ((planeOffset & 0x3) << 28));
					}
				} else if (walkDir != -1) {
					boolean running = (runDir != -1);
					int dx = DirectionUtility.DIRECTION_DELTA_X[walkDir];//running ? runDir : walkDir
					int dy = DirectionUtility.DIRECTION_DELTA_Y[walkDir];//running ? runDir : walkDir
					int opcode;
					if (runDir != -1) {
						dx += DirectionUtility.DIRECTION_DELTA_X[runDir];
						dy += DirectionUtility.DIRECTION_DELTA_Y[runDir];
						opcode = DirectionUtility.getPlayerRunningDirection(dx, dy);
						if (opcode == -1) {
							running = false;
							opcode = DirectionUtility.getPlayerWalkingDirection(dx, dy);
						} else {
							running = true;
						}
					} else {
						running = false;
						opcode = DirectionUtility.getPlayerWalkingDirection(dx, dy);
					}
					buffer.putBits(1, 1);//Needs update
					buffer.putBits(1, hasExtendedInfo ? 1 : 0);//Mask update
					if (speed.getId() != context.getMovementTypes()[uid]) {
						buffer.putBits(2, 3);//Teleport update
						buffer.putBits(1, 0);//Local
						//System.out.println("dx="+dx+", dy="+dy);
						if (dx < 0) {
							dx += 32;
						}
						if (dy < 0) {
							dy += 32;
						}
						//System.out.println("New position: x="+p.getCurrentTile().getLocalX()+", y="+p.getCurrentTile().getLocalY());
						buffer.putBits(15, dy + (dx << 5) + (0 << 10) + ((speed.getId()+1) << 12));
						context.getMovementTypes()[uid] = speed.getId();
					} else if ((dx == 0 && dy == 0)) {
						buffer.putBits(2, 0);
					} else {
						if (running) {
							buffer.putBits(2, 2);//Run update
							buffer.putBits(4, opcode);//Run opcode
						} else {
							buffer.putBits(2, 1);//Walk update
							buffer.putBits(3, opcode);//Walk opcode
							buffer.putBits(1, 0);//Not sure but should be zero
						}
					}
				} else if (hasExtendedInfo) {
					buffer.putBits(1, 1);//Needs update
					buffer.putBits(1, 1);//Mask update
					buffer.putBits(2, 0);//No other updates
				} else {
					buffer.putBits(1, 0);//No update needed
					for (int idx = index + 1; idx < context.getLocalPlayerIndexCount(); idx++) {
						int p2Index = context.getLocalPlayerIndicies()[idx];
						if (nsn0 ? (0x1 & context.getSlotFlags()[p2Index]) != 0 : (0x1 & context.getSlotFlags()[p2Index]) == 0) {
							continue;
						}
						Player p2 = context.getLocalPlayers()[p2Index];
						if (needsRemove(player, p2) || p2.getMovement().getNextWalkDirection() != -1 || p2.getMovement().teleported() || needsMaskUpdate(p2, context, block.offset())) {
							break;
						}
						skipCount++;
					}
					//System.out.println((nsn0 ? "[NSN0]" : "[NSN1]") + "Skipping: "+skipCount);
					putSkip(buffer, skipCount);
					context.getSlotFlags()[uid] = (byte) (context.getSlotFlags()[uid] | 0x2);
				}
			}
		}
		buffer.setByteAccess();
	}

	private void processOutsidePlayers(Entity player, OutboundBuffer buffer, OutboundBuffer block, Viewport context, boolean nsn2) {
		buffer.setBitAccess();
		int skipCount = 0;
		for (int index = 0; index < context.getOutPlayerIndexCount(); index++) {
			int uid = context.getOutPlayerIndicies()[index];
			if (nsn2 ? (0x1 & context.getSlotFlags()[uid]) == 0 : (0x1 & context.getSlotFlags()[uid]) != 0) {
				continue;
			}
			if (skipCount > 0) {
				skipCount--;
				context.getSlotFlags()[uid] = (byte) (context.getSlotFlags()[uid] | 2);
				continue;
			}
			Player p = World.getInstance().getPlayers().get(uid);
			if (needsAdd(player, p, context)) {
				buffer.putBits(1, 1);
				buffer.putBits(2, 0);
				int hash = p.getCurrentTile().getRegionHash();
				if (hash == context.getRegionHashes()[uid]) {
					buffer.putBits(1, 0);
				} else {
					buffer.putBits(1, 1);
					appendRegionHash(buffer, p, context.getRegionHashes()[uid], hash);
					context.getRegionHashes()[uid] = hash;
				}
				buffer.putBits(6, p.getCurrentTile().getXInRegion());
				buffer.putBits(6, p.getCurrentTile().getYInRegion());
				packUpdateBlock(p, block, context, true);
				buffer.putBits(1, 1);
				context.getLocalPlayers()[uid] = p;
				context.getSlotFlags()[uid] = (byte) (context.getSlotFlags()[uid] | 2);
			} else {
				int hash = p == null ? context.getRegionHashes()[uid] : p.getCurrentTile().getRegionHash();
				if (p != null && hash != context.getRegionHashes()[uid]) {
					buffer.putBits(1, 1);
					appendRegionHash(buffer, p, context.getRegionHashes()[uid], hash);
					context.getRegionHashes()[uid] = hash;
				} else {
					buffer.putBits(1, 0);
					for (int idx = index + 1; idx < context.getOutPlayerIndexCount(); idx++) {
						int p2Index = context.getOutPlayerIndicies()[idx];
						if (nsn2 ? (0x1 & context.getSlotFlags()[p2Index]) == 0 : (0x1 & context.getSlotFlags()[p2Index]) != 0) {
							continue;
						}
						Entity p2 = World.getInstance().getPlayers().get(p2Index);
						if (needsAdd(player, p2, context) || (p2 != null && p2.getCurrentTile().getRegionHash() != context.getRegionHashes()[p2Index])) {
							break;
						}
						skipCount++;
					}
					//System.out.println((nsn2 ? "[NSN2]" : "[NSN3]") + "Skipping: "+skipCount);
					putSkip(buffer, skipCount);
					context.getSlotFlags()[uid] = (byte) (context.getSlotFlags()[uid] | 0x2);
				}
			}
		}
		buffer.setByteAccess();
	}

	private boolean needsRemove(Entity player, Entity p) {
		return p == null || !p.getCurrentTile().withinDistance(player.getCurrentTile(), 14) || !p.exists() || p.getIndex() == -1;
	}

	private boolean needsAdd(Entity player, Entity p, Viewport context) {
		return p != null && p.exists() && p.getCurrentTile().withinDistance(player.getCurrentTile(), 14) && context.getLocalAddedPlayers() < MAX_PLAYER_ADD;
	}

	private void putSkip(OutboundBuffer buffer, int skipCount) {
		buffer.putBits(2, skipCount == 0 ? 0 : skipCount > 255 ? 3 : (skipCount > 31 ? 2 : 1));
		if (skipCount > 0) {
			buffer.putBits(skipCount > 255 ? 11 : (skipCount > 31 ? 8 : 5), skipCount);
		}
	}

	private void packUpdateBlock(Player p, OutboundBuffer block, Viewport context, boolean added) {
		int maskData = 0x0;
		Block appearanceBlock = null;
		Block headIconBlock = null;
		if (needsAppearanceUpdate(p.getIndex(), p.getModel().getHash(), context, block.offset())) {
			appearanceBlock = new AppearenceBlock();
			maskData |= appearanceBlock.getMask(false);
			context.getAppearanceHashes()[p.getIndex()] = p.getModel().getHash();
		}
		if (needHeadIconUpdate(p.getIndex(), p.getHeadIcons().getHash(), context, block.offset())) {
			headIconBlock = new HeadIconBlock();
			maskData |= headIconBlock.getMask(false);
			context.getHeadIconHashes()[p.getIndex()] = p.getHeadIcons().getHash();
		}
		for (int pos = 0; pos < 21; pos++) {
			if (p.getUpdateBlocks()[pos] == null) {
				continue;
			}
			maskData |= p.getUpdateBlocks()[pos].getMask(false);
		}
		if (maskData >= 0x100) {
			maskData |= 0x2;
		}
		if (maskData >= 0x10000) {
			maskData |= 0x8000;
		}
		//System.out.println("Packing update for player "+p.getIndex()+": 0x"+Integer.toHexString(maskData));
		block.putShort(p.getIndex());
		block.putByte(maskData);
		if (maskData >= 0x100) {
			block.putByte(maskData >> 8);
		}
		if (maskData >= 0x10000) {
			block.putByte(maskData >> 16);
		}
		for (int pos = 0; pos < 21; pos++) {
			if (p.getUpdateBlocks()[pos] == null) {
				if (appearanceBlock != null && pos == appearanceBlock.getPosition(false)) {
					appearanceBlock.encodeBlock(block, p);
				} else if (headIconBlock != null && pos == headIconBlock.getPosition(false)) {
					headIconBlock.encodeBlock(block, p);
				}
				continue;
			}
			p.getUpdateBlocks()[pos].encodeBlock(block, p);
		}
	}

	/**
	 * Returns whether or not a mask update needs to be packed for this player
	 * @param p The player to check
	 * @param context The viewport of the current player
	 * @param blockSize The total size of the current update block
	 * @return True if a mask update is needed, false otherwise
	 */
	private boolean needsMaskUpdate (Player p, Viewport context, int blockSize) {
		boolean appearanceUpdate = needsAppearanceUpdate(p.getIndex(), p.getModel().getHash(), context, blockSize);
		boolean headIconUpdate = needHeadIconUpdate(p.getIndex(), p.getHeadIcons().getHash(), context, blockSize);
		return headIconUpdate || appearanceUpdate || p.needsMaskUpdate();
	}

	/**
	 * Checks whether the specified player needs an appearance update
	 * @param index The index of the player to check
	 * @param hash The new hash of the appearance
	 * @param context The viewport
	 * @param blockSize The total mask block size
	 * @return True if an appearance update is needed, false otherwise
	 */
	private boolean needsAppearanceUpdate(int index, byte[] hash, Viewport context, int blockSize) {
		if (blockSize > ((7500 - 500) / 2) || hash == null) {
			return false;
		}
		return context.getAppearanceHashes()[index] == null || !MessageDigest.isEqual(context.getAppearanceHashes()[index], hash);
	}

	private boolean needHeadIconUpdate(int index, byte[] hash, Viewport context, int blockSize) {
		if (blockSize > ((7500 - 500) / 2) || hash == null) {
			return false;
		}
		return context.getHeadIconHashes()[index] == null || !MessageDigest.isEqual(context.getHeadIconHashes()[index], hash);
	}

	private void appendRegionHash(OutboundBuffer buffer, Entity p, int lastRegionHash, int currentRegionHash) {
		int lastRegionX = (lastRegionHash >> 8) & 0xff;
		int lastRegionY = 0xff & lastRegionHash;
		int lastPlane = (lastRegionHash >> 16) & 0x3;
		int currentRegionX = (currentRegionHash >> 8) & 0xff;
		int currentRegionY = 0xff & currentRegionHash;
		int currentPlane = (currentRegionHash >> 16) & 0x3;
		int planeOffset = currentPlane - lastPlane;
		if (lastRegionX == currentRegionX && lastRegionY == currentRegionY) {
			buffer.putBits(2, 1);
			buffer.putBits(2, (planeOffset & 0x3));
		} else if (Math.abs(currentRegionX - lastRegionX) <= 1 && Math.abs(currentRegionY - lastRegionY) <= 1) {
			int opcode;
			int dx = currentRegionX - lastRegionX;
			int dy = currentRegionY - lastRegionY;
			if (dx == -1 && dy == -1) {
				opcode = 0;
			} else if (dx == 1 && dy == -1) {
				opcode = 2;
			} else if (dx == -1 && dy == 1) {
				opcode = 5;
			} else if (dx == 1 && dy == 1) {
				opcode = 7;
			} else if (dy == -1) {
				opcode = 1;
			} else if (dx == -1) {
				opcode = 3;
			} else if (dx == 1) {
				opcode = 4;
			} else if (dy == 1) {
				opcode = 6;
			} else {
				throw new RuntimeException("Invalid delta value for region hash!");
			}
			buffer.putBits(2, 2);
			buffer.putBits(5, ((planeOffset & 0x3) << 3) + (opcode & 0x7));
		} else {
			int xOffset = currentRegionX - lastRegionX;
			int yOffset = currentRegionY - lastRegionY;
			buffer.putBits(2, 3);
			buffer.putBits(20, (yOffset & 0xff) + ((xOffset & 0xff) << 8) + ((planeOffset & 0x3) << 16) + ((p.getMovement().getMoveSpeed().getId() + 1) << 18));
		}
	}

}
