package org.virtue.engine.script.api;

import org.virtue.game.entity.Entity;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.SceneLocation;

public interface EntityAPI {

	public void moveTo (Entity entity, CoordGrid coords);
	
	public boolean moveTo (Entity entity, SceneLocation loc, Runnable onReachedTarget);
	
	public void setCoords(Entity entity, CoordGrid coords);
	
	/**
	 * Retrieves the current coordinates of the specified entity
	 * @param entity The entity to check
	 * @return The entities current coordinates
	 */
	public CoordGrid getCoords (Entity entity);
	
	/**
	 * Makes the entity display the specified message above their head
	 * @param entity The entity to say the message
	 * @param message The message to say
	 */
	public void say (Entity entity, String message);
	
	/**
	 * Gets the name of the entity
	 * @param entity The entity
	 * @return The name
	 */
	public String getName (Entity entity);
	
	/**
	 * Gradually moves the entity from it's current coordinates to the target coords.
	 * The movement will take place gradually over the specified length, in client cycles.
	 * Approximately after the move is complete, the entitie's coordinates will be set to {@code coords}
	 * @param entity The entity to move
	 * @param coords The coordinates to move to
	 * @param length The number of client cycles required to perform the move
	 */
	public void forceMove (Entity entity, CoordGrid coords, int length);

	/**
	 * Gradually moves the entity from it's current coordinates to the final coords, via the intermediate coords.
	 * Moves from start to intermediate over {@code intermediateDelay}, then to final over {@code totalLength}
	 * @param entity The entity to move
	 * @param intermediateCoords The intermediate coordinates to move to
	 * @param intermediateDelay The time taken to move to the intermediate coords
	 * @param finalCoords The final coordinates to move to
	 * @param totalLength The total time taken to move from the current coords to the final coords
	 */
	public default void forceMove (Entity entity, CoordGrid intermediateCoords, int intermediateDelay, 
			CoordGrid finalCoords, int totalLength) {
		forceMove(entity, intermediateCoords, intermediateDelay, finalCoords, totalLength, finalCoords);
	}

	/**
	 * Gradually moves the entity from it's current coordinates to the final coords, via the intermediate coords.
	 * Moves from start to intermediate over {@code intermediateDelay}, then to final over {@code totalLength}
	 * @param entity The entity to move
	 * @param intermediateCoords The intermediate coordinates to move to
	 * @param intermediateDelay The time taken to move to the intermediate coords
	 * @param finalCoords The final coordinates to move to
	 * @param totalLength The total time taken to move from the current coords to the final coords
	 * @param facingCoords The coordinates to face after performing the move
	 */
	public void forceMove (Entity entity, CoordGrid intermediateCoords, int intermediateDelay, 
			CoordGrid finalCoords, int totalLength, CoordGrid facingCoords);
}
