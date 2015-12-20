package org.virtue.game.entity.npc.script;

import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.impl.combo.SwitchAttack;
import org.virtue.game.entity.combat.impl.combo.SwitchAttackEvent;
import org.virtue.game.entity.combat.impl.melee.MeleeAttackHandler;
import org.virtue.game.entity.combat.impl.range.RangeAttackHandler;
import org.virtue.game.entity.npc.AbstractNPC;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.world.region.Tile;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.block.GraphicsBlock;
import org.virtue.utility.RandomExt;

/**
 * 
 * @author James
 *
 */
public class KalphiteKing extends AbstractNPC {

	public int minionCount;
	
	
	/**
	 * Constructor used by the script loader.
	 */
	public KalphiteKing() {
		this(19967, null); // Place NPC ID here.
	}

	/**
	 * Constructs a new {@code TzTokJad} {@code Object}.
	 * 
	 * @param id
	 *            The NPC id.
	 * @param tile
	 *            The tile.
	 */
	public KalphiteKing(int id, Tile tile) {
		super(id, tile);
	}

	@Override
	public AbstractNPC newInstance(int id, Tile tile) {
		return new KalphiteKing(id, tile);
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
			
			
			new SwitchAttack(CombatStyle.MELEE, new MeleeAttackHandler(750, 10000000) {
				int minion = RandomExt.random(10);		
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					if(minion == 3 && minionCount > 9) 	{
						spawnMinions();
						entity.getCombatSchedule().lock(lock);
					}
					return AttackInfo.create(entity, new AnimationBlock(19449), null,
							impact(entity, lock, CombatStyle.MELEE, null, null));
				}
			}), new SwitchAttack(CombatStyle.RANGE, new RangeAttackHandler(750, 1000) {
				@Override
				public AttackInfo getAttackInfo(Entity entity, Entity lock) {
					AttackInfo info = AttackInfo.create(entity, new AnimationBlock(16202), new GraphicsBlock(1, 2994),
							impact(entity, lock, CombatStyle.RANGE, new GraphicsBlock(2, 3000), null));
					info.getImpacts()[0].setDelay(info.getImpacts()[0].getDelay() + 2);
					return info;
				}
			}));
	
	public void addNpc(NPC npc) {
		World.getInstance().addNPC(npc);
	}

	public void spawnMinions() {
		NPC npc = NPC.create(16700, new Tile(2968, 1767, 0));
		addNpc(npc);
		NPC npc1 = NPC.create(16700, new Tile(2968, 1753, 0));
		addNpc(npc1);
		NPC npc2 = NPC.create(16700, new Tile(2986, 1767, 0));
		addNpc(npc2);
	}
	
	@Override
	public int[] getIds() {
		return new int[] { 16697 }; // Place NPC ID Here
	}

}