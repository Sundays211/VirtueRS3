package org.virtue.config;

import org.virtue.config.bastype.BASTypeList;
import org.virtue.config.db.dbrowtype.DBRowTypeList;
import org.virtue.config.db.dbtabletype.DBTableTypeList;
import org.virtue.config.defaults.SkillDefaults;
import org.virtue.config.defaults.WearposDefaults;
import org.virtue.config.enumtype.EnumTypeList;
import org.virtue.config.invtype.InvTypeList;
import org.virtue.config.loctype.LocTypeList;
import org.virtue.config.npctype.NpcTypeList;
import org.virtue.config.objtype.ObjTypeList;
import org.virtue.config.paramtype.ParamTypeList;
import org.virtue.config.questtype.QuestTypeList;
import org.virtue.config.seqtype.SeqTypeList;
import org.virtue.config.structtype.StructTypeList;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarTypeList;
import org.virtue.config.vartype.bit.VarBitTypeList;

public interface ConfigProvider {

	InvTypeList getInvTypes();

	LocTypeList getLocTypes();

	EnumTypeList getEnumTypes();

	NpcTypeList getNpcTypes();

	ObjTypeList getObjTypes();

	ParamTypeList getParamTypes();

	SeqTypeList getSeqTypes();

	StructTypeList getStructTypes();

	BASTypeList getBASTypes();

	QuestTypeList getQuestTypes();

	DBTableTypeList getDBTableTypes();

	DBRowTypeList getDBRowTypes();

	VarTypeList getVarTypes(VarDomainType domain);

	VarBitTypeList getVarBitTypes();

	WearposDefaults getWearposDefaults();

	SkillDefaults getSkillDefaults();

}