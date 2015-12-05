package org.virtue.model.content.minigame.impl;

import java.util.concurrent.TimeUnit;

import org.virtue.model.World;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.DynamicRegion;
import org.virtue.model.entity.region.RegionTools;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.region.Tile;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * 
 * @author Kayla
 * @Date 5/9/2015
 */
 public class FightCaveController implements Controller {
	 
		private int startX = 4555;
		private int startY = 5073;
		private int widthRegions = 8;
		private int heightRegions = 8;

		@Override
		public void start(Minigame mini) {
			mini.setStart(System.currentTimeMillis());
			mini.setLimit(TimeUnit.MINUTES.toMillis(5));
			mini.setWaiting(false);
			mini.setStarted(true);
			DynamicRegion region = RegionTools.createRegion();
			for (int xOffSet = 0; xOffSet < widthRegions; xOffSet++) {
				for (int yOffSet = 0; yOffSet < heightRegions; yOffSet++) {
					for (int plane = 0; plane < 3; plane++)
						RegionTools.setChunk(region, xOffSet, yOffSet, plane,
								new Tile(startX + (xOffSet * widthRegions), startY
										+ (yOffSet * heightRegions), plane), 0);
				}
			}
			RegionTools.buildRegion(region);
			mini.setRegion(region);

			// TODO Update all the entities' tiles

			for (Player player : mini.getPlayers()) {
				player.setLastStaticTile(player.getCurrentTile());
				player.getMovement().teleportTo(getSimilar(mini, 2658, 2612));
			}

			for (NPC npc : mini.getNpcs()) {
				mini.getRegion().addNpc(npc);
			}

			addNpc(mini, NPC.create(3782, getSimilar(mini, 2657, 2594)), false); // Knight


		}
		
	public Tile getSimilar(Minigame mini, int actualX, int actualY) {
		Tile baseDynamicRegion = mini.getRegion().getBaseTile();
		int newX = actualX - startX;
		int newY = actualY - startY;
		return new Tile((baseDynamicRegion.getX() + newX + 5), (baseDynamicRegion.getY() + newY + 4), 0);
	}
	
	public void spawnWave(Minigame mini) {
		for (NPC npc : mini.getNpcs()) {
			System.out.println("Starting Wave 1");
			addNpc(mini, NPC.create(2745, new Tile(2403, 5094, 0)), false);
			mini.getNpcs().add(npc);
		}
	}

	@Override
	public void end(Minigame mini) {
		for (Player player : mini.getPlayers()) {
			player.setMinigame(null);
			player.getImpactHandler().restoreLifepoints();
			player.getMovement().teleportTo(4575, 5086, 0);
		}
		
		for (NPC npc : mini.getNpcs()) {
			npc.destroy();
		}
		
	}

	@Override
	public void process(Minigame mini) {
		if (mini.isWaiting()) {
			if (mini.isAbove()) {
				System.out.println("Starting");
				start(mini);
			} else {
				System.out.println("waiting");
			}
		}
	}

	@Override
	public void moved(Minigame mini) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addPlayer(Minigame mini, Player player) {
		if (mini.isFull())
			return;
		
			mini.getPlayers().add(player);
		
	}

	@Override
	public void addNpc(Minigame mini, NPC npc, boolean respawn) {
		npc.setCanRespawn(respawn);
		mini.getNpcs().add(npc);
		mini.getRegion().addNpc(npc);
		World.getInstance().addNPC(npc);
		
	}

	@Override
	public void processDeath(Minigame mini) {
		spawnWave(mini);
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
	public void logout(Minigame mini) {
		end(mini);
		
	}

	@Override
	public boolean canAttack(Minigame mini, Entity target, Entity lock) {
		return false;
		// TODO Auto-generated method stub
		
	}
	

}
