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

import java.util.HashMap;
import java.util.Map;

import org.virtue.Virtue;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.in.ButtonClickEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 5, 2014
 */
public class ButtonClickEventHandler implements GameEventHandler<ButtonClickEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, ButtonClickEventContext context) {
		boolean success = Virtue.getInstance().getWidgetRepository().handle(context.getInterfaceId(), context.getComponentId(), context.getSlot(), context.getItemID(), context.getButton(), player);
		if (!success) {
			handleInteraction(player, context);
		}			
	}
	
	private void handleInteraction (Player player, ButtonClickEventContext context) {
		ScriptManager scripts = Virtue.getInstance().getScripts();
		ScriptEventType type;
		switch (context.getButton()) {
		case ONE:
			type = ScriptEventType.IF_BUTTON1;
			break;
		case TWO:
			type = ScriptEventType.IF_BUTTON2;
			break;
		case THREE:
			type = ScriptEventType.IF_BUTTON3;
			break;
		case FOUR:
			type = ScriptEventType.IF_BUTTON4;
			break;
		case FIVE:
			type = ScriptEventType.IF_BUTTON5;
			break;
		case SIX:
			type = ScriptEventType.IF_BUTTON6;
			break;
		case SEVEN:
			type = ScriptEventType.IF_BUTTON7;
			break;
		case EIGHT:
			type = ScriptEventType.IF_BUTTON8;
			break;
		case NINE:
			type = ScriptEventType.IF_BUTTON9;
			break;
		case TEN:
			type = ScriptEventType.IF_BUTTON10;
			break;
		default:
			return;
		}
		if (scripts.hasBinding(type, context.getHash())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("interface", context.getInterfaceId());
			args.put("component", context.getComponentId());
			args.put("slot", context.getSlot());
			args.put("itemId", context.getItemID());
			scripts.invokeScriptChecked(type, context.getHash(), args);
		} else if (scripts.hasBinding(ScriptEventType.IF_BUTTON, context.getInterfaceId())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("interface", context.getInterfaceId());
			args.put("component", context.getComponentId());
			args.put("slot", context.getSlot());
			args.put("button", context.getButton().getId());
			args.put("itemId", context.getItemID());
			scripts.invokeScriptChecked(ScriptEventType.IF_BUTTON, context.getInterfaceId(), args);
		} else {
			String message = "Nothing interesting happens.";
			if (player.getPrivilegeLevel().getRights() >= 2) {
				message = "Unhandled Widget: " + context.getInterfaceId() + ", Component: " + context.getComponentId() + ", Slot: " + context.getSlot() + ", Item: " + context.getItemID() + ", Button: "+context.getButton();
				player.getDispatcher().sendGameMessage(message);
			}
		}
	}

}
