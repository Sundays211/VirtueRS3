package org.virtue.model.entity.combat;

import java.util.ArrayList;
import java.util.List;

import org.virtue.model.World;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.combat.death.DeathHandler;
import org.virtue.model.entity.combat.impl.ImpactInfo;
import org.virtue.model.entity.old_combat.hit.Hit;
import org.virtue.model.entity.old_combat.hit.Hit.HitType;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.var.VarKey;
import org.virtue.model.entity.update.block.HitMarkBlock;
import org.virtue.model.entity.update.ref.Bar;

/**
 * Handles impacts an entity has received.
 * @author Emperor
 *
 */
public class ImpactHandler {

	/**
	 * The entity receiving the impacts.
	 */
	private final Entity entity;
	
	/**
	 * The entity's death handler.
	 */
	private final DeathHandler deathHandler;
	
	/**
	 * The queued impacts.
	 */
	private List<ImpactInfo> queuedImpacts;
	
	/**
	 * The queued lifepoints bars.
	 */
	private List<Bar> queuedBars;
	
	/**
	 * The queued hit markers.
	 */
	private List<Hit> queuedHits;
	
	/**
	 * The maximum amount of lifepoints.
	 */
	private int maximumLifepoints;
	
	/**
	 * The entity's current lifepoints.
	 */
	private int lifepoints;
	
	/**
	 * If the hitmark block has been scheduled this game cycle.
	 */
	private boolean scheduledBlock;
	
	/**
	 * Constructs a new {@code ImpactHandler} {@code Object}.
	 * @param entity The entity.
	 */
	public ImpactHandler(Entity entity) {
		this.entity = entity;
		this.deathHandler = new DeathHandler(entity);
		this.queuedImpacts = new ArrayList<>();
		this.queuedBars = new ArrayList<>();
		this.queuedHits = new ArrayList<>();
	}

	/**
	 * Restores the lifepoints amount.
	 */
	public void restoreLifepoints() {
		int current = this.lifepoints;
		updateLifepoints(maximumLifepoints);
		if (lifepoints > 0) {
			queuedBars.add(new Bar(Bar.HITPOINTS, current, lifepoints, 0));
			scheduleBlock();
		}
	}
	
	public void heal(int amount, boolean showHeal) {
		int current = this.lifepoints;
		if (amount + lifepoints > maximumLifepoints) {
			amount = maximumLifepoints - lifepoints;
		}
		updateLifepoints(amount + lifepoints);
		if (showHeal && amount > 0) {
			queuedHits.add(new Hit(amount, HitType.HEALED_DAMAGE));
			queuedBars.add(new Bar(Bar.HITPOINTS, current, lifepoints, 0));
			scheduleBlock();
		}
	}
	
	/**
	 * Handles a hit.
	 * @param impact The impact information.
	 */
	public void hit(ImpactInfo impact) {
		int last = this.lifepoints;
		int hit = impact.getHit();
		if (hit > lifepoints) {
			hit = lifepoints;
		}
		queuedHits.add(impact.selectHitMark(hit, 0));
		decrementLifepoints(hit);
		queuedBars.add(new Bar(Bar.HITPOINTS, last, lifepoints, 0));
		scheduleBlock();
	}
	
	/**
	 * Decrements the lifepoints with the given amount.
	 * @param amount The amount of lifepoints to decrement.
	 */
	private void decrementLifepoints(int amount) {
		if (lifepoints - amount <= 0) {
			amount = lifepoints;
			if (!isDead()) {
				deathHandler.run();
			}
		}
		updateLifepoints(lifepoints - amount);
	}
	
	/**
	 * Sets the lifepoints amount.
	 * @param lifepoints The amount of lifepoints.
	 */
	public void updateLifepoints(int lifepoints) {
		setLifepoints(lifepoints);
		if (entity instanceof Player) {
			((Player) entity).getVars().setVarpBit(VarKey.Bit.PLAYER_HITPOINTS, lifepoints);
		}
	}
	
	/**
	 * Updates the impacts.
	 */
	public void updateImpacts() {
		List<ImpactInfo> newQueue = new ArrayList<>();
		for (ImpactInfo impact : queuedImpacts) {
			if (impact.getScheduledTick() <= World.getInstance().getCycleCount()) {
				hit(impact);
			} else {
				newQueue.add(impact);
			}
		}
		queuedImpacts = newQueue;
	}
	
	/**
	 * Resets the queued impacts.
	 */
	public void resetQueue() {
		queuedBars.clear();
		queuedHits.clear();
		scheduledBlock = false;
	}
	
	/**
	 * Queues an impact.
	 * @param impact The impact information.
	 */
	public void queue(ImpactInfo impact) {
		impact.setScheduledTick(World.getInstance().getCycleCount() + impact.getDelay());
		queuedImpacts.add(impact);
	}

	/**
	 * Schedules the hitmark block.
	 */
	public void scheduleBlock() {
		if (!scheduledBlock) {
			entity.queueUpdateBlock(new HitMarkBlock());
			scheduledBlock = true;
		}
	}

	/**
	 * Gets the entity value.
	 * @return The entity.
	 */
	public Entity getEntity() {
		return entity;
	}
	
	/**
	 * Sets the lifepoints amount.
	 * @param lifepoints The amount of lifepoints.
	 */
	public void setLifepoints(int lifepoints) {
		this.lifepoints = lifepoints;
	}

	/**
	 * Gets the lifepoints value.
	 * @return The lifepoints.
	 */
	public int getLifepoints() {
		return lifepoints;
	}

	/**
	 * Gets the maximumLifepoints value.
	 * @return The maximumLifepoints.
	 */
	public int getMaximumLifepoints() {
		if (maximumLifepoints < 1) {
			return 1;
		}
		return maximumLifepoints;
	}

	/**
	 * Sets the maximumLifepoints value.
	 * @param maximumLifepoints The maximumLifepoints to set.
	 */
	public void setMaximumLifepoints(int maximumLifepoints) {
		this.maximumLifepoints = maximumLifepoints;
	}

	/**
	 * Gets the currently queued impacts.
	 * @return The impacts queue.
	 */
	public List<ImpactInfo> getQueuedImpacts() {
		return queuedImpacts;
	}

	/**
	 * Gets the queuedBars value.
	 * @return The queuedBars.
	 */
	public List<Bar> getQueuedBars() {
		return queuedBars;
	}

	/**
	 * Gets the dead value.
	 * @return The dead.
	 */
	public boolean isDead() {
		return deathHandler.isDead();
	}

	/**
	 * Sets the dead value.
	 * @param dead The dead to set.
	 */
	public void setDead(boolean dead) {
		deathHandler.setDead(dead);
	}

	/**
	 * Gets the deathHandler value.
	 * @return The deathHandler.
	 */
	public DeathHandler getDeathHandler() {
		return deathHandler;
	}

	/**
	 * Gets the queuedHits value.
	 * @return The queuedHits.
	 */
	public List<Hit> getQueuedHits() {
		return queuedHits;
	}
}