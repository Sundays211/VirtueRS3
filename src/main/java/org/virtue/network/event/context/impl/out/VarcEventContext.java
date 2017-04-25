package org.virtue.network.event.context.impl.out;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public class VarcEventContext implements GameEventContext {

	public int id;
	public int state;
	public boolean bit;

	public VarcEventContext(int id, int state) {
		this(id, state, false);
	}

	public VarcEventContext(int id, int state, boolean bit) {
		this.state = state;
		this.id = id;
		this.bit = bit;
	}
	
	public int getKey() {
		return id;
	}
	
	public int getValue() {
		return state;
	}
	
	public boolean isBit() {
		return bit;
	}
	
}
