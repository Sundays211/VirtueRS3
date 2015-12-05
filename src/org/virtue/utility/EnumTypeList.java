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
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.openrs.Archive;
import org.virtue.openrs.Cache;
import org.virtue.openrs.Container;
import org.virtue.openrs.ReferenceTable;
import org.virtue.openrs.def.impl.EnumType;
import org.virtue.openrs.def.impl.Js5Archive;
import org.virtue.openrs.def.impl.Js5ConfigGroup;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 19/11/2014
 */
public class EnumTypeList {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(EnumTypeList.class);
	
	private static Map<Integer, EnumType> cachedEnums;
	private static ReferenceTable referenceTable;	
	private static Archive[] cachedArchives;
	private static Cache cache;
	private static int num;
	
	public static void init (Cache cache) {
		EnumTypeList.cache = cache;
		try {
			Container container = Container.decode(cache.getStore().read(255, Js5Archive.CONFIG_ENUM.getArchiveId()));
			referenceTable = ReferenceTable.decode(container.getData());
			int groupCount = referenceTable.size() - 1;
			num = (groupCount * Js5ConfigGroup.ENUMTYPE.getGroupSize()) + referenceTable.getEntry(groupCount).size();
			cachedEnums = Collections.synchronizedMap(new HashMap<Integer, EnumType>());
			//cachedEnums = new EnumType[(groupCount * Js5ConfigGroup.ENUMTYPE.getGroupSize()) + referenceTable.getEntry(groupCount).size()];
			cachedArchives = new Archive[groupCount + 1];
			logger.info("Found "+num+" enumtype definitions.");
		} catch (IOException ex) {
			logger.error("Failed to load enumtype definitions", ex);
		}
	}

	/**
	 * Dumps the enum type info.
	 * @throws Throwable When an exception occurs.
	 */
	public static void dump() throws Throwable {
		BufferedWriter bw = new BufferedWriter(new FileWriter("z835_enum_list.txt"));
		for (int i = 0; i < 50000; i++) {
			EnumType type = list(i);
			if (type == null) {
				continue;
			}
			if (type.getValueMap() == null) {
				continue;
			}
			bw.append("enum id: " + i + " - size: " + type.getSize());
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
	
	public static EnumType list (int id) {		
		if (cachedEnums.get(id) == null) {
				ByteBuffer data = getData(id);
				if (data == null) {
					return null;
				}
				cachedEnums.put(id, EnumType.decode(data, id));
				//runPostDecode(cachedObjects[id]);
		}		
		return cachedEnums.get(id);
	}
	
	private static ByteBuffer getData (int id) {
		int groupId = Js5ConfigGroup.ENUMTYPE.getClientGroupId(id);
		int fileId = Js5ConfigGroup.ENUMTYPE.getClientFileId(id);
		try {
			if (referenceTable.getEntry(groupId, fileId) == null) {
				logger.warn("Tried to load enum "+id+" which does not exist!");
				return null;
			}
			if (cachedArchives[groupId] == null) {
				cachedArchives[groupId] = Archive.decode(
						cache.read(Js5Archive.CONFIG_ENUM.getArchiveId(), groupId).getData(), 
						referenceTable.getEntry(groupId).size());
				
			}
			return cachedArchives[groupId].getEntry(referenceTable.getEntry(groupId, fileId).index());
		} catch (IOException | RuntimeException ex) {
			logger.error("Error loading enumtype definition "+id+" [group="+groupId+" file="+fileId+']', ex);
			return null;
		}
	}

}
