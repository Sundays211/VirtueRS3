package org.virtue.model.entity.old_combat.action.impl;

import java.util.Random;

import org.virtue.Constants;
import org.virtue.model.World;
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
import org.virtue.model.entity.region.GroundItem;
import org.virtue.model.entity.region.Region;
import org.virtue.model.entity.region.packets.Projectile;
import org.virtue.model.entity.update.block.GraphicsBlock;
import org.virtue.model.entity.update.block.HitMarkBlock;
import org.virtue.network.event.context.impl.out.SceneUpdateEventContext;
import org.virtue.network.event.encoder.impl.SceneUpdateEventEncoder;
import org.virtue.openrs.def.impl.ItemType;

public class EoCRangeAction extends CombatAction {
	
	private ItemType type;
	
	
	public ItemType getType () {
		return type;
	}

	@Override
	public void attack(Entity attacker, Entity defender, boolean successful) {
		if (successful) {
			int damage = (int) (Math.random() * 990);
			Player player = (Player) attacker;
			Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
			Item ammo = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_ARROWS);
			if (ammo == null) {
				player.getDispatcher().sendGameMessage("You're out of ammunition!");	
				return;
			}		
			Random rn = new Random();
			double combatXp = (damage / 15.127);
			double hpXp = (damage / 45.85);
			player.getSkills().addExperience(SkillType.RANGED, combatXp);
			player.getSkills().addExperience(SkillType.CONSTITUTION, hpXp);
			
			if (weapon.getType().name.contains("dart") || weapon.getType().name.contains("javelin")
					|| weapon.getType().name.contains("throwing axe") || weapon.getType().name.contains("Toktz-xil-ul") || weapon.getType().name.contains("chinchompa")) {
				useThrowing(attacker, defender);
			} else {
				useAmmunition(attacker, defender);
			}

			if (weapon.getType().name.contains("Crystal bow") || weapon.getType().name.contains("Zaryte bow") ||
					weapon.getType().name.contains("dart") || weapon.getType().name.contains("javelin")
					|| weapon.getType().name.contains("throwing axe") || weapon.getType().name.contains("Toktz-xil-ul") || weapon.getType().name.contains("chinchompa")) {
				if (weapon != null && attacker instanceof Player) {
					((Player) attacker).getDispatcher().sendEvent(SceneUpdateEventEncoder.class, new SceneUpdateEventContext(new Projectile(attacker.getCurrentTile(), defender.getCurrentTile(), defender, getDartProjectileGFX(weapon), 17, 30, 10, 31, 32)));
				}
			} else {
				if (ammo != null && attacker instanceof Player) {
					((Player) attacker).getDispatcher().sendEvent(SceneUpdateEventEncoder.class, new SceneUpdateEventContext(new Projectile(attacker.getCurrentTile(), defender.getCurrentTile(), defender, getProjectileGFX(ammo), 17, 30, 10, 31, 32)));
				}
			}
			
			int weaponAcc = rn.nextInt(weapon.getType().getRangedAccuracy());	
			int weaponDamage = rn.nextInt(ammo.getType().getArrowDamage());

			if (weaponDamage < 1)
				weaponDamage = 0;
			int levelAccBon = rn.nextInt((attacker.getCombat().getLevelAccuracyBonus(player.getSkills().getCurrentLevel(SkillType.RANGED))));
			if (weaponDamage == 0)
				damage = 0;
			else 
				damage = (weaponAcc + weaponDamage + levelAccBon);
			
			damage = Math.min(damage, defender.getCombat().getHitpoints());//Doesn't make sense for a hit to be more than the remaining hitpoints
			if (damage == 0) {
				return;
			}
			if ((defender.getCombat().getMaxHitpoints() == damage) && (defender.getCombat().getHitpoints() == defender.getCombat().getMaxHitpoints())) {
				defender.getCombat().queueHits(new Hit(damage, HitType.RANGE_DAMAGE)); //This should only be instant kill with deathtouch darts
			} else {
				if (damage > 200)
					defender.getCombat().queueHits(new Hit(damage, HitType.RANGE_DAMAGE_2));
				else if (damage < 200)
					defender.getCombat().queueHits(new Hit(damage, HitType.RANGE_DAMAGE));
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
				defender.getCombat().queueHits(new Hit(damage, HitType.RANGE_DAMAGE)); //This should only be instant kill with deathtouch darts
			} else {
				defender.getCombat().queueHits(new Hit(damage, HitType.RANGE_DAMAGE));
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
		return (int) (getType().getParam(643, -1)/10);
	}

	@Override
	public CombatSetting getSetting() {
		return CombatSetting.EVOLUTION;
	}

	@Override
	public int getAttackAnimation(Entity attacker, Entity defender, boolean mainHand) {
		int animation = -1;
		if (attacker instanceof Player) {
			Player player = (Player) attacker;
			Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
			Item ammo = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_ARROWS);
			if(weapon != null && ammo != null) {
				animation = player.getMode() == CombatMode.EOC ? weapon.getType().getMainhandEmote() : weapon.getType().getMainhandEmoteLegacy();
			} 
			if(weapon !=null && ammo == null) {
				animation = 424;
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
			Item ammo = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_ARROWS);
			if(weapon != null && ammo != null) {
				animation = player.getMode() == CombatMode.EOC ? weapon.getType().getOffhandEmote() : weapon.getType().getOffhandEmoteLegacy();
			}
			if(weapon !=null && ammo == null) {
				animation = 424;
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
	
	
	/**
	 * 
	 * Checking and using Ammunition
	 * @param attacker
	 * @param defender
	 */
	private void useAmmunition(Entity attacker, Entity defender) {
		Player player = (Player) attacker;
		Item ammo = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_ARROWS);
		if (ammo == null) {
			return;
		}
	    int amount = player.getInvs().getContainer(ContainerState.EQUIPMENT).getNumberOf(ammo.getId());
		Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
		if (weapon == null) {
			return;
		}
	    if (amount <= 1) {
	    	player.getInvs().getContainer(ContainerState.EQUIPMENT).clearSlot(CombatVariables.SLOT_ARROWS);
			player.getInvs().sendContainer(ContainerState.EQUIPMENT);
			player.getAppearance().refresh();
	    }
		if (amount > 0) {
		    ammo.setAmount(ammo.getAmount() - 1);
		    sendArrowDrop(attacker, defender);
			player.getInvs().sendContainer(ContainerState.EQUIPMENT);
			player.getAppearance().refresh();
		} else {
			return;
		    //no ammo
		}
	}
	
	/**
	 * 
	 * Checking and using Ammunition
	 * @param attacker
	 * @param defender
	 */
	private void useThrowing(Entity attacker, Entity defender) {
		Player player = (Player) attacker;
		Item weapon = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_WEAPON);
		if (weapon == null) {
			return;
		}
		if (weapon.getType().name.contains("Deathtouched dart")) {
			if (defender instanceof Player) {
				player.getDispatcher().sendGameMessage("You cannot use this against a player!");	
				player.stopAll();
			} else {
				defender.queueUpdateBlock(new GraphicsBlock(1, 3428));
				defender.getCombat().queueHits(new Hit(1, HitType.INSTANT_KILL));
				defender.getCombat().setHitpoints(defender.getCombat().getHitpoints() - 5000000);
			}
		}
	    int amount = player.getInvs().getContainer(ContainerState.EQUIPMENT).getNumberOf(weapon.getId());
	    if (amount <= 1) {
	    	player.getInvs().getContainer(ContainerState.EQUIPMENT).clearSlot(CombatVariables.SLOT_WEAPON);
			player.getInvs().sendContainer(ContainerState.EQUIPMENT);
			player.getAppearance().refresh();
	    }
		if (amount > 0) {
			weapon.setAmount(weapon.getAmount() - 1);
			player.getInvs().sendContainer(ContainerState.EQUIPMENT);
			player.getAppearance().refresh();
		} else {
			return;
		    //no ammo
		}
	}
	
	public int getDartProjectileGFX(Item weapon) {
		return weapon.getType().getProjectileGFX();
	}
	
	public int getProjectileGFX(Item arrow) {
		return arrow.getType().getProjectileGFX();
	}
	
	/**
	 * 
	 * Sends ground arrows
	 * @param attacker
	 * @param defender
	 */
	private void sendArrowDrop(Entity attacker, Entity defender) {
		Player player = (Player) attacker;
		Item ammo = player.getInvs().getContainer(ContainerState.EQUIPMENT).get(CombatVariables.SLOT_ARROWS);
		Region region = World.getInstance().getRegions().getRegionByID(defender.getCurrentTile().getRegionID());
		if (region != null && region.isLoaded()) {
			if(ammo == null) {
				return;
			}
			int oldAmt = 0;
			Region region1 = World.getInstance().getRegions().getRegionByID(defender.getCurrentTile().getRegionID());
			if (region1 != null) {
				GroundItem oldItem = region1.removeItem(defender.getCurrentTile(), ammo.getId());
				if (oldItem != null)
					oldAmt = oldItem.getAmount();
			}
			GroundItem groundItem = new GroundItem(ammo.getId(), oldAmt + 1, defender.getCurrentTile());
			groundItem.setSpawnTime(Constants.ITEM_REMOVAL_DELAY);
			region.addItem(groundItem);
			
		}
	}


	/* (non-Javadoc)
	 * @see org.virtue.model.entity.combat.action.CombatAction#getDistance()
	 */
	@Override
	public int getDistance() {
		return 10;
	}
}