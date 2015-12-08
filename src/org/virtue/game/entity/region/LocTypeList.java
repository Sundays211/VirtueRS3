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
package org.virtue.game.entity.region;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.cache.def.impl.Js5Archive;
import org.virtue.cache.def.impl.Js5ConfigGroup;
import org.virtue.cache.def.impl.LocType;
import org.virtue.game.entity.player.Player;

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
public class LocTypeList extends CacheLoader<Integer, LocType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(LocTypeList.class);

	/**
	 * The {@link LocTypeList} Instance
	 */
	private static LocTypeList instance;
	
	public static void init (Cache cache) {
		instance = new LocTypeList();
		instance.cache = cache;
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG_LOC.getArchiveId()));
			instance.referenceTable = ReferenceTable.decode(container.getData());
			int groupCount = instance.referenceTable.size() - 1;
			instance.num = (groupCount * Js5ConfigGroup.LOCTYPE.getGroupSize()) + instance.referenceTable.getEntry(groupCount).size();
			//cachedLocs = new LocType[instance.num];
			logger.info("Found "+instance.num+" loctype definitions.");
		} catch (IOException ex) {
			logger.error("Failed to load loctype definitions", ex);
		}
	}

	public static LocType list (int id) {
		synchronized (instance) {
			try {
				return instance.cachedLocs.get(id);
			} catch (ExecutionException ex) {
				logger.error("Error loading loctype definition "+id, ex);
				return null;
			}
		}
	}
	
	/**
	 * Returns the location type of a transformable location
	 * @param player The player to base the transformation off
	 * @param baseID The ID of the base location
	 * @return The transformed object
	 */
	public static LocType getTransformed (Player player, int baseID) {
		int newID = -1;
		int slot = -1;
		LocType base = list(baseID);
		if (base == null || base.transforms == null) {
			return base;
		}
		if (base.transVar != -1) {
			slot = player.getVars().getVarValueInt(base.transVar);
		} else if (base.transVarBit != -1) {
			slot = player.getVars().getVarBitValue(base.transVarBit);
		}
		if (slot < 0 || slot >= base.transforms.length - 1) {
			newID = base.transforms[base.transforms.length-1];
		} else {
			newID = base.transforms[slot];
		}
		return newID == -1 ? null : list(newID);
	}

	/**
	 * A {@link LoadingCache} containing recently used archives
	 */
	private LoadingCache<Integer, Archive> archiveCache = CacheBuilder.newBuilder()
			.softValues().build(new CacheLoader<Integer, Archive>() {
	             public Archive load(Integer groupId) throws IOException {
	                 return Archive.decode(
	 						cache.read(Js5Archive.CONFIG_LOC.getArchiveId(), groupId).getData(), 
							referenceTable.getEntry(groupId).size());
	               }
	             });
	private LoadingCache<Integer, LocType> cachedLocs = CacheBuilder.newBuilder().softValues().build(this);
	private int num;
	private ReferenceTable referenceTable;	
	private Cache cache;
	
	private LocTypeList () {
		//Prevent direct instantiation
	}

	/* (non-Javadoc)
	 * @see com.google.common.cache.CacheLoader#load(java.lang.Object)
	 */
	@Override
	public LocType load(Integer id) throws Exception {
		ByteBuffer data = getData(id);
		if (data == null) {
			return null;
		}
		LocType locType = LocType.load(id, data);
		runPostDecode(locType);
		return locType;
	}
	
	private ByteBuffer getData (int id) {
		int groupId = Js5ConfigGroup.LOCTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.LOCTYPE.getClientFileId(id);
		try {
			if (referenceTable.getEntry(groupId, fileId) == null) {
				logger.warn("Tried to load loctype "+id+" which does not exist!");
				return null;
			}
			return archiveCache.get(groupId).getEntry(referenceTable.getEntry(groupId, fileId).index());
		} catch (RuntimeException | ExecutionException ex) {
			logger.error("Error loading loctype definition "+id+" [group="+groupId+" file="+fileId+']', ex);
			return null;
		}
	}
	
	private void runPostDecode (LocType locType) {
		if (locType.interactable == -1) {
			locType.interactable = 0;
		    if (locType.nodeTypes != null && 1 == locType.nodeTypes.length && (locType.nodeTypes[0] == 10)) {
		    	locType.interactable = 1;
		    }
		    for (int slot = 0; slot < 5; slot++) {
				if (null != locType.op[slot]) {
					locType.interactable = 1;
				    break;
				}
		    }
		}
		if (-1 == locType.supportItems) {
			locType.supportItems = (locType.clipType != 0 ? 1 : 0);
		}
		if (locType.hasAnimation || locType.transforms != null) {
			locType.aBool7421 = true;
		}
		if (locType.allowInteract) {
			locType.clipType = 0;
		}
	}
}
