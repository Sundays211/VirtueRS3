package org.virtue.model.entity.npc.old_scripts.godwars;

import java.util.Random;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.npc.NPCCombatHandler;

public class GeneralGraardor implements NPCCombatHandler {

	/**
	 * The random number generator.
	 */
	private final Random random = new Random();
	/**
	 * Default private constructor.
	 */
	public GeneralGraardor() {

	}

	private enum CombatType {
		MELEE
	}

	@Override
	public void onAttack(NPC attacker, Entity defender, boolean successful) {
		final NPC npc = attacker;
		if (npc.getTicks() != null) {

		}

	}

	@Override
	public void onDefend(NPC defender, Entity attacker, boolean successful) {
		// TODO Auto-generated method stub

	}

	@Override
	public int getHitDelay(NPC attacker, Entity defender) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getAttackAnimation(NPC npc) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getDefenceAnimation(NPC npc) {
		// TODO Auto-generated method stub
		return 0;
	}

}
