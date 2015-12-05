package org.virtue.model.content.minigame.impl;

import java.util.concurrent.TimeUnit;

import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.network.event.context.impl.in.OptionButton;


/**
 * 
 * @author Kayla
 * @Date 5/7/2015
 */
public class CastleController implements Controller {
	
	
	private int teamSaradomin = 0;
	private int teamZamorak = 1;

	@Override
	public void start(Minigame mini) {
		mini.setStart(System.currentTimeMillis());
		mini.setLimit(TimeUnit.MINUTES.toMillis(20));
		mini.setWaiting(false);
		mini.setStarted(true);
		
	}

	@Override
	public void end(Minigame mini) {
		for (Player player : mini.getPlayers()) {
			player.getMovement().teleportTo(2657, 2639, 0);
		}
		
		mini.setStart(0);
		mini.setLimit(0);
		mini.setStarted(false);
		mini.setWaiting(true);
		mini.getPlayers().clear();
		
	}

	@Override
	public void process(Minigame mini) {
		if (mini.hasStarted()) {
			if (mini.hasStarted() && (mini.getStart() + mini.getLimit()) <= System.currentTimeMillis())
				end(mini);
			
		} else if (mini.isWaiting()) {
			if (mini.isAbove()) {
				System.out.println("Starting");
				start(mini);
			} else {
				System.out.println("waiting");
			}
			
		}
		
	}

	@Override
	public void addPlayer(Minigame mini, Player player) {
		// TODO Auto-generated method stub
		
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
	public void objectClick(Minigame mini, Player player, SceneLocation loc,
			OptionButton option) {
		// TODO Auto-generated method stub
		
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
		// TODO Auto-generated method stub
		
	}

	@Override
	public void logout(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	public int getTeamSaradomin() {
		return teamSaradomin;
	}

	public void setTeamSaradomin(int teamSaradomin) {
		this.teamSaradomin = teamSaradomin;
	}

	public int getTeamZamorak() {
		return teamZamorak;
	}

	public void setTeamZamorak(int teamZamorak) {
		this.teamZamorak = teamZamorak;
	}

	@Override
	public boolean canAttack(Minigame mini, Entity target, Entity lock) {
		return true;
		// TODO Auto-generated method stub
		
	}

}
