/**
 * Copyright (c) 2014 Virtue Studios
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
package org.virtue.cache.def;

import java.nio.ByteBuffer;
import java.util.Iterator;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;
import org.virtue.config.ConfigType;
import org.virtue.config.Js5ConfigGroup;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 21/11/2015
 */
public abstract class ConfigDecoder<T extends ConfigType> extends CacheLoader<Integer, T> implements Iterable<T> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ConfigDecoder.class);
	
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
	
	private LoadingCache<Integer, T> configCache = CacheBuilder.newBuilder().softValues().build(this);
	private int num;
	private ReferenceTable referenceTable;
	private Archive dataArchive;
	private Js5ConfigGroup configGroup;
	private Class<? extends ConfigType> configClass;

	/**
	 * 
	 */
	public ConfigDecoder(ReferenceTable configTable, Archive archive, Js5ConfigGroup group, Class<? extends ConfigType> configClass) {
		this.referenceTable = configTable;
		this.dataArchive = archive;
		this.configGroup = group;
		this.num = configTable.getEntry(group.id).capacity();
		this.configClass = configClass;
	}
	
	public int getCount () {
		return num;
	}
	
	private boolean exists (int id) {
		if (id < 0 || id >= num) {
			return false;
		}
		return referenceTable.getEntry(configGroup.id, id) != null;
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
		ByteBuffer data = dataArchive.getEntry(referenceTable.getEntry(configGroup.id, id).index());
		if (data == null) {
			return null;
		}
		ConfigType type = configClass.getDeclaredConstructor(Integer.TYPE, getClass()).newInstance(id, this);
		type.decode(data);
		type.postDecode();
		return (T) type;
	}

	/* (non-Javadoc)
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
	public Iterator<T> iterator() {
		return new ConfigIterator();
	}

}
