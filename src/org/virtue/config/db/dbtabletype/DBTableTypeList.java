package org.virtue.config.db.dbtabletype;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.ConfigDecoder;
import org.virtue.config.Js5ConfigGroup;

public class DBTableTypeList extends ConfigDecoder<DBTableType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(DBTableTypeList.class);

	public DBTableTypeList(ReferenceTable configTable, Archive archive) {
		super(configTable, archive, Js5ConfigGroup.DBTABLETYPE, DBTableType.class);
		logger.info("Found "+getCount()+" DBTableType definitions.");
	}
}
