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

import org.virtue.Virtue;
import org.virtue.model.entity.player.Player;
import org.virtue.network.event.context.impl.in.ButtonClickEventContext;
import org.virtue.network.event.handler.GameEventHandler;
import org.virtue.script.listeners.WidgetListener;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 5, 2014
 */
public class ButtonClickEventHandler implements GameEventHandler<ButtonClickEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.model.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, ButtonClickEventContext context) {
		WidgetListener listener = Virtue.getInstance().getScripts().forWidgetID(context.getInterfaceId());
		if (listener == null || !listener.handleInteraction(player, context.getInterfaceId(), 
				context.getComponentId(), context.getSlot(), context.getItemID(), context.getButton().getID())) {
			boolean success = Virtue.getInstance().getWidgetRepository().handle(context.getInterfaceId(), context.getComponentId(), context.getSlot(), context.getItemID(), context.getButton(), player);
			if (!success) {
				//System.out.println("Unhandled Widget: " + context.getInterfaceId() + ", Component: " + context.getComponentId() + ", Slot1: " + context.getSlot1() + ", Slot2: " + context.getSlot2() + ", Button: "+context.getButton());
				player.getDispatcher().sendConsoleMessage("Unhandled Widget: " + context.getInterfaceId() + ", Component: " + context.getComponentId() + ", Slot: " + context.getSlot() + ", Item: " + context.getItemID() + ", Button: "+context.getButton());
			}			
		}
				
	}

}
