package org.virtue.network.event.decoder;

import org.virtue.game.entity.player.Player;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public interface EventDecoder<E extends GameEventContext> {

	public E createContext(Player player, int opcode, InboundBuffer buffer);
	
	public ClientProtocol[] getTypes ();
}
