/* Class23 - Decompiled by JODE
 * Visit http://jode.sourceforge.net/
 */
package org.virtue.config.db.dbrowtype;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.ConfigItem;
import org.virtue.config.vartype.constants.ScriptVarType;

public class DBRowType implements ConfigItem {
	Object[][] values;
	ScriptVarType[][] dataTypes;
	private int id;
	
	public DBRowType (int id) {
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
				values[column] = getDataValues(buffer, types);
				dataTypes[column] = types;
			}
		}
	}

	public void decode(ByteBuffer buffer) {
		for (;;) {
			int code = buffer.get() & 0xff;
			if (0 == code) {
				break;
			}
			decode(buffer, code);
		}
	}

	public Object[] getValue(int column) {
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
	
	static Object[] getDataValues(ByteBuffer buffer, ScriptVarType[] types) {
		int valuesCount = ByteBufferUtils.getUnsignedSmartInt(buffer);
		Object[] objects = new Object[valuesCount * types.length];
		for (int i_1_ = 0; i_1_ < valuesCount; i_1_++) {
			for (int i_2_ = 0; i_2_ < types.length; i_2_++) {
				int i_3_ = i_2_ + i_1_ * types.length;				
				objects[i_3_] = types[i_2_].getVarBaseType().decode(buffer);
			}
		}
		return objects;
	}
}
