package org.virtue.model.content.minigame.impl;

import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.network.event.context.impl.in.OptionButton;
/**
 * 
 * @author james
 *
 */
public class BarrowsController implements Controller {
	
	public boolean allKilled, vKilled, aKilled, gKilled, dKilled, tKilled, kKilled;
	
	public int killCount;
	
	public Player player;

	@Override
	public void start(Minigame mini) {
		setOverlay(mini, 24);
		player.getDispatcher().sendWidgetText(24, 0, "dgdfd");
		player.getDispatcher().sendWidgetText(24, 1, "fgfd");
		player.getDispatcher().sendWidgetText(24, 2, "fdgfg");
		player.getDispatcher().sendWidgetText(24, 3, "gfdg");
		player.getDispatcher().sendWidgetText(24, 4, "gfdg");
		player.getDispatcher().sendWidgetText(24, 5, "gfdg");
		player.getDispatcher().sendWidgetText(24, 6, "gfdg");
		
	}

	@Override
	public void end(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void process(Minigame mini) {
		
	}

	@Override
	public void moved(Minigame mini) {
		// TODO Auto-generated method stub
		
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
	public void processDeath(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setOverlay(Minigame mini, int overlay) {
		player.getWidgets().openWidget(1477, 423, overlay, true);
		
	}

	@Override
	public void objectClick(Minigame mini, Player player, SceneLocation loc, OptionButton option) {
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
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean canAttack(Minigame mini, Entity target, Entity lock) {
		return true;
		
	}

}
