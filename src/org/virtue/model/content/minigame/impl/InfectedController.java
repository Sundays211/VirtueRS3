package org.virtue.model.content.minigame.impl;

import java.util.concurrent.TimeUnit;

import org.virtue.engine.cycle.GameTick;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.interactions.PlayerAttackHandler;
import org.virtue.model.entity.player.interactions.PlayerInteractions.PlayerOption;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.model.entity.update.ref.Appearance.Render;
import org.virtue.network.event.context.impl.in.OptionButton;

/** 
 * @author Kayla
 * @Date 11/16/2015
 */
public class InfectedController implements Controller  {
	
	
	private static int TEAM_ZOMBIES = 1;
	
	public static int TEAM_PLAYERS = 2;
	
	private Player player;
	

	@Override
	public void start(Minigame mini) {
		mini.setStart(System.currentTimeMillis());
		mini.setLimit(TimeUnit.MINUTES.toMillis(20));
		mini.setWaiting(false);
		mini.setStarted(true);
		for (final Player player : mini.getPlayers()) {
			player.setMinigame(mini);
			player.getImpactHandler().restoreLifepoints();
			player.getInteractions().addOption(PlayerOption.ATTACK, new PlayerAttackHandler());
			player.getInteractions().sendOptions();
			handleRandomZombie(mini);
		}
		

	}

	@Override
	public void end(Minigame mini) {
		for (final Player player : mini.getPlayers()) {
			player.setMinigame(null);
			player.getImpactHandler().restoreLifepoints();
			player.getAppearance().setRender(Render.PLAYER);
			player.getAppearance().refresh();
			player.getInteractions().addOption(PlayerOption.REMOVE_ATTACK, null);
			player.getInteractions().sendOptions();
		}
		mini.setStart(0);
		mini.setLimit(0);
		mini.setStarted(false);
		mini.getPlayers().clear();
	}

	@Override
	public void process(Minigame mini) {
		if (mini.hasStarted()) {
			if (mini.hasStarted() && (mini.getStart() + mini.getLimit()) <= System.currentTimeMillis())
				end(mini);

		} else if (mini.isWaiting()) {
			if (mini.isAbove()) {
				player.getDispatcher().sendGameMessage("Starting");
				start(mini);
			} else {
				player.getDispatcher().sendGameMessage("Waiting");
			}
		}
	}

	@Override
	public void moved(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addPlayer(Minigame mini, Player player) {
		if (mini.isFull()) {
			return;
		}
		player.lock(2);//
		mini.getPlayers().add(player);

	}

	@Override
	public void addNpc(Minigame mini, NPC npc, boolean respawn) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void processDeath(Minigame mini) {
			player.lock(7);
			player.getAppearance().setRender(Render.PLAYER);
			player.getAppearance().refresh();
			player.submitTick(new GameTick(0) {
				int step = 0;

				@Override
				public void execute() {
					if (step == 0) {
						player.queueUpdateBlock(new AnimationBlock(player.getDeathAnimation()));
					} else if (step == 1) {
						player.getDispatcher().sendGameMessage("Oh dear, you have died.");
					} else if (step == 3) {
						player.getImpactHandler().restoreLifepoints();
						player.setRunEnergy(100);
						//TODO Coords
						player.queueUpdateBlock(new AnimationBlock(-1));
					} else if (step == 4) {
						this.stop();
					}
					step++;
				}
			});
		}

	@Override
	public void setOverlay(Minigame mini, int overlay) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void objectClick(Minigame mini, Player player, SceneLocation loc, OptionButton option) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void buttonClick(Minigame mini, Player player, int widgetID, int component, int slot, int itemID,
			int option) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void npcClick(Minigame mini, Player player, NPC npc, int optionID) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void logout(Minigame mini) {
	}
	
	public static int random(int range) {
		return (int)(java.lang.Math.random() * (range+1));
	}
	
	private void handleRandomZombie(Minigame mini) {
		for (Player player : mini.getPlayers()) {
			player.getDispatcher().sendGameMessage("["+ player.getName() + " is the infected]");
		}
		int zombie = random(2);
		if (zombie == 1) {
			player.getAppearance().setRender(Render.NPC);
			player.getAppearance().setNPCId(9);
			player.getAppearance().refresh();
		}
		if (zombie == 2) {
			player.getAppearance().setRender(Render.PLAYER);
			player.getAppearance().refresh();
		}
	}

	public static int getTEAM_ZOMBIES() {
		return TEAM_ZOMBIES;
	}

	public static void setTEAM_ZOMBIES(int zombieTeam) {
		TEAM_ZOMBIES = zombieTeam;
	}

	@Override
	public boolean canAttack(Minigame mini, Entity target, Entity lock) {
		return false;
		// TODO Auto-generated method stub
		
	}

}
