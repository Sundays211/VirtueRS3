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
package org.virtue.model.entity.movement;

import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 20/01/2015
 */
public class WidgetOnEntityTarget implements EntityTarget {
	
	private Player player;
	private Entity target;
	private int widgetID, component, slot, itemID;
	
	public WidgetOnEntityTarget (Player player, Entity target, int widgetID, int component, int slot, int itemID) {
		this.player = player;
		this.target = target;
		this.widgetID = widgetID;
		this.component = component;
		this.slot = slot;
		this.itemID = itemID;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.movement.EntityTarget#getEntity()
	 */
	@Override
	public Entity getEntity() {
		return target;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.movement.EntityTarget#getRange()
	 */
	@Override
	public int getRange() {
		if (target instanceof Player) {
			return player.getInteractions().interfaceOnPlayerRange(widgetID, component, slot, itemID);
		}
		return 1;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.movement.EntityTarget#onReachTarget()
	 */
	@Override
	public boolean onReachTarget() {
		if (target instanceof Player) {
			if (!player.getInteractions().handleInterfaceOnPlayer((Player) target, widgetID, component, slot, itemID)) {
				String message = "Interface: id="+widgetID+", comp="+component+", slot="+slot+", item="+itemID
						+" Player: name="+target.getName()+", index="+target.getIndex();
				System.out.println("Unhanded interface-on-player: "+message);
				System.out.println(message);
			}
		} else if (target instanceof NPC) {
			//TODO: Npc handling
		}
		return true;
	}

}
