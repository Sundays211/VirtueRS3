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

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.DynamicRegion;

/**
 * An encapsulation class for holding information
 * about the minigame in progress.
 * 
 * @author Kyle Friz
 * @since  Nov 29, 2015
 */
public class Minigame {
	
	/**
	 * The starting time in ms of this minigame
	 */
	private final long startTime;
	
	/**
	 * The time limit in ms of this minigame
	 */
	private final long timeLimit;
	
	/**
	 * A flag to represent if the minigame is in progress
	 */
	private final AtomicBoolean progress;
	
	/**
	 * The dynamic region this minigame is playing on
	 */
	private final DynamicRegion region;
	
	/**
	 * The players participating in this minigame
	 */
	private final List<Player> players;
	
	/**
	 * The npcs participating in this minigame
	 */
	private final List<NPC> npcs;
	
	/**
	 * The mapping of players into teams
	 */
	private final Map<Integer, Team> teams;
	
	/**
	 * Creates a new minigame
	 * @param start The start time (ms)
	 * @param limit The time limit (ms)
	 * @param region The dynamic region
	 * @param players The players
	 * @param npcs The npcs
	 * @param teams The teams
	 */
	public Minigame(long start, long limit, DynamicRegion region, List<Player> players, List<NPC> npcs, Map<Integer, Team> teams) {
		this.startTime = start;
		this.timeLimit = limit;
		this.region = region;
		this.players = players;
		this.npcs = npcs;
		this.teams = teams;
		
		this.progress = new AtomicBoolean(true);
	}

	/**
	 * @return the startTime
	 */
	public final long getStartTime() {
		return startTime;
	}

	/**
	 * @return the timeLimit
	 */
	public final long getTimeLimit() {
		return timeLimit;
	}

	/**
	 * @return the process
	 */
	public final boolean inProgress() {
		return progress.get();
	}

	/**
	 * Flags the progress boolean
	 */
	public final void flag() {
		progress.set(false);
	}
	
	/**
	 * @return the region
	 */
	public final DynamicRegion getRegion() {
		return region;
	}

	/**
	 * @return the players
	 */
	public final List<Player> getPlayers() {
		return players;
	}

	/**
	 * @return the npcs
	 */
	public final List<NPC> getNpcs() {
		return npcs;
	}

	/**
	 * @return the teams
	 */
	public final Map<Integer, Team> getTeams() {
		return teams;
	}
	
}
