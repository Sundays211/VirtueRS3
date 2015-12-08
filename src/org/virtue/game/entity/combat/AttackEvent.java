package org.virtue.game.entity.combat;

import org.virtue.engine.cycle.GameTick;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.combat.impl.AttackHandler;
import org.virtue.game.entity.combat.impl.FollowingType;
import org.virtue.game.entity.combat.impl.ImpactInfo;
import org.virtue.game.entity.combat.impl.FollowingType.Interaction;

/**
 * Represents a single attack (swing of weapon, cast of spell).
 * @author Emperor
 *
 */
public class AttackEvent {
	/**
	 * The next attack event.
	 */
	private AttackEvent next;

	/**
	 * The next attack event.
	 */
	private AttackEvent previous;

	/**
	 * If the event is a fallback.
	 */
	private boolean fallback;

	/**
	 * The following handler.
	 */
	private FollowingType follower;

	/**
	 * The attack handler.
	 */
	protected AttackHandler handler;

	/**
	 * Constructs a new {@code AttackEvent} {@code Object}.
	 * @param follower The following type used for this attack event.
	 */
	public AttackEvent(FollowingType follower, AttackHandler handler) {
		this.follower = follower;
		this.handler = handler;
	}

	/**
	 * Creates a new instance of this attack event.
	 * @return The new attack event instance.
	 */
	public AttackEvent instantiate() {
		return new AttackEvent(follower, handler);
	}

	/**
	 * Called when the attack event starts.
	 * @param entity The entity.
	 * @param lock The victim.
	 * @param info The attack information.
	 * @return {@code True} if successfully started.
	 */
	public boolean start(Entity entity, Entity lock, AttackInfo info) {
		return true;
	}

	/**
	 * Called when an impact occurs.
	 * @param entity The attacking entity.
	 * @param info The attack information.
	 * @param impact The impact information.
	 */
	public void impact(Entity entity, AttackInfo info, ImpactInfo impact) {
		if (impact.getVictim().getCombatSchedule().getLock() == null && impact.getVictim().getCombatSchedule().isRetaliating()) {
			impact.getVictim().getCombatSchedule().lock(entity);
		}
	}

	/**
	 * Checks if the entity can attack the target.
	 * @param entity The entity.
	 * @param lock The target.
	 * @return {@code True} if the entity can attack the target.
	 */
	public boolean canAttack(Entity entity, Entity lock) {
		//if(!entity.getController().canAttack(entity.getMinigame(), entity, lock)) {
			//return false; //TODO
		//}
		if (follower != null && follower.getInteraction(entity, lock) != Interaction.STILL) {
			return false;
		}
		return true;
	}

	/**
	 * Runs the attack event.
	 * @param entity The attacking entity.
	 * @param lock The victim entity.
	 */
	public void run(Entity entity, Entity lock) {
		AttackInfo info = getAttackInfo(entity, lock);
		if (info == null || !start(entity, lock, info)) {
			return;
		}
		if (info.getAnimation() != null) {
			entity.getBlockQueue().animate(info.getAnimation());
		}
		if (info.getStartGraphic() != null) {
			entity.queueUpdateBlock(info.getStartGraphic());
		}
		for (ImpactInfo impact : info.getImpacts()) {
			if (info.getEvent() != null) {
				info.getEvent().run(entity, impact.getVictim());
			}
			int delay = (impact.getDelay() - 1) * 30;
			if (impact.getProjectile() != null) {
				impact.getProjectile().send(entity, impact.getVictim());
			}
			if (impact.getAnimation() != null) {
				impact.getVictim().getBlockQueue().animate(impact.getAnimation().transform(delay));
			}
			if (impact.getGraphic() != null) {
				impact.getVictim().queueUpdateBlock(impact.getGraphic().transform(delay));
			}
			impact.getVictim().getImpactHandler().queue(impact);
			startImpactEvents(entity, info, impact);
		}
		entity.getCombatSchedule().cooldown(info.getCooldown());
	}

	/**
	 * Handles an impact.
	 * @param info The impact information.
	 */
	protected void startImpactEvents(final Entity entity, final AttackInfo info, final ImpactInfo impact) {
		if (impact.getDelay() < 1) {
			if (impact.getEvent() != null) {
				impact.getEvent().run(entity, impact.getVictim());
			}
			impact(entity, info, impact);
			return;
		}
		impact.getVictim().submitTick(new GameTick(impact.getDelay() - 1) {
			@Override
			public void execute() {
				if (impact.getEvent() != null) {
					impact.getEvent().run(entity, impact.getVictim());
				}
				impact(entity, info, impact);
				stop();
			}
		});
	}

	/**
	 * Gets the attack information.
	 * @param entity The attacking entity.
	 * @param lock The victim entity.
	 * @return The attack information.
	 */
	public AttackInfo getAttackInfo(Entity entity, Entity lock) {
		return handler.getAttackInfo(entity, lock);
	}

	/**
	 * Gets the next value.
	 * @return The next.
	 */
	public AttackEvent getNext() {
		return next;
	}

	/**
	 * Sets the next value.
	 * @param next The next to set.
	 */
	public void setNext(AttackEvent next) {
		this.next = next;
	}

	/**
	 * Gets the follower value.
	 * @return The follower.
	 */
	public FollowingType getFollower() {
		return follower;
	}

	/**
	 * Sets the follower value.
	 * @param follower The follower to set.
	 */
	public void setFollower(FollowingType follower) {
		this.follower = follower;
	}

	/**
	 * Gets the fallback value.
	 * @return The fallback.
	 */
	public boolean isFallback() {
		return fallback;
	}

	/**
	 * Sets the fallback value.
	 * @param fallback The fallback to set.
	 */
	public void setFallback(boolean fallback) {
		this.fallback = fallback;
	}

	/**
	 * Gets the previous value.
	 * @return The previous.
	 */
	public AttackEvent getPrevious() {
		return previous;
	}

	/**
	 * Sets the previous value.
	 * @param previous The previous to set.
	 */
	public void setPrevious(AttackEvent previous) {
		this.previous = previous;
	}

}