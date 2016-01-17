/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.game.entity;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.config.seqtype.SeqType;
import org.virtue.config.seqtype.SeqTypeList;
import org.virtue.engine.cycle.GameTick;
import org.virtue.game.World;
import org.virtue.game.content.minigame.Controller;
import org.virtue.game.content.minigame.Minigame;
import org.virtue.game.entity.combat.AttackEvent;
import org.virtue.game.entity.combat.CombatSchedule;
import org.virtue.game.entity.combat.CombatStyle;
import org.virtue.game.entity.combat.ImpactHandler;
import org.virtue.game.entity.combat.death.DeathEvent;
import org.virtue.game.node.Node;
import org.virtue.game.world.region.Region;
import org.virtue.game.world.region.Tile;
import org.virtue.game.world.region.movement.Movement;
import org.virtue.network.protocol.update.Block;
import org.virtue.network.protocol.update.UpdateBlockQueue;
import org.virtue.network.protocol.update.block.AnimationBlock;
import org.virtue.network.protocol.update.ref.HeadIcons;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public abstract class Entity extends Node {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(Entity.class);

	/**
	 * The entity index
	 */
	private int index;
	
	/**
	 * The entity's on the last tick
	 */
	private Tile lastTile;
	
	/**
	 * The movement handling system for the entity
	 */
	private Movement movement;
	
	private Minigame minigame = null;
	
	private Controller controller;
	
	/**
	 * The update blocks queue.
	 */
	private final UpdateBlockQueue updateBlocks;
	
	/**
	 * The impact handler.
	 */
	private final ImpactHandler impactHandler;
	
	/**
	 * The combat schedule.
	 */
	private CombatSchedule combatSchedule;
	
	/**
	 * The players head icons
	 */
	private HeadIcons headIcons;

	/**
	 * List of submitted tasks. As if the entity is destroyed all submitted task will continue.
	 * with this, all task can be looped through and stopped.
	 */
	private List<GameTick> ticks;

	/**
	 * Represents the number of ticks the player is frozen for (cannot move)
	 */
	protected int freezeDuration;
	
	private SeqType currentAnim = null;
	
	/**
	 * The number of server cycles remaining on the current animation
	 */
	private int animTimeRemaining;
	
	/**
	 * The event run when the animation is finished
	 */
	private Runnable animCompleteEvent;
	
	/**
	 * Called on creation of this {@link Entity}
	 */
	public Entity (int id) {
		super(id);
		this.movement = new Movement(this);
		this.combatSchedule = new CombatSchedule(this);
		this.headIcons = new HeadIcons(this);
		this.ticks = new ArrayList<GameTick>();
		this.updateBlocks = new UpdateBlockQueue(this);
		this.impactHandler = new ImpactHandler(this);
	}
	
	/**
	 * Gets the death event for this entity.
	 * @param killer The killer.
	 * @return The death event.
	 */
	public DeathEvent getDeathEvent(Entity killer) {
		return DeathEvent.DEFAULT;
	}

	/**
	 * Gets the next attack for this entity.
	 * @param lock The current combat lock (can be null).
	 * @return The attack event.
	 */
	public AttackEvent getNextAttack(Entity lock) {
		CombatStyle style = CombatStyle.get(this);
		combatSchedule.setCombatStyle(style);
		return style.createEvent();
	}
	
	/**
	 * Submits the specified {@code tick} to the {@code Engine}.
	 * 
	 * @param tick the tick to submit
	 */
	public void submitTick(GameTick tick) {
		if (ticks.contains(tick)) {
			logger.warn("GameTick "+tick+" is already running.");
			return;
		}
		
		Virtue.getInstance().getEngine().invoke(tick);
		ticks.add(tick);
	}
	
	/**
	 * Sets the entity's index
	 * @param index
	 */
	public void setIndex(int index) {
		this.index = index;
	}
	
	/**
	 * Returns the entity's index
	 * @return
	 */
	public int getIndex() {
		return index;
	}
	
	/**
	 * Sets the entity's tile on the last tick
	 * @param tile
	 */
	public void setLastTile(Tile tile) {
		this.lastTile = tile;
	}
	
	/**
	 * Sets the entity's tile on the last tick
	 * @param x
	 * @param y
	 * @param z
	 */
	public void setLastTile(int x, int y, int z) {
		this.lastTile = new Tile(x, y, z);
	}
	

	/**
	 * Returns the entity's tile on the last tick
	 * @return
	 */
	public Tile getLastTile() {
		return lastTile;
	}
	
	
	/**
	 * Sets the entity's tile on the current tick
	 * WARNING: Don't use this method outside of spawning the entity and the Movement class. 
	 * Otherwise it can mess up the client synchronization
	 * @param x
	 * @param y
	 * @param z
	 */
	public void setCurrentTile(int x, int y, int z) {
		setCurrentTile(new Tile(x, y, z));
	}
	
	/**
	 * Queues a block to be sent when the entity is next updated
	 * @param block The block to add
	 */
	public void queueUpdateBlock (Block block) {
		updateBlocks.queueUpdateBlock(block);
	}
	
	/**
	 * Clears all the currently queued update blocks. Should be called after the update has been sent
	 */
	public void resetUpdateBlocks () {
		updateBlocks.resetUpdateBlocks();
	}
	
	/**
	 * Gets all the currently queued update blocks
	 * @return The update blocks
	 */
	public Block[] getUpdateBlocks () {
		return updateBlocks.getUpdateBlocks();
	}
	
	/**
	 * Returns whether or not a mask update is needed for this entity
	 * @return
	 */
	public boolean needsMaskUpdate () {
		return updateBlocks.needsMaskUpdate();
	}
	
	/**
	 * Returns this movement of this {@link Entity}
	 * @return
	 */
	public Movement getMovement () {
		return movement;
	}
	
	/**
	 * Stops all actions currently being performed by the entity and closes all dialogs
	 * This method is called every time the entity tries to move
	 */
	public void stopAll () {
		movement.stop();
		combatSchedule.terminate();
		clearAnimation();
	}
	
	/**
	 * Called on destruction of the entity (Log out)
	 */
	public void destroyTicks () {
		for (Iterator<GameTick> it = ticks.iterator(); it.hasNext();) {
			it.next().stop();
		}
		ticks.clear();
	}
	
	/**
	 * Returns true if this {@link Entity} is unable to move
	 * @return
	 */
	public boolean isPaused () {
		return false;
	}
	
	/**
	 * Called when processing an action
	 */
	public void process () {
		if (freezeDuration > 0) {
			freezeDuration--;
		}	
		if (animTimeRemaining > 0) {
			animTimeRemaining -= 30;
			if (animTimeRemaining <= 0) {
				onAnimCompleted();
			}
		}
		if (!isPaused()) {
			movement.process();
		}
	}
	
	private void onAnimCompleted () {
		animTimeRemaining = 0;
		if (animCompleteEvent != null) {
			Runnable event = animCompleteEvent;
			animCompleteEvent = null;
			try {
				event.run();
			} catch (RuntimeException ex) {
				logger.error("Error processing anim completion event for entity "+getName()+": ", ex);
			}
			//If the completion event set another animation, process that.
			if (animTimeRemaining > 0) {
				animTimeRemaining -= 30;
			}
		}
	}
	
	/**
	 * Finds out whether the entity still exists (false if a player logs out, or an NPC dies)
	 */
	public abstract boolean exists ();
	
	/**
	 * Sends the death of the entity
	 */
	public abstract void processDeath(Entity killer);
	
	public abstract int getDeathAnimation ();
	
	/**
	 * Gets the animation played upon getting hit.
	 * @return The impact animation ID.
	 */
	public abstract int getImpactAnimation();
	
	/**
	 * Returns if this {@link Entity} is adjacent to the specified {@link Tile}
	 * @param tile The tile to check
	 * @param allowDiagonals Whether diagonal tiles count as adjacent
	 * @return True if the entity is adjacent to the specified tile, false otherwise
	 */
	public boolean isAdjacentTo(Tile tile, boolean allowDiagonals) {
		return isAdjacentTo(tile, allowDiagonals, 1, 1);
	}
	
	/**
	 * Returns if this {@link Entity} is adjacent to the specified {@link Tile}
	 * Note that for the purposes of this method, being on the same tile as the entity does not count as being adjacent
	 * @param tile The tile to check
	 * @param allowDiagonals Whether diagonal tiles count as adjacent
	 * @param sizeX The x-dimension of the object size
	 * @param sizeY The y-dimension of the object size
	 * @return True if the entity is adjacent to the specified tile, false otherwise
	 */
	public boolean isAdjacentTo(Tile tile, boolean allowDiagonals, int sizeX, int sizeY) {
		int dx = Math.abs(currentTile.getX() - tile.getX());
		int dy = Math.abs(currentTile.getY() - tile.getY());
		if (dx == 0 && dy == 0) {
			return false;//Entity is on the same tile
		} else if ((dx == 1 && dy == 0) || (dx == 0 && dy == 1)) {
			return true;
		} else if (allowDiagonals && (dx == 1 && dy == 1)) {
			return true;
		} else {
			return false;
		}
	}
	
	public List<GameTick> getTicks() {
		return ticks;
	}	
	
	/**
	 * Returns the player's head icons
	 * @return
	 */
	public HeadIcons getHeadIcons () {
		return headIcons;
	}
	
	public abstract int getRenderAnimation ();

	/**
	 * @return the minigame
	 */
	public Controller getController() {
		return controller;
	}
	
	public void setController(Controller controller) {
		this.controller = controller;
	}
	
	/**
	 * @return the minigame
	 */
	public Minigame getMinigame() {
		return minigame;
	}

	/**
	 * @param minigame the minigame to set
	 */
	public void setMinigame(Minigame minigame) {
		this.minigame = minigame;
	}

	/**
	 * Gets the combatSchedule value.
	 * @return The combatSchedule.
	 */
	public CombatSchedule getCombatSchedule() {
		return combatSchedule;
	}

	/**
	 * Sets the combatSchedule value.
	 * @param combatSchedule The combatSchedule to set.
	 */
	public void setCombatSchedule(CombatSchedule combatSchedule) {
		this.combatSchedule = combatSchedule;
	}

	/**
	 * Gets the region this entity is standing in.
	 * @return The region.
	 */
	public Region getRegion() {
		return World.getInstance().getRegions().getRegionByID(this.getCurrentTile().getRegionID());
	}
	
	/**
	 * Gets the update blocks queue.
	 * @return The update blocks queue.
	 */
	public UpdateBlockQueue getBlockQueue() {
		return updateBlocks;
	}

	/**
	 * Gets the impactHandler value.
	 * @return The impactHandler.
	 */
	public ImpactHandler getImpactHandler() {
		return impactHandler;
	}

	/**
	 * Freezes the player, preventing them from moving, for the provided number of game cycles.
	 * Calling this method will replace any existing freezes, and calling setFreezeDuration(0) will unfreeze the player.
	 * @param freezeDuration The number of game cycles to freeze the player for.
	 */
	public void setFreezeDuration(int freezeDuration) {
		this.freezeDuration = freezeDuration;
	}
	
	/**
	 * Checks whether this entity is currently able to move.
	 * @return True if the entity can move, false otherwise
	 */
	public boolean canMove () {
		if (freezeDuration > 0) {
			return false;
		}
		if (currentAnim != null) {
			return currentAnim.walkingMode == 1;//If walk mode is 1, the entity can move, stopping the animation.
		}
		return true;
	}
	
	public void clearAnimation () {
		this.animTimeRemaining = 0;
		this.animCompleteEvent = null;
		this.currentAnim = null;
		this.queueUpdateBlock(new AnimationBlock(-1));
	}
	
	public boolean runAnimation (int animId) {
		return runAnimation(animId, null);
	}
	
	public boolean runAnimation (int animId, Runnable completeEvent) {
		if (animId == -1) {
			clearAnimation();
			return true;
		}
		if (animTimeRemaining > 0) {
			return false;
		}
		currentAnim = SeqTypeList.list(animId);
		if (currentAnim == null) {
			throw new IllegalArgumentException("Invalid animation: "+animId);
		}
		this.animTimeRemaining = currentAnim.time + 30;//Add one extra tick as this will be processed once before sent to the client
		this.animCompleteEvent = completeEvent;
		this.queueUpdateBlock(new AnimationBlock(animId));
		return true;
	}
	
	public int getAnimationId () {
		return this.currentAnim == null ? -1 : this.currentAnim.id;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Entity [index=" + index + ", name=" + getName() + ", coords=" + getCurrentTile() + "]";
	}
	
		
}
