package org.virtue.game.entity.player.widget.impl;

import org.virtue.game.entity.player.Player;
import org.virtue.game.entity.player.widget.Widget;
import org.virtue.game.entity.player.widget.WidgetState;
import org.virtue.network.event.context.impl.in.OptionButton;

public class QuestsListWidget extends Widget {

	@Override
	public boolean click(int widgetId, int componentId, int slotId, int itemId,
			Player player, OptionButton option) {
		switch (componentId) {
		case 3:// filter 1
			player.getQuestManager().toggleFilter1();
			break;
		case 5:// filter 2
			player.getQuestManager().toggleFilter2();
			break;
		case 9:// hide done
			player.getQuestManager().toggleHideDone();
			break;
		case 40:// catagories
			player.getQuestManager().setCatagories(slotId);
			break;
		case 17:
			switch (option.getID()) {
			case 1:
			case 2:
				player.getDispatcher().sendGameMessage(
						"Quest not added Overview/jurnal slot=" + slotId);
				break;
			default:
				player.getDispatcher().sendGameMessage(
						"Option " + option.getID());
				break;
			}
			break;
		default:
			break;
		}
		return true;
	}

	@Override
	public int[] getStates() {
		return new int[] { WidgetState.QUESTS_LIST_WIDGET.getID() };
	}

}
