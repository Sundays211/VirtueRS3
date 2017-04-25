/**
 * Copyright (c) 2016 Virtue Studios
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
package org.virtue.game.content.clans;

import java.util.LinkedList;
import java.util.Queue;

import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * Represents a set of updates to a clan channel
 *
 * @author Sundays211
 * @since 04/03/2016
 */
public class ClanChannelDelta {
	
	public abstract class DeltaEntry {
		public abstract void encode (OutboundBuffer buffer);
		
		public abstract int getId ();
	}
	
	public class AddUser extends DeltaEntry {
		private long userHash;
		private String displayName;
		private byte rank;
		private int nodeID;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			if (useUserHashes) {
				buffer.putLong(userHash);
			} else {
				buffer.putByte(255);//Don't use user hashes
			}			
			buffer.putString(displayName);
			buffer.putShort(nodeID);
			buffer.putByte(rank);
			buffer.putLong(0L);//Currently unused
		}
		@Override
		public int getId() {
			return 1;
		}	
	}
	
	public class UpdateUserDetailsV1 extends DeltaEntry {
		private String displayName;
		private int nodeID;
		private byte rank;
		private int slot = -1;

		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putShort(slot);
			buffer.putByte(rank);
			buffer.putShort(nodeID);
			buffer.putLong(0L);//Not sure what this is for
			buffer.putString(displayName);
		}

		@Override
		public int getId() {
			return 2;
		}		
	}
	
	public class DeleteUser extends DeltaEntry {
		private int slot = -1;
		private long userHash;

		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putShort(slot);
			buffer.putByte(0);
			if (useUserHashes) {
				buffer.putLong(userHash);
			} else {
				buffer.putByte(255);
			}			
		}

		@Override
		public int getId() {
			return 3;
		}		
	}
	
	public class UpdateBaseSettings extends DeltaEntry {
		private String name;
		private boolean allowUnaffined;
		private byte rankTalk;
		private byte rankKick;

		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putString(name);
			buffer.putByte(allowUnaffined ? 1 : 0);
			buffer.putByte(rankTalk);
			buffer.putByte(rankKick);
		}

		@Override
		public int getId() {
			return 4;
		}
		
	}
	
	public class UpdateUserDetailsV2 extends DeltaEntry {
		private String displayName;
		private byte rank;
		private int nodeID;
		private int slot = -1;

		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putByte(0);
			buffer.putShort(slot);
			buffer.putByte(rank);
			buffer.putShort(nodeID);
			buffer.putLong(0L);
			buffer.putString(displayName);
			buffer.putByte(0);
		}

		@Override
		public int getId() {
			return 5;
		}
		
	}
	
	private final long clanhash;
	private final long updatenum;
	
	private boolean useUserHashes;
	
	private Queue<DeltaEntry> updates = new LinkedList<DeltaEntry>();

	public ClanChannelDelta(long clanhash, long updatenum, boolean useUserHashes) {
		this.clanhash = clanhash;
		this.updatenum = updatenum;
		this.useUserHashes = useUserHashes;
	}
	
	protected void addUser (ClanChannelUser user) {
		AddUser entry = new AddUser();
		entry.userHash = user.userHash;
		entry.displayName = user.displayName;
		entry.nodeID = user.nodeID;
		entry.rank = user.rank;
		addDelta(entry);		
	}
	
	protected void deleteUser (int slot, long userhash) {
		DeleteUser entry = new DeleteUser();
		entry.slot = slot;
		entry.userHash = userhash;
		addDelta(entry);
	}
	
	protected void updateUser (ClanChannelUser user, int slot) {
		UpdateUserDetailsV2 entry = new UpdateUserDetailsV2();
		entry.slot = slot;
		entry.displayName = user.displayName;
		entry.nodeID = user.nodeID;
		entry.rank = user.rank;
		addDelta(entry);
	}
	
	protected void updateBaseSettings (String name, boolean allowUnaffined, byte rankTalk, byte rankKick) {
		UpdateBaseSettings entry = new UpdateBaseSettings();
		entry.name = name;
		entry.allowUnaffined = allowUnaffined;
		entry.rankTalk = rankTalk;
		entry.rankKick = rankKick;
		addDelta(entry);		
	}
	
	private void addDelta (DeltaEntry entry) {
		synchronized (updates) {
			updates.offer(entry);
		}
	}
	
	public void encode (OutboundBuffer buffer) {
		buffer.putLong(clanhash);
		buffer.putLong(updatenum);
		for (DeltaEntry delta : updates) {
			buffer.putByte(delta.getId());
			delta.encode(buffer);
		}
		buffer.putByte(0);//End delta
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (clanhash ^ (clanhash >>> 32));
		result = prime * result + (int) (updatenum ^ (updatenum >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		ClanChannelDelta other = (ClanChannelDelta) obj;
		if (clanhash != other.clanhash) {
			return false;
		}
		if (updatenum != other.updatenum) {
			return false;
		}
		return true;
	}
}
