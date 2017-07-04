package org.virtue.game.entity.combat.impl.magic;

import org.virtue.game.content.skills.magic.MagicSpell;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.impl.AttackHandler;
import org.virtue.game.entity.combat.impl.ImpactInfo;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.node.Node;

/**
 * Represents a combat spell.
 * @author Emperor
 *
 */
public abstract class CombatSpell extends MagicSpell {

	/**
	 * The attack handler for this spell.
	 */
	protected AttackHandler handler;
	
	/**
	 * Constructs a new {@code CombatSpell} {@code Object}.
	 * @param id The spell/button id.
	 * @param level The level required.
	 * @param experience The experience gained.
	 * @param handler The spell handler.
	 * @param runes The runes required.
	 */
	public CombatSpell(int id, int level, double experience, SpellAttackHandler handler, Item... runes) {
		super(id, level, experience, handler.getAnimation(), handler.getGraphic(), runes);
		this.handler = handler;
	}
	
	@Override
	public boolean cast(Entity entity, Node target) {
		return effect(entity, target);
	}
	
	@Override
	public boolean effect(Entity entity, Node target) {
		if (target instanceof Entity) {
			entity.getCombatSchedule().lock((Entity) target, new MagicAttackEvent(this));
		}
		return true;
	}

	/**
	 * Called when the spell starts.
	 * @param entity The entity.
	 * @param lock The target.
	 * @param info The attack info.
	 * @return {@code True} if the spell can be cast.
	 */
	public boolean start(Entity entity, Entity lock, AttackInfo info) {
		return true;
	}

	/**
	 * Called when the spell hits the target.
	 * @param entity The casting entity.
	 * @param info The attack info.
	 * @param impact The impact info.
	 */
	public void impact(Entity entity, AttackInfo info, ImpactInfo impact) {
		
	}
	
	/**
	 * The spell handler.
	 * @return The handler.
	 */
	public AttackHandler getHandler() {
		return handler;
	}

}