package org.virtue.model.content.minigame.impl;

import org.virtue.Virtue;
import org.virtue.engine.cycle.GameTick;
import org.virtue.model.content.minigame.Controller;
import org.virtue.model.content.minigame.Minigame;
import org.virtue.model.entity.Entity;
import org.virtue.model.entity.npc.NPC;
import org.virtue.model.entity.player.Player;
import org.virtue.model.entity.player.interactions.PlayerAttackHandler;
import org.virtue.model.entity.player.interactions.PlayerInteractions.PlayerOption;
import org.virtue.model.entity.region.SceneLocation;
import org.virtue.model.entity.update.block.ForceTalkBlock;
import org.virtue.network.event.context.impl.in.OptionButton;
import org.virtue.script.ScriptAPI;

/**
 * 
 * @author Kayla
 * @Date 5/7/2015
 */
public class DuelController implements Controller  {
	
	private ScriptAPI api = Virtue.getInstance().getScripts().getApi();
	
	@Override
	public void start(Minigame mini) {
		mini.setStarted(true);	
		mini.setWaiting(false);
		for (final Player player : mini.getPlayers()) {
			player.setMinigame(mini);
			player.submitTick(new GameTick(2) {
				int count = 3;

				@Override
				public void execute() {

					if (count > 0)
						player.queueUpdateBlock(new ForceTalkBlock("" + count));
					if (count == 0) {
						player.queueUpdateBlock(new ForceTalkBlock("FIGHT!"));
						this.stop();
					}
					count--;
				}
			});
			player.getImpactHandler().restoreLifepoints();
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
			player.getCombat().setDead(false);
			player.setMinigame(null);
			player.stopAll();
		}
		mini.setWaiting(false);
		mini.setStarted(false);
		mini.getPlayers().clear();
		
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
	public void objectClick(Minigame mini, Player player, SceneLocation loc,
			OptionButton option) {
		switch(loc.getID()) {
		case 83911:
		case 83912:
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
		for (Player player : mini.getPlayers()) {
			player.getDispatcher().sendGameMessage("Your opponent has logged out during the match.");
			end(mini);
		}
	}

	@Override
	public boolean canAttack(Minigame mini, Entity entity, Entity lock) {
		if (entity instanceof Player && lock != entity) {
			return false;
		}
		return true;
		
	}
}
