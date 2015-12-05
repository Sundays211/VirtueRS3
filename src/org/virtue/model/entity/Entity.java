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
package org.virtue.model.entity;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.virtue.Virtue;
import org.virtue.engine.cycle.GameTick;
import org.virtue.model.Node;
import org.virtue.model.World;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.combat.AttackEvent;
import org.virtue.model.entity.combat.CombatSchedule;
import org.virtue.model.entity.combat.CombatStyle;
import org.virtue.model.entity.combat.ImpactHandler;
import org.virtue.model.entity.combat.death.DeathEvent;
import org.virtue.model.entity.movement.Movement;
import org.virtue.model.entity.old_combat.Combat;
import org.virtue.model.entity.player.var.ScriptVar;
import org.virtue.model.entity.region.Region;
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.update.Block;
import org.virtue.model.entity.update.UpdateBlockQueue;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.ref.HeadIcons;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public abstract class Entity extends Node implements ScriptVar {

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
	 * The combat-related data for the entity (hit bars, hit marks, etc)
	 */
	private Combat combat;
	
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
	 * Called on creation of this {@link Entity}
	 */
	public Entity (int id) {
		super(id);
		this.movement = new Movement(this);
		this.combat = new Combat(this);
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
			System.out.println("GameTick "+tick+" is already running.");
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
		combat.destroy();
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
	public abstract void process ();
	
	/**
	 * Finds out whether the entity still exists (false if a player logs out, or an NPC dies)
	 */
	public abstract boolean exists ();
	
	/**
	 * Sends the death of the entity
	 */
	public abstract void processDeath();
	
	public abstract int getDeathAnimation ();
	
	/**
	 * Gets the animation played upon getting hit.
	 * @return The impact animation.
	 */
	public abstract AnimationBlock getImpactAnimation();
	
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
	 * @return The combat for the entity
	 */
	public Combat getCombat () {
		return combat;
	}
	
	
	/**
	 * Returns the player's head icons
	 * @return
	 */
	public HeadIcons getHeadIcons () {
		return headIcons;
	}
	
	public abstract int getRenderAnimation ();
	
	@Override
	public String toString () {
		return new StringBuilder("{").append(getName()).append("}").toString();
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.var.ScriptVar#scriptValue()
	 */
	@Override
	public int scriptValue() {
		return index;
	}

	/**
	 * @return the minigame
	 */
	public Controller getController() {
		return controller;
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
	
}
