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
import java.util.Queue;
import java.util.concurrent.atomic.AtomicBoolean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.engine.cycle.GameTick;
import org.virtue.game.World;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.DynamicRegion;
import org.virtue.game.world.region.Tile;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

/**
 * Main handler for processing minigames.
 * 
 * This class can create new lobbies if needed
 * of add players to an already queued lobby.
 * 
 * This class also removes any lobbies/minigames
 * that are no longer needed to be processed.
 * 
 * Finally, this class handles the processing
 * of minigames through the use the controller interface.
 * 
 * @author Kyle Friz
 * @since Dec 1, 2015
 */
public class MinigameProcessor {
	
	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(MinigameProcessor.class);

	/**
	 * This tick for this processor
	 */
	private final GameTick tick;

	/**
	 * The current lobbies
	 */
	private final Map<MinigameType, Queue<Lobby>> lobbies;

	/**
	 * Map of controllers
	 */
	private final Map<MinigameType, Controller> controllers;

	/**
	 * Map of minigames in progress
	 */
	private final Map<MinigameType, List<Minigame>> minigames;

	public MinigameProcessor() {
		this.lobbies = new HashMap<>();
		this.controllers = new HashMap<>();
		this.minigames = new HashMap<>();
		this.tick = new GameTick(0) {

			@Override
			public void execute() {
				process();
			}

		};
	}
	
	/**
	 * Starts the minigame processor
	 */
	public void start() {
		Virtue.getInstance().getEngine().invoke(tick);
		logger.info("Loaded Minigame Controllers.");
	}
	
	/**
	 * Stops the minigame processor after the current cycle
	 */
	public void stop() {
		tick.destroyLater();
	}

	/**
	 * Queues a player in the specified minigame
	 * @param type
	 * @param player
	 */
	public void queue(final MinigameType type, final Player player) {
		Queue<Lobby> queue = lobbies.get(type);

		final AtomicBoolean added = new AtomicBoolean(false);

		queue.stream().forEach((Lobby lobby) -> {
			if (lobby.isWaiting() && lobby.canAdd()) {
				lobby.getPlayers().add(player);
				added.set(true);
				
				if (type.hasTeams()) {
					//TODO create a more sophisticated selecting algorithm,
					// possibly based of the team's skill levels, for balancing pvp minigames?
					
					int size1 = lobby.getTeams().get(0).getPlayers().size();
					int size2 = lobby.getTeams().get(1).getPlayers().size();
					
					int c = Integer.compare(size1, size2);
					
					if ((c < 0) || (c == 0)) {// size 1 < 2 || size 1 == 2
						lobby.getTeams().get(0).getPlayers().add(player);
					} else if (c > 0) {// size 1 > 2
						lobby.getTeams().get(1).getPlayers().add(player);
					}
				}
			}
		});

		if (!added.get()) {
			Lobby lobby = new Lobby(type);
			lobby.getPlayers().add(player);
			
			if (type.hasTeams()) {
				Team team = new Team(0);
				team.getPlayers().add(player);
				lobby.getTeams().put(0, team);
				lobby.getTeams().put(1, new Team(1));
			}
			
			queue.add(lobby);
		}

	}

	/**
	 * The main method of the processor
	 */
	public void process() {
		List<Object> toRemove = new ArrayList<>();
		for (MinigameType type : lobbies.keySet()) {
			for (Lobby lobby : lobbies.get(type)) {
				if (!lobby.isWaiting()) {
					toRemove.add(lobby);

					initialize(lobby);
				}
				lobbies.get(type).removeAll(toRemove);
				toRemove = new ArrayList<>();
			}
		}

		for (MinigameType type : controllers.keySet()) {
			Controller controller = controllers.get(type);
			for (Minigame minigame : minigames.get(type)) {
				if (!minigame.inProgress()) {
					toRemove.add(minigame);
					controller.finish(minigame);
					// De-initialize the minigame now
				}
			}
			minigames.get(type).removeAll(toRemove);
			toRemove = new ArrayList<>();
		}
		
		for (MinigameType type : controllers.keySet()) {
			Controller controller = controllers.get(type);
			for (Minigame minigame : minigames.get(type)) {
				controller.process(minigame);
			}
		}
	}

	/**
	 * Initializes a minigame based off the lobby
	 * @param lobby
	 */
	private final void initialize(Lobby lobby) {
		MinigameType type = lobby.getMinigameType();

		DynamicRegion region = World.getInstance().getRegions().createDynamicRegion();
		for (int xOffSet = 0; xOffSet < type.getXOffset(); xOffSet++) {
			for (int yOffSet = 0; yOffSet < type.getYOffset(); yOffSet++) {
				for (int plane = 0; plane < type.getZOffset(); plane++) {
					region.updateChunk(xOffSet, yOffSet, plane,
							new Tile(type.getXCoord() + (xOffSet << 3), 
									type.getYCoord() + (yOffSet << 3), 
									plane), 0);
				}
			}
		}
		region.build();

		List<Player> players = Lists.newArrayList(lobby.getPlayers());
		Map<Integer, Team> teams = Maps.newHashMap(lobby.getTeams());

		Minigame minigame = new Minigame(System.currentTimeMillis(), type.getLimit(), region, players,
				new ArrayList<NPC>(), teams);

		controllers.get(type).initialize(minigame);
		minigames.get(type).add(minigame);
	}
}
