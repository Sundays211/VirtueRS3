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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.engine.cycle.GameTick;
import org.virtue.model.content.minigame.impl.ClanWarsFFAController;
import org.virtue.model.content.minigame.impl.DuelController;
import org.virtue.model.content.minigame.impl.FightCaveController;
import org.virtue.model.content.minigame.impl.InfectedController;
import org.virtue.model.content.minigame.impl.PestController;
import org.virtue.model.content.minigame.impl.PitsController;
import org.virtue.model.content.minigame.impl.ShootingStar;
import org.virtue.model.content.minigame.impl.WildyController;
import org.virtue.model.entity.player.Player;

/**
 * @author Kyle Friz
 * @date May 6, 2015
 */
public class MinigameController {

	/**
	 * The {@link Logger} Instance
	 */
	private static Logger logger = LoggerFactory.getLogger(MinigameController.class);
	
	
	private GameTick tick;
	private Map<Class<? extends Controller>, Controller> controllers;
	private Map<Class<? extends Controller>, List<Minigame>> minigames;
	
	public MinigameController() {
		this.controllers = new HashMap<>();
		this.minigames = new HashMap<>();
		this.controllers.put(PestController.class, new PestController());
		this.minigames.put(PestController.class, new ArrayList<Minigame>());
		this.controllers.put(DuelController.class, new DuelController());
		this.minigames.put(DuelController.class, new ArrayList<Minigame>());
		this.controllers.put(PitsController.class, new PitsController());
		this.minigames.put(PitsController.class, new ArrayList<Minigame>());
		this.controllers.put(FightCaveController.class, new FightCaveController());
		this.minigames.put(FightCaveController.class, new ArrayList<Minigame>());
		this.controllers.put(WildyController.class, new WildyController());
		this.minigames.put(WildyController.class, new ArrayList<Minigame>());
		this.controllers.put(InfectedController.class, new InfectedController());
		this.minigames.put(InfectedController.class, new ArrayList<Minigame>());
		this.controllers.put(ClanWarsFFAController.class, new ClanWarsFFAController());
		this.minigames.put(ClanWarsFFAController.class, new ArrayList<Minigame>());
		this.controllers.put(ShootingStar.class, new ShootingStar());
		this.minigames.put(ShootingStar.class, new ArrayList<Minigame>());
		/*this.controllers.put(CastleController.class, new CastleController());
		this.minigames.put(CastleController.class, new ArrayList<Minigame>());
		this.controllers.put(SoulController.class, new SoulController());
		this.minigames.put(SoulController.class, new ArrayList<Minigame>());
		this.controllers.put(StealingController.class, new StealingController());
		this.minigames.put(StealingController.class, new ArrayList<Minigame>());
		this.controllers.put(HeistController.class, new HeistController());
		this.minigames.put(HeistController.class, new ArrayList<Minigame>());*/
		this.tick = new GameTick(0) {

			@Override
			public void execute() {
				process();
			}
			
		};
	}
	
	public void start() {
		Virtue.getInstance().getEngine().invoke(tick);
		logger.info("Loaded Minigame Controller.");
	}
	
	public void stop() {
		Virtue.getInstance().getEngine().unInvoke(tick);
	}
	
	
	public Minigame joinExisting(Player player) {
		Minigame mini = player.getMinigame();
		mini.getPlayers().add(player);
		return mini;
		
	}

	public Minigame createPest(int min, int max) {
		Minigame mini = new Minigame(min, max);
		addMinigame(PestController.class, mini);
		return mini;
	}
	
	public Minigame startStar() {
		Minigame mini = new Minigame(0, 200);
		addMinigame(ShootingStar.class, mini);
		return mini;
	}
	
	public Minigame createDuel(int min, int max) {
		Minigame mini = new Minigame(min, max);
		addMinigame(DuelController.class, mini);
		return mini;
	}
	
	public Minigame createPits(int min, int max) {
		Minigame mini = new Minigame(min, max);
		addMinigame(PitsController.class, mini);
		return mini;
	}
	
	public Minigame createFightCaves(int min, int max) {
		Minigame mini = new Minigame(min, max);
		addMinigame(FightCaveController.class, mini);
		return mini;
	}
	
	public Minigame createWildy(int min, int max) {
		Minigame mini = new Minigame(min, max);
		addMinigame(WildyController.class, mini);
		return mini;
	}
	
	public Minigame createInfected(int min, int max) {
		Minigame mini = new Minigame(min, max);
		addMinigame(InfectedController.class, mini);
		return mini;
	}
	
	public Minigame createCWFFA(int min, int max) {
		Minigame mini = new Minigame(min, max);
		addMinigame(ClanWarsFFAController.class, mini);
		return mini;
	}
	
	public Controller getController(Minigame mini) {
		for (Class<? extends Controller> controller : minigames.keySet()) {
			for (Minigame game : minigames.get(controller)) {
				if (game.equals(mini))
					return controllers.get(controller);
			}
		}
		return null;
	}
	
	public void addMinigame(Class<? extends Controller> controller, Minigame mini) {
		minigames.get(controller).add(mini);
	}
	
	public void removeMinigame(Class<? extends Controller> controller, Minigame mini) {
		minigames.get(controller).remove(mini);
	}
	
	/**
	 * Called every tick. THis methods handles all Minigames through an ambiguous controller.
	 * Thus, multiple instances of the same minigame are support, all on different dynamic regions.
	 */
	public void process() {
		for (Class<? extends Controller> controller : controllers.keySet()) {
			for (Minigame minigame : minigames.get(controller)) {
				controllers.get(controller).process(minigame);
			}
		}
	}
	
}
