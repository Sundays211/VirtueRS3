package org.virtue.game.entity.combat.impl.magic.spell;

import org.virtue.game.content.skills.magic.Runes;
import org.virtue.game.content.skills.magic.Spellbook;
import org.virtue.game.entity.combat.impl.magic.CombatSpell;
import org.virtue.game.entity.combat.impl.magic.SpellAttackHandler;
import org.virtue.game.entity.player.container.Item;
import org.virtue.game.entity.region.packets.Projectile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.GraphicsBlock;

/**
 * @author Kayla
 */
public class AncientSpells extends CombatSpell  {

	/**
	 * Constructs a new {@code AirSpells} {@code Object}.
	 * @param id The spell/button id.
	 * @param level The level required.
	 * @param animation The cast animation.
	 * @param graphic The cast graphic.
	 * @param runes The runes required.
	 */
	public AncientSpells(int id, int level, double experience, SpellAttackHandler handler, Item... runes) {
		super(id, level, experience, handler, runes);
	}
	
	/**
	 * Registers the Ancient Spells
	 */
	public static void register() {
		SpellAttackHandler smokeRush = new SpellAttackHandler(1200, new AnimationBlock(23989), null, new GraphicsBlock(1, 385), new Projectile(385, 52, 72, 0, 18, 18));
		Spellbook.MODERN.register(new AncientSpells(81, 50, 5.5, smokeRush, Runes.AIR.get(3), Runes.DEATH.get(1)));
		
		SpellAttackHandler bloodBarrage = new SpellAttackHandler(5500, new AnimationBlock(23989), null, new GraphicsBlock(1, 377), null);
		Spellbook.MODERN.register(new AncientSpells(102, 92, 5.5, bloodBarrage, Runes.FIRE.get(5), Runes.BLOOD.get(2)));
		
		SpellAttackHandler iceBarrage = new SpellAttackHandler(6000, new AnimationBlock(23989), null, new GraphicsBlock(1, 3946), new Projectile(366, 52, 72, 0, 18, 18));
		Spellbook.MODERN.register(new AncientSpells(103, 95, 5.5, iceBarrage, Runes.WATER.get(5), Runes.BLOOD.get(2)));
	}

}
