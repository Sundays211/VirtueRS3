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
package org.virtue.config;

import java.nio.ByteBuffer;
import java.util.Iterator;
import java.util.concurrent.ExecutionException;

import org.virtue.cache.Archive;
import org.virtue.cache.ReferenceTable;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 21/11/2015
 */
public abstract class ConfigDecoder<T extends ConfigType> implements Iterable<T> {
	
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
			do {
				pointer++;
			} while (!exists(pointer-1));
			return list(pointer-1);
		}
	}
	
	private Cache<Integer, T> configCache = CacheBuilder.newBuilder().softValues().build();
	private int num;
	private ReferenceTable index;
	private Archive dataArchive;
	private Js5ConfigGroup configGroup;
	private Class<? extends ConfigType> configClass;

	public ConfigDecoder(ReferenceTable index, Archive archive, Js5ConfigGroup group, Class<? extends ConfigType> configClass) {
		this.index = index;
		this.dataArchive = archive;
		this.configGroup = group;
		this.num = index.getEntry(group.id).capacity();
		this.configClass = configClass;
	}
	
	public int getCapacity () {
		return num;
	}
	
	public boolean exists (int id) {
		if (id < 0 || id >= num) {
			return false;
		}
		return index.getEntry(configGroup.id, id) != null;
	}
	
	public T list (int id) {
		try {
			return configCache.get(id, () -> load(id));
		} catch (ExecutionException ex) {
			throw new RuntimeException("Error loading "+configGroup.name().toLowerCase()+" definition "+id, ex);
		}
	}

	@SuppressWarnings("unchecked")
	protected T load(int id) throws Exception {
		ByteBuffer data = getData(id);
		if (data == null) {
			throw new ConfigNotFoundException(configGroup, id);
		}
		ConfigType type = configClass.getDeclaredConstructor(Integer.TYPE, getClass()).newInstance(id, this);
		type.decode(data);
		type.postDecode();
		return (T) type;
	}
	
	protected ByteBuffer getData (int id) {
		ReferenceTable.ChildEntry entry = index.getEntry(configGroup.id, id);
		if (entry == null) {
			throw new ConfigNotFoundException(configGroup, id);
		}
		return dataArchive.getEntry(entry.index());
	}

	/* (non-Javadoc)
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
	public Iterator<T> iterator() {
		return new ConfigIterator();
	}

}
