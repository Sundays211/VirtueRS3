package org.virtue.model.entity.combat.impl.ability;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.AttackInfo;
import org.virtue.model.entity.combat.impl.ImpactInfo;
import org.virtue.script.listeners.AbilityListener;

/**
 * Wrapper for scripted abilities.
 * @author Emperor
 *
 */
public final class ScriptedAbility extends Ability {

	/**
	 * The ability listener.
	 */
	private final AbilityListener listener;

	/**
	 * Constructs a new {@code ScriptedAbility} {@code Object}.
	 * @param listener The ability listener.
	 */
	public ScriptedAbility(AbilityListener listener) {
		super(listener.getFollower(), listener.getAbilityType(), listener.getStyle(), listener.getScriptID(), listener.getClientID(), listener.getCooldownID(), listener.getCooldown());
		this.listener = listener;
	}
	
	@Override
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		if (!canActivate(entity, lock)) {
			return null;
		}
		return listener.perform(entity, lock);
	}
	
	@Override
	public ImpactInfo[] getImpacts(Entity entity, Entity lock) {
		return new ImpactInfo[0];
	}

	@Override
	public boolean canActivate(Entity entity, Entity lock) {
		return listener.canActivate(entity, lock);
	}

	@Override
	public void register() {
		//TODO:
	}

}