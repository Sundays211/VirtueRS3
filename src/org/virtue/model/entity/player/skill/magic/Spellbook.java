package org.virtue.model.entity.player.skill.magic;

import java.util.HashMap;
import java.util.Map;

import org.virtue.model.entity.combat.impl.magic.spell.ModernSpells;
import org.virtue.model.entity.combat.impl.magic.spell.AncientSpells;
import org.virtue.model.entity.combat.impl.magic.spell.LunarSpells;

/**
 * The spellbooks available.
 * @author Emperor
 *
 */
public enum Spellbook {

	/**
	 * The modern spellbook.
	 */
	MODERN,
	
	/**
	 * The ancient spellbook.
	 */
	ANCIENT,
	
	/**
	 * The lunar spellbook.
	 */
	LUNAR;
	
	/**
	 * The mapping of spells.
	 */
	private final Map<Integer, MagicSpell> spells;
	
	/**
	 * Constructs a new {@code Spellbook} {@code Object}.
	 */
	private Spellbook() {
		spells = new HashMap<>();
	}
	
	static {
		ModernSpells.register();
		AncientSpells.register();
		LunarSpells.register();
	}
	
	/**
	 * Gets the magic spell for the given button id.
	 * @param buttonId The button id.
	 * @return The magic spell.
	 */
	public MagicSpell get(int buttonId) {
		ModernSpells.register();
		AncientSpells.register();
		LunarSpells.register();
		return spells.get(buttonId);
	}

	/**
	 * Registers a magic spell on this spellbook.
	 * @param spell The magic spell.
	 */
	public void register(MagicSpell spell) {
		spells.put(spell.getId(), spell);
	}

	/**
	 * Gets the spells value.
	 * @return The spells.
	 */
	public Map<Integer, MagicSpell> getSpells() {
		return spells;
	}
}