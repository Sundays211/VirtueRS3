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
package org.virtue.game.map.square;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.virtue.Constants;
import org.virtue.config.loctype.LocShape;
import org.virtue.config.loctype.LocType;
import org.virtue.config.npctype.NpcType;
import org.virtue.game.World;
import org.virtue.game.entity.Entity;
import org.virtue.game.entity.npc.NPC;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.GroundItem;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.zone.AddObject;
import org.virtue.game.map.zone.AddUpdateLocation;
import org.virtue.game.map.zone.DeleteLocation;
import org.virtue.game.map.zone.DeleteObject;
import org.virtue.game.map.zone.LocationAnim;
import org.virtue.game.map.zone.ZoneUpdatePacket;
import org.virtue.network.event.context.impl.out.ZoneUpdateEventContext;
import org.virtue.network.event.encoder.impl.ZoneUpdateEventEncoder;

import com.google.common.base.Objects;

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 28/10/2014
 */
public class MapSquare {
	
	protected int mapSquareHash;
	protected CoordGrid baseTile;
	
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
	protected class Zone {
		/**
		 * Represents the static (permanent) locations in this block.
		 */
		protected final Map<Integer, SceneLocation[]> baseLocations = new HashMap<Integer, SceneLocation[]>();
		
		/**
		 * Represents the ground items located within this block
		 */
		private final Map<Integer, List<GroundItem>> items = new HashMap<Integer, List<GroundItem>>();
		
		/**
		 * Represents the locations which need to be updated when a player enters the region
		 */
		private final Map<Integer, SceneLocation> replacementLocations = new HashMap<>();

		private CoordGrid coord;

		private Zone (CoordGrid coord) {
			this.coord = coord;
		}

		protected void addBaseLocation (SceneLocation loc) {
			int hash = getLocalHash(loc.getTile());
			synchronized (baseLocations) {
				if (!baseLocations.containsKey(hash)) {
					baseLocations.put(hash, new SceneLocation[23]);
				}
				baseLocations.get(hash)[loc.getShape().getId()] = loc;
			}
		}

		protected void updateLocation (SceneLocation loc) {
			int hash = getLocalHash(loc.getTile());
			if (baseLocations.containsKey(hash)
					&& Objects.equal(baseLocations.get(hash)[loc.getShape().getId()], loc)) {
				replacementLocations.remove(hash);
			} else {
				replacementLocations.put(hash, loc);
			}
		}

		protected void removeLocation (SceneLocation loc) {
			int hash = getLocalHash(loc.getTile());
			if (baseLocations.containsKey(hash)
					&& Objects.equal(baseLocations.get(hash)[loc.getShape().getId()], loc)) {
				replacementLocations.remove(hash);
			} else {
				replacementLocations.put(hash, loc);
			}
		}

		protected SceneLocation[] getLocations (CoordGrid coord) {
			int hash = getLocalHash(coord);
			synchronized (baseLocations) {
				return baseLocations.get(hash);
			}
		}

		protected SceneLocation getLocation (int locTypeId, CoordGrid coord) {
			int hash = getLocalHash(coord);
			synchronized (baseLocations) {
				if (!baseLocations.containsKey(hash)) {
					return null;
				}
				for (SceneLocation loc : baseLocations.get(hash)) {
					if (loc != null && loc.getID() == locTypeId) {
						return loc;
					}
				}
			}
			return null;
		}

		protected void addItem (GroundItem item) {
			int hash = getLocalHash(item.getTile());
			synchronized (items) {
				if (!items.containsKey(hash)) {
					items.put(hash, new ArrayList<GroundItem>());
				}
				items.get(hash).add(item);
			}
		}

		protected GroundItem getItem (int objTypeId, CoordGrid coord) {
			int hash = getLocalHash(coord);
			synchronized (items) {
				if (!items.containsKey(hash)) {
					return null;
				}
				for (GroundItem item : items.get(hash)) {
					if (item != null && item.getId() == objTypeId) {
						return item;
					}
				}				
			}
			return null;
		}
		
		protected GroundItem removeItem (int objTypeId, CoordGrid coord) {
			int hash = getLocalHash(coord);
			GroundItem selected = null;
			synchronized (items) {
				if (!items.containsKey(hash)) {
					return null;
				}
				Iterator<GroundItem> iterator = items.get(hash).iterator();
				GroundItem item;
				while (iterator.hasNext()) {
					item = iterator.next();
					if (item.getId() == objTypeId) {
						iterator.remove();
						selected = item;
						break;
					}
				}
			}
			return selected;
		}
		
		protected void updateBlock () {
			Iterator<SceneLocation> locIterator = replacementLocations.values().iterator();
			while (locIterator.hasNext()) {
				SceneLocation loc = locIterator.next();
				loc.processTick();
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
			for (SceneLocation loc : replacementLocations.values()) {
				if (loc != null) {
					if (loc.getId() < 0) {
						packets.add(new DeleteLocation(loc));
					} else {
						packets.add(new AddUpdateLocation(loc));
					}
				}
			}
			if (!packets.isEmpty()) {
				player.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(packets, coord));
			}
		}

		private int getLocalHash (CoordGrid coord) {
			return getLocalHash(coord.getX(), coord.getY(), coord.getLevel());
		}

		/**
		 * Creates a hash used for storing local items
		 * @param x The region x-coordinate of the tile
		 * @param y The region y-coordinate of the tile
		 * @param z The plane of the time
		 * @return The hash
		 */
		private int getLocalHash (int x, int y, int z) {
			return x & 0x3F | ((y & 0x3F) << 6) | z << 12;
		}
	}
	
	/**
	 * Represents an 8x8 block within the region. 
	 * All items and objects within these blocks can be updated in a single packet, saving bandwidth and processing time
	 */
	protected Map<Integer, Zone> zones = new HashMap<Integer, Zone>();
	
	/**
	 * Represents the players which have this region in their viewport.
	 * Note that these players are NOT necessarily located in the region itself
	 */
	private Set<Player> players = Collections.synchronizedSet(new HashSet<Player>());
	
	private Set<NPC> npcs = Collections.synchronizedSet(new HashSet<NPC>());
	
	protected LoadStage loadStage = LoadStage.IDLE;
	
	protected int locationCount = 0;
	
	private ClipMap clipMap;
	
	public MapSquare (int id, RegionManager regionManager) {
		this.mapSquareHash = id;
		this.baseTile = new CoordGrid(0, 0, 0, id);
		this.clipMap = new ClipMap(this, regionManager);
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
	public CoordGrid getBaseTile() {
		return baseTile;
	}
	
	/**
	 * Gets the {@link ClipMap} associated with this region
	 * @return The clip map
	 */
	public ClipMap getClipMap () {
		return clipMap;
	}
	
	public LoadStage getLoadStage() {
		return loadStage;
	}

	public void setLoadStage(LoadStage loadStage) {
		this.loadStage = loadStage;
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
	public void addBaseLocation (LocType locType, int localX, int localY, int level, LocShape shape, int rotation) {
		if (locType.hidden) {
			return;//
		}
		CoordGrid coord = new CoordGrid(localX, localY, level, baseTile.getRegionX(), baseTile.getRegionY());

		SceneLocation loc = SceneLocation.create(locType.myid, coord, shape, rotation);
		int zoneHash = getZoneHash(localX, localY, level);
		synchronized (zones) {
			if (zones.get(zoneHash) == null) {
				zones.put(zoneHash, new Zone(coord));
			}
			zones.get(zoneHash).addBaseLocation(loc);
			locationCount++;
		}
		clipMap.addLocation(loc);
	}

	/**
	 * Adds the specified location to the map. If a location of the same shape & rotation already exists at the coordinates, replace it.
	 * @param loc The location to add or update
	 */
	public void addChangeLocation (SceneLocation loc) {
		int hash = getZoneHash(loc.getTile());
		synchronized (zones) {
			if (zones.get(hash) == null) {
				zones.put(hash, new Zone(loc.getTile()));
			}
			zones.get(hash).updateLocation(loc);
		}
		for (Player p : players) {
			p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(new AddUpdateLocation(loc)));
		}
	}
	
	public void removeLocation (SceneLocation loc) {
		int hash = getZoneHash(loc.getTile());
		synchronized (zones) {
			if (zones.get(hash) == null) {
				return;
			}
			zones.get(hash).removeLocation(loc);
		}
		for (Player p : players) {
			p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(new DeleteLocation(loc)));
		}
	}
	
	public void locationAnim(SceneLocation loc, int animId) {
		for (Player p : players) {
			p.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(new LocationAnim(loc, animId)));
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
	public void dropItem (int itemID, int amount, Player owner, CoordGrid tile) {
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
	public void dropItem (int npcId, int itemID, int amount, Player owner, CoordGrid tile) {
		GroundItem groundItem = GroundItem.create(itemID, amount, tile, owner);
		groundItem.setSpawnTime(Constants.ITEM_REMOVAL_DELAY);
		addItem(groundItem);
	}
	
	/**
	 * Adds the specified ground item to the region
	 * @param item The item to add
	 */
	public void addItem (GroundItem item) {
		int hash = getZoneHash(item.getTile());
		synchronized (zones) {
			if (zones.get(hash) == null) {
				zones.put(hash, new Zone(item.getTile()));
			}
			zones.get(hash).addItem(item);
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
	public void addNpc (NpcType npcType, int localX, int localY, int level) {
		CoordGrid coord = new CoordGrid(localX, localY, level, mapSquareHash);
		NPC npc = new NPC(-1, npcType, coord);
		World.getInstance().addNPC(npc);
		npcs.add(npc);
	}
	
	/**
	 * Removes the specified npc from the region
	 * @param npc The npc to remove
	 */
	public void removeNpc (NPC npc) {
		npcs.remove(npc);
		World.getInstance().removeNPC(npc);
	}
	
	/**
	 * Removes and returns the first instance of the item with the specified id at the specified tile
	 * @param tile The tile
	 * @param itemID The item ID
	 * @return The item
	 */
	public GroundItem removeItem (CoordGrid tile, int itemID) {
		int hash = getZoneHash(tile);
		GroundItem selected = null;
		synchronized (zones) {
			if (!zones.containsKey(hash)) {
				return null;
			}
			selected = zones.get(hash).removeItem(itemID, tile);
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
	
	public void unload () {
		for (NPC npc : npcs) {
			World.getInstance().removeNPC(npc);
		}
		npcs.clear();
	}
	
	public Set<Player> getPlayers () {
		return players;
	}
	
	/**
	 * Sends a full region update of all items and temporary objects to the specified player
	 * @param player The player to send updates to
	 */
	private void sendUpdates (Player player) {
		synchronized (zones) {
			for (Zone block : zones.values()) {
				block.sendUpdate(player);
			}
		}
	}
	
	/**
	 * Gets the location of the specified ID at the specified coordinates
	 * @param coord The coordinates
	 * @param locTypeID the ID of the location to get
	 * @return The {@link SceneLocation} at the specified coordinates, or null if no location exists
	 */
	public SceneLocation getLocation (CoordGrid coord, int locTypeID) {
		int hash = getZoneHash(coord);
		synchronized (zones) {
			if (!zones.containsKey(hash)) {
				return null;
			}		
			return zones.get(hash).getLocation(locTypeID, coord);
		}
	}
	
	/**
	 * Gets all the locations at the specified coordinates
	 * @param coords The coordinates
	 * @return A {@link SceneLocation} array for locations at the specified coordinates, or null if no locations exists
	 */
	public SceneLocation[] getLocations (CoordGrid coords) {
		int hash = getZoneHash(coords);
		synchronized (zones) {
			if (!zones.containsKey(hash)) {
				return null;
			}		
			SceneLocation[] locations = zones.get(hash).getLocations(coords);
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
	 * @param coords The coordinates
	 * @param itemID The ID of the item to get
	 * @return The first item of the specified ID located at the tile, or null if no items exist
	 */
	public GroundItem getItem (CoordGrid coords, int itemID) {
		int hash = getZoneHash(coords);
		synchronized (zones) {
			if (!zones.containsKey(hash)) {
				return null;
			}
			return zones.get(hash).getItem(itemID, coords);
		}
	}
	
	/**
	 * Runs the regular update tasks for this region, such as removing items and respawning locations
	 * This method should only be used by the RegionManager class
	 */
	protected void updateRegion () {
		synchronized (zones) {
			for (Zone block : zones.values()) {
				if (block != null) {
					block.updateBlock();
				}
			}
		}
	}

	protected static int getZoneHash (CoordGrid coord) {
		return getZoneHash(coord.getX(), coord.getY(), coord.getLevel());
	}

	protected static int getZoneHash (int x, int y, int level) {
		return (x / 8) & 0x7 | (((y / 8) & 0x7) << 3) | level << 6;
	}

	@Override
	public String toString () {
		return (mapSquareHash >> 8)+","+(mapSquareHash & 0xff);
	}
}
