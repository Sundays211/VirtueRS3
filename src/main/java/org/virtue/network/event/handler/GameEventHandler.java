package org.virtue.network.event.handler;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public interface GameEventHandler<E extends GameEventContext> {

	public void handle(Player player, E context);
}
