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
package org.virtue.game.content.friends;

import org.virtue.game.content.friendchats.ChannelRank;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 12, 2014
 */
public class Friend {

	/**
	 * Represents the username of the {@code Friend}.
	 */
	private final long userhash;

	/**
	 * Represents the display name of the {@code Friend}.
	 */
	private String displayName;
	
	/**
	 * Represents the previous display name of the {@code Friend}
	 */
	private String prevName;
	
	/**
	 * Represents the rank this friend holds within the player's friend chat channel
	 */
	private ChannelRank rank = ChannelRank.FRIEND;
	
	/**
	 * Represents the note associated with this {@code Friend}.
	 */
	private String note = "";
	
	/**
	 * Represents the world the player is currently on, or 0 if the player is offline
	 */
	private int nodeID;

	/**
	 * Constructs a new {@code Friend}.
	 */
	public Friend(long userhash) {
		this.userhash = userhash;
	}

	/**
	 * Constructs a new {@code Friend}.
	 */
	public Friend(long userhash, ChannelRank rank, String note) {
		this.userhash = userhash;
		this.rank = rank;
		this.note = note;
	}
	
	/**
	 * Sets the current and previous names for this friend
	 * @param display The current display name
	 * @param prev The previous display name
	 */
	protected void setNames (String display, String prev) {
		this.displayName = display;
		this.prevName = prev;
	}
	
	/**
	 * Gets the {@code Friend} user hash
	 * @return The user hash
	 */
	public long getHash () {
		return userhash;
	}

	/**
	 * Gets the {@code Friend} display name.
	 * @return the displayName
	 */
	public String getDisplayName() {
		return displayName;
	}

	/**
	 * Gets the {@code Friend} previous display name.
	 * @return the previous name
	 */
	public String getPrevName() {
		return prevName;
	}
	
	/**
	 * Gets the nodeID of the world the player is currently on
	 * @return The nodeID, or 0 if the player is offline
	 */
	public int getNodeID () {
		return nodeID;
	}
	
	/**
	 * Finds whether the friend is in a world
	 * @return True if the friend is in a world, false if they are in a lobby or offline
	 */
	public boolean inWorld () {
		return nodeID < 1100 && nodeID > 0; 
	}
	
	/**
	 * Gets the name of the world the player is currently on. 
	 * If the nodeID is greater than 1100, the player is in the lobby. Otherwise, the player is in a world
	 * @return The world name
	 */
	public String getWorldName () {
		return nodeID >= 1100 ? "Lobby "+(nodeID-1099) : "World "+nodeID; 
	}
	
	/**
	 * Gets the {@code Friend} rank
	 * @return The rank
	 */
	public ChannelRank getRank () {
		return rank;
	}
	
	/**
	 * Gets the {@code Friend} note.
	 * @return the note
	 */
	public String getNote () {
		return note;
	}
	
	/**
	 * Sets the {@code Friend} note.
	 * @param note The note
	 */
	protected void setNote (String note) {
		this.note = note;
	}
	
	/**
	 * Sets the nodeID for the friend. 0 means offline, 1-199 means normal world, 1101+ means lobby
	 * @param nodeID
	 */
	protected void setWorld (int nodeID) {
		this.nodeID = nodeID;
	}
	
	/**
	 * Sets the rank of the friend within the player's friend chat channel
	 * @param rank The rank to set
	 */
	protected void setRank (ChannelRank rank) {
		this.rank = rank;
	}
}
