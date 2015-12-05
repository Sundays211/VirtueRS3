package org.virtue.model.content.minigame.impl;

import java.util.concurrent.TimeUnit;

import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.interactions.PlayerAttackHandler;
import org.virtue.model.entity.player.interactions.PlayerInteractions.PlayerOption;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.network.event.context.impl.in.OptionButton;


/**
 * 
 * @author Kayla
 * @Date 5/9/2015
 */
public class PitsController  implements Controller  {
	
	@Override
	public void start(Minigame mini) {
		mini.setStart(System.currentTimeMillis());
		mini.setLimit(TimeUnit.MINUTES.toMillis(1));
		mini.setWaiting(false);
		mini.setStarted(true);

		for (Player player : mini.getPlayers()) {
			player.setMinigame(mini);
			player.getImpactHandler().restoreLifepoints();
			player.getMovement().teleportTo(4575, 5086, 0);
			player.getInteractions().addOption(PlayerOption.ATTACK, new PlayerAttackHandler());
			player.getInteractions().sendOptions();
		}
	}

	@Override
	public void end(Minigame mini) {
		for (Player player : mini.getPlayers()) {
			player.getInteractions().addOption(PlayerOption.REMOVE_ATTACK, null);
			player.getInteractions().sendOptions();
			player.getImpactHandler().restoreLifepoints();
			player.getMovement().teleportTo(4599, 5062, 0);
			player.getCombat().setDead(false);
			player.setMinigame(null);
			player.stopAll();
		}
		mini.setStart(0);
		mini.setLimit(0);
		mini.setStarted(false);
		mini.getPlayers().clear();
		
	}

	@Override
	public void process(Minigame mini) {
		System.out.println("process, " + mini.isWaiting() + ", " + mini.isAbove());
		if (mini.hasStarted()) {
			if ((mini.getStart() + mini.getLimit()) <= System.currentTimeMillis())
				end(mini);
			
		} else if (mini.isWaiting()) {
			if (!mini.hasStarted()) {
				if ((mini.getStart() + mini.getLimit()) <= System.currentTimeMillis())
					if (mini.isAbove() && !mini.getPlayers().isEmpty()) {
						System.out.println("Starting");
						start(mini);
					} else {
						System.out.println("waiting till game is over");
					}

			}
		}
	}

	@Override
	public void addPlayer(Minigame mini, Player player) {
		if (mini.isFull())
			return;
		mini.getPlayers().add(player);

	}

	@Override
	public void addNpc(Minigame mini, NPC npc, boolean respawn) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setOverlay(Minigame mini, int overlay) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void objectClick(Minigame mini, Player player, SceneLocation loc, OptionButton option) {
		switch(loc.getID()) {
		case 68222:
			end(mini);
			break;
		}
		
	}

	@Override
	public void buttonClick(Minigame mini, Player player, int widgetID,
			int component, int slot, int itemID, int option) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void npcClick(Minigame mini, Player player, NPC npc, int optionID) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void moved(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processDeath(Minigame mini) {
			end(mini);
	}

	@Override
	public void logout(Minigame mini) {
			end(mini);
	}

	@Override
	public boolean canAttack(Minigame mini, Entity target, Entity lock) {
		// TODO Auto-generated method stub
		return false;
		
	}
	
}