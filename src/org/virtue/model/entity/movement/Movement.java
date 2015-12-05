/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
package org.virtue.model.entity.movement;

import java.util.Collection;
import java.util.Deque;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.model.World;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.GroundItem;
import org.virtue.model.entity.region.MapSize;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.routefinder.AStarPathFinder;
import org.virtue.model.entity.routefinder.Path;
import org.virtue.model.entity.routefinder.Path.Step;
import org.virtue.model.entity.routefinder.PathFinder;
import org.virtue.model.entity.routefinder.TraversalMap;
import org.virtue.model.entity.update.block.FaceDirectionBlock;
import org.virtue.model.entity.update.block.FaceEntityBlock;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 25/10/2014
 */
public class Movement {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(Movement.class);
	
	private Entity entity;
	
	private Queue<Path.Step> walkSteps = new ConcurrentLinkedQueue<Path.Step>();
	
	private int nextWalkDirection = -1;
	
	private int nextRunDirection = -1;
	
	private PathFinder pathFinder = new AStarPathFinder(World.getInstance().getRegions());
	
	private Tile destination;
	
	/**
	 * The task to run when the entity reaches it's target
	 */
	private Runnable onTarget;
	
	private boolean teleported;
	
	private Tile teleportDestination;
	
	private boolean running = false;
	
	private boolean forceRunToggle = false;
	
	private boolean debug = false;
	
	/**
	 * The other entity that is currently targeted
	 */
	private EntityTarget targetEntity;
	
	public Movement (Entity entity) {
		this.entity = entity;
		this.pathFinder = new AStarPathFinder(World.getInstance().getRegions());
	}
	
	public void setTraversalMap (TraversalMap map) {
		this.pathFinder = new AStarPathFinder(map);		
	}
	
	/**
	 * Teleports the entity to the specified coordinates
	 * @param level The level/plane to teleport to
	 * @param mapSquare The destination map square (region)
	 * @param localX The x-coord within the map square
	 * @param localY The y-coord within the map square
	 * @return True if the teleport was successful, false otherwise
	 */
	public boolean teleportTo (int level, int mapSquare, int localX, int localY) {
		return teleportTo(new Tile(localX, localY, level, mapSquare));
	}
	
	/**
	 * Teleports the entity to the specified coordinates
	 * @param destX The x-coordinate of the destination
	 * @param destY The y-coordinate of the destination
	 * @param destZ The z-coordinate of the destination
	 * @return True if the teleport was successful, false otherwise
	 */
	public boolean teleportTo (int destX, int destY, int destZ) {
		return teleportTo(new Tile(destX, destY, destZ));
	}
	
	/**
	 * Teleports the entity to the specified tile
	 * @param destination The destination {@link Tile}
	 * @return True if the teleport was successful, false otherwise
	 */
	public synchronized boolean teleportTo (Tile destination) {
		this.teleportDestination = destination;
		stop();//Clear the current target and remove any walk steps		
		return true;		
	}
	
	/**
	 * Moves the entity to the specified coordinates. Clears all the current steps beforehand
	 * @param destX The x-coordinate of the destination
	 * @param destY The y-coordinate of the destination
	 * @return true if the movement was successful, false otherwise
	 */
	public synchronized boolean moveTo (int destX, int destY) {
		if (entity.isPaused()) {
			return false;
		}
		entity.stopAll();
		if (entity.getCurrentTile().withinDistance(new Tile(destX, destY, entity.getCurrentTile().getPlane()), 0)) {
			destination = entity.getCurrentTile();
			return true;//Already on an adjacent tile
		}
		if (entity instanceof Player) {
			long currentTime = System.currentTimeMillis();
			Player player = (Player) entity;
			if (player.getLockDelay() >= currentTime) {
				player.getDispatcher().sendGameMessage("Cant move cause of lockdelay.");
				return false;
			}
		}
		//System.out.println("Current tile: "+entity.getCurrentTile());
		//System.out.println("Target: "+new Tile(destX, destY, entity.getCurrentTile().getPlane()));
		Path path = pathFinder.find(entity, destX, destY);
		if (path == null) {
			return false;
		}
		addWalkSteps(path.getPoints());
		destination = new Tile(path.peekLast().x, path.peekLast().y, entity.getCurrentTile().getPlane());
		//entity.queueUpdateBlock(new FaceEntityBlock(null));
		return true;
	}
	
	/**
	 * Moves the entity one tile in the specified direction. The entity will move during the next game tick in which they are not paused.
	 * @param direction The {@link Direction} to move in
	 * @return True if the step was successfully queued for the entity, false if they were blocked.
	 */
	public synchronized boolean move (Direction direction) {
		if (entity.isPaused()) {
			return false;
		}
		entity.stopAll();
		if (pathFinder.checkDirection(entity.getCurrentTile(), direction, entity.getPlayerCount())) {
			Tile tile = Tile.edit(entity.getCurrentTile(), direction.getDeltaX(), direction.getDeltaY(), (byte) 0);
			addWalkStep(new Path.Step(tile.getX(), tile.getY()));
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Moves the entity to the specified entity. Clears all the current steps beforehand
	 * @param destX The x-coordinate of the destination
	 * @param destY The y-coordinate of the destination
	 * @return true if the movement was successful, false otherwise
	 */
	public synchronized boolean moveTo (Entity target) {
		if (entity.isPaused()) {
			return false;
		}
		entity.stopAll();
		if (entity.getCurrentTile().withinDistance(new Tile(target.getCurrentTile().getX(), target.getCurrentTile().getY(), entity.getCurrentTile().getPlane()), 0)) {
			destination = entity.getCurrentTile();
			return true;//Already on an adjacent tile
		}
		Path path = pathFinder.find(entity, target.getCurrentTile().getX(), target.getCurrentTile().getY());
		if (path == null) {
			return false;
		}
		addWalkSteps(path.getPoints());
		destination = new Tile(path.peekLast().x, path.peekLast().y, entity.getCurrentTile().getPlane());
		//entity.queueUpdateBlock(new FaceEntityBlock(null));
		return true;
	}
	
	/**
	 * Moves the entity to a tile adjacent to the specified object
	 * @param object The {@link SceneLocation} to move towards
	 * @return true if the movement was successful, false otherwise
	 */
	public synchronized boolean moveTo (SceneLocation location, int x, int y) {
		if (entity.isPaused()) {
			return false;
		}
		entity.stopAll();
		//int deltaX = Math.abs(entity.getCurrentTile().getX() - object.getTile().getX());
		//int deltaY = Math.abs(entity.getCurrentTile().getY() - object.getTile().getY());
		//if (entity.getCurrentTile().withinDistance(object.getTile(), 1)) {
		if (location.isAdjacentTo(entity.getCurrentTile())) {
			destination = entity.getCurrentTile();
			entity.queueUpdateBlock(new FaceDirectionBlock(location.getMiddleTile()));
			return true;//Already on an adjacent tile
		} else if (location.isStandingOn(entity.getCurrentTile())) {
			destination = entity.getCurrentTile();
			//System.out.println("Location tile: "+location.getTile()+", entity tile: "+entity.getCurrentTile());
			/*this.targetTile = pathFinder.findAdjacent(location.getTile(), location.getLocType().sizeX, location.getLocType().sizeY);
			if (targetTile == null) {
				return false;//Unable to find an adjacent tile
			}
			entity.queueUpdateBlock(new FaceDirectionBlock(location.getMiddleTile()));
			addWalkStep(new Path.Step(targetTile.getX(), targetTile.getY()));*/
			return true;//If the entity is standing on the location, they should still be able to interact
		}
		Path path = pathFinder.find(entity, location);
		if (path == null) {
			return false;
		}
		if (path.peekLast().x == location.getTile().getX() 
				&& path.peekLast().y == location.getTile().getY()) {
			path.pollLast();//Remove the last position if it's the same as the object's tile.
			//Bit of a hack, but it'll do until someone can figure out how to make the pathfinder stop at an adjacent tile.
		}
		addWalkSteps(path.getPoints());
		destination = new Tile(path.peekLast().x, path.peekLast().y, entity.getCurrentTile().getPlane());
		entity.queueUpdateBlock(new FaceDirectionBlock(location.getMiddleTile()));
		//entity.queueUpdateBlock(new FaceEntityBlock(null));
		return true;
	}
	
	/**
	 * Moves the entity to a tile adjacent to the specified ground item
	 * @param item The {@link GroundItem} to move towards
	 * @return true if the movement was successful, false otherwise
	 */
	public synchronized boolean moveTo (GroundItem item) {
		return moveTo(item.getTile().getX(), item.getTile().getY());
	}
	
	/**
	 * Sets the task to run when the entity reaches it's target
	 * @param onTarget The task to run
	 */
	public synchronized void setOnTarget (Runnable onTarget) {
		this.onTarget = onTarget;
	}
	
	/**
	 * Adds a step to the entities walk queue
	 * @param step The {@link Path.Step} to add
	 */
	private void addWalkStep (Path.Step step) {
		//System.out.println(step);
		walkSteps.add(step);		
	}

	/**
	 * Clears the current walking queue and sets a new one.
	 * @param points The points of the path.
	 */
	public void setWalkSteps(Deque<Step> points) {
		reset();
		addWalkSteps(points);
	}
	
	/**
	 * Adds a series step to the entities walk queue
	 * @param steps A Collection of {@link Path.Step} to add
	 */
	public void addWalkSteps (Collection<Path.Step> steps) {
		for (Path.Step step : steps) {
			addWalkStep(step);
		}
	}
	
	/**
	 * Returns and removes the next walk step in the queue.
	 * @return The next walk step
	 */
	private Path.Step getNextStep () {
		return walkSteps.poll();
	}
	
	/**
	 * Gets the direction of the entitie's next walk step
	 * @return The next walk direction
	 */
	public int getNextWalkDirection () {
		return nextWalkDirection;
	}
	
	/**
	 * Gets the direction of the entitie's next run step
	 * @return The next run direction
	 */
	public int getNextRunDirection () {
		return nextRunDirection;
	}
	
	/**
	 * Resets the walking queue.
	 */
	public void reset() {
		walkSteps.clear();
	}
	
	/**
	 * Stops the entity, removing all queued walk steps.
	 */
	public synchronized void stop () {
		reset();
		if (forceRunToggle) {
			this.running = !running;
			this.forceRunToggle = false;
		}
		destination = null;
		if (entity instanceof Player) {
			((Player) entity).getDispatcher().sendMapFlag(-1, -1);//Reset the target flag
		}
		onTarget = null;
		if (targetEntity != null) { //TODO: This was commented out but it caused combat facing to reset
			entity.queueUpdateBlock(new FaceEntityBlock(null));
			targetEntity = null;
		}
	}
	
	/**
	 * Gets the tile the entity is currently moving towards
	 * @return The target tile, or null if it has no target
	 */
	public Tile getDestination () {
		return destination;
	}
	
	/**
	 * Sets the current destination tile. 
	 * NOTE: This method doesn't actually move the entity; for moving, you should use {@link #moveTo(int, int)}
	 * @param destination The target coordinates, or null if it has no target.
	 */
	public void setDestination (Tile destination) {
		this.destination = destination;
	}
	
	/**
	 * Returns whether the entity has recently teleported or not
	 * @return True if the entity has recently teleported, false otherwise
	 */
	public boolean teleported () {
		return teleported;
	}
	
	/**
	 * Sets whether the entity is running or not
	 * @param running True if the entity is running, false otherwise
	 */
	public void setRunning (boolean running) {
		this.running = running;
	}
	
	/**
	 * Gets the movement type of the player
	 * @return The movement type
	 */
	public byte getMovementType () {
		return running ? (byte) 2 : (byte) 1;
	}
	
	/**
	 * Processes the movement, calculating the next walk/run steps and sending the viewport (if needed).
	 */
	public synchronized void process () {
		if (teleportDestination != null) {
			entity.setLastTile(entity.getCurrentTile());
			//entity.getLastTile().copy(entity.getCurrentTile());
			teleported = true;
			if (teleportDestination.getRegionX() > 127 && entity instanceof Player
					&& entity.getCurrentTile().getRegionX() <= 127) {
				((Player) entity).setLastStaticTile(entity.getCurrentTile());
			}
			entity.setCurrentTile(teleportDestination);
			//entity.getCurrentTile().copy(teleportDestination);
			
			if (entity instanceof Player) {
				if (((Player) entity).getViewport().needsMapUpdate()) {
					((Player) entity).getViewport().moveToRegion(entity.getCurrentTile(), MapSize.DEFAULT, true);
				}
			}
			return;
		}
		if (targetEntity != null) {
			checkTarget();
		}
		Path.Step nextStep = getNextStep();
		if (nextStep != null && (nextStep.x != entity.getCurrentTile().getX() || nextStep.y != entity.getCurrentTile().getY())) {
			nextWalkDirection = nextStep.getDirection(entity.getCurrentTile().getX(), entity.getCurrentTile().getY());
			if (nextWalkDirection == -1) {
				//changed this here - added line below, commented other
				//nextWalkDirection = nextStep.getDirection(entity.getLastTile().getX(), entity.getLastTile().getY());
				System.err.println("Next walk step is more than 1 tile away from the current position of the player! current="+entity.getCurrentTile()+", next={x="+nextStep.x+", y="+nextStep.y+"}");
				return;
			}
			entity.setLastTile(entity.getCurrentTile());
			//entity.getLastTile().copy(entity.getCurrentTile());
			Tile next = new Tile(nextStep.x, nextStep.y, entity.getCurrentTile().getPlane());
			entity.setCurrentTile(next);
			//entity.getCurrentTile().copy(next);
			if (debug) {
				System.out.println("Direction: "+nextWalkDirection+", x="+nextStep.x+", y="+nextStep.y);
			}
			if (entity instanceof Player) {
				Player player = (Player) entity;
				if(player.getMinigame() != null) {
					Controller controller = Virtue.getInstance().getController().getController(player.getMinigame());
					if (controller != null)
						controller.moved(player.getMinigame());
				}
			}
			if (running && entity instanceof Player && ((Player) entity).drainRunEnergy()) {
				nextStep = getNextStep();
				if (nextStep != null && (nextStep.x != entity.getCurrentTile().getX() || nextStep.y != entity.getCurrentTile().getY())) {
					if (debug) {
						System.out.println("Direction: "+nextRunDirection+", x="+nextStep.x+", y="+nextStep.y);
					}
					nextRunDirection = nextStep.getDirection(entity.getCurrentTile().getX(), entity.getCurrentTile().getY());
					if (nextRunDirection == -1) {
						throw new RuntimeException("Next run step is more than 1 tile away from the current position of the player! current="+entity.getCurrentTile()+", next={x="+nextStep.x+", y="+nextStep.y+"}");
					}
					//entity.setLastTile(entity.getCurrentTile());
					//entity.getLastTile().copy(entity.getCurrentTile());
					next = new Tile(nextStep.x, nextStep.y, entity.getCurrentTile().getPlane());
					entity.setCurrentTile(next);
					//entity.getCurrentTile().copy(next);
				} else {
					nextRunDirection = -1;
				}
			} else {
				nextRunDirection = -1;
			}
			if (entity instanceof Player) {
				if (((Player) entity).getViewport().needsMapUpdate()) {
					((Player) entity).getViewport().moveToRegion(entity.getCurrentTile(), MapSize.DEFAULT, true);
				}
			}
		} else {
			if (onTarget != null && entity.getCurrentTile().equals(destination)) {
				Virtue.getInstance().getEngine().getWorkerExecutor().execute(onTarget);
				destination = null;
				onTarget = null;
			}
			nextWalkDirection = -1;
			nextRunDirection = -1;
		}
	}
	
	/**
	 * Forces the entity to move to an adjacent tile
	 */
	public synchronized void moveAdjacent () {
		this.destination = pathFinder.findAdjacent(entity.getCurrentTile());
		final Tile lastTile = entity.getCurrentTile();
		if (destination != null) {
			if (running) {
				forceRunToggle();
			}
			addWalkStep(new Path.Step(destination.getX(), destination.getY()));
		}
		onTarget = new Runnable () {
			@Override
			public void run() {
				entity.queueUpdateBlock(new FaceDirectionBlock(lastTile));				
			}			
		};
	}
	
	/**
	 * Sets the specified entity as the target for this entity
	 * @param target The entity to set as a target
	 * @return True if the target setting was successful, false otherwise
	 */
	public synchronized boolean setTarget (EntityTarget target) {
		if (entity.isPaused()) {
			return false;//Unable to move
		}
		entity.stopAll();
		if (!calculateTargetPath(target.getEntity())) {
			return false;
		}
		entity.queueUpdateBlock(new FaceEntityBlock(target.getEntity()));
		this.targetEntity = target;
		return true;
	}
	
	public synchronized void clearTarget () {
		this.targetEntity = null;
		entity.queueUpdateBlock(new FaceEntityBlock(null));
	}
	
	/**
	 * Checks the current target entity and runs any processes necessary if it has moved
	 */
	private void checkTarget () {
		try {
			if (targetEntity.getEntity().getMovement().teleported() || !targetEntity.getEntity().exists()) {
				//If the entity has teleported or no longer exists, remove them as a target
				entity.stopAll();
				stop();
			} else if (targetEntity.getEntity().getCurrentTile().equals(entity.getCurrentTile())) {
				moveAdjacent();
			} else if (entity.getCurrentTile().withinDistance(
					targetEntity.getEntity().getCurrentTile(), targetEntity.getRange())) {
				if (targetEntity.onReachTarget()) {
					stop();
				}			
			} else if (walkSteps.isEmpty()) {			
				if (!calculateTargetPath(targetEntity.getEntity())) {
					stop();
				}
			}	
		} catch (RuntimeException ex) {
			logger.error("Error processing target for entity "+entity.getName(), ex);
			stop();
		}
		/*if (targetEntity.getEntity().getCurrentTile().equals(targetTile)) {
			//Recalculate the path if the entity has moved
			walkSteps.clear();
			
		}*/
	}
	
	/**
	 * Finds and adds a path from the current tile to the entity's tile
	 * @param target The target entity
	 * @return True if a path was successfully found, false otherwise
	 */
	private boolean calculateTargetPath (Entity target) {
		if (!entity.isAdjacentTo(target.getCurrentTile(), true)) {
			if (entity.getCurrentTile().equals(target.getCurrentTile())) {
				//Both entities are on the same tile
				this.destination = pathFinder.findAdjacent(target.getCurrentTile());
				if (destination == null) {
					return false;//Unable to find an adjacent tile
				}
				addWalkStep(new Path.Step(destination.getX(), destination.getY()));
			} else {
				Path path = pathFinder.find(entity, target);
				if (path == null) {
					return false;//Unable to find a path to the target entity
				}
				if (path.peekLast().x == target.getCurrentTile().getX() 
						&& path.peekLast().y == target.getCurrentTile().getY()) {
					path.pollLast();//Remove the last position if it's the same as the entity's current tile.
					//Bit of a hack, but it'll do until someone can figure out how to make the pathfinder stop at an adjacent tile.
				}
				addWalkSteps(path.getPoints());
				destination = new Tile(path.peekLast().x, path.peekLast().y, entity.getCurrentTile().getPlane());
			}
		} else {
			destination = entity.getCurrentTile();			
		}
		return true;
	}
	
	/**
	 * The method called after the entity update has been sent.
	 * Used to perform cleanup tasks and prepare for the next movement
	 */
	public synchronized void postSend () {
		if (teleported) {
			walkSteps.clear();//Just to make sure there's not any remaining steps from the old position
			teleportDestination = null;
			this.teleported = false;
		}
		if (forceRunToggle && walkSteps.isEmpty()) {
			this.running = !running;
			this.forceRunToggle = false;
		}
	}
	
	public synchronized boolean hasSteps () {
		return walkSteps.size() > 0;
	}
	
	public void toggleDebug ()  {
		this.debug = !this.debug;
	}
	
	public boolean isDebug () {
		return debug;
	}

	public void forceRunToggle () {
		this.running = !running;
		this.forceRunToggle = true;
	}
}
