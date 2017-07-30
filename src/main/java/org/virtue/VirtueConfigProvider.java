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
package org.virtue;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.EnumMap;
import java.util.Properties;

import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.ConfigProvider;
import org.virtue.config.Js5Archive;
import org.virtue.config.Js5ConfigGroup;
import org.virtue.config.bastype.BASTypeList;
import org.virtue.config.db.dbrowtype.DBRowTypeList;
import org.virtue.config.db.dbtabletype.DBTableTypeList;
import org.virtue.config.defaults.DefaultsGroup;
import org.virtue.config.defaults.SkillDefaults;
import org.virtue.config.defaults.WearposDefaults;
import org.virtue.config.enumtype.EnumTypeList;
import org.virtue.config.invtype.InvTypeList;
import org.virtue.config.loctype.LocTypeList;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.config.objtype.ObjTypeList;
import org.virtue.config.paramtype.ParamTypeList;
import org.virtue.config.questtype.QuestTypeList;
import org.virtue.config.seqtype.SeqGroupTypeList;
import org.virtue.config.seqtype.SeqTypeList;
import org.virtue.config.structtype.StructTypeList;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarTypeList;
import org.virtue.config.vartype.bit.VarBitTypeList;
import org.virtue.config.vartype.general.VarBasicTypeList;
import org.virtue.config.vartype.player.VarPlayerTypeList;
import org.virtue.game.entity.player.stat.Stat;
import org.virtue.game.parser.impl.NpcDataParser;
import org.virtue.utility.FileUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 5/04/2016
 */
public class VirtueConfigProvider implements ConfigProvider {
	
	private Cache cache;
	private ReferenceTable configTable;
	
	private InvTypeList invTypeList;
	
	private LocTypeList locTypeList;
	
	private EnumTypeList enumTypeList;
	
	private NpcTypeList npcTypeList;
	
	private ObjTypeList objTypeList;
	
	private ParamTypeList paramTypeList;
	
	private SeqTypeList seqTypeList;
	
	private StructTypeList structTypeList;
	
	private BASTypeList basTypeList;
	
	private QuestTypeList questTypeList;
	
	private DBTableTypeList dbTableTypeList;
	
	private DBRowTypeList dbRowTypeList;
	
	private EnumMap<VarDomainType, VarTypeList> varTypes = new EnumMap<>(VarDomainType.class);
	
	private VarBitTypeList varBitTypeList;
	
	private SeqGroupTypeList seqGroupTypeList;
	
	private WearposDefaults wearposDefaults;
	
	private SkillDefaults skillDefaults;

	protected VirtueConfigProvider(Cache cache) throws IOException {
		this.cache = cache;
		
		Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG.getArchiveId()));
		this.configTable = ReferenceTable.decode(container.getData());
	}
	
	protected void init (Properties properties) throws IOException {
		Archive invs = Archive.decode(cache.read(2, Js5ConfigGroup.INVTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.INVTYPE.id).size());
		invTypeList = new InvTypeList(configTable, invs);
		
		locTypeList = new LocTypeList(cache);
		
		enumTypeList = new EnumTypeList(cache);		

		String npcData = properties.getProperty("config.npc.data", Constants.NPC_DATA_PATH);
		npcTypeList = new NpcTypeList(cache, FileUtility.parseFilePath(npcData, properties));		
		
		String objDataFile = properties.getProperty("config.obj.data", Constants.OBJECT_DATA_PATH);
		objTypeList = new ObjTypeList(cache, FileUtility.parseFilePath(objDataFile, properties));
		
		String npcDataFile = properties.getProperty("npc.data.file", "repository/npc/NPCData.json");
		NpcDataParser.loadJsonNpcData(FileUtility.parseFilePath(npcDataFile, properties), npcTypeList);
		
		Archive params = Archive.decode(cache.read(2, Js5ConfigGroup.PARAMTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.PARAMTYPE.id).size());
		paramTypeList = new ParamTypeList(configTable, params);

		structTypeList = new StructTypeList(cache);
		
		Archive bas = Archive.decode(cache.read(2, Js5ConfigGroup.BASTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.BASTYPE.id).size());
		basTypeList = new BASTypeList(configTable, bas);
		
		Archive quests = Archive.decode(cache.read(2, Js5ConfigGroup.QUESTTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.QUESTTYPE.id).size());
		questTypeList = new QuestTypeList(configTable, quests);
		
		Archive dbtables = Archive.decode(cache.read(2, Js5ConfigGroup.DBTABLETYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.DBTABLETYPE.id).size());
		dbTableTypeList = new DBTableTypeList(configTable, dbtables);
		
		Archive dbrows = Archive.decode(cache.read(2, Js5ConfigGroup.DBROWTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.DBROWTYPE.id).size());
		dbRowTypeList = new DBRowTypeList(configTable, dbrows);
		
		Archive varps = Archive.decode(cache.read(2, Js5ConfigGroup.VAR_PLAYER.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.VAR_PLAYER.id).size());
		varTypes.put(VarDomainType.PLAYER, new VarPlayerTypeList(configTable, varps, VarDomainType.PLAYER));
		
		Archive varobjs = Archive.decode(cache.read(2, Js5ConfigGroup.VAR_OBJECT.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.VAR_OBJECT.id).size());
		varTypes.put(VarDomainType.OBJECT, new VarBasicTypeList(configTable, varobjs, VarDomainType.OBJECT));
		
		Archive varclansettings = Archive.decode(cache.read(2, Js5ConfigGroup.VAR_CLAN_SETTING.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.VAR_CLAN_SETTING.id).size());
		varTypes.put(VarDomainType.CLAN_SETTING, new VarBasicTypeList(configTable, varclansettings, VarDomainType.CLAN_SETTING));
		
		Archive varbits = Archive.decode(cache.read(2, Js5ConfigGroup.VAR_BIT.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.VAR_BIT.id).size());
		varBitTypeList = new VarBitTypeList(configTable, varbits, varTypes);
		
		Archive seqgroups = Archive.decode(cache.read(2, Js5ConfigGroup.SEQGROUPTYPE.id).getData(), 
				configTable.getEntry(Js5ConfigGroup.SEQGROUPTYPE.id).size());
		seqGroupTypeList = new SeqGroupTypeList(configTable, seqgroups);
		
		seqTypeList = new SeqTypeList(cache, seqGroupTypeList);
		
		ByteBuffer skills = cache.read(Js5Archive.DEFAULTS.getArchiveId(), DefaultsGroup.SKILL.js5Id).getData();
		skillDefaults = new SkillDefaults(skills);
		Stat.setDefaults(skillDefaults);		
		
		ByteBuffer wearpos = cache.read(Js5Archive.DEFAULTS.getArchiveId(), DefaultsGroup.WEARPOS.js5Id).getData();
		wearposDefaults = new WearposDefaults(wearpos);
	}
	
	@Override
	public InvTypeList getInvTypes () {
		return invTypeList;
	}
	
	@Override
	public LocTypeList getLocTypes () {
		return locTypeList;
	}
	
	@Override
	public EnumTypeList getEnumTypes () {
		return enumTypeList;
	}
	
	@Override
	public NpcTypeList getNpcTypes () {
		return npcTypeList;
	}
	
	@Override
	public ObjTypeList getObjTypes () {
		return objTypeList;
	}
	
	@Override
	public ParamTypeList getParamTypes () {
		return paramTypeList;
	}
	
	@Override
	public SeqTypeList getSeqTypes () {
		return seqTypeList;
	}
	
	@Override
	public StructTypeList getStructTypes () {
		return structTypeList;
	}
	
	@Override
	public BASTypeList getBASTypes () {
		return basTypeList;
	}
	
	@Override
	public QuestTypeList getQuestTypes () {
		return questTypeList;
	}
	
	@Override
	public DBTableTypeList getDBTableTypes () {
		return dbTableTypeList;
	}
	
	@Override
	public DBRowTypeList getDBRowTypes () {
		return dbRowTypeList;
	}
	
	@Override
	public VarTypeList getVarTypes (VarDomainType domain) {
		return varTypes.get(domain);
	}
	
	@Override
	public VarBitTypeList getVarBitTypes () {
		return varBitTypeList;
	}
	
	@Override
	public WearposDefaults getWearposDefaults () {
		return wearposDefaults;
	}
	
	@Override
	public SkillDefaults getSkillDefaults () {
		return skillDefaults;
	}

}
