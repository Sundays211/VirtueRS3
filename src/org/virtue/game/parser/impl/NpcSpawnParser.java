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
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.World;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.world.region.Tile;
import org.virtue.game.world.region.movement.Direction;

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
	
	private static File PATH = new File("repository/npc/NPCSpawns.txt");
	
	public static void loadNpcs ()  {
		try (BufferedReader reader = new BufferedReader(new FileReader(PATH))) {
			String line;
			while ((line = reader.readLine()) != null) {
				if (line.startsWith("//") || line.trim().isEmpty()) {
					continue;
				}
				String[] split = line.split(" - ");
				int npcID = Integer.valueOf(split[0]);
				String[] location = split[1].split(" ");
				int direction = -1;
				if (location.length > 3 && !location[3].trim().isEmpty()) {
					try {
						direction = Integer.valueOf(location[3]);
					} catch (NumberFormatException ex) {
						direction = -1;
					}
				}
				NPC npc = NPC.create(npcID, new Tile(Integer.valueOf(location[0]), Integer.valueOf(location[1]), Integer.valueOf(location[2])));
				if (direction != -1) {
					npc.setDirection(Direction.forID(direction));
				}
				World.getInstance().addNPC(npc);
			}
		} catch (IOException ex) {
			logger.error("Error loading NPC spawns", ex);
			return;
		}
		logger.info("Spawned "+World.getInstance().getNPCs().size()+" NPCs");
	}
}
