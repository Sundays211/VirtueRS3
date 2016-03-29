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
package org.virtue.config.seqtype;

import java.io.IOException;
import java.nio.ByteBuffer;
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
 * @since 29/10/2014
 */
public class SeqTypeList extends CacheLoader<Integer, SeqType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(SeqTypeList.class);

	/**
	 * The {@link SeqTypeList} Instance
	 */
	private static SeqTypeList instance;
	
	public static void init (Cache cache, SeqGroupTypeList seqGroupTypeList) {
		instance = new SeqTypeList();
		instance.cache = cache;
		instance.seqGroupTypeList = seqGroupTypeList;
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG_SEQ.getArchiveId()));
			instance.referenceTable = ReferenceTable.decode(container.getData());
			int groupCount = instance.referenceTable.size() - 1;
			instance.num = (groupCount * Js5ConfigGroup.SEQTYPE.getGroupSize()) + instance.referenceTable.getEntry(groupCount).size();
			logger.info("Found "+instance.num+" seqtype definitions.");
		} catch (IOException ex) {
			logger.error("Failed to load seqtype definitions", ex);
		}
	}

	public static SeqType list (int id) {
		synchronized (instance) {
			try {
				return instance.cachedLocs.get(id);
			} catch (ExecutionException ex) {
				logger.error("Error loading seqtype definition "+id, ex);
				return null;
			}
		}
	}

	/**
	 * A {@link LoadingCache} containing recently used archives
	 */
	private LoadingCache<Integer, Archive> archiveCache = CacheBuilder.newBuilder()
			.softValues().build(new CacheLoader<Integer, Archive>() {
	             public Archive load(Integer groupId) throws IOException {
	                 return Archive.decode(
	 						cache.read(Js5Archive.CONFIG_SEQ.getArchiveId(), groupId).getData(), 
							referenceTable.getEntry(groupId).size());
	               }
	             });
	private LoadingCache<Integer, SeqType> cachedLocs = CacheBuilder.newBuilder().softValues().build(this);
	private int num;
	private ReferenceTable referenceTable;	
	private Cache cache;
	
	protected SeqGroupTypeList seqGroupTypeList;
	
	private SeqTypeList () {
		//Prevent direct instantiation
	}

	/* (non-Javadoc)
	 * @see com.google.common.cache.CacheLoader#load(java.lang.Object)
	 */
	@Override
	public SeqType load(Integer id) throws Exception {
		ByteBuffer data = getData(id);
		if (data == null) {
			return null;
		}
		SeqType seqType = new SeqType(id, this);
		seqType.decode(data);
		seqType.postDecode();
		return seqType;
	}
	
	private ByteBuffer getData (int id) {
		int groupId = Js5ConfigGroup.SEQTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.SEQTYPE.getClientFileId(id);
		try {
			if (referenceTable.getEntry(groupId, fileId) == null) {
				logger.warn("Tried to load seqtype "+id+" which does not exist!");
				return null;
			}
			return archiveCache.get(groupId).getEntry(referenceTable.getEntry(groupId, fileId).index());
		} catch (RuntimeException | ExecutionException ex) {
			logger.error("Error loading seqtype definition "+id+" [group="+groupId+" file="+fileId+']', ex);
			return null;
		}
	}
}
