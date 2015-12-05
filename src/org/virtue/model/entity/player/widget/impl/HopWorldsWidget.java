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
package org.virtue.model.entity.player.widget.impl;

import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.widget.Widget;
import org.virtue.model.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Feb 13, 2015
 */
public class HopWorldsWidget extends Widget {

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.widget.Widget#click(int, int, int, int, org.virtue.model.entity.player.Player, org.virtue.network.event.context.impl.in.OptionButton)
	 */
	@Override
	public boolean click(int widgetId, int componentId, int slotId, int itemId, Player player, OptionButton option) {
		switch (componentId) {
		case 26:
			player.getDispatcher().sendHideWidget(1587, 29, false);
			player.getDispatcher().sendWidgetText(1587, 98, "Are you sure you want to switch to world " + slotId + "?");
			return true;
		case 47:
			player.getVars().setVarValueInt(4735, 104005679);
			player.getVars().setVarValueInt(4734, 7230);
			player.getVars().setVarValueInt(4736, 0);
			player.getDispatcher().sendWidgetSettings(1477, 801, 0, 3, 2);
			return true;
		case 84:
			player.getVars().setVarValueInt(20, -1761607680);
			player.getWidgets().closeWidget(1477, 426);
			player.getWidgets().openWidget(1477, 333, 1215, true);
			player.getDispatcher().sendHideWidget(1477, 333, false);
			player.getDispatcher().sendHideWidget(745, 2, true);
			return true;
		case 93:
			player.getDispatcher().sendVarc(199, -1);
			player.getDispatcher().sendVarc(3678, -1);
			player.getDispatcher().sendCS2Script(8178, new Object[] { });
			player.getWidgets().openWidget(1477, 426, 1587, false);
			player.getDispatcher().sendWidgetSettings(1587, 26, 0, 200, 6);
			player.getDispatcher().sendWidgetSettings(1587, 47, 0, 1, 2);
			player.getDispatcher().sendHideWidget(1587, 29, true);
			return true;
		}
		return false;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.entity.player.widget.Widget#getStates()
	 */
	@Override
	public int[] getStates() {
		return new int[] { WidgetState.HOP_WORLDS_WIDGET.getID() };
	}
}
