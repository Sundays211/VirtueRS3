package org.virtue.game.entity.combat.impl.formula;

import org.virtue.Virtue;
import org.virtue.engine.script.api.ScriptAPI;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.CombatMode;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.Item;
import org.virtue.game.entity.player.stat.Stat;

/**
 * Combat Formula
 * 
 * @author Kayla
 * @date 11/21/2015
 */
public class Formula {

	private static ScriptAPI api = Virtue.getInstance().getScripts().getApi();

	/**
	 * Calculates the Max Melee Hit.
	 */
	public static int getMaximumMeleeHit(Entity entity, Entity enemy) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item mainHand = player.getEquipment().getWorn(3);
			double strBaseLvl = player.getSkills().getCurrentLevel(Stat.STRENGTH);
			double armourBonus = getTotalArmourDamageBonus(entity);
			double bonus = 1;
			if (mainHand != null) {
				if (mainHand.is2H())
					strBaseLvl *= 1.5;
				if (player.getMode().equals(CombatMode.LEGACY)) {
					strBaseLvl *= 10;
					if (fullDharokEquipped(entity, enemy)) {
						double current = player.getImpactHandler().getLifepoints();
						double max = player.getImpactHandler().getMaximumLifepoints();
						double perc = 1 - (current / max);
						bonus = 1 + (perc / 3.0272D);
					}
				}
				double mhDamage = mainHand.getType().getMeleeDamage();
				double prayerBonus = 1; //TODO
				double calcTotal = ((strBaseLvl + mhDamage + armourBonus) * prayerBonus) * bonus;

				api.sendMessage(player, "[Melee Max]: " + (int) Math.round(calcTotal));
				return (int) Math.round(calcTotal);
			}
		} else if (entity instanceof NPC) {
			NPC npc = (NPC) entity;
			int totalDef = 0;
			if (npc != null) {
				totalDef = npc.getType().getDamage();
			}
			return (int) F(totalDef / 10);
		}
		return 100;
	}
	
	/**
	 * Calculates the Max Range Hit.
	 */
	public static int getMaximumRangeHit(Entity entity, Entity enemy) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item mainHand = player.getEquipment().getWorn(3);
			Item arrowSlot = player.getEquipment().getWorn(13);
			double rngBaseLvl = player.getSkills().getCurrentLevel(Stat.RANGED);
			double armourBonus = getTotalArmourRangeDamageBonus(entity);
			double arrowDamage = 0;
			if (mainHand != null) {//
				if (arrowSlot != null) {
					arrowDamage = arrowSlot.getType().getArrowDamage();
				}
				if (mainHand.is2H())
					rngBaseLvl *= 1.5;
				if (player.getMode().equals(CombatMode.LEGACY))
					rngBaseLvl *= 10;

				double mhDamage = mainHand.getType().getBowDamage();
				double calcTotal = (rngBaseLvl + mhDamage + armourBonus + arrowDamage);
				api.sendMessage(player, "[Range Max]: " + (int) Math.round(calcTotal));
				return (int) Math.round(calcTotal);
			}
		} else if(entity instanceof NPC) {
			 NPC npc = (NPC) entity;
			 int totalDef = 0;
			 if(npc != null) {
				 totalDef = npc.getType().getRangeDamage();
			 }
			 return (int) F(totalDef / 10);
		 }
		return 100;
	}
	
	/**
	 * Calculates the Maximum Melee Accuracy.
	 */
	public static int getMaximumMeleeAccuracy(Entity entity, Entity lock) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item mainHand = player.getEquipment().getWorn(3);
			double atkBaseLvl = F(player.getSkills().getCurrentLevel(Stat.ATTACK));
			if (mainHand != null) {
				int accuracy = mainHand.getType().getMeleeWeaponAccuracy();
				double calcTotal = (atkBaseLvl + accuracy);
				api.sendMessage(player, "[Accuracy]: " + (int) Math.round(calcTotal));
				return (int) Math.round(calcTotal);
			}
		} else if(entity instanceof NPC) {
			 NPC npc = (NPC) entity;
			 int totalDef = 0;
			 if(npc != null) {
				 totalDef = npc.getType().getMeleeAccuracy();
			 }
			 return (int) F(totalDef);
		 }
		return 100;
	}
	
	/**
	 * Calculates the Maximum Range Accuracy.
	 */
	public static int getMaximumRangeAccuracy(Entity entity, Entity lock) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item mainHand = player.getEquipment().getWorn(3);
			double rngBaseLvl = F(player.getSkills().getCurrentLevel(Stat.RANGED));
			if (mainHand != null) {
				int accuracy = mainHand.getType().getRangedAccuracy();
				double calcTotal = (rngBaseLvl + accuracy);
				api.sendMessage(player, "[Accuracy]: " + (int) Math.round(calcTotal));
				return (int) Math.round(calcTotal);
			}
		} else if(entity instanceof NPC) {
			 NPC npc = (NPC) entity;
			 int totalDef = 0;
			 if(npc != null) {
				 totalDef = npc.getType().getRangeAccuracy();
			 }
			 return (int) F(totalDef);
		 }
		return 100;
	}
	  
	/**
	 * Calculates the Maximum Magic Accuracy
	 */
	public static int getMaximumMagicAccuracy(Entity entity, Entity enemy) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item mainHand = player.getEquipment().getWorn(3);
			double magicBaseLvl = player.getSkills().getCurrentLevel(Stat.MAGIC);
			if (mainHand != null) {
				double accuacy = mainHand.getType().getMagicAccuracy();
				double calcTotal = (magicBaseLvl + accuacy);
				api.sendMessage(player, "[Accuracy]: " + (int) Math.round(calcTotal));
				return (int) Math.round(calcTotal);
			}
		} else if(entity instanceof NPC) {
			 NPC npc = (NPC) entity;
			 int totalDef = 0;
			 if(npc != null) {
				 totalDef = npc.getType().getMagicAccuracy();
			 }
			 return (int) F(totalDef);
		 }
		return 100;
	}
	   
	
	/**
	 * Calculates the NPC Defence
	 */
	 public static int getNPCDefence(Entity entity, Entity enemy) {
		 if(enemy instanceof NPC) {
			 NPC npc = (NPC) enemy;
			 int totalDef = 0;
			 if(npc != null) {
				 totalDef = npc.getType().getDefence();
			 }
			 return (int) F(totalDef);
		 }
		 return 50;
	 }
	 
	public static final boolean fullDharokEquipped(Entity entity, Entity enemy) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item head = player.getEquipment().getWorn(0);
			Item chest = player.getEquipment().getWorn(4);
			Item legs = player.getEquipment().getWorn(7);
			Item weapon = player.getEquipment().getWorn(3);
			if (head == null || chest == null || legs == null || weapon == null)
				return false;
			return head.getType().name.contains("Dharok's") && chest.getType().name.contains("Dharok's")
					&& legs.getType().name.contains("Dharok's") && weapon.getType().name.contains("Dharok's");
		}
		return false;
	}
	
	/**
	 * Total Armour Defence Bonuses
	 */
	public static int getArmourTotalDefence(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			double defenceBaseLvl = F(player.getSkills().getCurrentLevel(Stat.DEFENCE)) + 0.5d;
			int headBonus = getHeadDefenceBonus(entity, enemy);
			int bodyBonus = getChestDefenceBonus(entity, enemy);
			int legsBonus = getLegsDefenceBonus(entity, enemy);
			int glovesBonus = getGlovesDefenceBonus(entity, enemy);
			int bootsBonus = getBootsDefenceBonus(entity, enemy);
			int capeBonus = getCapeDefenceBonus(entity, enemy);
			int shieldBonus = getShieldDefenceBonus(entity, enemy);
			double calcTotal = (headBonus + bodyBonus + legsBonus + glovesBonus + bootsBonus + capeBonus + shieldBonus)
					+ defenceBaseLvl;
			api.sendMessage(player, "[Total Def]: " + (int) Math.round(calcTotal));
			return (int) Math.round(calcTotal);
		} else if(entity instanceof NPC) {
			 NPC npc = (NPC) enemy;
			 int totalDef = 0;
			 if(npc != null) {
				 totalDef = npc.getType().getDefence();
			 }
			 return (int) F(totalDef);
		 }
		return 50;
	}
	
	static int getHeadDefenceBonus(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			Item head = player.getEquipment().getWorn(0);
			if (head != null) {
				int equipLevel = head.getType().getArmourDefence();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static int getChestDefenceBonus(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			Item chest = player.getEquipment().getWorn(4);
			if (chest != null) {
				int equipLevel = chest.getType().getArmourDefence();
				return (equipLevel);
			}
		}
		return 0;
	}
	
	static int getShieldDefenceBonus(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			Item shield = player.getEquipment().getWorn(5);
			if (shield != null) {
				int equipLevel = shield.getType().getArmourDefence();
				return (equipLevel);
			}
		}
		return 0;
	}
	
	static int getLegsDefenceBonus(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			Item legs = player.getEquipment().getWorn(7);
			if (legs != null) {
				int equipLevel = legs.getType().getArmourDefence();
				return (equipLevel);
			}
		}
		return 0;
	}
	
	static int getGlovesDefenceBonus(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			Item gloves = player.getEquipment().getWorn(9);
			if (gloves != null) {
				int equipLevel = gloves.getType().getArmourDefence();
				return (equipLevel);
			}
		}
		return 0;
	}
	
	static int getBootsDefenceBonus(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			Item boots = player.getEquipment().getWorn(10);
			if (boots != null) {
				int equipLevel = boots.getType().getArmourDefence();
				return (equipLevel);
			}
		}
		return 0;
	}
	
	static int getCapeDefenceBonus(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			Item cape = player.getEquipment().getWorn(1);
			if (cape != null) {
				int equipLevel = cape.getType().getArmourDefence();
				return (equipLevel);
			}
		}
		return 0;
	}
	
	static int getRingDefenceBonus(Entity entity, Entity enemy) {
		if (enemy instanceof Player) {
			Player player = (Player) enemy;
			Item ring = player.getEquipment().getWorn(12);
			if (ring != null) {
				int equipLevel = ring.getType().getArmourDefence();
				return (equipLevel);
			}
		}
		return 0;
	}
	
	
	public static double getTotalArmourDamageBonus(Entity entity) {
		double headBonus = getHeadDamageBonus(entity);
		double bodyBonus = getChestDamageBonus(entity);
		double legsBonus = getLegsDamageBonus(entity);
		double glovesBonus = getGlovesDamageBonus(entity);
		double bootsBonus = getBootsDamageBonus(entity);
		double capeBonus = getCapeDamageBonus(entity);
		double ringBonus = getRingDamageBonus(entity);
		double amuletBonus = getAmuletDamageBonus(entity);
		return headBonus + bodyBonus + legsBonus + glovesBonus +
				bootsBonus + capeBonus + ringBonus + amuletBonus;
	}
	
	static double getHeadDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item head = player.getEquipment().getWorn(0);
			if (head != null) {
				double equipLevel = head.getType().getMeleeDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getChestDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item chest = player.getEquipment().getWorn(4);
			if (chest != null) {
				double equipLevel = chest.getType().getMeleeDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getLegsDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item legs = player.getEquipment().getWorn(7);
			if (legs != null) {
				double equipLevel = legs.getType().getMeleeDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getGlovesDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item gloves = player.getEquipment().getWorn(9);
			if (gloves != null) {
				double equipLevel = gloves.getType().getMeleeDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getBootsDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item boots = player.getEquipment().getWorn(10);
			if (boots != null) {
				double equipLevel = boots.getType().getMeleeDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getCapeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item cape = player.getEquipment().getWorn(1);
			if (cape != null) {
				double equipLevel = cape.getType().getMeleeDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getAmuletDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item amulet = player.getEquipment().getWorn(2);
			if (amulet != null) {
				double equipLevel = amulet.getType().getMeleeDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getRingDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item ring = player.getEquipment().getWorn(12);
			if (ring != null) {
				double equipLevel = ring.getType().getMeleeDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	//Range Damage Formula
	public static double getTotalArmourRangeDamageBonus(Entity entity) {
		double headBonus = getHeadRangeDamageBonus(entity);
		double bodyBonus = getChestRangeDamageBonus(entity);
		double legsBonus = getLegsRangeDamageBonus(entity);
		double glovesBonus = getGlovesRangeDamageBonus(entity);
		double bootsBonus = getBootsRangeDamageBonus(entity);
		double capeBonus = getCapeRangeDamageBonus(entity);
		double ringBonus = getRingRangeDamageBonus(entity);
		double amuletBonus = getAmuletRangeDamageBonus(entity);
		return headBonus + bodyBonus + legsBonus + glovesBonus +
				bootsBonus + capeBonus + ringBonus + amuletBonus;
	}
	
	static double getHeadRangeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item head = player.getEquipment().getWorn(0);
			if (head != null) {
				double equipLevel = head.getType().getArrowDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getChestRangeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item chest = player.getEquipment().getWorn(4);
			if (chest != null) {
				double equipLevel = chest.getType().getArrowDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getLegsRangeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item legs = player.getEquipment().getWorn(7);
			if (legs != null) {
				double equipLevel = legs.getType().getArrowDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getGlovesRangeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item gloves = player.getEquipment().getWorn(9);
			if (gloves != null) {
				double equipLevel = gloves.getType().getArrowDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getBootsRangeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item boots = player.getEquipment().getWorn(10);
			if (boots != null) {
				double equipLevel = boots.getType().getArrowDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getCapeRangeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item cape = player.getEquipment().getWorn(1);
			if (cape != null) {
				double equipLevel = cape.getType().getArrowDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getAmuletRangeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item amulet = player.getEquipment().getWorn(2);
			if (amulet != null) {
				double equipLevel = amulet.getType().getArrowDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	static double getRingRangeDamageBonus(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item ring = player.getEquipment().getWorn(12);
			if (ring != null) {
				double equipLevel = ring.getType().getArrowDamage();
				return equipLevel;
			}
		}
		return 0;
	}
	
	public static double F(int level) {
		double exp = Math.pow(level, 3);
		double base = 0.0008 * exp;
		double quadlv = 4 * level;
		return base + quadlv + 40;
	}

}
