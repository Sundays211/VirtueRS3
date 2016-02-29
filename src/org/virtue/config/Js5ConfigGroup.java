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
package org.virtue.config;

/**
 * 
 * @author Sundays211
 * @since Oct 21, 2014
 */
public enum Js5ConfigGroup {
	FLOTYPE(1),
    GROUP_2(2),
	IDKTYPE(3),
	FLUTYPE(4),
	INVTYPE(5),
	LOCTYPE(6, 8),
	GROUP_7(7),
	ENUMTYPE(8, 8),
	NPCTYPE(9, 7),
	ITEMTYPE(10, 8),
	PARAMTYPE(11),
	SEQTYPE(12, 7),
	SPOTTYPE(13, 8),
	GROUP_14(14, 10),
	GROUP_15(15),
	GROUP_16(16),
	GROUP_17(17),
	AREATYPE(18),
	GROUP_19(19),
	GROUP_20(20),
	GROUP_21(21),
	GROUP_22(22),
	GROUP_23(23),
	GROUP_24(24),
	GROUP_25(25),
	STRUCTTYPE(26, 5),
	CHATPHRASETYPE(27),
	CHATCATTYPE(28),
	SKYBOXTYPE(29),
	GROUP_30(30),
	LIGHTTYPE(31),
	BASTYPE(32),
	CURSORTYPE(33),
	MSITYPE(34),
	QUESTTYPE(35),
	MELTYPE(36),
	GROUP_37(37),
	GROUP_38(38),
	GROUP_39(39),
	DBTABLETYPE(40),
	DBROWTYPE(41),
	GROUP_42(42),
	GROUP_43(43),
	GROUP_44(44),
	GROUP_45(45),
	HITMARKTYPE(46),
	GROUP_47(47),
	ITEMCODETYPE(48),
	CATEGORYTYPE(49),
	GROUP_50(50),
	GROUP_51(51),
	GROUP_53(53),
	GROUP_54(54),
	VAR_PLAYER(60),
	VAR_NPC(61),
	VAR_CLIENT(62),
	VAR_WORLD(63),
	VAR_REGION(64),
	VAR_OBJECT(65),
	VAR_CLAN(66),
	VAR_CLAN_SETTING(67),
	GROUP_68(68),
	VAR_BIT(69),
	GAMELOGEVENT(70),
	HEADBARTYPE(72),
	GROUP_73(73),
	GROUP_74(74),
	GROUP_75(75),
	WATERTYPE(76),
	SEQGROUPTYPE(77),
	GROUP_78(78),
	GROUP_79(79),
	VAR_PLAYER_GROUP(80);
    
    public final int id;
    int groupSizeInBits;
    
    Js5ConfigGroup(int i) {
    	this(i, 0);
    }
    
    Js5ConfigGroup(int id, int size) {
		this.id = id;
		this.groupSizeInBits = size;
    }
    
    public int getClientGroupId(int i) {
    	return i >>> groupSizeInBits;
    }
    
    public int getClientFileId(int i) {
    	return i & (1 << groupSizeInBits) - 1;
    }
    
    public int getGroupSize() {
    	return 1 << groupSizeInBits;
    }
}
