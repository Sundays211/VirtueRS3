package org.virtue.config.db;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.Js5Archive;
import org.virtue.config.loctype.LocTypeList;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

public class DBIndexProvider {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(DBIndexProvider.class);

	/**
	 * The {@link LocTypeList} Instance
	 */
	private static DBIndexProvider instance;
	
	public static void init (Cache cache) {
		instance = new DBIndexProvider();
		instance.cache = cache;
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.DBTABLEINDEX.getArchiveId()));
			instance.referenceTable = ReferenceTable.decode(container.getData());
			
			logger.info("Found "+instance.referenceTable.size()+" DB table indicies.");
		} catch (IOException ex) {
			logger.error("Failed to load DB table indicies", ex);
		}
	}
	
	private ReferenceTable referenceTable;	
	private Cache cache;

	/**
	 * A {@link LoadingCache} containing recently used archives
	 */
	private LoadingCache<Integer, Archive> archiveCache = CacheBuilder.newBuilder()
			.softValues().build(new CacheLoader<Integer, Archive>() {
	             public Archive load(Integer groupId) throws IOException {
	                 return Archive.decode(
	 						cache.read(Js5Archive.DBTABLEINDEX.getArchiveId(), groupId).getData(), 
							referenceTable.getEntry(groupId).size());
	               }
	             });
	
	private LoadingCache<Integer, DBTableIndex> indexCache = CacheBuilder.newBuilder()
			.softValues().build(new CacheLoader<Integer, DBTableIndex>() {
				public DBTableIndex load(Integer indexHash) throws Exception {
					int tableId = DBUtils.getTableId(indexHash);
					ReferenceTable.Entry tableEntry = referenceTable.getEntry(tableId);
					if (tableEntry == null) {
						throw new IllegalArgumentException("Invalid table ID: "+tableId);
					}
					int indexId = DBUtils.getIndexId(indexHash);
					if (tableEntry.size() > 1) {
						Archive tableIndicies = archiveCache.get(tableId);
						ReferenceTable.ChildEntry indexEntry = tableEntry.getEntry(indexId);
						if (indexEntry == null) {
							throw new IllegalArgumentException("Invalid index ID: "+indexId);
						}
						return new DBTableIndex(tableIndicies.getEntry(indexEntry.index()));
					} else {
						if (indexId != 1) {
							throw new IllegalArgumentException("Invalid index ID: "+indexId);
						}
						return new DBTableIndex(cache.read(Js5Archive.DBTABLEINDEX.getArchiveId(), tableId).getData());
					}
					
				}
			});

	private DBIndexProvider() {
		//Prevent direct instantiation
	}
	
	public DBTableIndex getIndex (int tableId, int indexId) throws Exception {
		return indexCache.get(tableId << 8 | indexId & 0xff);
	}
	
	public static DBIndexProvider getInstance () {
		if (instance == null) {
			throw new IllegalStateException("DBIndexProvider not yet initialised.");
		}
		return instance;
	}
}
