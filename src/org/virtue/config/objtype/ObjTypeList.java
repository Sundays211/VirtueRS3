/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.config.objtype;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.Iterator;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.Js5Archive;
import org.virtue.config.Js5ConfigGroup;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 22/10/2014
 */
public class ObjTypeList implements Iterable<ObjType> {
	
	private class ItemIterator implements Iterator<ObjType> {
		
		private int pointer = 0;

		/* (non-Javadoc)
		 * @see java.util.Iterator#hasNext()
		 */
		@Override
		public boolean hasNext() {
			return pointer < num;
		}

		/* (non-Javadoc)
		 * @see java.util.Iterator#next()
		 */
		@Override
		public ObjType next() {
			pointer++;
			return list(pointer-1);
		}
	}

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ObjTypeList.class);

	/**
	 * The {@link ObjTypeList} Instance
	 */
	private static ObjTypeList instance;
	
	public static void init (Cache cache, File customDataFile) {
		instance = new ObjTypeList();
		instance.cache = cache;
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG_OBJ.getArchiveId()));
			instance.referenceTable = ReferenceTable.decode(container.getData());
			int groupCount = instance.referenceTable.size() - 1;
			instance.num = (groupCount * Js5ConfigGroup.OBJTYPE.getGroupSize()) + instance.referenceTable.getEntry(groupCount).size();
			logger.info("Found "+instance.num+" objtypes definitions.");
		} catch (IOException ex) {
			logger.error("Failed to load objtypes definitions", ex);
		}
		
		if (customDataFile.exists()) {
			try {
				instance.loadObjData(customDataFile);
			} catch (IOException ex) {
				logger.error("Failed to load custom objtype data", ex);
			}
		} else {
			logger.warn("No custom objtype data file was found. Please add this file at "+customDataFile+" to load weights and descriptions for Items.");
		}
	}
	
	/**
	 * Returns The {@link ObjTypeList} Instance
	 */
	public static ObjTypeList getInstance() {
		if (instance == null) {
			throw new IllegalStateException("ObjTypeList not yet initialised. init() must be called before this method.");
		}
		return instance;
	}

	/**
	 * A {@link LoadingCache} containing recently used archives
	 */
	private LoadingCache<Integer, Archive> archiveCache = CacheBuilder.newBuilder()
			.softValues().build(new CacheLoader<Integer, Archive>() {
	             public Archive load(Integer groupId) throws IOException {
	                 return Archive.decode(
	 						cache.read(Js5Archive.CONFIG_OBJ.getArchiveId(), groupId).getData(), 
							referenceTable.getEntry(groupId).size());
	               }
	             });
	
	private LoadingCache<Integer, ObjType> cachedItems = CacheBuilder.newBuilder().softValues().build(new CacheLoader<Integer, ObjType>() {
		public ObjType load(Integer id) throws IOException {
			ByteBuffer data = getData(id);
			if (data == null) {
				return null;
			}
			ObjType type;

			if (objDataIndicies != null && objDataArchive != null) {
				int index = objDataIndicies[id];
				if (index != -1) {
					ByteBuffer extraData = objDataArchive.getEntry(index);
					type = ObjType.load(id, data, extraData);
				} else {
					type = ObjType.load(id, data);
				}
			} else {
				type = ObjType.load(id, data);
			}
			runPostDecode(type, id);
			return type;
          }
	});
	private int num;
	private ReferenceTable referenceTable;
	private Cache cache;
	private Archive objDataArchive;
	private int[] objDataIndicies;
	
	private ObjTypeList () {
		//Prevent direct instantiation
	}
	
	public ObjType list (int id) {
		synchronized (this) {
			if (!exists(id)) {
				logger.warn("Tried to load objtype "+id+" which does not exist!");
				return null;
			}
			try {
				return cachedItems.get(id);
			} catch (ExecutionException ex) {
				logger.error("Error loading objtype definition "+id, ex);
				return null;
			}
		}
	}
	
	public boolean exists (int id) {
		if (id < 0 || id >= num) {
			return false;
		}
		int groupId = Js5ConfigGroup.OBJTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.OBJTYPE.getClientFileId(id);
		return referenceTable.getEntry(groupId, fileId) != null;
	}
	
	public int getSize() {
		return num;
	}
	
	/**
	 * Fetches the extra object config from the specified file
	 * @param extraDataFile The File to fetch data from
	 * @throws IOException If there was an issue while reading the file
	 */
	private void loadObjData (File extraDataFile) throws IOException {
		try (DataInputStream reader = new DataInputStream(new FileInputStream(extraDataFile))) {
			int capacity = reader.readInt();
			objDataIndicies = new int[num];
			Arrays.fill(objDataIndicies, -1);
			for (int index = 0; index < capacity; index++) {
				int objId = reader.readInt();
				if (objId < num) {
					objDataIndicies[objId] = index;
				}
			}
			byte[] data = new byte[reader.available()];
			reader.read(data);
			ByteBuffer buffer = ByteBuffer.wrap(data);
			objDataArchive = Archive.decode(buffer, capacity);
			logger.info("Loaded data for "+capacity+" objtypes.");
		}
	}

	/* (non-Javadoc)
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
	public Iterator<ObjType> iterator() {
		return new ItemIterator();
	}
	
	private ByteBuffer getData (int id) {
		int groupId = Js5ConfigGroup.OBJTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.OBJTYPE.getClientFileId(id);
		try {
			if (referenceTable.getEntry(groupId, fileId) == null) {
				logger.warn("Tried to load objtype "+id+" which does not exist!");
				return null;
			}
			return archiveCache.get(groupId).getEntry(referenceTable.getEntry(groupId, fileId).index());
		} catch (RuntimeException | ExecutionException ex) {
			logger.error("Error loading itemtype definition "+id+" [group="+groupId+" file="+fileId+']', ex);
			return null;
		}
	}
	
	private void runPostDecode (ObjType itemType, int id) {
		if (itemType.certtemplate != -1 && itemType.certlink != id) {
			itemType.genCert(list(itemType.certtemplate), list(itemType.certlink));
		} else if (itemType.lenttemplate != -1) {
			itemType.genLent(list(itemType.lenttemplate), list(itemType.lentlink));
		} else if (-1 != itemType.boughttemplate && itemType.boughtlink != id) {
			itemType.genBought(list(itemType.boughttemplate), list(itemType.boughtlink));
		} else if (itemType.shardtemplate != -1) {
			itemType.genShard(list(itemType.shardtemplate), list(itemType.shardlink));
		}
	}
}
