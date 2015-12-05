package org.virtue.model.content.minigame.impl;

import org.virtue.Virtue;
import org.virtue.model.World;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.skill.SkillType;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.region.Tile;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.script.ScriptAPI;
import org.virtue.utility.RandomExt;

/**
 * 
 * @author James
 *
 */
public class ShootingStar implements Controller  {
	
	/**
	 * Time till next spawn
	 */
	public int timeTillNextSpawn = 3600;
	
	public Player player;
	
	/**
	 * Checks if theres a star spawned
	 */
	public boolean isSpawned;

	/**
	 * Total Star Dust Mined
	 */
	public static short stardustMined;
	
	/**
	 * Used For Getting The Star's Stage.
	 */
	public static byte stage = 8;
	
	/**
	 * Increases The Star's Stage
	 */
	public static int starSize = 38661;
	

	/**
	 * Increases The X Position Of The Star.
	 */
	private int starX = lastTile.getX();
	
	/**
	 * Shooting star crash coordinates.
	 */
	public final static Tile[] COORDS =  {
			new Tile(3204, 3262, 0),
			new Tile(3197, 3264, 0),
			new Tile(3199, 3261, 0) // Lumbridge Training Dummies 
	};
	
	/**
	 * Used To Save The Star's coordinates.
	 */
	private static Tile lastTile = COORDS[RandomExt.random(0, 3)];
	
	private SceneLocation star;
	
	private ScriptAPI api = Virtue.getInstance().getScripts().getApi();
	
	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#start(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void start(Minigame mini) {
		if(!isSpawned) {
			star = api.createLocation(38660, new Tile(lastTile), 10, 0);
			api.spawnLocation(star);
		}
		World.getInstance().sendEventBroadcast("A Shooting Star has just crashed!");
		isSpawned = true;
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#end(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void end(Minigame mini) {
		api.destroyLoc(star);
		star = null;
		isSpawned = false;
	}
	
	public boolean minCrashedStar(Minigame mini) {
		int starTier = stage * 10;
		if(player.getSkills().getCurrentLevel(SkillType.MINING) < stage * 10) {
			player.getDispatcher().sendGameMessage("You need a mining Level of " + starTier + " to mine a shooting star at this tier.");
			return false;
		} else {
			process(mini);
		}
		return true;
	}
	
	public void firstToMine() {
		for (Player players : World.getInstance().getPlayers()) {
			if(player.taggedStar == false) {
				player.getSkills().addExperience(SkillType.MINING, player.getSkills().getCurrentLevel(SkillType.MINING) * 75);
				player.getDispatcher().sendGameMessage("Congratulations, you were the first to reach the shooting star.");
			players.taggedStar = true;
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.virtue.model.content.minigame.Controller#process(org.virtue.model.content.minigame.Minigame)
	 */
	@Override
	public void process(Minigame mini) {
		if(isSpawned) {
		if (stardustMined == 33 || stardustMined == 50 || stardustMined == 68
				|| stardustMined == 86 || stardustMined == 116 || stardustMined == 147 || stardustMined == 160) {
			starSize++;
			stage--;
			api.destroyLoc(star);
			starX++;
			star = api.createLocation(starSize, new Tile(starX), 10, 0);
			return;
		} else if (stardustMined >= 200) {
			starX++;
			api.destroyLoc(star);
			starSize = 38661;
			stage = 8;
			player.stopAll();
			player.canTalkToSprite = true;
			World.getInstance().addNPC(NPC.create(8091, lastTile));
			
			for (Player players : World.getInstance().getPlayers()) {
				players.taggedStar = false;
			}
			return;
			}
		} else {
			start(mini);
		}
		
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
	 * @see org.virtue.model.content.minigame.Controller#objectClick(org.virtue.model.content.minigame.Minigame, org.virtue.model.entity.player.Player, org.virtue.model.entity.region.SceneLocation, int)
	 */
	@Override
	public void objectClick(Minigame mini, Player player, SceneLocation loc, OptionButton option) {
		
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
