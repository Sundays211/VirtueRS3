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
		ScriptManager scripts = Virtue.getInstance().getScripts();
		if (scripts.hasBinding(ScriptEventType.IF_DRAG, context.getSrcHash())) {
			Map<String, Object> args = new HashMap<>();
			args.put("player", player);
			args.put("frominterface", context.getSrcInterface());
			args.put("fromcomponent", context.getSrcComponent());
			args.put("fromslot", context.getSrcSlot());
			args.put("fromitem", context.getSrcItem());
			args.put("tointerface", context.getDestInterface());
			args.put("tocomponent", context.getDestComponent());
			args.put("toslot", context.getDestSlot());
			args.put("toitem", context.getDestItem());
			scripts.invokeScriptChecked(ScriptEventType.IF_DRAG, context.getSrcHash(), args);
			return;
		}
		
		if (Virtue.getInstance().getWidgetRepository().handleDrag(
				context.getSrcInterface(), context.getSrcComponent(), context.getSrcSlot(), context.getSrcItem(), 
				context.getDestInterface(), context.getDestComponent(), context.getDestSlot(), context.getDestItem(), player)) {
			return;
		}
		
		String message = "Source: id="+context.getSrcInterface()+", comp="+context.getSrcComponent()
				+", slot="+context.getSrcSlot()+", itemID="+context.getSrcItem()
				+" Destination: id="+context.getDestInterface()+", comp="+context.getDestComponent()
				+", slot="+context.getDestSlot()+", itemID="+context.getDestItem();
		if (player.getPrivilegeLevel().getRights() >= 2) {
			player.getDispatcher().sendGameMessage("Unhanded interface drag: "+message);
		}
	}
}
