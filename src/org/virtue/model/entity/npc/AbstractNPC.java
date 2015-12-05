package org.virtue.model.entity.npc;

import java.io.File;

import org.virtue.Virtue;
import org.virtue.model.entity.region.Tile;
import org.virtue.script.listeners.CombatHandler;

/**
 * Used for creating custom NPC handlers.
 * @author Emperor
 *
 */
public abstract class AbstractNPC extends NPC {

	/**
	 * Constructs a new {@code AbstractNPC} {@code Object}.
	 * @param id The NPC id.
	 * @param tile The location.
	 */
	public AbstractNPC(int id, Tile tile) {
		super(id, tile);
	}
	
	/**
	 * Loads all abstract NPC handlers.
	 * @throws Exception When an exception occurs.
	 */
	public static void init() throws Exception {
		String packageName = NPC.class.getPackage().getName() + ".script";
		StringBuilder sb = new StringBuilder();
		for (char c : packageName.toCharArray()) {
			sb.append(c == '.' ? '/' : c);
		}
		String path = NPC.class.getClassLoader().getResource(sb.toString()).getPath().replaceAll("%20", " ");
		File dir = new File(path);
		int npcs = 0;
		int combatScripts = 0;
		for (String name : dir.list()) {
			if (!name.endsWith(".class") || name.contains("$") || name.contains(" ")) {
				continue;
			}
			name = name.substring(0, name.indexOf("."));
			Class<?> clazz = Class.forName(packageName + "." + name);
			Object object = clazz.newInstance();
			if (object instanceof AbstractNPC) {
				((AbstractNPC) object).register();
				npcs++;
			}
			else if (object instanceof CombatHandler) {
				CombatHandler handler = (CombatHandler) object;
				Virtue.getInstance().getScripts().registerCombatScript(handler, handler.getIds());
				combatScripts++;
			}
			else {
				System.err.println("Unhandled NPC script loaded - " + clazz.getName() + "!");
			}
		}
		System.err.println("Loaded " + npcs + " abstract NPC and " + combatScripts + " combat scripts!");
	}
	
	/**
	 * Registers the abstract NPC.
	 */
	public void register() {
		for (int id : getIds()) {
			Virtue.getInstance().getScripts().registerAbstractNPC(this, id);
		}
	}
	
	/**
	 * Creates a new instance of this NPC.
	 * @param id The NPC id.
	 * @param tile The tile.
	 * @return The instance.
	 */
	public abstract AbstractNPC newInstance(int id, Tile tile);

	/**
	 * The NPC ids to handle.
	 * @return The NPC ids.
	 */
	public abstract int[] getIds();

}