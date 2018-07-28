/**
 * Copyright (c) 2016 Virtue Studios
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
import org.virtue.network.event.context.impl.in.WidgetTargetEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 6/11/2014
 */
public class WidgetTargetEventHandler implements GameEventHandler<WidgetTargetEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, WidgetTargetEventContext context) {
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(ScriptEventType.IF_BUTTONT, context.getHash())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("interface", context.getInterface());
			args.put("component", context.getComponent());
			args.put("slot", context.getSlot());
			args.put("itemId", context.getItem());
			args.put("objId", context.getItem());
			args.put("targetInterface", context.getTargetInterface());
			args.put("targetComponent", context.getTargetComponent());
			args.put("targetSlot", context.getTargetSlot());
			args.put("targetObjId", context.getTargetItem());
			scripts.invokeScriptChecked(ScriptEventType.IF_BUTTONT, context.getHash(), args);
			return;
		}

		if (Virtue.getInstance().getWidgetRepository().handleTarget(
				context.getInterface(), context.getComponent(), context.getSlot(), context.getItem(),
				context.getTargetInterface(), context.getTargetComponent(), context.getTargetSlot(), context.getTargetItem(), player)) {
			return;
		}

		String message = "Nothing interesting happens.";
		if (player.getPrivilegeLevel().getRights() >= 2) {
			message = "Unhanded interface-target: Interface: id="+context.getInterface()+", comp="+context.getComponent()
					+", slot="+context.getSlot()+", itemID="+context.getItem()
					+" Target: id="+context.getTargetInterface()+", comp="+context.getTargetComponent()
					+", slot="+context.getTargetSlot()+", itemID="+context.getTargetItem();
		}
		player.getDispatcher().sendGameMessage(message);
	}
}
