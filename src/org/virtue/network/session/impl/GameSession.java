/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.network.session.impl;

import io.netty.channel.Channel;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.model.entity.player.Player;
import org.virtue.network.event.GameEventDefinition;
import org.virtue.network.event.IncomingEventType;
import org.virtue.network.event.context.GameEventContext;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.network.protocol.message.event.GameEventMessage;
import org.virtue.network.session.Session;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Sep 5, 2014
 */
public class GameSession extends Session {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(GameSession.class);
	
	/**
	 * Contains opcodes which we don't want to handle but don't want clogging up the unhandled stream.
	 */
	private static final boolean[] FILTER_OPCODES = new boolean[121];
			
	static {
		registerFilter(IncomingEventType.WINDOW_STATUS);
		registerFilter(IncomingEventType.EVENT_APPLET_FOCUS);
		registerFilter(IncomingEventType.EVENT_CAMERA_POSITION);
		registerFilter(IncomingEventType.EVENT_MOUSE_CLICK);
		registerFilter(IncomingEventType.EVENT_MOUSE_CLICK_2);
		registerFilter(IncomingEventType.CLIENT_STATISTICS);
		registerFilter(IncomingEventType.EVENT_KEYBOARD);
		registerFilter(IncomingEventType.EVENT_MOUSE_MOVE);
		registerFilter(IncomingEventType.EVENT_MOUSE_MOVE_2);
		registerFilter(IncomingEventType.TRANSMITVAR_VERIFYID);//This one could be removed and handled at some stage
	};
	
	private static void registerFilter (IncomingEventType event) {
		if (event.getOpcode() != -1) {
			FILTER_OPCODES[event.getOpcode()] = true;
		}
	}
	
	/**
	 * The player that needs encoding/decoding
	 */
	private Player player;

	/**
	 * The {@link GameSession} constructor
	 */
	public GameSession(Channel channel, Player player) {
		super(channel);
		this.player = player;
	}


	/* (non-Javadoc)
	 * @see org.virtue.network.session.Session#messageReceived(java.lang.Object)
	 */
	@Override
	public void messageReceived(Object message) throws IOException {
		if (message instanceof GameEventMessage) {
			GameEventMessage request = (GameEventMessage) message;
			//logger.info("Received Opcode: " + request.getOpcode() + ", " + request.getPayload().length());
			GameEventDefinition definition = Virtue.getInstance().getEventRepository().lookupReadEvent(request.getOpcode());
			if (definition == null) {				
				if (!FILTER_OPCODES[request.getOpcode()]) {
					logger.warn("Unhandled Opcode: " + request.getOpcode() + ", " + request.getPayload().length());
				}
				return;
			}
			if (request.getOpcode() != IncomingEventType.KEEP_ALIVE.getOpcode()
					&& request.getOpcode() != IncomingEventType.CLIENT_STATISTICS.getOpcode()) {
				player.resetInactivityTime();
			}
			
			GameEventContext context = definition.getEvent().createContext(player, request.getOpcode(), request.getPayload());
			if (context == null)
				return;
			
			@SuppressWarnings("unchecked")
			GameEventHandler<GameEventContext> handler = (GameEventHandler<GameEventContext>) definition.getHandler();
			if (handler == null)
				return;
			
			handler.handle(player, context);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.session.Session#disconnect()
	 */
	@Override
	public void disconnect() {
		if (player.getGameState() != null) {
			switch (player.getGameState()) {
			case LOBBY:
				player.finish();
				break;
			case WORLD:
			case WORLD_READY:
				player.finish();
			default:
				player.finish();
				break;
			}
		}
	}
}
