/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
package org.virtue.game.world.region;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.virtue.Constants;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.world.region.zone.AddObject;
import org.virtue.game.world.region.zone.DeleteObject;
import org.virtue.game.world.region.zone.DeleteLocation;
import org.virtue.game.world.region.zone.AddUpdateLocation;
import org.virtue.game.world.region.zone.ZoneUpdatePacket;
import org.virtue.network.event.context.impl.out.ZoneUpdateEventContext;
import org.virtue.network.event.encoder.impl.ZoneUpdateEventEncoder;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/10/2014
 */
public class Region {
	
	protected static enum LoadStage { IDLE, STARTING, LOADED_NODES, LOADED_TERRAIN, COMPLETED };
	
	protected int mapSquareHash;
	protected Tile baseTile;
	
	/**
	 * Represents an 8x8 block of tiles within the Region.
	 * All items and objects within this block can be updated simultaneously, saving bandwidth when updating.
	 * 
	 * @author Im Frizzy <skype:kfriz1998>
	 * @author Frosty Teh Snowman <skype:travis.mccorkle>
	 * @author Arthur <skype:arthur.behesnilian>
	 * @author Sundays211
	 * @since 5/11/2014
	 */
	protected class Chunk {
		/**
		 * Represents the static (permanent) locations in this block.
		 */
		protected final Map<Integer, SceneLocation[]> locations = new HashMap<Integer, SceneLocation[]>();
		
		/**
		 * Represents the ground items located within this block
		 */
		private final Map<Integer, List<GroundItem>> items = new HashMap<Integer, List<GroundItem>>();
		
		/**
		 * Represents the locations which need to be updated when a player enters the region
		 */
		private final Set<SceneLocation> tempLocs = new HashSet<SceneLocation>();
		
		private Tile baseTile;
		
		private Chunk (Tile tile) {
			this.baseTile = tile;
		}
		
		protected void addLocation (SceneLocation loc, int hash) {
			synchronized (locations) {
				if (!locations.containsKey(hash)) {
					locations.put(hash, new SceneLocation[23]);
				}
				locations.get(hash)[loc.getShape()] = loc;
			}
		}
		
		protected void updateLocation (SceneLocation loc, int hash, boolean isTemp) {
			if (isTemp) {
				tempLocs.add(loc);
			} else {
				tempLocs.remove(loc);
			}			
		}
		
		protected void removeLocation (SceneLocation loc, int hash, boolean wasTemp) {
			if (wasTemp) {
				tempLocs.remove(loc);
				synchronized (locations) {
					locations.get(hash)[loc.getShape()] = null;
				}
			} else {
				tempLocs.add(loc);				
			}
		}
		
		protected SceneLocation[] getLocations (int hash) {
			synchronized (locations) {
				return locations.get(hash);
			}
		}
		
		protected SceneLocation getLocation (int objectID, int hash) {
			synchronized (locations) {
				if (!locations.containsKey(hash)) {
					return null;
				}
				for (SceneLocation object : locations.get(hash)) {
					if (object != null && object.getID() == objectID) {
						return object;
					}
				}
			}
			return null;
		}
		
		protected void addItem (GroundItem item, int hash) {
			synchronized (items) {
				if (!items.containsKey(hash)) {
					items.put(hash, new ArrayList<GroundItem>());
				}
				items.get(hash).add(item);
			}
		}
		
		protected GroundItem getItem (int itemID, int hash) {
			synchronized (items) {
				if (!items.containsKey(hash)) {
					return null;
				}
				for (GroundItem item : items.get(hash)) {
					if (item != null && item.getId() == itemID) {
						return item;
					}
				}				
			}
			return null;
		}
		
		protected GroundItem removeItem (int itemID, int hash) {
			GroundItem selected = null;
			synchronized (items) {
				if (!items.containsKey(hash)) {
					return null;
				}
				Iterator<GroundItem> iterator = items.get(hash).iterator();
				GroundItem item;
				while (iterator.hasNext()) {
					item = iterator.next();
					if (item.getId() == itemID) {
						iterator.remove();
						selected = item;
						break;
					}
				}
			}
			return selected;
		}
		
		protected void updateBlock () {
			Iterator<SceneLocation> locIterator = tempLocs.iterator();
			while (locIterator.hasNext()) {
				SceneLocation loc = locIterator.next();
				if (loc.processTick()) {
					locIterator.remove();
					loc.revert();
				}
			}
			for (List<GroundItem> itemSet : items.values()) {
				Iterator<GroundItem> iterator = itemSet.iterator();
				GroundItem item;
				while (iterator.hasNext()) {
					item = iterator.next();
					if (item.processTick()) {
						iterator.remove();
						ZoneUpdateEventContext packet = new ZoneUpdateEventContext(new DeleteObject(item));
						for (Player p : players) {
							p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, packet);
						}
						item.destroy();
						break;
					}
				}
			}
		}
		
		protected void sendUpdate (Player player) {
			List<ZoneUpdatePacket> packets = new ArrayList<ZoneUpdatePacket>();
			for (List<GroundItem> tileItems : items.values()) {
				for (GroundItem item : tileItems) {
					if (item != null) {
						packets.add(new AddObject(item));
					}
				}
			}
			for (SceneLocation loc : tempLocs) {
				if (loc != null) {
					if (loc.getID() < 0) {
						packets.add(new DeleteLocation(loc));
					} else {
						packets.add(new AddUpdateLocation(loc));
					}
				}
			}
			if (!packets.isEmpty()) {
				player.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(packets, baseTile));
			}
		}
	}
	
	/**
	 * Represents an 8x8 block within the region. 
	 * All items and objects within these blocks can be updated in a single packet, saving bandwidth and processing time
	 */
	protected Map<Integer, Chunk> chunks = new HashMap<Integer, Chunk>();
	
	/**
	 * Represents the players which have this region in their viewport.
	 * Note that these players are NOT necessarily located in the region itself
	 */
	private Set<Player> players = Collections.synchronizedSet(new HashSet<Player>());
	
	private Set<NPC> npcs = Collections.synchronizedSet(new HashSet<NPC>());
	
	protected LoadStage loadStage = LoadStage.IDLE;
	
	protected int locationCount = 0;
	
	private ClipMap clipMap;
	
	public Region (int id) {
		this.mapSquareHash = id;
		this.baseTile = new Tile(0, 0, 0, id);
		this.clipMap = new ClipMap(this);
	}
	
	/**
	 * Gets the ID for this region
	 * @return The ID
	 */
	public int getID () {
		return mapSquareHash;
	}
	
	/**
	 * Gets the south-western tile of this region
	 * @return The base tile
	 */
	public Tile getBaseTile() {
		return baseTile;
	}
	
	/**
	 * Gets the {@link ClipMap} associated with this region
	 * @return The clip map
	 */
	public ClipMap getClipMap () {
		return clipMap;
	}
	
	/**
	 * Gets whether or not the region is fully loaded
	 * @return True if the region is fully loaded, false otherwise
	 */
	public boolean isLoaded () {
		return LoadStage.COMPLETED.equals(loadStage);
	}
	
	/**
	 * Adds a permanent location to the region. 
	 * This method should ONLY be called from the region loaded, as locations added via this method are not sent to the client.
	 * @param loc The {@link SceneLocation} to add
	 * @param localX The local x-coordinate of the location
	 * @param localY The local y-coordinate of the location
	 * @param z The z-coordinate (plane) on which the location lies.
	 */
	protected void addLocation (SceneLocation loc, int localX, int localY, int z) {
		if (loc.getLocType().hidden) {
			return;//
		}
		int hash = getChunkHash(localX, localY, z);
		synchronized (chunks) {
			if (chunks.get(hash) == null) {
				chunks.put(hash, new Chunk(loc.getTile()));				
			}
			chunks.get(hash).addLocation(loc, getLocalHash(localX, localY, z));
			locationCount++;
		}
		clipMap.addLocation(loc);
		//SceneUpdateEventContext update = new SceneUpdateEventContext(tileItems.values(), tileItems.get(0).getTile());
	}
	
	/**
	 * Spawns a temporary location, to be removed from the game scene after the specified delay
	 * @param loc The location to spawn
	 * @param removalDelay The number of ticks until the object is removed, or -1 if permanent
	 */
	public void spawnTempLocation (SceneLocation loc, int removalDelay) {
		int hash = getChunkHash(loc.getTile().getXInRegion(), loc.getTile().getYInRegion(), loc.getTile().getPlane());
		int localHash = getLocalHash(loc.getTile().getXInRegion(), loc.getTile().getYInRegion(), loc.getTile().getPlane());
		synchronized (chunks) {
			if (chunks.get(hash) == null) {
				chunks.put(hash, new Chunk(loc.getTile()));
			}
			loc.setTemporary(removalDelay);
			chunks.get(hash).addLocation(loc, localHash);
			chunks.get(hash).updateLocation(loc, localHash, true);
		}
		for (Player p : players) {
			p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(new AddUpdateLocation(loc)));
		}
	}
	
	/**
	 * Updates the specified {@link SceneLocation}
	 * @param loc The location to update
	 * @param isTemp True if the updated location differs from the cache version; false otherwise
	 */
	public void updateLocation (SceneLocation loc, boolean isTemp) {
		int hash = getChunkHash(loc.getTile().getXInRegion(), loc.getTile().getYInRegion(), loc.getTile().getPlane());
		int localHash = getLocalHash(loc.getTile().getXInRegion(), loc.getTile().getYInRegion(), loc.getTile().getPlane());
		synchronized (chunks) {
			if (chunks.get(hash) == null) {
				chunks.put(hash, new Chunk(loc.getTile()));
			}
			chunks.get(hash).updateLocation(loc, localHash, isTemp);
		}
		for (Player p : players) {
			p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(new AddUpdateLocation(loc)));
		}		
	}
	
	public void removeLocation (SceneLocation loc, boolean wasTemp) {
		int hash = getChunkHash(loc.getTile().getXInRegion(), loc.getTile().getYInRegion(), loc.getTile().getPlane());
		int localHash = getLocalHash(loc.getTile().getXInRegion(), loc.getTile().getYInRegion(), loc.getTile().getPlane());
		synchronized (chunks) {
			if (chunks.get(hash) == null) {
				return;
			}
			chunks.get(hash).removeLocation(loc, localHash, wasTemp);
		}
		for (Player p : players) {
			p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(new DeleteLocation(loc)));
		}
	}
	
	public void dropItem (int itemID, int amount, Player owner) {
		dropItem(itemID, amount, owner, owner.getCurrentTile());
	}
	
	/**
	 * Drops an item onto the ground
	 * @param itemID The type of item to drop
	 * @param amount The number of the item to drop
	 * @param owner The player who can pick up the item by default
	 * @param dropper The entity which dropped the item
	 */
	public void dropItem (int itemID, int amount, Player owner, Tile tile) {
		GroundItem groundItem = GroundItem.create(itemID, amount, tile, owner);
		groundItem.setSpawnTime(Constants.ITEM_REMOVAL_DELAY);
		addItem(groundItem);
	}
	
	/**
	 * Drops an item onto the ground
	 * @param itemID The type of item to drop
	 * @param amount The number of the item to drop
	 * @param owner The player who can pick up the item by default
	 * @param dropper The entity which dropped the item
	 */
	public void dropItem (int npcId, int itemID, int amount, Player owner, Tile tile) {
		GroundItem groundItem = GroundItem.create(itemID, amount, tile, owner);
		groundItem.setSpawnTime(Constants.ITEM_REMOVAL_DELAY);
		addItem(groundItem);
	}
	
	/**
	 * Adds the specified ground item to the region
	 * @param item The item to add
	 */
	public void addItem (GroundItem item) {
		int hash = getChunkHash(item.getTile().getXInRegion(), item.getTile().getYInRegion(), item.getTile().getPlane());
		int localHash = getLocalHash(item.getTile().getXInRegion(), item.getTile().getYInRegion(), item.getTile().getPlane());
		synchronized (chunks) {
			if (chunks.get(hash) == null) {
				chunks.put(hash, new Chunk(item.getTile()));
			}
			chunks.get(hash).addItem(item, localHash);
		}
		for (Player p : players) {
			p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(new AddObject(item)));
		}
	}
	
	/**
	 * Adds the specified player to the region's update list.
	 * Calling this method will cause the player to be updated on any items and temporary objects in the region.
	 * Players added to this list will also receive items when they are dropped, and objects when they are modified.
	 * @param player The player to add
	 */
	public void addPlayer (Player player) {
		//System.out.println("Adding player "+player.getDisplay()+" to region "+regionID);
		if (!players.contains(player)) {
			players.add(player);
			sendUpdates(player);
		}
	}
	
	/**
	 * Removes the specified player from the region's update list.
	 * @param player The player to remove
	 */
	public void removePlayer (Entity player) {
		players.remove(player);
	}
	
	/**
	 * Adds the specified npc to the region
	 * @param npc The npc to add
	 */
	public void addNpc (NPC npc) {
		npcs.add(npc);
	}
	
	/**
	 * Removes the specified npc from the region
	 * @param npc The npc to remove
	 */
	public void removeNpc (NPC npc) {
		npcs.remove(npc);
	}
	
	/**
	 * Removes and returns the first instance of the item with the specified id at the specified tile
	 * @param tile The tile
	 * @param itemID The item ID
	 * @return The item
	 */
	public GroundItem removeItem (Tile tile, int itemID) {
		int hash = getChunkHash(tile.getXInRegion(), tile.getYInRegion(), tile.getPlane());
		GroundItem selected = null;
		synchronized (chunks) {
			if (!chunks.containsKey(hash)) {
				return null;
			}
			selected = chunks.get(hash).removeItem(itemID, getLocalHash(tile.getXInRegion(), tile.getYInRegion(), tile.getPlane()));
		}
		if (selected != null) {
			ZoneUpdateEventContext packet = new ZoneUpdateEventContext(new DeleteObject(selected));
			for (Player p : players) {
				p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, packet);
			}
		}
		return selected;
	}
	
	public boolean canUnload () {
		return players.isEmpty();
	}
	
	public Set<Player> getPlayers () {
		return players;
	}
	
	/**
	 * Sends a full region update of all items and temporary objects to the specified player
	 * @param player The player to send updates to
	 */
	private void sendUpdates (Player player) {
		synchronized (chunks) {
			for (Chunk block : chunks.values()) {
				block.sendUpdate(player);
			}
		}
	}
	
	/**
	 * Gets the location of the specified ID at the specified coordinates
	 * @param x The x-coordinate
	 * @param y The y-coordinate
	 * @param plane The plane
	 * @param locTypeID the ID of the location to get
	 * @return The {@link SceneLocation} at the specified coordinates, or null if no location exists
	 */
	public SceneLocation getLocation (int x, int y, int plane, int locTypeID) {
		int hash = getChunkHash(x, y, plane);
		synchronized (chunks) {
			if (!chunks.containsKey(hash)) {
				return null;
			}		
			return chunks.get(hash).getLocation(locTypeID, getLocalHash(x, y, plane));
		}
	}
	
	/**
	 * Gets all the locations at the specified coordinates
	 * @param x The x-coordinate
	 * @param y The y-coordinate
	 * @param plane The plane
	 * @return A {@link SceneLocation} array for locations at the specified coordinates, or null if no locations exists
	 */
	public SceneLocation[] getLocations (int x, int y, int level) {
		int hash = getChunkHash(x, y, level);
		synchronized (chunks) {
			if (!chunks.containsKey(hash)) {
				return null;
			}		
			SceneLocation[] locations = chunks.get(hash).getLocations(getLocalHash(x, y, level));
			if (locations == null) {
				return null;
			} else {
				System.arraycopy(locations, 0, locations = new SceneLocation[locations.length], 0, locations.length);
				return locations;
			}
		}
	}
	
	/**
	 * Gets the item of the specified ID located at the specified coordinates
	 * @param x The x-coordinate
	 * @param y The y-coordinate
	 * @param plane The plane
	 * @param itemID The ID of the item to get
	 * @return The first item of the specified ID located at the tile, or null if no items exist
	 */
	public GroundItem getItem (int x, int y, int plane, int itemID) {
		int hash = getChunkHash(x, y, plane);
		synchronized (chunks) {
			if (!chunks.containsKey(hash)) {
				return null;
			}
			return chunks.get(hash).getItem(itemID, getLocalHash(x, y, plane));
		}
	}
	
	/**
	 * Runs the regular update tasks for this region, such as removing items and respawning locations
	 * This method should only be used by the RegionManager class
	 */
	protected void updateRegion () {
		synchronized (chunks) {
			for (Chunk block : chunks.values()) {
				if (block != null) {
					block.updateBlock();
				}
			}
		}
	}
	
	/**
	 * Creates a hash used for storing local items
	 * @param x The region x-coordinate of the tile
	 * @param y The region y-coordinate of the tile
	 * @param z The plane of the time
	 * @return The hash
	 */
	private static int getLocalHash (int x, int y, int z) {
		return x & 0x3F | ((y & 0x3F) << 6) | z << 12;
	}
	
	protected static int getChunkHash (int x, int y, int z) {
		return (x / 8) & 0x7 | (((y / 8) & 0x7) << 3) | z << 6;
	}
}
