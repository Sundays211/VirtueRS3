/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
package org.virtue.config;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Iterator;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 4/04/2016
 */
public abstract class ExternalConfigDecoder<T extends ConfigType> extends CacheLoader<Integer, T> implements Iterable<T> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ExternalConfigDecoder.class);
	
	private class ConfigIterator implements Iterator<T> {
		
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
		public T next() {
			pointer++;
			return list(pointer-1);
		}
	}
	
	/**
	 * A {@link LoadingCache} containing recently used archives
	 */
	private LoadingCache<Integer, Archive> archiveCache = CacheBuilder.newBuilder()
		.softValues().build(new CacheLoader<Integer, Archive>() {
             public Archive load(Integer groupId) throws IOException {
                 return Archive.decode(
 						cache.read(archive.getArchiveId(), groupId).getData(), 
						referenceTable.getEntry(groupId).size());
               }
             });
	
	private Cache cache;
	private LoadingCache<Integer, T> configCache = CacheBuilder.newBuilder().softValues().build(this);
	private int num;
	private ReferenceTable referenceTable;
	private Js5Archive archive;
	private Js5ConfigGroup configGroup;
	private Class<? extends ConfigType> configClass;

	
	public ExternalConfigDecoder(Cache cache, Js5Archive archive, Js5ConfigGroup group, Class<? extends ConfigType> configClass) throws IOException {
		this.cache = cache;
		this.archive = archive;
		this.configGroup = group;
		this.configClass = configClass;
		
		Container container = Container.decode(cache.getStore().read(255, archive.getArchiveId()));
		this.referenceTable = ReferenceTable.decode(container.getData());
		
		int groupCount = this.referenceTable.size() - 1;
		this.num = (groupCount * group.getGroupSize()) + this.referenceTable.getEntry(groupCount).size();
	}
	
	public int getCapacity () {
		return num;
	}
	
	public boolean exists (int id) {
		if (id < 0 || id >= num) {
			return false;
		}
		int groupId = configGroup.getClientGroupId(id);
		int fileId = configGroup.getClientFileId(id);
		return referenceTable.getEntry(groupId, fileId) != null;
	}
	
	public T list (int id) {
		if (!exists(id)) {
			logger.warn("Tried to load "+configGroup.name().toLowerCase()+" "+id+" which does not exist!");
			return null;
		}
		try {
			return configCache.get(id);
		} catch (ExecutionException ex) {
			logger.error("Error loading "+configGroup.name().toLowerCase()+" definition "+id, ex);
			return null;
		}
	}

	/* (non-Javadoc)
	 * @see com.google.common.cache.CacheLoader#load(java.lang.Object)
	 */
	@SuppressWarnings("unchecked")
	@Override
	public T load(Integer id) throws Exception {
		ByteBuffer data = getData(id);
		if (data == null) {
			return null;
		}
		ConfigType type = configClass.getDeclaredConstructor(Integer.TYPE, getClass()).newInstance(id, this);
		type.decode(data);
		type.postDecode();
		return (T) type;
	}
	
	protected ByteBuffer getData (int id) {
		int groupId = configGroup.getClientGroupId(id);
		int fileId = configGroup.getClientFileId(id);
		try {
			if (referenceTable.getEntry(groupId, fileId) == null) {
				logger.warn("Tried to load "+configGroup.name().toLowerCase()+" "+id+" which does not exist!");
				return null;
			}
			return archiveCache.get(groupId).getEntry(referenceTable.getEntry(groupId, fileId).index());
		} catch (RuntimeException | ExecutionException ex) {
			logger.error("Error loading "+configGroup.name().toLowerCase()+" definition "+id+" [group="+groupId+" file="+fileId+']', ex);
			return null;
		}
	}

	/* (non-Javadoc)
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
	public Iterator<T> iterator() {
		return new ConfigIterator();
	}

}
