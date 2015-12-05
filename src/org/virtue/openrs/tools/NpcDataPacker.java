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
package org.virtue.openrs.tools;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FilenameFilter;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Constants;
import org.virtue.openrs.Archive;
import org.virtue.utility.BufferUtility;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 2/05/2015
 */
public class NpcDataPacker {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NpcDataPacker.class);

	public static File directory = null;
	public static File output = Constants.NPC_DATA;
	
	
	public static void main (String... args) throws IOException {
		if (args.length >= 1) {
			directory = new File(args[0]);
		}
		if (directory == null || !directory.exists()) {
			logger.error("You must provide a directory containing the NPC data as an argument to this program.");
			return;
		}
		FilenameFilter filter = new FilenameFilter () {
			@Override
			public boolean accept(File dir, String name) {
				return name.matches("^\\d*\\.txt$");
			}			
		};
		List<File> allFiles = new ArrayList<>();
		for (File file : directory.listFiles()) {
			if (file.isDirectory()) {
				allFiles.addAll(Arrays.asList(file.listFiles(filter)));
			}
		}
		int size = allFiles.size();
		if (size == 0) {
			logger.error("No npc files were found!");
			return;
		}
		logger.info("Found data for "+size+" NPCs.");
		List<Integer> indicies = new ArrayList<>();
		Archive archive = new Archive(size);
		int pos = 0;
		for (File f : allFiles) {
			Map<String, String> npcData = parseData(f);
			int id = Integer.parseInt(npcData.get("id"));
			indicies.add(id);
			ByteBuffer buffer = ByteBuffer.wrap(encode(npcData));
			archive.putEntry(pos, buffer);
			pos++;
		}
		logger.info("Finished reading unpacked data.");
		try (DataOutputStream writer = new DataOutputStream(new FileOutputStream(output))) {
			writer.writeInt(size);
			for (int index : indicies) {
				writer.writeInt(index);
			}
			ByteBuffer data = archive.encode();
			writer.write(data.array());
		}
		logger.info("Successfully packed data for "+size+" NPCs to file "+output.getAbsolutePath()+".");
	}
	
	public static Map<String, String> parseData (File file) throws IOException {
		Map<String, String> data = new HashMap<>();
		try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
			while (reader.ready()) {
				String line = reader.readLine();
				String[] params = line.split("=", 2);
				if (params[0].equalsIgnoreCase("animations")) {
					String[] anims = params[1].replace('{', ' ').replace('}', ' ').split(",");
					for (String anim : anims) {
						String[] keyval = anim.split(":");
						if (keyval[0].trim().equalsIgnoreCase("attack")) {
							data.put("anim_attack", keyval[1].trim());
						} else if (keyval[0].trim().equalsIgnoreCase("death")) {
							data.put("anim_death", keyval[1].trim());
						}
					}
					
				} else {
					data.put(params[0].trim(), params[1].trim());
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
	public static byte[] encode (Map<String, String> data) throws IOException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		DataOutputStream buffer = new DataOutputStream(stream);
		for (Map.Entry<String, String> entry : data.entrySet()) {
			encode(buffer, entry.getKey(), entry.getValue());
		}
		buffer.writeByte(0);
		return stream.toByteArray();
	}
	
	/**
	 * Encodes a single entry within the NpcType config
	 * @param buffer The buffer to pack data into
	 * @param param The name of the param to encode
	 * @param value The value to encode
	 * @throws IOException If something goes wrong in the encoding process
	 */
	private static void encode (DataOutputStream buffer, String param, String value) throws IOException {
		/********************Known Opcodes********************/
		if ("name".equalsIgnoreCase(param)) {
			buffer.writeByte(2);
			BufferUtility.writeString(buffer, value);
		} else if ("description".equalsIgnoreCase(param) || "desc".equalsIgnoreCase(param)) {
			buffer.writeByte(3);
			BufferUtility.writeString(buffer, value);
		} else if ("size".equalsIgnoreCase(param)) {
			buffer.writeByte(12);
			buffer.writeByte(Integer.parseInt(value));
		} else if ("level".equalsIgnoreCase(param)) {
			buffer.writeByte(95);
			buffer.writeShort(Integer.parseInt(value));
		/********************Unknown Opcodes********************/
		} else if ("anim_death".equalsIgnoreCase(param)) {
			buffer.writeByte(15);//Since 14 is (legacy) walk animation, presumably 15 and 16 are attack and death animations
			buffer.writeShort(Integer.parseInt(value));
		} else if ("anim_attack".equalsIgnoreCase(param)) {
			buffer.writeByte(16);
			buffer.writeShort(Integer.parseInt(value));
		} else if ("lifepoints".equalsIgnoreCase(param)) {
			buffer.writeByte(80);//Complete guess, since 80-89 isn't used anywhere
			buffer.writeInt(Integer.parseInt(value));
		} else if ("attack".equalsIgnoreCase(param)) {
			buffer.writeByte(81);
			buffer.writeByte(Integer.parseInt(value));
		} else if ("defence".equalsIgnoreCase(param)) {
			buffer.writeByte(82);
			buffer.writeByte(Integer.parseInt(value));
		} else if ("ranged".equalsIgnoreCase(param)) {
			buffer.writeByte(83);
			buffer.writeByte(Integer.parseInt(value));
		} else if ("magic".equalsIgnoreCase(param)) {
			buffer.writeByte(84);
			buffer.writeByte(Integer.parseInt(value));
		}
	}
}
