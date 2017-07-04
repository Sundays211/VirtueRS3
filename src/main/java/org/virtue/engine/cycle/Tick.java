package org.virtue.engine.cycle;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author Taylor
 * @version 1.0
 */
public abstract class Tick {
	
	/**
	 * Represents if this {@link Tick} needs to be destroyed in the next game cycle.
	 */
	private volatile boolean destroyLater = false;
	
	/**
	 * Represents if this {@link Tick} needs to be destroyed immediatley.
	 */
	private volatile boolean destroyNow = false;
	
	/**
	 * Represents if this {@link Tick} is paused and is no longer ticking, until
	 * {@link #resume()} shall be called.
	 */
	private volatile boolean paused = false;
	
	/**
	 * Represents if this {@link Tick} should skip the next game cycle.
	 */
	private volatile AtomicInteger skip = new AtomicInteger(0);

	/**
	 * Called every game cycle.
	 */
	public abstract void tick();

	/**
	 * Causes this {@link Tick} to destroy and remove itself on the next game
	 * cycle. Hence the "<b>later</b>" prefix.
	 */
	public void destroyLater() {
		destroyLater = true;
	}

	/**
	 * Causes this {@link Tick} to destroy on call. 
	 */
	public void destroyNow() {
		destroyNow = true;
	}

	/**
	 * Causes this {@link Tick} to pause and skip all game cycles until
	 * {@link #resume()} is called. If already paused,
	 * {@link IllegalAccessException} is thrown.
	 */
	public void pause() {
		if (paused == true)
			try {
				throw new IllegalAccessException("The requested tick is currently paused, therefore cannot be paused again.");
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		paused = true;
	}
	
	/**
	 * Causes this {@link Tick} to resume if previously paused. If not paused,
	 * {@link IllegalAccessException} is thrown.
	 */
	public void resume() {
		if (paused == false)
			try {
				throw new IllegalAccessException("The requested tick is not currently paused, therefore cannot be resumed.");
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		paused = false;
	}
	
	/**
	 * Causes this {@link Tick} to skip a given number of game cycles.
	 * @param skipCount The amount of upcoming game cycles to skip.
	 */
	public void skipNext(int skipCount) {
		skip.addAndGet(skipCount);
		paused = true;
	}
	
	/**
	 * Called every game cycle. Updates the attributes of this {@link Tick}. If
	 * not paused or skipping, the {@link #tick()} method will be called.
	 * @return {@code False} if we continue ticking; {@code True} if this
	 *         {@link Tick} should be removed completely
	 */
	public final boolean update() {
		if (destroyNow)
			return true;
		if (paused) {
			if (skip.get() != 0 && skip.decrementAndGet() == 0)
				paused = false;
			return false;
		}
		tick();
		return destroyLater;
	}
}
