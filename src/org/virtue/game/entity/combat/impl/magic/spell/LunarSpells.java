package org.virtue.game.entity.combat.impl.magic.spell;

import org.virtue.game.content.skills.magic.Runes;
import org.virtue.game.content.skills.magic.Spellbook;
import org.virtue.game.entity.combat.impl.magic.CombatSpell;
import org.virtue.game.entity.combat.impl.magic.SpellAttackHandler;
import org.virtue.game.entity.player.container.Item;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.GraphicsBlock;

/**
 * @author Kayla
 */
public class LunarSpells extends CombatSpell  {

	/**
	 * Constructs a new {@code AirSpells} {@code Object}.
	 * @param id The spell/button id.
	 * @param level The level required.
	 * @param animation The cast animation.
	 * @param graphic The cast graphic.
	 * @param runes The runes required.
	 */
	public LunarSpells(int id, int level, double experience, SpellAttackHandler handler, Item... runes) {
		super(id, level, experience, handler, runes);
	}
	
	/**
	 * Registers the Ancient Spells
	 */
	public static void register() {
		SpellAttackHandler Vengeance = new SpellAttackHandler(-1, new AnimationBlock(4410), new GraphicsBlock(1, 726), null, null);
		Spellbook.MODERN.register(new AncientSpells(151, 94, 5.5, Vengeance, Runes.EARTH.get(10), Runes.ASTRAL.get(4), Runes.DEATH.get(2)));
	}

}
