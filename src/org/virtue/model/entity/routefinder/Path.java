package org.virtue.model.entity.routefinder;

import java.util.Deque;
import java.util.LinkedList;

import org.virtue.utility.DirectionUtility;

/**
 * Represents a path found by a <code>PathFinder</code> between two points.
 * @author Graham Edgecombe
 *
 */
public final class Path {

    public static class Step {
		public final int x;
		public final int y;
		
		public Step (int x, int y) {
			this.x = x;
			this.y = y;
		}
		
		/**
		 * Gets the direction from the specified position to the new position
		 * @param oldX The x-coordinate of the old position
		 * @param oldY The y-coordinate of the old position
		 * @return The direction
		 */
		public int getDirection (int oldX, int oldY) {
			return DirectionUtility.getPlayerWalkingDirection(x - oldX, oldY - y);
		}
		
		@Override
		public String toString () {
			return new StringBuilder().append("{ x=").append(x).append(" y=").append(y).append(" }").toString();
		}
	}

	/**
     * The queue of positions.
     */
    private Deque<Step> tiles = new LinkedList<>();

    /**
     * Creates an empty path.
     */
    public Path() {}

    /**
     * Adds a Position onto the queue.
     * @param p The Position to add.
     */
    public void addFirst(Step p) {
        tiles.addFirst(p);
    }

    /**
     * Adds a position onto the queue.
     * @param p The position to add.
     */
    public void addLast(Step p) {
        tiles.addLast(p);
    }

    /**
     * Peeks at the next tile in the path.
     * @return The next tile.
     */
    public Step peek() {
        return tiles.peek();
    }

    /**
     * Polls a position from the path.
     * @return The polled position.
     */
    public Step poll() {
        return tiles.poll();
    }
    
    /**
     * Peeks at the last tile in the path.
     * @return The last tile
     */
    public Step peekLast () {
    	return tiles.peekLast();
    }
    
    /**
     * Returns and removes the last position in the path.
     * @return The polled position.
     */
    public Step pollLast () {
    	return tiles.pollLast();
    }

    /**
     * Gets if the path is empty.
     * @return If the tile deque is empty.
     */
    public boolean isEmpty() {
        return tiles.isEmpty();
    }

    /**
     * Gets the deque backing this path.
     * @return The deque backing this path.
     */
    public Deque<Step> getPoints() {
        return tiles;
    }
}

