package org.virtue.config.db.dbtabletype;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;
import org.virtue.config.db.DBUtils;
import org.virtue.config.vartype.constants.ScriptVarType;

public class DBTableType implements ConfigType {
	public Object[][] defaultValues;
	public ScriptVarType[][] columnTypes;
	
	public DBTableType (int id) {
		
	}

	public void decode(ByteBuffer buffer) {
		for (;;) {
			int i_0_ = buffer.get() & 0xff;
			if (0 == i_0_)
				break;
			decode(buffer, i_0_);
		}
	}

	void decode(ByteBuffer buffer, int i) {
		if (i == 1) {
			int i_2_ = buffer.get() & 0xff;
			if (null == columnTypes) {
				columnTypes = new ScriptVarType[i_2_][];
			}
			for (int i_3_ = buffer.get() & 0xff; 255 != i_3_; i_3_ = buffer.get() & 0xff) {
				int i_4_ = i_3_ & 0x7f;
				boolean bool = 0 != (i_3_ & 0x80);
				ScriptVarType[] types = new ScriptVarType[buffer.get() & 0xff];
				for (int i_5_ = 0; i_5_ < types.length; i_5_++) {
					types[i_5_] = ScriptVarType.getById(ByteBufferUtils.getUnsignedSmartInt(buffer));
				}
				columnTypes[i_4_] = types;
				if (bool) {
					if (null == defaultValues) {
						defaultValues = new Object[columnTypes.length][];
					}
					defaultValues[i_4_] = DBUtils.getDataValues(buffer, types);
				}
			}
		}
	}

	public void postDecode() {
		/* empty */
	}

	DBTableType() {
		/* empty */
	}
}
