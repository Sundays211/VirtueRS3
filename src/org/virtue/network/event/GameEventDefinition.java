package org.virtue.network.event;

import org.virtue.network.event.context.GameEventContext;
import org.virtue.network.event.decoder.GameEventDecoder;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Tom
 *
 */
public class GameEventDefinition {

	private GameEventDecoder<? extends GameEventContext> event;
	private GameEventHandler<? extends GameEventContext> handler;

	public GameEventDefinition(GameEventDecoder<? extends GameEventContext> event, GameEventHandler<? extends GameEventContext> handler) {
		this.event = event;
		this.handler = handler;
	}

	public GameEventDecoder<? extends GameEventContext> getEvent() {
		return event;
	}

	public GameEventHandler<? extends GameEventContext> getHandler() {
		return handler;
	}
}
