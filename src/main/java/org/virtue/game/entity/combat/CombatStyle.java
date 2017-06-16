package org.virtue.game.entity.combat;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.hit.DamageType;
import org.virtue.game.entity.combat.impl.AttackHandler;
import org.virtue.game.entity.combat.impl.magic.MagicAttackEvent;
import org.virtue.game.entity.combat.impl.melee.MeleeAttackEvent;
import org.virtue.game.entity.combat.impl.range.RangeAttackEvent;
import org.virtue.game.entity.combat.impl.range.ammo.WeaponType;
import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.inv.Item;

/**
 * Represents the available combat styles.
 * @author Emperor
 *
 */
public enum CombatStyle {

	//missing brighter hit marks for your view, these below are for seeing other player
	//hit marks
	MELEE(new MeleeAttackEvent(), DamageType.MELEE, DamageType.MELEE_DAMAGE_2),
	RANGE(new RangeAttackEvent(), DamageType.RANGE, DamageType.RANGE_DAMAGE_2),
	MAGIC(new MagicAttackEvent(), DamageType.MAGIC, DamageType.MAGIC_DAMAGE_2),
	DRAGONFIRE(null, DamageType.MAGIC, DamageType.MAGIC_DAMAGE_2);
	
	/**
	 * The attack handler for this combat style.
	 */
	private final AttackEvent attack;
	
	/**
	 * The hit type.
	 */
	private final DamageType hitType;

	/**
	 * The default hit type.
	 */
	private DamageType defaultHitType;
	
	/**
	 * Constructs a new {@code CombatStyle} {@code Object}.
	 * @param attack The attack event.
	 * @param hitType The hit type.
	 */
	private CombatStyle(AttackEvent attack, DamageType defaultHitType, DamageType hitType) {
		this.attack = attack;
		this.setDefaultHitType(defaultHitType);
		this.hitType = hitType;
	}
	
	/**
	 * Gets the combat style used by the entity.
	 * @param entity The entity.
	 * @return The combat style.
	 */
	public static CombatStyle get(Entity entity) {
		if (entity.getCombatSchedule().getAutocastSpell() != null) {
			return CombatStyle.MAGIC;
		}
		if (entity instanceof Player) {
			Player player = (Player) entity;
			Item weapon = player.getEquipment().getWorn(3);
			WeaponType type;
			if (weapon == null || (type = WeaponType.get(weapon)) == null) {
				return CombatStyle.MELEE;
			}
			return type.getStyle();
		}
		//TODO: NPC combat styles picking.
		return CombatStyle.MELEE;
	}
	
	/**
	 * Checks if the entity can attack the target.
	 * @param entity The entity.
	 * @param lock The target.
	 * @return {@code True} if so.
	 */
	public boolean canAttack(Entity entity, Entity lock) {
		return attack.canAttack(entity, lock);
	}
	
	/**
	 * Creates a new attack event object.
	 * @return The attack event instance.
	 */
	public AttackEvent createEvent() {
		AttackEvent event = attack.instantiate();
		event.setFallback(true);
		return event;
	}

	/**
	 * Creates a new attack event using the given handler.
	 * @param handler The attack handler.
	 * @return The event.
	 */
	public AttackEvent createEvent(AttackHandler handler) {
		AttackEvent event = attack.instantiate();
		event.handler = handler;
		return event;
	}

	/**
	 * Gets the default attack handler.
	 * @return The default attack handler.
	 */
	public AttackHandler getHandler() {
		return attack.handler;
	}

	/**
	 * Gets the handler value.
	 * @return The handler.
	 * @deprecated This will not create a new instance!
	 */
	@Deprecated
	public AttackEvent getEventWrapper() {
		return attack;
	}

	/**
	 * Gets the hit type.
	 * @return The hit type.
	 */
	public DamageType getHitType() {
		return hitType;
	}

	/**
	 * Gets the defaultHitType value.
	 * @return The defaultHitType.
	 */
	public DamageType getDefaultHitType() {
		return defaultHitType;
	}

	/**
	 * Sets the defaultHitType value.
	 * @param defaultHitType The defaultHitType to set.
	 */
	public void setDefaultHitType(DamageType defaultHitType) {
		this.defaultHitType = defaultHitType;
	}
	
}