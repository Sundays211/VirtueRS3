package org.virtue.config.db.dbrowtype;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.ConfigDecoder;
import org.virtue.config.Js5ConfigGroup;

public class DBRowTypeList extends ConfigDecoder<DBRowType>{

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(DBRowTypeList.class);

	public DBRowTypeList(ReferenceTable configTable, Archive archive) {
		super(configTable, archive, Js5ConfigGroup.DBROWTYPE, DBRowType.class);
		logger.info("Found "+getCount()+" DBRowType definitions.");
	}
}
