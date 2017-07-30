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
package org.virtue.config.vartype.constants;

import org.virtue.config.util.TextConvert;

/**
 * 
 * @author Sundays211
 * @since 12/12/2015
 */
public enum ScriptVarType {
	INT(0, 'i', BaseVarType.INTEGER, Integer.valueOf(0)),
	BOOLEAN(1, '1', BaseVarType.INTEGER, Integer.valueOf(0)),
	TYPE_2(2, '2', BaseVarType.INTEGER, Integer.valueOf(-1)),
	QUEST(3, ':', BaseVarType.INTEGER, Integer.valueOf(-1)),
	QUESTHELP(4, ',', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CURSOR(5, '@', BaseVarType.INTEGER, Integer.valueOf(-1)),
	SEQ(6, 'A', BaseVarType.INTEGER, Integer.valueOf(-1)),
	COLOUR(7, 'C', BaseVarType.INTEGER, Integer.valueOf(-1)),
	LOC_SHAPE(8, 'H', BaseVarType.INTEGER, Integer.valueOf(-1)),
	COMPONENT(9, 'I', BaseVarType.INTEGER, Integer.valueOf(-1)),
	IDKIT(10, 'K', BaseVarType.INTEGER, Integer.valueOf(-1)),
	MIDI(11, 'M', BaseVarType.INTEGER, Integer.valueOf(-1)),
	NPC_MODE(12, 'N', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_13(13, 'O', BaseVarType.INTEGER, Integer.valueOf(-1)),
	SYNTH(14, 'P', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_15(15, 'Q', BaseVarType.INTEGER, Integer.valueOf(-1)),
	AREA(16, 'R', BaseVarType.INTEGER, Integer.valueOf(-1)),
	STAT(17, 'S', BaseVarType.INTEGER, Integer.valueOf(-1)),
	NPC_STAT(18, 'T', BaseVarType.INTEGER, Integer.valueOf(-1)),
	WRITEINV(19, 'V', BaseVarType.INTEGER, Integer.valueOf(-1)),
	MESH(20, '^', BaseVarType.INTEGER, Integer.valueOf(-1)),
	MAPAREA(21, '`', BaseVarType.INTEGER, Integer.valueOf(-1)),
	COORDGRID(22, 'c', BaseVarType.INTEGER, Integer.valueOf(-1)),
	GRAPHIC(23, 'd', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CHATPHRASE(24, 'e', BaseVarType.INTEGER, Integer.valueOf(-1)),
	FONTMETRICS(25, 'f', BaseVarType.INTEGER, Integer.valueOf(-1)),
	ENUM(26, 'g', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_27(27, 'h', BaseVarType.INTEGER, Integer.valueOf(-1)),
	JINGLE(28, 'j', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CHATCAT(29, 'k', BaseVarType.INTEGER, Integer.valueOf(-1)),
	LOC(30, 'l', BaseVarType.INTEGER, Integer.valueOf(-1)),
	MODEL(31, 'm', BaseVarType.INTEGER, Integer.valueOf(-1)),
	NPC(32, 'n', BaseVarType.INTEGER, Integer.valueOf(-1)),
	OBJ(33, 'o', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PLAYER_UID(34, 'p', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_35(35, 'r', BaseVarType.LONG, Long.valueOf(-1L)),
	STRING(36, 's', BaseVarType.STRING, ""),
	SPOTANIM(37, 't', BaseVarType.INTEGER, Integer.valueOf(-1)),
	NPC_UID(38, 'u', BaseVarType.INTEGER, Integer.valueOf(-1)),
	INV(39, 'v', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TEXTURE(40, 'x', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CATEGORY(41, 'y', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CHAR(42, 'z', BaseVarType.INTEGER, Integer.valueOf(-1)),
	LASER(43, '|', BaseVarType.INTEGER, Integer.valueOf(-1)),
	BAS(44,'\u20ac', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_45(45, '\u0192', BaseVarType.INTEGER, Integer.valueOf(-1)),
	COLLISION_GEOMETRY(46, '\u2021', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PHYSICS_MODEL(47, '\u2030', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PHYSICS_CONTROL_MODIFIER(48, '\u0160', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CLANHASH(49, '\u0152', BaseVarType.LONG, Long.valueOf(-1L)),
	//COORDFINE(50, '\u017d', BaseVarType.COORDFINE, new CoordFine()),
	CUTSCENE(51, '\u0161', BaseVarType.INTEGER, Integer.valueOf(-1)),
	ITEMCODE(53, '\u00a1', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_54(54, '\u00a2', BaseVarType.INTEGER, Integer.valueOf(-1)),
	MAPSCENEICON(55, '\u00a3', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CLANFORUMQFC(56, '\u00a7', BaseVarType.LONG, Long.valueOf(-1L)),
	VORBIS(57, '\u00ab', BaseVarType.INTEGER, Integer.valueOf(-1)),
	VERIFY_OBJECT(58, '\u00ae', BaseVarType.INTEGER, Integer.valueOf(-1)),
	MAPELEMENT(59, '\u00b5', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CATEGORYTYPE(60, '\u00b6', BaseVarType.INTEGER, Integer.valueOf(-1)),
	SOCIAL_NETWORK(61, '\u00c6', BaseVarType.INTEGER, Integer.valueOf(-1)),
	HITMARK(62, '\u00d7', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PACKAGE(63, '\u00de', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PARTICLE_EFFECTOR(64, '\u00e1', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_65(65, '\u00e6', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PARTICLE_EMITTER(66, '\u00e9', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PLOGTYPE(67, '\u00ed', BaseVarType.INTEGER, Integer.valueOf(-1)),
	UNSIGNED_INT(68, '\u00ee', BaseVarType.INTEGER, Integer.valueOf(-1)),
	SKYBOX(69, '\u00f3', BaseVarType.INTEGER, Integer.valueOf(-1)),
	SKYDECOR(70, '\u00fa', BaseVarType.INTEGER, Integer.valueOf(-1)),
	HASH64(71, '\u00fb', BaseVarType.LONG, Long.valueOf(-1L)),
	INPUTTYPE(72, '\u00ce', BaseVarType.INTEGER, Integer.valueOf(-1)),
	STRUCT(73, 'J', BaseVarType.INTEGER, Integer.valueOf(-1)),
	DBROW(74, '\u00d0', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_75(75, '\u00a4', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_76(76, '\u00a5', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_77(77, '\u00e8', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_78(78, '\u00b9', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_79(79, '\u00b0', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_80(80, '\u00ec', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_81(81, '\u00eb', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_83(83, '\u00fe', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_84(84, '\u00fd', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_85(85, '\u00ff', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_86(86, '\u00f5', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_87(87, '\u00f4', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_88(88, '\u00f6', BaseVarType.INTEGER, Integer.valueOf(-1)),
	GWC_PLATFORM(89, '\u00f2', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_90(90, '\u00dc', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_91(91, '\u00f9', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_92(92, '\u00ef', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_93(93, '\u00af', BaseVarType.INTEGER, Integer.valueOf(-1)),
	BUG_TEMPLATE(94, '\u00ea', BaseVarType.INTEGER, Integer.valueOf(-1)),
	BILLING_AUTH_FLAG(95, '\u00f0', BaseVarType.INTEGER, Integer.valueOf(-1)),
	ACCOUNT_FEATURE_FLAG(96, '\u00e5', BaseVarType.INTEGER, Integer.valueOf(-1)),
	INTERFACE(97, 'a', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TOPLEVELINTERFACE(98, 'F', BaseVarType.INTEGER, Integer.valueOf(-1)),
	OVERLAYINTERFACE(99, 'L', BaseVarType.INTEGER, Integer.valueOf(-1)),
	CLIENTINTERFACE(100, '\u00a9', BaseVarType.INTEGER, Integer.valueOf(-1)),
	MOVESPEED(101, '\u00dd', BaseVarType.INTEGER, Integer.valueOf(-1)),
	MATERIAL(102, '\u00ac', BaseVarType.INTEGER, Integer.valueOf(-1)),
	SEQGROUP(103, '\u00f8', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TEMP_HISCORE(104, '\u00e4', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TEMP_HISCORE_LENGTH_TYPE(105, '\u00e3', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TEMP_HISCORE_DISPLAY_TYPE(106, '\u00e2', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TEMP_HISCORE_CONTRIBUTE_RESULT(107, '\u00e0', BaseVarType.INTEGER, Integer.valueOf(-1)),
	AUDIOGROUP(108, '\u00c0', BaseVarType.INTEGER, Integer.valueOf(-1)),
	AUDIOMIXBUSS(109, '\u00d2', BaseVarType.INTEGER, Integer.valueOf(-1)),
	LONG(110, '\u00cf', BaseVarType.LONG, Long.valueOf(0L)),
	CRM_CHANNEL(111, '\u00cc', BaseVarType.INTEGER, Integer.valueOf(-1)),
	HTTP_IMAGE(112, '\u00c9', BaseVarType.INTEGER, Integer.valueOf(-1)),
	POP_UP_DISPLAY_BEHAVIOUR(113, '\u00ca', BaseVarType.INTEGER, Integer.valueOf(-1)),
	POLL(114, '\u00f7', BaseVarType.INTEGER, Integer.valueOf(-1)),
	TYPE_115(115, '\u00bc', BaseVarType.LONG, Long.valueOf(-1L)),
	TYPE_116(116, '\u00bd', BaseVarType.LONG, Long.valueOf(-1L)),
	POINTLIGHT(117, '\u2022', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PLAYER_GROUP(118, '\u00c2', BaseVarType.LONG, Long.valueOf(-1L)),
	PLAYER_GROUP_STATUS(119, '\u00c3', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PLAYER_GROUP_INVITE_RESULT(120, '\u00c5', BaseVarType.INTEGER, Integer.valueOf(-1)),
	PLAYER_GROUP_MODIFY_RESULT(121, '\u00cb', BaseVarType.INTEGER, -1),
	PLAYER_GROUP_JOIN_OR_CREATE_RESULT(122, '\u00cd', BaseVarType.INTEGER, -1),
	PLAYER_GROUP_AFFINITY_MODIFY_RESULT(123, '\u00d5', BaseVarType.INTEGER, -1),
	PLAYER_GROUP_DELTA_TYPE(124, '\u00b2', BaseVarType.INTEGER, -1),
	CLIENT_TYPE(125, '\u00aa', BaseVarType.INTEGER, -1),
	TELEMETRY_INTERVAL(126, '\0', BaseVarType.INTEGER, 0);


    public char legacyChar;
	private int serialID;
	private BaseVarType baseType;
	private Object defaultValue;
    static ScriptVarType[] varByLegacyChar;
	
	ScriptVarType(int id, char c, BaseVarType varBase, Object defaultVal) {
		this.serialID = id;
		this.legacyChar = c;
		this.baseType = varBase;
		this.defaultValue = defaultVal;
		addLegacy(this);
	}
	
	public int getId () {
		return serialID;
	}

	public Object getDefaultValue() {
		return defaultValue;
	}

	public BaseVarType getVarBaseType() {
		return baseType;
	}
    
	public static ScriptVarType getById (int id) {
		for (ScriptVarType key : values()) {
			if (id == key.serialID) {
				return key;
			}
		}
		return null;
	}
    
    static void addLegacy(ScriptVarType varType) {
		if (null == varByLegacyChar) {
		    varByLegacyChar = new ScriptVarType[256];
		}
		varByLegacyChar[TextConvert.charToCp1252(varType.legacyChar) & 0xff] = varType;
    }
    
    public static ScriptVarType getByChar(char c) {
		if ('O' == c) {
		    return OBJ;
		}
		return varByLegacyChar[TextConvert.charToCp1252(c) & 0xff];
    }
}
