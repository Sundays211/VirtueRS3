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

import org.virtue.config.vartype.bit.VarBitType;
import org.virtue.network.event.buffer.OutboundBuffer;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 13/03/2016
 */
public class ClanSettingsDelta {
	
	public abstract class DeltaEntry {
		public abstract void encode (OutboundBuffer buffer);
		
		public abstract int getId ();
	}
	
	public class AddMemberV1 extends DeltaEntry {
		private long userHash;
		private String displayName;

		@Override
		public void encode(OutboundBuffer buffer) {
			if (useUserHashes) {
				buffer.putLong(userHash);
			} else {
				buffer.putByte(255);
			}
			buffer.putString(displayName);
		}

		@Override
		public int getId() {
			return 1;
		}		
	}
	
	public class SetMemberRank extends DeltaEntry {
		private int slot;
		private byte rank;

		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putShort(slot);
			buffer.putByte(rank);
		}

		@Override
		public int getId() {
			return 2;
		}		
	}
	
	public class AddBanned extends DeltaEntry {
		private long userHash;
		private String displayName;

		@Override
		public void encode(OutboundBuffer buffer) {
			if (useUserHashes) {
				buffer.putLong(userHash);
			} else {
				buffer.putByte(255);
			}
			buffer.putString(displayName);
		}

		@Override
		public int getId() {
			return 3;
		}
	}
	
	public class UpdateBaseSettings extends DeltaEntry {
		boolean allowUnaffined;
		byte rankTalk;
		byte rankKick;
		byte rankLootShare;
		byte coinShare;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putByte(allowUnaffined ? 1 : 0);
			buffer.putByte(rankTalk);
			buffer.putByte(rankKick);
			buffer.putByte(rankLootShare);
			buffer.putByte(coinShare);
		}

		@Override
		public int getId() {
			return 4;
		}
	}
	
	public class DeleteMember extends DeltaEntry {
		private int slot;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putShort(slot);
		}

		@Override
		public int getId() {
			return 5;
		}
	}
	
	public class DeleteBanned extends DeltaEntry {
		private int slot;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putShort(slot);
		}

		@Override
		public int getId() {
			return 6;
		}
	}
	
	public class SetMemberExtraInfo extends DeltaEntry {
		private int slot;
		private int value;
		private int startBit;
		private int endBit;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putShort(slot);
			buffer.putInt(value);
			buffer.putByte(startBit);
			buffer.putByte(endBit);
		}

		@Override
		public int getId() {
			return 7;
		}
	}
	
	public class SetExtraSettingInt extends DeltaEntry {
		private int key;
		private int value;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putInt(key);
			buffer.putInt(value);
		}

		@Override
		public int getId() {
			return 8;
		}
	}
	
	public class SetExtraSettingLong extends DeltaEntry {
		private int key;
		private long value;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putInt(key);
			buffer.putLong(value);
		}

		@Override
		public int getId() {
			return 9;
		}
	}
	
	public class SetExtraSettingString extends DeltaEntry {
		private int key;
		private String value;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putInt(key);
			buffer.putString(value);
		}

		@Override
		public int getId() {
			return 10;
		}
	}
	
	public class SetExtraSettingVarbit extends DeltaEntry {
		private int key;
		private int value;
		private int startBit;
		private int endBit;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putInt(key);
			buffer.putInt(value);
			buffer.putByte(startBit);
			buffer.putByte(endBit);
		}

		@Override
		public int getId() {
			return 11;
		}
	}
	
	public class SetClanName extends DeltaEntry {
		private String name;
		private int changeDate;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putString(name);
			buffer.putInt(changeDate);//Not sure what this is supposed to be
		}

		@Override
		public int getId() {
			return 12;
		}
	}
	
	public class AddMemberV2 extends DeltaEntry {
		private long userHash;
		private String displayName;
		private int joinRuneday;

		@Override
		public void encode(OutboundBuffer buffer) {
			if (useUserHashes) {
				buffer.putLong(userHash);
			} else {
				buffer.putByte(255);
			}
			buffer.putString(displayName);
			buffer.putShort(joinRuneday);
		}

		@Override
		public int getId() {
			return 13;
		}		
	}
	
	public class SetMemberMuted extends DeltaEntry {
		private int slot;
		private boolean muted;
		
		@Override
		public void encode(OutboundBuffer buffer) {
			buffer.putShort(slot);
			buffer.putByte(muted ? 1 : 0);
		}

		@Override
		public int getId() {
			return 14;
		}
	}

	private final long clanhash;
	private final int updatenum;
	
	private boolean useUserHashes;
	
	private Queue<DeltaEntry> updates = new LinkedList<DeltaEntry>();
	
	public ClanSettingsDelta(long clanhash, int updatenum, boolean useUserHashes) {
		this.clanhash = clanhash;
		this.updatenum = updatenum;
		this.useUserHashes = useUserHashes;
	}
	
	protected void addMember (long userhash, String displayName, int joinRuneday) {
		AddMemberV2 entry = new AddMemberV2();
		entry.userHash = userhash;
		entry.displayName = displayName;
		entry.joinRuneday = joinRuneday;
		addDelta(entry);
	}
	
	protected void setMemberRank (int slot, byte rank) {
		SetMemberRank entry = new SetMemberRank();
		entry.slot = slot;
		entry.rank = rank;
		addDelta(entry);
	}
	
	protected void addBanned (long userhash, String displayName) {
		AddBanned entry = new AddBanned();
		entry.userHash = userhash;
		entry.displayName = displayName;
		addDelta(entry);
	}
	
	protected void updateBaseSettings (boolean allowUnaffined, byte rankTalk, byte rankKick, byte rankLootShare, byte coinShare) {
		UpdateBaseSettings entry = new UpdateBaseSettings();
		entry.allowUnaffined = allowUnaffined;
		entry.rankTalk = rankTalk;
		entry.rankKick = rankKick;
		entry.rankLootShare = rankLootShare;
		entry.coinShare = coinShare;
		addDelta(entry);
	}
	
	protected void deleteMember (int slot) {
		DeleteMember entry = new DeleteMember();
		entry.slot = slot;
		addDelta(entry);
	}
	
	protected void deleteBanned (int slot) {
		DeleteBanned entry = new DeleteBanned();
		entry.slot = slot;
		addDelta(entry);
	}
	
	protected void setMemberExtraInfo (int slot, int value, int startBit, int endBit) {
		SetMemberExtraInfo entry = new SetMemberExtraInfo();
		entry.slot = slot;
		entry.value = value;
		entry.startBit = startBit;
		entry.endBit = endBit;
		addDelta(entry);
	}
	
	protected void setExtraSettingInt (int key, int value) {
		SetExtraSettingInt entry = new SetExtraSettingInt();
		entry.key = key;
		entry.value = value;
		addDelta(entry);
	}
	
	protected void setExtraSettingLong (int key, long value) {
		SetExtraSettingLong entry = new SetExtraSettingLong();
		entry.key = key;
		entry.value = value;
		addDelta(entry);
	}
	
	protected void setExtraSettingString (int key, String value) {
		SetExtraSettingString entry = new SetExtraSettingString();
		entry.key = key;
		entry.value = value;
		addDelta(entry);
	}
	
	protected void setExtraSettingVarbit (VarBitType key, int value) {
		SetExtraSettingVarbit entry = new SetExtraSettingVarbit();
		entry.key = key.baseVarKey;
		entry.value = value;
		entry.startBit = key.getStartBit();
		entry.endBit = key.getEndBit();
		addDelta(entry);
	}
	
	protected void setClanName (String name, int dateChanged) {
		SetClanName entry = new SetClanName();
		entry.name = name;
		entry.changeDate = dateChanged;
		addDelta(entry);		
	}
	
	private void addDelta (DeltaEntry entry) {
		synchronized (updates) {
			updates.offer(entry);
		}
	}
	
	public void encode (OutboundBuffer buffer) {
		buffer.putLong(0L);//owner (doesn't seem to be used)
		buffer.putInt(updatenum);
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
		result = prime * result + updatenum;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ClanSettingsDelta other = (ClanSettingsDelta) obj;
		if (clanhash != other.clanhash)
			return false;
		if (updatenum != other.updatenum)
			return false;
		return true;
	}
}
