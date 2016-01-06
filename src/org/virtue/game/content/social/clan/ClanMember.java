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
package org.virtue.game.content.social.clan;

import org.virtue.Virtue;
import org.virtue.config.vartype.bit.VarBitOverflowException;

/**
 * Represents the data for a member of a clan
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 21/12/2014
 */
public class ClanMember {
	
	public static enum VarClanMember {
		JOB(0, 9),
		CITADEL_BANNED(11),
		KEEP_BANNED(12),
		ISLAND_BANNED(13),
		PROBATION(14, 15);
		
		VarClanMember(int bit) {
			this(bit, bit);
		}
		
		private final int startBit;
		private final int endBit;
		private final int maxValue;
		
		VarClanMember(int startBit, int endBit) {
			this.startBit = startBit;
			this.endBit = endBit;
			this.maxValue = (1 << Math.abs(startBit-endBit)+1) - 1;
		}
		
		public int getStartBit () {
			return startBit;
		}
		
		public int getEndBit () {
			return endBit;
		}
		
		public int getMaxValue () {
			return maxValue;
		}
	}
	
	//0, 1, 2, 4, 8, f
	public static final int FLAG_CITADEL_BANNED = 0x2;
	public static final int FLAG_KEEP_BANNED = 0x2;
	public static final int FLAG_ISLAND_BANNED = 0x2;
	public static final int FLAG_PROBATION_START = 0x4000;
	public static final int FLAG_PROBATION_END = 0x8000;
	
	private final long userhash;
	
	private String displayName;
	
	private ClanRank rank;
	
	private int varClanMember;
	
	private final int joinDay;
	
	public ClanMember (long userhash) {
		this(userhash, ClanRank.RECRUIT, 0, Virtue.getInstance().getServerDay());
	}
	
	public ClanMember (long userhash, ClanRank rank, int varClanMember, int joinDay) {
		this.userhash = userhash;
		this.rank = rank;
		this.varClanMember = varClanMember;
		this.joinDay = joinDay;
	}
	
	protected void setDisplayName (String name) {
		this.displayName = name;
	}
	
	public long getUserHash () {
		return userhash;
	}
	
	public String getDisplayName () {
		return displayName;
	}
	
	public ClanRank getRank () {
		return rank;
	}
	
	public int getVarValue () {
		return varClanMember;
	}
	
	protected void setVarMemberBit (VarClanMember type, int value) throws VarBitOverflowException {
		if (value > type.getMaxValue() || value < 0) {
			throw new VarBitOverflowException(type.name(), value, type.getMaxValue());
		}
		setVarMemberBit(value, type.getStartBit(), type.getEndBit());
	}
	
	protected void setVarMemberBit (int value, int startBit, int endBit) throws VarBitOverflowException {
		if (value > ((1 << Math.abs(startBit-endBit)+1) - 1) || value < 0) {
			throw new VarBitOverflowException("", value, (1 << Math.abs(startBit-endBit)+1) - 1);
		}
		int i_4_ = (1 << startBit) - 1;
		int i_5_ = endBit == 31 ? -1 : (1 << 1 + endBit) - 1;
		int mask = i_5_ ^ i_4_;
		value <<= startBit;
		value &= mask;
		varClanMember &= mask ^ 0xffffffff;
		varClanMember |= value;
	}
	
	public int getVarBitValue (VarClanMember type) {
		return getVarBitValue(type.getStartBit(), type.getEndBit());
	}
	
	public int getVarBitValue (int startBit, int endBit) {
		int mask = (endBit == 31) ? -1 : (1 << 1 + endBit) - 1;
		return (varClanMember & mask) >>> startBit;
	}
	
	public int getJoinDay () {
		return joinDay;
	}
	
	/**
	 * Sets the rank of the clan member. Note that no checks are performed within this method, so it should be used with care.
	 * @param desiredRank	The rank to set
	 */
	protected void setRank (ClanRank desiredRank) {
		this.rank = desiredRank;
	}
}
