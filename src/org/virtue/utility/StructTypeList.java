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
package org.virtue.utility;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.ByteBuffer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.openrs.Archive;
import org.virtue.openrs.Cache;
import org.virtue.openrs.Container;
import org.virtue.openrs.ReferenceTable;
import org.virtue.openrs.ReferenceTable.ChildEntry;
import org.virtue.openrs.ReferenceTable.Entry;
import org.virtue.openrs.def.impl.Js5Archive;
import org.virtue.openrs.def.impl.Js5ConfigGroup;
import org.virtue.openrs.def.impl.StructType;
import org.virtue.openrs.utility.ByteBufferUtils;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 4/12/2014
 */
public class StructTypeList {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(StructTypeList.class);
	
	private static StructType[] cachedStructs;
	private static ReferenceTable referenceTable;	
	private static Archive[] cachedArchives;
	private static Cache cache;
	
	public static void init (Cache cache) {
		StructTypeList.cache = cache;
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG_STRUCT.getArchiveId()));
			referenceTable = ReferenceTable.decode(container.getData());
			int groupCount = referenceTable.size() - 1;
			cachedStructs = new StructType[(groupCount * Js5ConfigGroup.STRUCTTYPE.getGroupSize()) + referenceTable.getEntry(groupCount).size()];
			cachedArchives = new Archive[groupCount + 1];
			logger.info("Found "+cachedStructs.length+" structtype definitions.");
		} catch (IOException ex) {
			logger.error("Failed to load structtype definitions", ex);
		}
	}

	public static StructType list (int id) {
		synchronized (cachedStructs) {
			if (cachedStructs[id] == null) {
				ByteBuffer data = getData(id);
				if (data == null) {
					return null;
				}
				cachedStructs[id] = StructType.decode(data, id);
				//runPostDecode(cachedObjects[id]);
			}		
			return cachedStructs[id];
		}
	}
	
	/**
	 * Dumps the enum type info.
	 * @throws Throwable When an exception occurs.
	 */
	public static void dump() throws Throwable {
		BufferedWriter bw = new BufferedWriter(new FileWriter("z835_struct_list.txt"));
		for (int i = 0; i < cachedStructs.length; i++) {
			StructType type = list(i);
			if (type == null) {
				continue;
			}
			if (type.getValueMap() == null) {
				continue;
			}
			bw.append("struct id: " + i);
			bw.newLine();
			
			for (int id : type.getValueMap().keySet()) {
				bw.append(id + ": " + type.getValueMap().get(id));
				bw.newLine();
			}
			bw.append("");
			bw.newLine();
			bw.append("-------------------------------------------------------");
			bw.newLine();
		}
		bw.flush();
		bw.close();
	}
	
	public static void write(StructType type) throws Exception {
		/** Calculates group and file ids */
		int groupId = Js5ConfigGroup.STRUCTTYPE.getClientGroupId(type.getId());
		int fileId = Js5ConfigGroup.STRUCTTYPE.getClientFileId(type.getId());
		
		/** Puts the new StructType into the cached archives */
		cachedArchives[groupId].putEntry(type.getId(), type.encode());		
		
		/** Grabs the old group container */
		Container container = cache.read(Js5Archive.CONFIG_STRUCT.getArchiveId(), groupId);
		/** Creates a new container for the group */
		Container newContainer = new Container(container.getType(), cachedArchives[groupId].encode(), container.getVersion());
		/** Creates the new buffer for the container */
		ByteBuffer newBuffer = newContainer.encode();
		
		/** As the last two bytes are for the version, and should not be included to CRC/Whirlpool Digests */
		ByteBuffer buffer = ByteBuffer.wrap(ByteBufferUtils.toByteArray(newContainer.encode(), newBuffer.limit() - 2));
		
		/** Grabs the old entries */
		Entry parent = referenceTable.getEntry(groupId);
		ChildEntry child = referenceTable.getEntry(groupId, fileId);
		
		/** Used to update the previously decoded reference table with the new values */
		Entry newParent = new Entry(parent.index());
		ChildEntry newChild = new ChildEntry(child.index());
		
		/** Set the old identifiers, as we arent changing that */
		newChild.setIdentifier(child.getIdentifier());	
		newParent.setIdentifier(parent.getIdentifier());
		
		/** Set the version as the current timestamp (new format for versions) */
		newParent.setVersion(TimeUtility.getUnixTimeSeconds());
		
		/** Calculate new CRC32 and Whirlpool Digests */
		newParent.setCrc(ByteBufferUtils.getCrcChecksum(buffer));
		newParent.setWhirlpool(ByteBufferUtils.getWhirlpoolDigest(buffer));
		
		/** Put the Entries into the reference table */
		newParent.putEntry(fileId, newChild);
		referenceTable.putEntry(groupId, newParent);
		
		/** Finally, update the group itself in the cache */
		cache.write(Js5Archive.CONFIG_STRUCT.getArchiveId(), groupId, newContainer);
	}
	
	private static ByteBuffer getData (int id) {
		int groupId = Js5ConfigGroup.STRUCTTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.STRUCTTYPE.getClientFileId(id);
		try {
			if (referenceTable.getEntry(groupId, fileId) == null) {
				logger.warn("Tried to load struct "+id+" which does not exist!");
				return null;
			}
			if (cachedArchives[groupId] == null) {
				cachedArchives[groupId] = Archive.decode(
						cache.read(Js5Archive.CONFIG_STRUCT.getArchiveId(), groupId).getData(), 
						referenceTable.getEntry(groupId).size());
				
			}
			return cachedArchives[groupId].getEntry(referenceTable.getEntry(groupId, fileId).index());
		} catch (IOException | RuntimeException ex) {
			logger.error("Error loading structtype definition "+id+" [group="+groupId+" file="+fileId+']', ex);
			return null;
		}
	}

}
