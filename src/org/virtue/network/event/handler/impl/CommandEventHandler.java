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
import org.virtue.Commands;
import org.virtue.Virtue;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.PrivilegeLevel;
import org.virtue.network.event.context.impl.in.CommandEventContext;
import org.virtue.network.event.context.impl.out.MessageEventContext.ChannelType;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.script.listeners.CommandListener;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 11, 2014
 */
public class CommandEventHandler implements GameEventHandler<CommandEventContext> {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(CommandEventHandler.class);

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.model.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, CommandEventContext context) {
		if (context.getSyntax().equalsIgnoreCase("scripts")
				|| context.getSyntax().equalsIgnoreCase("reload")) {
			if (!PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
				player.getDispatcher().sendMessage("Unknown developer command: "+context.getSyntax(), ChannelType.CONSOLE);//Let's not let people know what the syntax is...
				return;
			}
			reloadScripts(player, context);
		} else if (context.getSyntax().equalsIgnoreCase("update")
				|| context.getSyntax().equalsIgnoreCase("reboot")) {
			if (!PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
				player.getDispatcher().sendMessage("Unknown developer command: "+context.getSyntax(), ChannelType.CONSOLE);//Let's not let people know what the syntax is...
				return;
			}
			int delay = 100;
			if (context.getArgs().length >= 1) {
				try {
					delay = Math.abs(Integer.parseInt(context.getArgs()[0]));
				} catch (NumberFormatException ex) {
					player.getDispatcher().sendMessage("Invalid delay entered: must be a positive integer.", ChannelType.CONSOLE);
					return;
				}
			}
			Commands.processRebootCommand(player, delay);
		} else if (!Commands.processCommand(player, context.getSyntax(), context.getArgs(), true, context.isClientCommand())) {
			CommandListener listener = Virtue.getInstance().getScripts().forSyntax(context.getSyntax());
			//System.out.println(context.getSyntax());
			if (listener == null) {
				player.getDispatcher().sendMessage("Unknown developer command: "+context.getSyntax(), ChannelType.CONSOLE);
				return;
			}
			if (listener.adminCommand() && !PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
				player.getDispatcher().sendMessage("This command is restricted to admins only.", ChannelType.CONSOLE);
				return;
			}
			try {
				listener.handle(player, context.getSyntax(), context.getArgs(), context.isClientCommand());
			} catch (Exception ex) {
				player.getDispatcher().sendMessage("There was an error executing the command. Check the server log for more information.", ChannelType.CONSOLE);
				if (PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
					player.getDispatcher().sendMessage("Error: "+ex, ChannelType.CONSOLE);
				}
				logger.error("Failed to process command: "+context.getSyntax(), ex);
			}
			//Virtue.getInstance().getCommandRepository().handle(context.getSyntax(), context.getArgs(), context.isClientCommand(), player);
		}
	}
	
	private void reloadScripts (Player player, CommandEventContext context) {
		if ("reload".equalsIgnoreCase(context.getSyntax())) {
			boolean success = Virtue.getInstance().getScripts().reload();
			if (success) {
				player.getDispatcher().sendMessage("Reloaded script "+context.getArgs()[0]+" successfully.", ChannelType.CONSOLE);
			} else {
				player.getDispatcher().sendMessage("Failed to reload script "+context.getArgs()[0]+". Check the server log for more information.", ChannelType.CONSOLE);
			}
		} else {
			boolean success = Virtue.getInstance().getScripts().reload();
			if (success) {
				player.getDispatcher().sendMessage("Reloaded scripts successfully.", ChannelType.CONSOLE);
			} else {
				player.getDispatcher().sendMessage("Failed to reload scripts. Check the server log for more information.", ChannelType.CONSOLE);
			}
		}
	}

}
