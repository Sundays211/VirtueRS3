package org.virtue.game.map.square;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.virtue.config.loctype.LocShape;
import org.virtue.game.entity.player.Player;
import org.virtue.game.map.CoordGrid;
import org.virtue.game.map.GroundItem;
import org.virtue.game.map.SceneLocation;
import org.virtue.game.map.prot.AddObject;
import org.virtue.game.map.prot.AddUpdateLocation;
import org.virtue.game.map.prot.DeleteLocation;
import org.virtue.game.map.prot.DeleteObject;
import org.virtue.game.map.prot.ZoneUpdatePacket;
import org.virtue.network.event.context.impl.out.ZoneUpdateEventContext;
import org.virtue.network.event.encoder.impl.ZoneUpdateEventEncoder;

import com.google.common.base.Objects;

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
public class Zone {
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

	Zone (CoordGrid coord) {
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

	protected void removeLocation (CoordGrid coord, LocShape shape, int rotation) {
		SceneLocation loc = SceneLocation.create(-1, coord, shape, rotation);
		
		int hash = getLocalHash(coord);
		if (baseLocations.containsKey(hash)
				&& Objects.equal(baseLocations.get(hash)[loc.getShape().getId()], loc)) {
			replacementLocations.remove(hash);
		} else {
			replacementLocations.put(hash, loc);
		}
	}

	protected Optional<SceneLocation> getLocation (CoordGrid coord, LocShape shape) {
		int hash = getLocalHash(coord);
		if (baseLocations.containsKey(hash)) {
			return Optional.ofNullable(baseLocations.get(hash)[shape.getId()]);
		}
		return Optional.empty();
	}

	protected Optional<SceneLocation> getLocation (CoordGrid coord, int locTypeId) {
		int hash = getLocalHash(coord);
		synchronized (baseLocations) {
			if (!baseLocations.containsKey(hash)) {
				return Optional.empty();
			}
			for (SceneLocation loc : baseLocations.get(hash)) {
				if (loc != null && loc.getID() == locTypeId) {
					return Optional.of(loc);
				}
			}
		}
		return Optional.empty();
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
	
	protected void updateBlock (Iterable<Player> players) {
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