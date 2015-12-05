
package org.virtue.model.entity.old_combat.action.impl;

import java.util.Random;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.CombatMode;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.npc.NpcTypeList;
import org.virtue.model.entity.old_combat.CombatFormulas;
import org.virtue.model.entity.old_combat.CombatSetting;
import org.virtue.model.entity.old_combat.CombatVariables;
import org.virtue.model.entity.old_combat.action.CombatAction;
import org.virtue.model.entity.old_combat.hit.Hit;
import org.virtue.model.entity.old_combat.hit.Hit.HitType;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.skill.SkillType;
import org.virtue.model.entity.update.block.HitMarkBlock;
import org.virtue.openrs.def.impl.ItemType;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 23/01/2015
 */
public class LegacyMeleeAction extends CombatAction {
	
	private static final int UNARMED_DAMAGE = 0;
	private ItemType type;
	
	public ItemType getType () {
		return type;
	}

	boolean getPercentage(double a) {
		double d = Math.random() * 100;
		if ((d -= a) < 0) 
			return true;
		return false;
	}
	@Override
	public void attack(Entity attacker, Entity defender, boolean successful) {
		if (successful) {
			int damage = (int) (Math.random() * 990);
			if (defender instanceof Player) {		
				Player player = (Player) attacker;
				Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
				Random rn = new Random();
				
				int levelAccBon = rn.nextInt((attacker.getCombat().getLevelAccuracyBonus(player.getSkills().getBaseLevel(SkillType.ATTACK))));
				double hitChance = (CombatFormulas.getTotalArmourDamageBonus(attacker)+levelAccBon) / CombatFormulas.getTotalArmourBonus(defender);
				int weaponDamage = weapon == null ? UNARMED_DAMAGE : rn.nextInt(weapon.getType().getMeleeDamage());
				double strBonus = player.getSkills().getBaseLevel(SkillType.STRENGTH) * 2.5;
				double weaponBonus = weapon == null ? UNARMED_DAMAGE: weaponDamage * CombatFormulas.getMeleeWeaponSpeed(weapon.getType());
				double strBonusArmSum = 0;
				if (getPercentage(hitChance))
					damage = (int) (Math.floor(strBonus * weaponBonus * strBonusArmSum));
				else if (getPercentage(hitChance))
					damage = 0;
				
				if (damage == 0) {
					defender.getCombat().queueHits(new Hit(0, HitType.MISSED));
//					defender.getCombat().queueBars(Bar.HITPOINTS);
					defender.queueUpdateBlock(new HitMarkBlock());
				}
				double combatXp = (damage / 15.127);
				double hpXp = (damage / 45.85);
				player.getSkills().addExperience(SkillType.ATTACK, combatXp);
				player.getSkills().addExperience(SkillType.CONSTITUTION, hpXp);
				
				//int weaponTier = weapon == null ? UNARMED_DAMAGE : rn.nextInt(weapon.getType().getWeaponTier());
				
				
				//damage = weaponDamage + levelAccBon + weaponTier;
			} else if (defender instanceof NPC) {
				Player player = (Player) attacker;
				Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
				Random rn = new Random();
				int weaponDamage = weapon == null ? UNARMED_DAMAGE : rn.nextInt(weapon.getType().getMeleeDamage());
				int weaponTier = weapon == null ? UNARMED_DAMAGE : rn.nextInt(weapon.getType().getWeaponTier());
				int levelAccBon = rn.nextInt((attacker.getCombat().getLevelAccuracyBonus(player.getSkills().getBaseLevel(SkillType.ATTACK))));
				double strBonusArmSum = 0;
				
				
				damage = (int) (Math.floor(weaponDamage + levelAccBon + strBonusArmSum));
				double combatXp = (damage / 15.127);
				double hpXp = (damage / 45.85);
				player.getSkills().addExperience(SkillType.ATTACK, combatXp);
				player.getSkills().addExperience(SkillType.CONSTITUTION, hpXp);
				
			}
			damage = Math.min(damage, defender.getCombat().getHitpoints());//Doesn't make sense for a hit to be more than the remaining hitpoints
			if (damage == 0) {
				return;
			}
			if ((defender.getCombat().getMaxHitpoints() == damage) && (defender.getCombat().getHitpoints() == defender.getCombat().getMaxHitpoints())) {
				defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE)); //This should only be instant kill with deathtouch darts
			} else {				
				defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
			}
			defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
		} else {
			defender.getCombat().queueHits(new Hit(0, HitType.MISSED));
		}
//		defender.getCombat().queueBars(Bar.HITPOINTS);
		defender.queueUpdateBlock(new HitMarkBlock());
	}

	@Override
	public void defend(Entity defender, Entity attacker, boolean successful) {
		if (successful) {
			int damage = (int) (Math.random() * 990);
			if (attacker instanceof NPC)
				return;
			else
				
			if ((defender.getCombat().getMaxHitpoints() == damage) && (defender.getCombat().getHitpoints() == defender.getCombat().getMaxHitpoints())) {
				defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE)); //This should only be instant kill with deathtouch darts
			} else {
				defender.getCombat().queueHits(new Hit(damage, HitType.MELEE_DAMAGE));
			}
			defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - damage);
		} else {
			defender.getCombat().queueHits(new Hit(0, HitType.MISSED));
		}
		defender.queueUpdateBlock(new HitMarkBlock());
	}

	@Override
	public boolean isSuccessful(Entity attacker, Entity defender) {
		if (attacker instanceof Player) {
			Player player = (Player) attacker;
			int weaponLevel = 1; //TODO weapon requirements
			Item shield = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_SHIELD);
			Item body = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_CHEST);
			Item leg = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_BOTTOMS);
			
			double atkAccuracy = CombatFormulas.getCompleteAccuracy(player.getSkills().getCurrentLevel(SkillType.ATTACK), weaponLevel);
			double equipmentPenalty = CombatFormulas.getEquipmentPenalty(shield == null?-1:shield.getId(), body==null?-1:body.getId(), leg==null?-1:leg.getId());
			double defAccuracy = 1;
			
			int[] attackerItemIds = new int[15];
			int[] defenderItemIds = new int[15];
			int weakItemAmount = 0, neutralItemAmount = 0, strongItemAmount = 0; //TODO weakness calculations
			
			if (defender instanceof Player) {
				Player defendingPlayer = (Player) defender;
				defAccuracy = CombatFormulas.getLevelAccuracy(defendingPlayer.getSkills().getCurrentLevel(SkillType.DEFENCE));
				
			} else {
				
			}

			double equipmentModifier = CombatFormulas.getEquipmentMultiplier(weakItemAmount, neutralItemAmount, strongItemAmount) * equipmentPenalty;
			double weakness = CombatFormulas.getWeaknessMultiplier(attackerItemIds, defenderItemIds);
			
			double chance = CombatFormulas.getHitChance(atkAccuracy, equipmentModifier, defAccuracy, weakness);
			return Math.random() < chance;
		} else if (attacker instanceof NPC) {
			//NPC npc = (NPC) attacker;
			return Math.random() < 0.5;//Just to try it out, we'll make NPCs hit half the time
		}
		return false;
	}

	@Override
	public int getHitDelay(Entity attacker, Entity victim, boolean mainHand) {
		return 1;
	}

	@Override
	public int getMaxHit(Entity attacker, Entity defender) {
		return (int) (getType().getParam(641, -1)/10);
	}

	@Override
	public CombatSetting getSetting() {
		return CombatSetting.LEGACY;
	}

	@Override
	public int getAttackAnimation(Entity attacker, Entity defender, boolean mainHand) {
		int animation = -1;
		if (attacker instanceof Player) {
			Player player = (Player) attacker;
			Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
			if(weapon != null) {
				animation = player.getMode() == CombatMode.EOC ? weapon.getType().getMainhandEmote() : weapon.getType().getMainhandEmoteLegacy();
			}			
		}		
		if (animation == -1) {
			Player player = (Player) attacker;
			animation = player.getMode() == CombatMode.EOC ? 18224 : 422;
		}
		return animation;
	}
	
	@Override
	public int getOffhandAttackAnimation(Entity attacker, Entity defender, boolean offHand) {
		int animation = -1;
		if (attacker instanceof Player) {
			Player player = (Player) attacker;
			Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_SHIELD);
			if(weapon != null) {
				animation = player.getMode() == CombatMode.EOC ? weapon.getType().getOffhandEmote() : weapon.getType().getOffhandEmoteLegacy();
			}			
		}		
		if (animation == -1) {
			Player player = (Player) attacker;
			animation = player.getMode() == CombatMode.EOC ? 18224 : 422;
		}
		return animation;
	}
	
	@Override
	public int getDefenceAnimation(Entity attacker, Entity defender) {
		int animation = -1;
		if (defender instanceof Player) {
			Player player = (Player) defender;
			Item shield = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_SHIELD);
			Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
			if (shield != null) {
				animation = player.getMode() == CombatMode.EOC ? shield.getType().getDefensiveAnimation() : shield.getType().getDefensiveAnimationLegacy();
			}
			if (weapon != null) {
				animation = player.getMode() == CombatMode.EOC ? weapon.getType().getDefensiveAnimation() : weapon.getType().getDefensiveAnimationLegacy();
			}
		}
		if (defender instanceof NPC) {
			NPC npc = (NPC) defender;
			if (NpcTypeList.getCustomData(npc.getID()) != null) {
				animation = NpcTypeList.getCustomData(npc.getID()).getDefendAnimation();
			}
		}
		if (animation == -1) {
			animation = 424;
		}
		return animation;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.combat.action.CombatAction#getDistance()
	 */
	@Override
	public int getDistance() {
		return 1;
	}

}
