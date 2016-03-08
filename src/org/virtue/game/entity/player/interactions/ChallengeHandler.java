package org.virtue.game.entity.player.interactions;

import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.entity.player.Player;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.network.event.context.impl.out.MessageEventContext;


/**
 * 
 * @author Kayla
 * @Date 5/7/2015
 */
public class ChallengeHandler implements PlayerOptionHandler {

	@Override
	public int getRange() {
		return 1;
	}

	public boolean interact(Player player, Player target) {
		if (player.getInteractions().isPossiblePlayer(OptionButton.ONE, target)) {
			player.getInteractions().setCurrentTarget(target);
			target.getInteractions().setCurrentTarget(player);
			player.getWidgets().openCentralWidget(1367, false);
			target.getWidgets().openCentralWidget(1367, false);
			player.getInteractions().removePossiblePlayer(OptionButton.ONE, target);
		} else {
			target.getDispatcher().sendMessage(new MessageEventContext(ChannelType.TRADE, "wishes to duel with you.", player.getName(), null));
			target.getInteractions().addPossiblePlayer(OptionButton.ONE, player);
			player.getDispatcher().sendGameMessage("Sending " + target.getName() + " a request...");
		}
		return true;
	}

}
