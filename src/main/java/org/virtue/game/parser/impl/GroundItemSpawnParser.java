package org.virtue.game.parser.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.World;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.GroundItem;
import org.virtue.game.map.square.MapSquare;

public class GroundItemSpawnParser {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(GroundItemSpawnParser.class);
	private static File PATH = new File("data/item-spawns.txt");
	
	public static void loadItems ()  {
		try (BufferedReader reader = new BufferedReader(new FileReader(PATH))) {
			String line;
			while ((line = reader.readLine()) != null) {
				if (line.startsWith("//") || line.trim().isEmpty()) {
					continue;
				}
				String[] split = line.split(" - ");
				int itemID = Integer.valueOf(split[0]);
                String[] location = split[1].split(" ");
                CoordGrid coords = new CoordGrid(Integer.valueOf(location[0]), Integer.valueOf(location[1]), Integer.valueOf(location[2]));
	            MapSquare region = World.getInstance().getRegions().getRegionByID(coords.getRegionID());
		    	GroundItem groundItem = new GroundItem(itemID, 1, coords);
			    region.addItem(groundItem);	
			}
		} catch (IOException ex) {
			logger.error("Error loading item spawns", ex);
			return;
		}
		logger.info("Spawned items");
	}
}
