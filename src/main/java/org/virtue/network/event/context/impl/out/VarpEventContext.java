package org.virtue.network.event.context.impl.out;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public class VarpEventContext implements GameEventContext {

	public int id;
	public int value;
	public boolean bit;

	public VarpEventContext(int id, int value) {
		this(id, value, false);
	}

	public VarpEventContext(int id, int value, boolean bit) {
		this.value = value;
		this.id = id;
		this.bit = bit;
	}
	
	public int getKey() {
		return id;
	}
	
	public int getValue() {
		return value;
	}
	
	public boolean isBit() {
		return bit;
	}
	
}
