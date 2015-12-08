package org.virtue.game.entity.combat.impl;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.container.Item;
import org.virtue.game.node.Node;
import org.virtue.network.protocol.update.block.AnimationBlock;

/**
 * Contains combat-related utility methods.
 * @author Emperor
 *
 */
public final class CombatUtils {

	/**
	 * Gets the impact delay for the given combat style.
	 * @param style The style.
	 * @param node The attacking node.
	 * @param target The target node.
	 * @return The impact delay.
	 */
	public static int getImpactDelay(CombatStyle style, Node node, Node target) {
		switch (style) { 
		case RANGE:
			return 1 +(int) Math.ceil(node.getCurrentTile().getDistance(target.getCurrentTile()) * 0.3);
		case MAGIC:
		case DRAGONFIRE:
			return 1 + (int) Math.floor(node.getCurrentTile().getDistance(target.getCurrentTile()) * 0.4);
		case MELEE:
			return 1;
		}
		return 1;
	}
	
	/**
	 * Gets the amount of cooldown ticks.
	 * @param entity The entity.
	 * @return The amount of ticks to cooldown.
	 */
	public static int getCooldown(Entity entity, boolean offhand) {
		if (entity instanceof Player) {
			Item item = ((Player) entity).getEquipment().getWorn(offhand ? 5 : 3);
			if (item != null) {
				return item.getType().getAttackSpeed();
			}
		}
		return 4;
	}
	
	public static int getProjectileGFX(Item arrow) {
		return arrow.getType().getProjectileGFX();
	}
	
	public static int getDartProjectileGFX(Item weapon) {
		return weapon.getType().getProjectileGFX();
	}

	/**
	 * Gets the entity's default attack animation.
	 * @param entity The entity.
	 * @param offhand If we should get the offhand emote.
	 * @param legacy If legacy game mode is on.
	 * @return The animation block.
	 */
	public static AnimationBlock getAttackAnimation(Entity entity, boolean offhand, boolean legacy) {
		int animation = -1;
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item item = player.getEquipment().getWorn(offhand ? 5 : 3);
			if (item != null) {
				if (legacy) {
					animation = offhand ? item.getType().getOffhandEmoteLegacy() : item.getType().getMainhandEmoteLegacy();
				} else {
					animation = offhand ? item.getType().getOffhandEmote() : item.getType().getMainhandEmote();
				}
			}
		} else {
			NPC npc = (NPC) entity;
			animation = npc.getType().anim_attack;
		}
		if (animation == -1) {
			animation = 422;
		}
		return new AnimationBlock(animation);
	}
	
	/**
	 * Gets the entity's default attack animation.
	 * @param entity The entity.
	 * @param offhand If we should get the offhand emote.
	 * @param legacy If legacy game mode is on.
	 * @return The animation block.
	 */
	public static AnimationBlock getAggressiveAnimation(Entity entity) {
		int animation = -1;
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item item = player.getEquipment().getWorn(3);
			if (item != null) {
				animation = item.getType().getAggressiveRender();
			}
		}
		if (animation == -1) {
			animation = 422;
		}
		return new AnimationBlock(animation);
	}
	
	/**
	 * Gets the entity's default spell animation.
	 * @param entity The entity.
	 * @param offhand If we should get the offhand emote.
	 * @param legacy If legacy game mode is on.
	 * @return The animation block.
	 */
	public static AnimationBlock getSpellAnimation(Entity entity, boolean offhand, boolean legacy) {
		int animation = -1;
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item item = player.getEquipment().getWorn(offhand ? 5 : 3);
			if (item != null) {
				if (legacy) {
					animation = offhand ? item.getType().getMainhandSpellLegacy() : item.getType().getMainhandSpellLegacy();
				} else {
					animation = offhand ? item.getType().getOffhandEmote() : item.getType().getMainhandEmote();
				}
			}
		} else {
			NPC npc = (NPC) entity;
			animation = npc.getType().anim_attack;
		}
		if (animation == -1) {
			animation = 422;
		}
		return new AnimationBlock(animation);
	}
}