package org.virtue.game.entity.npc.script;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.combo.SwitchAttack;
import org.virtue.game.entity.combat.impl.combo.SwitchAttackEvent;
import org.virtue.game.entity.combat.impl.magic.MagicAttackHandler;
import org.virtue.game.entity.combat.impl.melee.MeleeAttackHandler;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.zone.Projectile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.SpotAnimationBlock;

/**
 * @author Kayla
 * @date 11/16/2015
 */
public class AraxxorCombat extends AbstractNPC {

	/**
	 * Constructor used by the script loader.
	 */
	public AraxxorCombat() {
		this(19462, null); 
	}

	public AraxxorCombat(int id, CoordGrid tile) {
		super(id, tile);
	}

	@Override
	public AbstractNPC newInstance(int id, CoordGrid tile) {
		return new AraxxorCombat(id, tile);
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
					return AttackInfo.create(entity, new AnimationBlock(24050), new SpotAnimationBlock(1, 4986), impact(entity, lock, CombatStyle.MELEE, null, null));
				}
			}),
			new SwitchAttack(CombatStyle.MAGIC, new MagicAttackHandler(750, 1000) {
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					AttackInfo info = AttackInfo.create(entity, new AnimationBlock(24047), new SpotAnimationBlock(1, 4988), 
							impact(entity, lock, CombatStyle.MAGIC, new SpotAnimationBlock(2, 5007), new Projectile(4997, 35, 72, 16, 34, 16)));
					info.getImpacts()[0].setDelay(info.getImpacts()[0].getDelay() + 2);
					return info;
				}
			}),
			new SwitchAttack(CombatStyle.MAGIC, new MagicAttackHandler(750, 1000) {
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					AttackInfo info = AttackInfo.create(entity, new AnimationBlock(24047), new SpotAnimationBlock(1, 4988), 
							impact(entity, lock, CombatStyle.MAGIC, new SpotAnimationBlock(2, 5007), new Projectile(4989, 35, 72, 16, 34, 16)));
					info.getImpacts()[0].setDelay(info.getImpacts()[0].getDelay() + 2);
					return info;
				}
			}));

	@Override
	public int[] getIds() {
		return new int[] { 19462}; //TODO Switching
	}

}
