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
package org.virtue.engine.script.api.impl;

import org.virtue.config.paramtype.ParamType;
import org.virtue.config.paramtype.ParamTypeList;
import org.virtue.config.questtype.QuestType;
import org.virtue.config.questtype.QuestTypeList;
import org.virtue.engine.script.api.QuestAPI;
import org.virtue.game.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 17/03/2016
 */
public class VirtueQuestAPI implements QuestAPI {
	
	private QuestTypeList questTypeList;

	public VirtueQuestAPI() {
		questTypeList = QuestTypeList.getInstance();
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.QuestAPI#getName(int)
	 */
	@Override
	public String getName(int questId) {
		QuestType quest = questTypeList.list(questId);
		if (quest == null) {
			throw new IllegalArgumentException("Quest not found: "+questId);
		}
		return quest.name;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.QuestAPI#isStarted(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public boolean isStarted(Player player, int questId) {
		QuestType quest = questTypeList.list(questId);
		if (quest == null) {
			throw new IllegalArgumentException("Quest not found: "+questId);
		}
		return quest.isStarted(player.getVars());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.QuestAPI#startQuest(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public void startQuest(Player player, int questId) {
		QuestType quest = questTypeList.list(questId);
		if (quest == null) {
			throw new IllegalArgumentException("Quest not found: "+questId);
		}
		if (quest.isStarted(player.getVars())) {
			throw new IllegalStateException("Quest already started!");
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.QuestAPI#isFinished(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public boolean isFinished(Player player, int questId) {
		QuestType quest = questTypeList.list(questId);
		if (quest == null) {
			throw new IllegalArgumentException("Quest not found: "+questId);
		}
		return quest.isFinished(player.getVars());
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.QuestAPI#meetsAllRequirements(org.virtue.game.entity.player.Player, int)
	 */
	@Override
	public boolean meetsAllRequirements(Player player, int questId) {
		QuestType quest = questTypeList.list(questId);
		if (quest == null) {
			throw new IllegalArgumentException("Quest not found: "+questId);
		}
		return quest.meetsAllRequirements(player.getVars(), null);
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.QuestAPI#getParam(int, int)
	 */
	@Override
	public Object getParam(int questId, int paramTypeId) throws IllegalArgumentException {
		QuestType quest = questTypeList.list(questId);
		if (quest == null) {
			throw new IllegalArgumentException("Quest not found: "+questId);
		}
		ParamType paramType = ParamTypeList.list(paramTypeId);
		if (paramType == null) {
			throw new IllegalArgumentException("Invalid param type: "+paramTypeId);
		}
		if (paramType.stringBase()) {
			return quest.getParam(paramTypeId, paramType.defaultstr);
		} else {
			return quest.getParam(paramTypeId, paramType.defaultint);
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.QuestAPI#getPoints(int)
	 */
	@Override
	public int getPoints(int questId) {
		QuestType quest = questTypeList.list(questId);
		if (quest == null) {
			throw new IllegalArgumentException("Quest not found: "+questId);
		}
		return quest.questPoints;
	}

	/* (non-Javadoc)
	 * @see org.virtue.engine.script.api.QuestAPI#getTotalPoints(org.virtue.game.entity.player.Player)
	 */
	@Override
	public int getTotalPoints(Player player) {
		return questTypeList.getTotalQuestPoints(player.getVars());
	}

}
