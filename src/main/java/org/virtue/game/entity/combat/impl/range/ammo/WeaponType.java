package org.virtue.game.entity.combat.impl.range.ammo;

import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.player.inv.Item;

/**
 * The weapon types.
 * @author Emperor
 *
 */
public enum WeaponType {
	
	STAFF(1, CombatStyle.MAGIC),
	DAGGER(25, CombatStyle.MELEE),
	HATCHET(35, CombatStyle.MELEE),
	SPEAR(36, CombatStyle.MELEE),
	BOLT_RACK(38, CombatStyle.RANGE),
	FUN_WEAPON(55, CombatStyle.MELEE),
	ARROW(62, CombatStyle.RANGE),
	BOLT(63, CombatStyle.RANGE),
	BOW(64, CombatStyle.RANGE),
	CLAWS(65, CombatStyle.MELEE),
	PICKAXE(67, CombatStyle.MELEE),
	BRUTAL_ARROW(71, CombatStyle.RANGE),
	CHARGED_BOW(106, CombatStyle.RANGE),
	WHIP(150, CombatStyle.MELEE),
	CHINCHOMPA(572, CombatStyle.RANGE),
	HAND_CANNON_SHOT(1289, CombatStyle.RANGE),
	SWORD(2750, CombatStyle.MELEE),
	JAVELIN(2751, CombatStyle.RANGE),
	LONGSWORD(2752, CombatStyle.MELEE),
	WARHAMMER(2753, CombatStyle.MELEE),
	BATTLE_AXE(2754, CombatStyle.MELEE),
	DAGGER2(2755, CombatStyle.MELEE),
	SCIMITAR(2756, CombatStyle.MELEE),
	MACE(2757, CombatStyle.MELEE),
	_2H_SWORD(2758, CombatStyle.MELEE),
	CROSSBOW(2759, CombatStyle.RANGE),
	HAND_CANNON(2760, CombatStyle.RANGE),
	GMAUL(2761, CombatStyle.MELEE),
	DART(2762, CombatStyle.RANGE),
	BOOK(2763, CombatStyle.MAGIC),
	WAND(2764, CombatStyle.MAGIC),
	THROWING_AXE(2766, CombatStyle.RANGE),
	KNIFE(2767, CombatStyle.MELEE),
	CLAWS2(2768, CombatStyle.MELEE),
	MAUL(2772, CombatStyle.MELEE),
	;
	
	/**
	 * The item type.
	 */
	private final int category;
	
	/**
	 * The combat style.
	 */
	private final CombatStyle style;
	
	/**
	 * Constructs a new {@code WeaponType} {@code Object}.
	 * @param category The item type.
	 * @param style The combat style.
	 */
	private WeaponType(int category, CombatStyle style) {
		this.category = category;
		this.style = style;
	}

	/**
	 * Gets the weapon type for the given item.
	 * @param item The item.
	 * @return The weapon type.
	 */
	public static WeaponType get(Item item) {
		for (WeaponType type : values()) {
			if (item.getType().category == type.category) {
				return type;
			}
		}
		System.err.println("Unhandled weapon type -[id=" + item.getType().category + ", item=" + item.getName() + "].");
		return null;
	}

	/**
	 * Gets the id value.
	 * @return The id.
	 */
	public int getId() {
		return category;
	}

	/**
	 * Gets the style value.
	 * @return The style.
	 */
	public CombatStyle getStyle() {
		return style;
	}
}