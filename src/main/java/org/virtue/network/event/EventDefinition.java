package org.virtue.network.event;

import org.virtue.network.event.context.GameEventContext;
import org.virtue.network.event.decoder.EventDecoder;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Tom
 *
 */
public class EventDefinition {

	private EventDecoder<? extends GameEventContext> event;
	private GameEventHandler<? extends GameEventContext> handler;

	public EventDefinition(EventDecoder<? extends GameEventContext> event, GameEventHandler<? extends GameEventContext> handler) {
		this.event = event;
		this.handler = handler;
	}

	public EventDecoder<? extends GameEventContext> getEvent() {
		return event;
	}

	public GameEventHandler<? extends GameEventContext> getHandler() {
		return handler;
	}
}
