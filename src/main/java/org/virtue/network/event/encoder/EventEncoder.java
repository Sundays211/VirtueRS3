package org.virtue.network.event.encoder;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.OutboundBuffer;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public interface EventEncoder<E extends GameEventContext> {
	
	public OutboundBuffer encode(Player player, E context);

}
