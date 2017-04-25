package org.virtue.network.event.context.impl.out;

import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public class WorldListEventContext implements GameEventContext {

	private boolean fullUpdate;

	public WorldListEventContext(int updateType) {
		this.fullUpdate = (updateType == 0);
	}

	public boolean isFullUpdate() {
		return fullUpdate;
	}
}
