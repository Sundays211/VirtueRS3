/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
package org.virtue.config.objtype;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.cache.Archive;
import org.virtue.cache.Cache;
import org.virtue.config.ExternalConfigDecoder;
import org.virtue.config.Js5Archive;
import org.virtue.config.Js5ConfigGroup;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 22/10/2014
 */
public class ObjTypeList extends ExternalConfigDecoder<ObjType> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger LOGGER = LoggerFactory.getLogger(ObjTypeList.class);

	public ObjTypeList(Cache cache, File customDataFile) throws IOException {
		super(cache, Js5Archive.CONFIG_OBJ, Js5ConfigGroup.OBJTYPE, ObjType.class);
		LOGGER.info("Found "+getCapacity()+" objtypes definitions.");
		
		if (customDataFile.exists()) {
			try {
				loadObjData(customDataFile);
			} catch (IOException ex) {
				LOGGER.error("Failed to load custom objtype data", ex);
			}
		} else {
			LOGGER.warn("No custom objtype data file was found. Please add this file at "
					+customDataFile+" to load weights and descriptions for items.");
		}
	}
	
	private Archive objDataArchive;
	private int[] objDataIndicies;

	/*
	 * (non-Javadoc)
	 * @see org.virtue.config.ExternalConfigDecoder#load(java.lang.Integer)
	 */
	@Override
	public ObjType load(Integer id) throws Exception {
		ByteBuffer data = getData(id);
		if (data == null) {
			return null;
		}
		ObjType objType = new ObjType(id, this);
		if (objDataIndicies != null && objDataArchive != null) {
			int index = objDataIndicies[id];
			if (index != -1) {
				ByteBuffer extraData = objDataArchive.getEntry(index);
				objType.decode(extraData);
			}
		}
		objType.decode(data);
		return objType;
	}
	
	/**
	 * Fetches the extra object config from the specified file
	 * @param extraDataFile The File to fetch data from
	 * @throws IOException If there was an issue while reading the file
	 */
	private void loadObjData (File extraDataFile) throws IOException {
		try (DataInputStream reader = new DataInputStream(new FileInputStream(extraDataFile))) {
			int capacity = reader.readInt();
			objDataIndicies = new int[getCapacity()];
			Arrays.fill(objDataIndicies, -1);
			for (int index = 0; index < capacity; index++) {
				int objId = reader.readInt();
				if (objId < getCapacity()) {
					objDataIndicies[objId] = index;
				}
			}
			byte[] data = new byte[reader.available()];
			reader.read(data);
			ByteBuffer buffer = ByteBuffer.wrap(data);
			objDataArchive = Archive.decode(buffer, capacity);
			LOGGER.info("Loaded data for "+capacity+" objtypes.");
		}
	}
}
