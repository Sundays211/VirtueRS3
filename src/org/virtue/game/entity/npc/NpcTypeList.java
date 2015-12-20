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
package org.virtue.game.entity.npc;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.cache.Container;
import org.virtue.cache.ReferenceTable;
import org.virtue.cache.config.Js5Archive;
import org.virtue.cache.config.Js5ConfigGroup;
import org.virtue.cache.def.impl.NpcType;
import org.virtue.game.entity.player.Player;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/11/2014
 */
public class NpcTypeList extends CacheLoader<Integer, NpcType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NpcTypeList.class);

	/**
	 * The {@link NpcTypeList} Instance
	 */
	private static NpcTypeList instance;
	
	private static CustomNpcData[] nonCacheData;
	
	public static void init (Cache cache, File customDataFile) {
		instance = new NpcTypeList();
		instance.cache = cache;
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG_NPC.getArchiveId()));
			instance.referenceTable = ReferenceTable.decode(container.getData());
			int groupCount = instance.referenceTable.size() - 1;
			instance.num = (groupCount * Js5ConfigGroup.NPCTYPE.getGroupSize()) + instance.referenceTable.getEntry(groupCount).size();
			logger.info("Found "+instance.num+" npctype definitions.");
			
			nonCacheData = new CustomNpcData[instance.num];			
		} catch (IOException ex) {
			logger.error("Failed to load npctype definitions", ex);
		}
		
		if (customDataFile.exists()) {
			try {
				instance.loadNpcData(customDataFile);
			} catch (IOException ex) {
				logger.error("Failed to load custom npctype data", ex);
			}
		} else {
			logger.warn("No custom npctype data file was found. Please add this file at "+customDataFile+" to load animations and descriptions for NPCs.");
		}
	}

	/**
	 * Retrieves the NpcType config for the npc of the specified id
	 * @param id The ID of the NpcType to look up
	 * @return The NpcType config, or null if the config could not be found
	 */
	public static NpcType list (int id) {
		synchronized (instance) {
			try {
				return instance.cachedNpcs.get(id);
			} catch (ExecutionException ex) {
				logger.error("Error loading npctype definition "+id, ex);
				return null;
			}
		}
	}
	
	/**
	 * Returns the npc type of a transformable npc
	 * @param player The player to base the transformation off
	 * @param baseID The ID of the base object
	 * @return The transformed object
	 */
	public static NpcType getTransformed (Player player, int baseID) {
		int newID = -1;
		int slot = -1;
		NpcType base = list(baseID);
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
	                		 cache.read(Js5Archive.CONFIG_NPC.getArchiveId(), groupId).getData(), 
							referenceTable.getEntry(groupId).size());
	               }
	             });
	private LoadingCache<Integer, NpcType> cachedNpcs = CacheBuilder.newBuilder().softValues().build(this);
	private Cache cache;
	private ReferenceTable referenceTable;
	private Archive npcDataArchive;
	private int[] npcDataIndicies;
	private int num;
	
	private NpcTypeList() {
		//Prevent direct instantiation
	}
	
	/**
	 * Fetches the extra npc config from the specified file
	 * @param extraDataFile The File to fecth data from
	 * @throws IOException If there was an issue while reading the file
	 */
	private void loadNpcData (File extraDataFile) throws IOException {
		try (DataInputStream reader = new DataInputStream(new FileInputStream(extraDataFile))) {
			int capacity = reader.readInt();
			npcDataIndicies = new int[num];
			Arrays.fill(npcDataIndicies, -1);
			for (int index = 0; index < capacity; index++) {
				int npcId = reader.readInt();
				if (npcId < num) {
					npcDataIndicies[npcId] = index;
				}
			}
			byte[] data = new byte[reader.available()];
			reader.read(data);
			ByteBuffer buffer = ByteBuffer.wrap(data);
			npcDataArchive = Archive.decode(buffer, capacity);
			logger.info("Loaded data for "+capacity+" npctypes.");
		}
	}
	
	public static void registerCustomData (CustomNpcData data, int npcTypeID) {
		nonCacheData[npcTypeID] = data;
	}
	
	public static CustomNpcData getCustomData (int npcTypeID) {
		return nonCacheData[npcTypeID];
	}

	/* (non-Javadoc)
	 * @see com.google.common.cache.CacheLoader#load(java.lang.Object)
	 */
	@Override
	public NpcType load(Integer id) throws IOException {
		ByteBuffer data = getData(id);
		if (data == null) {
			return null;
		}
		if (npcDataIndicies != null && npcDataArchive != null) {
			int index = npcDataIndicies[id];
			if (index != -1) {
				ByteBuffer extraData = npcDataArchive.getEntry(index);
				return NpcType.load(id, data, extraData);
			}
		}
		return NpcType.load(id, data);
	}
	
	private ByteBuffer getData (int id) {
		int groupId = Js5ConfigGroup.NPCTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.NPCTYPE.getClientFileId(id);
		try {
			if (referenceTable.getEntry(groupId, fileId) == null) {
				logger.warn("Tried to load npc "+id+" which does not exist!");
				return null;
			}
			return archiveCache.get(groupId).getEntry(referenceTable.getEntry(groupId, fileId).index());
		} catch (RuntimeException | ExecutionException ex) {
			logger.error("Error loading npctype definition "+id+" [group="+groupId+" file="+fileId+']', ex);
			return null;
		}
	}
}
