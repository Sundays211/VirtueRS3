package org.virtue.parser.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.model.World;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.npc.NpcDrops;
import org.virtue.model.entity.npc.NpcTypeList;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.Region;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @Author Kayla
 * @Date Nov 24, 2015
 */
public class NpcDropParser {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NpcDataParser.class);
	
	private static File PATH = new File("./repository/NPCDrops.json");
	
	public static void loadJsonNpcDrops () {
		try (BufferedReader reader = new BufferedReader(new FileReader(PATH))) {
			JsonParser parser = new JsonParser();
			JsonArray array = parser.parse(reader).getAsJsonArray();
			for (JsonElement element : array) {
				JsonObject obj = element.getAsJsonObject();
				int npcID = obj.get("npcID").getAsInt();
				int itemId = -1;
				if (obj.has("itemID")) {
					itemId = obj.get("itemID").getAsInt();
				}
				int itemAmount = -1;
				if (obj.has("itemAmount")) {
					itemAmount = obj.get("itemAmount").getAsInt();
				}
				int minimum = -1;
				if (obj.has("minimum")) {
					minimum = obj.get("minimum").getAsInt();
				}
				int maximum = -1;
				if (obj.has("maximum")) {
					maximum = obj.get("maximum").getAsInt();
				}
				String itemRarity = "";
				if (obj.has("itemRarity")) {
					itemRarity = obj.get("itemRarity").getAsString();
				}
				/*NpcDrops npc = new NpcDrops(itemId, itemAmount, minimum, maximum, itemRarity);
				Region region = World.getInstance().getRegions().getRegionByID(this.getCurrentTile().getRegionID());
				if (region != null && region.isLoaded()) {
					region.dropItem(npc, 1, visibleTo, this.getCurrentTile());//Bones
				}*/
			}
		} catch (IOException ex) {
			logger.error("Error loading NPC Drops", ex);
			return;
		}
	}
}
