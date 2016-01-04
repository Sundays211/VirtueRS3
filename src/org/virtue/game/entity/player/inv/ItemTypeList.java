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
package org.virtue.game.entity.player.inv;

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
import org.virtue.cache.config.Js5Archive;
import org.virtue.cache.config.Js5ConfigGroup;
import org.virtue.cache.def.impl.ItemType;

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
public class ItemTypeList extends CacheLoader<Integer, ItemType> implements Iterable<ItemType> {
	
	private class ItemIterator implements Iterator<ItemType> {
		
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
		public ItemType next() {
			pointer++;
			return list(pointer-1);
		}

		/* (non-Javadoc)
		 * @see java.util.Iterator#remove()
		 */
		@Override
		public void remove() {
			throw new UnsupportedOperationException();
		}
	}

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ItemTypeList.class);

	/**
	 * The {@link ItemTypeList} Instance
	 */
	private static ItemTypeList instance;
	
	public static void init (Cache cache, File customDataFile) {
		instance = new ItemTypeList();
		instance.cache = cache;
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG_ITEM.getArchiveId()));
			instance.referenceTable = ReferenceTable.decode(container.getData());
			int groupCount = instance.referenceTable.size() - 1;
			instance.num = (groupCount * Js5ConfigGroup.ITEMTYPE.getGroupSize()) + instance.referenceTable.getEntry(groupCount).size();
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

	public static ItemType list (int id) {
		synchronized (instance) {
			if (!instance.exists(id)) {
				logger.warn("Tried to load objtype "+id+" which does not exist!");
				return null;
			}
			try {
				return instance.cachedItems.get(id);
			} catch (ExecutionException ex) {
				logger.error("Error loading objtype definition "+id, ex);
				return null;
			}
		}
	}
	
	public static boolean itemExists (int id) {
		synchronized (instance) {		
			return instance.exists(id);
		}
	}
	
	public static int size() {
		return instance.num;
	}

	/**
	 * A {@link LoadingCache} containing recently used archives
	 */
	private LoadingCache<Integer, Archive> archiveCache = CacheBuilder.newBuilder()
			.softValues().build(new CacheLoader<Integer, Archive>() {
	             public Archive load(Integer groupId) throws IOException {
	                 return Archive.decode(
	 						cache.read(Js5Archive.CONFIG_ITEM.getArchiveId(), groupId).getData(), 
							referenceTable.getEntry(groupId).size());
	               }
	             });
	
	private LoadingCache<Integer, ItemType> cachedItems = CacheBuilder.newBuilder().softValues().build(this);
	private int num;
	private ReferenceTable referenceTable;
	private Cache cache;
	private Archive objDataArchive;
	private int[] objDataIndicies;
	
	private ItemTypeList () {
		//Prevent direct instantiation
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
	 * @see com.google.common.cache.CacheLoader#load(java.lang.Object)
	 */
	@Override
	public ItemType load(Integer id) throws Exception {
		ByteBuffer data = getData(id);
		if (data == null) {
			return null;
		}
		ItemType type;

		if (objDataIndicies != null && objDataArchive != null) {
			int index = objDataIndicies[id];
			if (index != -1) {
				ByteBuffer extraData = objDataArchive.getEntry(index);
				type = ItemType.load(id, data, extraData);
			} else {
				type = ItemType.load(id, data);
			}
		} else {
			type = ItemType.load(id, data);
		}
		runPostDecode(type, id);
		return type;
	}
	
	private boolean exists (int id) {
		if (id < 0 || id >= num) {
			return false;
		}
		int groupId = Js5ConfigGroup.ITEMTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.ITEMTYPE.getClientFileId(id);
		return referenceTable.getEntry(groupId, fileId) != null;
	}
	
	private ByteBuffer getData (int id) {
		int groupId = Js5ConfigGroup.ITEMTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.ITEMTYPE.getClientFileId(id);
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
	
	private void runPostDecode (ItemType itemType, int id) {
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

	/* (non-Javadoc)
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
	public Iterator<ItemType> iterator() {
		return new ItemIterator();
	}
}
