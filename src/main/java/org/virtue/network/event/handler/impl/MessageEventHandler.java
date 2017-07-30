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
package org.virtue.network.event.handler.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.config.ConfigProvider;
import org.virtue.game.content.CommandManager;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.in.InMessageEventContext;
import org.virtue.network.event.context.impl.in.InQuickMessageEventContext;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.utility.text.QuickChatMessage;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 23/10/2014
 */
public class MessageEventHandler implements GameEventHandler<InMessageEventContext> {

	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(MessageEventHandler.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game
	 * .entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, InMessageEventContext context) {
		ConfigProvider configProvider = Virtue.getInstance().getConfigProvider();
		if (context.getRecipient() != null) {
			if (context instanceof InQuickMessageEventContext) {
				QuickChatMessage message = ((InQuickMessageEventContext) context)
						.getQuickMessage();
				if (message == null) {
					return;// There was a problem decoding the message
				}
				message.setParams(player, configProvider);// Complete the message with player
											// data
				player.getChat().sendPrivateQuickMessage(message,
						context.getRecipient());
			} else {
				player.getChat().sendPrivateMessage(context.getMessage(),
						context.getRecipient());
			}
		} else if (context instanceof InQuickMessageEventContext) {
			InQuickMessageEventContext qcContext = (InQuickMessageEventContext) context;
			QuickChatMessage message = qcContext.getQuickMessage();
			if (message == null) {
				return;// There was a problem decoding the message
			}
			message.setParams(player, configProvider);// Complete the message with player data
			switch (qcContext.getChatMode()) {
			case PUBLIC:
				player.getChat().sendPublicQuickMessage(message);
				break;
			case FRIENDCHAT:
				player.getChat().sendFriendChatQuickMessage(message);
				break;
			case CLANCHAT:
				Virtue.getInstance().getClans().getChannels()
						.sendQuickMessage(player.getChat(), message, true);
				break;
			case GUEST_CLANCHAT:
				Virtue.getInstance().getClans().getChannels()
						.sendQuickMessage(player.getChat(), message, false);
				break;
			case GROUPCHAT:
			case TEAM_GROUPCHAT:
			default:
				logger.warn("Unhandled chat message: message="
						+ context.getMessage() + ", type="
						+ player.getChat().getMode());
				break;
			}
		} else {
			switch (player.getChat().getMode()) {
			case PUBLIC:
				if (context.getMessage().startsWith("::")
						|| context.getMessage().startsWith(";;")) {
					handleCommand(player, context.getMessage());
					return;
				}
				player.getChat().sendPublicMessage(context.getMessage(),
						context.getColourEffect(), context.getMoveEffect());
				break;
			case FRIENDCHAT:
				player.getChat().sendFriendChatMessage(context.getMessage());
				break;
			case CLANCHAT:
				Virtue.getInstance()
						.getClans()
						.getChannels()
						.sendMessage(player.getChat(), context.getMessage(),
								true);
				break;
			case GUEST_CLANCHAT:
				Virtue.getInstance()
						.getClans()
						.getChannels()
						.sendMessage(player.getChat(), context.getMessage(),
								false);
				break;
			case GROUPCHAT:
			case TEAM_GROUPCHAT:
			default:
				logger.warn("Unhandled chat message: message="
						+ context.getMessage() + ", type="
						+ player.getChat().getMode());
				break;

			}
		}
	}
	
	private void handleCommand (Player player, String message) {
		String command = "";
		if (message.startsWith("::")) {
			command = message.replaceFirst("::", "");
		}
		if (message.startsWith(";;")) {
			command = message.replaceFirst(";;", "");
		}
		
		CommandManager.processCommand(player, command, false, false);
	}

}
