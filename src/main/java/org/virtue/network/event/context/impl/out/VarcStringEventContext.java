package org.virtue.network.event.context.impl.out;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public class VarcStringEventContext implements GameEventContext {

	public int id;
	public String state;

	public VarcStringEventContext(int id, String state) {
		this.id = id;
		this.state = state;
	}
	
	public int getKey() {
		return id;
	}
	
	public String getValue() {
		return state;
	}
	
}
