package org.virtue.engine;

/**
 * @author Taylor
 * @version 1.0
 */
public class GameClock {

	/**
	 * Represents a minute in game time.
	 */
	public static final long ONE_MINUTE = 100;
	
	/**
	 * Represents an hour in game time.
	 */
	public static final long ONE_HOUR = ONE_MINUTE * 60;
	
	/**
	 * Represents a day in game time.
	 */
	public static final long ONE_DAY = ONE_HOUR * 24;
	
	/**
	 * Represents the delay, in milliseconds, between each game <b>cycle</b>.
	 */
	public static final long CYCLE_RATE = 600;
}
