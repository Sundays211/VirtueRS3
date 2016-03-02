package org.virtue.config.db;

import java.nio.ByteBuffer;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.vartype.constants.ScriptVarType;

public class DBUtils {

	private DBUtils() {
		
	}
	
	public static Object[] getDataValues(ByteBuffer buffer, ScriptVarType[] types) {
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
	
	public static int getTableId (int indexHash) {
		return indexHash >>> 8;
	}
	
	public static int getIndexId (int indexHash) {
		return indexHash & 0xff;
	}
}
