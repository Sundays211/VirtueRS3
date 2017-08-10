package org.virtue.game.map.square;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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

/**
 * Represents an 8x8 zone within the Region.
 * All items and locations within this zone can be updated simultaneously, saving bandwidth when updating.
 * 
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 5/11/2014
 */
public class Zone {
	/**
	 * Base locations which have been replaced
	 */
	protected final Map<Integer, SceneLocation> replacedLocations = new HashMap<>();

	/**
	 * Represents the ground items located within this block
	 */
	private final Map<Integer, List<GroundItem>> items = new HashMap<Integer, List<GroundItem>>();

	/**
	 * Locations currently active in the zone
	 */
	private final Map<Integer, SceneLocation> locations = new HashMap<>();

	private CoordGrid coord;

	Zone (CoordGrid coord) {
		this.coord = coord;
	}

	protected void addBaseLocation (SceneLocation loc) {
		int hash = getLocationHash(loc);
		locations.put(hash, loc);
	}

	protected void updateLocation (SceneLocation loc) {
		int hash = getLocationHash(loc);
		if (replacedLocations.containsKey(hash)) {
			if (Objects.equals(replacedLocations.get(hash), loc)) {
				//We already have a base location at the same coords.
				//Add it instead so we don't keep trying to send it to clients
				locations.put(hash, replacedLocations.remove(hash));
			} else {
				//Otherwise, we're replacing another replacement.
				//Don't worry about keeping the reference to it
				locations.put(hash, loc);
			}
		} else {
			SceneLocation oldLoc = locations.put(hash, loc);
			if (oldLoc != null && !oldLoc.isReplacement()) {
				//Store the base location so it can be retrieved later
				replacedLocations.put(hash, oldLoc);
			}
		}
	}

	protected void removeLocation (CoordGrid coord, LocShape shape, int rotation) {
		int hash = getLocationHash(coord, shape, rotation);
		if (replacedLocations.containsKey(hash)) {
			//This change removed a base location, so we need to send the removal to new players
			locations.put(hash, SceneLocation.create(-1, coord, shape, rotation));
		} else {
			SceneLocation oldLoc = locations.remove(hash);
			if (oldLoc != null && !oldLoc.isReplacement()) {
				//Store the old base location & send removal to new players
				locations.put(hash, SceneLocation.create(-1, coord, shape, rotation));
				replacedLocations.put(hash, oldLoc);
			}
		}
	}

	protected Optional<SceneLocation> getLocation (CoordGrid coord, LocShape shape) {
		return locations.values().stream()
				.filter(loc -> loc.getTile().equals(coord) && loc.getShape() == shape).findAny();
	}

	protected Optional<SceneLocation> getLocation (CoordGrid coord, int locTypeId) {
		return locations.values().stream()
				.filter(loc -> loc.getTile().equals(coord) && loc.getId() == locTypeId).findAny();
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
		Iterator<SceneLocation> locIterator = locations.values().iterator();
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
		locations.values().stream()
			.filter(SceneLocation::isReplacement)
			.forEach(loc -> {
				if (loc.getId() < 0) {
					packets.add(new DeleteLocation(loc));
				} else {
					packets.add(new AddUpdateLocation(loc));
				}
			});
		if (!packets.isEmpty()) {
			player.getDispatcher().sendEvent(ZoneUpdateEventEncoder.class, new ZoneUpdateEventContext(packets, coord));
		}
	}

	public int getLocationHash (SceneLocation loc) {
		return getLocationHash(loc.getTile(), loc.getShape(), loc.getRotation());
	}

	public int getLocationHash (CoordGrid coord, LocShape shape, int rotation) {
		return getLocalHash(coord) | rotation << 10 | shape.getId() << 12;
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
		return x & 0x3F | ((y & 0x3F) << 4) | z << 8;
	}
}