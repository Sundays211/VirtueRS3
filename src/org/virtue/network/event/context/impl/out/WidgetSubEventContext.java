package org.virtue.network.event.context.impl.out;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public class WidgetSubEventContext implements GameEventContext {

	private int root;
	private int component;
	private int widgetId;
	private boolean alwaysOpen;
	
	/**
	 * Client has support for encrypted interfaces
	 * Even though none are
	 */
	private int[] keys;
	
	private Entity parentEntity;
	private SceneLocation parentLoc;

	public WidgetSubEventContext(int root, int component, int widgetId, boolean alwaysOpen) {
		this(root, component, widgetId, alwaysOpen, new int[] { 0, 0, 0, 0});
	}
	
	public WidgetSubEventContext(int root, int component, int widgetId, boolean alwaysOpen, int[] keys) {
		this.root = root;
		this.component = component;
		this.widgetId = widgetId;
		this.alwaysOpen = alwaysOpen;
		this.keys = keys;
	}
	
	public WidgetSubEventContext(int root, int component, int widgetId, boolean alwaysOpen, Entity parentEntity) {
		this.root = root;
		this.component = component;
		this.widgetId = widgetId;
		this.alwaysOpen = alwaysOpen;
		this.parentEntity = parentEntity;
		this.keys = new int[4];
	}
	
	public WidgetSubEventContext(int root, int component, int widgetId, boolean alwaysOpen, SceneLocation parentLoc) {
		this.root = root;
		this.component = component;
		this.widgetId = widgetId;
		this.alwaysOpen = alwaysOpen;
		this.parentLoc = parentLoc;
		this.keys = new int[4];
	}

	public int getRoot() {
		return root;
	}

	public int getComponent() {
		return component;
	}
	
	public int getWidgetId() {
		return widgetId;
	}

	public boolean alwaysOpen() {
		return alwaysOpen;
	}
	
	public Entity getParentEntity() {
		return parentEntity;
	}

	public SceneLocation getParentLoc() {
		return parentLoc;
	}

	/**
	 * @return
	 */
	public int[] getKeys() {
		return keys;
	}
}
