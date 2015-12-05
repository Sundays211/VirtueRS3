package org.virtue.network.event.context.impl.out;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public class RootWidgetEventContext implements GameEventContext {

	private int widgetType;
	
	/**
	 * The RSClient has support for encrypted interfaces
	 * however, none of the containers are actually encrypted
	 */
	private int[] keys;

	public RootWidgetEventContext(int widgetType) {
		this(widgetType, new int[] { 0, 0, 0, 0 });
	}
	
	public RootWidgetEventContext(int widgetType, int[] keys) {
		this.widgetType = widgetType;
		this.keys = keys;
	}

	public int getWidgetType() {
		return widgetType;
	}

	/**
	 * @return
	 */
	public int[] getKeys() {
		return keys;
	}
}
