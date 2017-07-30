package org.virtue.config.db;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.virtue.cache.utility.ByteBufferUtils;
import org.virtue.config.vartype.constants.BaseVarType;

public class DBTableIndex implements Iterable<LinkedList<Integer>> {
	BaseVarType keyType;
	Map<Object, LinkedList<Integer>> index;
	
	void decode(ByteBuffer buffer) {
		keyType = BaseVarType.getById(buffer.get() & 0xff);
		int keyCount = ByteBufferUtils.getSmartInt2(buffer);
		index = new HashMap<Object, LinkedList<Integer>>(keyCount);
		while (keyCount-- > 0) {
			Object key = keyType.decode(buffer);
			int rowCount = ByteBufferUtils.getSmartInt2(buffer);
			LinkedList<Integer> rows = new LinkedList<Integer>();
			while (rowCount-- > 0) {
				int rowId = ByteBufferUtils.getSmartInt2(buffer);
				rows.add(Integer.valueOf(rowId));
			}
			index.put(key, rows);
		}
	}

	public List<Integer> getDBRowsForValue(Object object) {
		return index.get(object);
	}

	public DBTableIndex(ByteBuffer buffer) {
		decode(buffer);
	}

	@Override
	public Iterator<LinkedList<Integer>> iterator() {
		return index.values().iterator();
	}
}
