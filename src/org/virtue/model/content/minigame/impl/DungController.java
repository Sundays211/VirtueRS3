package org.virtue.model.content.minigame.impl;

import org.virtue.Virtue;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.DynamicRegion;
import org.virtue.model.entity.region.RegionTools;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.script.ScriptAPI;

/**
 * @Author Kayla
 * @Date Dec 2, 2015
 */
public class DungController implements Controller {
	
	private ScriptAPI api = Virtue.getInstance().getScripts().getApi();

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#start(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void start(Minigame mini) {
		DynamicRegion floorSetup = RegionTools.createRegion();
		for (int xOffSet = 0; xOffSet < 8; xOffSet++) {
			for (int yOffSet = 0; yOffSet < 8; yOffSet++) {
				//RegionTools.setChunk(floorSetup, xOffSet, yOffSet, 1, 232, 632, 0, 0);
			}
		}
		RegionTools.setChunk(floorSetup, 4, 4, 0, 1, 78, 0, 0);
		RegionTools.buildRegion(floorSetup);
		int squareX = api.getSquareX(floorSetup.getBaseTile());
		int squareY = api.getSquareY(floorSetup.getBaseTile());
		
		for(Player player : mini.getPlayers()) {
			api.teleportEntity(player, 1, squareX, squareY, 10, 10);
		}
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#end(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void end(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#process(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void process(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#moved(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void moved(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#canAttack(org.virtue.model.content.minigame.Minigame, org.virtue.model.entity.Entity, org.virtue.model.entity.Entity)
	 */
	@Override
	public boolean canAttack(Minigame mini, Entity entity, Entity lock) {
		// TODO Auto-generated method stub
		return false;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#addPlayer(org.virtue.model.content.minigame.Minigame, org.virtue.model.entity.player.Player)
	 */
	@Override
	public void addPlayer(Minigame mini, Player player) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#addNpc(org.virtue.model.content.minigame.Minigame, org.virtue.model.entity.npc.NPC, boolean)
	 */
	@Override
	public void addNpc(Minigame mini, NPC npc, boolean respawn) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#processDeath(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void processDeath(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#setOverlay(org.virtue.model.content.minigame.Minigame, int)
	 */
	@Override
	public void setOverlay(Minigame mini, int overlay) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#objectClick(org.virtue.model.content.minigame.Minigame, org.virtue.model.entity.player.Player, org.virtue.model.entity.region.SceneLocation, org.virtue.network.event.context.impl.in.OptionButton)
	 */
	@Override
	public void objectClick(Minigame mini, Player player, SceneLocation loc, OptionButton option) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#buttonClick(org.virtue.model.content.minigame.Minigame, org.virtue.model.entity.player.Player, int, int, int, int, int)
	 */
	@Override
	public void buttonClick(Minigame mini, Player player, int widgetID, int component, int slot, int itemID,
			int option) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#npcClick(org.virtue.model.content.minigame.Minigame, org.virtue.model.entity.player.Player, org.virtue.model.entity.npc.NPC, int)
	 */
	@Override
	public void npcClick(Minigame mini, Player player, NPC npc, int optionID) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#logout(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void logout(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

}
