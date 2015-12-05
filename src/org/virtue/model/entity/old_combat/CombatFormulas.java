package org.virtue.model.entity.old_combat;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.inv.ItemTypeList;
import org.virtue.model.entity.player.skill.SkillType;
import org.virtue.openrs.def.impl.ItemType;

public class CombatFormulas {
	
	private static ItemType type;
	
	
	public ItemType getType () {
		return type;
	}
	
	//Start Armour Bonus
	public static double getTotalArmourBonus(Entity defender) {
		double headBonus = getHeadBonus(defender);
		double bodyBonus = getBodyBonus(defender);
		double legsBonus = getLegsBonus(defender);
		double shieldBonus = getShieldBonus(defender);
		double glovesBonus = getGlovesBonus(defender);
		double bootsBonus = getBootsBonus(defender);
		double capeBonus = getCapeBonus(defender);
		double ringBonus = getRingBonus(defender);
		return headBonus + bodyBonus + legsBonus + shieldBonus + glovesBonus +
				bootsBonus + capeBonus + ringBonus;
	}
	
	static double getHeadBonus(Entity defender) {
		Player player = (Player) defender;
		Item head = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_HELM);
		if (head != null) {
			double equipLevel = head.getType().getWeaponTier();
			double base = ( Math.pow(equipLevel, 3) + (10 * equipLevel) + 100 );
			double bonus = 0.2 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getBodyBonus(Entity defender) {
		Player player = (Player) defender;
		Item body = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_CHEST);
		if (body != null) {
			double equipLevel = body.getType().getWeaponTier();
			double base = ( Math.pow(equipLevel, 3) + (10 * equipLevel) + 100 );
			double bonus = 0.23 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getLegsBonus(Entity defender) {
		Player player = (Player) defender;
		Item legs = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_BOTTOMS);
		if (legs != null) {
			double equipLevel = legs.getType().getWeaponTier();
			double base = ( Math.pow(equipLevel, 3) + (10 * equipLevel) + 100 );
			double bonus = 0.22 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getShieldBonus(Entity defender) {
		Player player = (Player) defender;
		Item shield = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_SHIELD);
		if (shield != null) {
			double equipLevel = shield.getType().getWeaponTier();
			double base = ( Math.pow(equipLevel, 3) + (10 * equipLevel) + 100 );
			double bonus = 0.2 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getGlovesBonus(Entity defender) {
		Player player = (Player) defender;
		Item gloves = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_GLOVES);
		if (gloves != null) {
			double equipLevel = gloves.getType().getWeaponTier();
			double base = ( Math.pow(equipLevel, 3) + (10 * equipLevel) + 100 );
			double bonus = 0.05 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getBootsBonus(Entity defender) {
		Player player = (Player) defender;
		Item boots = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_BOOTS);
		if (boots != null) {
			double equipLevel = boots.getType().getWeaponTier();
			double base = ( Math.pow(equipLevel, 3) + (10 * equipLevel) + 100 );
			double bonus = 0.05 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getCapeBonus(Entity defender) {
		Player player = (Player) defender;
		Item cape = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_CAPE);
		if (cape != null) {
			double equipLevel = cape.getType().getWeaponTier();
			double base = ( Math.pow(equipLevel, 3) + (10 * equipLevel) + 100 );
			double bonus = 0.03 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getRingBonus(Entity defender) {
		Player player = (Player) defender;
		Item ring = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_RING);
		if (ring != null) {
			double equipLevel = ring.getType().getWeaponTier();
			double base = ( Math.pow(equipLevel, 3) + (10 * equipLevel) + 100 );
			double bonus = 0.02 * base;
			return bonus;
		} else
			return 0;
	}
	//End Armour Bonus
	
	//Start Life Bonus
	public static double getTotalLifeBonus(Entity player) {
		double headBonus = getHeadLifeBonus(player);
		double bodyBonus = getBodyLifeBonus(player);
		double legsBonus = getLegsLifeBonus(player);
		double shieldBonus = getShieldLifeBonus(player);
		return headBonus + bodyBonus + legsBonus + shieldBonus;
	}
	
	static double getHeadLifeBonus(Entity defender) {
		Player player = (Player) defender;
		Item head = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_HELM);
		if (head != null) {
			double equipLevel = head.getType().getWeaponTier();
			double base = (equipLevel - 69);
			double bonus = 20 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getBodyLifeBonus(Entity defender) {
		Player player = (Player) defender;
		Item body = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_CHEST);
		if (body != null) {
			double equipLevel = body.getType().getWeaponTier();
			double base = (equipLevel - 69);
			double bonus = 40 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getLegsLifeBonus(Entity defender) {
		Player player = (Player) defender;
		Item legs = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_BOTTOMS);
		if (legs != null) {
			double equipLevel = legs.getType().getWeaponTier();
			double base = (equipLevel - 69);
			double bonus = 30 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getShieldLifeBonus(Entity defender) {
		Player player = (Player) defender;
		Item shield = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_SHIELD);
		if (shield != null) {
			double equipLevel = shield.getType().getWeaponTier();
			double base = (equipLevel - 69);
			double bonus = 35 * base;
			return bonus;
		} else
			return 0;
	}
	//End Life Bonus
	
	//Start Armour Damage Bonus
	public static double getTotalArmourDamageBonus(Entity defender) {
		double headBonus = getHeadDamageBonus(defender);
		double bodyBonus = getBodyDamageBonus(defender);
		double legsBonus = getLegsDamageBonus(defender);
		double glovesBonus = getGlovesDamageBonus(defender);
		double bootsBonus = getBootsDamageBonus(defender);
		double capeBonus = getCapeDamageBonus(defender);
		return headBonus + bodyBonus + legsBonus + glovesBonus +
				bootsBonus + capeBonus;
	}
	
	static double getHeadDamageBonus(Entity defender) {
		Player player = (Player) defender;
		Item head = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_HELM);
		if (head != null) {
			double equipLevel = head.getType().getWeaponTier();
			double base = equipLevel;
			double bonus = 0.25 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getBodyDamageBonus(Entity defender) {
		Player player = (Player) defender;
		Item body = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_CHEST);
		if (body != null) {
			double equipLevel = body.getType().getWeaponTier();
			double base = equipLevel;
			double bonus = 0.375 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getLegsDamageBonus(Entity defender) {
		Player player = (Player) defender;
		Item legs = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_BOTTOMS);
		if (legs != null) {
			double equipLevel = legs.getType().getWeaponTier();
			double base = equipLevel;
			double bonus = 0.3125 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getGlovesDamageBonus(Entity defender) {
		Player player = (Player) defender;
		Item gloves = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_GLOVES);
		if (gloves != null) {
			double equipLevel = gloves.getType().getWeaponTier();
			double base = equipLevel;
			double bonus = 0.15625 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getBootsDamageBonus(Entity defender) {
		Player player = (Player) defender;
		Item boots = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_BOOTS);
		if (boots != null) {
			double equipLevel = boots.getType().getWeaponTier();
			double base = equipLevel;
			double bonus = 0.15625 * base;
			return bonus;
		} else
			return 0;
	}
	
	static double getCapeDamageBonus(Entity defender) {
		Player player = (Player) defender;
		Item cape = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_CAPE);
		if (cape != null) {
			double equipLevel = cape.getType().getWeaponTier();
			double base = equipLevel;
			double bonus = 0.12625 * base;
			return bonus;
		} else
			return 0;
	}
	//End Amour Damage Bonus
	
	/**
	 * Calculate Max Range Hit
	 * @param defender
	 * @return
	 */
	public static double calculateMaxRangedHit(Entity defender) {
		Player player = (Player) defender;
		int rangedLevel = player.getSkills().getBaseLevel(SkillType.RANGED);
		double rangedStrength = type.getArrowDamage();
		double maxHit = (rangedLevel + rangedStrength / 8 + rangedLevel * rangedStrength * Math.pow(64, -1) + 14) / 10;
		return (int) Math.floor(maxHit);
	}
	
	/**
	 * Calculate Max Melee Hit
	 * @param defender
	 * @return
	 */
	public static double calculateMaxMeleeHit(Entity defender) {
		Player player = (Player) defender;
		double strBonus = player.getSkills().getBaseLevel(SkillType.STRENGTH) * 2.5;
		int effectiveStrengthDamage = (int) (strBonus);
		double baseDamage = 5 + (effectiveStrengthDamage + 8) * (player.getSkills().getBaseLevel(SkillType.PRAYER) + 10) + 64 / 64;
		int maxHit = (int) Math.floor(baseDamage);
		return (int) Math.floor(maxHit / 10);
	}
	
	
	double meleeAbilityMainhand(int itemID, int playerStrengthLevel, int totalWornStrengthBonus) {
		 ItemType item = ItemTypeList.list(itemID);
		 return (2.5 * playerStrengthLevel) + (item.getMeleeDamage() * getMeleeWeaponSpeed(item)) + totalWornStrengthBonus;
		}

	double meleeAbilityOffhand(int itemID, int playerStrengthLevel, int totalWornStrengthBonus) {
		 ItemType item = ItemTypeList.list(itemID);
		 return (1.25 * playerStrengthLevel) + (item.getMeleeDamage() * getMeleeWeaponSpeed(item)) + (0.5 * totalWornStrengthBonus);
		}

	double meleeAbility2Hander(int itemID, int playerStrengthLevel, int totalWornStrengthBonus) {
		 ItemType item = ItemTypeList.list(itemID);
		 return (3.75 * playerStrengthLevel) + (item.getMeleeDamage() * getMeleeWeaponSpeed(item)) + (1.5 * totalWornStrengthBonus);
		}


	public static double getMeleeWeaponSpeed(ItemType item) {
		 int speed = item.getAttackSpeed();
		 if(speed == 4)//avg
		  return 96/149;
		 else if(speed == 5)//fast
		  return 960/1225;
		 else if(speed == 6)//fastest
		  return 1;
		 return 0;//should never happen?
		}
	
	public static int getWeaponSpeedInTicks(Item item) {
	int speed = item.getType().getAttackSpeed();
		if(speed == 4)//avg
			return 6;
		else if(speed == 5)//fast
			return 5;
		else if(speed == 6)//fastest
		  return 4;
		 	return 4;//should never happen?
	}

	public static double getHitChance(double accuracy, double equipment, double defence, double weakness) {
		return (accuracy * equipment) / (defence * weakness);
	}

	public static double getLevelAccuracy(double level) {
		return (0.0008 * Math.pow(level, 3)) + (4D * level) + 40D;
	}

	public static double getCompleteAccuracy(double level, double weaponLevel) {
		return getLevelAccuracy(level) + 2.5 * getLevelAccuracy(weaponLevel);
	}

	public static double getEquipmentPenalty(int shieldId, int bodyId, int legId) {
		double penalty = 1;
		/**
		 * Wearing armour of the wrong class can negatively affect hit chance. 
		 * Wearing any items in the shield, body, or legs slot of the class you 
		 * are strong to (if using melee, this is Ranged) will reduce your hit 
		 * chance by 15%. Wearing any items in those slots of the class you are 
		 * weak to will reduce your hit chance by 8%. Armour of the wrong class 
		 * worn in the helmet, gloves, and boots slot also negatively impact 
		 * accuracy as of the Legacy update. This is intended to force players 
		 * to use items of the same class while fighting.
		 */
		return penalty;
	}
	
	
	public static double getWeaknessMultiplier(int[] attackerItemIds, int[] defenderItemIds) {
		return 1;
	}
	
	/**
	 * This is the chance to block an {@code NPC} attack.
	 * 
	 * @param accuracy the accuracy of the defending player
	 * @param multiplier the equipment multiplier of the defending player
	 * @param armour the armour of the attacking npc
	 * @return the block chance of the player
	 */
	public static double getBlockChance(double accuracy, double multiplier, double armour) {
		return 1 - ((accuracy * multiplier) / armour);
	}
	
	public static double getEquipmentMultiplier(int weakItemAmount, int neutralItemAmount, int strongItemAmount) {
		double numerator = (weakItemAmount * 2.25D + neutralItemAmount * 1.65D + strongItemAmount * 1.2D);
		double denominator = (weakItemAmount + neutralItemAmount + strongItemAmount);
		return numerator / denominator;
	}

	/**
	 * This just shows an example of the combat accuracy
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		double atkAccuracy = (int) getCompleteAccuracy(99, 90); //the attackers attacking accuracy
		double defAccuracy = (int) getLevelAccuracy(90); //the opponents defence accuracy, or F(defenceLevel)
		double equipmentPenalty = getEquipmentPenalty(0, 0, 0); //the equipment penalty of the attacker
		double equipment = getEquipmentMultiplier(1, 0, 0); //the equipment multiplier of the attacker
		double equipmentModifier = (equipment <= 0  || equipment == Double.NaN ? 1 : equipment) * equipmentPenalty; //the equipment modifier of the attacker
		
		double weakness = getWeaknessMultiplier(null, null); //the opponents defence weakness multiplier
		
		double hitChance = getHitChance(atkAccuracy, equipmentModifier, defAccuracy, weakness);
		System.out.printf("ATK Accuracy: %s, DEF Accuracy: %s, Equipment: %s, Weakness: %s, Hit Chance: %s\n", atkAccuracy, defAccuracy, equipmentModifier, weakness, hitChance);
		for (int i = 0; i < 100; i++) {
			double chance = Math.random();
			System.out.println("Hit Monster: "+(chance < hitChance));
		}
	
	}

}
