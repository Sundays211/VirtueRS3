package org.virtue.model.entity.player.quest;

import org.virtue.model.entity.player.Player;

public class QuestManager {

	private Player player;
	private boolean filter1;
	private boolean filter2;
	private boolean hideDone;
	private int catagories;

	public QuestManager(Player player) {
		this.player = player;
	}

	public void refreshQuestsInterface() {
		player.getVars()
				.setVarValueInt(
						115,
						(catagories == 0 ? (filter1 ? (filter2 ? (hideDone ? 3072
								: 1024)
								: (hideDone ? 3584 : 1536))
								: (filter2 ? (hideDone ? 7168 : 5120)
										: (hideDone ? 7680 : 5632)))
								: catagories == 1 ? (filter1 ? (filter2 ? (hideDone ? 2080
										: 32)
										: (hideDone ? 2592 : 544))
										: (filter2 ? (hideDone ? 6176 : 4128)
												: (hideDone ? 6688 : 4640)))
										: (filter1 ? (filter2 ? (hideDone ? 2112
												: 64)
												: (hideDone ? 2624 : 576))
												: (filter2 ? (hideDone ? 6208
														: 4160)
														: (hideDone ? 6720
																: 4672)))));
		// player.getDispatcher().sendCS2Script(2165, new Object[] {});
	}

	public void toggleFilter1() {
		filter1 = !filter1;
		refreshQuestsInterface();
	}

	public void toggleFilter2() {
		filter2 = !filter2;
		refreshQuestsInterface();
	}

	public void toggleHideDone() {
		hideDone = !hideDone;
		refreshQuestsInterface();
	}

	public void setCatagories(int catagories) {
		this.catagories = catagories;
		refreshQuestsInterface();
	}
}
