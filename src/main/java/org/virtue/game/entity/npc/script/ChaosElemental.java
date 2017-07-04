package org.virtue.game.entity.npc.script;

import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.death.DeathEvent;
import org.virtue.game.entity.combat.death.DefaultDeathEvent;
import org.virtue.game.entity.combat.impl.combo.SwitchAttack;
import org.virtue.game.entity.combat.impl.combo.SwitchAttackEvent;
import org.virtue.game.entity.combat.impl.melee.MeleeAttackHandler;
import org.virtue.game.entity.combat.impl.range.RangeAttackHandler;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.zone.Projectile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.utility.RandomExt;

public class ChaosElemental extends AbstractNPC {
	
	/**
	 * Constructs a new {@code KalphiteQueen} {@code Object}.
	 */
	public ChaosElemental() {
		this(3200, null);
	}
	
	/**
	 * Constructs a new {@code KalphiteQueen} {@code Object}.
	 * @param id The NPC id.
	 * @param tile The tile.
	 */
	public ChaosElemental(int id, CoordGrid tile) {
		super(id, tile);
	}
	
	public AttackEvent getNextAttack(Entity lock) {
		return attackEvent;
	}

	/**
	 * Handles Attack Switching
	 * 
	 * The attack event.
	 */
	private final SwitchAttackEvent attackEvent = new SwitchAttackEvent(
			
			
			new SwitchAttack(CombatStyle.MELEE, new MeleeAttackHandler(750, 10000000) {
				int minion = RandomExt.random(10);		
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					return AttackInfo.create(entity, new AnimationBlock(19449), null,
							impact(entity, lock, CombatStyle.MELEE, null, null));
				}
			}), new SwitchAttack(CombatStyle.RANGE, new RangeAttackHandler(750, 1000) {
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					AttackInfo info = AttackInfo.create(entity, new AnimationBlock(5443), null,
							impact(entity, lock, CombatStyle.RANGE, null, new Projectile(4997, 35, 72, 16, 34, 16)));
					info.getImpacts()[0].setDelay(info.getImpacts()[0].getDelay() + 2);
					return info;
				}
			}));

	@Override
	public AbstractNPC newInstance(int id, CoordGrid tile) {
		return new ChaosElemental(id, tile);
	}
	
	@Override
	public DeathEvent getDeathEvent(Entity killer) {
		World.getInstance().sendEventBroadcast(killer +" has just killed the Chaos Elemental!");
			return new DefaultDeathEvent();
	}

	@Override
	public int[] getIds() {
		return new int[] { 3200 };
	}


}
