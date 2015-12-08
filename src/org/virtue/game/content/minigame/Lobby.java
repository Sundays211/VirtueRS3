/**
 * Copyright (c) 2015 Kyle Friz
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
package org.virtue.game.content.minigame;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

import org.virtue.game.entity.player.Player;

/**
 * An encapsulation class used for holding players
 * until the minigame is ready to start
 * 
 * @author Kyle Friz
 * @since  Nov 29, 2015
 */
public class Lobby {

	/**
	 * The type of minigame this lobby is for
	 */
	private final MinigameType type;
	
	/**
	 * A flag to represent if the minigame is waiting to start
	 */
	private final AtomicBoolean waiting;
	
	/**
	 * The players participating in this minigame
	 */
	private final List<Player> players;
	
	/**
	 * The mapping of players into teams
	 */
	private final Map<Integer, Team> teams;
	
	/**
	 * Creates a new Lobby
	 * @param type The minigame type
	 */
	public Lobby(MinigameType type) {
		this.type = type;
		
		this.waiting = new AtomicBoolean(true);
		this.players = new ArrayList<Player>(type.getMax());
		this.teams = new HashMap<Integer, Team>(2);
	}

	/**
	 * @return the type
	 */
	public final MinigameType getMinigameType() {
		return type;
	}
	
	/**
	 * @return the minimumSize
	 */
	public final int getMinimumSize() {
		return type.getMin();
	}

	/**
	 * @return the maximumSize
	 */
	public final int getMaximumSize() {
		return type.getMax();
	}

	/**
	 * @return the waiting
	 */
	public final boolean isWaiting() {
		return waiting.get();
	}

	/**
	 * Flags the waiting boolean
	 */
	public final void flag() {
		waiting.set(false);
	}
	
	/**
	 * Returns whether a player can be added
	 */
	public final boolean canAdd() {
		return players.size() < type.getMax();
	}
	
	/**
	 * @return the players
	 */
	public final List<Player> getPlayers() {
		return players;
	}

	/**
	 * @return the teams
	 */
	public final Map<Integer, Team> getTeams() {
		return teams;
	}
	
}
