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
package org.virtue.game.map.movement;

import java.util.HashMap;
import java.util.Map;

import org.virtue.Virtue;
import org.virtue.engine.script.ScriptEventType;
import org.virtue.engine.script.ScriptManager;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;

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
	private int compHash;
	
	public WidgetOnEntityTarget (Player player, Entity target, int compHash, int slot, int itemID) {
		this.player = player;
		this.target = target;
		this.compHash = compHash;
		this.widgetID = compHash >> 16;
		this.component = compHash & 0xffff;
		this.slot = slot;
		this.itemID = itemID;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.region.movement.EntityTarget#getEntity()
	 */
	@Override
	public Entity getEntity() {
		return target;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.region.movement.EntityTarget#getRange()
	 */
	@Override
	public int getRange() {
		if (target instanceof Player) {
			return player.getInteractions().interfaceOnPlayerRange(widgetID, component, slot, itemID);
		}
		return 1;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.region.movement.EntityTarget#onReachTarget()
	 */
	@Override
	public boolean onReachTarget() {
		ScriptEventType eventType;
		if (target instanceof Player) {
			eventType = ScriptEventType.OPPLAYERT;
		} else if (target instanceof NPC) {
			eventType = ScriptEventType.OPNPCT;
		} else {
			throw new IllegalStateException("Invalid entity type: "+target.getClass());
		}
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(eventType, compHash)) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put(((target instanceof Player) ? "target" : "npc"), target);
			args.put("component", component);
			args.put("interface", widgetID);
			args.put("slot", slot);
			args.put("itemId", itemID);
			scripts.invokeScriptChecked(eventType, compHash, args);
			return true;
		}
		boolean handled = Virtue.getInstance().getWidgetRepository().handleUse(widgetID, component, slot, itemID, target, player);
		if (!handled && target instanceof Player) {
			handled = player.getInteractions().handleInterfaceOnPlayer((Player) target, widgetID, component, slot, itemID);
		}
		if (!handled) {
			String message = "Nothing interesting happens.";
			if (player.getPrivilegeLevel().getRights() >= 2) {
				message = "Unhanded entity target: Interface: id="+widgetID+", comp="+component
						+", slot="+slot+", item="+itemID
						+", entity="+target;
			}
			player.getDispatcher().sendGameMessage(message);
		}
		return true;
	}

}
