package org.virtue.config.db.dbtabletype;

import java.nio.ByteBuffer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;

public class DBTableTypeList {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(DBTableTypeList.class);
	
	private static DBTableType[] tableTypes;
	
	public static void init (Archive params, ReferenceTable.Entry tableEntry) {
		tableTypes = new DBTableType[tableEntry.capacity()];
		for (int slot=0;slot<params.size();slot++) {
			ReferenceTable.ChildEntry child = tableEntry.getEntry(slot);
			if (child == null) {
				continue;
			}
			int id = child.index();
			ByteBuffer entry = params.getEntry(id);
			if (entry == null) {
				continue;
			}
			tableTypes[id] = new DBTableType(id);
			tableTypes[id].decode(entry);
		}
		logger.info("Found "+tableTypes.length+" DBTableType definitions.");
	}

	public static DBTableType list (int id) {
		if (id < 0 || id >= tableTypes.length) {
			return null;
		}
		return tableTypes[id];
	}

	public static int capacity () {
		return tableTypes.length;
	}
}
