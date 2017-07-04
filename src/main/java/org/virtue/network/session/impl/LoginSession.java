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

import java.util.ArrayDeque;
import java.util.Deque;

import org.virtue.Virtue;
import org.virtue.engine.service.LoginService;
import org.virtue.engine.service.OnDemandService;
import org.virtue.game.Lobby;
import org.virtue.game.World;
import org.virtue.game.entity.player.LoginDispatcher;
import org.virtue.game.entity.player.Player;
import org.virtue.game.parser.AccountInfo;
import org.virtue.game.parser.ParserType;
import org.virtue.network.NetworkHandler;
import org.virtue.network.protocol.ProtocolDecoder;
import org.virtue.network.protocol.login.LoginDecoder;
import org.virtue.network.protocol.login.LoginEncoder;
import org.virtue.network.protocol.message.ResponseTypeMessage;
import org.virtue.network.protocol.message.login.LoginRequestMessage;
import org.virtue.network.protocol.message.login.LoginResponseMessage;
import org.virtue.network.protocol.message.login.LoginTypeMessage;
import org.virtue.network.session.Session;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class LoginSession extends Session {

	/**
	 * The {@link LoginSession} constructor
	 */
	public LoginSession(Channel channel) {
		super(channel);
		this.service = Virtue.getInstance().getEngine().getLoginService();
	}
	
	/**
	 * The {@link OnDemandService} used for the ArrayDeque of pending requests
	 */
	private final LoginService service;
	
	/**
	 * The {@link Deque} of pending requests
	 */
	private final Deque<LoginRequestMessage> loginQueue = new ArrayDeque<>();
	
	/**
	 * If the encoder is not sending any requests and no request are being queued
	 */
	private boolean idle = true;
	
	/**
	 * The new player
	 */
	private Player player;

	/* (non-Javadoc)
	 * @see org.virtue.network.session.Session#messageReceived(java.lang.Object)
	 */
	@Override
	public void messageReceived(Object message) {
		if (message instanceof LoginRequestMessage) {
			LoginRequestMessage request = (LoginRequestMessage) message;
		
			synchronized (loginQueue) {
				loginQueue.addFirst(request);

				if (idle) {
					service.addPendingSession(this);
					idle = false;
				}
			}
		}
	}

	/**
	 * Processes the login queue
	 */
	public void processLoginQueue() {
		LoginRequestMessage request;

		synchronized (loginQueue) {
			request = loginQueue.pop();
			if (loginQueue.isEmpty()) {
				idle = true;
			} else {
				service.addPendingSession(this);
				idle = false;
			}
		}
		if (request.getLoginType() == LoginTypeMessage.LOGIN_CONTINUE) {
			World.getInstance().addPlayer(player);
			channel.writeAndFlush(new LoginResponseMessage(player, ResponseTypeMessage.STATUS_OK.getCode(), LoginTypeMessage.LOGIN_WORLD));

			finishLogin(LoginTypeMessage.LOGIN_WORLD);
			return;
		}
		if (Virtue.getInstance().getUpdateTime() <= 100 && Virtue.getInstance().hasUpdate()) {
			channel.pipeline().remove(LoginDecoder.class);
			channel.writeAndFlush(new LoginResponseMessage(null, ResponseTypeMessage.SERVER_UPDATING.getCode(), null));
			return;
		}
		if (request != null) {
			if (request.getLoginType() != LoginTypeMessage.LOGIN_CONTINUE) {
				int response = checkPlayer(request);
				if (player == null) {
					// player = new Player(request.getChannel(),
					// request.getUsername(), request.getPassword(),
					// PrivilegeLevel.forOpcode(2), CombatMode.EOC,
					// request.getEncodingCipher(), request.getDecodingCipher());
					channel.pipeline().remove(LoginDecoder.class);
					channel.writeAndFlush(new LoginResponseMessage(null, response, null));
					// channel.close();
					return;
				}			
			}
			if (World.getInstance().containsPlayer(player.getUserHash())) {
				channel.pipeline().remove(LoginDecoder.class);
				channel.writeAndFlush(new LoginResponseMessage(null, ResponseTypeMessage.STATUS_ALREADY_ONLINE.getCode(), null));
				return;
			}
			switch (request.getLoginType()) {
			case LOGIN_LOBBY:
				if (Lobby.getInstance().containsPlayer(player.getUserHash())) {
					Lobby.getInstance().getPlayerByHash(player.getUserHash()).kick(false);
				}
				Lobby.getInstance().addPlayer(player);
				channel.writeAndFlush(new LoginResponseMessage(player, ResponseTypeMessage.STATUS_OK.getCode(), request.getLoginType()));

				finishLogin(request.getLoginType());
				break;
			case LOGIN_WORLD:
				Player oldPlayer = Lobby.getInstance().getPlayerByHash(player.getUserHash());
				if (oldPlayer != null) {
					//Lobby.getInstance().getPlayers().remove(oldPlayer.getIndex());
					oldPlayer.finish();
				}
				LoginDispatcher.onPreGameLogin(player);
				break;//Send the varcs then wait for the client to respond with READY
			case LOGIN_CONTINUE:				
				return;
			}
			//player.initialize();			
			System.out.println(request.getUsername() + ", " + request.getPassword() + ", " + request.getLoginType().toString());
		}
	}
	
	private void finishLogin (LoginTypeMessage loginType) {
		channel.pipeline().remove(LoginDecoder.class);
		channel.pipeline().remove(LoginEncoder.class);
		channel.pipeline().addFirst("decoder", new ProtocolDecoder(player.getDecodingCipher()));
		channel.attr(NetworkHandler.attachment).set(new GameSession(channel, player));
		
		player.getDispatcher().dispatchLogin(loginType);
	}
	
	public int checkPlayer(LoginRequestMessage request) {
		AccountInfo info;
		if (request.isEmail()) {
			info = Virtue.getInstance().getAccountIndex().lookupByEmail(request.getUsername());
		} else {
			if (request.getUsername().length() <= 12) {
				info = Virtue.getInstance().getAccountIndex().lookupByUsername(request.getUsername());
			} else {
				info = null;
			}
		}
		if (info == null) {
			return ResponseTypeMessage.STATUS_INVALID_PASSWORD.getCode();
		}
		request.setUsername(info.getUsername());
		Object response = Virtue.getInstance().getParserRepository().getParser().loadObjectDefinition(request, ParserType.CHARACTER);
		if (response instanceof Player) {			
			player = (Player) response;
			player.setNames(info.getDisplayName(), info.getPrevName());
			player.setPrivilgeLevel(info.getType());
			/*
			 * if (player.isAuthenticated()) {
			 * return ResponseTypeMessage.AUTHENTICATED.getCode():
			 * } else {
			 * return ResponseTypeMessage.STATUS_OK.getCode();
			 * }
			 */
			return ResponseTypeMessage.STATUS_OK.getCode();
		}
		return (Integer) response;
	}

	/* (non-Javadoc)
	 * @see org.virtue.network.session.Session#disconnect()
	 */
	@Override
	public void disconnect() {
		// TODO Auto-generated method stub

	}
}
