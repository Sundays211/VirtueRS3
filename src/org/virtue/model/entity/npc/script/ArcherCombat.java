package org.virtue.model.entity.npc.script;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackEvent;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.CombatStyle;
import org.virtue.model.entity.combat.impl.AttackHandler;
import org.virtue.model.entity.combat.impl.FollowingType;
import org.virtue.model.entity.combat.impl.range.RangeAttackEvent;
import org.virtue.model.entity.combat.impl.range.RangeAttackHandler;
import org.virtue.model.entity.region.packets.Projectile;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;
import org.virtue.script.listeners.CombatHandler;

/**
 * Handles archer combat (just an example).
 * @author Emperor
 *
 */
public final class ArcherCombat implements CombatHandler {

	/**
	 * The attack animation.
	 */
	private static final AnimationBlock ANIMATION = new AnimationBlock(-1);
	
	/**
	 * The attack graphic.
	 */
	private static final GraphicsBlock GRAPHIC = new GraphicsBlock(1, 9, 96);
	
	/**
	 * The projectile.
	 */
	private static final Projectile PROJECTILE = new Projectile(11, 0, 0, 0, 0, 0);
	
	/**
	 * The attack handler.
	 */
	private static final AttackHandler HANDLER = new RangeAttackHandler() {
		@Override
		public AttackInfo getAttackInfo(Entity entity, Entity lock) {
			return AttackInfo.create(entity, ANIMATION, GRAPHIC, 
					impact(entity, lock, CombatStyle.RANGE, null, PROJECTILE));
		}
	};
	
	@Override
	public AttackEvent getAttackEvent() {
		return new RangeAttackEvent(FollowingType.RANGE, HANDLER);
	}

	@Override
	public int[] getIds() {
		return new int[] { 8561 };
	}

}