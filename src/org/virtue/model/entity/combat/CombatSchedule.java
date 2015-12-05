package org.virtue.model.entity.combat;

import org.virtue.model.World;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.impl.ability.Ability;
import org.virtue.model.entity.combat.impl.magic.CombatSpell;
import org.virtue.model.entity.old_combat.actionbar.ActionBar;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.var.VarKey;
import org.virtue.model.entity.update.block.FaceEntityBlock;

/**
 * Used for scheduling and executing combat events.
 * @author Emperor
 *
 */
public final class CombatSchedule {

	/**
	 * The next attack event.
	 */
	private AttackEvent nextAttack;

	/**
	 * The attacking entity.
	 */
	private final Entity entity;

	/**
	 * The current victim locked on.
	 */
	private Entity lock;

	/**
	 * The previous victim locked on.
	 */
	private Entity lastLock;

	/**
	 * The autocasted spell.
	 */
	private CombatSpell autocastSpell;

	/**
	 * The delay until next event is executed.
	 */
	private int delay;

	/**
	 * The current combat style.
	 */
	private CombatStyle combatStyle = CombatStyle.MELEE;

	/**
	 * The combat schedule state.
	 */
	private CombatState state;
	
	/**
	 * If the entity is retaliating.
	 */
	private boolean retaliating;
	
	/**
	 * The adrenaline.
	 */
	private int adrenaline = 1000;
	
	/**
	 * If special attack bar is enabled.
	 */
	private boolean specialEnabled;
	
	/**
	 * The entity's action bar.
	 */
	private ActionBar actionBar;
	
	/**
	 * The ability delay.
	 */
	private int abilityDelay;
	
	/**
	 * Constructs a new {@code CombatSchedule} {@code Object}.
	 * @param entity The entity.
	 */
	public CombatSchedule(Entity entity) {
		this.entity = entity;
		if (entity instanceof Player) {
			this.actionBar = new ActionBar((Player) entity);
		}
	}

	/**
	 * Updates the combat schedule.
	 */
	public void update() {
		if (state != CombatState.PAUSED) {
			state = run();
		}
	}

	/**
	 * Runs the combat schedule and returns the current state.
	 * @return The combat state.
	 */
	private CombatState run() {
		if (lock == null || !lock.exists() || !entity.exists()) {
			releaseLock();
			return CombatState.PAUSED;
		}
		if (lock.getImpactHandler().isDead() || entity.getImpactHandler().isDead()) {
			releaseLock();
			return CombatState.PAUSED;
		}
		if (nextAttack == null && setDefaultAttack() == null) {
			releaseLock();
			return CombatState.PAUSED;
		}
		entity.getBlockQueue().face(lock);
		if (!nextAttack.getFollower().follow(entity, lock) || isCooldown()) {
			return CombatState.ACTIVE;
		}
		nextAttack.run(entity, lock);
		if (nextAttack != null) {
			nextAttack = nextAttack.getNext();
		}
		return CombatState.ACTIVE;
	}

	/**
	 * Sets the autocastSpell value.
	 * @param autocastSpell The autocastSpell to set.
	 */
	public void setAutocastSpell(CombatSpell autocastSpell) {
		this.autocastSpell = autocastSpell;
		setDefaultAttack();
	}

	/**
	 * Schedules an attack event.
	 * @param event The event.
	 */
	public void schedule(AttackEvent event) {
		schedule(event, 1);
	}

	/**
	 * Schedules an attack event.
	 * @param event The event to schedule.
	 * @param depth The amount of events that can be between first event and scheduled event 
	 * 				(0 between first and scheduled event = first, 1 = second, 2 = third, ...).
	 */
	public void schedule(AttackEvent event, int depth) {
		if (depth <= 0 || nextAttack == null) {
			nextAttack = event;
			return;
		}
		AttackEvent current = nextAttack;
		while (current.getNext() != null) {
			current = current.getNext();
			if (--depth == 0) {
				break;
			}
		}
		current.setNext(event);
		event.setPrevious(current);
	}
	
	/**
	 * Runs the ability.
	 * @param ability The ability.
	 */
	public void run(Ability ability) {
		if (actionBar.getCooldown(ability.getCooldownId()) > World.getInstance().getCycleCount()) {
			return;
		}
		if (abilityDelay > World.getInstance().getCycleCount()) {
			return;
		}
		Player player = (Player) entity;
		switch (ability.getType()) {
		case BASIC:
			increaseAdrenaline(80);
			break;
		case TRESHOLD:
			if (adrenaline < 500) {
				player.getDispatcher().sendGameMessage("Threshold abilities require you to have at least 50% adrenaline before they can be used.");
				return;
			}
			drainAdrenaline(150);
			break;
		case ULTIMATE:
			if (adrenaline < 100) {
				player.getDispatcher().sendGameMessage("Ultimate abilities require you to have 100% adrenaline before they can be used.");
				return;
			}
			drainAdrenaline(1000);
			break;
		}
		ability.run(player, player.getCombatSchedule().getAbilityLock());
		abilityDelay = World.getInstance().getCycleCount() + 3;
		actionBar.setCooldown(ability.getCooldownId(), World.getInstance().getCycleCount() + ability.getCooldown());
		player.getDispatcher().sendCS2Script(6570, new Object[] { 1, 1, ability.getCooldown(), 0, ability.getScriptId() });
		player.getDispatcher().sendCS2Script(6066, new Object[] { 14881 });//14881 is 4 ticks
	}

	/**
	 * Gets the target entity for an ability.
	 * @return The target entity.
	 */
	public Entity getAbilityLock() {
		if (lock != null) {
			return lock;
		}
		return lastLock;
	}

	/**
	 * If the attacking entity is currently in cooldown.
	 * @return {@code True} if so.
	 */
	public boolean isCooldown() {
		return delay > World.getInstance().getCycleCount();
	}

	/**
	 * Sets the amount of ticks to cooldown before next attack.
	 * @param ticks The amount of ticks.
	 */
	public void cooldown(int ticks) {
		delay = World.getInstance().getCycleCount() + ticks;
	}

	/**
	 * Terminates the current combat schedule.
	 */
	public void terminate() {
		cancel();
		releaseLock(false);
	}

	/**
	 * Locks on the current entity.
	 * @param lock The entity to lock on to.
	 */
	public void lock(Entity lock) {
		lock(lock, entity.getNextAttack(lock));
	}

	/**
	 * Locks on the current entity.
	 * @param lock The entity to lock on to.
	 * @param event The next attack to use.
	 */
	public void lock(Entity lock, AttackEvent event) {
		state = CombatState.ACTIVE;
		setLock(lock);
		schedule(event, (nextAttack == null || nextAttack.isFallback()) ? 0 : 1);
	}

	/**
	 * Releases the current entity locked on.
	 */
	public void releaseLock() {
		releaseLock(true);
	}
	
	/**
	 * Releases the current entity locked on.
	 */
	public void releaseLock(boolean facingUpdate) {
		setLock(null);
		if (facingUpdate) {
			entity.queueUpdateBlock(new FaceEntityBlock(null));
		}
	}
	
	/**
	 * Sets the lock.
	 * @param lock The lock.
	 */
	private void setLock(Entity lock) {
		if (this.lock != lock) {
			this.lastLock = this.lock;
			this.lock = lock;
		}
	}

	/**
	 * Sets the retaliating value.
	 * @param retaliating The retaliating to set.
	 */
	public void setRetaliating(boolean retaliating) {
		this.retaliating = retaliating;
		if (entity instanceof Player) {
			((Player) entity).getVars().setVarValueInt(VarKey.Player.AUTO_RETALIATE_DISABLED, retaliating ? 0 : 1);
		}
	}

	/**
	 * Sets the specialEnabled value.
	 * @param specialEnabled The specialEnabled to set.
	 */
	public void setSpecialEnabled(boolean specialEnabled) {
		this.specialEnabled = specialEnabled;
		if (entity instanceof Player) {
			((Player) entity).getVars().setVarValueInt(VarKey.Player.SPECIAL_BAR, specialEnabled ? 1 : 0);
		}
	}

	/**
	 * Drains adrenaline or returns false if not enough adrenaline was left.
	 * @param amount The amount to drain.
	 * @return {@code True} if the entity had enough adrenaline left.
	 */
	public boolean drainAdrenaline(int amount) {
		if (amount > adrenaline) {
			return false;
		}
		updateAdrenaline(adrenaline - amount);
		return true;
	}
	
	/**
	 * Increase adrenaline and returns the overflow amount.
	 * @param amount The amount to increase.
	 * @return The amount of overflow.
	 */
	public int increaseAdrenaline(int amount) {
		int adrenaline = this.adrenaline + amount;
		if (adrenaline > 1000) {
			updateAdrenaline(1000);
			return adrenaline - 1000;
		}
		updateAdrenaline(adrenaline);
		return 0;
	}
	
	/**
	 * Updates the adrenaline amount.
	 * @param amount The amount.
	 */
	public void updateAdrenaline(int amount) {
		this.adrenaline = amount;
		if (entity instanceof Player) {
			((Player) entity).getVars().setVarValueInt(VarKey.Player.ADRENALINE, adrenaline);
		}
	}

	/**
	 * Sets the default attack.
	 */
	public AttackEvent setDefaultAttack() {
		return setDefaultAttack(lock);
	}

	/**
	 * Sets the default attack.
	 */
	public AttackEvent setDefaultAttack(Entity lock) {
		return nextAttack = entity.getNextAttack(lock);
	}

	/**
	 * Cancels all combat events.
	 */
	public void cancel() {
		nextAttack = null;
	}
	
	/**
	 * @return the actionBar
	 */
	public ActionBar getActionBar() {
		return actionBar;
	}

	/**
	 * @param actionBar the actionBar to set
	 */
	public void setActionBar(ActionBar actionBar) {
		this.actionBar = actionBar;
	}

	/**
	 * Gets the nextAttack value.
	 * @return The nextAttack.
	 */
	public AttackEvent getNextAttack() {
		return nextAttack;
	}

	/**
	 * Sets the nextAttack value.
	 * @param nextAttack The nextAttack to set.
	 */
	public void setNextAttack(AttackEvent nextAttack) {
		this.nextAttack = nextAttack;
	}

	/**
	 * Gets the entity value.
	 * @return The entity.
	 */
	public Entity getEntity() {
		return entity;
	}

	/**
	 * Gets the lock value.
	 * @return The lock.
	 */
	public Entity getLock() {
		return lock;
	}

	/**
	 * Gets the combatStyle value.
	 * @return The combatStyle.
	 */
	public CombatStyle getCombatStyle() {
		return combatStyle;
	}

	/**
	 * Sets the combatStyle value.
	 * @param combatStyle The combatStyle to set.
	 */
	public void setCombatStyle(CombatStyle combatStyle) {
		this.combatStyle = combatStyle;
	}

	/**
	 * Gets the autocastSpell value.
	 * @return The autocastSpell.
	 */
	public CombatSpell getAutocastSpell() {
		return autocastSpell;
	}

	/**
	 * Gets the lastLock value.
	 * @return The lastLock.
	 */
	public Entity getLastLock() {
		return lastLock;
	}

	/**
	 * Sets the lastLock value.
	 * @param lastLock The lastLock to set.
	 */
	public void setLastLock(Entity lastLock) {
		this.lastLock = lastLock;
	}

	/**
	 * Gets the state value.
	 * @return The state.
	 */
	public CombatState getState() {
		return state;
	}

	/**
	 * Sets the state value.
	 * @param state The state to set.
	 */
	public void setState(CombatState state) {
		this.state = state;
	}

	/**
	 * Gets the retaliating value.
	 * @return The retaliating.
	 */
	public boolean isRetaliating() {
		return retaliating;
	}

	/**
	 * Gets the adrenaline value.
	 * @return The adrenaline.
	 */
	public int getAdrenaline() {
		return adrenaline;
	}

	/**
	 * Gets the specialEnabled value.
	 * @return The specialEnabled.
	 */
	public boolean isSpecialEnabled() {
		return specialEnabled;
	}

}