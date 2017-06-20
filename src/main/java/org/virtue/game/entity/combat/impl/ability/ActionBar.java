package org.virtue.game.entity.combat.impl.ability;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;

/**
 * Handles the player's action bar.
 * 
 * @author Emperor
 * @author Tom
 * @author Kayla
 */
public final class ActionBar {

	/**
	 * The child ids.
	 */
	public static final int[] SLOT_CHILD_IDS = new int[] { 55, 68, 81, 94, 107, 120, 133, 146, 159, 177, 185, 198, 211, 224 };

	/**
	 * The abilities mapping.
	 */
	private static final Map<Integer, Ability> ABILITIES = new HashMap<>();
	
	/**
	 * The cooldowns for each ability in ticks (600ms)
	 */
	private int[] cooldowns = new int[72];

	/**
	 * The current keybind bar index.
	 */
	private int barIndex;

	/**
	 * The player.
	 */
	private Player player;

	/**
	 * Constructs a new {@code ActionBar} {@code Object}.
	 * 
	 * @param player
	 *            The player.
	 */
	public ActionBar(Player player) {
		this.player = player;
		this.barIndex = 0;
		for (int i = 0; i < cooldowns.length; i++) {
			cooldowns[i] = 0;
		}
	}
	
	/**
	 * Loads all ability handlers.
	 * @throws Exception When an exception occurs.
	 */
	public static void init() throws Exception {
		String packageName = ActionBar.class.getPackage().getName() + ".script";
		StringBuilder sb = new StringBuilder();
		for (char c : packageName.toCharArray()) {
			sb.append(c == '.' ? '/' : c);
		}
		String path = ActionBar.class.getClassLoader().getResource(sb.toString()).getPath().replaceAll("%20", " ");
		File dir = new File(path);
		int abilities = 0;
		for (String name : dir.list()) {
			if (!name.endsWith(".class") || name.contains("$") || name.contains(" ")) {
				continue;
			}
			name = name.substring(0, name.indexOf("."));
			Class<?> clazz = Class.forName(packageName + "." + name);
			Object object = clazz.newInstance();
			if (object instanceof Ability) {
				((Ability) object).register();
				abilities++;
			}
		}
		System.err.println("Loaded " + abilities + " abilities!");
	}
	
	public void setCooldown(int slot, int cd) {
		this.cooldowns[slot] = cd;
	}
	
	public int getCooldown(int slot) {
		return cooldowns[slot];
	}

	/**
	 * Sets the current bar index.
	 * 
	 * @param barIndex
	 *            The bar index.
	 */
	public void setBarIndex(int barIndex) {
		this.barIndex = barIndex % 5;
	}

	/**
	 * Gets the current bar index.
	 * 
	 * @return The bar index.
	 */
	public int getBarIndex() {
		return barIndex;
	}

	/**
	 * @return the player
	 */
	public Entity getPlayer() {
		return player;
	}

	/**
	 * @param player
	 *            the player to set
	 */
	public void setPlayer(Player player) {
		this.player = player;
	}

	/**
	 * Gets the abilities value.
	 * @return The abilities.
	 */
	public static Map<Integer, Ability> getAbilities() {
		return ABILITIES;
	}

}