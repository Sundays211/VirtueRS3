package org.virtue.game.world.region.movement.path;

import org.virtue.game.world.region.movement.CompassPoint;
import org.virtue.utility.DirectionUtility;

/**
 * Represents a point.
 * @author Emperor
 */
public final class Point {

	/**
	 * The x-coordinate.
	 */
	private final int x;

	/**
	 * The y-coordinate.
	 */
	private final int y;

	/**
	 * The difference x between previous and current point.
	 */
	private final int diffX;

	/**
	 * The difference y between previous and current point.
	 */
	private final int diffY;

	/**
	 * The direction for the next point.
	 */
	private final CompassPoint direction;

	/**
	 * If we can't run during this point.
	 */
	private boolean runDisabled;

	/**
	 * Constructs a new {@code Point} {@code Object}.
	 * @param x The x-coordinate.
	 * @param y The y-coordinate.
	 */
	public Point(int x, int y) {
		this(x, y, null, 0, 0);
	}

	/**
	 * Constructs a new {@code Point} {@code Object}.
	 * @param x The x-coordinate.
	 * @param y The y-coordinate.
	 * @param direction The direction.
	 */
	public Point(int x, int y, CompassPoint direction) {
		this(x, y, direction, 0, 0);
	}

	/**
	 * Constructs a new {@code Point} {@code Object}.
	 * @param x The x-coordinate.
	 * @param y The y-coordinate.
	 * @param direction The direction.
	 * @param diffX The difference x between previous and current point.
	 * @param diffY The difference y between previous and current point.
	 */
	public Point(int x, int y, CompassPoint direction, int diffX, int diffY) {
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.diffX = diffX;
		this.diffY = diffY;
	}

	/**
	 * Constructs a new {@code Point} {@code Object}.
	 * @param x The x-coordinate.
	 * @param y The y-coordinate.
	 * @param direction The direction.
	 * @param diffX The difference x between previous and current point.
	 * @param diffY The difference y between previous and current point.
	 * @param runDisabled If running is disabled for this walking point.
	 */
	public Point(int x, int y, CompassPoint direction, int diffX, int diffY, boolean runDisabled) {
		this(x, y, direction, diffX, diffY);
		this.runDisabled = runDisabled;
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

	/**
	 * Gets the x.
	 * @return The x.
	 */
	public int getX() {
		return x;
	}

	/**
	 * Gets the y.
	 * @return The y.
	 */
	public int getY() {
		return y;
	}

	/**
	 * Gets the direction.
	 * @return The direction.
	 */
	public CompassPoint getDirection() {
		return direction;
	}

	/**
	 * Gets the diffX.
	 * @return The diffX.
	 */
	public int getDiffX() {
		return diffX;
	}

	/**
	 * Gets the diffY.
	 * @return The diffY.
	 */
	public int getDiffY() {
		return diffY;
	}

	/**
	 * Gets the runDisabled.
	 * @return The runDisabled.
	 */
	public boolean isRunDisabled() {
		return runDisabled;
	}

	/**
	 * Sets the runDisabled.
	 * @param runDisabled The runDisabled to set.
	 */
	public void setRunDisabled(boolean runDisabled) {
		this.runDisabled = runDisabled;
	}

}