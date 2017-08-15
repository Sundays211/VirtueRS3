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
package org.virtue.engine.script.api.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.virtue.config.ConfigProvider;
import org.virtue.config.db.DBIndexProvider;
import org.virtue.config.db.DBTableIndex;
import org.virtue.config.db.dbrowtype.DBRowType;
import org.virtue.config.db.dbtabletype.DBTableType;
import org.virtue.config.enumtype.EnumType;
import org.virtue.config.invtype.InvType;
import org.virtue.config.loctype.LocType;
import org.virtue.config.npctype.NpcType;
import org.virtue.config.objtype.ObjType;
import org.virtue.config.paramtype.ParamType;
import org.virtue.config.seqtype.SeqType;
import org.virtue.config.structtype.StructType;
import org.virtue.config.vartype.constants.BaseVarType;
import org.virtue.config.vartype.constants.ScriptVarType;
import org.virtue.engine.script.api.ConfigAPI;

/**
 * @author Sundays211
 * @since 01/03/2016
 */
public class VirtueConfigAPI implements ConfigAPI {
	
	private ConfigProvider configProvider;
	
	public VirtueConfigAPI (ConfigProvider configProvider) {
		this.configProvider = configProvider;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#lookupDbRowId(int, int)
	 */
	@Override
	public int lookupDbRowId(int dbTableId, int rowPos) throws Exception {
		return lookupDbRowIds(dbTableId, 1, rowPos).get(0);
	}

	@Override
	public List<Integer> lookupDbRowIds(int dbTableId, int indexId, int key) throws Exception {
		DBTableIndex dbIndex = DBIndexProvider.getInstance().getIndex(dbTableId, indexId);
		List<Integer> ids = dbIndex.getDBRowsForValue(key);
		if (ids == null) {
			throw new RuntimeException("No values found for key "+key+" on index "+dbTableId+", "+indexId);
		}
		return ids;
	}

	@Override
	public List<Integer> lookupDbRowIds(int dbTableId, int indexId, String key) throws Exception {
		DBTableIndex dbIndex = DBIndexProvider.getInstance().getIndex(dbTableId, indexId);
		List<Integer> ids = dbIndex.getDBRowsForValue(key);
		if (ids == null) {
			throw new RuntimeException("No values found for key "+key+" on index "+dbTableId+", "+indexId);
		}
		return ids;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#getDbFieldValues(int, int, int)
	 */
	@Override
	public List<Object> getDbFieldValues(int dbTableId, int dbRowId, int columnId) {
		DBRowType dbRow = configProvider.getDBRowTypes().list(dbRowId);
		DBTableType dbTable = configProvider.getDBTableTypes().list(dbTableId);
		Object[] values = dbRow.getFieldValues(columnId);
		if (values == null && dbTable.defaultValues[columnId] != null) {
			values = dbTable.defaultValues[columnId];
		}
		
		ScriptVarType[] dataTypes = dbTable.columnTypes[columnId];
		List<Object> response;
		if (values == null) {
			response = new ArrayList<>(dataTypes.length);
			for (ScriptVarType dataType : dataTypes) {
				response.add(dataType.getDefaultValue());
			}
		} else {
			response = Arrays.asList(values);
		}
		return response;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#enumValue(int, int)
	 */
	@Override
	public Object enumValue(int enumTypeId, int key) {
		EnumType enumType = configProvider.getEnumTypes().list(enumTypeId);
		if (enumType == null) {
			throw new IllegalArgumentException("Invalid enumTypeId: "+enumTypeId);
		}
		Object value;
		if (enumType.valueType.getVarBaseType() == BaseVarType.STRING) {
			value = enumType.getValueString(key);
		} else {
			value = enumType.getValueInt(key);
		}
		return value;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#enumHasValue(int, java.lang.Object)
	 */
	@Override
	public boolean enumHasValue(int enumTypeId, Object value) {
		EnumType enumType = configProvider.getEnumTypes().list(enumTypeId);
		if (enumType == null) {
			throw new IllegalArgumentException("Invalid enumTypeId: "+enumTypeId);
		}
		return enumType.containsValue(value);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#enumSize(int)
	 */
	@Override
	public int enumSize(int enumTypeId) {
		EnumType enumType = configProvider.getEnumTypes().list(enumTypeId);
		if (enumType == null) {
			throw new IllegalArgumentException("Invalid enumTypeId: "+enumTypeId);
		}
		return enumType.getSize();
	}


	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objName(int)
	 */
	@Override
	public String objName(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		return objType.name;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objDesc(int)
	 */
	@Override
	public String objDesc(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		return objType.getDescription();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objGetIOption(int, int)
	 */
	@Override
	public String objIop(int objTypeId, int slot) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		return objType.iop[slot-1];
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objStackable(int)
	 */
	@Override
	public boolean objStackable(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		return objType.isStackable();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objCategory(int)
	 */
	@Override
	public int objCategory(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		return objType.category;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objHasVar(int)
	 */
	@Override
	public boolean objHasVar(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		return objType.stackable == 2;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objToCert(int)
	 */
	@Override
	public int objCert(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		if (objType.certtemplate == -1 && objType.certlink >= 0) {
			return objType.certlink;
		} else {
			return objTypeId;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objUncert(int)
	 */
	@Override
	public int objUncert(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		if (objType.certtemplate >= 0 && objType.certlink >= 0) {
			return objType.certlink;
		} else {
			return objTypeId;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objToLent(int)
	 */
	@Override
	public int objLent(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		if (objType.lenttemplate == -1 && objType.lentlink >= 0) {
			return objType.lentlink;
		} else {
			return objTypeId;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objUnlent(int)
	 */
	@Override
	public int objUnlent(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		if (objType.lenttemplate >= 0 && objType.lentlink >= 0) {
			return objType.lentlink;
		} else {
			return objTypeId;
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objWearpos(int)
	 */
	@Override
	public int objWearpos(int objTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		return objType.wearpos;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#objParam(int, int)
	 */
	@Override
	public Object objParam(int objTypeId, int paramTypeId) {
		ObjType objType = configProvider.getObjTypes().list(objTypeId);
		if (objType == null) {
			throw new IllegalArgumentException("Invalid objTypeId: "+objTypeId);
		}
		ParamType paramType = configProvider.getParamTypes().list(paramTypeId);
		if (paramType == null) {
			throw new IllegalArgumentException("Invalid param type: "+paramTypeId);
		}
		if (paramType.stringBase()) {
			return objType.getParam(paramTypeId, paramType.defaultstr);
		} else {
			return objType.getParam(paramTypeId, paramType.defaultint);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#structParam(int, int)
	 */
	@Override
	public Object structParam(int structTypeId, int paramTypeId) {
		StructType structType = configProvider.getStructTypes().list(structTypeId);
		if (structType == null) {
			throw new IllegalArgumentException("Invalid struct: "+structTypeId);
		}
		ParamType paramType = configProvider.getParamTypes().list(paramTypeId);
		if (paramType == null) {
			throw new IllegalArgumentException("Invalid param type: "+paramTypeId);
		}
		if (paramType.stringBase()) {
			return structType.getParam(paramTypeId, paramType.defaultstr);
		} else {
			return structType.getParam(paramTypeId, paramType.defaultint);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.ConfigAPI#seqLength(int)
	 */
	@Override
	public int seqLength(int seqTypeId) {
		SeqType seqType = configProvider.getSeqTypes().list(seqTypeId);
		if (seqType == null) {
			throw new IllegalArgumentException("Invalid seqTypeId: "+seqTypeId);
		}
		return seqType.length;
	}

	@Override
	public String npcName(int npcTypeId) {
		NpcType npcType = configProvider.getNpcTypes().list(npcTypeId);
		if (npcType == null) {
			throw new IllegalArgumentException("Invalid npcTypeId: "+npcTypeId);
		}
		return npcType.name;
	}

	@Override
	public String locName(int locTypeId) {
		LocType locType = configProvider.getLocTypes().list(locTypeId);
		if (locType == null) {
			throw new IllegalArgumentException("Invalid locTypeId: "+locTypeId);
		}
		return locType.name;
	}

	@Override
	public int locSizeX(int locTypeId) {
		LocType locType = configProvider.getLocTypes().list(locTypeId);
		if (locType == null) {
			throw new IllegalArgumentException("Invalid locTypeId: "+locTypeId);
		}
		return locType.sizeX;
	}

	@Override
	public int locSizeY(int locTypeId) {
		LocType locType = configProvider.getLocTypes().list(locTypeId);
		if (locType == null) {
			throw new IllegalArgumentException("Invalid locTypeId: "+locTypeId);
		}
		return locType.sizeY;
	}

	@Override
	public int invSize(int invId) {
		InvType invType = configProvider.getInvTypes().list(invId);
		if (invType == null) {
			throw new IllegalArgumentException("Invalid inventory: "+invId);
		}
		return invType.getCapacity();
	}
}
