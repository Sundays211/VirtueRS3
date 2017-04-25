package org.virtue.network.event.handler.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.EmptyEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Tom
 *
 */
public class KeepAliveEventHandler implements GameEventHandler<EmptyEventContext> {

	@Override
	public void handle(Player player, EmptyEventContext context) {
		player.getDispatcher().sendKeepAlive(context);
	}
}
