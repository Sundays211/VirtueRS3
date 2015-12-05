package org.virtue.model.entity.combat.impl.magic.spell;

import org.virtue.model.entity.combat.impl.magic.CombatSpell;
import org.virtue.model.entity.combat.impl.magic.SpellAttackHandler;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.skill.magic.Runes;
import org.virtue.model.entity.player.skill.magic.Spellbook;
import org.virtue.model.entity.region.packets.Projectile;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;

/**
 * Handles the air spells.
 * @author Emperor
 *
 */
public final class ModernSpells extends CombatSpell {
	
	/**
	 * Constructs a new {@code AirSpells} {@code Object}.
	 * @param id The spell/button id.
	 * @param level The level required.
	 * @param animation The cast animation.
	 * @param graphic The cast graphic.
	 * @param runes The runes required.
	 */
	public ModernSpells(int id, int level, double experience, SpellAttackHandler handler, Item... runes) {
		super(id, level, experience, handler, runes);
	}

	/**
	 * Registers the air spells.
	 */
	public static void register() {
		//Air strike
		SpellAttackHandler handler = new SpellAttackHandler(2000, new AnimationBlock(14221), null, new GraphicsBlock(1, 2700, 96), new Projectile(2699, 52, 78, 0, 18, 18));
		Spellbook.MODERN.register(new ModernSpells(14, 1, 5.5, handler, Runes.AIR.get(1)));
		
	}

}