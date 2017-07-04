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

import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;

import java.io.IOException;

import org.virtue.Virtue;
import org.virtue.game.entity.player.GameState;
import org.virtue.game.entity.player.LoginDispatcher;
import org.virtue.game.entity.player.Player;
import org.virtue.network.NetworkHandler;
import org.virtue.network.protocol.ProtocolDecoder;
import org.virtue.network.protocol.creation.CreationDecoder;
import org.virtue.network.protocol.message.creation.CreationRequestMessage;
import org.virtue.network.session.Session;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 2, 2014
 */
public class CreationSession extends Session {
	
	
	private Player player;
	
	/**
	 * The {@link CreationSession} constructor
	 */
	public CreationSession(Channel channel) {
		super(channel);
	}


	/* (non-Javadoc)
	 * @see org.virtue.network.session.Session#messageReceived(java.lang.Object)
	 */
	@Override
	public void messageReceived(Object message) throws IOException {
		if (message instanceof CreationRequestMessage) {
			CreationRequestMessage request = (CreationRequestMessage) message;
			player = new Player(request.getChannel(), request.getEncodingCipher(), request.getDecodingCipher());
			player.setGameState(GameState.CREATION);
			player.initialize(false, Virtue.getInstance().getConfigProvider());
			channel.writeAndFlush(Unpooled.buffer(1).writeByte(2));
			channel.pipeline().remove(CreationDecoder.class);
			channel.pipeline().addFirst(new ProtocolDecoder(request.getDecodingCipher()));
			channel.attr(NetworkHandler.attachment).set(new GameSession(channel, player));
			player.getModel().setTemp();
			player.getModel().sendBlock(true, Virtue.getInstance().getConfigProvider().getWearposDefaults());
			LoginDispatcher.onAccountCreation(player);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.session.Session#disconnect()
	 */
	@Override
	public void disconnect() {
		// TODO Auto-generated method stub

	}
}
