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

import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.WidgetOnWidgetEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 6/11/2014
 */
public class WidgetOnWidgetEventHandler implements GameEventHandler<WidgetOnWidgetEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.model.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, WidgetOnWidgetEventContext context) {
		if (context.getIf1Interface() == WidgetState.BACKPACK_WIDGET.getID()
				&& context.getIf1Hash() == context.getIf2Hash()) {
			if (!inventoryItemOnItem(player, context)) {
				player.getDispatcher().sendConsoleMessage("Unhandled item-on-item: item1="+context.getIf1ItemID()
						+", slot1="+context.getIf1Slot()+", item2="+context.getIf2ItemID()+", slot2="+context.getIf2Slot());
				return;
			}
		} else {
			String message = "Interface1: id="+context.getIf1Interface()+", comp="+context.getIf1Component()
					+", slot1="+context.getIf1Slot()+", slot2="+context.getIf1ItemID()
					+" Interface2: id="+context.getIf2Interface()+", comp="+context.getIf2Component()
					+", slot1="+context.getIf2Slot()+", slot2="+context.getIf2ItemID();
			player.getDispatcher().sendConsoleMessage("Unhanded interface-on-interface: "+message);
			System.out.println(message);
		}
	}
	
	private boolean inventoryItemOnItem (Player player, WidgetOnWidgetEventContext context) {
		Item item1 = player.getInvs().getContainer(ContainerState.BACKPACK).get(context.getIf1Slot());
		Item item2 = player.getInvs().getContainer(ContainerState.BACKPACK).get(context.getIf2Slot());
		if (item1 == null || item1.getId() != context.getIf1ItemID() || item2 == null 
				|| item2.getId() != context.getIf2ItemID()) {
			return false;//Expected items do not match actual items
		}
		return item1.handleItemOnItem(player, context.getIf1Slot(), item2, context.getIf2Slot());
		//
	}

}
