package org.virtue.config.db.dbrowtype;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigType;
import org.virtue.config.db.DBUtils;
import org.virtue.config.vartype.constants.ScriptVarType;

public class DBRowType implements ConfigType {
	Object[][] values;
	ScriptVarType[][] dataTypes;
	private int id;
	
	public DBRowType (int id, DBRowTypeList list) {
		this.id = id;
	}
	
	public int getId () {
		return id;
	}
	
	void decode(ByteBuffer buffer, int code) {
		if (code == 3) {
			int maxColumn = buffer.get() & 0xff;
			if (null == values) {
				values = new Object[maxColumn][];
				dataTypes = new ScriptVarType[maxColumn][];
			}
			for (int column = buffer.get() & 0xff; column != 255; column = buffer.get() & 0xff) {
				int valueTypeCount = buffer.get() & 0xff;
				ScriptVarType[] types = new ScriptVarType[valueTypeCount];
				for (int i = 0; i < valueTypeCount; i++) {	
					int typeId = ByteBufferUtils.getUnsignedSmartInt(buffer);
					types[i] = ScriptVarType.getById(typeId);
					if (types[i] == null) {
						throw new RuntimeException("Invalid ScriptVarType: "+typeId);
					}
				}
				values[column] = DBUtils.getDataValues(buffer, types);
				dataTypes[column] = types;
			}
		}
	}

	@Override
	public void decode(ByteBuffer buffer) {
		for (;;) {
			int code = buffer.get() & 0xff;
			if (0 == code) {
				break;
			}
			decode(buffer, code);
		}
	}

	public Object[] getFieldValues(int column) {
		if (values == null) {
			return null;
		}
		return values[column];
	}

	public void postDecode() {
		/* empty */
	}

	DBRowType() {
		/* empty */
	}
}
