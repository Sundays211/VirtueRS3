package org.virtue.model.entity.npc.old_scripts;


import java.util.Random;

import org.virtue.engine.cycle.GameTick;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.npc.NPCCombatHandler;
import org.virtue.model.entity.old_combat.hit.Hit;
import org.virtue.model.entity.old_combat.hit.Hit.HitType;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.GraphicsBlock;
import org.virtue.model.entity.update.block.HitMarkBlock;


public class VoragoCombat implements NPCCombatHandler {

	/**
	 * The random number generator.
	 */
	private final Random random = new Random();

	private CombatType type;

	/**
	 * Default private constructor.
	 */
	public VoragoCombat() {

	}

	private enum CombatType {
		MELEE,

		MAGIC
	}

	@Override
	public void onAttack(NPC attacker, final Entity defender, boolean successful) {
		final NPC npc = attacker;
		if (npc.getTicks() != null) {
			if (attacker.getCurrentTile().withinDistance(defender.getCurrentTile(), 6)) {
				switch (random.nextInt(2)) {
				case 0:
					type = CombatType.MELEE;
					break;
				case 1:
					type = CombatType.MAGIC;
					break;
				}
			}
			switch (type) {
			case MELEE:
				switch (random.nextInt(7)) {
				case 0:
					System.out.println("-----Melee----");
					attacker.submitTick(new GameTick(1) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random rn = new Random();
							int melee = rn.nextInt(npc.getType().getDamage());
							damage = melee;
							npc.queueUpdateBlock(new AnimationBlock(20355));
							defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				case 1:
					System.out.println("-----Melee----");
					attacker.submitTick(new GameTick(1) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random rn = new Random();
							int melee = rn.nextInt(npc.getType().getDamage());
							damage = melee;
							npc.queueUpdateBlock(new AnimationBlock(20363));
							defender.queueUpdateBlock(new GraphicsBlock(1, 4018));
							defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				case 2:
					attacker.submitTick(new GameTick(0) {
						@Override
						public void execute() {
							npc.queueUpdateBlock(new AnimationBlock(20323));
						}
					});
					attacker.submitTick(new GameTick(1) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random rn = new Random();
							int melee = rn.nextInt(npc.getType().getDamage());
							damage = melee;
							npc.queueUpdateBlock(new AnimationBlock(20323));
							npc.queueUpdateBlock(new GraphicsBlock(1, 4019));
							defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				case 3:
					System.out.println("-----Melee----");
					attacker.submitTick(new GameTick(1) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random rn = new Random();
							int melee = rn.nextInt(npc.getType().getDamage());
							damage = melee;
							npc.queueUpdateBlock(new AnimationBlock(20355));
							defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				case 4:
					System.out.println("-----Melee----");
					attacker.submitTick(new GameTick(1) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random rn = new Random();
							int melee = rn.nextInt(npc.getType().getDamage());
							damage = melee;
							npc.queueUpdateBlock(new AnimationBlock(20363));
							defender.queueUpdateBlock(new GraphicsBlock(1, 4018));
							defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				case 5:
					System.out.println("-----Melee----");
					attacker.submitTick(new GameTick(1) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random rn = new Random();
							int melee = rn.nextInt(npc.getType().getDamage());
							damage = melee;
							npc.queueUpdateBlock(new AnimationBlock(20363));
							defender.queueUpdateBlock(new GraphicsBlock(1, 4018));
							defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				case 6:
					System.out.println("-----Melee----");
					attacker.submitTick(new GameTick(1) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random rn = new Random();
							int melee = rn.nextInt(npc.getType().getDamage());
							damage = melee;
							npc.queueUpdateBlock(new AnimationBlock(20355));
							defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				}
				break;
			case MAGIC:
				switch (random.nextInt(2)) {
				case 0:
					attacker.submitTick(new GameTick(2) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random mc = new Random();
							int magic = mc.nextInt(npc.getType().getMagicDamage());
							damage = magic;
							npc.queueUpdateBlock(new AnimationBlock(20319));
							npc.queueUpdateBlock(new GraphicsBlock(1, 4018));
							defender.getCombat().queueHits(new Hit(damage, HitType.MAGIC_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				case 1:
					attacker.submitTick(new GameTick(2) {
						@Override
						public void execute() {
							int damage = (int) (Math.random() * 990);
							Random mc = new Random();
							int magic = mc.nextInt(npc.getType().getMagicDamage());
							damage = magic;
							npc.queueUpdateBlock(new AnimationBlock(20319));
							npc.queueUpdateBlock(new GraphicsBlock(1, 4018));
							defender.getCombat().queueHits(new Hit(damage, HitType.MAGIC_DAMAGE));
							defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
//							defender.getCombat().queueBars(Bar.HITPOINTS);
							defender.queueUpdateBlock(new HitMarkBlock());
							this.stop();
						}
					});
					break;
				}
				break;
			}
		}
	}

	@Override
	public void onDefend(NPC defender, Entity attacker, boolean successful) {
		// TODO Auto-generated method stub

	}

	@Override
	public int getHitDelay(NPC attacker, Entity defender) {
		return 7;
	}

	@Override
	public int getAttackAnimation(NPC npc) {
		return 20355;
	}

	@Override
	public int getDefenceAnimation(NPC npc) {
		return 20318;
	}

}
