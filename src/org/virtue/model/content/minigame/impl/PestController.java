package org.virtue.model.content.minigame.impl;

import java.util.concurrent.TimeUnit;

import org.virtue.engine.cycle.GameTick;
import org.virtue.model.World;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.content.minigame.impl.pestcontrol.PestData;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.npc.script.pestcontrol.PestPortal;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.region.DynamicRegion;
import org.virtue.model.entity.region.RegionTools;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.utility.RandomExt;
import org.virtue.utility.text.StringUtility;

/**
 * @author Kayla
 * @date 11/16/2015
 */
public class PestController implements Controller {
	
	private PestData difficulty;

	/**
	 * Shield activated true/false
	 */
	private boolean hasShield = false;
	private int startX = 2629;
	private int startY = 2564;
	private int widthRegions = 8;
	private int heightRegions = 8;
	private int pestLimit;

	public int[] PESTS = { 3772, 3762, 3742, 3732, 3747, 3727, 3752, 3773, 3764, 3743, 3734, 3748, 3728, 3754, 3774,
			3766, 3744, 3736, 3749, 3729, 3756, 3775, 3768, 3745, 3738, 3750, 3730, 3758, 3776, 3770, 3746, 3740, 3751,
			3731, 3760 };
	
	private long testTime; //just using this to test

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.virtue.model.content.minigame.Controller#start(org.virtue.model.
	 * content .minigame.Minigame)
	 */
	@Override
	public void start(Minigame mini) {
		this.difficulty = PestData.NOVICE; //default set to novice for testing
		mini.setStart(System.currentTimeMillis());
		mini.setLimit(TimeUnit.MINUTES.toMillis(5));
		mini.setWaiting(false);
		mini.setStarted(true);
		DynamicRegion region = RegionTools.createRegion();
		for (int xOffSet = 0; xOffSet < widthRegions; xOffSet++) {
			for (int yOffSet = 0; yOffSet < heightRegions; yOffSet++) {
				for (int plane = 0; plane < 3; plane++)
					RegionTools.setChunk(region, xOffSet, yOffSet, plane,
							new Tile(startX + (xOffSet * widthRegions), startY + (yOffSet * heightRegions), plane), 0);
			}
		}
		RegionTools.buildRegion(region);
		mini.setRegion(region);

		// TODO Update all the entities' tiles

		setOverlay(mini, 408);

		for (Player player : mini.getPlayers()) {
			player.setLastStaticTile(player.getCurrentTile());
			player.getMovement().teleportTo(getSimilar(mini, 2658, 2612));
		}

		for (NPC npc : mini.getNpcs())
			mini.getRegion().addNpc(npc);

		addNpc(mini, NPC.create(3782, getSimilar(mini, 2657, 2594)), false); // Knight
		addNpc(mini, NPC.create(3781, getSimilar(mini, 2656, 2606)), false);// Squire
		
		for (PestPortal portal : difficulty.getPortals()) {
			Tile tile = portal.getCurrentTile();
			addNpc(mini, NPC.create(portal.getId(), getSimilar(mini, tile.getX(), tile.getY())), false); // Purple
		}

	}

	public Tile getSimilar(Minigame mini, int actualX, int actualY) {
		Tile baseDynamicRegion = mini.getRegion().getBaseTile();
		int newX = actualX - startX;
		int newY = actualY - startY;
		return new Tile((baseDynamicRegion.getX() + newX + 5), (baseDynamicRegion.getY() + newY + 4), 0);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.model.content.minigame.Controller#end(org.virtue.model.content
	 * .minigame.Minigame)
	 */
	@Override
	public void end(Minigame mini) {
		for (Player player : mini.getPlayers()) {
			player.getMovement().teleportTo(2657, 2639, 0);
			player.setMinigame(null);
		}

		for (NPC npc : mini.getNpcs()) {
			npc.destroy();
		}

		mini.setStart(0);
		mini.setLimit(0);
		mini.setStarted(false);
		mini.setWaiting(false);
		mini.getNpcs().clear();
		mini.getPlayers().clear();
		RegionTools.destroyRegion(mini.getRegion());
		mini.setRegion(null);
	}

	public void exitLander(Minigame mini, Player player) {
		player.getMovement().teleportTo(2657, 2639, 0);
		player.setMinigame(null);
		mini.setStart(0);
		mini.setLimit(0);
		mini.setStarted(false);
		mini.setWaiting(false);
		mini.getPlayers().remove(player);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.model.content.minigame.Controller#process(org.virtue.model
	 * .content.minigame.Minigame)
	 */
	@Override
	public void process(Minigame mini) {
		if (mini.hasStarted()) {
			if ((mini.getStart() + mini.getLimit()) <= System.currentTimeMillis())
				end(mini);

			if ((System.currentTimeMillis() - testTime) / 1000 >= RandomExt.random(7, 9) && pestLimit < 6) { //todo check time to spawn
				testTime = System.currentTimeMillis(); //spawn limit later
				spawnMonsters(mini);
			}

		} else if (mini.isWaiting()) {
			if (mini.isAbove()) {
				System.out.println("Starting");
				start(mini);
			} else {
				for (Player player : mini.getPlayers()) {
					player.getWidgets().openWidget(1477, 423, 407, true);
					player.getDispatcher().sendWidgetText(407, 13, "Next Departure: ");
					player.getDispatcher().sendWidgetText(407, 14, "Players Ready: " + mini.getPlayers().size());
					player.getDispatcher().sendWidgetText(407, 15, "(Need 5 to 25 players)");
					player.getDispatcher().sendWidgetText(407, 16, "Points: ");
					player.getDispatcher().sendWidgetText(407, 3, StringUtility.formatChatMessage(difficulty.name()));
					System.out.println("waiting");
				}
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.model.content.minigame.Controller#addPlayer(org.virtue.model
	 * .content.minigame.Minigame, org.virtue.model.entity.player.Player)
	 */
	@Override
	public void addPlayer(Minigame mini, Player player) {
		if (mini.isFull())
			return;
		mini.getPlayers().add(player);

		// this need to be finished i think

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.model.content.minigame.Controller#addNpc(org.virtue.model.
	 * content.minigame.Minigame, org.virtue.model.entity.npc.NPC)
	 */
	@Override
	public void addNpc(Minigame mini, NPC npc, boolean respawn) {
		npc.setCanRespawn(respawn);
		mini.getNpcs().add(npc);
		mini.getRegion().addNpc(npc);
		World.getInstance().addNPC(npc);
	}

	public void spawnPest(Minigame mini, NPC npc) {
		addNpc(mini, npc, false);
	}
	
	public void spawnMonsters(Minigame mini) {
		for (int portalID = 0; portalID < 4; portalID++) { //spawn 1 per portal
			int pestID = difficulty.getPests()[RandomExt.random(difficulty.getPests().length)];
			Tile tile = difficulty.getPortals()[portalID].getCenterTile();
			NPC npc = NPC.create(pestID, getSimilar(mini, tile.getX(), tile.getY()));
			spawnPest(mini, npc);
			Player closest = mini.getPlayers().get(0);
			for (Player player : mini.getPlayers()) {
				if (player != null) {
					double dist = player.getCurrentTile().distance(npc.getCurrentTile());
					if (dist < closest.getCurrentTile().distance(npc.getCurrentTile()))
						closest = player;
				}
			}
			if (closest != null)
				npc.getCombatSchedule().lock(closest);
			pestLimit++;
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.model.content.minigame.Controller#setOverlay(org.virtue.model
	 * .content.minigame.Minigame, int)
	 */
	@Override
	public void setOverlay(Minigame mini, int overlay) {
		for (Player player : mini.getPlayers()) {
			// player.getVars().setVarpBit(1776, 329472);
			// player.getVars().setVarpBit(1776, 329492);
			player.getWidgets().openWidget(1477, 423, overlay, true);
		}

	}

	@Override
	public void objectClick(Minigame mini, Player player, SceneLocation loc, OptionButton option) {
		switch (loc.getID()) {
		case 14314:
			exitLander(mini, player);
			break;
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.virtue.model.content.minigame.Controller#buttonClick(org.virtue.model
	 * .content.minigame.Minigame, org.virtue.model.entity.player.Player, int,
	 * int, int, int, int)
	 */
	@Override
	public void buttonClick(Minigame mini, Player player, int widgetID, int component, int slot, int itemID,
			int option) {
		// TODO Auto-generated method stub

	}

	@Override
	public void npcClick(Minigame mini, Player player, NPC npc, int optionID) {
		switch (npc.getID()) {
		case 3781:
			end(mini);
			break;
		}
	}

	@Override
	public void moved(Minigame mini) {
		// TODO Auto-generated method stub

	}

	@Override
	public void processDeath(final Minigame mini) {
		for (final Player player : mini.getPlayers()) {
			player.lock(7);
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
						player.getMovement().teleportTo(getSimilar(mini, 2658, 2612));
						player.queueUpdateBlock(new AnimationBlock(-1));
					} else if (step == 4) {
						this.stop();
					}
					step++;
				}
			});
		}
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
