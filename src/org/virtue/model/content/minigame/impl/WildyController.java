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
import org.virtue.model.entity.region.Tile;
import org.virtue.model.entity.update.block.AnimationBlock;
import org.virtue.network.event.context.impl.in.OptionButton;

/**
 * 
 * @author Kayla
 * @Date 11/8/2015
 */
public class WildyController implements Controller {
	
	@Override
	public void start(Minigame mini) {
		mini.setStarted(true);
		for (Player player : mini.getPlayers()) {
			player.setMinigame(mini);
			if (player.isAtWild()) {
				player.getInteractions().addOption(PlayerOption.ATTACK, new PlayerAttackHandler());
				player.getInteractions().sendOptions();
			} else if (player.isAtWildSafe()) {
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
			player.getCombat().setDead(false);
			player.setMinigame(null);
			player.stopAll();
		}
		mini.getPlayers().clear();
		
	}

	@Override
	public void process(Minigame mini) {
		start(mini);

		for (Player player : mini.getPlayers()) {
			if (!player.isAtWildSafe() && !player.isAtWild()) {
				//removeSafely(mini);
			}
		}
	}

	@Override
	public void moved(Minigame mini) {
		for (Player player : mini.getPlayers()) {
			if(player.isAtWild()) {
				player.getInteractions().addOption(PlayerOption.ATTACK, new PlayerAttackHandler());
				player.getInteractions().sendOptions();
			} else if (player.isAtWildSafe()) {
				player.getInteractions().addOption(PlayerOption.REMOVE_ATTACK, null);
				player.getInteractions().sendOptions();
			}
		}
	}
	
	public void removeSafely(final Minigame mini) { //TODO Fix this, this causing wilderness to stop.
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
	public void addPlayer(Minigame mini, Player player) {
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
	public void objectClick(final Minigame mini, final Player player, SceneLocation loc, OptionButton option) {
		if (isDitch(loc.getID())) {
			if (player.getCurrentTile().getY() == 3523) {
				player.queueUpdateBlock(new AnimationBlock(6132));
				player.submitTick(new GameTick(2) {
					@Override
					public void execute() {
						/**
						 * teleportEntityBy is using (byte), only way I could call this.
						 * If this causes issues, I'll change/remove this.
						 */
						teleportEntityBy(player, 0, -3, (byte) 0);
						player.setMinigame(null);
						mini.getPlayers().clear();
						this.stop();
					}
				});
			}
		}
	}
	
	public void teleportEntityBy(Entity entity, int xOff, int yOff, byte zOff) {
		Tile currentTile = entity.getCurrentTile();
		entity.getMovement().teleportTo(Tile.edit(currentTile, xOff, yOff, zOff));
	}
	
	@Override
	public void buttonClick(Minigame mini, Player player, int widgetID, int component, int slot, int itemID, int option) {
		if (getWildLevel(player) > 20) {
			player.getDispatcher().sendGameMessage("A mysterious force prevents you from teleporting.");
			return;
		}
	}

	@Override
	public void npcClick(Minigame mini, Player player, NPC npc, int optionID) {
		// TODO Auto-generated method stub
		
	}
	
	public static boolean isDitch(int id) {
		return id >= 1440 && id <= 1444 || id >= 65076 && id <= 65087;
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
						player.getMovement().teleportTo(3222, 3222, 0);
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
	public void logout(Minigame mini) {
		// TODO Auto-generated method stub
		
	}
	
	public int getWildLevel(Player player) {
		if(player.getCurrentTile().getY() > 9900)
			return (player.getCurrentTile().getY() - 9912) / 8 + 1;
		return (player.getCurrentTile().getY() - 3520) / 8 + 1;
	}

	@Override
	public boolean canAttack(Minigame mini, Entity target, Entity lock) {
		Player player = (Player) lock;
		if (!player.isAtWildSafe()) {
			player.getDispatcher().sendGameMessage("Player is in safe.");
			return false;
		}
		return true;
		
	}

}
