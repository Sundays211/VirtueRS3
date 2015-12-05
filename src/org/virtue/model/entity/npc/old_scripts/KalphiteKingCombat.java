package org.virtue.model.entity.npc.old_scripts;

import java.util.Random;

import org.virtue.engine.cycle.GameTick;
import org.virtue.model.World;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.npc.combathandler.DefaultCombatHandler;
import org.virtue.model.entity.old_combat.hit.Hit;
import org.virtue.model.entity.old_combat.hit.Hit.HitType;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.HitMarkBlock;

/**
 * 
 * @author Kayla (skype:ashbysmith1996)
 * Made 5/5/2015
 * 
 */
public class KalphiteKingCombat extends DefaultCombatHandler {
	
	/**
	 * The random number generator.
	 */
	private final Random random = new Random();
	
	/**
	 * Set default combat type
	 */
	private CombatType type = CombatType.RANGE;
	
	/**
	 * Default private constructor.
	 */
	public KalphiteKingCombat() {
		
	}
	
	/**
	 * CombatTypes
	 * Melee
	 * Range
	 * 
	 */
	private enum CombatType {
		MELEE,
		
		RANGE
	}

	
	/**
	 * Combat Type Switcher
	 * @param defender
	 * @param attacker
	 */
	public void onAttack(NPC attacker, Entity defender, boolean successful) {
		NPC npc = (NPC) attacker;
		int damage = (int) (Math.random() * 990);
		minionSpawner(attacker, defender);
		if(attacker.getCurrentTile().withinDistance(defender.getCurrentTile(), 6)) {
			switch(random.nextInt(3)) {
			case 0:
				type = CombatType.MELEE;	
				break;
			case 1:
				type = CombatType.RANGE;
				break;
			}
		}
		switch(type) {
			case MELEE:
				Random rn = new Random();
				int melee = rn.nextInt(npc.getType().getDamage());
				damage = melee;
				npc.queueUpdateBlock(new AnimationBlock(19449));
				defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
				defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//				defender.getCombat().queueBars(Bar.HITPOINTS);
				defender.queueUpdateBlock(new HitMarkBlock());	
				break;
			case RANGE:
				Random rg= new Random();
				int range = rg.nextInt(npc.getType().getRangeDamage());
				damage = range;
				npc.queueUpdateBlock(new AnimationBlock(19450));
				defender.getCombat().queueHits(new Hit(damage, HitType.RANGE_DAMAGE));
				defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//				defender.getCombat().queueBars(Bar.HITPOINTS);
				defender.queueUpdateBlock(new HitMarkBlock());	
				break;
		}
	}
	
	/**
	 * Minion Spawner for Kalphite King
	 * @param defender
	 * @param attacker
	 */
	
	public void minionSpawner(final NPC defender, final Entity attacker) {
		final Player player = (Player) attacker;	
		if (defender.getCombat().getHitpoints() < (defender.getCombat()
				.getMaxHitpoints() / 2) && !player.getCombat().hasMinionsOut()) {
			attacker.submitTick(new GameTick(2) {
				@Override
				public void execute() {
					player.getCombat().setMinionsOut(true);
					spawnMarauders(defender, attacker);
					this.stop();
				}
			});
		}
	}
	
	/**
	 * Minion Spawns
	 * @param defender
	 * @param attacker
	 */
	
	public void spawnMarauders(NPC defender, Entity attacker) {
		NPC npc = NPC.create(17156, new Tile(2980, 1760, 0));
		npc.setCanRespawn(false);
		World.getInstance().addNPC(npc);
		npc.queueUpdateBlock(new AnimationBlock(19492));
		
		NPC npc2 = NPC.create(17156, new Tile(2975, 1757, 0));
		npc2.setCanRespawn(false);
		World.getInstance().addNPC(npc2);
		npc.queueUpdateBlock(new AnimationBlock(19492));
		
		NPC npc3 = NPC.create(17156, new Tile(2979, 1763, 0));
		npc3.setCanRespawn(false);
		World.getInstance().addNPC(npc3);
		npc.queueUpdateBlock(new AnimationBlock(19492));
		
		NPC npc4 = NPC.create(17156, new Tile(2972, 1763, 0));
		npc4.setCanRespawn(false);
		World.getInstance().addNPC(npc4);
		npc.queueUpdateBlock(new AnimationBlock(19492));
		
	}
}
