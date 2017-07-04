package org.virtue.game.parser.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.game.entity.npc.NpcDrops;

import com.google.gson.Gson;

/**
 * @Author Kayla
 * @Date Nov 24, 2015
 */
public class NpcDropParser {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(NpcDropParser.class);

	private static File PATH = new File("./repository/npc/drops/");

	private final int rolls;

	private final int[] npcIdentifiers;

	private final ArrayList<NpcDrops> staticDrops = new ArrayList<>();

	private final ArrayList<NpcDrops> dynamicDrops = new ArrayList<>();

	public static final int ROLL_MULTIPLIER = 100;

	public static final HashMap<Integer, NpcDropParser> itemDrops = new HashMap<>();

	public NpcDropParser(final int rolls, final int... npcIdentifiers) {
		this.rolls = rolls;
		this.npcIdentifiers = npcIdentifiers;
	}

	private ArrayList<NpcDrops> getRolledLoot(final double chanceOffset) {
		final ArrayList<NpcDrops> temp = new ArrayList<>(dynamicDrops);
		final ArrayList<NpcDrops> rolledLoot = new ArrayList<>();
		final Random random = new Random();

		for (int i = 0; i < rolls; i++) {
			final double roll = (random.nextDouble() * ROLL_MULTIPLIER);
			Collections.shuffle(temp);

			for (final NpcDrops loot : temp) {
				final double _chanceOffset = (loot.getHitRollCeil() * chanceOffset);

				if ((loot.getHitRollCeil() + _chanceOffset) >= roll) {
					rolledLoot.add(loot);
					temp.remove(loot);
					break;
				}
			}
		}
		return rolledLoot;
	}

	public ArrayList<NpcDrops> getLootChance(final int chanceOffset) {
		final ArrayList<NpcDrops> lootChance = new ArrayList<>(staticDrops);
		lootChance.addAll(getRolledLoot(chanceOffset));
		return lootChance;
	}

	public static final NpcDropParser forID(final int npcID) {
		if (!itemDrops.containsKey(npcID))
			return itemDrops.get(16028);

		return itemDrops.get(npcID);
	}

	public static final void loadNpcDrops() {
		final Gson gson = new Gson();

		for (final File file : PATH.listFiles()) {
			try (final BufferedReader parse = new BufferedReader(new FileReader(file))) {
				final NpcDropParser table = gson.fromJson(parse, NpcDropParser.class);

				for (final int key : table.npcIdentifiers) {
					itemDrops.put(key, table);
				}
			} catch (IOException e) {
				logger.error("Error loading NPC Drops", e);
				return;
			}
		}
		logger.info("Loaded " + itemDrops.size() + " NPC Item Drops.");
	}
}
