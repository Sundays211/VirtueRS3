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
package org.virtue.model.entity.player.interactions;

import org.virtue.Virtue;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.PrivilegeLevel;
import org.virtue.model.entity.player.inv.ContainerState;
import org.virtue.model.entity.player.inv.Item;
import org.virtue.model.entity.player.inv.ItemContainer;
import org.virtue.model.entity.player.widget.WidgetState;
import org.virtue.script.listeners.ItemOnEntityListener;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 26/01/2015
 */
public class ItemOnPlayerHandler implements WidgetOnPlayerHandler {

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.interactions.WidgetOnPlayerHandler#getInterfaceIDs()
	 */
	@Override
	public int[] getInterfaceIDs() {
		return new int[]{ WidgetState.BACKPACK_WIDGET.getID() };
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.interactions.WidgetOnPlayerHandler#handle(org.virtue.model.entity.player.Player, int, int, int, int, org.virtue.model.entity.player.Player)
	 */
	@Override
	public boolean handle(Player player, int interfaceID, int component, int slot, int itemID, Player target) {
		if (component != 34) {
			return false;
		}
		ItemContainer backpack = player.getInvs().getContainer(ContainerState.BACKPACK);
		Item item = backpack.get(slot);
		if (player.getPrivilegeLevel().getId() == 6 || player.getPrivilegeLevel().getId() == 7
				|| player.getPrivilegeLevel().getId() == 8) {
			return false;
		}
		if (item == null) {
			return false;
		}
		if (item.getId() != itemID) {
			player.getInvs().sendContainer(ContainerState.BACKPACK);
			return false;
		}
		ItemOnEntityListener listener = Virtue.getInstance().getScripts().forItemOnEntity(itemID);
		
		if (listener == null || !listener.handle(player, target, false, item, slot)) {
			if (PrivilegeLevel.ADMINISTRATOR.equals(player.getPrivilegeLevel())) {
				player.getDispatcher().sendGameMessage("Unhanded item-on-player: item="+item+", slot="+slot+", player="+target);
			} else {
				player.getDispatcher().sendGameMessage("Nothing interesting happens.");
			}
			
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.interactions.WidgetOnPlayerHandler#getRange(int, int, int, int)
	 */
	@Override
	public int getRange(Player player, int interfaceID, int component, int slot, int itemID) {
		ItemOnEntityListener listener = Virtue.getInstance().getScripts().forItemOnEntity(itemID);
		return listener == null ? 20 : listener.getRange(player, false, itemID);
	}

}
