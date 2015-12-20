package org.virtue.game.entity.npc.script;

import org.virtue.engine.script.listeners.CombatHandler;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.AttackHandler;
import org.virtue.game.entity.combat.impl.FollowingType;
import org.virtue.game.entity.combat.impl.range.RangeAttackEvent;
import org.virtue.game.entity.combat.impl.range.RangeAttackHandler;
import org.virtue.game.world.region.packets.Projectile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.GraphicsBlock;

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