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
package org.virtue.game;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.virtue.Virtue;
import org.virtue.game.content.chat.ChannelType;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.EntityList;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.RegionUpdateTick;
import org.virtue.game.map.square.RegionManager;
import org.virtue.game.map.square.load.MapLoader;
import org.virtue.game.node.ServerNode;
import org.virtue.network.event.context.impl.out.MessageEventContext;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @since Aug 8, 2014
 */
public class World extends ServerNode {

	/**
	* The {@link Logger} instance
	*/
	private static Logger logger = LoggerFactory.getLogger(World.class);
	
	/**
	 * The {@link EntityList} of {@link Player} instance
	 */
	private static EntityList<NPC> npcs = new EntityList<>(32767);
	
	/**
	 * The {@link RegionManager}
	 */
	private RegionManager regionManager;

	/**
	* The {@link World} instance
	*/
	public static World instance;
	
	/**
	 * Amount of cycles that have passed (1 / 600ms).
	 */
	private int cycleCount;
	
	private final boolean members;
	
	private World (int nodeId, boolean members, RegionManager regionManager) {
		super(nodeId, 2048);
		this.members = members;
		this.regionManager = regionManager;
	}
	
	public boolean isMembers() {
		return members;
	}

	/**
	 * Adds a npc into the {@link EntityList} instance
	 * @param npc - the npc to add
	 */
	public synchronized void addNPC(NPC npc) {
		npcs.add(npc);
	}
	
	/**
	 * Removes a npc into the{@link EntityList} instance
	 * @param npc - the npc to remove
	 */
	public synchronized void removeNPC(NPC npc) {
		npcs.remove(npc);
	}
	
	/**
	 * Removes an npc from the world, based on its entity index
	 * @param index The entity index of the npc
	 */
	public synchronized void removeNPC(int index) {
		npcs.remove(index);
	}
	
	/**
	 * Returns the list of npcs
	 */
	public EntityList<NPC> getNPCs() {
		return npcs;
	}
	
	public RegionManager getRegions() {
		return regionManager;
	}

	/**
	* Returns the {@link World} instance
	*/
	public static World getInstance() {
		if (instance == null) {
			try {
				boolean members = Virtue.getInstance().getProperty("world.members", true);
				int nodeId = Virtue.getInstance().getProperty("world.node", 1);
				MapLoader mapLoader = new MapLoader(Virtue.getInstance().getCache(), Virtue.getInstance().getConfigProvider());
				instance = new World(nodeId, members, new RegionManager(mapLoader));
				new RegionUpdateTick(instance.regionManager).start();
			} catch (Exception e) {
				logger.error("Error creating new World instance", e);
			}
		}
		return instance;
	}
	
	public void sendEventBroadcast (String message) {
		//img4 to 7 for broadcasts
		String prefix = "<col=ff0000><img=6>News:";
		MessageEventContext broadcast = new MessageEventContext(ChannelType.BROADCAST, message, prefix, null);
		for (Player p : players) {
			p.getDispatcher().sendMessage(broadcast);
		}
	}
	
	public void sendYellBroadcast (String message) {
		//img4 to 7 for broadcasts
		String prefix = "";
		MessageEventContext broadcast = new MessageEventContext(ChannelType.BROADCAST, message, prefix, null);
		for (Player p : players) {
			p.getDispatcher().sendMessage(broadcast);
		}
	}
	
	public void sendBroadcast (String message) {
		//img4 to 7 for broadcasts
		String prefix = "<col=ff8c38><img=6>News:";
		MessageEventContext broadcast = new MessageEventContext(ChannelType.BROADCAST, message, prefix, null);
		for (Player p : players) {
			p.getDispatcher().sendMessage(broadcast);
		}
	}
	
	public void send200MBroadcast (String message) {
		//img4 to 7 for broadcasts
		String prefix = "<col=FF0000><img=5>News:";
		MessageEventContext broadcast = new MessageEventContext(ChannelType.BROADCAST, message, prefix, null);
		for (Player p : players) {
			p.getDispatcher().sendMessage(broadcast);
		}
	}
	
	public void sendAdminBroadcast (String message) {
		//img4 to 7 for broadcasts
		String prefix = "<col=00FF00>";
		MessageEventContext broadcast = new MessageEventContext(ChannelType.BROADCAST, message, prefix, null);
		for (Player p : players) {
			p.getDispatcher().sendMessage(broadcast);
		}
	}
	
	
	/**
	 * Gets an Entity by its index.
	 * 
	 * @param index
	 *            The index of the entity.
	 * @return entity The found entity.
	 * @return null.
	 */
	public Entity getEntity(int index) {
		return null;
	}

	/**
	 * Gets the cycleCount value.
	 * @return The cycleCount.
	 */
	public int getCycleCount() {
		return cycleCount;
	}

	/**
	 * Increments the cycle count by one.
	 */
	public void incrementCycle() {
		this.cycleCount++;
	}

	/**
	 * Sets the cycleCount value.
	 * @param cycleCount The cycleCount to set.
	 */
	public void setCycleCount(int cycleCount) {
		this.cycleCount = cycleCount;
	}
}
