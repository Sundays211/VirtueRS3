package org.virtue.engine.cycle;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author Taylor
 * @version 1.0
 */
public class TickService {

	/**
	 * Represents a {@link List} of <b>ticks</b> that will be called upon per game cycle.
	 */
	private final List<Tick> TICKS = Collections.synchronizedList(new ArrayList<Tick>());
	
	/**
	 * Represents the lock {@link Object} for extra saftey when performing ticks.
	 */
	private volatile Object lock = new Object();

	/**
	 * Causes this {@link TickService} to perform a world wide game cycle.
	 */
	public void performCycle() {
		synchronized (lock) {
			for (Tick tick : TICKS.toArray(new Tick[TICKS.size()]))
				if (tick.update())
					TICKS.remove(tick);
		}
	}
	
	/**
	 * @return The ticks
	 */
	public List<Tick> getTicks() {
		return TICKS;
	}
}
