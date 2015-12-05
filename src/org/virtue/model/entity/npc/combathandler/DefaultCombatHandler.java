package org.virtue.model.entity.npc.combathandler;

import java.util.Random;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.npc.NPCCombatHandler;
import org.virtue.model.entity.npc.NpcTypeList;
import org.virtue.model.entity.old_combat.hit.Hit;
import org.virtue.model.entity.old_combat.hit.Hit.HitType;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.block.HitMarkBlock;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 28/01/2015
 */
public class DefaultCombatHandler implements NPCCombatHandler {

	@Override
	public void onAttack(NPC attacker, Entity defender, boolean successful) {
		attacker.queueUpdateBlock(new AnimationBlock(getAttackAnimation(attacker)));

		if (successful) {
			int damage = (int) (Math.random() * 990);
			NPC npc = attacker;
			Random rn = new Random();
			int npcDamage = rn.nextInt(npc.getType().getDamage());
			damage = npcDamage;
			defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
			defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
			if (damage == 0) {
				return;
			}
		} else {
			defender.getCombat().queueHits(new Hit(0, HitType.MISSED));
//			defender.getCombat().queueBars(Bar.HITPOINTS);
		}
		defender.queueUpdateBlock(new HitMarkBlock());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.model.entity.npc.NPCCombatHandler#onDefend(org.virtue.model.
	 * entity.npc.NPC, org.virtue.model.entity.Entity, boolean)
	 */
	@Override
	public void onDefend(NPC defender, Entity attacker, boolean successful) {
			defender.queueUpdateBlock(new AnimationBlock(getDefenceAnimation(defender)));
	}

	@Override
	public int getHitDelay(NPC attacker, Entity defender) {
		return 15;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.model.entity.npc.NPCCombatHandler#getAttackAnimation(org.
	 * virtue.model.entity.npc.NPC)
	 */
	@Override
	public int getAttackAnimation(NPC npc) {
		int anim = 17407;
		if (npc.getType().anim_attack != -1) {
			anim = npc.getType().anim_attack;
		}
		return anim;
	};

	@Override
	public int getDefenceAnimation(NPC npc) {
		int anim = 17406;
		if (NpcTypeList.getCustomData(npc.getID()) != null) {
			anim = NpcTypeList.getCustomData(npc.getID()).getDefendAnimation();
		}
		return anim;
	};
}
