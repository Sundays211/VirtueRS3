package org.virtue.game.entity.combat.impl.magic;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.AttackInfo;
import org.virtue.game.entity.combat.impl.AttackHandler;
import org.virtue.game.entity.combat.impl.FollowingType;
import org.virtue.game.entity.combat.impl.ImpactInfo;
import org.virtue.network.protocol.update.block.FaceEntityBlock;

/**
 * Handles magic attack events.
 * @author Emperor
 *
 */
public class MagicAttackEvent extends AttackEvent {

	/**
	 * The default handler.
	 */
	public static final AttackHandler HANDLER = new MagicAttackHandler();
	
	/**
	 * The current combat spell.
	 */
	private CombatSpell spell;
	
	/**
	 * If the entity is autocasting.
	 */
	private boolean autocast;
	
	/**
	 * Constructs a new {@code MagicAttackEvent} {@code Object}.
	 */
	public MagicAttackEvent() {
		super(FollowingType.MAGIC, HANDLER);
	}
	
	/**
	 * Constructs a new {@code MagicAttackEvent} {@code Object}.
	 * @param spell The spell.
	 * @param autocast If the spell is being autocasted.
	 */
	public MagicAttackEvent(CombatSpell spell) {
		this(spell, false);
	}
	
	/**
	 * Constructs a new {@code MagicAttackEvent} {@code Object}.
	 * @param spell The spell.
	 * @param autocast If the spell is being autocasted.
	 */
	public MagicAttackEvent(CombatSpell spell, boolean autocast) {
		super(FollowingType.MAGIC, spell.handler);
		this.spell = spell;
		this.autocast = autocast;
	}

	@Override
	public AttackEvent instantiate() {
		return new MagicAttackEvent();
	}

	@Override
	public boolean start(Entity entity, Entity lock, AttackInfo info) {
		if (spell != null) {
			CombatSpell autocasted = entity.getCombatSchedule().getAutocastSpell();
			if (!autocast && getNext() == null && autocasted == null) {
				entity.getCombatSchedule().terminate();
			}
			if (!spell.hasRequirements(entity, lock)) {
				if (autocasted == spell && autocasted != null) {
					entity.getCombatSchedule().setAutocastSpell(null);
				}
				return false;
			}
			spell.consumeRunes(entity);
			return spell.start(entity, lock, info);
		}
		return true;
	}

	@Override
	public void impact(Entity entity, AttackInfo info, ImpactInfo impact) {
		if (spell != null) {
			entity.queueUpdateBlock(new FaceEntityBlock(entity.getCombatSchedule().getLock()));
			spell.impact(entity, info, impact);
		}
	}

}