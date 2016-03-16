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
package org.virtue.engine.script.api;

import org.virtue.config.questtype.QuestType;
import org.virtue.game.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 16/03/2016
 */
public interface QuestAPI {

	public boolean isStarted (Player player, int questId);
	
	public boolean isFinished (Player player, int questId);
	
	public boolean meetsAllRequirements (Player player, int questId);
	
	/**
	 * Gets the paramater of the specified {@link QuestType}
	 * @param questId The ID of the quest to lookup
	 * @param paramType The param to get
	 * @return The quest param value or default value if the quest does not contain the given param
	 * @throws IllegalArgumentException If an invalid questId or paramType is specified
	 */
	public Object getParam(int questId, int paramType) throws IllegalArgumentException;
	
	/**
	 * Gets the number of quest points awarded on completion of the specified quest
	 * @param questId The quest ID
	 * @return The number of reward points
	 */
	public int getPoints (int questId);
	
	/**
	 * Gets the number of quest points held by the specified player
	 * @param player The player
	 * @return The number of quest points
	 */
	public int getTotalPoints (Player player);
}
