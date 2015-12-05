package org.virtue.model.content.minigame.impl;

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
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * @author Kayla
 * @date 11/16/2015
 */
public class ClanWarsFFAController implements Controller {

	@Override
	public void start(Minigame mini) {
		mini.setStarted(true);
		for (Player player : mini.getPlayers()) {
			player.setMinigame(mini);
			if (isInClanSafe(player)) {
				player.getInteractions().addOption(PlayerOption.ATTACK, new PlayerAttackHandler());
				player.getInteractions().sendOptions();	
			} else {
				player.getInteractions().addOption(PlayerOption.REMOVE_ATTACK, null);
				player.getInteractions().sendOptions();
			}
		}
	}

	@Override
	public void end(Minigame mini) {
		for (Player player : mini.getPlayers()) {
			player.getInteractions().addOption(PlayerOption.REMOVE_ATTACK, null);
			player.getInteractions().sendOptions();
			player.getMovement().teleportTo(2994, 9679, 0);
			player.setMinigame(null);
			player.stopAll();
		}
		mini.getPlayers().clear();
		
	}

	@Override
	public void process(Minigame mini) {
		start(mini);
	}
	
	public void removeController(final Minigame mini) {
		for (final Player player : mini.getPlayers()) {
			player.submitTick(new GameTick(0) {
				int step = 0;

				@Override
				public void execute() {
					if (step == 0) {
						player.getInteractions().addOption(PlayerOption.REMOVE_ATTACK, null);
						player.getInteractions().sendOptions();
						player.setMinigame(null);
						mini.getPlayers().clear();
						this.stop();
					}
					step++;
				}
			});
		}
	}

	@Override
	public void moved(Minigame mini) {
		for (Player player : mini.getPlayers()) {
			if (isInClanSafe(player)) {
				player.getInteractions().addOption(PlayerOption.ATTACK, new PlayerAttackHandler());
				player.getInteractions().sendOptions();
			} else {
				player.getInteractions().addOption(PlayerOption.REMOVE_ATTACK, null);
				player.getInteractions().sendOptions();
			}
		}
	}

	@Override
	public void addPlayer(Minigame mini, Player player) {
		mini.getPlayers().add(player);
	}

	@Override
	public void addNpc(Minigame mini, NPC npc, boolean respawn) {
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
						player.getMovement().teleportTo(2994, 9679, 0);
						player.queueUpdateBlock(new AnimationBlock(-1));
					} else if (step == 4) {
						end(mini);
						this.stop();
					}
					step++;
				}
			});
		}
	}

	@Override
	public void setOverlay(Minigame mini, int overlay) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void objectClick(Minigame mini, Player player, SceneLocation loc, OptionButton option) {
		switch(loc.getID()) {
		case 38700:
			end(mini);
			break;
		}
		
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
	
	public static boolean isInClanSafe(Player player) {
		return player.getCurrentTile().getX() >= 2756 && player.getCurrentTile().getY() >= 5512
				&& player.getCurrentTile().getX() <= 2878 && player.getCurrentTile().getY() <= 5630;
	}

	@Override
	public boolean canAttack(Minigame mini, Entity target, Entity lock) {
		return true;
		// TODO Auto-generated method stub
		
	}

}
