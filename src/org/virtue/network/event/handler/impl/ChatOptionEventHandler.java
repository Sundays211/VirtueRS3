/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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

import java.util.HashMap;
import java.util.Map;

import org.virtue.Virtue;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.in.ChatOptionEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 28/01/2015
 */
public class ChatOptionEventHandler implements GameEventHandler<ChatOptionEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, ChatOptionEventContext context) {
		
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(ScriptEventType.CHATLIST_OPTION, context.getType().getId())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("interface", context.getInterfaceId());
			args.put("component", context.getComponentId());
			args.put("slot", context.getSlot());
			args.put("button", context.getButton().getId());
			args.put("name", context.getName());
			args.put("type", context.getType().getId());
			scripts.invokeScriptChecked(ScriptEventType.CHATLIST_OPTION, context.getType().getId(), args);
		} else {
			player.getDispatcher().sendGameMessage("Unhandled chat option: iface="+context.getInterfaceId()+", comp="+context.getComponentId()+", option="+context.getButton()+", slot="+context.getSlot()+", name="+context.getName()+", type="+context.getType());
		}
	}

}
