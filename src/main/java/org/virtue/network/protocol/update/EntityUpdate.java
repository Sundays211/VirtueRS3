/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.virtue.network.protocol.update;

import java.util.Iterator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.engine.cycle.Tick;
import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.GameState;
import org.virtue.game.entity.player.Player;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Oct 14, 2014
 */
public class EntityUpdate extends Tick {
	
	/**
	 * The {@link Logger} instance
	 */
	private static Logger logger = LoggerFactory.getLogger(EntityUpdate.class);
		
	/**
	 * Called every Game Tick (600ms)
	 */
	@Override
	public void tick() {
		if (!Virtue.getInstance().isRunning()) {
			return;
		}
		for (int count = 0; count < 2; count++) {
			synchronized (World.getInstance()) {
				Iterator<Player> iterator = World.getInstance().getPlayers().iterator();
				while (iterator.hasNext()) {
					Player player = iterator.next();
					try {
						preprocess(player, count);
					} catch (Exception ex) {
						iterator.remove();
						player.kick(false);
						logger.warn("Error running preprocess tick for player: "+player.getName(), ex);
					}
				}
				Iterator<NPC> npcIterator = World.getInstance().getNPCs().iterator();
				while (npcIterator.hasNext()) {
					NPC npc = npcIterator.next();
					try {
						preprocess(npc, count);
					} catch (Exception ex) {
						npcIterator.remove();
						logger.warn("Error running preprocess tick for npc: "+npc.getName(), ex);
					}
				}
			}
		}
		synchronized (World.getInstance()) {
			//processWorld(World.getInstance());
			Iterator<Player> iterator = World.getInstance().getPlayers().iterator();
			while (iterator.hasNext()) {
				Player player = iterator.next();
				try {
					process(player);
				} catch (Exception ex) {
					iterator.remove();
					player.kick(false);
					logger.warn("Error processing tick for player: "+player.getName(), ex);
				}
			}
			Iterator<NPC> npcIterator = World.getInstance().getNPCs().iterator();
			while (npcIterator.hasNext()) {
				NPC npc = npcIterator.next();
				try {
					process(npc);
				} catch (Exception ex) {
					npcIterator.remove();
					logger.warn("Error processing tick for npc: "+npc.getName(), ex);
				}
			}
		}
		synchronized (World.getInstance()) {
			Iterator<Player> iterator = World.getInstance().getPlayers().iterator();
			while (iterator.hasNext()) {
				Player player = iterator.next();
				try {
					postprocess(player);
				} catch (Exception ex) {
					iterator.remove();
					player.kick(false);
					logger.warn("Error running postprocess tick for player: "+player.getName(), ex);
				}
			}
			Iterator<NPC> npcIterator = World.getInstance().getNPCs().iterator();
			while (npcIterator.hasNext()) {
				NPC npc = npcIterator.next();
				try {
					postprocess(npc);
				} catch (Exception ex) {
					npcIterator.remove();
					logger.warn("Error running postprocess tick for npc: "+npc.getName(), ex);
				}
			}
			World.getInstance().incrementCycle();
		}
	}
	
	/**
	 * Runs the pre-process events for the entity which need to be done before transmitting, such as processing movement.
	 * @param entity
	 * @param cycle The cycle count.
	 */
	public void preprocess(Entity entity, int cycle) {
		if (cycle == 0) {
			entity.getCombatSchedule().update();//.process();
			entity.process();
		} else if (cycle == 1) {
			entity.getImpactHandler().updateImpacts();
		}
	}
	
	/**
	 * Processes an entity's update procedure
	 * @param entity
	 */
	public void process(Entity entity) {
		if (entity instanceof Player) {
			Player player = (Player) entity;
			if (GameState.WORLD_READY.equals(player.getGameState())) {
				player.getDispatcher().sendPlayerUpdate();
				player.getDispatcher().sendNPCUpdate();
			}
		}
	}

	/**
	 * Resets any objects needed to be reset after the event was sent
	 * @param entity
	 */
	public void postprocess(Entity entity) {
		entity.resetUpdateBlocks();
		entity.getImpactHandler().resetQueue();
		entity.getMovement().postSend();
		if (entity instanceof Player) {
			((Player) entity).getViewport().repack();
		}
	}
	
}
