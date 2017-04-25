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
package org.virtue.engine.script.listeners;

import org.virtue.game.entity.Entity;
import org.virtue.game.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 18/02/2015
 */
public interface VarListener {
	
	/**
	 * Gets the varp ids which are bound to this listener
	 * @return an array of integers containing the ids to bind to
	 */
	public int[] getIDs ();
	
	/**
	 * Runs every time a player logs into the game
	 * @param player The player
	 * @param tickDifference The number of game ticks since the player last logged in
	 * @return True if the listener should be added to the regular process queue, false otherwise
	 */
	public boolean onLogin (Entity player, int tickDifference);
	
	/**
	 * Gets the interval (in 600ms game ticks) between regular runs of the {@link #process(Player, int) process()} method
	 * @return The interval size in ticks
	 */
	public int getProcessDelay ();
	
	/**
	 * Runs regularly with the delay specified in getProcessDelay, following login.
	 * This will continue to run until the player logs out or this method returns true.
	 * @param player The player
	 * @param tick The number of ticks elapsed since the player logged in
	 * @return False if the process is finished, true if it should continue.
	 */
	public boolean process (Entity player, int tick);
	
	/**
	 * 
	 * @param player The player
	 * @param varID The ID of the varp which has changed
	 * @param oldValue The value before change
	 * @param newValue The value after change
	 * @return True if the varp should be re-added to the regular process queue, false otherwise
	 */
	public boolean onValueChange (Entity player, int varID, Object oldValue, Object newValue);

}
