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
package org.virtue.utility.text;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.cache.def.impl.QuickChatPhraseType;
import org.virtue.config.Js5Archive;
import org.virtue.config.loctype.LocTypeList;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/07/2015
 */
public class QuickChatPhraseTypeList extends CacheLoader<Integer, QuickChatPhraseType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(QuickChatPhraseTypeList.class);

	/**
	 * The {@link LocTypeList} Instance
	 */
	private static QuickChatPhraseTypeList instance;
	
	public static void init (Cache cache) {
		instance = new QuickChatPhraseTypeList();
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.QUICKCHAT.getArchiveId()));
			instance.index = ReferenceTable.decode(container.getData());
			
			container = Container.decode(cache.getStore().read(255, Js5Archive.QUICKCHAT_GLOBAL.getArchiveId()));
			instance.globalIndex = ReferenceTable.decode(container.getData());
			
			int phraseCount = instance.index.getEntry(1).size();
			instance.phrases = Archive.decode(cache.read(Js5Archive.QUICKCHAT.getArchiveId(), 1).getData(), phraseCount);
			
			int gloalPhraseCount = instance.globalIndex.getEntry(1).size();
			instance.globalPhrases = Archive.decode(cache.read(Js5Archive.QUICKCHAT_GLOBAL.getArchiveId(), 1).getData(), gloalPhraseCount);
			
			logger.info("Found "+phraseCount+" quickchat and "+gloalPhraseCount+" global quickchat phrases.");
		} catch (IOException ex) {
			logger.error("Failed to load quickchat phrases", ex);
		}
	}

	public static QuickChatPhraseType list (int id) {
		synchronized (instance) {
			try {
				return instance.cachedPhrases.get(id);
			} catch (ExecutionException ex) {
				logger.error("Error loading quickchat phrase "+id, ex);
				return null;
			}
		}
	}
	
	private LoadingCache<Integer, QuickChatPhraseType> cachedPhrases = CacheBuilder.newBuilder().softValues().build(this);
	private ReferenceTable index;	
	private ReferenceTable globalIndex;
	private Archive phrases;	
	private Archive globalPhrases;
	
	private QuickChatPhraseTypeList () {
		//Prevent direct instantiation
	}

	/* (non-Javadoc)
	 * @see com.google.common.cache.CacheLoader#load(java.lang.Object)
	 */
	@Override
	public QuickChatPhraseType load(Integer id) throws Exception {
		ByteBuffer buffer;
		if (id >= 0x8000) {
			ReferenceTable.ChildEntry entry = globalIndex.getEntry(1, id & 0x7fff);
			if (entry == null) {
				throw new FileNotFoundException("Entry not found for global quickchat phrase "+(id & 0x7fff));
			}
			buffer = globalPhrases.getEntry(entry.index());
		} else {
			ReferenceTable.ChildEntry entry = index.getEntry(1, id);
			if (entry == null) {
				throw new FileNotFoundException("Entry not found for quickchat phrase "+id);
			}
			buffer = phrases.getEntry(entry.index());
		}	
		if (buffer == null) {
			throw new IOException("Entry exists but data not found for quickchat phrase "+id);
		}
		return QuickChatPhraseType.load(id, buffer);
	}

}
