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
package org.virtue.config.npctype;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.ConfigProvider;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.config.ExternalConfigDecoder;
import org.virtue.config.Js5Archive;
import org.virtue.config.Js5ConfigGroup;
import org.virtue.config.vartype.VarDomain;
import org.virtue.config.vartype.VarDomainType;
import org.virtue.config.vartype.VarType;
import org.virtue.config.vartype.bit.VarBitType;
import org.virtue.game.entity.npc.CustomNpcData;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 14/11/2014
 */
public class NpcTypeList extends ExternalConfigDecoder<NpcType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NpcTypeList.class);	
	
	private Archive npcDataArchive;
	private int[] npcDataIndicies;
	private CustomNpcData[] nonCacheData;

	public NpcTypeList(Cache cache, File customDataFile) throws IOException {
		super(cache, Js5Archive.CONFIG_NPC, Js5ConfigGroup.NPCTYPE, NpcType.class);
		logger.info("Found " + getCapacity() + " npctype definitions.");

		nonCacheData = new CustomNpcData[getCapacity()];
		if (customDataFile.exists()) {
			try {
				loadNpcData(customDataFile);
			} catch (IOException ex) {
				logger.error("Failed to load custom npctype data", ex);
			}
		} else {
			logger.warn("No custom npctype data file was found. Please add this file at "
					+ customDataFile + " to load animations and descriptions for NPCs.");
		}
	}

	/**
	 * Fetches the extra npc config from the specified file
	 * 
	 * @param extraDataFile The File to fecth data from
	 * @throws IOException If there was an issue while reading the file
	 */
	private void loadNpcData(File extraDataFile) throws IOException {
		try (DataInputStream reader = new DataInputStream(new FileInputStream(extraDataFile))) {
			int capacity = reader.readInt();
			npcDataIndicies = new int[getCapacity()];
			Arrays.fill(npcDataIndicies, -1);
			for (int index = 0; index < capacity; index++) {
				int npcId = reader.readInt();
				if (npcId < getCapacity()) {
					npcDataIndicies[npcId] = index;
				}
			}
			byte[] data = new byte[reader.available()];
			reader.read(data);
			ByteBuffer buffer = ByteBuffer.wrap(data);
			npcDataArchive = Archive.decode(buffer, capacity);
			logger.info("Loaded data for " + capacity + " npctypes.");
		}
	}

	public void registerCustomData(CustomNpcData data, int npcTypeID) {
		nonCacheData[npcTypeID] = data;
	}

	/*
	 * (non-Javadoc)
	 * @see org.virtue.config.ExternalConfigDecoder#load(java.lang.Integer)
	 */
	@Override
	public NpcType load(Integer id) throws Exception {
		ByteBuffer data = getData(id);
		if (data == null) {
			return null;
		}
		NpcType npcType = new NpcType(id, this);
		if (npcDataIndicies != null && npcDataArchive != null) {
			int index = npcDataIndicies[id];
			if (index != -1) {
				ByteBuffer extraData = npcDataArchive.getEntry(index);
				npcType.decode(extraData);
			}
		}
		npcType.decode(data);
		return npcType;
	}

	public CustomNpcData getCustomData(int npcTypeID) {
		return nonCacheData[npcTypeID];
	}
	
	public NpcType getMultiNPC(VarDomain domain, ConfigProvider configProvider, int baseID) {
		int newID = -1;
		int slot = -1;
		NpcType base = list(baseID);
		if (base == null || base.multiNPCs == null) {
			return base;
		}
		if (base.multiNPCVarp != -1) {
			VarType varType = configProvider.getVarTypes(VarDomainType.PLAYER).list(base.multiNPCVarp);
			slot = domain.getVarValueInt(varType);
		} else if (base.multiNPCVarbit != -1) {
			VarBitType varBitType = configProvider.getVarBitTypes().list(base.multiNPCVarbit);
			slot = domain.getVarBitValue(varBitType);
		}
		if (slot < 0 || slot >= base.multiNPCs.length - 1) {
			newID = base.multiNPCs[base.multiNPCs.length - 1];
		} else {
			newID = base.multiNPCs[slot];
		}
		return newID == -1 ? null : list(newID);
	}
}
