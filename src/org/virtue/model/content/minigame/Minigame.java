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
package org.virtue.model.content.minigame;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.DynamicRegion;


/**
 * @author Kyle Friz
 * @date May 6, 2015
 */
public class Minigame {
	
	/**
	 * The Dynamic region for this minigame
	 */
	private DynamicRegion region;
	
	/**
	 * The Players in this minigame
	 */
	private List<Player> players;
	
	/*
	 * Map of teams associated with an id
	 */
	private Map<Integer, List<Player>> teams;
	
	/**
	 * The NPCs in this minigame
	 */
	private List<NPC> npcs;
	
	/**
	 * A flag if the players are waiting to start
	 */
	private boolean waiting;
	
	/**
	 * A flag if the minigame has started
	 */
	private boolean started;
	
	/**
	 * The starting time of this minigame in miliseconds
	 */
	private long startTime;
	
	/**
	 * The time limit of how long this minigame lasts in miliseconds
	 */
	private long timeLimit;
	
	/**
	 * The minimum party size
	 */
	private int minimumSize;
	
	/**
	 * The minimum party size
	 */
	private int maximumSize;
	
	public Minigame(int min, int max) {
		this.players = new ArrayList<>();
		this.teams = new HashMap<>();
		this.npcs = new ArrayList<>();
		this.minimumSize = min;
		this.maximumSize = max;
		this.started = false;
		this.waiting = true;
	}
	
	public List<Player> getPlayers() {
		return players;
	}
	
	/**
	 * @return the teams
	 */
	public Map<Integer, List<Player>> getTeams() {
		return teams;
	}

	public List<NPC> getNpcs() {
		return npcs;
	}
	
	public boolean isAbove() {
		return players.size() >= minimumSize;
	}

	public boolean isFull() {
		return players.size() >= maximumSize;
	}
	
	/**
	 * @return the started
	 */
	public boolean hasStarted() {
		return started;
	}

	/**
	 * @param started the started to set
	 */
	public void setStarted(boolean started) {
		this.started = started;
	}

	/**
	 * @return the waiting
	 */
	public boolean isWaiting() {
		return waiting;
	}

	/**
	 * @param waiting the waiting to set
	 */
	public void setWaiting(boolean waiting) {
		this.waiting = waiting;
	}

	/**
	 * @return the startTime
	 */
	public long getStart() {
		return startTime;
	}

	/**
	 * @param startTime the startTime to set
	 */
	public void setStart(long startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return the timeLimit
	 */
	public long getLimit() {
		return timeLimit;
	}

	/**
	 * @param timeLimit the timeLimit to set
	 */
	public void setLimit(long timeLimit) {
		this.timeLimit = timeLimit;
	}

	/**
	 * @return the region
	 */
	public DynamicRegion getRegion() {
		return region;
	}

	/**
	 * @param region the region to set
	 */
	public void setRegion(DynamicRegion region) {
		this.region = region;
	}

}
