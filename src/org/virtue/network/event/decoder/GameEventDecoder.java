package org.virtue.network.event.decoder;

import org.virtue.model.entity.player.Player;
import org.virtue.network.event.IncomingEventType;
import org.virtue.network.event.buffer.InboundBuffer;
import org.virtue.network.event.context.GameEventContext;

/**
 * @author Tom
 *
 */
public interface GameEventDecoder<E extends GameEventContext> {

	public E createContext(Player player, int opcode, InboundBuffer buffer);
	
	public IncomingEventType[] getTypes ();
}
