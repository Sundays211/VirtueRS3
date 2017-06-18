package org.virtue.game.entity.combat.hit;

public enum DamageType {//141
	REGULAR(144/*0x3*/), 
	REFLECTED(146/*0x4*/), 
	ABSORBED(148/*0x5*/), 
	POISON(147/*0x6*/), 
	DESEASE(0x7), 
	MISSED(141/*0x8*/),
	HEALED(143/*0x9*/), 
	CANNON(145/*0xd*/), 
	//Option 1: melee=132, ranged=135, mage=138
	//Option 2: melee=149, ranged=152, mage=155
	//Option 3: melee=150, ranged=153, mage=156
	MELEE(132/*0x30*/), 
	RANGE(135/*0x31*/),
	MAGIC(138/*0x32*/), 
	INSTANT_KILL(0x36), 
	HIDDEN_HIT(0x7ffe), 
	DOUBLE_HIT(0x7fff),
	MELEE_DAMAGE_2(150),
	MAGIC_DAMAGE_2(156), 
	RANGE_DAMAGE_2(153);

	private int hitMask;

	/**
	 * Constructs a new {@code HitType} instance.
	 * 
	 * @param hitMask
	 *            The hit mask id.
	 */
	private DamageType(int hitMask) {
		this.hitMask = hitMask;
	}

	/**
	 * Gets the hit mask id.
	 * 
	 * @return The hit mask id.
	 */
	public int getMask() {
		return hitMask;
	}
}