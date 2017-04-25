package org.virtue.network.event.context.impl.out.widget;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public class WidgetTopEventContext implements GameEventContext {

	private int widgetType;
	
	/**
	 * The RSClient has support for encrypted interfaces
	 * however, none of the containers are actually encrypted
	 */
	private int[] keys;

	public WidgetTopEventContext(int widgetType) {
		this(widgetType, new int[] { 0, 0, 0, 0 });
	}
	
	public WidgetTopEventContext(int widgetType, int[] keys) {
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
