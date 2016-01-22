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
import org.virtue.network.event.context.impl.in.WidgetDragEventContext;
import org.virtue.network.event.handler.GameEventHandler;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 16/11/2014
 */
public class WidgetDragEventHandler implements GameEventHandler<WidgetDragEventContext> {

	/* (non-Javadoc)
	 * @see org.virtue.network.event.handler.GameEventHandler#handle(org.virtue.game.entity.player.Player, org.virtue.network.event.context.GameEventContext)
	 */
	@Override
	public void handle(Player player, WidgetDragEventContext context) {
		if (Virtue.getInstance().getWidgetRepository().handleDrag(
				context.getIf1Interface(), context.getIf1Component(), context.getIf1Slot(), context.getIf1Item(), 
				context.getIf2Interface(), context.getIf2Component(), context.getIf2Slot(), context.getIf2Item(), player)) {
			return;
		}
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(ScriptEventType.IF_DRAG, context.getIf1Hash())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("frominterface", context.getIf1Interface());
			args.put("fromcomponent", context.getIf1Component());
			args.put("fromslot", context.getIf1Slot());
			args.put("tointerface", context.getIf2Interface());
			args.put("tocomponent", context.getIf2Component());
			args.put("toslot", context.getIf2Slot());
			scripts.invokeScriptChecked(ScriptEventType.IF_DRAG, context.getIf1Hash(), args);
			return;
		}
		String message = "Interface1: id="+context.getIf1Interface()+", comp="+context.getIf1Component()
				+", slot="+context.getIf1Slot()+", itemID="+context.getIf1Item()
				+" Interface2: id="+context.getIf2Interface()+", comp="+context.getIf2Component()
				+", slot="+context.getIf2Slot()+", itemID="+context.getIf2Item();
		if (player.getPrivilegeLevel().getRights() >= 2) {
			player.getDispatcher().sendGameMessage("Unhanded interface drag: "+message);
		}
	}
}
