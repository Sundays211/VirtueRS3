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
package org.virtue.game.parser.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.World;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.map.CoordGrid;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 15/11/2014
 */
public class NpcSpawnParser {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NpcSpawnParser.class);
	
	private static File OLD_PATH = new File("repository/npc/NPCSpawns.txt");
	
	private static File PATH = new File("data/npc-spawns.txt");
	
	public static void main(String[] args) throws Exception {
		//Converts the old format of npc spawns into the new format
		splitSpawns();
	}

	public static void splitSpawns () throws IOException {
		File root = new File("data/raw/map");
		Map<Integer, List<String>> spawnsForSquare = new HashMap<>();
		try (BufferedReader reader = new BufferedReader(new FileReader(PATH))) {
			String line;
			while ((line = reader.readLine()) != null) {
				if (!line.startsWith("//") && !line.trim().isEmpty()) {
					String[] split = line.split(" - ");
					int npcID = Integer.valueOf(split[0]);
					CoordGrid coord = CoordGrid.parse(split[1]);
					int mapSquareHash = coord.getRegionID();
					if (!spawnsForSquare.containsKey(mapSquareHash)) {
						spawnsForSquare.put(mapSquareHash, new ArrayList<>());
					}
					String spawnLine = npcID+" - "+coord.getLevel()+","+coord.getXInRegion()+","+coord.getYInRegion();//+" //"+line;
					spawnsForSquare.get(mapSquareHash).add(spawnLine);
				}
			}
		}
		for (Map.Entry<Integer, List<String>> entry : spawnsForSquare.entrySet()) {
			int squareX = entry.getKey() >> 8;
			int squareY = entry.getKey() & 0xff;
			File folder = new File(root, String.format("%d/%d", squareX, squareY));
			folder.mkdirs();
			try (PrintWriter writer = new PrintWriter(new FileWriter(new File(folder, "npcs.txt"), false))) {
				writer.println("// NPC Spawns for map square "+squareX+","+squareY);
				writer.println("// Format: npcTypeId - level,localX,localY");
				for (String line : entry.getValue()) {
					writer.println(line);
				}
			}
			logger.info("Wrote {} npc spawns for map square {},{}", entry.getValue().size(), squareX, squareY);
		}
	}

	public static void convertNpcs () throws IOException {
		try (BufferedReader reader = new BufferedReader(new FileReader(OLD_PATH));
				PrintWriter writer = new PrintWriter(new FileWriter(PATH, false))) {
			String line;
			while ((line = reader.readLine()) != null) {
				if (!line.startsWith("//") && !line.trim().isEmpty()) {
					String[] split = line.split(" - ");
					int npcID = Integer.valueOf(split[0]);
					String[] location = split[1].split(" ");
					CoordGrid coords = new CoordGrid(Integer.valueOf(location[0]), Integer.valueOf(location[1]), Integer.valueOf(location[2]));
					line = npcID+" - "+coords;
				}
				
				writer.write(line+"\n");
			}
		}
	}
	
	public static void loadNpcs ()  {
		try (BufferedReader reader = new BufferedReader(new FileReader(PATH))) {
			String line;
			while ((line = reader.readLine()) != null) {
				if (line.startsWith("//") || line.trim().isEmpty()) {
					continue;
				}
				String[] split = line.split(" - ");
				int npcID = Integer.valueOf(split[0]);
				CoordGrid coord = CoordGrid.parse(split[1]);
				
				NPC npc = NPC.create(npcID, coord);
				World.getInstance().addNPC(npc);
			}
		} catch (IOException ex) {
			logger.error("Error loading NPC spawns", ex);
			return;
		}
		logger.info("Spawned "+World.getInstance().getNPCs().size()+" NPCs");
	}
}
