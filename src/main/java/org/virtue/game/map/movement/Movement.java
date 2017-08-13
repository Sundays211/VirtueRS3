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
package org.virtue.game.map.movement;

import java.util.Collection;
import java.util.Deque;
import java.util.Optional;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.core.constants.CompassPoint;
import org.virtue.core.constants.MoveSpeed;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.MapSize;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.movement.path.Path;
import org.virtue.game.map.movement.path.PathfinderProvider;
import org.virtue.game.map.movement.path.Point;
import org.virtue.game.map.square.RegionManager;
import org.virtue.game.node.Node;
import org.virtue.network.protocol.update.block.FaceDirectionBlock;
import org.virtue.network.protocol.update.block.FaceEntityBlock;

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
	
	private Queue<Waypoint> waypoints = new ConcurrentLinkedQueue<>();
	
	private CompassPoint nextWalkDirection = null;
	
	private CompassPoint nextRunDirection = null;
	
	private MoveSpeed nextMoveSpeed = MoveSpeed.STATIONARY;
	
	private CoordGrid destination;
	
	/**
	 * The task to run when the entity reaches it's target
	 */
	private Runnable onTarget;
	
	private boolean teleported;
	
	private CoordGrid instantMoveDestination;
	
	private MoveSpeed moveSpeed = MoveSpeed.WALK;
	
	private boolean debug = false;
	
	/**
	 * The other entity that is currently targeted
	 */
	private EntityTarget targetEntity;
	
	public Movement (Entity entity) {
		this.entity = entity;
	}
	
	/**
	 * Instantly moves the entity to the specified coordinates
	 * @param level The level/plane to teleport to
	 * @param mapSquare The destination map square (region)
	 * @param localX The x-coord within the map square
	 * @param localY The y-coord within the map square
	 */
	public void setCoords (int level, int mapSquare, int localX, int localY) {
		setCoords(new CoordGrid(localX, localY, level, mapSquare));
	}
	
	/**
	 * Instantly moves the entity to the specified coordinates
	 * @param destX The x-coordinate of the destination
	 * @param destY The y-coordinate of the destination
	 * @param destZ The z-coordinate of the destination
	 */
	public void setCoords (int destX, int destY, int destZ) {
		setCoords(new CoordGrid(destX, destY, destZ));
	}
	
	/**
	 * Instantly moves the entity to the specified coordinates
	 * @param destination The destination {@link CoordGrid}
	 */
	public synchronized void setCoords (CoordGrid destination) {
		this.instantMoveDestination = destination;
		stop();//Clear the current target and remove any walk steps		
	}
	
	public synchronized boolean moveTo (int destX, int destY) {
		return moveTo(destX, destY, moveSpeed);
	}
	
	/**
	 * Moves the entity to the specified coordinates. Clears all the current steps beforehand
	 * @param destX The x-coordinate of the destination
	 * @param destY The y-coordinate of the destination
	 * @return true if the movement was successful, false otherwise
	 */
	public synchronized boolean moveTo (int destX, int destY, MoveSpeed speed) {
		CoordGrid targetCoords = new CoordGrid(destX, destY, entity.getCurrentTile().getLevel());
		entity.interuptAction();
		if (!entity.canMove()) {
			return false;
		}
		entity.stopAll();

		logger.debug("Move from {} to {}", entity.getCurrentTile(), targetCoords);
		
		Path path = PathfinderProvider.find(entity, targetCoords, true);
		if (path == null || !path.isSuccessful()) {
			return false;
		}
		//entity.queueUpdateBlock(new FaceEntityBlock(null));
		addWalkSteps(path.getPoints(), speed);
		return true;
	}
	
	/**
	 * Moves the entity one tile in the specified direction. The entity will move during the next game tick in which they are not paused.
	 * @param direction The {@link CompassPoint} to move in
	 * @return True if the step was successfully queued for the entity, false if they were blocked.
	 */
	public synchronized boolean move (CompassPoint direction) {
		entity.interuptAction();
		if (!entity.canMove()) {
			return false;
		}
		entity.stopAll();
		if (RegionManager.checkDirection(entity.getCurrentTile(), direction, entity.getSize())) {
			CoordGrid tile = CoordGrid.edit(entity.getCurrentTile(), direction.getDeltaX(), direction.getDeltaY(), (byte) 0);
			addWalkStep(new Waypoint(tile.getX(), tile.getY(), moveSpeed));
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
		entity.interuptAction();
		if (!entity.canMove()) {
			return false;
		}
		entity.stopAll();

		Path path = PathfinderProvider.find(entity, target, false, PathfinderProvider.SMART);
		if (path == null || !path.isSuccessful()) {
			return false;
		}
		return addWalkSteps(path.getPoints(), moveSpeed);
	}
	
	public synchronized boolean moveTo (SceneLocation location, int x, int y) {
		return moveTo(location, x, y, moveSpeed);
	}
	
	/**
	 * Moves the entity to a tile adjacent to the specified object
	 * @param object The {@link SceneLocation} to move towards
	 * @return true if the movement was successful, false otherwise
	 */
	public synchronized boolean moveTo (SceneLocation location, int x, int y, MoveSpeed speed) {
		entity.interuptAction();
		if (!entity.canMove()) {
			return false;
		}
		entity.stopAll();

		Path path = PathfinderProvider.find(entity, location, false, PathfinderProvider.SMART);
		if (path == null || !path.isSuccessful()) {
			return false;
		}
		//entity.queueUpdateBlock(new FaceDirectionBlock(destination));
		return addWalkSteps(path.getPoints(), speed);
	}
	
	/**
	 * Moves the entity to a tile adjacent to the specified game scene node
	 * @param item The {@link Node} to move towards
	 * @return true if the movement was successful, false otherwise
	 */
	public synchronized boolean moveTo (Node item) {
		return moveTo(item.getCenterTile().getX(), item.getCenterTile().getY(), moveSpeed);
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
	 * @param step The {@link Waypoint.Step} to add
	 */
	private void addWalkStep (Waypoint step) {
		waypoints.add(step);		
	}

	/**
	 * Clears the current walking queue and sets a new one.
	 * @param points The points of the path.
	 */
	public boolean setWaypoints(Deque<Point> points) {
		reset();
		return addWalkSteps(points, moveSpeed);
	}
	
	/**
	 * Adds a series step to the entities walk queue
	 * @param steps A Collection of {@link Waypoint.Step} to add
	 */
	public boolean addWalkSteps (Collection<Point> steps, MoveSpeed speed) {
		boolean success = true;
		Waypoint point = new Waypoint(entity.getCurrentTile().getX(), entity.getCurrentTile().getY(), speed);
		for (Point step : steps) {
			//logger.info("Point: {},{},{},{}", step.getX()>>6, step.getY()>>6, step.getX()&0x3F, step.getY()&0x3F);
			point = fillPath(step.getX(), step.getY(), point);
			if (point.getX() != step.getX() || point.getY() != step.getY()) {
				success = false;
				break;
			}
		}
		destination = new CoordGrid(point.getX(), point.getY(), entity.getCurrentTile().getLevel());
		logger.debug("Calculated destination: {}", destination);
		return success;
	}
	
	/**
	 * Adds all waypoints between (x,y) and last. 
	 * If the full path cannot be constructed (because it's blocked), returns the last successful point
	 * @param x The target x coordinate
	 * @param y The target y coordinate
	 * @param last The last position in the entities movement queue
	 * @return The final point in the path, or the last point successfully added
	 */
	public Waypoint fillPath(int x, int y, Waypoint last) {
		int diffX = x - last.getX(), diffY = y - last.getY();
		int max = Math.max(Math.abs(diffX), Math.abs(diffY));
		Waypoint next = last;
		for (int i = 0; i < max; i++) {
			if (diffX < 0) {
				diffX++;
			} else if (diffX > 0) {
				diffX--;
			}
			if (diffY < 0) {
				diffY++;
			} else if (diffY > 0) {
				diffY--;
			}
			next = addPoint(x - diffX, y - diffY, last);
			if (next.equals(last)) {
				return last;
			}
			last = next;
		}
		return next;
	}
	
	/**
	 * Adds a waypoint to the entitie's movement queue.
	 * Checks whether the path is blocked before adding the point - if so, returns imediately
	 * @param x The x-coordinate of the point to add
	 * @param y The y-coordinate of the point to add
	 * @param last The previous waypoint of the entity
	 * @return The added waypoint. If the point could not be added, due to blocking, returns {@code last}
	 */
	private Waypoint addPoint(int x, int y, Waypoint last) {
		int diffX = x - last.getX(), diffY = y - last.getY();
		if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
			logger.warn("Bad diff: x={}, y={}, last={}, next={},{}", diffX, diffY, last, x, y);
		}
		Waypoint point = new Waypoint(x, y, last.getSpeed(), diffX, diffY);
		if (!PathfinderProvider.checkStep(point, entity.getCurrentTile().getLevel(), entity.getSize())) {
			return last;
		}
		waypoints.add(point);
		return point;
	}

	/**
	 * Returns and removes the next walk step in the queue.
	 * @return The next walk step
	 */
	private Waypoint getNextStep () {
		return waypoints.poll();
	}
	
	/**
	 * Gets the direction of the entitie's next walk step
	 * @return The next walk direction
	 */
	public CompassPoint getNextWalkDirection () {
		return nextWalkDirection;
	}
	
	/**
	 * Gets the direction of the entitie's next run step
	 * @return The next run direction
	 */
	public CompassPoint getNextRunDirection () {
		return nextRunDirection;
	}
	
	/**
	 * Gets the movement speed for the next step
	 * @return The next movement speed
	 */
	public MoveSpeed getNextMoveSpeed() {
		return nextMoveSpeed;
	}

	/**
	 * Resets the walking queue.
	 */
	public void reset() {
		waypoints.clear();
	}
	
	/**
	 * Stops the entity, removing all queued walk steps.
	 */
	public synchronized void stop () {
		reset();
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
	public CoordGrid getDestination () {
		return destination;
	}
	
	/**
	 * Sets the current destination tile. 
	 * NOTE: This method doesn't actually move the entity; for moving, you should use {@link #moveTo(int, int)}
	 * @param destination The target coordinates, or null if it has no target.
	 */
	public void setDestination (CoordGrid destination) {
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
		this.moveSpeed = running ? MoveSpeed.RUN : MoveSpeed.WALK;
	}
	
	/**
	 * Gets the movement type of the player
	 * @return The movement type
	 */
	public MoveSpeed getMoveSpeed () {
		return moveSpeed;
	}
	
	/**
	 * Processes the movement, calculating the next walk/run steps and sending the viewport (if needed).
	 */
	public synchronized void process () {
		if (instantMoveDestination != null) {
			nextMoveSpeed = MoveSpeed.INSTANT;
			entity.setLastTile(entity.getCurrentTile());
			//entity.getLastTile().copy(entity.getCurrentTile());
			teleported = true;
			if (instantMoveDestination.getRegionX() > 127 && entity instanceof Player
					&& entity.getCurrentTile().getRegionX() <= 127) {
				((Player) entity).setLastStaticTile(entity.getCurrentTile());
			}
			entity.setCurrentTile(instantMoveDestination);
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
		Waypoint nextStep = getNextStep();
		if (nextStep != null && (nextStep.getX() != entity.getCurrentTile().getX() || nextStep.getY() != entity.getCurrentTile().getY())) {
			nextWalkDirection = nextStep.getDirection(entity.getCurrentTile().getX(), entity.getCurrentTile().getY());
			if (nextWalkDirection == null) {
				//changed this here - added line below, commented other
				//nextWalkDirection = nextStep.getDirection(entity.getLastTile().getX(), entity.getLastTile().getY());
				logger.warn("Next walk step is more than 1 tile away from the current position of the player! current="+entity.getCurrentTile()+", next={x="+nextStep.getX()+", y="+nextStep.getY()+"}");
				return;
			}
			entity.setLastTile(entity.getCurrentTile());

			CoordGrid next = new CoordGrid(nextStep.getX(), nextStep.getY(), entity.getCurrentTile().getLevel());
			entity.setCurrentTile(next);

			nextMoveSpeed = nextStep.getSpeed();
			logger.debug("Direction: "+nextWalkDirection+", x="+nextStep.getX()+", y="+nextStep.getY());
			if (nextMoveSpeed == MoveSpeed.RUN && entity instanceof Player && ((Player) entity).drainRunEnergy()) {
				nextStep = getNextStep();
				if (nextStep != null && (nextStep.getX() != entity.getCurrentTile().getX() || nextStep.getY() != entity.getCurrentTile().getY())) {
					logger.debug("Direction: "+nextRunDirection+", x="+nextStep.getX()+", y="+nextStep.getY());
					nextRunDirection = nextStep.getDirection(entity.getCurrentTile().getX(), entity.getCurrentTile().getY());
					if (nextRunDirection == null) {
						throw new RuntimeException("Next run step is more than 1 tile away from the current position of the player! current="+entity.getCurrentTile()+", next={x="+nextStep.getX()+", y="+nextStep.getY()+"}");
					}
					next = new CoordGrid(nextStep.getX(), nextStep.getY(), entity.getCurrentTile().getLevel());
					entity.setCurrentTile(next);
				} else {
					nextRunDirection = null;
				}
			} else {
				nextRunDirection = null;
			}
		} else {
			if (onTarget != null && entity.getCurrentTile().equals(destination)) {
				Virtue.getInstance().getEngine().getWorkerExecutor().execute(onTarget);
				destination = null;
				onTarget = null;
			}
			nextWalkDirection = null;
			nextRunDirection = null;
			nextMoveSpeed = MoveSpeed.STATIONARY;
		}
		if (entity instanceof Player) {
			if (((Player) entity).getViewport().needsMapUpdate()) {
				((Player) entity).getViewport().moveToRegion(entity.getCurrentTile(), MapSize.DEFAULT, true);
			}
		}
	}
	
	/**
	 * Forces the entity to move to an adjacent tile
	 */
	public synchronized void moveAdjacent () {
		final CoordGrid lastTile = entity.getCurrentTile();
		PathfinderProvider.findAdjacent(entity).map(path -> setWaypoints(path.getPoints()));
		onTarget = () -> entity.queueUpdateBlock(new FaceDirectionBlock(lastTile));
	}
	
	/**
	 * Sets the specified entity as the target for this entity
	 * @param target The entity to set as a target
	 * @return True if the target setting was successful, false otherwise
	 */
	public synchronized boolean setTarget (EntityTarget target) {
		entity.interuptAction();
		if (!entity.canMove()) {
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
			} else if (entity.getCurrentTile().equals(targetEntity.getEntity().getCurrentTile())) {
				Optional<Path> path = PathfinderProvider.findAdjacent(targetEntity.getEntity());
				if (!path.isPresent() || !setWaypoints(path.get().getPoints())) {
					stop();
				}
			} else if (entity.getCurrentTile().withinDistance(
					targetEntity.getEntity().getCurrentTile(), targetEntity.getRange())) {
				if (targetEntity.onReachTarget()) {
					stop();
				}			
			} else if (waypoints.isEmpty()) {
				//TODO: Run on a different thread
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
		Path path = PathfinderProvider.find(entity, target);
		if (path == null || !path.isSuccessful()) {
			return false;//Unable to find a path to the target entity
		}
		return addWalkSteps(path.getPoints(), moveSpeed);
	}
	
	/**
	 * The method called after the entity update has been sent.
	 * Used to perform cleanup tasks and prepare for the next movement
	 */
	public synchronized void postSend () {
		if (teleported) {
			waypoints.clear();//Just to make sure there's not any remaining steps from the old position
			instantMoveDestination = null;
			this.teleported = false;
		}
	}
	
	public synchronized boolean hasSteps () {
		return !waypoints.isEmpty();
	}
	
	public void toggleDebug ()  {
		this.debug = !this.debug;
	}
	
	public boolean isDebug () {
		return debug;
	}
}
