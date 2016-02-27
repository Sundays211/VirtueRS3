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

public enum BlockType {
	/**
	 * Sends player appearance and other data
	 */
	APPEARANCE(0x10, 17),
	
	/**
	 * Runs the given animation on an npc or player
	 */
	ANIMATION(0x40, 0, 0x2, 16),
	
	/**
	 * Specifies whether the player is in the same clan as the active player
	 */
	CLAN(0x400000, 1),
	
	/**
	 * Turns the entity to face the specified direction
	 */
	SET_FACING(0x1, 3, 0, -1),
	
	/**
	 * Requests the entity follows the specified entity
	 */
	FACE_ENTITY(0x20, 7, 0x80, 15),
	
	/**
	 * Forces the entity to move in the given sequence
	 */
	MOVE(0x80, 5, 0, -1),
	
	/**
	 * Forces the player to say the given message.
	 */
	FORCE_SAY(0x20000, 2),
	
	/**
	 * Forces the entity to say the given message. Generally used in quest situations.
	 */
	SAY(0x1000, 9, 0, -1),
	
	GLOW(0x200000, 18, 0, -1),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the first slot
	 */
	SPOT_1(0x4, 13, 0, -1),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the second slot
	 */
	SPOT_2(0x200, 11, 0, -1),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the third slot
	 */
	SPOT_3(0x100, 14, 0, -1),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the fourth slot
	 */
	SPOT_4(0x10000, 20, 0, -1),
	
	/**
	 * Attaches the specified spot (aka "graphic") to the entity in the fifth slot
	 */
	SPOT_5(0x800000, 6, 0, -1),
	
	/**
	 * Displays the specified icons above the entity
	 */
	HEADICONS(0x2000, 15, 0, -1),
	
	/**
	 * Displays the specified hitmarks above the entity
	 */
	HITMARKS(0x8, 19, 0x40, 13),
	NPCTYPE(0, -1, 0, -1);
	
	private int playerMask;
	private int playerPos;
	
	private int npcMask;
	private int npcPos;
	
	BlockType (int playerMask, int playerPos) {
		this(playerMask, playerPos, 0, -1);
	}
	
	BlockType (int playerMask, int playerPos, int npcMask, int npcPos) {
		this.playerMask = playerMask;
		this.playerPos = playerPos;
		this.npcMask = npcMask;
		this.npcPos = npcPos;
	}

	public int getPlayerMask() {
		return playerMask;
	}

	public int getPlayerPos() {
		return playerPos;
	}

	public int getNpcMask() {
		return npcMask;
	}

	public int getNpcPos() {
		return npcPos;
	}
}
