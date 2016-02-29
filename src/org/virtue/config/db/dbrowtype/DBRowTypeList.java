package org.virtue.config.db.dbrowtype;

import java.nio.ByteBuffer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;

public class DBRowTypeList {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(DBRowTypeList.class);
	
	private static DBRowType[] rowTypes;
	
	public static void init (Archive params, ReferenceTable.Entry tableEntry) {
		rowTypes = new DBRowType[tableEntry.capacity()];
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
			rowTypes[id] = new DBRowType(id);
			rowTypes[id].decode(entry);
		}
		logger.info("Found "+rowTypes.length+" DBRowType definitions.");
	}

	public static DBRowType list (int id) {
		if (id < 0 || id >= rowTypes.length) {
			return null;
		}
		return rowTypes[id];
	}

	public static int capacity () {
		return rowTypes.length;
	}
}
