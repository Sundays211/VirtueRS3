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
package org.virtue.cache.tools;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.cache.Archive;
import org.virtue.utility.BufferUtility;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 20/07/2015
 */
public class ItemDataPacker {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(ItemDataPacker.class);

	public static File input = null;
	public static File output = Constants.ITEM_DATA;
	
	
	public static void main (String... args) throws IOException {
		if (args.length >= 1) {
			input = new File(args[0]);
		}
		if (input == null || !input.exists()) {
			logger.error("You must provide a file containing the item data as an argument to this program.");
			return;
		}
		Map<Integer, ByteBuffer> itemsData = parseData(input);
		logger.info("Found data for "+itemsData.size()+" items.");
		List<Integer> indicies = new ArrayList<>();
		Archive archive = new Archive(itemsData.size());
		int pos = 0;
		for (Map.Entry<Integer, ByteBuffer> item : itemsData.entrySet()) {			
			indicies.add(item.getKey());
			archive.putEntry(pos, item.getValue());
			pos++;
		}
		logger.info("Finished reading unpacked data.");
		try (DataOutputStream writer = new DataOutputStream(new FileOutputStream(output))) {
			writer.writeInt(itemsData.size());
			for (int index : indicies) {
				writer.writeInt(index);
			}
			ByteBuffer data = archive.encode();
			writer.write(data.array());
		}
		logger.info("Successfully packed data for "+itemsData.size()+" items to file "+output.getAbsolutePath()+".");
	}
	
	public static Map<Integer, ByteBuffer> parseData (File file) throws IOException {
		Map<Integer, ByteBuffer> data = new HashMap<>();
		try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
			JsonParser parser = new JsonParser();
			while (reader.ready()) {
				String line = reader.readLine().trim();
				if (!line.equalsIgnoreCase("undefined")) {
					JsonObject obj = parser.parse(line).getAsJsonObject();
					ByteBuffer buffer = ByteBuffer.wrap(encode(obj));
					data.put(obj.get("id").getAsInt(), buffer);
				}
			}
		}
		return data;		
	}
	
	/**
	 * Packs the specified config data into a byte array
	 * @param data The map containing the data
	 * @return A byte array containing the packed data
	 * @throws IOException If something goes wrong in the encoding process
	 */
	public static byte[] encode (JsonObject obj) throws IOException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		DataOutputStream buffer = new DataOutputStream(stream);
		for (Map.Entry<String, JsonElement> entry : obj.entrySet()) {
			encode(buffer, entry.getKey(), entry.getValue());
		}
		buffer.writeByte(0);
		return stream.toByteArray();
	}
	
	/**
	 * Encodes a single entry within the ObjType config
	 * @param buffer The buffer to pack data into
	 * @param param The name of the param to encode
	 * @param value The value to encode
	 * @throws IOException If something goes wrong in the encoding process
	 */
	private static void encode (DataOutputStream buffer, String param, JsonElement value) throws IOException {
		if ("name".equalsIgnoreCase(param)) {
			buffer.writeByte(2);
			BufferUtility.writeString(buffer, value.getAsString());
		} else if ("desc".equalsIgnoreCase(param)) {
			buffer.writeByte(3);
			BufferUtility.writeString(buffer, value.getAsString());
		} else if ("tradeable".equalsIgnoreCase(param) && value.getAsBoolean()) {
			buffer.writeByte(9);
		} else if ("weight".equalsIgnoreCase(param)) {
			buffer.writeByte(10);
			buffer.writeShort(value.getAsShort());
		}
	}
}
