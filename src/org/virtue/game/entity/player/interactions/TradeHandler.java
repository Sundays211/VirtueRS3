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
package org.virtue.game.entity.player.interactions;

import org.virtue.game.content.social.ChannelType;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.event.context.impl.out.MessageEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since Jan 21, 2015
 */
public class TradeHandler implements PlayerOptionHandler {

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.PlayerOptionHandler#getRange()
	 */
	@Override
	public int getRange() {
		return 1;
	}

	/* (non-Javadoc)
	 * @see org.virtue.game.entity.player.interactions.PlayerOptionHandler#interact(org.virtue.game.entity.player.Player, org.virtue.game.entity.player.Player)
	 */
	@Override
	public boolean interact(Player player, Player target) {
		if (player.getPrivilegeLevel().getId() == 6 || player.getPrivilegeLevel().getId() == 7
				|| player.getPrivilegeLevel().getId() == 8) {
			player.getDispatcher().sendGameMessage("You cannot trade while being a Iron Man.");
			return false;
		}
		if (player.getInteractions().isPossiblePlayer(OptionButton.FOUR, target)) {
			player.getInteractions().setCurrentTarget(target);
			target.getInteractions().setCurrentTarget(player);
			player.getWidgets().openCentralWidget(335, false);
			target.getWidgets().openCentralWidget(335, false);
			player.getInteractions().removePossiblePlayer(OptionButton.FOUR, target);
		} else {
			target.getDispatcher().sendMessage(new MessageEventContext(ChannelType.TRADE, "wishes to trade with you.", player.getName(), null));
			target.getInteractions().addPossiblePlayer(OptionButton.FOUR, player);
			player.getDispatcher().sendGameMessage("Sending trade request...");
		}
		return true;
	}
}
