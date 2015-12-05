package org.virtue.model.entity.npc.script;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackEvent;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.CombatStyle;
import org.virtue.model.entity.combat.impl.combo.SwitchAttack;
import org.virtue.model.entity.combat.impl.combo.SwitchAttackEvent;
import org.virtue.model.entity.combat.impl.melee.MeleeAttackHandler;
import org.virtue.model.entity.combat.impl.range.RangeAttackHandler;
import org.virtue.model.entity.npc.AbstractNPC;
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;

public class KarilsRots extends AbstractNPC {

	/**
	 * Constructor used by the script loader.
	 */
	public KarilsRots() {
		this(18543, null); 
	}

	public KarilsRots(int id, Tile tile) {
		super(id, tile);
	}

	@Override
	public AbstractNPC newInstance(int id, Tile tile) {
		return new KarilsRots(id, tile);
	}

	@Override
	public AttackEvent getNextAttack(Entity lock) {
		return attackEvent;
	}

	
	//18543: {"magic":1,"defence":90,"level":650,"description":"A vengeful spirit corrupted by dark magic.","areas":[],"poisonous":false,
	//"weakness":"None","size":1,"ranged":90,"attack":1,"members":false,"animations":{"death":836,"range":18232},
	//"name":"Karil the Tainted","xp":"6800.4","lifepoints":50000,"id":18543,"aggressive":true,"attackable":true}

	/**
	 * Handles Attack Switching
	 * 
	 * The attack event.
	 */
	private final SwitchAttackEvent attackEvent = new SwitchAttackEvent(
			new SwitchAttack(CombatStyle.RANGE, new RangeAttackHandler(600, 5000) {
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					AttackInfo info = AttackInfo.create(entity, new AnimationBlock(18232), new GraphicsBlock(1, 2994),
							impact(entity, lock, CombatStyle.RANGE, new GraphicsBlock(2, 3000), null));
					info.getImpacts()[0].setDelay(info.getImpacts()[0].getDelay() + 2);
					return info;
				}
			}));

	@Override
	public int[] getIds() {
		return new int[] { 18543};
	}


}
