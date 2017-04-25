package org.virtue.game.entity.npc.script;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.combo.SwitchAttack;
import org.virtue.game.entity.combat.impl.combo.SwitchAttackEvent;
import org.virtue.game.entity.combat.impl.magic.MagicAttackHandler;
import org.virtue.game.entity.combat.impl.melee.MeleeAttackHandler;
import org.virtue.game.entity.combat.impl.range.RangeAttackHandler;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.world.region.Tile;
import org.virtue.game.world.region.zone.Projectile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;

/**
 * How To make a Boss.
 * @author Kayla
 * @author Emperor
 */
public final class BossTutorial extends AbstractNPC {
	
	/**
	 * Constructor used by the script loader.
	 */
	public BossTutorial() {
		this(9999, null); //Place NPC ID here.
	}
	
	/**
	 * Constructs a new {@code TzTokJad} {@code Object}.
	 * @param id The NPC id.
	 * @param tile The tile.
	 */
	public BossTutorial(int id, Tile tile) {
		super(id, tile);
	}

	@Override
	public AbstractNPC newInstance(int id, Tile tile) {
		return new BossTutorial(id, tile);
	}
	
	@Override
	public AttackEvent getNextAttack(Entity lock) {
		return attackEvent;
	}
	
	
	/**
	 * Handles Attack Switching
	 * 
	 * The attack event.
	 */
	private final SwitchAttackEvent attackEvent = new SwitchAttackEvent(
			new SwitchAttack(CombatStyle.MELEE, new MeleeAttackHandler(480, 1000) {
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					return AttackInfo.create(entity, new AnimationBlock(16204), null, impact(entity, lock, CombatStyle.MELEE, null, null));
				}
			}),
			new SwitchAttack(CombatStyle.RANGE, new RangeAttackHandler(750, 1000) {
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					AttackInfo info = AttackInfo.create(entity, new AnimationBlock(16202), new SpotAnimationBlock(1, 2994), 
							impact(entity, lock, CombatStyle.RANGE, new SpotAnimationBlock(2, 3000), null));
					info.getImpacts()[0].setDelay(info.getImpacts()[0].getDelay() + 2);
					return info;
				}
			}),
			new SwitchAttack(CombatStyle.MAGIC, new MagicAttackHandler(750, 1000) {
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					AttackInfo info = AttackInfo.create(entity, new AnimationBlock(16195), new SpotAnimationBlock(1, 2995), 
							impact(entity, lock, CombatStyle.MAGIC, null, new Projectile(2741, 35, 72, 16, 34, 16)));
					info.getImpacts()[0].setDelay(info.getImpacts()[0].getDelay() + 2);
					return info;
				}
			})
	);

	@Override
	public int[] getIds() {
		return new int[] { 9999 }; //Place NPC ID Here
	}

}